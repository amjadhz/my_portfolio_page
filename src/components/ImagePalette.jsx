// src/components/ImagePalette.jsx
import { useEffect, useRef, useState } from "react";
import sampleImg from "../assets/Image_colour_clustering.png"; // handled by Vite

/**
 * Image Color Clustering (K-means palette reduction)
 * - Upload or use a sample image
 * - Choose K (palette size) and preview result
 * - Download quantized PNG
 * - Fixed-size canvases -> layout never jumps
 */

const MAX_W = 480;
const MAX_H = 320;

export default function ImagePalette() {
  // start from the imported image (works in dev and GitHub Pages)
  const [imgSrc, setImgSrc] = useState(sampleImg);
  const [k, setK] = useState(6);
  const [busy, setBusy] = useState(false);

  const origRef = useRef(null);
  const outRef  = useRef(null);
  const hiddenRef = useRef(document.createElement("canvas")); // work canvas

  // Render when imgSrc changes
  useEffect(() => {
    if (!imgSrc) return;
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      renderOriginal(img, origRef.current);
      quantize(img, k, outRef.current, hiddenRef.current);
    };
  }, [imgSrc]);

  // Re-quantize when k changes
  useEffect(() => {
    if (!origRef.current || !imgSrc) return;
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => quantize(img, k, outRef.current, hiddenRef.current);
  }, [k, imgSrc]);

  function onFile(e){
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    setTimeout(() => URL.revokeObjectURL(url), 10_000); // revoke after use
  }

  function onUseSample(){
    setImgSrc(sampleImg);
  }

  function onDownload(){
    const a = document.createElement("a");
    a.href = outRef.current.toDataURL("image/png");
    a.download = `palette-k${k}.png`;
    a.click();
  }

  return (
    <section id="image-palette" className="reveal ip">
      <Styles />
      <h2 className="ip-title">Image Color Clustering</h2>

      <div className="ip-grid">
        <div className="card ip-can">
          <div className="ip-label">Original</div>
          <div className="ip-label">Sample: Damascene Sword Monument, Damascus.</div>
          <canvas ref={origRef} width={MAX_W} height={MAX_H} />
        </div>

        <div className="card ip-can">
          <div className="ip-label">Quantized (K = {k})</div>
          <canvas ref={outRef} width={MAX_W} height={MAX_H} />
        </div>

        <div className="card ip-controls">
          <div className="ip-row">
            <label htmlFor="k">Palette size (K)</label>
            <strong className="ip-mono">{k}</strong>
          </div>
          <input
            id="k" type="range" min="2" max="100"
            value={k} onChange={(e)=>setK(parseInt(e.target.value))}
          />

          <div className="ip-row">
            <input id="file" type="file" accept="image/*" onChange={onFile} />
            <button className="ip-btn" onClick={onUseSample}>Use sample</button>
            <button className="ip-btn primary" onClick={onDownload} disabled={busy}>Download</button>
          </div>

          <p className="ip-note">
            <strong>How it works:</strong> K-means groups similar pixel colors into <strong>K</strong> clusters.
            Each pixel is then recolored by its cluster’s centroid → fewer colors, a clean palette.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- styles ---------- */
function Styles(){
  return (
    <style>{`
      .ip-title{ margin: 0 0 .8rem 0; }
      .ip-grid{ display:grid; grid-template-columns:1fr 1fr; gap:1rem; align-items:stretch }
      .ip-can{ display:grid; gap:.5rem; justify-items:center }
      .ip-can canvas{
        width:${MAX_W}px; height:${MAX_H}px; border-radius:16px; border:1px solid var(--border); background:var(--panel);
      }
      .ip-label{ color:var(--muted) }
      .ip-controls{ display:grid; gap:.6rem }
      .ip-row{ display:flex; align-items:center; gap:.6rem; justify-content:space-between; flex-wrap:wrap }
      .ip-btn{
        border:1px solid var(--border); background:var(--panel); color:var(--text);
        border-radius:999px; padding:.55rem .85rem; cursor:pointer; box-shadow:var(--shadow);
      }
      .ip-btn.primary{ background: linear-gradient(135deg, var(--primary), var(--accent)); color:#0b0d10; border:none }
      .ip-mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; min-width:4ch; text-align:right }
      .ip-note{ color:var(--muted); margin:0 }
      @media (max-width: 900px){ .ip-grid{ grid-template-columns:1fr } }
    `}</style>
  );
}

/* ---------- k-means palette implementation ---------- */
function renderOriginal(img, canvas){
  const ctx = canvas.getContext("2d");
  const { w, h } = fitContain(img.width, img.height, MAX_W, MAX_H);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img, (MAX_W-w)/2, (MAX_H-h)/2, w, h);
}

function quantize(img, k, out, work){
  const ctxO = out.getContext("2d");
  const ctxW = work.getContext("2d");

  const { w, h } = fitContain(img.width, img.height, MAX_W, MAX_H);
  ctxW.canvas.width = w; ctxW.canvas.height = h;
  ctxW.drawImage(img, 0, 0, w, h);

  const data = ctxW.getImageData(0,0,w,h).data;
  const pts = [];
  for(let i=0;i<data.length;i+=4){ pts.push([data[i], data[i+1], data[i+2]]); }

  // init k random colors
  const rnd = () => Math.floor(Math.random()*pts.length);
  const cents = Array.from({length:k},()=>pts[rnd()].slice());

  let changed = true, iter=0;
  const labels = new Array(pts.length).fill(0);

  while(changed && iter<12){
    changed = false; iter++;
    // assign
    for(let i=0;i<pts.length;i++){
      let best=0, bestd=1e12;
      for(let c=0;c<k;c++){
        const dr=pts[i][0]-cents[c][0], dg=pts[i][1]-cents[c][1], db=pts[i][2]-cents[c][2];
        const d=dr*dr+dg*dg+db*db;
        if(d<bestd){ bestd=d; best=c; }
      }
      if(labels[i]!==best){ labels[i]=best; changed=true; }
    }
    // update
    const sum = Array.from({length:k},()=>[0,0,0,0]);
    for(let i=0;i<pts.length;i++){ const c=labels[i]; sum[c][0]+=pts[i][0]; sum[c][1]+=pts[i][1]; sum[c][2]+=pts[i][2]; sum[c][3]++; }
    for(let c=0;c<k;c++){ if(sum[c][3]){ cents[c][0]=sum[c][0]/sum[c][3]; cents[c][1]=sum[c][1]/sum[c][3]; cents[c][2]=sum[c][2]/sum[c][3]; } }
  }

  // paint
  const outImg = ctxO.createImageData(MAX_W, MAX_H);
  for(let i=0;i<outImg.data.length;i+=4){ outImg.data[i+3]=255; }
  const offsetX = Math.floor((MAX_W - w)/2);
  const offsetY = Math.floor((MAX_H - h)/2);
  for(let y=0; y<h; y++){
    for(let x=0; x<w; x++){
      const idx = (y*w + x);
      const c = cents[labels[idx]];
      const tx = x + offsetX, ty = y + offsetY;
      const o = (ty*MAX_W + tx)*4;
      outImg.data[o]   = Math.round(c[0]);
      outImg.data[o+1] = Math.round(c[1]);
      outImg.data[o+2] = Math.round(c[2]);
      outImg.data[o+3] = 255;
    }
  }
  ctxO.putImageData(outImg, 0, 0);
}

function fitContain(srcW, srcH, maxW, maxH){
  const s = Math.min(maxW/srcW, maxH/srcH);
  return { w: Math.round(srcW*s), h: Math.round(srcH*s) };
}

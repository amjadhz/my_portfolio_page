// src/components/DataScience.jsx
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Stable-size clustering playground + workflow rail.
 * - Canvas and control panel are fixed-size so interaction never changes layout.
 * - K-Means (animated) only.
 * - Constant dataset size: N = 20,000 points (regenerated only on "Reset data").
 */

const LOGICAL_W = 820;   // logical drawing width
const LOGICAL_H = 340;   // logical drawing height
const PANEL_W   = 360;   // fixed right-panel width
const FIXED_H   = 340;   // fixed CSS height for both sides
const N_POINTS  = 20000; // <- 20k points

export default function DataScience() {
  return (
    <section id="data-science" className="reveal ds">
      <Styles />
      <h2 className="ds-title">Data Science</h2>

      {/* workflow rail */}
      <div className="ds-rail card" aria-hidden="true">
        <div className="ds-runner">
          {[
            "Data","Clean","Explore","Engineer","Train","Validate","Explain","Deploy",
            "Data","Clean","Explore","Engineer","Train","Validate","Explain","Deploy"
          ].map((s,i)=>(
            <span className="ds-chip" key={s+i}>{s}</span>
          ))}
        </div>
      </div>

      <Playground />
    </section>
  );
}

/* ================== styles ================== */
function Styles(){
  return (
    <style>{`
      .ds { --pad: 1.1rem; }
      .ds-title{ margin:0 0 .8rem 0; }
      .ds .card{ background:var(--panel); border:1px solid var(--border); border-radius:20px; padding:var(--pad); box-shadow:var(--shadow) }

      .ds-rail{ overflow:hidden; margin-bottom:1rem }
      .ds-runner{ display:flex; gap:.6rem; width:max-content; animation:ds-marquee 22s linear infinite }
      @keyframes ds-marquee{ from{ transform:translateX(0) } to{ transform:translateX(-50%) } }
      .ds-chip{
        padding:.45rem .75rem; border-radius:999px; white-space:nowrap;
        background:linear-gradient(135deg, var(--primary), var(--accent));
        color:#0b0d10; font-weight:700; letter-spacing:.2px;
        box-shadow:0 10px 25px color-mix(in oklab, var(--primary) 25%, transparent);
      }

      .ds-grid{
        display:grid; gap:1rem; align-items:stretch;
        grid-template-columns: 1fr ${PANEL_W}px; /* fixed panel width -> canvas width stays constant */
      }
      .ds-fixed{ height:${FIXED_H}px; }          /* hard lock height */
      .ds-panel{
        display:grid; gap:.7rem; overflow-y:auto; overflow-x:hidden;
        scrollbar-gutter: stable both-edges;  /* reserves scrollbar space -> width doesn’t jump */
      }

      .ds-canvasWrap{ position:relative }
      .ds-canvasWrap::after{
        content:""; position:absolute; inset:auto -20% -25% -20%; height:45%;
        background: radial-gradient(40% 60% at 70% 0%, color-mix(in oklab, var(--primary) 35%, transparent), transparent),
                    radial-gradient(40% 60% at 0% 100%, color-mix(in oklab, var(--accent) 35%, transparent), transparent);
        filter: blur(22px); z-index:-1; opacity:.75;
      }
      .ds-canvas{ width:100%; height:100%; border-radius:16px; border:1px solid var(--border); background:var(--panel); display:block }
      .ds-tip{
        position:absolute; transform:translate(-50%,-120%); pointer-events:none;
        background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:.4rem .55rem;
        box-shadow:var(--shadow); font-size:.85rem; white-space:nowrap;
      }

      .ds-toolbar{ display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; margin-bottom:.2rem }

      .ds-controls{ display:grid; gap:.6rem }
      .ds-row{ display:flex; align-items:center; justify-content:space-between; gap:.5rem }
      .ds-row input[type="range"]{ width:100% }
      .ds-metric{ font-family: ui-monospace, Menlo, Consolas, "Liberation Mono", monospace; min-width:7ch; text-align:right }

      .ds-btn{ border:1px solid var(--border); background:var(--panel); color:var(--text); border-radius:999px; padding:.55rem .85rem; cursor:pointer; box-shadow:var(--shadow) }
      .ds-btn.primary{ background:linear-gradient(135deg, var(--primary), var(--accent)); color:#0b0d10; border:none }

      @media (max-width: 900px){
        .ds-grid{ grid-template-columns:1fr }
      }
      @media (prefers-reduced-motion: reduce){ .ds-runner{ animation:none } }
    `}</style>
  );
}

/* ================== playground ================== */
function Playground(){
  const canvasRef = useRef(null);
  const animRef   = useRef(0);

  // persistent data
  const ptsRef   = useRef([]);   // {x,y,cluster,type}
  const centsRef = useRef([]);   // {x,y}

  // UI state (K-Means only)
  const [k, setK]         = useState(3);
  const [playing, setPlaying] = useState(true);
  const [seed, setSeed]   = useState(() => Math.floor(Math.random()*1e9));
  const [sse, setSSE]     = useState(0);

  const [tip, setTip] = useState(null);

  // cluster colors
  const colors = useMemo(() => Array.from({length:8},(_,i)=>`hsl(${(i*60)%360} 65% 55%)`), []);

  /* ----- canvas sizing (fixed) ----- */
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d", { alpha:false });

    function sizeToWrapper(){
      const wrap = c.parentElement;
      const w = wrap.clientWidth || wrap.getBoundingClientRect().width || LOGICAL_W;
      const h = FIXED_H; // fixed by CSS
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width  = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      // scale logical space to actual pixels
      const sx = (c.width / dpr) / LOGICAL_W;
      const sy = (c.height/ dpr) / LOGICAL_H;
      ctx.setTransform(sx*dpr, 0, 0, sy*dpr, 0, 0);
    }
    sizeToWrapper();
    const onResize = () => sizeToWrapper();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ----- make 20k points once per seed ----- */
  useEffect(() => {
    const rnd = lcg(seed);
    const pts = [];

    // 3 blobs (~6.5k each) + ~500 noise
    const blobs = [
      { cx: LOGICAL_W*0.30, cy: LOGICAL_H*0.35, n: 6500, spread: 26 },
      { cx: LOGICAL_W*0.70, cy: LOGICAL_H*0.40, n: 6500, spread: 26 },
      { cx: LOGICAL_W*0.50, cy: LOGICAL_H*0.72, n: 6500, spread: 26 },
    ];
    for(const b of blobs){
      for(let i=0;i<b.n;i++){
        const r = Math.sqrt(-2*Math.log(rnd()))*b.spread;
        const th= 2*Math.PI*rnd();
        pts.push({ x: b.cx + r*Math.cos(th), y: b.cy + r*Math.sin(th), cluster:-1, type:"member" });
      }
    }
    const noise = Math.max(0, N_POINTS - pts.length);
    for(let i=0;i<noise;i++){
      pts.push({ x: LOGICAL_W*rnd(), y: LOGICAL_H*rnd(), cluster:-1, type:"noise" });
    }

    ptsRef.current = pts;
  }, [seed]);

  /* ----- main loop (throttled ~30fps) ----- */
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d", { alpha:false });

    let step = 0;
    let last = 0;
    const loop = (t) => {
      // throttle to ~30fps
      if (t - last > 33) {
        if (playing) {
          if (step === 0) { kmeansAssign(ptsRef.current, centsRef.current); step = 1; }
          else           { kmeansUpdate(ptsRef.current, centsRef.current);   step = 0; }
          setSSE(kmeansSSE(ptsRef.current, centsRef.current));
        }
        draw(ctx, ptsRef.current, centsRef.current, colors);
        last = t;
      }
      animRef.current = requestAnimationFrame(loop);
    };

    // init K-Means
    centsRef.current = initCentroids(ptsRef.current, k, seed);
    kmeansAssign(ptsRef.current, centsRef.current);
    setSSE(kmeansSSE(ptsRef.current, centsRef.current));

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [k, playing, seed, colors]);

  /* ----- click tooltip ----- */
  useEffect(() => {
    const c = canvasRef.current;
    function onClick(e){
      const rect = c.getBoundingClientRect();
      const sx = (c.width / Math.min(window.devicePixelRatio||1,2)) / LOGICAL_W;
      const sy = (c.height/ Math.min(window.devicePixelRatio||1,2)) / LOGICAL_H;
      const x = (e.clientX - rect.left) / sx;
      const y = (e.clientY - rect.top ) / sy;

      let best=-1, bestd=144; // 12px radius in logical space
      const pts = ptsRef.current;
      for(let i=0;i<pts.length;i++){
        const dx=x-pts[i].x, dy=y-pts[i].y; const d=dx*dx+dy*dy;
        if(d<bestd){ bestd=d; best=i; }
      }
      if(best<0){ setTip(null); return; }
      const p = pts[best];
      let msg = `(${p.x.toFixed(1)}, ${p.y.toFixed(1)}) → `;
      const ds = centsRef.current.map((c0,i)=>({i,d:(p.x-c0.x)**2+(p.y-c0.y)**2})).sort((a,b)=>a.d-b.d);
      const near=ds[0], next=ds[1];
      msg += `C${near.i+1} (closest), Δ=${Math.max(0, Math.sqrt(next.d)-Math.sqrt(near.d)).toFixed(1)} px`;

      setTip({
        x: (x / LOGICAL_W) * (c.width/Math.min(window.devicePixelRatio||1,2)),
        y: (y / LOGICAL_H) * (c.height/Math.min(window.devicePixelRatio||1,2)),
        text: msg
      });
    }
    c.addEventListener("click", onClick);
    return () => c.removeEventListener("click", onClick);
  }, []);

  // Re-initialize K-Means when K or seed changes (without regenerating points except on seed)
  useEffect(() => {
    centsRef.current = initCentroids(ptsRef.current, k, seed);
    kmeansAssign(ptsRef.current, centsRef.current);
    setSSE(kmeansSSE(ptsRef.current, centsRef.current));
  }, [k, seed]);

  return (
    <div className="ds-grid">
      {/* canvas (fixed height) */}
      <div className="card ds-canvasWrap ds-fixed">
        <canvas ref={canvasRef} className="ds-canvas" />
        {tip && <div className="ds-tip" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
      </div>

      {/* controls (fixed height, internal scroll only) */}
      <div className="ds-panel card ds-fixed" aria-live="polite">
        <div className="ds-toolbar">
          <strong style={{ color:"var(--muted)" }}>Model: K-Means</strong>
          <button className="ds-btn" onClick={()=>setSeed(Math.floor(Math.random()*1e9))}>Reset data</button>
        </div>

        <div className="ds-controls">
          <div className="ds-row">
            <label htmlFor="k">K (clusters)</label>
            <strong className="ds-metric">{k}</strong>
          </div>
          <input id="k" type="range" min="2" max="6" value={k} onChange={(e)=>setK(parseInt(e.target.value))}/>
        </div>

        <div className="ds-row">
          <span>SSE</span><strong className="ds-metric">{sse}</strong>
        </div>

        <div>
          <button className="ds-btn primary" onClick={()=>setPlaying(p=>!p)}>
            {playing ? "Pause" : "Play"}
          </button>
        </div>

        <p style={{ color:"var(--muted)", marginTop:".2rem" }}>
          Click a point to see coordinates and the cluster reason.
        </p>
      </div>
    </div>
  );
}

/* ================== helpers ================== */
function lcg(seed){ let s=(seed>>>0); return ()=> (s=(1664525*s+1013904223)>>>0)/2**32; }

function initCentroids(pts, k, seed){
  const rnd = lcg(seed+12345);
  const used = new Set(); const cents=[];
  while(cents.length<k){
    const i=Math.floor(rnd()*pts.length);
    if(!used.has(i)){ used.add(i); cents.push({x:pts[i].x,y:pts[i].y}); }
  }
  return cents;
}
function kmeansAssign(pts, cents){
  for(const p of pts){
    let best=-1, bestd=Infinity;
    for(let i=0;i<cents.length;i++){
      const dx=p.x-cents[i].x, dy=p.y-cents[i].y;
      const d=dx*dx+dy*dy;
      if(d<bestd){bestd=d; best=i;}
    }
    p.cluster=best; p.type="member";
  }
}
function kmeansUpdate(pts, cents){
  const sums = Array.from({length:cents.length},()=>({x:0,y:0,c:0}));
  for(const p of pts){ const s=sums[p.cluster]; s.x+=p.x; s.y+=p.y; s.c++; }
  for(let i=0;i<cents.length;i++){
    if(sums[i].c){
      cents[i].x=sums[i].x/sums[i].c;
      cents[i].y=sums[i].y/sums[i].c;
    }
  }
}
function kmeansSSE(pts, cents){
  let e=0; for(const p of pts){
    const c=cents[p.cluster]; const dx=p.x-c.x, dy=p.y-c.y; e+=dx*dx+dy*dy;
  } return Math.round(e);
}

function draw(ctx, pts, cents, colors){
  // clear
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--panel").trim() || "#fff";
  ctx.fillRect(0,0,LOGICAL_W,LOGICAL_H);

  // draw points as fast tiny rects (20k)
  for(const p of pts){
    ctx.fillStyle = p.cluster>=0 ? colors[p.cluster % colors.length] : "#8a8a8a";
    ctx.fillRect(p.x-1, p.y-1, 2, 2);
  }

  // centroids
  if (cents.length) {
    for(let i=0;i<cents.length;i++){
      const c = cents[i];
      ctx.strokeStyle = colors[i % colors.length];
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(c.x-6,c.y); ctx.lineTo(c.x+6,c.y);
      ctx.moveTo(c.x,c.y-6); ctx.lineTo(c.x,c.y+6); ctx.stroke();
      ctx.beginPath(); ctx.arc(c.x, c.y, 7, 0, Math.PI*2); ctx.stroke();
    }
  }
}

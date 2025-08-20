// src/components/Hero.jsx
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import me from "../assets/me.jpg"; // ✅ correct import

/* Lightweight canvas particles (no dependencies) */
function Particles() {
  const ref = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const H = 220;

    function size() {
      c.width = c.offsetWidth * DPR;
      c.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    size();

    const pts = Array.from(
      { length: Math.max(30, Math.floor(c.offsetWidth / 20)) },
      () => ({
        x: Math.random() * c.offsetWidth,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
      })
    );

    function draw() {
      ctx.clearRect(0, 0, c.offsetWidth, H);
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > c.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf.current = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => size();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: "0 0 auto 0", height: 220, zIndex: -1 }}
    >
      <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default function Hero() {
  const { theme } = useContext(ThemeContext);

  return (
    <section id="home" className="hero reveal">
      <Particles />
      <div className="hero-card">
        <h1 style={{ color: theme.primary }}>Hi, I’m Amjad Hwidy</h1>
        <p>
          I’m a <strong>Data Scientist & Analyst</strong> passionate about unlocking the value of data through 
          <strong> machine learning, AI, and explainable models</strong>. My projects range from 
          <strong> ICU admission prediction</strong> and <strong>ethical recommender systems </strong> 
          to <strong>automation tools in industry</strong>, all with a focus on transparency, fairness, and real-world impact.  
          I thrive on turning complex datasets into actionable insights, and my long-term vision is to build 
          AI solutions that are not only powerful, but also <strong>ethical, user-centered, and trustworthy</strong>.
        </p>

        <div>
          <a className="btn primary" href="#projects">
            View Projects
          </a>
          <a className="btn" href="#contact">
            Contact Me
          </a>
        </div>
      </div>

      <div className="portrait-wrap">
        <img src={me} alt="Me" />
        <div className="blob" aria-hidden="true"></div>
      </div>
    </section>
  );
}

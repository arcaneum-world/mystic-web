"use client";
import { useEffect, useRef } from "react";

/** Lightweight animated starfield with gentle twinkle */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    function resize() {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    type Star = { x:number; y:number; r:number; p:number; s:number };
    let stars: Star[] = [];
    function init() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const count = Math.round((w*h)/22000); // density
      stars = Array.from({length: count}, () => ({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 0.5 + Math.random()*1.7,
        p: Math.random()*Math.PI*2,           // phase for twinkle
        s: 0.4 + Math.random()*0.8            // speed of twinkle
      }));
    }

    function frame(t:number) {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0,0,w,h);
      for (const st of stars) {
        const tw = 0.35 + 0.35*Math.sin(st.p + t*0.0015*st.s);
        ctx.globalAlpha = tw;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    const obs = new ResizeObserver(resize);
    obs.observe(canvas);
    resize();
    raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  return (
    <div className="starfield">
      <canvas className="twinkles" ref={ref}/>
    </div>
  );
}

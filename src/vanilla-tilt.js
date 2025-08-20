/* Minimal VanillaTilt build */
/* eslint-disable */
(function (factory) { if (typeof module === "object" && typeof module.exports === "object") { module.exports = factory(); } else { window.VanillaTilt = factory(); } })(function () {
  class VanillaTilt {
    constructor(el, s = {}) { if (!(el instanceof Node)) throw "VanillaTilt: element not Node.";
      this.width = this.height = this.left = this.top = null; this.el = el;
      this.s = Object.assign({ reverse:false, max:15, perspective:1000, scale:1.05, speed:300 }, s);
      this.el.style.transform = `perspective(${this.s.perspective}px)`; this.add(); }
    add(){ this.enter = this.enter.bind(this); this.move = this.move.bind(this); this.leave = this.leave.bind(this);
      this.el.addEventListener("mouseenter", this.enter); this.el.addEventListener("mousemove", this.move); this.el.addEventListener("mouseleave", this.leave); }
    enter(){ this.pos(); this.tran(); }
    move(e){ const v=this.vals(e); this.el.style.transform=`perspective(${this.s.perspective}px) rotateX(${v.ty}deg) rotateY(${v.tx}deg) scale3d(${this.s.scale},${this.s.scale},${this.s.scale})`; }
    leave(){ this.tran(); this.el.style.transform=`perspective(${this.s.perspective}px) rotateX(0) rotateY(0) scale3d(1,1,1)`; }
    pos(){ const r=this.el.getBoundingClientRect(); this.width=r.width; this.height=r.height; this.left=r.left; this.top=r.top; }
    vals(e){ let x=(e.clientX-this.left)/this.width, y=(e.clientY-this.top)/this.height; x=Math.min(Math.max(x,0),1); y=Math.min(Math.max(y,0),1);
      return { tx:(this.s.reverse?(x-.5):(.5-x))*this.s.max*2, ty:(this.s.reverse?(.5-y):(y-.5))*this.s.max*2 }; }
    tran(){ clearTimeout(this.to); this.el.style.transition=`${this.s.speed}ms ease`; this.to=setTimeout(()=>this.el.style.transition="", this.s.speed); }
    static init(els,s){ if(els instanceof Node) els=[els]; if(els instanceof NodeList) els=[...els]; els.forEach(el=>{ if(!("vanillaTilt" in el)){ el.vanillaTilt=new VanillaTilt(el,s); } }); }
  } return VanillaTilt;
});

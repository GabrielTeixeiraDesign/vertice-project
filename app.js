(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const header = document.querySelector('.header');
  const progress = document.querySelector('.progress');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });
  const closeMenu = () => { toggle?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('open'); };
  nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { closeMenu(); toggle.focus(); } });
  let observer;
  let enabled = !reduced.matches;
  function configure() {
    observer?.disconnect(); root.classList.toggle('motion-off', !enabled); root.classList.toggle('motion-ready', enabled);
    if (!enabled) document.querySelectorAll('[data-parallax]').forEach(el => { el.style.translate = '0 0'; });
    if (enabled && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);} }), {threshold:.08, rootMargin:'0px 0px -24px 0px'});
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
  reduced.addEventListener('change', () => { enabled = !reduced.matches; configure(); });
  configure();
  let pending = false;
  function updateScroll() {
    pending = false; const y = scrollY; header?.classList.toggle('scrolled', y > 20);
    const max = document.documentElement.scrollHeight - innerHeight;
    if(progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      if(!enabled || reduced.matches){el.style.translate = '0 0';return;}
      const r = el.parentElement.getBoundingClientRect();
      if(r.bottom > 0 && r.top < innerHeight) el.style.translate = `0 ${Math.max(-18, Math.min(18, (innerHeight / 2 - r.top - r.height / 2) * .045))}px`;
    });
  }
  addEventListener('scroll', () => { if(!pending){pending = true;requestAnimationFrame(updateScroll);} }, {passive:true});
  addEventListener('resize', updateScroll); updateScroll();
})();

// Navigate only after the car has completed its run; native links remain the fallback.
(() => {
  let overlay, timer, destination;
  const reset=()=>{clearTimeout(timer);overlay?.remove();overlay=null;destination=null;};
  addEventListener('pageshow',reset);
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin||!url.pathname.endsWith('.html')||url.pathname===location.pathname||matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('motion-off'))return;
    event.preventDefault();if(overlay)return;
    destination=url.href;overlay=document.createElement('div');overlay.className='page-transition';overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');
    overlay.innerHTML='<div class="transition-track" aria-hidden="true"><svg class="transition-car" viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg"><g fill="#d5ff3f"><path d="M24 43 50 34 66 22h32l18 19 29 5v9H20z"/><path d="M14 24h32v5H14zM136 41h17v5h-17z"/></g><path d="M72 26h20l10 12H62z" fill="#10120f"/><g fill="#10120f" stroke="#f3f4ec" stroke-width="3"><circle cx="43" cy="53" r="12"/><circle cx="122" cy="53" r="12"/></g><path d="M0 38h22M3 47h12" stroke="#9ca394" stroke-width="2"/></svg></div><p class="transition-label">ON TO THE NEXT PAGE</p>';
    document.body.append(overlay);
    let committed=false;const navigate=()=>{if(committed||!destination)return;committed=true;location.assign(destination);};
    overlay.querySelector('.transition-car').addEventListener('animationend',navigate,{once:true});
    timer=setTimeout(navigate,950);
  });
})();

// Smooth wheel scrolling, leaving touch, zoom and nested scrolling native.
(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,target=scrollY,last=0;
  const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0;target=scrollY;};
  const max=()=>Math.max(0,document.documentElement.scrollHeight-innerHeight);
  function step(time){
    const dt=last?Math.min(time-last,64):16;last=time;
    target=Math.max(0,Math.min(max(),target));
    const difference=target-scrollY;
    if(Math.abs(difference)<1){scrollTo({top:target,behavior:'instant'});stop();return;}
    scrollTo({top:scrollY+difference*(1-Math.exp(-dt/85)),behavior:'instant'});
    frame=requestAnimationFrame(step);
  }
  addEventListener('wheel',event=>{
    if(event.defaultPrevented||!event.cancelable||reduced.matches||event.ctrlKey||event.metaKey||event.shiftKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||!event.deltaY||document.querySelector('.page-transition'))return;
    for(let el=event.target instanceof Element?event.target:null;el&&el!==document.body;el=el.parentElement){
      if(el.matches('input,textarea,select,[contenteditable="true"]')){stop();return;}
      if(/auto|scroll/.test(getComputedStyle(el).overflowY)&&el.scrollHeight>el.clientHeight){stop();return;}
    }
    event.preventDefault();
    if(!frame)target=scrollY;
    const delta=event.deltaY*(event.deltaMode===1?18:event.deltaMode===2?innerHeight:1);
    target=Math.max(0,Math.min(max(),target+delta));
    if(!frame)frame=requestAnimationFrame(step);
  },{passive:false});
  for(const type of ['pointerdown','touchstart','keydown','hashchange','pagehide','resize'])addEventListener(type,stop,{passive:true});
  reduced.addEventListener('change',stop);
})();

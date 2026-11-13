// c-f-x.com: the scripts every page shares: the theme switch, the rise into place, and the cookieless page view.
(function(){
  var root=document.documentElement;
  var t=document.getElementById('theme');
  function label(){t.setAttribute('aria-label',root.getAttribute('data-theme')==='dark'?'Switch to light theme':'Switch to dark theme');}
  label();
  t.addEventListener('click',function(){
    var next=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('cfx-theme',next)}catch(e){}
    label();
  });
})();
(function(){
  var items=document.querySelectorAll('.rise');
  function show(el){el.classList.add('in');}
  if(!('IntersectionObserver' in window)){Array.prototype.forEach.call(items,show);return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){show(e.target);io.unobserve(e.target);}
  });},{rootMargin:'0px 0px -6% 0px'});
  Array.prototype.forEach.call(items,function(el){io.observe(el);});
})();
/* one cookieless page view for c-f-x.com, counted in the EU.
   no cookies, no storage, no library; nothing is sent under Do Not Track or Global Privacy Control. */
(function(){
  if (location.host !== 'c-f-x.com' && location.host !== 'www.c-f-x.com') return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  var t = 'cfa_pk_9nBx2CZetLDUP3xHQWdfizPFW_czYrPtkpUwiiufLis', r = document.referrer, d = '$direct';
  try { if (r) d = new URL(r).host; } catch (e) {}
  var now = new Date().toISOString();
  var p = { token: t, distinct_id: '$posthog_cookieless', $cookieless_mode: true, $lib: 'web',
    $current_url: location.href, $host: location.host, $pathname: location.pathname, title: document.title,
    $referrer: r || '$direct', $referring_domain: d, $raw_user_agent: navigator.userAgent.slice(0, 1000),
    $timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, $browser_language: navigator.language,
    $screen_width: screen.width, $screen_height: screen.height, $viewport_width: innerWidth, $viewport_height: innerHeight };
  fetch('https://e.c-f-x.com/i/v0/e/', { method: 'POST', keepalive: true,
    body: JSON.stringify({ api_key: t, batch: [{ event: '$pageview', properties: p, timestamp: now }], sent_at: now }) })
    .catch(function(){});
})();

(function(){
  // The proof band's numbers count up once as the band scrolls in. The page holds the final
  // numbers, so without scripts, or with reduced motion, they simply show.
  var nums=document.querySelectorAll('.proof dd');
  if(!nums.length||!('IntersectionObserver' in window)) return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var band=document.querySelector('.proof');
  var io=new IntersectionObserver(function(es){
    if(!es[0].isIntersecting) return; io.disconnect();
    Array.prototype.forEach.call(nums,function(el){
      var to=parseInt(el.textContent,10); if(!(to>1)) return;
      var start=null;
      function step(now){
        if(!start) start=now;
        var p=Math.min(1,(now-start)/700), e=1-Math.pow(1-p,3);
        el.textContent=String(Math.round(to*e));
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  },{rootMargin:'0px 0px -10% 0px'});
  io.observe(band);
})();

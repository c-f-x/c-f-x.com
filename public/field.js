// The hero's field. Each cell of a monospace grid takes a character by how strong the wave is there:
// light glyphs at the edges of a wave, heavy ones at its crest, and the brand teal at the strongest crests.
// On load the field drifts upward into place and stops. Reduced motion gets the final frame straight away.
(function(){
  var c=document.querySelector('.hero-field'); if(!c||!c.getContext) return;
  var ctx=c.getContext('2d'), root=document.documentElement;
  var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var RAMP=' .·:;=+*o0%#', HEAVY=8, FS=12, LH=15, FPS=24;
  var W,H,CW,cols,rows,ink,accent,last=0;
  function colours(){var cs=getComputedStyle(root);ink=cs.getPropertyValue('--cfx-text').trim()||'#121212';accent=cs.getPropertyValue('--cfx-primary').trim()||'#086A72';}
  function font(w){ctx.font=w+' '+FS+'px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';}
  function size(){
    var r=c.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2);
    W=r.width;H=r.height;c.width=Math.round(W*d);c.height=Math.round(H*d);
    ctx.setTransform(d,0,0,d,0,0);ctx.textBaseline='top';font(400);
    CW=Math.ceil(ctx.measureText('M').width)+2;cols=Math.ceil(W/CW);rows=Math.ceil(H/LH);
  }
  function sm(a,b,x){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x);}
  // where the field may show: on a wide screen it thins out toward the headline on the left;
  // on a narrow one the text runs full width, so the field keeps to the strip above the headline
  function keep(x,y){return W<720?1-sm(56,104,y*LH):.12+.88*sm(.3,.72,x/cols);}
  // value noise: a smooth random height at every point, layered at three scales (fbm)
  function h(i,j){var n=Math.sin(i*127.1+j*311.7)*43758.5453;return n-Math.floor(n);}
  function noise(x,y){var i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);
    var a=h(i,j),b=h(i+1,j),c2=h(i,j+1),d=h(i+1,j+1);return a+(b-a)*ux+(c2-a)*uy+(a-b-c2+d)*ux*uy;}
  function fbm(x,y){return .55*noise(x,y)+.3*noise(x*2.03+5.2,y*2.03+1.3)+.15*noise(x*4.1+9.7,y*4.1+3.1);}
  function draw(p){
    var e=1-Math.pow(1-p,3),t=9+3*e;   // eased: fast at first, settling to a stop
    ctx.clearRect(0,0,W,H);
    var heavy=[],x,y,X,Y,q,n,k,i,band;
    for(y=0;y<rows;y++){
      Y=y*LH/260+t*.07;               // the field drifts upward
      for(x=0;x<cols;x++){
        X=x*CW/260;
        q=fbm(X*.8+t*.02,Y*.8);       // warp the field by itself, so the masses curl like waves
        n=fbm(X+q*1.8,Y+q*1.8-t*.03);
        band=.5+.5*Math.sin((X*.6+Y*1.1+q*3)*2.2);   // long wave bands running through the masses
        k=sm(.42,.78,n)*(.55+.45*band)*keep(x,y)*(.25+.75*e);
        if(k<.06) continue;
        i=Math.max(1,Math.min(RAMP.length-1,Math.floor(k*(RAMP.length-1)+h(x,y)*1.6)));   // a little jitter, so rows don't read as stripes
        if(i>=HEAVY){heavy.push(x,y,i,k);continue;}
        ctx.globalAlpha=.1+.4*k;ctx.fillStyle=ink;ctx.fillText(RAMP[i],x*CW,y*LH);
      }
    }
    font(700);
    for(k=0;k<heavy.length;k+=4){
      ctx.globalAlpha=.14+.46*heavy[k+3];ctx.fillStyle=heavy[k+3]>.8?accent:ink;
      ctx.fillText(RAMP[heavy[k+2]],heavy[k]*CW,heavy[k+1]*LH);
    }
    font(400);ctx.globalAlpha=1;
  }
  var RISE=2600,start=0;
  function loop(now){
    if(!start) start=now;
    var p=Math.min(1,(now-start)/RISE);
    if(now-last>=1000/FPS||p===1){last=now;draw(p);}
    if(p<1) requestAnimationFrame(loop);
  }
  colours();size();
  draw(still?1:0);c.classList.add('on');
  new MutationObserver(function(){colours();draw(1);}).observe(root,{attributes:true,attributeFilter:['data-theme']});
  window.addEventListener('resize',function(){size();draw(1);});
  if(!still) requestAnimationFrame(loop);
})();

const {useState,useEffect,useRef,useCallback,useMemo}=React;

// ════════════════════════════════════════════
// CONFIG — Edit these!
// ════════════════════════════════════════════
const CONFIG = {
  startDate: new Date('2024-01-04T00:00:00'),
  herName:   'My Love',
  yourName:  'Yours Forever',
};

const ROSE  = '#ff4477';
const GOLD  = '#f5c87a';
const PEACH = '#ffb3c6';
const DARK  = '#04000e';
const MAUVE = '#c084a0';

// ════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════
const QUOTES = [
  "You are my sun, my moon,\nand all of my stars.\n— E.E. Cummings",
  "I have waited for this opportunity for more than half a century,\nto repeat to you once again my vow of eternal fidelity and love.\n— Gabriel García Márquez",
  "Whatever our souls are made of,\nhis and mine are the same.\n— Emily Brontë",
  "I love you without knowing how,\nor when, or from where. I love you simply.\n— Pablo Neruda",
  "You know you're in love when you can't fall asleep\nbecause reality is finally better than your dreams.\n— Dr. Seuss",
  "In all the world, there is no heart for me like yours.\nIn all the world, there is no love for you like mine.\n— Maya Angelou",
];

const REASONS = [
  {num:'01', title:'Your Eyes',     sub:'There is a whole universe in them. When you look at me, I feel like time itself stops — just you and me.'},
  {num:'02', title:'Your Smile',    sub:'The most beautiful thing I have ever seen. One smile from you and everything in the world feels right again.'},
  {num:'03', title:'Your Heart',    sub:'So kind, so warm, so genuine. The way you care for everyone around you — that is your truest beauty.'},
  {num:'04', title:'Your Courage',  sub:'You face every storm with grace. Your strength inspires me every single day to be a better person.'},
  {num:'05', title:'Your Presence', sub:'Every moment with you becomes a memory I never want to forget. Simply being near you is enough.'},
  {num:'06', title:'Just You',      sub:'Do I need another reason? You exist — and that is the greatest, most complete reason of all.'},
];

const MEMORIES = [
  {emoji:'🌹', title:'First Meeting',  msg:'From the very first moment, something in me knew — this is her...'},
  {emoji:'🌅', title:'That Evening',   msg:'Just the two of us, the sky, and a thousand unspoken words...'},
  {emoji:'😊', title:'Your Laughter', msg:'The sound of your laugh — the finest music I have ever heard...'},
  {emoji:'🤝', title:'Your Hand',      msg:'The first time I held your hand, I felt like I was finally home...'},
  {emoji:'✨', title:'Your Light',     msg:'Your face outshines the moon — you are the light in my every dark...'},
  {emoji:'💫', title:'My World',       msg:'You — my entire world, my whole sky, my everything...'},
];

const LETTER_TEXT = `${CONFIG.herName},

Some things cannot be said in words — they live in glances, in smiles, in the quiet beat of a heart that belongs to you.

But today, I felt the need to write — because you deserve to know that you are the most beautiful thing that has ever happened to me.

Your laughter is my light in the darkest hours. Your name on my lips is the closest thing I know to a prayer. And your company — my most essential need.

Whenever something wonderful happens, the first thing I want to do is tell you.

This is what love is — and every bit of it is yours. Always.`;

const TIMELINE = [
  {date:'The First Day',    text:'Something stirred in me the moment I saw you — a pull I had never felt before.'},
  {date:'First Words',      text:'The moment we first spoke, something in me knew — there was no going back.'},
  {date:'First Laugh',      text:'I heard you laugh for the first time and thought: I want to hear that sound forever.'},
  {date:'First "I Love You"', text:'The moment you said yes — the most beautiful memory of my entire life.'},
  {date:'Today',            text:'Today, tomorrow, always — I am yours. Not a promise. A certainty.'},
];

const SCRATCH_REVEALS = [
  {front:'🎁', back:'You make every day feel like a gift'},
  {front:'🌙', back:'I fall for you all over again every single night'},
  {front:'☕', back:'You are my favorite reason to wake up'},
  {front:'🎵', back:'Every love song finally makes sense because of you'},
  {front:'🌟', back:'You are the answer to questions I forgot to ask'},
  {front:'💌', back:'If I wrote you a letter every day it still wouldn\'t be enough'},
];

// ════════════════════════════════════════════
// PARTICLE CANVAS
// ════════════════════════════════════════════
function ParticleCanvas({mouseRef, burstRef}){
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H;
    const setSize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    setSize();
    window.addEventListener('resize', setSize);
    const stars = Array.from({length:320}, () => ({
      x:Math.random()*2600-1300, y:Math.random()*2600-1300, z:Math.random()*1000,
      speed:Math.random()*1.3+0.3, size:Math.random()*1.6+0.2,
      tw:Math.random()*Math.PI*2, twS:Math.random()*0.04+0.01,
      isRose:Math.random()<0.07, isGold:Math.random()<0.04,
    }));
    const floats = Array.from({length:14}, () => ({
      x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight,
      size:Math.random()*12+5, vx:(Math.random()-0.5)*0.22, vy:-(Math.random()*0.38+0.08),
      a:Math.random()*0.22+0.04, rot:Math.random()*Math.PI*2, rotS:(Math.random()-0.5)*0.012,
    }));
    let explosions = [];
    let raf;
    function drawHeart(ctx,x,y,r,a,rot,color=ROSE){
      ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.globalAlpha=a; ctx.fillStyle=color;
      ctx.beginPath(); ctx.moveTo(0,-r*0.5);
      ctx.bezierCurveTo(r*0.6,-r*1.1,r*1.2,-r*0.3,0,r*0.6);
      ctx.bezierCurveTo(-r*1.2,-r*0.3,-r*0.6,-r*1.1,0,-r*0.5);
      ctx.fill(); ctx.restore();
    }
    function tick(){
      ctx.clearRect(0,0,W,H);
      const bg = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.85);
      bg.addColorStop(0,'rgba(22,0,40,1)'); bg.addColorStop(0.5,'rgba(8,0,20,1)'); bg.addColorStop(1,'rgba(0,0,6,1)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      const mx=mouseRef.current.x||W/2, my=mouseRef.current.y||H/2;
      for(const s of stars){
        s.tw+=s.twS; s.z-=s.speed;
        if(s.z<=0){ s.z=1000; s.x=Math.random()*2600-1300; s.y=Math.random()*2600-1300; }
        const sx=(s.x/s.z)*W+W/2+(mx-W/2)*0.018, sy=(s.y/s.z)*H+H/2+(my-H/2)*0.018;
        const r=Math.max(s.size*(1-s.z/1000)*3,0.1), a=(1-s.z/1000)*(0.5+0.5*Math.abs(Math.sin(s.tw)));
        if(sx<-5||sx>W+5||sy<-5||sy>H+5) continue;
        ctx.beginPath(); ctx.arc(sx,sy,r,0,Math.PI*2);
        ctx.fillStyle=s.isRose?`rgba(255,68,120,${a})`:s.isGold?`rgba(245,200,122,${a})`:`rgba(255,255,255,${a*0.82})`;
        ctx.fill();
      }
      const orb=ctx.createRadialGradient(mx,my,0,mx,my,130);
      orb.addColorStop(0,'rgba(255,68,120,0.07)'); orb.addColorStop(1,'rgba(255,68,120,0)');
      ctx.fillStyle=orb; ctx.fillRect(0,0,W,H);
      for(const h of floats){
        h.x+=h.vx; h.y+=h.vy; h.rot+=h.rotS;
        if(h.y<-30){ h.y=H+20; h.x=Math.random()*W; }
        drawHeart(ctx,h.x,h.y,h.size,h.a,h.rot);
      }
      explosions=explosions.filter(ex=>ex.particles.length>0);
      for(const ex of explosions){
        ex.particles=ex.particles.filter(p=>p.a>0);
        for(const p of ex.particles){
          p.x+=p.vx; p.y+=p.vy; p.vy+=0.14; p.vx*=0.99; p.a-=p.fade; p.rot+=p.rotS;
          if(p.isHeart) drawHeart(ctx,p.x,p.y,p.r,p.a,p.rot,p.color);
          else{ ctx.globalAlpha=p.a; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.color; ctx.fill(); ctx.globalAlpha=1; }
        }
      }
      ctx.globalAlpha=1;
      if(burstRef.current){
        const {x,y}=burstRef.current; burstRef.current=null;
        const ps=[];
        for(let i=0;i<110;i++){
          const ang=Math.random()*Math.PI*2, spd=Math.random()*9+2, isHeart=Math.random()<0.28;
          ps.push({x,y,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd-3,a:1,r:isHeart?(Math.random()*9+4):(Math.random()*4+1.5),fade:Math.random()*0.012+0.01,color:`hsl(${330+Math.random()*50},100%,${62+Math.random()*22}%)`,isHeart,rot:Math.random()*Math.PI*2,rotS:(Math.random()-0.5)*0.18});
        }
        explosions.push({particles:ps});
      }
      raf=requestAnimationFrame(tick);
    }
    tick();
    return()=>{ window.removeEventListener('resize',setSize); cancelAnimationFrame(raf); };
  },[]);
  return React.createElement('canvas',{ref:canvasRef,style:{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}});
}

// ════════════════════════════════════════════
// CURSOR
// ════════════════════════════════════════════
function Cursor(){
  const [pos,setPos]=useState({x:-200,y:-200});
  const [trail,setTrail]=useState([]);
  useEffect(()=>{
    let id;
    const move=e=>{ cancelAnimationFrame(id); id=requestAnimationFrame(()=>{ setPos({x:e.clientX,y:e.clientY}); setTrail(t=>[{x:e.clientX,y:e.clientY,k:Date.now()+Math.random()},...t.slice(0,7)]); }); };
    window.addEventListener('mousemove',move);
    return()=>window.removeEventListener('mousemove',move);
  },[]);
  return React.createElement(React.Fragment,null,
    trail.map((t,i)=>React.createElement('div',{key:t.k,style:{position:'fixed',left:t.x,top:t.y,zIndex:9998,pointerEvents:'none',width:Math.max(3-i*0.35,0.5),height:Math.max(3-i*0.35,0.5),borderRadius:'50%',background:`rgba(255,68,120,${Math.max(0.6-i*0.08,0)})`,transform:'translate(-50%,-50%)'}})),
    React.createElement('div',{style:{position:'fixed',left:pos.x,top:pos.y,zIndex:9999,pointerEvents:'none',fontSize:18,transform:'translate(-50%,-50%)',filter:'drop-shadow(0 0 10px #ff4477)'}},'\u2665')
  );
}

// ════════════════════════════════════════════
// FLOATING HEART
// ════════════════════════════════════════════
function FloatingHeart({x,y,onDone}){
  const g=['\u2665','💕','✦','💖','·'];
  const glyph=useMemo(()=>g[Math.floor(Math.random()*g.length)],[]);
  const dx=useMemo(()=>(Math.random()-0.5)*60,[]);
  const sz=useMemo(()=>10+Math.random()*14,[]);
  const col=useMemo(()=>`hsl(${335+Math.random()*30},100%,${65+Math.random()*18}%)`,[]);
  useEffect(()=>{ const t=setTimeout(onDone,3000); return()=>clearTimeout(t); },[]);
  return React.createElement('div',{style:{position:'fixed',left:x+dx,top:y,fontSize:sz,color:col,pointerEvents:'none',zIndex:9000,animation:'floatingHeartUp 3s ease forwards'}},glyph);
}

// ════════════════════════════════════════════
// MUSIC PLAYER
// ════════════════════════════════════════════
function MusicPlayer({audioRef}){
  const [playing,setPlaying]=useState(false);
  const [songName,setSongName]=useState('');
  const [loaded,setLoaded]=useState(false);
  const [progress,setProgress]=useState(0);
  const [duration,setDuration]=useState(0);
  const [volume,setVolume]=useState(0.7);
  const [eq,setEq]=useState([4,8,14,20,16,12,18,10]);

  // Auto-load AND autoplay song from /music folder
  useEffect(()=>{
    fetch('/api/music')
      .then(r=>r.json())
      .then(files=>{
        if(!files.length||!audioRef.current) return;
        const song = files[0];
        const a = audioRef.current;
        a.src = song.src;
        a.volume = volume;
        a.loop = true;
        setSongName(song.name);
        setLoaded(true);
        // Try autoplay — browser may block it before user interaction
        const playPromise = a.play();
        if(playPromise !== undefined){
          playPromise.then(()=>setPlaying(true)).catch(()=>{
            // Autoplay blocked — play on first user click anywhere
            const unlock = ()=>{
              a.play().then(()=>{ setPlaying(true); document.removeEventListener('click', unlock); }).catch(()=>{});
            };
            document.addEventListener('click', unlock);
          });
        }
      })
      .catch(()=>{});
  },[]);

  useEffect(()=>{
    if(!audioRef.current) return;
    const a=audioRef.current;
    const upd=()=>{ if(a.duration) setProgress(a.currentTime/a.duration*100); };
    const dur=()=>setDuration(a.duration);
    a.addEventListener('timeupdate',upd);
    a.addEventListener('loadedmetadata',dur);
    return()=>{ a.removeEventListener('timeupdate',upd); a.removeEventListener('loadedmetadata',dur); };
  },[]);

  useEffect(()=>{
    let iv;
    if(playing){ iv=setInterval(()=>setEq(e=>e.map(()=>4+Math.random()*18)),120); }
    return()=>clearInterval(iv);
  },[playing]);

  function toggle(){
    if(!audioRef.current||!loaded) return;
    if(playing){ audioRef.current.pause(); setPlaying(false); }
    else{ audioRef.current.play().then(()=>setPlaying(true)).catch(()=>{}); }
  }

  function seek(e){
    if(!audioRef.current||!duration) return;
    const r=e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime=((e.clientX-r.left)/r.width)*duration;
  }

  function changeVol(e){
    const v=parseFloat(e.target.value);
    setVolume(v);
    if(audioRef.current) audioRef.current.volume=v;
  }

  const fmt=s=>{ if(!s||isNaN(s)) return '0:00'; const m=Math.floor(s/60); return m+':'+(Math.floor(s%60)+'').padStart(2,'0'); };
  const cur=audioRef.current?audioRef.current.currentTime:0;

  // Always hidden — song plays silently in background
  return null;
}

// ════════════════════════════════════════════
// PHOTO GALLERY SCREEN — loads from /photos folder
// ════════════════════════════════════════════
function GalleryScreen({onNext,onBurst}){
  const [photos,setPhotos]=useState([]);
  const [active,setActive]=useState(null);
  const [hov,setHov]=useState(null);
  const photoRots=useMemo(()=>Array.from({length:40},()=>(Math.random()-0.5)*8),[]);

  // Load photos from server's /photos folder on mount
  useEffect(()=>{
    fetch('/api/photos')
      .then(r=>r.json())
      .then(files=>setPhotos(files.map((f,i)=>({...f,id:i}))))
      .catch(()=>{});
  },[]);

  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px 24px',gap:0}},
    React.createElement('div',{style:{textAlign:'center',marginBottom:28}},
      React.createElement('h2',{style:{fontFamily:'Playfair Display',fontWeight:300,fontSize:'clamp(1.9rem,4.5vw,3.2rem)',color:'#fff',letterSpacing:2}},'Our Memories'),
      React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:9,letterSpacing:6,color:'rgba(255,150,180,0.35)',marginTop:10,textTransform:'uppercase'}},'Click a photo — reveal the moment')
    ),

    // Real photos from /photos folder — polaroid style
    photos.length>0 && React.createElement('div',{style:{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',maxWidth:900,marginBottom:8}},
      photos.map((p,i)=>{
        const isH=hov===('p'+i);
        return React.createElement('div',{key:p.id,
          onClick:e=>{ setActive('p'+i); onBurst({x:e.clientX,y:e.clientY}); },
          onMouseEnter:()=>setHov('p'+i), onMouseLeave:()=>setHov(null),
          style:{background:'#fff',padding:'10px 10px 42px',width:200,cursor:'pointer',position:'relative',
            transform:isH?'rotate(0deg) scale(1.12) translateY(-18px)':`rotate(${photoRots[i%40]}deg)`,
            transition:'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s',
            boxShadow:isH?'0 30px 80px rgba(255,68,120,0.55)':'0 5px 24px rgba(0,0,0,0.55)',
            animation:'slidePop 0.5s ease',zIndex:isH?20:1}},
          React.createElement('img',{src:p.src,style:{width:'100%',aspectRatio:'1',objectFit:'cover',display:'block'}}),
          React.createElement('div',{style:{position:'absolute',bottom:7,left:0,right:0,textAlign:'center',fontFamily:'Playfair Display',fontStyle:'italic',fontSize:9.5,color:'#555',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',padding:'0 4px'}},[' Us Together ♥',' Just You Two ',' Your Smile ',' Our Vibe ✨',' My Favourite ',' Pure Love ',' Golden Moment ',' My World '][i%8])
        );
      })
    ),

    // Reveal message
    React.createElement('div',{style:{fontFamily:'Playfair Display',fontStyle:'italic',fontSize:'0.95rem',color:'rgba(255,200,225,0.82)',textAlign:'center',minHeight:20,maxWidth:460,opacity:active!==null?1:0,transition:'all 0.4s ease'}},
      active&&active.startsWith('p')?'Every photo of you is my favorite...':''),

    React.createElement('button',{onClick:onNext,
      style:{marginTop:12,background:'transparent',border:'1px solid rgba(255,68,120,0.3)',color:'rgba(255,150,180,0.6)',fontFamily:'DM Sans',fontSize:9,letterSpacing:5,padding:'12px 36px',cursor:'pointer',transition:'all 0.35s',borderRadius:2},
      onMouseEnter:e=>{e.currentTarget.style.background='rgba(255,68,120,0.12)';e.currentTarget.style.color=ROSE;e.currentTarget.style.borderColor=ROSE;},
      onMouseLeave:e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,150,180,0.6)';e.currentTarget.style.borderColor='rgba(255,68,120,0.3)';}
    },'Why I Love You  →')
  );
}

// ════════════════════════════════════════════
// SCRATCH CARD SCREEN (new!)
// ════════════════════════════════════════════
function ScratchScreen({onNext}){
  const [revealed,setRevealed]=useState(new Set());
  const [hovCard,setHovCard]=useState(null);
  const [v,setV]=useState(false);
  useEffect(()=>{ setTimeout(()=>setV(true),60); },[]);

  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}},
    React.createElement('div',{style:{textAlign:'center',marginBottom:36}},
      React.createElement('h2',{style:{fontFamily:'Playfair Display',fontWeight:300,fontSize:'clamp(1.9rem,4.5vw,3.2rem)',color:'#fff',letterSpacing:2,opacity:v?1:0,transform:v?'translateY(0)':'translateY(20px)',transition:'all 0.8s ease'}},'Little Secrets'),
      React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:9,letterSpacing:6,color:'rgba(255,150,180,0.35)',marginTop:10,textTransform:'uppercase',opacity:v?1:0,transition:'all 0.8s ease 0.2s'}},'Click each card to reveal what I think about you')
    ),
    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,maxWidth:480,width:'100%'}},
      SCRATCH_REVEALS.map((s,i)=>{
        const isRev=revealed.has(i), isH=hovCard===i;
        return React.createElement('div',{key:i,
          onClick:()=>setRevealed(r=>new Set([...r,i])),
          onMouseEnter:()=>setHovCard(i), onMouseLeave:()=>setHovCard(null),
          style:{
            aspectRatio:'1',borderRadius:12,cursor:'pointer',position:'relative',overflow:'hidden',
            background: isRev?'rgba(255,68,120,0.12)':'rgba(255,255,255,0.04)',
            border:`1px solid ${isRev?ROSE:isH?'rgba(255,68,120,0.4)':'rgba(255,68,120,0.12)'}`,
            boxShadow:isRev?`0 0 24px rgba(255,68,120,0.3)`:isH?`0 8px 30px rgba(255,68,120,0.2)`:'none',
            transform:`scale(${isH&&!isRev?1.06:1}) rotate(${i%2===0?-1.5:1.5}deg)`,
            transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,
            padding:10,
            opacity:v?1:0, transitionDelay:`${i*0.08+0.3}s`,
          }},
          !isRev && React.createElement('div',{style:{fontSize:32, filter:isH?'none':'grayscale(0.3)',transition:'filter 0.3s'}},s.front),
          !isRev && React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:8,letterSpacing:3,color:'rgba(255,150,180,0.3)',textTransform:'uppercase'}},isH?'Reveal ♥':'Click'),
          isRev && React.createElement('div',{style:{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:'0.88rem',color:PEACH,textAlign:'center',lineHeight:1.6,animation:'fadeInUp 0.5s ease'}},s.back),
          isRev && React.createElement('div',{style:{fontSize:18,animation:'pulse 2s ease infinite'}},s.front),
        );
      })
    ),
    revealed.size===SCRATCH_REVEALS.length && React.createElement('div',{style:{marginTop:20,fontFamily:'Playfair Display',fontStyle:'italic',fontSize:'1rem',color:GOLD,animation:'fadeInUp 0.8s ease',textAlign:'center'}}, '✦  You are my every little thought  ✦'),
    React.createElement('button',{onClick:onNext,
      style:{marginTop:24,background:'transparent',border:'1px solid rgba(255,68,120,0.3)',color:'rgba(255,150,180,0.6)',fontFamily:'DM Sans',fontSize:9,letterSpacing:5,padding:'12px 36px',cursor:'pointer',transition:'all 0.35s',borderRadius:2,opacity:v?1:0,transitionDelay:'0.9s'},
      onMouseEnter:e=>{e.currentTarget.style.background='rgba(255,68,120,0.12)';e.currentTarget.style.color=ROSE;e.currentTarget.style.borderColor=ROSE;},
      onMouseLeave:e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,150,180,0.6)';e.currentTarget.style.borderColor='rgba(255,68,120,0.3)';}
    },'Why I Love You  →')
  );
}

// ════════════════════════════════════════════
// LOVE COUNTER SCREEN — real-time live timer
// ════════════════════════════════════════════
function CounterScreen({onNext}){
  const [now,setNow]=useState(new Date());
  const [v,setV]=useState(false);
  useEffect(()=>{ setTimeout(()=>setV(true),60); const iv=setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(iv); },[]);

  // Exact years, months, days calculation
  const start = CONFIG.startDate;
  let yy=now.getFullYear()-start.getFullYear();
  let mm=now.getMonth()-start.getMonth();
  let dd=now.getDate()-start.getDate();
  if(dd<0){ mm--; const prev=new Date(now.getFullYear(),now.getMonth(),0); dd+=prev.getDate(); }
  if(mm<0){ yy--; mm+=12; }

  // Total elapsed for sub-day units
  const diff = now - start;
  const totalSecs  = Math.floor(diff/1000);
  const totalMins  = Math.floor(diff/60000);
  const totalHours = Math.floor(diff/3600000);
  const totalDays  = Math.floor(diff/86400000);
  const hh = Math.floor((diff % 86400000)/3600000);
  const mn = Math.floor((diff % 3600000)/60000);
  const sc = Math.floor((diff % 60000)/1000);

  // Big live display units
  const timerUnits=[
    {val:String(yy).padStart(2,'0'),   label:'Years',   live:false},
    {val:String(mm).padStart(2,'0'),   label:'Months',  live:false},
    {val:String(dd).padStart(2,'0'),   label:'Days',    live:false},
    {val:String(hh).padStart(2,'0'),   label:'Hours',   live:true},
    {val:String(mn).padStart(2,'0'),   label:'Minutes', live:true},
    {val:String(sc).padStart(2,'0'),   label:'Seconds', live:true},
  ];

  // Fun stats
  const stats=[
    {val:totalDays.toLocaleString(),          label:'Total Days',          icon:'🌅'},
    {val:totalHours.toLocaleString(),         label:'Hours of Love',       icon:'⏰'},
    {val:totalMins.toLocaleString(),          label:'Minutes of Magic',    icon:'✨'},
    {val:totalSecs.toLocaleString(),          label:'Seconds Together',    icon:'💫'},
    {val:Math.floor(totalSecs*1.2).toLocaleString(), label:'Heartbeats for You', icon:'💓'},
    {val:Math.floor(totalSecs/4).toLocaleString(),   label:'Breaths of You',     icon:'🌸'},
    {val:Math.floor(totalDays*3).toLocaleString(),   label:'Smiles You Gave Me', icon:'😊'},
    {val:'∞',                                label:'Ways I Love You',     icon:'♾️'},
  ];

  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px 24px',gap:0,overflowY:'auto'}},

    // Heading
    React.createElement('div',{style:{textAlign:'center',marginBottom:20,opacity:v?1:0,transform:v?'none':'translateY(20px)',transition:'all 0.8s ease'}},
      React.createElement('h2',{style:{fontFamily:'Playfair Display',fontWeight:300,fontSize:'clamp(1.8rem,4vw,3rem)',color:'#fff',letterSpacing:2}},'Time With You'),
      React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:9,letterSpacing:6,color:'rgba(255,150,180,0.35)',marginTop:8,textTransform:'uppercase'}},'Since 4 January 2024 — every second counted')
    ),

    // ── LIVE BIG TIMER ──
    React.createElement('div',{style:{
      display:'flex',gap:6,alignItems:'center',justifyContent:'center',
      flexWrap:'wrap',marginBottom:20,
      opacity:v?1:0,transform:v?'none':'translateY(16px)',transition:'all 0.7s ease 0.2s'
    }},
      timerUnits.map((u,i)=>React.createElement(React.Fragment,{key:i},
        React.createElement('div',{style:{textAlign:'center',minWidth:58}},
          React.createElement('div',{style:{
            fontFamily:'Playfair Display',fontWeight:300,
            fontSize:'clamp(1.8rem,5vw,3.2rem)',
            color: u.live ? ROSE : 'rgba(255,230,240,0.9)',
            lineHeight:1,letterSpacing:2,
            textShadow: u.live ? `0 0 30px rgba(255,68,120,0.6)` : 'none',
            transition:'color 0.3s',
          }},u.val),
          React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:8,letterSpacing:3,color:'rgba(255,150,180,0.4)',textTransform:'uppercase',marginTop:5}},u.label)
        ),
        i<timerUnits.length-1 && React.createElement('div',{style:{
          fontFamily:'Playfair Display',fontSize:'clamp(1.4rem,3vw,2.2rem)',
          color:'rgba(255,68,120,0.3)',marginBottom:18,alignSelf:'flex-start',paddingTop:4,
        }},':')
      ))
    ),

    // ── START DATE badge ──
    React.createElement('div',{style:{
      fontFamily:'DM Sans',fontSize:9,letterSpacing:4,
      color:'rgba(255,150,180,0.3)',textTransform:'uppercase',
      marginBottom:20,
      opacity:v?1:0,transition:'all 0.8s ease 0.4s'
    }},'❤  4 Jan 2024  →  Abhi Tak  ❤'),

    // ── Fun stats grid ──
    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,maxWidth:560,width:'100%'}},
      stats.map((s,i)=>React.createElement('div',{key:i,style:{
        background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,68,120,0.10)',
        borderRadius:8,padding:'10px 6px',textAlign:'center',
        opacity:v?1:0,transform:v?'none':'translateY(20px) scale(0.95)',
        transition:`all 0.6s ease ${i*0.06+0.5}s`,
      }},
        React.createElement('div',{style:{fontSize:16,marginBottom:3}},s.icon),
        React.createElement('div',{style:{fontFamily:'Playfair Display',fontSize:'clamp(0.75rem,2vw,1.1rem)',color:i<4?ROSE:GOLD,fontWeight:300,lineHeight:1.1,marginBottom:3}},s.val),
        React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:7,letterSpacing:1.5,color:'rgba(255,150,180,0.35)',textTransform:'uppercase',lineHeight:1.4}},s.label)
      ))
    ),

    React.createElement('div',{style:{marginTop:14,fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:'1rem',color:'rgba(255,200,220,0.55)',textAlign:'center',opacity:v?1:0,transition:'all 0.8s ease 1.2s'}},'Har ek second — sirf tumhara.'),

    React.createElement('button',{onClick:onNext,
      style:{marginTop:16,background:'transparent',border:'1px solid rgba(255,68,120,0.3)',color:'rgba(255,150,180,0.6)',fontFamily:'DM Sans',fontSize:9,letterSpacing:5,padding:'12px 36px',cursor:'pointer',transition:'all 0.35s',borderRadius:2,opacity:v?1:0,transitionDelay:'1.3s'},
      onMouseEnter:e=>{e.currentTarget.style.background='rgba(255,68,120,0.12)';e.currentTarget.style.color=ROSE;e.currentTarget.style.borderColor=ROSE;},
      onMouseLeave:e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,150,180,0.6)';e.currentTarget.style.borderColor='rgba(255,68,120,0.3)';}
    },'Our Journey  →')
  );
}

// ════════════════════════════════════════════
// SECTION HEADING
// ════════════════════════════════════════════
function SectionHead({title,sub}){
  return React.createElement('div',{style:{textAlign:'center',marginBottom:36}},
    React.createElement('h2',{style:{fontFamily:'Playfair Display',fontWeight:300,fontSize:'clamp(1.9rem,4.5vw,3.2rem)',color:'#fff',letterSpacing:2,lineHeight:1.15}},title),
    sub && React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:9,letterSpacing:6,color:'rgba(255,150,180,0.35)',marginTop:10,textTransform:'uppercase'}},sub)
  );
}

// ════════════════════════════════════════════
// HERO SCREEN
// ════════════════════════════════════════════
function HeroScreen({onNext}){
  const [v,setV]=useState(false);
  const [now,setNow]=useState(new Date());
  useEffect(()=>{ const t=setTimeout(()=>setV(true),80); const iv=setInterval(()=>setNow(new Date()),1000); return()=>{ clearTimeout(t); clearInterval(iv); }; },[]);
  const diff=now-CONFIG.startDate;
  const days=Math.max(0,Math.floor(diff/86400000));
  const hh=Math.floor((diff%86400000)/3600000);
  const mn=Math.floor((diff%3600000)/60000);
  const sc=Math.floor((diff%60000)/1000);
  const pad=n=>String(n).padStart(2,'0');
  const f=(d,ex={})=>({opacity:v?1:0,transform:v?'translateY(0)':'translateY(36px)',transition:`opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s`,...ex});
  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',textAlign:'center',gap:0}},
    React.createElement('div',{style:{...f(0),marginBottom:6,fontFamily:'DM Sans',fontSize:9,letterSpacing:8,color:'rgba(255,150,180,0.4)',textTransform:'uppercase'}},'A Gift, Just For You'),
    React.createElement('div',{style:{...f(0.15),marginBottom:24}},
      React.createElement('svg',{width:220,height:58,viewBox:'0 0 220 58'},
        React.createElement('polyline',{points:'0,29 35,29 47,6 57,52 65,17 73,40 85,29 220,29',fill:'none',stroke:ROSE,strokeWidth:1.9,strokeLinecap:'round',strokeLinejoin:'round',style:{strokeDasharray:380,strokeDashoffset:380,animation:'drawLine 2.2s ease infinite'}})
      )
    ),
    React.createElement('h1',{style:{...f(0.25),fontFamily:'Playfair Display',fontWeight:300,fontSize:'clamp(2.4rem,8vw,5.5rem)',color:'#fff',letterSpacing:3,lineHeight:1.08,marginBottom:16}},CONFIG.herName),
    React.createElement('div',{style:{...f(0.45),fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:'clamp(1rem,2.5vw,1.38rem)',color:'rgba(255,200,225,0.7)',marginBottom:32,maxWidth:440,lineHeight:1.85}},'There are no words beautiful enough — yet here I am, trying.'),
    React.createElement('div',{style:{...f(0.62),display:'flex',gap:20,justifyContent:'center',marginBottom:38,flexWrap:'wrap'}},
      [{val:days+'', label:'Days'},{val:`${pad(hh)}:${pad(mn)}:${pad(sc)}`, label:'Live Time'},{val:'∞', label:'Ways I Love You'},{val:'1', label:'You'}].map((item,i)=>
        React.createElement('div',{key:i,style:{textAlign:'center'}},
          React.createElement('div',{style:{fontFamily:'Playfair Display',fontSize:item.val==='∞'?'2.5rem':i===1?'1.6rem':'2rem',color:i===2?GOLD:ROSE,fontWeight:300,lineHeight:1,marginBottom:5,textShadow:i===1?`0 0 20px rgba(255,68,120,0.5)`:'none'}},item.val),
          React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:8,letterSpacing:4,color:'rgba(255,150,180,0.3)',textTransform:'uppercase'}},item.label)
        )
      )
    ),
    React.createElement('button',{onClick:onNext,
      style:{...f(0.82),background:'transparent',border:`1px solid ${ROSE}`,color:ROSE,fontFamily:'DM Sans',fontSize:9,letterSpacing:5,padding:'16px 54px',cursor:'pointer',transition:'all 0.4s',borderRadius:2,boxShadow:`0 0 28px rgba(255,68,120,0.18)`},
      onMouseEnter:e=>{e.currentTarget.style.background='rgba(255,68,120,0.12)';e.currentTarget.style.boxShadow='0 0 50px rgba(255,68,120,0.35)';},
      onMouseLeave:e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.boxShadow='0 0 28px rgba(255,68,120,0.18)';}
    },'Begin  →'),
    React.createElement('div',{style:{...f(1.0),marginTop:30,fontFamily:'DM Sans',fontSize:9,letterSpacing:4,color:'rgba(255,150,180,0.2)',textTransform:'uppercase'}},`✦   from ${CONFIG.yourName}   ✦`)
  );
}

// ════════════════════════════════════════════
// LETTER SCREEN
// ════════════════════════════════════════════
function LetterScreen({onNext}){
  const [v,setV]=useState(false);
  const [typed,setTyped]=useState('');
  const lines=LETTER_TEXT.split('\n');
  useEffect(()=>{
    setTimeout(()=>setV(true),100);
    let i=0;
    const iv=setInterval(()=>{
      if(i<=LETTER_TEXT.length){ setTyped(LETTER_TEXT.slice(0,i)); i+=2; }
      else clearInterval(iv);
    },18);
    return()=>clearInterval(iv);
  },[]);
  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',textAlign:'center',gap:0}},
    React.createElement(SectionHead,{title:'A Letter For You',sub:'From my heart'}),
    React.createElement('div',{style:{maxWidth:500,width:'100%',background:'rgba(255,255,255,0.023)',border:'1px solid rgba(255,68,120,0.13)',borderRadius:4,padding:'32px 30px',backdropFilter:'blur(18px)',position:'relative',overflow:'hidden',opacity:v?1:0,transform:v?'none':'translateY(20px)',transition:'all 0.7s ease'}},
      React.createElement('div',{style:{position:'absolute',top:0,left:'15%',right:'15%',height:1,background:'linear-gradient(to right,transparent,rgba(255,68,120,0.5),transparent)'}}),
      React.createElement('div',{style:{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:'clamp(0.92rem,2vw,1.1rem)',color:'rgba(255,235,245,0.88)',lineHeight:2.1,whiteSpace:'pre-line',textAlign:'left',minHeight:200}},
        typed,
        React.createElement('span',{style:{animation:'blink 0.8s step-start infinite',color:ROSE}},'|')
      )
    ),
    React.createElement('button',{onClick:onNext,
      style:{marginTop:24,background:'transparent',border:'1px solid rgba(255,68,120,0.3)',color:'rgba(255,150,180,0.6)',fontFamily:'DM Sans',fontSize:9,letterSpacing:5,padding:'12px 36px',cursor:'pointer',transition:'all 0.35s',borderRadius:2,opacity:v?1:0,transitionDelay:'0.5s'},
      onMouseEnter:e=>{e.currentTarget.style.background='rgba(255,68,120,0.12)';e.currentTarget.style.color=ROSE;e.currentTarget.style.borderColor=ROSE;},
      onMouseLeave:e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,150,180,0.6)';e.currentTarget.style.borderColor='rgba(255,68,120,0.3)';}
    },'Our Memories  →')
  );
}

// ════════════════════════════════════════════
// REASONS SCREEN
// ════════════════════════════════════════════
function ReasonsScreen({onNext}){
  const [vis,setVis]=useState(new Set());
  useEffect(()=>{ REASONS.forEach((_,i)=>{ setTimeout(()=>setVis(v=>new Set([...v,i])),i*210+250); }); },[]);
  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}},
    React.createElement(SectionHead,{title:'Why I Love You',sub:'A thousand reasons — here are just a few'}),
    React.createElement('div',{style:{maxWidth:530,width:'100%'}},
      REASONS.map((r,i)=>React.createElement('div',{key:i,style:{display:'grid',gridTemplateColumns:'52px 1fr',gap:'0 18px',padding:'18px 0',borderBottom:'1px solid rgba(255,68,120,0.07)',opacity:vis.has(i)?1:0,transform:vis.has(i)?'translateX(0)':'translateX(-28px)',transition:`opacity 0.7s ease ${i*0.05}s, transform 0.7s ease ${i*0.05}s`}},
        React.createElement('div',{style:{fontFamily:'Playfair Display',fontSize:'2.2rem',color:'rgba(255,68,120,0.2)',fontWeight:300,lineHeight:1,paddingTop:2}},r.num),
        React.createElement('div',null,
          React.createElement('div',{style:{fontFamily:'Playfair Display',fontSize:'1.1rem',color:'rgba(255,230,240,0.95)',marginBottom:5,letterSpacing:0.3}},r.title),
          React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:11,color:'rgba(255,150,180,0.5)',lineHeight:1.88,fontWeight:300}},r.sub)
        )
      ))
    ),
    React.createElement('button',{onClick:onNext,
      style:{marginTop:28,background:'transparent',border:'1px solid rgba(255,68,120,0.3)',color:'rgba(255,150,180,0.6)',fontFamily:'DM Sans',fontSize:9,letterSpacing:5,padding:'12px 36px',cursor:'pointer',transition:'all 0.35s',borderRadius:2,opacity:vis.size===REASONS.length?1:0,transitionProperty:'opacity,background,border-color,color',transitionDuration:'0.8s,0.35s,0.35s,0.35s'},
      onMouseEnter:e=>{e.currentTarget.style.background='rgba(255,68,120,0.12)';e.currentTarget.style.color=ROSE;e.currentTarget.style.borderColor=ROSE;},
      onMouseLeave:e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,150,180,0.6)';e.currentTarget.style.borderColor='rgba(255,68,120,0.3)';}
    },'Time With You  →')
  );
}

// ════════════════════════════════════════════
// TIMELINE SCREEN
// ════════════════════════════════════════════
function TimelineScreen({onNext}){
  const [vis,setVis]=useState(new Set());
  useEffect(()=>{ TIMELINE.forEach((_,i)=>setTimeout(()=>setVis(v=>new Set([...v,i])),i*260+200)); },[]);
  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}},
    React.createElement(SectionHead,{title:'Our Journey',sub:'From one moment to forever'}),
    React.createElement('div',{style:{maxWidth:500,width:'100%',position:'relative',paddingLeft:30}},
      React.createElement('div',{style:{position:'absolute',left:0,top:8,bottom:8,width:1,background:'linear-gradient(to bottom,rgba(255,68,120,0.8),rgba(255,68,120,0.05))'}}),
      TIMELINE.map((t,i)=>React.createElement('div',{key:i,style:{position:'relative',marginBottom:36,paddingLeft:24,opacity:vis.has(i)?1:0,transform:vis.has(i)?'translateX(0)':'translateX(-20px)',transition:`all 0.65s ease ${i*0.08}s`}},
        React.createElement('div',{style:{position:'absolute',left:-36,top:4,width:13,height:13,borderRadius:'50%',background:i===0||i===TIMELINE.length-1?ROSE:DARK,border:`2px solid ${ROSE}`,boxShadow:`0 0 ${i===0||i===TIMELINE.length-1?18:10}px rgba(255,68,120,${i===0||i===TIMELINE.length-1?0.7:0.35})`}}),
        React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:9,letterSpacing:3,color:ROSE,marginBottom:7,textTransform:'uppercase'}},t.date),
        React.createElement('div',{style:{fontFamily:'Playfair Display',fontStyle:'italic',fontSize:'1.08rem',color:'rgba(255,230,240,0.9)',lineHeight:1.8}},t.text)
      ))
    ),
    React.createElement('button',{onClick:onNext,
      style:{marginTop:20,background:'transparent',border:'1px solid rgba(255,68,120,0.3)',color:'rgba(255,150,180,0.6)',fontFamily:'DM Sans',fontSize:9,letterSpacing:5,padding:'12px 36px',cursor:'pointer',transition:'all 0.35s',borderRadius:2},
      onMouseEnter:e=>{e.currentTarget.style.background='rgba(255,68,120,0.12)';e.currentTarget.style.color=ROSE;e.currentTarget.style.borderColor=ROSE;},
      onMouseLeave:e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,150,180,0.6)';e.currentTarget.style.borderColor='rgba(255,68,120,0.3)';}
    },'Little Secrets  →')
  );
}

// ════════════════════════════════════════════
// PROMISE SCREEN (Finale)
// ════════════════════════════════════════════
function PromiseScreen({onBurst}){
  const [qIdx,setQIdx]=useState(0);
  const [qFade,setQFade]=useState(true);
  const [boom,setBoom]=useState(false);
  const [boomMsg,setBoomMsg]=useState(false);
  const [v,setV]=useState(false);
  useEffect(()=>{ setTimeout(()=>setV(true),100); },[]);
  useEffect(()=>{
    const t=setInterval(()=>{ setQFade(false); setTimeout(()=>{ setQIdx(i=>(i+1)%QUOTES.length); setQFade(true); },450); },5000);
    return()=>clearInterval(t);
  },[]);
  function handleBoom(e){
    setBoom(true); setBoomMsg(true);
    onBurst({x:e.clientX,y:e.clientY});
    setTimeout(()=>onBurst({x:e.clientX-100,y:e.clientY+50}),400);
    setTimeout(()=>onBurst({x:e.clientX+100,y:e.clientY+30}),700);
    setTimeout(()=>setBoom(false),4000);
  }
  const f=(d,ex={})=>({opacity:v?1:0,transform:v?'translateY(0)':'translateY(26px)',transition:`opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}s`,...ex});
  return React.createElement('div',{style:{position:'relative',zIndex:10,height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',textAlign:'center',gap:0}},
    React.createElement('div',{style:{...f(0.15),marginBottom:28}},
      React.createElement('svg',{width:220,height:58,viewBox:'0 0 220 58'},
        React.createElement('polyline',{points:'0,29 35,29 47,6 57,52 65,17 73,40 85,29 220,29',fill:'none',stroke:ROSE,strokeWidth:1.9,strokeLinecap:'round',strokeLinejoin:'round',style:{strokeDasharray:380,strokeDashoffset:380,animation:'drawLine 2.2s ease infinite'}})
      )
    ),
    React.createElement('div',{style:{...f(0.38),maxWidth:500,width:'100%',background:'rgba(255,255,255,0.023)',border:'1px solid rgba(255,68,120,0.13)',borderRadius:4,padding:'32px 30px',backdropFilter:'blur(18px)',marginBottom:28,position:'relative',overflow:'hidden'}},
      React.createElement('div',{style:{position:'absolute',top:0,left:'15%',right:'15%',height:1,background:'linear-gradient(to right,transparent,rgba(255,68,120,0.5),transparent)'}}),
      React.createElement('div',{style:{fontFamily:'Playfair Display',fontStyle:'italic',fontSize:'clamp(0.95rem,2.2vw,1.22rem)',color:'rgba(255,235,245,0.9)',lineHeight:1.92,whiteSpace:'pre-line',opacity:qFade?1:0,transform:qFade?'translateY(0)':'translateY(6px)',transition:'all 0.45s ease',minHeight:80}},QUOTES[qIdx]),
      React.createElement('div',{style:{display:'flex',justifyContent:'center',gap:7,marginTop:18}},
        QUOTES.map((_,i)=>React.createElement('div',{key:i,onClick:()=>{setQFade(false);setTimeout(()=>{setQIdx(i);setQFade(true);},300);},style:{width:6,height:6,borderRadius:'50%',cursor:'pointer',background:i===qIdx?ROSE:'rgba(255,68,120,0.2)',boxShadow:i===qIdx?`0 0 8px ${ROSE}`:'none',transition:'all 0.3s'}}))
      )
    ),
    React.createElement('p',{style:{...f(0.6),fontFamily:'Playfair Display',fontStyle:'italic',fontSize:'clamp(0.98rem,2vw,1.22rem)',color:'rgba(255,235,245,0.85)',lineHeight:2.15,maxWidth:440,marginBottom:28}},
      '"There is a place where words are born of silence,',React.createElement('br'),
      'and that place, my love — is you.',React.createElement('br'),
      React.createElement('em',{style:{color:ROSE}},'" — Shwet')
    ),
    React.createElement('div',{style:{...f(0.78),fontFamily:'DM Sans',fontSize:9,letterSpacing:5,color:'rgba(255,150,180,0.28)',marginBottom:30,textTransform:'uppercase'}},`✦   from ${CONFIG.yourName} — for you, only you, always   ✦`),
    React.createElement('button',{onClick:handleBoom,
      style:{...f(0.95),background:boom?'rgba(255,68,120,0.18)':'transparent',border:`1px solid ${boom?ROSE:'rgba(255,68,120,0.38)'}`,color:boom?ROSE:'rgba(255,150,180,0.65)',fontFamily:'DM Sans',fontSize:9,letterSpacing:4,padding:'15px 44px',cursor:'pointer',transition:'all 0.4s',borderRadius:2,boxShadow:boom?`0 0 50px rgba(255,68,120,0.45),0 0 100px rgba(255,68,120,0.2)`:'none',transform:boom?'scale(1.04)':'scale(1)'}},
      boom?'💖  I Love You — Forever & Always  💖':'✦  There Is A Surprise — Click Me  ✦'),
    boomMsg && React.createElement('div',{style:{marginTop:24,fontFamily:'Playfair Display',fontStyle:'italic',fontSize:'1.35rem',color:PEACH,filter:'drop-shadow(0 0 16px rgba(255,68,120,0.6))',animation:'fadeInUp 0.8s ease forwards'}},`— ${CONFIG.yourName}, Yours Forever  ♥`)
  );
}

// ════════════════════════════════════════════
// SCREEN WRAPPER
// ════════════════════════════════════════════
function ScreenWrap({children}){
  const [m,setM]=useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setM(true),20); return()=>clearTimeout(t); },[]);
  return React.createElement('div',{style:{position:'absolute',inset:0,overflow:'auto',opacity:m?1:0,transform:m?'translateY(0)':'translateY(20px)',transition:'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)'}},children);
}

// ════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════
const NAV_LABELS=['Home','Letter','Memories','Reasons','Time','Journey','Secrets','Promise'];
function NavDots({cur,total,onGo}){
  const [hov,setHov]=useState(null);
  return React.createElement('div',{style:{position:'fixed',right:20,top:'50%',transform:'translateY(-50%)',zIndex:1000,display:'flex',flexDirection:'column',gap:12,alignItems:'flex-end'}},
    Array.from({length:total}).map((_,i)=>
      React.createElement('div',{key:i,style:{display:'flex',alignItems:'center',gap:8},onMouseEnter:()=>setHov(i),onMouseLeave:()=>setHov(null),onClick:()=>onGo(i)},
        hov===i && React.createElement('div',{style:{fontFamily:'DM Sans',fontSize:8,letterSpacing:2,color:'rgba(255,150,180,0.5)',textTransform:'uppercase',cursor:'pointer'}},NAV_LABELS[i]),
        React.createElement('div',{style:{width:7,height:7,borderRadius:'50%',cursor:'pointer',background:i===cur?ROSE:'transparent',border:`1px solid ${i===cur?ROSE:'rgba(255,68,120,0.4)'}`,boxShadow:i===cur?`0 0 12px ${ROSE}`:'none',transition:'all 0.35s'}})
      )
    )
  );
}

// ════════════════════════════════════════════
// APP
// ════════════════════════════════════════════
function App(){
  const [screen,setScreen]=useState(0);
  const mouseRef=useRef({x:0,y:0});
  const burstRef=useRef(null);
  const [floatHearts,setFloatHearts]=useState([]);
  const audioRef=useRef(null);

  useEffect(()=>{
    const move=e=>{ mouseRef.current={x:e.clientX,y:e.clientY}; };
    const click=e=>{
      if(e.target.closest('button, input, .no-burst')) return;
      setFloatHearts(h=>[...h,{id:Date.now()+Math.random(),x:e.clientX,y:e.clientY}]);
      burstRef.current={x:e.clientX,y:e.clientY};
    };
    window.addEventListener('mousemove',move);
    window.addEventListener('click',click);
    return()=>{ window.removeEventListener('mousemove',move); window.removeEventListener('click',click); };
  },[]);

  const handleBurst=useCallback(pos=>{ burstRef.current=pos; },[]);

  const SCREENS=[
    React.createElement(HeroScreen,{onNext:()=>setScreen(1)}),
    React.createElement(LetterScreen,{onNext:()=>setScreen(2)}),
    React.createElement(GalleryScreen,{onNext:()=>setScreen(3),onBurst:handleBurst}),
    React.createElement(ReasonsScreen,{onNext:()=>setScreen(4)}),
    React.createElement(CounterScreen,{onNext:()=>setScreen(5)}),
    React.createElement(TimelineScreen,{onNext:()=>setScreen(6)}),
    React.createElement(ScratchScreen,{onNext:()=>setScreen(7)}),
    React.createElement(PromiseScreen,{onBurst:handleBurst}),
  ];

  return React.createElement('div',{style:{position:'relative',width:'100%',height:'100vh',overflow:'hidden',background:'#000'}},
    React.createElement(ParticleCanvas,{mouseRef,burstRef}),
    React.createElement(Cursor,null),
    React.createElement('audio',{ref:audioRef,loop:true,style:{display:'none'}}),
    React.createElement('div',{style:{position:'fixed',top:0,left:0,height:2,zIndex:1001,width:`${(screen/(SCREENS.length-1))*100}%`,background:`linear-gradient(to right,${ROSE},${GOLD})`,transition:'width 0.7s cubic-bezier(0.16,1,0.3,1)',boxShadow:`0 0 12px ${ROSE}`}}),
    React.createElement(NavDots,{cur:screen,total:SCREENS.length,onGo:setScreen}),
    React.createElement(MusicPlayer,{audioRef}),
    React.createElement(ScreenWrap,{key:screen},SCREENS[screen]),
    ...floatHearts.map(h=>React.createElement(FloatingHeart,{key:h.id,x:h.x,y:h.y,onDone:()=>setFloatHearts(fh=>fh.filter(f=>f.id!==h.id))}))
  );
}

// Styles are in css/style.css

ReactDOM.render(React.createElement(App), document.getElementById('root'));
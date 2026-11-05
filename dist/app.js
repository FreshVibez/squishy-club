const toys=[{id:'peanut',name:'Peanut pal',desc:'a nutty little hug',texture:'soft & slow'},{id:'butter',name:'Butter baby',desc:'smooth like butter',texture:'silky & soft'},{id:'needoh',name:'NeeDoh',desc:'your stretchy stress ball',texture:'stretchy & dreamy'},{id:'cheese',name:'Cheesy cutie',desc:'a little wedge of joy',texture:'squishy & cheesy'},{id:'strawberry',name:'Berry sweet',desc:'freshly picked happiness',texture:'sweet & squishable'},{id:'mochi',name:'Mochi cloud',desc:'the softest little friend',texture:'fluffy & pillowy'}];
const $=s=>document.querySelector(s),canvas=$('#play'),ctx=canvas.getContext('2d');let current=0,mode='squishy',muted=false,audio,count=0,drag=null,resetting=false,bubbleTimer,lastAudio=-1;const W=600,H=460,COLS=20,ROWS=16;
function face(c,x,y,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);c.fillStyle='#724b3e';for(const xx of [-20,20]){c.beginPath();c.ellipse(xx,0,4,5,0,0,Math.PI*2);c.fill();c.fillStyle='#fff8e8';c.beginPath();c.arc(xx-1,-1.8,1.2,0,Math.PI*2);c.fill();c.fillStyle='#724b3e'}c.strokeStyle='#724b3e';c.lineWidth=2.2;c.lineCap='round';c.beginPath();c.arc(0,4,7,0,Math.PI);c.stroke();c.fillStyle='#ed9b95';for(const xx of [-33,33]){c.beginPath();c.ellipse(xx,10,8,4.5,0,0,Math.PI*2);c.fill()}c.restore()}
function texture(id){let t=document.createElement('canvas');t.width=W;t.height=H;let c=t.getContext('2d');let gradient=c.createLinearGradient(200,85,380,365);c.save();c.shadowColor='#b77d7050';c.shadowBlur=18;c.shadowOffsetY=17;
if(id==='peanut'){gradient.addColorStop(0,'#f5d59f');gradient.addColorStop(.48,'#e8bb7e');gradient.addColorStop(1,'#c89458');c.fillStyle=gradient;c.beginPath();c.moveTo(290,89);c.bezierCurveTo(225,40,164,108,184,172);c.bezierCurveTo(201,219,178,226,173,276);c.bezierCurveTo(163,357,245,391,298,346);c.bezierCurveTo(349,392,432,355,423,280);c.bezierCurveTo(420,229,391,213,414,165);c.bezierCurveTo(442,89,350,40,290,89);c.fill();c.shadowColor='transparent';c.save();c.clip();c.strokeStyle='#b7854d36';c.lineWidth=2;for(let y=80;y<380;y+=22){c.beginPath();c.moveTo(160,y);c.bezierCurveTo(240,y-13,355,y+20,439,y-4);c.stroke()}for(let x=175;x<440;x+=23){c.beginPath();c.moveTo(x,50);c.bezierCurveTo(x-26,170,x+25,240,x,380);c.stroke()}c.restore();face(c,300,235,1.05)}
if(id==='butter'){gradient.addColorStop(0,'#fff4a9');gradient.addColorStop(.6,'#f7d773');gradient.addColorStop(1,'#e2ae49');c.fillStyle=gradient;c.beginPath();c.roundRect(159,127,282,193,37);c.fill();c.shadowColor='transparent';c.fillStyle='#fff9d855';c.beginPath();c.roundRect(177,139,246,47,20);c.fill();c.strokeStyle='#d9ad5580';c.lineWidth=2;c.beginPath();c.moveTo(177,281);c.quadraticCurveTo(301,304,427,276);c.stroke();face(c,300,238,1.1)}
if(id==='needoh'){gradient.addColorStop(0,'#d8b7fb');gradient.addColorStop(.5,'#b998eb');gradient.addColorStop(1,'#8869c1');c.fillStyle=gradient;c.beginPath();c.ellipse(300,225,130,130,0,0,Math.PI*2);c.fill();c.shadowColor='transparent';const g=c.createRadialGradient(254,158,2,260,167,75);g.addColorStop(0,'#f9eaff95');g.addColorStop(1,'#f9eaff00');c.fillStyle=g;c.beginPath();c.ellipse(265,171,76,60,-.5,0,Math.PI*2);c.fill();face(c,300,239,1.15)}
if(id==='cheese'){gradient.addColorStop(0,'#ffe99c');gradient.addColorStop(.5,'#ffd467');gradient.addColorStop(1,'#eeb14d');c.fillStyle=gradient;c.beginPath();c.moveTo(192,154);c.quadraticCurveTo(181,140,205,129);c.lineTo(390,100);c.quadraticCurveTo(411,96,416,118);c.lineTo(442,306);c.quadraticCurveTo(443,333,418,334);c.lineTo(170,323);c.quadraticCurveTo(143,322,156,296);c.closePath();c.fill();c.shadowColor='transparent';c.fillStyle='#e6ad4e';for(const [x,y,r]of [[215,183,16],[375,157,19],[199,278,12],[386,285,18],[315,141,8],[335,306,10]]){c.beginPath();c.ellipse(x,y,r,r*.8,-.2,0,Math.PI*2);c.fill();c.strokeStyle='#ffe69a';c.lineWidth=3;c.beginPath();c.ellipse(x,y+3,r-2,r*.8,-.2,0,Math.PI);c.stroke()}face(c,302,238)}
if(id==='strawberry'){gradient.addColorStop(0,'#ffb5bf');gradient.addColorStop(.6,'#f47d99');gradient.addColorStop(1,'#d9537b');c.fillStyle=gradient;c.beginPath();c.moveTo(301,132);c.bezierCurveTo(118,54,164,280,279,351);c.quadraticCurveTo(301,366,323,349);c.bezierCurveTo(443,263,470,64,301,132);c.fill();c.shadowColor='transparent';c.fillStyle='#ffe0a5';for(const [x,y]of [[238,166],[280,176],[338,170],[374,193],[215,216],[248,284],[295,311],[348,286],[390,239]]){c.beginPath();c.ellipse(x,y,3,6,.25,0,Math.PI*2);c.fill()}c.fillStyle='#8cba86';for(let i=0;i<5;i++){c.save();c.translate(301,135);c.rotate((i-2)*.65);c.beginPath();c.ellipse(0,-19,12,35,0,0,Math.PI*2);c.fill();c.restore()}face(c,303,240)}
if(id==='mochi'){gradient.addColorStop(0,'#fffdfd');gradient.addColorStop(.6,'#fae5ec');gradient.addColorStop(1,'#e9b7cb');c.fillStyle=gradient;c.beginPath();c.moveTo(166,289);c.bezierCurveTo(128,239,197,149,250,154);c.bezierCurveTo(278,93,355,109,373,166);c.bezierCurveTo(434,163,468,276,420,310);c.bezierCurveTo(374,342,208,345,166,289);c.fill();c.shadowColor='transparent';face(c,300,256,1.1)}c.restore();return t}
const textures=toys.map(t=>texture(t.id));const original=()=>Array.from({length:(COLS+1)*(ROWS+1)},(_,i)=>({x:(i%(COLS+1))*W/COLS,y:Math.floor(i/(COLS+1))*H/ROWS,dx:0,dy:0}));const meshes=toys.map(original);
function triangle(img,a,b,c,sa,sb,sc){ctx.save();ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.closePath();ctx.clip();let den=sa.x*(sb.y-sc.y)+sb.x*(sc.y-sa.y)+sc.x*(sa.y-sb.y);const m=(v)=>[(v[0]*(sb.y-sc.y)+v[1]*(sc.y-sa.y)+v[2]*(sa.y-sb.y))/den,(v[0]*(sc.x-sb.x)+v[1]*(sa.x-sc.x)+v[2]*(sb.x-sa.x))/den,(v[0]*(sb.x*sc.y-sc.x*sb.y)+v[1]*(sc.x*sa.y-sa.x*sc.y)+v[2]*(sa.x*sb.y-sb.x*sa.y))/den];let xx=m([a.x,b.x,c.x]),yy=m([a.y,b.y,c.y]);ctx.transform(xx[0],yy[0],xx[1],yy[1],xx[2],yy[2]);ctx.drawImage(img,0,0);ctx.restore()}
function render(){ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);const mesh=meshes[current],dest=p=>({x:p.x+p.dx,y:p.y+p.dy});for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){let a=mesh[y*(COLS+1)+x],b=mesh[y*(COLS+1)+x+1],c=mesh[(y+1)*(COLS+1)+x],d=mesh[(y+1)*(COLS+1)+x+1];triangle(textures[current],dest(a),dest(b),dest(c),a,b,c);triangle(textures[current],dest(b),dest(d),dest(c),b,d,c)}}
// Real Foley clips are preloaded; one crossfaded voice keeps rapid dragging gentle.
const audioClips = {squishy:[],crunchy:[]};
const audioLoads = Object.fromEntries(Object.keys(audioClips).map(kind => [kind,
  Promise.all([1,2,3].map(i=>fetch(`audio/${kind}-${i}.wav`).then(r=>{
    if(!r.ok)throw new Error('Audio clip unavailable');return r.arrayBuffer();
  }))).catch(()=>null)
]));
let masterAudio, activeVoice, audioRequest=0, variant={squishy:0,crunchy:0};
function stopSound(){
  audioRequest++;
  if(activeVoice&&audio){const t=audio.currentTime;activeVoice.gain.gain.cancelScheduledValues(t);
    activeVoice.gain.gain.setTargetAtTime(0,t,.012);
    try{activeVoice.source.stop(t+.06)}catch{}activeVoice=null;}
}
async function sound(){
  if(muted)return;
  try{
    audio??=new(window.AudioContext||window.webkitAudioContext)();
    const now=audio.currentTime;
    if(now-lastAudio<(mode==='crunchy'?.24:.32))return;
    lastAudio=now;
    const kind=mode,request=++audioRequest;
    await audio.resume();
    if(!masterAudio){
      const compressor=audio.createDynamicsCompressor();
      compressor.threshold.value=-19;compressor.knee.value=15;compressor.ratio.value=3;
      compressor.attack.value=.006;compressor.release.value=.12;
      masterAudio=audio.createGain();masterAudio.gain.value=.7;
      masterAudio.connect(compressor);compressor.connect(audio.destination);
    }
    if(!audioClips[kind].length){
      const files=await audioLoads[kind];if(!files)throw new Error('Audio unavailable');
      audioClips[kind]=await Promise.all(files.map(f=>audio.decodeAudioData(f.slice(0))));
    }
    if(muted||mode!==kind||request!==audioRequest)return;
    if(activeVoice){const t=audio.currentTime;activeVoice.gain.gain.setTargetAtTime(0,t,.012);
      try{activeVoice.source.stop(t+.06)}catch{}}
    const source=audio.createBufferSource(),gain=audio.createGain();
    source.buffer=audioClips[kind][variant[kind]++%3];
    source.playbackRate.value=.97+Math.random()*.06;
    const hp=audio.createBiquadFilter();hp.type='highpass';hp.frequency.value=kind==='squishy'?110:180;hp.Q.value=.7;
    const lp=audio.createBiquadFilter();lp.type='lowpass';lp.frequency.value=kind==='squishy'?6200:10500;lp.Q.value=.7;
    const t=audio.currentTime;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(1,t+.012);
    source.connect(hp);hp.connect(lp);lp.connect(gain);gain.connect(masterAudio);
    const voice={source,gain};activeVoice=voice;
    source.onended=()=>{source.disconnect();hp.disconnect();lp.disconnect();gain.disconnect();if(activeVoice===voice)activeVoice=null};
    source.start();
  }catch(e){$('#live').textContent='Sound could not load. Please refresh to try again.'}
}
function celebrate(){count++;$('#counter').textContent=`${count} happy squish${count===1?'':'es'}`;$('#bubble').textContent=mode==='crunchy'?'crunch crunch!':['squiiish!','so squishy ♡','aah, softer.'][count%3];$('#bubble').classList.add('show');clearTimeout(bubbleTimer);bubbleTimer=setTimeout(()=>$('#bubble').classList.remove('show'),950);sound()}
function deform(x,y,dx,dy,r=125){for(const p of meshes[current]){const dist=Math.hypot(p.x+p.dx-x,p.y+p.dy-y),f=Math.exp(-dist*dist/(r*r));p.dx=Math.max(-95,Math.min(95,p.dx+dx*f));p.dy=Math.max(-95,Math.min(95,p.dy+dy*f))}render()}
function poke(x=300,y=225){deform(x,y,-4,23,85);celebrate()}
const point=e=>{let b=canvas.getBoundingClientRect();return{x:(e.clientX-b.left)*W/b.width,y:(e.clientY-b.top)*H/b.height}};
canvas.addEventListener('pointerdown',e=>{if(resetting)return;let p=point(e);const pixel=textures[current].getContext('2d').getImageData(Math.max(0,Math.min(599,Math.round(p.x))),Math.max(0,Math.min(459,Math.round(p.y))),1,1).data[3];if(pixel<10&&!meshes[current].some(v=>Math.hypot(v.dx,v.dy)>3))return;drag={...p,id:e.pointerId};canvas.setPointerCapture(e.pointerId);poke(p.x,p.y);$('#tip').textContent='stretch, smoosh, make it yours ♡'});
canvas.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const p=point(e);deform(drag.x,drag.y,(p.x-drag.x)*.65,(p.y-drag.y)*.65,105);if(Math.hypot(p.x-drag.x,p.y-drag.y)>2)sound();drag={...p,id:e.pointerId}});const end=()=>drag=null;canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('lostpointercapture',end);
canvas.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(!resetting)poke()}if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();deform(300,225,e.key==='ArrowLeft'?-15:e.key==='ArrowRight'?15:0,e.key==='ArrowUp'?-15:e.key==='ArrowDown'?15:0);sound()}});
function select(i){current=i;resetting=false;drag=null;document.querySelectorAll('.toy-card').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',i===j);b.querySelector('.check').hidden=i!==j});$('#toy-name').innerHTML=toys[i].name+' <span>♡</span>';$('#texture-label').textContent=toys[i].texture;canvas.setAttribute('aria-label',toys[i].name+' squishy. Drag to mold, Space to squish, or arrow keys to stretch.');$('#tip').textContent='go on, give me a squeeze ♡';render()}
toys.forEach((t,i)=>{const b=document.createElement('button');b.className='toy-card';b.setAttribute('aria-label','Choose '+t.name);b.innerHTML='<span class="check">✓</span><canvas width="300" height="180" aria-hidden="true"></canvas><b>'+t.name+'</b><small>'+t.desc+'</small>';$('#shelf').append(b);let tc=b.querySelector('canvas').getContext('2d');tc.drawImage(textures[i],70,40,460,360,15,-4,270,195);b.onclick=()=>select(i)});
$('#reset').onclick=()=>{drag=null;const selected=current,start=performance.now(),from=meshes[current].map(p=>({dx:p.dx,dy:p.dy}));resetting=true;function frame(now){if(current!==selected){resetting=false;return}const t=Math.min(1,(now-start)/450),f=(1-t)**3;meshes[selected].forEach((p,i)=>{p.dx=from[i].dx*f;p.dy=from[i].dy*f});render();if(t<1)requestAnimationFrame(frame);else{resetting=false;$('#live').textContent=toys[current].name+' reset to its original shape.';$('#tip').textContent='good as new. ready for you ♡'}}requestAnimationFrame(frame)};
$('#mute').onclick=()=>{muted=!muted;if(muted)stopSound();$('#mute').setAttribute('aria-pressed',muted);$('#mute').innerHTML=(muted?'♩':'♫')+' <span>Sound '+(muted?'off':'on')+'</span>'};document.querySelectorAll('[data-sound]').forEach(b=>b.onclick=()=>{stopSound();lastAudio=-1;mode=b.dataset.sound;document.querySelectorAll('[data-sound]').forEach(a=>{a.classList.toggle('active',a===b);a.setAttribute('aria-pressed',a===b)});sound()});select(0);

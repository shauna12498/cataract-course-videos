(function(){
const E = window.Engine;
const { W,H,P,phase,easeOut,smooth,drawLabel,drawApple,drawHeadAndEye,drawCorneaArc,drawLens,drawRay,drawBrain,drawLattice,drawClouds,drawScatter,drawHazyScene,drawDevice,drawClinic,drawSectionIcon,setInk,hLine,hCircle,mulberry32,withAlpha } = E;
function drawEyeAnatomy(ctx, cx, cy, R, opts){
  const o = opts || {};
  const a = o.alpha != null ? o.alpha : 1;
  const showCornea = o.showCornea !== false;
  const showIris   = o.showIris   !== false;
  const showLens   = o.showLens   !== false;
  const showRetina = o.showRetina !== false;
  const showNerve  = o.showNerve  !== false;

  const INK = '#8b3a2e';
  const INK_SOFT = '#b8705f';

  ctx.save();
  ctx.globalAlpha = a;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const aUL = Math.PI + 0.52;
  const aLL = Math.PI - 0.52;

  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.arc(cx, cy, R, aUL, aLL, false);
  ctx.stroke();

  if(showCornea){
    const ulX = cx + Math.cos(aUL)*R;
    const ulY = cy + Math.sin(aUL)*R;
    const llX = cx + Math.cos(aLL)*R;
    const llY = cy + Math.sin(aLL)*R;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(ulX, ulY);
    ctx.quadraticCurveTo(cx - R*1.35, cy, llX, llY);
    ctx.stroke();
  }

  if(showIris){
    const ulX = cx + Math.cos(aUL)*R;
    const ulY = cy + Math.sin(aUL)*R;
    const llX = cx + Math.cos(aLL)*R;
    const llY = cy + Math.sin(aLL)*R;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ulX + R*0.08, ulY + R*0.06);
    ctx.lineTo(cx - R*0.52, cy - R*0.16);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(llX + R*0.08, llY - R*0.06);
    ctx.lineTo(cx - R*0.52, cy + R*0.16);
    ctx.stroke();
  }

  if(showLens){
    const antX  = cx - R*0.60;
    const postX = cx - R*0.27;
    const topY  = cy - R*0.41;
    const botY  = cy + R*0.41;
    const midX  = (antX + postX) / 2;

    ctx.save();
    ctx.globalAlpha = a * 0.55;
    ctx.beginPath();
    ctx.moveTo(antX, cy);
    ctx.quadraticCurveTo(antX + R*0.02, topY + R*0.10, midX, topY);
    ctx.quadraticCurveTo(postX - R*0.02, topY + R*0.10, postX, cy);
    ctx.quadraticCurveTo(postX - R*0.02, botY - R*0.10, midX, botY);
    ctx.quadraticCurveTo(antX + R*0.02, botY - R*0.10, antX, cy);
    ctx.closePath();
    const grad = ctx.createLinearGradient(antX, cy, postX, cy);
    grad.addColorStop(0, 'rgba(232,184,176,0.95)');
    grad.addColorStop(0.5, 'rgba(255,248,240,0.98)');
    grad.addColorStop(1, 'rgba(216,180,168,0.90)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(antX, cy);
    ctx.quadraticCurveTo(antX + R*0.02, topY + R*0.10, midX, topY);
    ctx.quadraticCurveTo(postX - R*0.02, topY + R*0.10, postX, cy);
    ctx.quadraticCurveTo(postX - R*0.02, botY - R*0.10, midX, botY);
    ctx.quadraticCurveTo(antX + R*0.02, botY - R*0.10, antX, cy);
    ctx.closePath();
    ctx.stroke();
  }

  if(showRetina){
    ctx.strokeStyle = INK_SOFT;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R*0.90, -Math.PI*0.60, Math.PI*0.60, false);
    ctx.stroke();
  }

  if(showNerve){
    const ang = Math.PI * 0.10;
    const sx = cx + Math.cos(ang) * R*0.95;
    const sy = cy + Math.sin(ang) * R*0.95;
    const ex = cx + Math.cos(ang) * R*1.55;
    const ey = cy + Math.sin(ang) * R*1.55;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }

  ctx.restore();
}function unit_S0_01(ctx,t){
  const appleC = {x:900, y:580};
  const aIn = easeOut(phase(t,0,2.2));
  const aBlur = smooth(phase(t,10,5))*16;
  const aShrink = 1 - 0.42*smooth(phase(t,16,5));
  const aOut = 1 - smooth(phase(t,22,3));
  const aAlpha = aIn * aOut;
  if(aAlpha > 0.01) drawApple(appleC.x, appleC.y, 210*aShrink, aBlur, aAlpha, 1);
  const eyeA = smooth(phase(t,18,3.5));
  if(eyeA > 0.01){
    drawHeadAndEye(1180, 560, 300, eyeA);
    const corA = smooth(phase(t,25,3));
    drawCorneaArc(1180 - 300*0.34, 560 - 300*0.15, 300*0.22, corA*eyeA, {highlight:true});
    drawLabel('Cornea', 1180-300*0.34-40, 560-300*0.15-70, corA, {anchor:'right', size:26});
  }
  const rayP = smooth(phase(t,27,8));
  if(rayP > 0.01){
    const ey=560, ex=1180, entry = ex - 300*0.34 - 40;
    drawRay([[appleC.x+180, ey-40],[entry, ey-40]], rayP, P.gold, 2.4);
    drawRay([[appleC.x+180, ey],[entry, ey]], rayP, P.gold, 2.4);
    drawRay([[appleC.x+180, ey+40],[entry, ey+40]], rayP, P.gold, 2.4);
  }
  const lensA = smooth(phase(t,35,3));
  if(lensA > 0.01){
    drawLens(1180+20, 560, 34, 86, lensA, {clear:true});
    drawLabel('Lens', 1180+20+80, 560-110, lensA*0.9, {anchor:'left', size:26, leader:[1180+20+40,560-70]});
  }
  const convP = smooth(phase(t,47,9));
  if(convP > 0.01){
    const fx = 1180 + 300*0.55;
    drawRay([[1180-300*0.34-40,520],[1180+20,520],[fx,560]], convP, P.goldHi, 2.2);
    drawRay([[1180-300*0.34-40,600],[1180+20,600],[fx,560]], convP, P.goldHi, 2.2);
    ctx.save(); ctx.setLineDash([6,8]); setInk(1.4,'rgba(139,58,46,0.5)');
    ctx.beginPath(); ctx.moveTo(1180+20,560); ctx.lineTo(fx,560); ctx.stroke(); ctx.restore();
  }
  const retA = smooth(phase(t,60,3));
  if(retA > 0.01){
    const rx = 1180 + 300*0.7, ry = 560;
    ctx.save(); setInk(3.2,P.ink);
    ctx.beginPath(); ctx.arc(1180+300*0.15, 560, 300*0.34, -Math.PI*0.35, Math.PI*0.35); ctx.stroke(); ctx.restore();
    drawLabel('Retina', rx+20, ry-80, retA, {anchor:'left', size:26, leader:[rx, ry-30]});
  }
  const brA = smooth(phase(t,70,3));
  if(brA > 0.01){
    drawBrain(1180 + 300*0.6, 560 + 380, 90, brA, 2);
    ctx.save(); setInk(2.4,P.inkSoft);
    ctx.beginPath(); ctx.moveTo(1180+300*0.4,560+90); ctx.quadraticCurveTo(1180+300*0.5,560+280,1180+300*0.6,560+300); ctx.stroke(); ctx.restore();
    drawLabel('Optic nerve', 1180+300*0.5-30, 560+220, brA, {anchor:'right', size:24});
  }
  const closA = smooth(phase(t,78,2));
  if(closA > 0.01) drawApple(1180+300*0.6, 560+380, 34, 0, closA, 3);
}

function unit_S0_02(ctx, t){
  const cx = 960, cy = 540;

  const b1 = smooth(phase(t, 0, 1.5)) * (1 - smooth(phase(t, 5, 1.5)));
  if(b1 > 0.01){
    drawLens3D(ctx, cx, cy, 180, 240, b1, { clarity: 1 });
  }

  const b2 = smooth(phase(t, 6, 2)) * (1 - smooth(phase(t, 15, 2)));
  if(b2 > 0.01){
    drawLens3D(ctx, cx, cy, 180, 240, b2 * 0.7, { clarity: 1 });
    drawProteinLattice(ctx, cx, cy, 320, 0, b2);
  }

  if(t >= 16 && t < 26){
    const p = smooth(phase(t, 17, 7));
    drawLens3D(ctx, cx, cy, 180, 240, 0.75, { clarity: 1 - p*0.8 });
    drawProteinLattice(ctx, cx, cy, 320, p, 1 - p*0.7);
    drawOpacityClumps(ctx, cx, cy, 220, p, 0.9);
  }

  if(t >= 25 && t < 32){
    const a = smooth(phase(t, 25, 1.5)) * (1 - smooth(phase(t, 31, 1.5)));
    drawEyeAnatomy(ctx, cx, cy, 220, {
      alpha: a, showIris: false, showRetina: false, showNerve: false
    });
    const bP = smooth(phase(t, 26, 3));
    const beamEnd = cx + 320 * bP;
    ctx.save();
    ctx.globalAlpha = a * 0.95;
    ctx.strokeStyle = '#e4c583';
    ctx.lineWidth = 5;
    ctx.shadowColor = '#e4c583';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(cx - 900, cy);
    ctx.lineTo(beamEnd, cy);
    ctx.stroke();
    ctx.restore();
  }

  if(t >= 31 && t < 41){
    const a = smooth(phase(t, 31, 1.5)) * (1 - smooth(phase(t, 40, 1.5)));
    const growth = smooth(phase(t, 32, 7));
    drawLens3D(ctx, cx, cy, 300, 380, a, { clarity: 1 - growth });
    drawOpacityClumps(ctx, cx, cy, 320, growth, 1);
  }

  if(t >= 40 && t < 49){
    const a = smooth(phase(t, 40, 1.5)) * (1 - smooth(phase(t, 48, 1.5)));
    const spread = smooth(phase(t, 42, 5));
    drawScatterDiagram(ctx, cx, cy, spread, a);
  }

  if(t >= 48 && t < 55){
    const a = smooth(phase(t, 48, 1.5)) * (1 - smooth(phase(t, 54, 1.5)));
    const haze = smooth(phase(t, 49, 4));
    drawHazyAisle(ctx, haze, a);
  }

  if(t >= 54 && t < 63){
    const a = smooth(phase(t, 54, 1.5)) * (1 - smooth(phase(t, 62, 1.5)));
    const prog = smooth(phase(t, 55, 6));
    ctx.save(); ctx.globalAlpha = 1;
    ctx.fillStyle = '#f7f2e7';
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
    drawDeviceScreen(ctx, cx, cy, 720, 440, prog, a);
  }

  if(t >= 62){
    const a = smooth(phase(t, 62, 2));
    drawClinicScene(ctx, a);
  }
}
/* --- High-quality 3D-look primitives for S0-02 --- */
function drawLens3D(ctx, cx, cy, rx, ry, a, opts){
  const o = opts || {};
  const clarity = o.clarity != null ? o.clarity : 1;
  ctx.save();
  ctx.globalAlpha = a;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
  const g = ctx.createRadialGradient(cx - rx*0.35, cy - ry*0.35, rx*0.05, cx, cy, rx*1.10);
  if(clarity > 0.5){
    g.addColorStop(0,   'rgba(255,252,248,1.00)');
    g.addColorStop(0.35,'rgba(248,232,225,0.95)');
    g.addColorStop(0.75,'rgba(226,200,195,0.85)');
    g.addColorStop(1,   'rgba(198,168,165,0.75)');
  } else {
    const mix = 1 - clarity;
    g.addColorStop(0,   'rgba(252,248,240,1)');
    g.addColorStop(0.35,'rgba(238,225,205,'+(0.95 - mix*0.1)+')');
    g.addColorStop(0.75,'rgba(215,190,160,'+(0.9 - mix*0.1)+')');
    g.addColorStop(1,   'rgba(180,150,120,'+(0.85 - mix*0.15)+')');
  }
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = 'rgba(139,58,46,0.35)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx - rx*0.38, cy - ry*0.42, rx*0.20, ry*0.13, -0.35, 0, Math.PI*2);
  const hg = ctx.createRadialGradient(cx - rx*0.38, cy - ry*0.42, 0, cx - rx*0.38, cy - ry*0.42, rx*0.30);
  hg.addColorStop(0, 'rgba(255,255,255,0.9)');
  hg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hg;
  ctx.fill();
  if(clarity < 0.98){
    const mix = 1 - clarity;
    ctx.save();
    ctx.globalAlpha = a * mix * 0.85;
    const rnd = mulberry32(13);
    for(let i=0;i<14;i++){
      const angle = rnd()*Math.PI*2;
      const rad = rnd()*0.75;
      const px = cx + Math.cos(angle)*rx*rad;
      const py = cy + Math.sin(angle)*ry*rad;
      const pr = rx*0.12 + rnd()*rx*0.18;
      const pg = ctx.createRadialGradient(px, py, 0, px, py, pr);
      pg.addColorStop(0, 'rgba(245,235,215,0.75)');
      pg.addColorStop(1, 'rgba(245,235,215,0)');
      ctx.fillStyle = pg;
      ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
  ctx.restore();
}

function drawProteinLattice(ctx, cx, cy, size, disorder, a){
  ctx.save();
  ctx.globalAlpha = a;
  const n = 8;
  const step = size / n;
  const rnd = mulberry32(7);
  const jitter = disorder * step * 0.75;
  ctx.strokeStyle = 'rgba(120,150,175,'+(0.55*(1-disorder))+')';
  ctx.lineWidth = 1.4;
  for(let i=0;i<=n;i++){
    for(let j=0;j<=n;j++){
      const x = cx - size/2 + i*step + (rnd()-0.5)*jitter;
      const y = cy - size/2 + j*step + (rnd()-0.5)*jitter;
      if(i < n){
        const x2 = cx - size/2 + (i+1)*step + (rnd()-0.5)*jitter;
        const y2 = cy - size/2 + j*step + (rnd()-0.5)*jitter;
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x2,y2); ctx.stroke();
      }
      if(j < n){
        const x2 = cx - size/2 + i*step + (rnd()-0.5)*jitter;
        const y2 = cy - size/2 + (j+1)*step + (rnd()-0.5)*jitter;
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x2,y2); ctx.stroke();
      }
    }
  }
  for(let i=0;i<=n;i++){
    for(let j=0;j<=n;j++){
      const x = cx - size/2 + i*step + (rnd()-0.5)*jitter;
      const y = cy - size/2 + j*step + (rnd()-0.5)*jitter;
      ctx.beginPath();
      ctx.arc(x, y, step*0.22, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(150,180,205,'+(0.7 + 0.3*(1-disorder))+')';
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawOpacityClumps(ctx, cx, cy, radius, growth, a){
  ctx.save();
  ctx.globalAlpha = a;
  const rnd = mulberry32(23);
  const clumps = [];
  for(let i=0;i<26;i++){
    clumps.push({
      ang: rnd()*Math.PI*2,
      rad: rnd()*radius*0.85,
      size: radius*(0.08 + rnd()*0.14),
      rot: rnd()*Math.PI,
      delay: rnd()*0.7
    });
  }
  for(const c of clumps){
    const local = Math.max(0, Math.min(1, (growth - c.delay) / (1 - c.delay)));
    if(local <= 0) continue;
    const x = cx + Math.cos(c.ang)*c.rad;
    const y = cy + Math.sin(c.ang)*c.rad;
    const s = c.size * local;
    const g = ctx.createRadialGradient(x, y, 0, x, y, s);
    g.addColorStop(0,   'rgba(200,155,105,0.85)');
    g.addColorStop(0.6, 'rgba(210,170,125,0.55)');
    g.addColorStop(1,   'rgba(220,185,140,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(x, y, s, s*0.85, c.rot, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();
}

function drawScatterDiagram(ctx, cx, cy, spread, a){
  const INK = '#8b3a2e';
  const GOLD = '#e4c583';
  ctx.save();
  ctx.globalAlpha = a;
  ctx.beginPath();
  ctx.moveTo(cx - 22, cy - 130);
  ctx.quadraticCurveTo(cx + 16, cy - 60, cx + 16, cy);
  ctx.quadraticCurveTo(cx + 16, cy + 60, cx - 22, cy + 130);
  ctx.quadraticCurveTo(cx + 16, cy + 60, cx + 16, cy);
  ctx.quadraticCurveTo(cx + 16, cy - 60, cx - 22, cy - 130);
  ctx.closePath();
  ctx.fillStyle = 'rgba(240,220,210,0.55)';
  ctx.fill();
  ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.stroke();
  const incoming = [-110, -55, 0, 55, 110];
  for(const y of incoming){
    ctx.beginPath();
    ctx.moveTo(cx - 340, cy + y);
    ctx.lineTo(cx - 22, cy + y);
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2.4;
    ctx.stroke();
  }
  const rnd = mulberry32(31);
  for(const y of incoming){
    const baseAngle = y / 300;
    for(let k=0;k<3;k++){
      const angle = baseAngle + (rnd() - 0.5) * 1.2 * spread;
      const len = 420 * spread;
      const ex = cx + 22 + Math.cos(angle) * len;
      const ey = cy + y + Math.sin(angle) * len;
      ctx.beginPath();
      ctx.moveTo(cx + 22, cy + y);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = a * (0.35 + 0.55*spread);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawHazyAisle(ctx, hazeAmount, a){
  ctx.save();
  ctx.globalAlpha = a;
  ctx.fillStyle = '#e8e0cc';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c9bfa8';
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(W*0.30, 320);
  ctx.lineTo(W*0.30, 720);
  ctx.lineTo(0, 900);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(W, 200);
  ctx.lineTo(W*0.70, 320);
  ctx.lineTo(W*0.70, 720);
  ctx.lineTo(W, 900);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#d8cfb6';
  ctx.beginPath();
  ctx.moveTo(W*0.30, 720);
  ctx.lineTo(W*0.70, 720);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(120,105,80,0.35)';
  ctx.lineWidth = 1.5;
  for(let i=0;i<5;i++){
    const t = i/5;
    ctx.beginPath();
    ctx.moveTo(0, 250 + t*500);
    ctx.lineTo(W*0.30, 350 + t*350);
    ctx.stroke();
  }
  for(let i=0;i<5;i++){
    const t = i/5;
    ctx.beginPath();
    ctx.moveTo(W, 250 + t*500);
    ctx.lineTo(W*0.70, 350 + t*350);
    ctx.stroke();
  }
  const rnd = mulberry32(41);
  ctx.fillStyle = 'rgba(180,150,110,0.55)';
  for(let i=0;i<5;i++){
    for(let j=0;j<4;j++){
      const t = i/5;
      const x = 40 + j*100 + rnd()*20;
      const y = 270 + t*500 + rnd()*10;
      const pw = 40 + rnd()*20;
      const ph = 50 + rnd()*30;
      ctx.fillRect(x, y - ph, pw, ph);
    }
  }
  for(let i=0;i<5;i++){
    for(let j=0;j<4;j++){
      const t = i/5;
      const x = W - 40 - j*100 - rnd()*20 - 40;
      const y = 270 + t*500 + rnd()*10;
      const pw = 40 + rnd()*20;
      const ph = 50 + rnd()*30;
      ctx.fillRect(x, y - ph, pw, ph);
    }
  }
  const g = ctx.createRadialGradient(W/2, H/2, 100, W/2, H/2, 900);
  g.addColorStop(0, 'rgba(245,238,220,'+(hazeAmount*0.30)+')');
  g.addColorStop(0.55, 'rgba(240,232,212,'+(hazeAmount*0.60)+')');
  g.addColorStop(1, 'rgba(225,215,192,'+(hazeAmount*0.85)+')');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,250,215,'+(hazeAmount*0.55)+')';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  for(let i=0;i<3;i++){
    const sx = W*0.35 + i*180;
    ctx.beginPath();
    ctx.moveTo(sx, 180);
    ctx.lineTo(sx + 90, H - 180);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDeviceScreen(ctx, cx, cy, w, h, progress, a){
  ctx.save();
  ctx.globalAlpha = a;
  const x0 = cx - w/2, y0 = cy - h/2;
  ctx.fillStyle = '#1a1f26';
  if(ctx.roundRect){
    ctx.beginPath(); ctx.roundRect(x0-16, y0-16, w+32, h+32, 16); ctx.fill();
  } else {
    ctx.fillRect(x0-16, y0-16, w+32, h+32);
  }
  const bg = ctx.createLinearGradient(x0, y0, x0, y0+h);
  bg.addColorStop(0, '#0d1218');
  bg.addColorStop(1, '#131a22');
  ctx.fillStyle = bg;
  ctx.fillRect(x0, y0, w, h);
  const ringGrow = Math.min(1, progress * 1.4);
  for(let i=1;i<=5;i++){
    const r = (i * w*0.12) * ringGrow;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(120,190,220,'+(0.55 - i*0.08)+')';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  const lockA = Math.max(0, (progress - 0.55) / 0.45);
  ctx.strokeStyle = 'rgba(130,220,160,'+lockA+')';
  ctx.lineWidth = 2.6;
  const cl = 60;
  ctx.beginPath();
  ctx.moveTo(cx - cl, cy); ctx.lineTo(cx - 14, cy);
  ctx.moveTo(cx + 14, cy); ctx.lineTo(cx + cl, cy);
  ctx.moveTo(cx, cy - cl); ctx.lineTo(cx, cy - 14);
  ctx.moveTo(cx, cy + 14); ctx.lineTo(cx, cy + cl);
  ctx.stroke();
  ctx.fillStyle = 'rgba(140,200,230,0.55)';
  ctx.font = '500 20px "SF Mono", Menlo, monospace';
  ctx.textAlign = 'left';
  ctx.fillText('AL  '+(23.5 + progress*0.4).toFixed(2)+' mm', x0 + 24, y0 + 40);
  ctx.fillText('K   43.25 D', x0 + 24, y0 + 68);
  ctx.fillText('ACD  3.12 mm', x0 + 24, y0 + 96);
  ctx.restore();
}

function drawClinicScene(ctx, a){
  ctx.save();
  ctx.globalAlpha = a;
  ctx.fillStyle = '#ece6d6';
  ctx.fillRect(0, 0, W, H);
  const px = W*0.40, py = 620;
  ctx.fillStyle = '#9aa8b5';
  if(ctx.roundRect){
    ctx.beginPath(); ctx.roundRect(px-130, py-40, 260, 340, 20); ctx.fill();
  } else {
    ctx.fillRect(px-130, py-40, 260, 340);
  }
  ctx.fillStyle = '#e0c9b0';
  ctx.beginPath(); ctx.arc(px, py - 100, 62, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(px, py - 140, 55, Math.PI, Math.PI*2); ctx.fill();
  const tx = W*0.62, ty = 640;
  ctx.fillStyle = '#a3b0bd';
  if(ctx.roundRect){
    ctx.beginPath(); ctx.roundRect(tx-90, ty-150, 180, 300, 22); ctx.fill();
  } else {
    ctx.fillRect(tx-90, ty-150, 180, 300);
  }
  ctx.fillStyle = '#e0c9b0';
  ctx.beginPath(); ctx.arc(tx, ty - 200, 52, 0, Math.PI*2); ctx.fill();
  const v = ctx.createRadialGradient(W/2, H/2, H*0.35, W/2, H/2, H*0.95);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(60,40,30,0.18)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}  
  function makeGeneric(unit){
  return function(ctx, t){
    const D = unit.duration;
    ctx.save(); ctx.globalAlpha = 0.03;
    const rnd = mulberry32(1);
    for(let i=0;i<400;i++){ ctx.fillStyle='#5a4a42'; ctx.fillRect(rnd()*W, rnd()*H, 1, 1); }
    ctx.restore();
    const pillA = smooth(phase(t,0,1));
    withAlpha(pillA, ()=>{
      ctx.save(); ctx.fillStyle = P.bgDeep;
      const x=90,y=90,w=180,h=54,r=27;
      ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(x,y,w,h,r); else ctx.rect(x,y,w,h);
      ctx.fill(); ctx.fillStyle=P.ink; ctx.font='600 24px "Iowan Old Style", Georgia, serif';
      ctx.textBaseline='middle'; ctx.textAlign='center'; ctx.fillText(unit.section, x+w/2, y+h/2+1); ctx.restore();
    });
    drawLabel(unit.id, 90, 190, smooth(phase(t,0.6,1)), {anchor:'left', size:22, color:P.textSoft, italic:false});
    const titleA = smooth(phase(t,1,1.6));
    ctx.save(); ctx.globalAlpha = titleA; ctx.fillStyle = P.text;
    ctx.font = '500 76px "Iowan Old Style", Georgia, serif'; ctx.textBaseline = 'top';
    const words = unit.title.split(' '); const lines = []; let cur='';
    for(const w of words){ const test = cur ? cur+' '+w : w; if(ctx.measureText(test).width > 900 && cur){ lines.push(cur); cur=w; } else cur = test; }
    if(cur) lines.push(cur);
    lines.slice(0,3).forEach((ln,i)=> ctx.fillText(ln, 90, 230 + i*92));
    ctx.restore();
    const ruleA = smooth(phase(t,1.6,1));
    withAlpha(ruleA, ()=>{ setInk(2,P.inkSoft); hLine(90, 230+lines.slice(0,3).length*92+20, 640, 230+lines.slice(0,3).length*92+20, 71, 1.4); });
    const iconA = smooth(phase(t,1.4,1.8));
    const iconP = smooth(phase(t,1.6,Math.min(3, D*0.2)));
    drawSectionIcon(unit.section, 1420, 620, 340, iconA, iconP);
    const capA = smooth(phase(t,D-3,2.5));
    withAlpha(capA, ()=>{
      ctx.fillStyle = P.textSoft; ctx.font = 'italic 22px "Iowan Old Style", Georgia, serif';
      ctx.textAlign='right'; ctx.fillText('Let\u2019s Talk Cataract Workups', W-90, H-70);
    });
  };
}

const T = [
  ['S0-01','How the Eye Focuses Light','S0',81.6],
  ['S0-02','Lens Clarity and Cataract','S0',65.4],
  ['S0-03','How Lens Changes Affect Visual Function','S0',60],
  ['S0-04','Core Terms for the Cataract Evaluation','S0',65],
  ['S0-05','Why the Workup Categories Matter','S0',136],
  ['S1-01','The Seven-Stage Map','S1',70],
  ['S1-02','Before the Patient Arrives','S1',60],
  ['S1-03','Spot Tests That Need the Pre-Dilation State','S1',53],
  ['S2-01','Start With the Right Patient','S2',75],
  ['S2-02',"Today's Visit and the Right Eye",'S2',75],
  ['S2-03','What Must Be True Before Capture?','S2',75],
  ['S2-04','When the Sources Disagree','S2',63],
  ['S2-05','Ready to Measure? One Last Gate','S2',63],
  ['S3-01','Four Questions Before You Trust a Number','S3',80],
  ['S3-02','Coach for a Clean Capture','S3',55],
  ['S3-03','Keratometry: What a K Value Represents','S3',105],
  ['S3-04','Topography: Surface Maps and Quality','S3',105],
  ['S3-05','Tomography: Back Surface and Scan Quality','S3',105],
  ['S3-06','Biometry: Measure the Eye','S3',108],
  ['S3-07',"When Optical Axial Length Won't Read",'S3',90],
  ['S3-08','Repeatability and Outlier Review','S3',85],
  ['S3-09','Right Eye Left Eye and Prior Data','S3',70],
  ['S3-10','Document the Limitation','S3',50],
  ['S4-01','History Without the Diagnosis','S4',60],
  ['S4-02','Start With Function','S4',75],
  ['S4-03','Ocular History and Prior Eye Surgery','S4',90],
  ['S4-04','Contact Lenses','S4',55],
  ['S4-05','A-B-D-P: Medication Recall Check','S4',75],
  ['S4-06','Allergy History','S4',55],
  ['S4-07','Medical History','S4',70],
  ['S4-08','Provider Questions, Story-Chart Mismatch, and Intake Checkpoint','S4',104],
  ['S5-01','What Correction Does the Patient Normally Use?','S5',55],
  ['S5-02','Visual Acuity: Label the Condition','S5',60],
  ['S5-03','Glare and BAT','S5',60],
  ['S5-04','Pinhole and Near Vision','S5',60],
  ['S5-05','Refraction: Stay in Your Lane','S5',55],
  ['S5-06','IOP: Measure, Label, and Repeat','S5',65],
  ['S5-07','One Documentation Rule Across Routine Tests','S5',96],
  ['S6-01','Before Dilation, Finish What Must Come First','S6',75],
  ['S6-02','Right Patient, Right Drop, Right Order','S6',85],
  ['S6-03','Make the Administration Traceable','S6',45],
  ['S6-04','Van Herick: Slit, Space, Compare, Document','S6',107],
  ['S7-01','Final Review: What Is Not Ready Yet?','S7',55],
  ['S7-02','Make Missing and Limited Data Visible','S7',65],
  ['S7-03','Ready for Handoff or Not Yet?','S7',75],
  ['S7-04','SBAR: Turn Technical Facts Into Handoff','S7',135],
  ['S7-05','Close the Loop','S7',108]
];

const COURSE = {};
for(const [id,title,section,duration] of T) COURSE[id] = { id, title, section, duration, render: null };
COURSE['S0-01'].render = unit_S0_01;
COURSE['S0-02'].render = unit_S0_02;
for(const id in COURSE) if(!COURSE[id].render) COURSE[id].render = makeGeneric(COURSE[id]);
window.COURSE = COURSE;
})();

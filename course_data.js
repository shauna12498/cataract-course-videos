(function(){
const E = window.Engine;
const { W,H,P,phase,easeOut,smooth,drawLabel,drawApple,drawHeadAndEye,drawCorneaArc,drawLens,drawRay,drawBrain,drawLattice,drawClouds,drawScatter,drawHazyScene,drawDevice,drawClinic,drawSectionIcon,setInk,hLine,hCircle,mulberry32,withAlpha } = E;

function unit_S0_01(ctx,t){
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

function unit_S0_02(ctx,t){
  const lensIn = easeOut(phase(t,0,2));
  const lensOut = 1 - smooth(phase(t,15,3));
  const lensA = lensIn * lensOut;
  if(lensA > 0.01) drawLens(960, 540, 160, 220, lensA, {clear:true});
  const latIn = smooth(phase(t,6,3));
  const latOut = 1 - smooth(phase(t,16,3));
  const latA = latIn * latOut;
  if(latA > 0.01) drawLattice(960, 540, 340, 0, latA, 4);
  const dis = smooth(phase(t,17,8));
  if(dis > 0.01) drawLattice(960, 540, 340, dis, 1, 4);
  const eyeA = smooth(phase(t,25,2.5));
  const eyeOut = 1 - smooth(phase(t,31,2));
  if(eyeA*eyeOut > 0.01){
    withAlpha(1-smooth(phase(t,25,3)), ()=>{ drawLattice(960,540,340,1,1,4); });
    drawLens(960, 540, 320, 420, eyeA*eyeOut, {clear:true});
    const bP = smooth(phase(t,26,3));
    drawRay([[300,540],[960,540],[1620,540]], bP*eyeA*eyeOut, P.goldHi, 6);
  }
  const clIn = smooth(phase(t,31,3));
  const clOut = 1 - smooth(phase(t,40,3));
  if(clIn*clOut > 0.01){
    ctx.save(); ctx.fillStyle='#fbf6ea'; ctx.globalAlpha=clIn*clOut; ctx.fillRect(400,140,1120,800); ctx.restore();
    drawClouds(960, 540, 380, clIn*clOut, 5);
    drawRay([[300,540],[960,540]], clIn*clOut*0.7, P.goldHi, 4);
  }
  const scIn = smooth(phase(t,40,3));
  const scOut = 1 - smooth(phase(t,48,3));
  if(scIn*scOut > 0.01){
    drawLens(960, 540, 90, 260, scIn*scOut*0.5, {clear:true});
    drawScatter(960, 540, 300, (t-40)/8, scIn*scOut);
  }
  const hzIn = smooth(phase(t,48,3));
  const hzOut = 1 - smooth(phase(t,54,3));
  if(hzIn*hzOut > 0.01) drawHazyScene(smooth(phase(t,49,5)), hzIn*hzOut);
  const dvIn = smooth(phase(t,54,3));
  const dvOut = 1 - smooth(phase(t,62,3));
  if(dvIn*dvOut > 0.01) drawDevice(smooth(phase(t,55,6)), dvIn*dvOut);
  const cl2A = smooth(phase(t,62,3));
  if(cl2A > 0.01) drawClinic(smooth(phase(t,62,3.4)), cl2A);
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

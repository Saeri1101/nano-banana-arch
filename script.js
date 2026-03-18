// ═══ CORE CONFIGURATION ═══
const S = { f:null, type:'Custom', ie:'exterior', step:0, sel:{} };

function gs(id) { if(!S.sel[id]) S.sel[id] = new Set(); return S.sel[id]; }
function gv(id) { 
  const v = S.sel[id]; 
  if(!v) return null; 
  if(v instanceof Set) return v.size > 0 ? [...v].join(', ') : null; 
  return v; 
}

// ═══ INITIALIZATION ═══
function init() {
  render();
}

// ═══ MAIN RENDER LOOP ═══
function render() {
  const steps = getSteps();
  const nav = document.getElementById('snav');
  
  // 1. Render Left Navigation
  let nh = '<div class="snl mono">DESIGN SEQUENCE</div>';
  steps.forEach((s, i) => {
    const val = gv(s.id);
    const count = (val && val.includes(',')) ? val.split(',').length : (val ? 1 : 0);
    nh += `<div class="si ${i === S.step ? 'act' : ''}" onclick="S.step=${i};render()">
      <span>${s.t}</span>
      ${count > 0 ? `<span class="ss mono">✓${count}</span>` : ''}
    </div>`;
  });
  nav.innerHTML = nh;

  // 2. Render Central Canvas
  renderStep();

  // 3. Render Right Live Prompt & Diagram
  renderPrompt();
  updateDiagram();
}

function getSteps() {
  return [
    {id:'role', t:'Role'},
    {id:'style', t:'Architectural Style'},
    {id:'ext_mat', t:'Materials'},
    {id:'sustain', t:'Sustainability (LEED)'},
    {id:'weather', t:'Atmosphere & Weather'},
    {id:'lighting', t:'Lighting Design'},
    {id:'negative', t:'Constraints'}
  ];
}

function renderStep() {
  const steps = getSteps();
  const step = steps[S.step];
  const area = document.getElementById('ma');
  let h = `<div class="mht h4">${step.t}</div>`;

  if(step.id === 'sustain') h += rSustain();
  else if(step.id === 'role') h += rRole();
  else h += `<div class="mhd">Select parameters for your prompt. Guidance from AECOM standards integrated.</div>`;

  area.innerHTML = h;
}

// ═══ FEATURE: LEED MODULE ═══
function rSustain(){
  let h = '<div class="mhd">Select a sustainability target. The system translates policy into visible tectonic strategies.</div>';
  const opts = [
    {v:'standard modern construction', t:'Standard Code', d:'Baseline strategies.'},
    {v:'operable windows, deep roof overhangs, standard sedum green roof', t:'LEED Silver', d:'Passive visible systems.'},
    {v:'kinetic shading louvers, double-skin facade, bioswale landscape, visible rooftop PV', t:'LEED Gold', d:'Active performance systems.'},
    {v:'Building-Integrated Photovoltaics (BIPV), multi-story living walls, heavy timber diagrid', t:'LEED Platinum', d:'Ecological machine.'}
  ];
  
  h += '<div class="hier-l">Performance Level</div>';
  opts.forEach(o => {
    const on = S.sel.sustain === o.v;
    h += `<div class="tag ${on ? 'on' : ''}" onclick="S.sel.sustain='${o.v}';render()">${o.t}</div>`;
  });
  return h;
}

function rRole() {
  const tags = ['Act as an expert architectural visualizer','Produce a production-grade 3D render','Conceptual massing ideation'];
  return `<div class="hier-items">${tags.map(t => `<span class="tag ${S.sel.role === t ? 'on' : ''}" onclick="S.sel.role='${t}';render()">${t}</span>`).join('')}</div>`;
}

// ═══ FEATURE: DYNAMIC SVG DIAGRAM ═══
function updateDiagram() {
  const isI = S.ie === 'interior';
  const type = S.type || '';
  
  document.querySelectorAll('.dia-mass').forEach(el => el.classList.remove('active'));
  
  if (isI) {
    document.getElementById('dia-int').classList.add('active');
  } else if (type.includes('Tower') || type.includes('High-Rise')) {
    document.getElementById('dia-tower').classList.add('active');
  } else if (type.includes('House')) {
    document.getElementById('dia-house').classList.add('active');
  } else {
    document.getElementById('dia-mid').classList.add('active');
  }
}

// ═══ PROMPT COMPILER ═══
function renderPrompt() {
  const val = (id) => gv(id) || `[${id.toUpperCase()}]`;
  let t = `${val('role')} of a ${S.type}. Style: ${val('style')}. Materials: ${val('ext_mat')}. `;
  if(gv('sustain') && gv('sustain') !== 'standard modern construction') {
    t += `Sustainability features: ${gv('sustain')}. `;
  }
  document.getElementById('ptx').innerHTML = t;
}

function cpFinal() {
  const prompt = document.getElementById('ptx').innerText;
  navigator.clipboard.writeText(prompt);
  alert("Prompt copied to clipboard!");
}

function restart() { S.sel = {}; S.step = 0; render(); }
function resetDef() { S.sel = {}; render(); }

window.onload = init;

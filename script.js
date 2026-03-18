// ════════════════════════════════════════════════════════════
// 1. THE ARCHITECTURAL TAXONOMY (Imported completely from v11)
// ════════════════════════════════════════════════════════════
const TYPES = [
  {c:'Civic & Government',i:['City Hall','Courthouse','Fire Station','Community Center','Library','Post Office','Embassy']},
  {c:'Cultural',i:['Museum','Art Gallery','Theater / Opera','Concert Hall','Cultural Center','Memorial','Religious Building']},
  {c:'Education',i:['Elementary School','High School','Kindergarten','University','Research Lab','Dormitory']},
  {c:'Healthcare',i:['Hospital','Clinic','Wellness / Spa','Senior Living']},
  {c:'Residential',i:['Single-Family House','Townhouse','Low-Rise Apartment','Mid-Rise Apartment','High-Rise Residential','Villa / Estate','Social Housing']},
  {c:'Commercial',i:['Office Tower','Co-Working Space','Retail Store','Shopping Mall','Showroom','Bank']},
  {c:'Hospitality',i:['Luxury Hotel','Boutique Hotel','Resort','Fine Dining Restaurant','Casual Restaurant','Bar / Nightclub','Café']},
  {c:'Infrastructure',i:['Airport Terminal','Metro Station','Rail Station','Bus Terminal','Bridge','Parking Structure']},
  {c:'Industrial',i:['Data Center','Factory','Warehouse','Water Treatment']},
  {c:'Sports',i:['Stadium','Gymnasium','Aquatic Center','Amphitheater']},
  {c:'Mixed-Use',i:['Podium + Tower','Live-Work','Vertical Village']}
];

const CLIMATES = [
  {id:'cold_dry',t:'Cold & Dry',weather:'crisp overcast autumn morning with fall foliage',veg:['Deciduous trees','Ornamental grasses','Wildflower meadow']},
  {id:'temperate',t:'Temperate',weather:'warm golden hour casting long dramatic shadows',veg:['Deciduous trees','Cherry blossoms','Formal hedgerow']},
  {id:'hot_humid',t:'Hot & Humid',weather:'bright mid-summer, harsh sun, azure sky',veg:['Tropical palms','Dense tropical planting','Bamboo grove']},
  {id:'hot_dry',t:'Hot & Dry',weather:'harsh midday sun with clear azure sky',veg:['Desert xeriscape','Agave and cacti','Date palms']},
  {id:'mediterranean',t:'Mediterranean',weather:'warm golden hour with deep amber light',veg:['Olive trees','Lavender','Bougainvillea']},
  {id:'cold_wet',t:'Cold & Wet',weather:'overcast with soft diffuse light',veg:['Evergreen conifers','Ferns','Moss-covered stone']},
  {id:'tropical',t:'Tropical',weather:'hazy summer afternoon with lush greenery',veg:['Dense tropical canopy','Frangipani','Banana plants']},
  {id:'nordic',t:'Nordic',weather:'stark flat winter daylight with bare trees',veg:['Birch grove','Pine forest','Moss ground cover']}
];

const LEED_LEVELS = [
  {id:'certified',t:'Certified',features:['Green roof (sedum)','Bioswale','Permeable pavers']},
  {id:'silver',t:'Silver',features:['Green roof (sedum)','Bioswale','Permeable pavers','Solar bollard lights','Native meadow']},
  {id:'gold',t:'Gold',features:['Green roof (sedum)','Bioswale','Permeable pavers','Rooftop PV array','Native meadow','EV charging stations','Living wall','Rainwater cistern']},
  {id:'platinum',t:'Platinum',features:['Green roof (sedum)','Bioswale','Permeable pavers','Rooftop PV array','BIPV','Native meadow','EV charging stations','Living wall','Rainwater cistern','Pollinator corridor','Constructed wetland','Cool roof']}
];

function getExtD(){return[{t:'Concrete & Stone',subs:[{l:'Type',tags:['Board-formed concrete','Pitted brutalist','Smooth precast','Fluted precast','Rammed earth','Bush-hammered limestone','Honed travertine']},{l:'Finish',tags:['Natural grey','White concrete','Dark charcoal','Warm sandstone','Weathered']}]},{t:'Metal',subs:[{l:'Type',tags:['Corten steel (weathered rust)','Standing seam zinc','Brushed aluminum','Perforated stainless mesh','Copper panels (patina)','Insulated metal panels']},{l:'Pattern',tags:['Vertical seam','Horizontal lapped','Perforated screen','Cassette panels']}]},{t:'Wood',subs:[{l:'Type',tags:['Shou Sugi Ban (charred)','Western Red Cedar slats','Vertical battens','Horizontal rainscreen','CNC timber louvers','Timber shingle']},{l:'Tone',tags:['Natural light','Honey warm','Dark stained','Charred black','Weathered grey']}]},{t:'Glass & Curtain Wall',subs:[{l:'System',tags:['Unitized curtain wall','Frameless structural glazing','Double-skin facade','Punched windows','Ribbon windows']},{l:'Glass',tags:['Low-iron ultra-clear','Bird-safe fritted','Reflective bronze-tinted','Light-green tinted','Electrochromic smart','Spandrel (opaque)','Polycarbonate','Channel glass']},{l:'Mullion',tags:['Polished stainless steel','Anodized aluminum','Black powder-coated','Gunmetal','Minimal silicone']}]},{t:'Shading',subs:[{l:'Type',tags:['Terracotta baguettes','Brise-soleil','Fixed louvers','Timber screen','Metal mesh','Kinetic louvers','PTFE membrane']}]},{t:'Roof',subs:[{l:'Type',tags:['Standing seam metal','Green roof (sedum)','ETFE cushion','Steel truss','PV integrated','Flat concrete','Copper (patina)']}]},{t:'Base',subs:[{l:'Type',tags:['Columns + glass','Rusticated stone','Glass at ground','Pilotis','Canopy entry','Arcade','Masonry plinth']}]}];}


// ════════════════════════════════════════════════════════════
// 2. THE LOGIC ENGINE (v12 Grid Workspace)
// ════════════════════════════════════════════════════════════
const S = { type:'Museum', ie:'exterior', step:0, sel:{ ext_mat: new Set() } };

// Get formatted value from Set or String
function gv(id) { 
  const v = S.sel[id]; 
  if(!v) return null; 
  if(v instanceof Set) return v.size > 0 ? [...v].join(', ') : null; 
  return v; 
}

// Toggle logic for Sets (Allows selecting multiple materials)
function tagTog(id, val) {
  if(!S.sel[id]) S.sel[id] = new Set();
  S.sel[id].has(val) ? S.sel[id].delete(val) : S.sel[id].add(val);
  render();
}

function render() {
  const steps = [
    {id:'type', t:'Building Typology'},
    {id:'ext_mat', t:'Tectonics & Materials'},
    {id:'sustain', t:'LEED Sustainability'},
    {id:'climate', t:'Atmosphere & Site'}
  ];
  
  // 1. Render Navigation
  let nh = '<div class="snl mono">DESIGN SEQUENCE</div>';
  steps.forEach((s, i) => {
    const val = gv(s.id);
    const count = (val && val.includes(',')) ? val.split(',').length : (val ? 1 : 0);
    nh += `<div class="si ${i === S.step ? 'act' : ''}" onclick="S.step=${i};render()">
      <span>${s.t}</span>
      ${count > 0 ? `<span class="ss mono" style="color:var(--gn)">✓${count}</span>` : ''}
    </div>`;
  });
  document.getElementById('snav').innerHTML = nh;

  // 2. Render Central Canvas
  renderCanvas(steps[S.step].id);

  // 3. Update Outputs
  renderPrompt();
  updateDiagram();
}

function renderCanvas(stepId) {
  const area = document.getElementById('ma');
  let h = '';

  if(stepId === 'type') {
    h += `<div class="mht">Typology</div><div class="mhd">Select primary program.</div>`;
    TYPES.forEach(cat => {
      h += `<div class="hier-l">${cat.c}</div><div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:12px;">`;
      cat.i.forEach(t => {
        h += `<span class="tag ${S.type === t ? 'on' : ''}" onclick="S.type='${t}';render()">${t}</span>`;
      });
      h += `</div>`;
    });
  } 
  else if (stepId === 'ext_mat') {
    h += `<div class="mht">Materials</div><div class="mhd">Select tectonic assemblies.</div>`;
    getExtD().forEach(cat => {
      h += `<div style="margin-top:16px; padding-bottom:4px; border-bottom:1px solid var(--bd); font-weight:600; color:var(--txd);">${cat.t}</div>`;
      cat.subs.forEach(sub => {
        h += `<div class="hier-l">${sub.l}</div><div style="display:flex; flex-wrap:wrap; gap:4px;">`;
        sub.tags.forEach(t => {
          const on = S.sel.ext_mat?.has(t);
          h += `<span class="tag ${on ? 'on' : ''}" onclick="tagTog('ext_mat', '${t}')">${t}</span>`;
        });
        h += `</div>`;
      });
    });
  }
  else if (stepId === 'sustain') {
    h += `<div class="mht">Sustainability Target</div><div class="mhd">Translates targets into visible features.</div>`;
    LEED_LEVELS.forEach(l => {
      const on = S.sel.sustain === l.id;
      h += `<div class="tag ${on ? 'on' : ''}" style="display:block; margin:8px 0; padding:12px;" onclick="S.sel.sustain='${l.id}';render()">
        <strong>LEED ${l.t}</strong><br><small style="opacity:0.8">${l.features.join(', ')}</small>
      </div>`;
    });
  }
  else if (stepId === 'climate') {
    h += `<div class="mht">Site Climate</div><div class="mhd">Sets vegetation and atmosphere defaults.</div>`;
    CLIMATES.forEach(c => {
      const on = S.sel.climate === c.id;
      h += `<div class="tag ${on ? 'on' : ''}" style="display:block; margin:8px 0; padding:12px;" onclick="S.sel.climate='${c.id}';render()">
        <strong>${c.t}</strong><br><small style="opacity:0.8">${c.veg.join(', ')} | ${c.weather}</small>
      </div>`;
    });
  }
  area.innerHTML = h;
}

function updateDiagram() {
  document.querySelectorAll('.dia-mass').forEach(el => el.classList.remove('active'));
  if (S.type.includes('Tower') || S.type.includes('High-Rise')) document.getElementById('dia-tower').classList.add('active');
  else if (S.type.includes('House') || S.type.includes('Villa')) document.getElementById('dia-house').classList.add('active');
  else document.getElementById('dia-mid').classList.add('active');
}

function renderPrompt() {
  const leedDef = LEED_LEVELS.find(l => l.id === S.sel.sustain);
  const sustainStr = leedDef ? leedDef.features.join(', ') : '';
  const climDef = CLIMATES.find(c => c.id === S.sel.climate);
  const climStr = climDef ? `${climDef.weather}. Landscape: ${climDef.veg.join(', ')}` : '';

  let t = `Production-grade architectural visualization of a ${S.type}. `;
  if (gv('ext_mat')) t += `Materials: ${gv('ext_mat')}. `;
  if (sustainStr) t += `Sustainable features: ${sustainStr}. `;
  if (climStr) t += `Context: ${climStr}. `;
  t += `High-fidelity, photorealistic, UE5.`;
  
  document.getElementById('ptx').innerText = t;
}

function cpFinal() {
  navigator.clipboard.writeText(document.getElementById('ptx').innerText);
  alert("Prompt Copied!");
}

function restart() { S.sel={ ext_mat: new Set() }; S.step=0; render(); }
function resetDef() { S.sel={ ext_mat: new Set() }; render(); }

window.onload = render;

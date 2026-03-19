// ════════════════════════════════════════════════════════════
// NANO BANANA — Prompt Builder  app.js
// ════════════════════════════════════════════════════════════

// ── PALETTE ─────────────────────────────────────────────────
const P = {
  navy:  '#205072',
  teal:  '#329D9C',
  green: '#56C596',
  lt:    '#7BE495',
  pale:  '#CFF4D2',
};

// ── DATA ────────────────────────────────────────────────────
const FORMULAS = [
  { id:'creation', n:'01', t:'Text → Image',       d:'Generate from text description.', sc:'Idea, no drawings.',     color: P.teal  },
  { id:'sketch',   n:'02', t:'Sketch → Image',      d:'Transform sketch to render.',     sc:'Have a sketch.',        color: P.green },
  { id:'rigid',    n:'03', t:'Technical → Render',  d:'Materials on 3D model.',          sc:'Rhino/Revit ready.',    color: P.navy  },
  { id:'inpaint',  n:'04', t:'Inpainting',           d:'Fix one element.',                sc:'One thing wrong.',      color: P.lt    },
  { id:'to_tech',  n:'05', t:'Render → Drawing',    d:'Photo to line drawing.',          sc:'Need technical drawing.', color: P.pale },
];

const TYPES = [
  { c:'Civic & Government',  color: P.navy,  i:['City Hall','Courthouse','Fire Station','Community Center','Library','Post Office','Embassy'] },
  { c:'Cultural',            color: P.teal,  i:['Museum','Art Gallery','Theater / Opera','Concert Hall','Cultural Center','Memorial','Religious Building'] },
  { c:'Education',           color: P.green, i:['Elementary School','High School','Kindergarten','University','Research Lab','Dormitory'] },
  { c:'Healthcare',          color: P.lt,    i:['Hospital','Clinic','Wellness / Spa','Senior Living'] },
  { c:'Residential',         color: P.navy,  i:['Single-Family House','Townhouse','Low-Rise Apartment','Mid-Rise Apartment','High-Rise Residential','Villa / Estate','Social Housing'] },
  { c:'Commercial',          color: P.teal,  i:['Office Tower','Co-Working Space','Retail Store','Shopping Mall','Showroom','Bank'] },
  { c:'Hospitality',         color: P.green, i:['Luxury Hotel','Boutique Hotel','Resort','Fine Dining Restaurant','Casual Restaurant','Bar / Nightclub','Café'] },
  { c:'Infrastructure',      color: P.lt,    i:['Airport Terminal','Metro Station','Rail Station','Bus Terminal','Bridge','Parking Structure'] },
  { c:'Industrial',          color: P.navy,  i:['Data Center','Factory','Warehouse','Water Treatment'] },
  { c:'Sports',              color: P.teal,  i:['Stadium','Gymnasium','Aquatic Center','Amphitheater'] },
  { c:'Mixed-Use',           color: P.green, i:['Podium + Tower','Live-Work','Vertical Village'] },
];

const MAT_STYLES = [
  { id:'timber',         t:'Timber / Wood',      d:'Warm, natural, sustainable. CLT, cedar, charred timber.',    k:'Cedar slats, Shou Sugi Ban, Glulam, CLT, timber battens',           color: P.lt,
    defaults:{ style:['Haptic Materiality'], ext_mat:['Western Red Cedar slats','Shou Sugi Ban (charred)','Vertical battens','Glulam soffit'], int_mat:['White oak plank','Acoustic timber slats','Glulam beams','Cork tile'], lt_t:'warm 3000K', color:['Warm earth tones','Timber + brass'] }},
  { id:'concrete',       t:'Concrete / Stone',   d:'Heavy, monolithic, brutalist. Raw or refined.',              k:'Board-formed, rammed earth, travertine, terrazzo',                  color: P.navy,
    defaults:{ style:['Monolithic Phenomenological'], ext_mat:['Board-formed concrete','Honed travertine','Bush-hammered limestone'], int_mat:['Polished concrete','Honed granite','Board-formed concrete wall','Epoxy terrazzo'], lt_t:'neutral 4000K', weather:'overcast with soft diffuse light', color:['True-color materials'] }},
  { id:'steel',          t:'Metal / Steel',      d:'Industrial, precise, high-tech. Corten, zinc, aluminum.',    k:'Corten steel, standing seam zinc, perforated mesh, diagrid',        color: P.teal,
    defaults:{ style:['Structural Expressionism','Industrial Minimalism'], ext_mat:['Corten steel (weathered rust)','Standing seam zinc','Brushed aluminum','Perforated stainless mesh'], int_mat:['Exposed steel columns','Steel grating','Raised access floor'], lt_t:'cool 6500K', color:['Cool stone + glass'] }},
  { id:'glass',          t:'Glass / Transparent',d:'Light, open, corporate. Curtain walls, structural glazing.', k:'Unitized curtain wall, fritted glass, double-skin, structural glazing', color: P.pale,
    defaults:{ style:['Corporate Rationalism','Engineered Rationalism'], ext_mat:['Unitized curtain wall','Low-iron structural glazing','Fritted glass'], int_mat:['Full-height glass','Frosted glass partition'], lt_t:'neutral 4000K', color:['Bleached natural'] }},
  { id:'timber_concrete',t:'Wood + Concrete',    d:'The most popular hybrid. Warm meets heavy.',                 k:'CLT on concrete core, timber screen + concrete base, cedar + board-formed', color: P.green,
    defaults:{ style:['Haptic Materiality','Critical Regionalism'], ext_mat:['Western Red Cedar slats','Board-formed concrete','Low-iron structural glazing'], int_mat:['White oak plank','Board-formed concrete wall','Acoustic timber slats','Glulam beams'], lt_t:'warm 3000K', color:['Warm earth tones'] }},
  { id:'mixed',          t:'Mixed / Experimental',d:'Unconventional combinations. Cross any material boundaries.', k:'Custom mix — you choose everything manually',                       color: P.teal,
    defaults:{ style:['Data-Driven Form'], ext_mat:[], int_mat:[], lt_t:'warm 3000K', color:['Rich contrast'] }},
];

const CLIMATES = [
  { id:'cold_dry',      t:'Cold & Dry',    d:'Boston, Chicago, Minneapolis, Denver',   color: P.navy,  weather:'crisp overcast autumn morning with fall foliage', veg:['Deciduous trees','Ornamental grasses','Wildflower meadow'], bad:['Tropical palms','Dense tropical planting','Bamboo grove','Banana plants','Frangipani','Date palms','Bougainvillea','Agave and cacti'] },
  { id:'temperate',     t:'Temperate',     d:'New York, DC, Philadelphia, Atlanta',     color: P.teal,  weather:'warm golden hour casting long dramatic shadows', veg:['Deciduous trees','Cherry blossoms','Formal hedgerow'], bad:['Tropical palms','Dense tropical canopy','Bamboo grove','Banana plants','Date palms','Agave and cacti','Moss ground cover'] },
  { id:'hot_humid',     t:'Hot & Humid',   d:'Miami, Houston, New Orleans, Taipei, Singapore', color: P.green, weather:'bright mid-summer, harsh sun, azure sky', veg:['Tropical palms','Dense tropical planting','Bamboo grove'], bad:['Birch grove','Pine forest','Moss ground cover','Wildflower meadow'] },
  { id:'hot_dry',       t:'Hot & Dry',     d:'Phoenix, Las Vegas, Dubai, Riyadh',       color: P.lt,    weather:'harsh midday sun with clear azure sky', veg:['Desert xeriscape','Agave and cacti','Date palms'], bad:['Tropical palms','Dense tropical planting','Birch grove','Pine forest','Ferns','Cherry blossoms','Wildflower meadow'] },
  { id:'mediterranean', t:'Mediterranean', d:'Los Angeles, San Francisco, Barcelona',   color: P.teal,  weather:'warm golden hour with deep amber light', veg:['Olive trees','Lavender','Bougainvillea'], bad:['Tropical palms','Birch grove','Pine forest','Bamboo grove','Banana plants','Moss ground cover'] },
  { id:'cold_wet',      t:'Cold & Wet',    d:'Seattle, Portland, London, Oslo',         color: P.navy,  weather:'overcast with soft diffuse light', veg:['Evergreen conifers','Ferns','Moss-covered stone'], bad:['Tropical palms','Dense tropical planting','Date palms','Agave and cacti','Bamboo grove','Banana plants'] },
  { id:'tropical',      t:'Tropical',      d:'Hawaii, Bali, Rio, Bangkok',              color: P.green, weather:'hazy summer afternoon with lush greenery', veg:['Dense tropical canopy','Frangipani','Banana plants'], bad:['Birch grove','Pine forest','Wildflower meadow','Ornamental grasses'] },
  { id:'nordic',        t:'Nordic',        d:'Stockholm, Helsinki, Copenhagen',         color: P.lt,    weather:'stark flat winter daylight with bare trees', veg:['Birch grove','Pine forest','Moss ground cover'], bad:['Tropical palms','Dense tropical planting','Bamboo grove','Banana plants','Date palms','Olive trees','Bougainvillea'] },
];

const LEED_LEVELS = [
  { id:null,        t:'No Target',d:'Standard Code' },
  { id:'certified', t:'Certified',d:'40–49 pts', color: P.pale,  features:['Cool roof','Bioswale','Deep overhangs'] },
  { id:'silver',    t:'Silver',   d:'50–59 pts', color: P.lt,    features:['Cool roof','Bioswale','Fritted glass','Rainwater cistern','Native meadow'] },
  { id:'gold',      t:'Gold',     d:'60–79 pts', color: P.green, features:['Green roof (sedum)','Bioswale','Fritted glass','Rooftop PV array','Dynamic louvers','EV charging stations'] },
  { id:'platinum',  t:'Platinum', d:'80+ pts',   color: P.navy,  features:['Extensive green roof','Constructed wetland','BIPV','Kinetic shading facade','Double-skin facade'] },
];

// Firm preset colors cycle through palette
const FIRM_COLORS = [P.navy, P.teal, P.green, P.lt, P.pale, P.navy, P.teal, P.green, P.lt, P.pale, P.navy, P.teal];
const FIRMS = [
  { id:'fluid_param', n:'Fluid Parametric',        ref:'Zaha Hadid',            d:'Continuous differentiation.',                kw:'sinuous curves, parametricism' },
  { id:'diagrammatic',n:'Cross-Programmed',        ref:'OMA / Koolhaas',        d:'Bigness and structural diagrams.',           kw:'polycarbonate, raw steel, cantilever' },
  { id:'engineered',  n:'Engineered Rationalism',  ref:'SOM',                   d:'Structural performance as form.',            kw:'bundled tube, exposed diagrid, sleek glass' },
  { id:'monolithic',  n:'Monolithic Phenom.',      ref:'Zumthor / Ando',        d:'Material truth and chiaroscuro.',            kw:'board-formed concrete, atmospheric light' },
  { id:'particulate', n:'Particulate Tectonics',   ref:'Kengo Kuma',            d:'Dissolution of mass via small elements.',    kw:'timber lattice, ceramic louvers, immaterial' },
  { id:'topo',        n:'Topographical',           ref:'Snøhetta',              d:'Building as continuous landscape.',          kw:'accessible roof, ground plane extension' },
  { id:'folded',      n:'Folded Tectonics',        ref:'Morphosis / FOA',       d:'Continuous topological surfaces.',           kw:'folded plate, angular faceted geometry' },
  { id:'pixel',       n:'Data-Driven Density',     ref:'MVRDV',                 d:'Programmatic extrusion and pixelation.',     kw:'pixelated massing, extreme cantilevers' },
  { id:'pragmatic',   n:'Pragmatic Utopian',       ref:'BIG',                   d:'Hedonistic sustainability, super-forms.',    kw:'stepped terraces, twisted courtyard' },
  { id:'craft',       n:'Digital Craft',           ref:'SHoP Architects',       d:'Parametric masonry and facade textures.',    kw:'parametric brick, copper patina, terracotta' },
  { id:'dynamic',     n:'Dynamic Topology',        ref:'UNStudio',              d:'Moebius loops and deep spatial sequences.',  kw:'continuous loop, double-curved surface' },
  { id:'hightech',    n:'Structural Expression',   ref:'Foster / Rogers',       d:'Exposed servicing and tensile structures.',  kw:'bow-string truss, exposed MEP, tension rods' },
];

// ── GUIDANCE ────────────────────────────────────────────────
const GUIDE = {
  'Library':{ int_mat:{t:'Reading: <strong>warm, acoustic, tactile</strong>.',r:['White oak plank','Cork tile','Acoustic timber slats','Limewash plaster'],r2:['Acoustic felt','Venetian plaster','Herringbone parquet','Wood wool']}, lighting:{t:'<strong>3000K warm, diffuse, glare-free</strong>.',r:['Linear cove','Indirect uplighting','Pendant cluster'],r2:['Skylight','Track lighting','Floor lamp']}, ext_mat:{t:'Civic, <strong>warm, honest</strong>.',r:['Brick masonry','Cedar slats','Fritted glass'],r2:['Honed travertine','Board-formed concrete','Timber shingle']} },
  'Museum':{ int_mat:{t:'<strong>Neutral, recessive</strong>. Art first.',r:['Polished concrete','Honed granite','Cloud ceiling'],r2:['Epoxy terrazzo','Stretch fabric','White oak plank']}, lighting:{t:'<strong>4000K + spots</strong>.',r:['Spotlights','Wall washers','Track lighting'],r2:['Diffuse daylight','Skylight','Linear cove']} },
  'Bar / Nightclub':{ int_mat:{t:'<strong>Dark, moody, textured</strong>.',r:['Exposed brick','Back-painted glass','Copper panels'],r2:['End-grain timber','Steel grating','Raw plaster','Cork wall']}, lighting:{t:'<strong>2200K + neon. Pools of light</strong>.',r:['Neon sign','Firelight','Catenary lights'],r2:['Exposed filament','Toe-kick LED','Candle','Under-cabinet']} },
  'Airport Terminal':{ int_mat:{t:'<strong>Glare control + biophilic</strong>.',r:['Epoxy terrazzo','Glulam soffit','Fritted glass'],r2:['Stretch fabric','Acoustic timber slats','Perforated baffles']}, lighting:{t:'<strong>High-key diffuse</strong>.',r:['Diffuse daylight','God rays','High-bay LED'],r2:['Skylight','Linear cove','Bollard lights']} },
  'Office Tower':{ ext_mat:{t:'<strong>Sleek curtain wall + refined base</strong>.',r:['Unitized curtain wall','Polished limestone base'],r2:['Brushed aluminum','Fritted glass','Standing seam zinc']}, lighting:{t:'<strong>4000K neutral</strong>.',r:['Crisp office','Linear cove','Diffuse daylight'],r2:['Pendant cluster','Track lighting']} },
  'Timber / Wood':{ ext_mat:{t:'Timber exteriors: <strong>warm, natural, sustainable</strong>.',r:['Western Red Cedar slats','Shou Sugi Ban (charred)','Vertical battens','CNC timber louvers'],r2:['Timber shingle','Horizontal rainscreen','Glulam soffit']}, int_mat:{t:'Timber interiors: <strong>warmth, acoustic comfort, natural beauty</strong>.',r:['White oak plank','Acoustic timber slats','Glulam beams','Cork tile'],r2:['Herringbone parquet','Bamboo','Dark walnut','Timber post-beam']}, lighting:{t:'Timber looks best under <strong>warm 3000K light</strong>.',r:['Linear cove','Pendant cluster','Floor lamp'],r2:['Uplighting','Skylight','Candle']} },
  'Concrete / Stone':{ ext_mat:{t:'Concrete/stone: <strong>heavy, monolithic, honest</strong>.',r:['Board-formed concrete','Honed travertine','Bush-hammered limestone'],r2:['Rammed earth','Pitted brutalist','Fluted precast','Smooth precast']}, int_mat:{t:'Concrete interiors: <strong>raw power or refined elegance</strong>.',r:['Polished concrete','Honed granite','Board-formed concrete wall'],r2:['Epoxy terrazzo','Marble mosaic','Exposed aggregate']}, lighting:{t:'Concrete reads best under <strong>neutral 4000K or overcast conditions</strong>.',r:['Diffuse overcast','Wall washers','Spotlights'],r2:['God rays','Chiaroscuro','High-bay LED']} },
  'Metal / Steel':{ ext_mat:{t:'Metal: <strong>industrial precision, weathered patina, or high-tech shine</strong>.',r:['Corten steel (weathered rust)','Standing seam zinc','Brushed aluminum','Perforated stainless mesh'],r2:['Copper panels (patina)','Insulated metal panels','Cassette panels','Vertical seam']}, int_mat:{t:'Metal interiors: <strong>industrial character, exposed systems</strong>.',r:['Exposed steel columns','Steel trusses','Steel grating','Raised access floor'],r2:['Perforated baffles','Exposed MEP plenum','Painted ductwork']}, lighting:{t:'Metal reflects light dramatically. <strong>Cool 6500K for industrial, warm for contrast</strong>.',r:['Cool blue ambient','High-bay LED','Harsh sun'],r2:['Light trails','Facade uplighting','Chiaroscuro','Neon glow']} },
  'Glass / Transparent':{ ext_mat:{t:'Glass: <strong>transparency, reflection, corporate polish</strong>.',r:['Unitized curtain wall','Low-iron ultra-clear','Frameless structural glazing'],r2:['Double-skin facade','Fritted glass','Electrochromic smart','Ribbon windows']}, lighting:{t:'Glass buildings depend on <strong>interior/exterior light contrast</strong>.',r:['Interior glow through glass','Diffuse overcast','Soft sunlight'],r2:['Blue hour glow','Light trails','Facade uplighting']} },
  'Wood + Concrete':{ ext_mat:{t:'The classic hybrid: <strong>warm timber against heavy concrete</strong>.',r:['Western Red Cedar slats','Board-formed concrete','Low-iron structural glazing'],r2:['Shou Sugi Ban (charred)','Honed travertine','Vertical battens','Bush-hammered limestone']}, int_mat:{t:'Wood softens concrete. <strong>Let both materials be honest</strong>.',r:['White oak plank','Board-formed concrete wall','Acoustic timber slats','Glulam beams'],r2:['Cork tile','Limewash plaster','Polished concrete','Herringbone parquet']}, lighting:{t:'Mixed materials need <strong>warm 3000K to bring out wood grain against concrete</strong>.',r:['Linear cove','Pendant cluster','Soft sunlight'],r2:['Uplighting','God rays','Skylight','Floor lamp']} },
  '_default':{ ext_mat:{t:'Be specific: <strong>"board-formed concrete"</strong> not "concrete."',r:['Board-formed concrete','Unitized curtain wall','Cedar slats'],r2:['Honed travertine','Corten steel','Standing seam zinc','Fritted glass']}, int_mat:{t:'Match material to function and mood.',r:['White oak plank','Polished concrete','Acoustic timber slats'],r2:['Limewash plaster','Epoxy terrazzo','Cork tile','Glulam beams']}, lighting:{t:'<strong>2700K cozy → 4000K clean → 6500K clinical</strong>.',r:['Linear cove','Diffuse daylight','Soft sunlight'],r2:['Spotlights','Pendant cluster','Wall washers','God rays']}, camera:{t:'<strong>Eye-level</strong> = human experience. <strong>Aerial</strong> = site context. <strong>35mm</strong> = most natural lens.',r:['eye-level','mid-range','35mm','16:9'],r2:['wide shot','elevated','24mm','4:3']}, medium:{t:'<strong>4K</strong> for presentations. <strong>8K</strong> for competitions. <strong>V-Ray</strong> = sharp, <strong>Corona</strong> = soft.',r:['4K architectural photography','V-Ray'],r2:['8K cinematic','Corona','UE5']}, style:{t:'Pick <strong>ONE</strong> style. Mixing confuses the AI. If unsure, start with your firm preset.',r:['Haptic Materiality','Critical Regionalism','Structural Expressionism'],r2:['Contemporary Brutalism','Data-Driven Form','Nordic Minimalism','Industrial Minimalism']}, scale:{t:'Tell the AI how big the building is. <strong>Stories + footprint</strong> are essential for text-to-image.',r:['4-6','mid-block'],r2:['2-3','7-12','pavilion','full block']}, weather:{t:'Pick ONE condition. <strong>Golden hour</strong> = client favorite. <strong>Overcast</strong> = material truth.',r:['golden hour long shadows','overcast autumn + foliage','blue hour + interior glow'],r2:['bright summer day','autumn after rain wet','spring morning mist + blossoms']}, entourage:{t:'<strong>Slight motion blur</strong> keeps focus on architecture. Match crowd density to building type.',r:['few (3-5)','slight blur'],r2:['single figure','moderate','heavy blur','ghosting']}, color:{t:'Color mood sets the overall palette beyond just lighting.',r:['True-color materials','Warm earth tones'],r2:['Timber + brass','Cool stone + glass','Rich contrast']}, site:{t:'<strong>Urban density</strong> defines what surrounds your building. Landscape adds life.',r:['urban','flat','Deciduous trees'],r2:['suburban','waterfront','Street trees','Bioswale']}, furniture:{t:'Furniture gives interior scenes <strong>human scale and life</strong>.',r:['Lounge chairs','Reception desk'],r2:['Communal table','Floor lamp','Plant wall']}, int_scale:{t:'Tell the AI how tall the space is. <strong>Without this, scale is ambiguous.</strong>',r:['3m','Floor-to-ceiling glass'],r2:['4m','Skylight','Mezzanine','Atrium void']} },
};

// ── DEFAULTS ────────────────────────────────────────────────
const DEFS = {
  'Library':{ style:['Haptic Materiality'], ext_mat:['Brick masonry','Cedar slats','Fritted glass'], int_mat:['White oak plank','Cork tile','Acoustic timber slats','Limewash plaster'], weather:'soft spring morning with light mist', lt_t:'warm 3000K', en_cr:'few people (3-5)', ceil:'4m generous', furniture:['Reading nook (oak)','Communal table','Bookshelf wall','Pendant reading lamp'], color:['Warm earth tones'] },
  'Museum':{ style:['Monolithic Phenomenological'], ext_mat:['Board-formed concrete','Honed travertine','Copper panels (patina)'], int_mat:['Polished concrete','Honed granite','Cloud ceiling'], weather:'overcast with soft diffuse light', lt_t:'neutral 4000K', en_cr:'few people (3-5)', ceil:'6m double-height', furniture:['Museum bench','Display vitrine','Track lighting'], color:['True-color materials'] },
  'Office Tower':{ style:['Corporate Rationalism'], ext_mat:['Unitized curtain wall','Polished limestone base'], int_mat:['Raised access floor','CLT panels','Acoustic timber slats'], weather:'bright mid-summer harsh sun', lt_t:'neutral 4000K', en_cr:'moderate groups', ceil:'3m standard', furniture:['Sit-stand desk','Desk chairs','Whiteboard wall'], color:['True-color materials'] },
  'Bar / Nightclub':{ style:['Industrial Minimalism'], int_mat:['Exposed brick','Back-painted glass','End-grain timber'], weather:'summer night with light trails', lt_t:'amber 2200K', en_cr:'busy crowd', ceil:'4m generous', furniture:['Bar stools','Banquette','Neon sign'], color:['Dark moody'] },
  'Single-Family House':{ style:['Critical Regionalism'], ext_mat:['Brick masonry','Cedar slats','Standing seam metal roof'], int_mat:['White oak plank','Limewash plaster'], weather:'golden hour with long shadows', lt_t:'warm 3000K', en_cr:'single figure', ceil:'3m standard', furniture:['Mid-century sofa','Fireplace','Floor lamp'], color:['Warm earth tones'] },
  'Airport Terminal':{ style:['Structural Expressionism'], ext_mat:['ETFE cushion canopy','Unitized curtain wall','Fritted glass'], int_mat:['Epoxy terrazzo','Glulam soffit','Stretch fabric ceiling'], weather:'bright summer day', lt_t:'neutral 4000K', en_cr:'busy crowd', ceil:'9m+ triple-height', furniture:['Gate seats','Flight board','Moving walkway'] },
  'Metro Station':{ style:['Contemporary Brutalism'], ext_mat:['Board-formed concrete','Corten steel'], int_mat:['Epoxy terrazzo','Board-formed concrete wall','Perforated baffles'], weather:'overcast autumn after rain', lt_t:'cool 6500K', en_cr:'busy crowd', ceil:'6m double-height' },
  'Luxury Hotel':{ style:['Haptic Materiality'], ext_mat:['Honed travertine','Copper panels (patina)'], int_mat:['Marble mosaic','Venetian plaster','White oak plank'], weather:'blue hour with interior glow', lt_t:'amber 2200K', en_cr:'few people (3-5)', ceil:'6m double-height', furniture:['Lounge chairs','Reception desk','Feature chandelier'], color:['Timber + brass'] },
  'Villa / Estate':{ style:['Haptic Materiality'], ext_mat:['Honed travertine','Cedar slats','Low-iron glass'], int_mat:['White oak plank','Marble mosaic','Venetian plaster'], weather:'golden hour', lt_t:'warm 3000K', en_cr:'single figure', ceil:'4m generous', furniture:['Lounge chairs','Fireplace','Feature pendant'], color:['Timber + brass'] },
  'Data Center':{ style:['Industrial Minimalism'], ext_mat:['Insulated metal panels','Polycarbonate'], int_mat:['Raised access floor','Exposed MEP plenum'], weather:'overcast', lt_t:'cool 6500K', en_cr:'single figure', ceil:'4m generous', color:['Cool stone + glass'] },
};
const DEF_FB = { style:['Contemporary'], ext_mat:['Unitized curtain wall','Board-formed concrete'], int_mat:['White oak plank','Polished concrete'], weather:'golden hour', lt_t:'warm 3000K', cam_h:'human eye-level', cam_d:'mid-range building view', en_cr:'few people (3-5)', ceil:'3m standard', furniture:['Lounge chairs'], color:['True-color materials'] };

// ── STATE ────────────────────────────────────────────────────
const S = { f:null, entryPath:null, type:null, matStyle:null, budget:null, ie:null, climate:null, leed:null, firm:null, step:0, sel:{} };
function gv(id){ const v=S.sel[id]; if(!v)return null; if(v instanceof Set)return v.size>0?[...v].join(', '):null; return v||null; }
function gs(id){ if(!S.sel[id])S.sel[id]=new Set(); return S.sel[id]; }

// ── SCREEN CONTROL ───────────────────────────────────────────
function show(id){
  document.querySelectorAll('.screen,.builder').forEach(e=>{ e.classList.remove('active'); e.style.display='none'; });
  const el = document.getElementById(id);
  el.classList.add('active');
  el.style.display = 'flex';
  window.scrollTo(0,0);
}

function restart(){ Object.keys(S).forEach(k=>S[k]=null); S.step=0; S.sel={}; show('s_formula'); }

// ── INIT ─────────────────────────────────────────────────────
function initApp(){
  document.getElementById('fCards').innerHTML = FORMULAS.map(f =>
    `<div class="card" onclick="pickF('${f.id}')">
      <div class="card-swatch" style="background:${f.color}"></div>
      <div class="card-body">
        <div class="cn mono">FORMULA ${f.n}</div>
        <div class="ct">${f.t}</div>
        <div class="cd">${f.d}</div>
        <div class="cs mono">${f.sc}</div>
      </div>
    </div>`
  ).join('');
}

// ── FORMULA PICK ─────────────────────────────────────────────
function pickF(id){
  S.f = id;
  if(id === 'to_tech'){
    S.type    = 'Render';
    S.ie      = 'exterior';
    S.climate = null;
    S.leed    = null;
    S.firm    = null;
    S.sel     = {};
    S.step    = 0;
    applyAllDefaults();
    show('bld');
    render();
  } else {
    show('s_entry');
  }
}

// ── ENTRY PATH ───────────────────────────────────────────────
function pickEntry(path){
  S.entryPath = path;
  if(path === 'program'){
    document.getElementById('typList').innerHTML = TYPES.map((c,i) =>
      `<div class="typ-cat" id="tc${i}">
        <div class="typ-cat-h" onclick="document.getElementById('tc${i}').classList.toggle('open')">
          <span style="display:flex;align-items:center;gap:8px">
            <span style="width:10px;height:10px;border-radius:2px;background:${c.color};display:inline-block;flex-shrink:0"></span>
            ${c.c}
          </span>
          <span class="arrow">▶</span>
        </div>
        <div class="typ-cat-body">
          ${c.i.map(t=>`<div class="typ-item" onclick="pickType('${t.replace(/'/g,"\\'")}');event.stopPropagation()">${t}</div>`).join('')}
        </div>
      </div>`
    ).join('');
    show('s_type');
  } else if(path === 'aesthetic'){
    document.getElementById('matStyleGrid').innerHTML = MAT_STYLES.map(m =>
      `<div class="mat-style-c" onclick="pickMatStyle('${m.id}')">
        <div class="ms-swatch" style="background:${m.color}"></div>
        <div class="mat-style-body">
          <div class="ms-t">${m.t}</div>
          <div class="ms-d">${m.d}</div>
          <div class="ms-k mono">${m.k}</div>
        </div>
      </div>`
    ).join('');
    show('s_matstyle');
  } else {
    S.type='Custom'; S.matStyle=null;
    goToBudget();
  }
}

function pickType(t){ S.type=t; S.matStyle=null; goToBudget(); }
function pickMatStyle(id){ S.matStyle=id; S.type=MAT_STYLES.find(m=>m.id===id)?.t||'Custom'; goToBudget(); }

function goBackFromBudget(){
  if(S.entryPath==='aesthetic') show('s_matstyle');
  else if(S.entryPath==='skip') show('s_entry');
  else show('s_type');
}

function goToBudget(){
  const budgetDefs = [
    { id:'standard', t:'Standard',  d:'Cost-effective construction.',  color: P.lt   },
    { id:'mid',      t:'Mid-Range', d:'Quality materials, no excess.',  color: P.teal },
    { id:'high',     t:'High-End',  d:'Premium detailing throughout.',  color: P.navy },
  ];
  document.getElementById('bCards').innerHTML = budgetDefs.map(b =>
    `<div class="card" onclick="pickBudget('${b.id}')">
      <div class="card-swatch" style="background:${b.color}"></div>
      <div class="card-body">
        <div class="ct">${b.t}</div>
        <div class="cd">${b.d}</div>
      </div>
    </div>`
  ).join('');
  show('s_budget');
}

function pickBudget(id){
  S.budget = id;
  if(S.f==='inpaint'||S.f==='to_tech'){ S.ie='exterior'; goToClimate(); return; }
  document.getElementById('ieCards').innerHTML =
    `<div class="card" onclick="pickIE('exterior')">
      <div class="card-swatch" style="background:${P.teal}"></div>
      <div class="card-body">
        <div class="cn mono">EXTERIOR</div>
        <div class="ct">Outside</div>
        <div class="cd">Facade, site, landscape, weather.</div>
      </div>
    </div>
    <div class="card" onclick="pickIE('interior')">
      <div class="card-swatch" style="background:${P.green}"></div>
      <div class="card-body">
        <div class="cn mono">INTERIOR</div>
        <div class="ct">Inside</div>
        <div class="cd">Surfaces, furniture, scale, lighting.</div>
      </div>
    </div>`;
  show('s_ie');
}

function pickIE(ie){ S.ie=ie; goToClimate(); }

function goToClimate(){
  document.getElementById('climateGrid').innerHTML = CLIMATES.map(c =>
    `<div class="climate-c" onclick="pickClimate('${c.id}')">
      <div class="clim-swatch" style="background:${c.color}"></div>
      <div class="climate-body">
        <div class="cc-t">${c.t}</div>
        <div class="cc-d">${c.d}</div>
      </div>
    </div>`
  ).join('');
  show('s_climate');
}

function pickClimate(id){
  S.climate = id;
  document.getElementById('leedGrid').innerHTML = LEED_LEVELS.map(l =>
    `<div class="leed-c ${l.id===null?'skip-card':''}" onclick="pickLeed(${l.id ? `'${l.id}'` : null})">
      <div class="lc-swatch" style="background:${l.color||'transparent'}"></div>
      <div class="leed-body">
        <div class="lc-t">${l.t}</div>
        <div class="lc-d">${l.d}</div>
      </div>
    </div>`
  ).join('');
  show('s_leed');
}

function pickLeed(id){
  S.leed = id;
  document.getElementById('firmGrid').innerHTML = FIRMS.map((f,i) =>
    `<div class="firm-c" onclick="pickFirm('${f.id}')">
      <div class="fc-swatch" style="background:${FIRM_COLORS[i]}"></div>
      <div class="firm-body">
        <div class="fn">${f.n}</div>
        <div class="fr">${f.ref}</div>
        <div class="fd">${f.d}</div>
        <div class="fk mono">${f.kw}</div>
      </div>
    </div>`
  ).join('');
  show('s_firm');
}

function pickFirm(id){
  S.firm=id; S.sel={}; S.step=0;
  applyAllDefaults();
  show('bld'); render();
}

function resetDef(){ S.sel={}; applyAllDefaults(); render(); }

// ── DEFAULTS APPLICATION ──────────────────────────────────────
function applyAllDefaults(){
  const isI = S.ie === 'interior';
  let d;
  if(S.entryPath==='aesthetic' && S.matStyle){
    const ms = MAT_STYLES.find(m=>m.id===S.matStyle);
    d = ms ? ms.defaults : DEF_FB;
  } else {
    d = DEFS[S.type] || DEF_FB;
  }
  const fb = DEF_FB;

  const roles = { creation:'Act as an expert architectural visualizer and generate', sketch:'RENDER the provided sketch, locking geometry', rigid:'Render the provided technical input, locking geometry', inpaint:'Preserve exact composition, isolate target', to_tech:'Convert the provided image into a technical architectural drawing' };
  S.sel.role = roles[S.f];
  S.sel.med_cat = 'photorealistic';
  S.sel.med     = '4K architectural photography';
  S.sel.style = new Set(d.style || fb.style);
  S.sel.cam_h = d.cam_h || fb.cam_h;
  S.sel.cam_d = d.cam_d || fb.cam_d;

  if(isI) S.sel.int_mat = new Set(d.int_mat || fb.int_mat);
  else    S.sel.ext_mat = new Set(d.ext_mat || fb.ext_mat);

  const clim = CLIMATES.find(c=>c.id===S.climate);
  S.sel.weather = clim?.weather || d.weather || fb.weather;
  if(!isI && clim?.veg) S.sel.si_ls = new Set(clim.veg);

  S.sel.lt_t = d.lt_t || fb.lt_t;
  S.sel.en_cr = d.en_cr || fb.en_cr;
  S.sel.en_fx = 'slight motion blur';

  if(isI){
    S.sel.ceil      = d.ceil      || fb.ceil;
    S.sel.furniture = new Set(d.furniture || fb.furniture);
    S.sel.color     = new Set(d.color || fb.color || []);
  }

  if(S.f==='creation' && !isI){ S.sel.sc_st='4-6 stories'; S.sel.sc_fp='mid-block'; }
  if(!isI){ S.sel.si_den='urban mid-rise'; S.sel.si_tp='flat'; }

  if(S.leed && !isI){
    const leedDef = LEED_LEVELS.find(l=>l.id===S.leed);
    if(leedDef?.features) S.sel.sustain = new Set(leedDef.features);
  }

  S.sel.negative = new Set(['Maintain verticals','No text or watermarks','No blurry foreground',"Don't crop building",'No distorted faces','No visual clutter']);

  if(S.f==='to_tech'){ S.sel.tech_type='front elevation'; S.sel.tech_style='crisp black lines on white background'; S.sel.role='Convert the provided image into a technical architectural drawing'; }

  // Updated Firm Overrides mapping to the new DNA IDs
  if(S.firm){
    const presets = {
      fluid_param:  { style:['Fluid Parametric'],             ext_mat:['Fiber-reinforced polymer','Seamless Corian','Curved glass'] },
      diagrammatic: { style:['Cross-Programmed Urbanism'],    ext_mat:['Polycarbonate','Corten steel','Exposed steel columns'] },
      engineered:   { style:['Engineered Rationalism'],       ext_mat:['Unitized curtain wall','Polished limestone','Stainless mullions'] },
      monolithic:   { style:['Monolithic Phenomenological'],  ext_mat:['Board-formed concrete','Honed travertine'] },
      particulate:  { style:['Particulate Tectonics'],        ext_mat:['Timber lattice','Ceramic louvers','Ultraclear glass'] },
      topo:         { style:['Topographical Integration'],    ext_mat:['Cedar slats','Green roof (sedum)','Low-iron glass'] },
      folded:       { style:['Folded Tectonics'],             ext_mat:['Corten steel','Board-formed concrete'] },
      pixel:        { style:['Pixelated Density'],            ext_mat:['Colorful glazed panels','Glass bricks','Perforated metal'] },
      pragmatic:    { style:['Pragmatic Utopian'],            ext_mat:['Cedar slats','Low-iron glass','Green roof (sedum)'] },
      craft:        { style:['Material Craftsmanship'],       ext_mat:['Corten steel','Copper shingles','Parametric brick'] },
      dynamic:      { style:['Dynamic Loops'],                ext_mat:['Brushed aluminum','Bronze-tinted glass'] },
      hightech:     { style:['High-Tech Structuralism'],      ext_mat:['Unitized curtain wall','Brushed aluminum','Exposed diagrid'] },
    };
    const p = presets[S.firm];
    if(p){
      if(p.style) S.sel.style = new Set(p.style);
      if(!isI && p.ext_mat) S.sel.ext_mat = new Set(p.ext_mat);
    }
  }
}

// ── CONFLICT ENGINE ──────────────────────────────────────────
function checkConflicts() {
  const w = [];
  const extMat = gs('ext_mat');
  const cli = S.climate;
  const bud = S.budget;
  const wea = S.sel.weather || '';
  
  if (cli === 'hot_dry' && extMat.has('Unitized curtain wall') && !extMat.has('Brise-soleil') && !extMat.has('Kinetic louvers') && !extMat.has('Fritted glass')) {
    w.push({ t: "Thermal Load Conflict", d: "Using unprotected curtain walls in a Hot & Dry climate is a thermal failure. The AI will likely render glaring, blown-out glass. <strong>Fix: Add 'Brise-soleil', 'Fritted glass', or 'Kinetic louvers' to Exterior Materials.</strong>" });
  }
  
  if (bud === 'standard' && (gs('style').has('Fluid Parametric') || gs('style').has('High-Tech Structuralism'))) {
    w.push({ t: "Fabrication Mismatch", d: "Parametric/High-Tech architectures require bespoke CNC fabrication. Prompting this on a 'Standard' budget confuses the AI, often resulting in cheap-looking plastic renders. <strong>Fix: Raise budget to High-End, or switch style to Industrial/Rationalism.</strong>" });
  }

  if ((cli === 'tropical' || cli === 'hot_humid' || cli === 'hot_dry') && (wea.includes('snow') || wea.includes('frost'))) {
    w.push({ t: "Geographic Contradiction", d: "You selected a tropical/arid climate but added snow. Text-to-image models hallucinate heavily when geographic biomes conflict with atmospheric conditions. <strong>Fix: Change climate to Nordic/Cold, or weather to clear/rain.</strong>" });
  }

  if (gs('style').size > 1) {
    w.push({ t: "Prompt Dilution", d: `You selected ${gs('style').size} styles. AI averages out contradictory terms, resulting in generic 'mush' architecture. <strong>Fix: Limit yourself to ONE dominant architectural style.</strong>` });
  }

  return w;
}

// ════════════════════════════════════════════════════════════
// BUILDER
// ════════════════════════════════════════════════════════════
function getSteps(){
  const isI=S.ie==='interior', isC=S.f==='creation', isTT=S.f==='to_tech';
  const st=[];
  st.push({id:'role',  t:'Role',        d:'Who the AI should be.'});
  st.push({id:'medium',t:'Medium & Style',d:'Output type and quality.'});
  if(isTT){
    st.push({id:'tech_output',t:'Drawing Type',d:'What technical drawing to produce.'});
    st.push({id:'negative',   t:'Constraints', d:'What NOT to do.'});
    return st;
  }
  if(S.f!=='inpaint') st.push({id:'style',t:'Arch. Style',d:'Design language and movement.'});
  if(isC)             st.push({id:'camera',t:'Camera',d:'Framing, lens, aspect.'});
  st.push({id:isI?'int_mat':'ext_mat', t:isI?'Interior Materials':'Exterior Materials', d:'Surfaces, finishes, systems.'});
  if(isC&&!isI)  st.push({id:'scale',t:'Building Scale',d:'Stories, footprint, massing.'});
  if(!isI&&S.leed) st.push({id:'sustain',t:'LEED / Sustainable',d:'Green features visible in render.'});
  if(!isI&&S.f!=='inpaint') st.push({id:'site',t:'Site & Landscape',d:'Context, density, vegetation.'});
  if(isI){ st.push({id:'furniture',t:'Furniture',d:'FF&E for scale and life.'}); st.push({id:'int_scale',t:'Spatial Scale',d:'Height, features.'}); }
  if(S.f!=='inpaint') st.push({id:'weather',t:'Weather',d:'Season, time, atmosphere.'});
  st.push({id:'lighting',t:'Lighting',d:'Temperature, sources.'});
  if(S.f!=='inpaint') st.push({id:'entourage',t:'Entourage',d:'People, vehicles, camera FX.'});
  if(isI) st.push({id:'color',t:'Color Mood',d:'Overall palette.'});
  st.push({id:'negative',t:'Constraints',d:'What NOT to do.'});
  return st;
}

function render(){
  const clim = CLIMATES.find(c=>c.id===S.climate);
  const ie   = document.getElementById('xIE');
  const bud  = document.getElementById('xBud');
  const cli  = document.getElementById('xClim');
  const led  = document.getElementById('xLeed');
  const inf  = document.getElementById('xInfo');
  if(ie)  ie.textContent  = S.ie==='interior'?'INT':'EXT';
  if(bud) bud.textContent = (S.budget||'').toUpperCase();
  if(cli) cli.textContent = clim?.t||'';
  if(led) led.textContent = S.leed ? 'LEED '+S.leed.toUpperCase() : '';
  const fo = FIRMS.find(f=>f.id===S.firm);
  if(inf) inf.innerHTML   = `<strong>${S.type||''}</strong>${fo?' · '+fo.n:''}`;

  [ie,bud,cli,led].forEach(el=>{ if(el) el.style.display=el.textContent?'':'none'; });

  const steps=getSteps(), nav=document.getElementById('snav');
  let nh='<div class="snl mono">STEPS</div>';
  steps.forEach((s,i)=>{
    let c=0;
    Object.keys(S.sel).forEach(k=>{
      if(k===s.id||k.startsWith(s.id+'_')){ const v=S.sel[k]; if(v instanceof Set)c+=v.size; else if(v)c++; }
    });
    nh+=`<div class="si ${i===S.step?'act':''}" onclick="goS(${i})"><span class="sn mono">${i+1}</span><span>${s.t}</span><span class="ss mono ${c>0?'sok':'sno'}">${c>0?'✓'+c:'—'}</span></div>`;
  });
  nav.innerHTML=nh;
  renderStep(); renderPrompt();
}

function goS(i){ S.step=i; render(); }
function getG(sid){ return GUIDE[S.type]?.[sid] || GUIDE._default?.[sid] || null; }

function renderStep(){
  const steps=getSteps(), step=steps[S.step], a=document.getElementById('ma');
  let h=`<div style="margin-bottom:6px"><div class="mhs mono">STEP ${S.step+1} OF ${steps.length}</div><div class="mht">${step.t}</div><div class="mhd">${step.d||''}</div></div>`;
  
  // INJECT WARNINGS HERE
  const conflicts = checkConflicts();
  if (conflicts.length > 0) {
    conflicts.forEach(c => {
      h += `<div class="guide gw"><div class="gl mono">⚠️ SYSTEM WARNING</div><div class="gt">${c.t}: ${c.d}</div></div>`;
    });
  }

  const g=getG(step.id);
  if(g&&(g.t||g.r?.length)){
    h+=`<div class="guide gi"><div class="gl mono">💡 Best for ${S.type}</div><div class="gt">${g.t}</div>`;
    if(g.r?.length) h+=`<div class="gr">${g.r.map(r=>`<span class="rt pri ${isROn(r)?'on':''}" onclick="rTog('${step.id}','${esc(r)}')">${isROn(r)?'✓ ':''}${r}</span>`).join('')}</div>`;
    h+=`</div>`;
  }
  if(g?.r2?.length){
    h+=`<div class="guide gs"><div class="gl mono">💬 Also consider</div><div class="gr">${g.r2.map(r=>`<span class="rt sec ${isROn(r)?'on':''}" onclick="rTog('${step.id}','${esc(r)}')">${isROn(r)?'✓ ':''}${r}</span>`).join('')}</div></div>`;
  }

  if(step.id==='sustain'&&S.leed){
    const leedDef=LEED_LEVELS.find(l=>l.id===S.leed);
    if(leedDef?.features){
      const present=leedDef.features.filter(f=>gs('sustain').has(f));
      const missing=leedDef.features.filter(f=>!gs('sustain').has(f));
      if(missing.length===0){
        h+=`<div class="guide gi"><div class="gl mono">✓ LEED ${S.leed.toUpperCase()} features complete (${present.length}/${leedDef.features.length})</div></div>`;
      } else {
        h+=`<div class="guide gw"><div class="gl mono">⚠️ LEED ${S.leed.toUpperCase()} — ${missing.length} feature${missing.length>1?'s':''} missing</div><div class="gt">Add these: <strong>${missing.join(', ')}</strong></div><div class="gr">${missing.map(f=>`<span class="rt pri" onclick="gs('sustain').add('${esc(f)}');render()">+ Add ${f}</span>`).join('')}</div></div>`;
        if(present.length>0) h+=`<div class="guide gi"><div class="gl mono">✓ ${present.length} of ${leedDef.features.length} present</div></div>`;
      }
    }
  }

  const sid=step.id;
  if(sid==='role')           h+=rRole();
  else if(sid==='medium')    h+=rMedium();
  else if(sid==='style')     h+=rStyle();
  else if(sid==='camera')    h+=rCamera();
  else if(sid==='ext_mat'||sid==='int_mat') h+=rDrill(sid,sid==='ext_mat'?getExtD():getIntD());
  else if(sid==='scale')     h+=rScale();
  else if(sid==='sustain')   h+=rDrill('sustain',getSustD());
  else if(sid==='site')      h+=rSite();
  else if(sid==='furniture') h+=rDrill('furniture',getFurnD());
  else if(sid==='int_scale') h+=rIntScale();
  else if(sid==='weather')   h+=rWeather();
  else if(sid==='lighting')  h+=rLight();
  else if(sid==='entourage') h+=rEnt();
  else if(sid==='color')     h+=rColor();
  else if(sid==='negative')  h+=rNeg();
  else if(sid==='tech_output') h+=rTechOut();

  h+=`<div class="navb">`;
  h+=S.step>0?`<button class="nb" onclick="goS(${S.step-1})">← ${steps[S.step-1].t}</button>`:'<div></div>';
  h+=S.step<steps.length-1?`<button class="nb pri" onclick="goS(${S.step+1})">Next: ${steps[S.step+1].t} →</button>`:`<button class="nb pri" onclick="cpFinal()">Copy Prompt</button>`;
  h+=`</div>`;
  a.innerHTML=h; a.scrollTop=0;
  document.querySelector('.db')?.classList.add('open');
}

// ── STEP RENDERERS ───────────────────────────────────────────
function rRole(){
  const tags={
    creation:['Act as an expert architectural visualizer and generate','Produce a production-grade 3D render of'],
    sketch:  ['RENDER the provided sketch, locking geometry','Solidify sketch linework into 3D forms'],
    rigid:   ['Render the provided technical input, locking geometry','Apply photorealistic textures without modifying geometry'],
    inpaint: ['Preserve exact composition, isolate target'],
    to_tech: ['Convert image into technical architectural drawing','Extract geometry into measured line drawing'],
  };
  return '<div class="hier-items">'+(tags[S.f]||[]).map(t=>`<span class="tag ${S.sel.role===t?'on':'dim'}" onclick="S.sel.role='${esc(t)}';render()">${t}</span>`).join('')+'</div>';
}

function rMedium(){
  let h='<div class="hier-l">Category <span class="badge">pick one</span></div>';
  h+=mkSpec('med_cat',[{v:'photorealistic',t:'Photorealistic',d:'Camera quality.'},{v:'linework',t:'Linework',d:'Line drawing.'},{v:'physical_model',t:'Physical Model',d:'Model photo.'},{v:'sketch_style',t:'Sketch',d:'Hand-drawn.'},{v:'painting',t:'Painting',d:'Watercolor, oil.'},{v:'diagram',t:'Diagram',d:'Analytical.'}]);
  const cat=S.sel.med_cat;
  if(cat==='photorealistic'){
    h+='<div class="hier-l">Resolution</div>';
    h+=mkSpec('med',[{v:'2K quick',t:'2K Quick',d:'Draft.'},{v:'4K architectural photography',t:'4K',d:'Client.'},{v:'8K cinematic',t:'8K Hero',d:'Competition.'}]);
    h+='<div class="hier-l">Engine <span class="badge">optional</span></div>';
    h+=mkSpec('med_eng',[{v:'V-Ray',t:'V-Ray',d:'Sharp.'},{v:'Corona',t:'Corona',d:'Soft.'},{v:'UE5',t:'UE5',d:'Cinematic.'},{v:'Lumion',t:'Lumion',d:'Quick.'}]);
  } else if(cat==='linework'){
    h+=mkSpec('med',[{v:'black lines on white',t:'Black/White',d:'Classic.'},{v:'white lines on black',t:'White/Black',d:'Dramatic.'},{v:'colored lines',t:'Colored',d:'Material hints.'},{v:'hidden-line wireframe',t:'Hidden-Line',d:'3D wire.'}]);
    h+='<div class="hier-l">Weight <span class="badge">optional</span></div>';
    h+=mkSpec('med_lw',[{v:'thin hairline',t:'Thin',d:'Technical.'},{v:'medium weight',t:'Medium',d:'Standard.'},{v:'bold contour',t:'Bold',d:'Expressive.'}]);
  } else if(cat==='physical_model'){
    h+=mkSpec('med',[{v:'chipboard + basswood model',t:'Chipboard',d:'School.'},{v:'3D printed resin',t:'3D Print',d:'Precise.'},{v:'CNC topo model',t:'CNC Topo',d:'Landscape.'},{v:'foam core study',t:'Foam Core',d:'Quick.'}]);
  } else if(cat==='sketch_style'){
    h+=mkSpec('med',[{v:'pencil sketch',t:'Pencil',d:'Graphite.'},{v:'charcoal sketch',t:'Charcoal',d:'Dramatic.'},{v:'ink pen sketch',t:'Ink Pen',d:'Sharp.'},{v:'marker rendering',t:'Marker',d:'Bold color.'}]);
    h+='<div class="hier-l">Paper <span class="badge">optional</span></div>';
    h+=mkSpec('med_paper',[{v:'white paper',t:'White',d:''},{v:'toned paper',t:'Toned',d:'Warm.'},{v:'black paper',t:'Black',d:'Highlights.'}]);
  } else if(cat==='painting'){
    h+=mkSpec('med',[{v:'watercolor',t:'Watercolor',d:'Flowing.'},{v:'oil painting',t:'Oil',d:'Rich, heavy.'},{v:'gouache',t:'Gouache',d:'Flat, opaque.'},{v:'matte painting',t:'Matte',d:'Cinematic.'}]);
    const pt=['Loose brushstrokes','Tight detailed','Wet-on-wet','Dry brush','Palette knife','Impressionistic'];
    h+='<div class="hier-l">Technique <span class="badge">optional</span></div><div class="hier-items">'+pt.map(t=>`<span class="tag ${gs('med_tech').has(t)?'on':'dim'}" onclick="tagTog('med_tech','${esc(t)}')">${t}</span>`).join('')+'</div>';
  } else if(cat==='diagram'){
    h+=mkSpec('med',[{v:'white clay render',t:'Clay Render',d:'Material study.'},{v:'massing diagram',t:'Massing',d:'Volume.'},{v:'exploded axonometric',t:'Exploded',d:'Systems.'},{v:'wireframe',t:'Wireframe',d:'Structure.'}]);
  }
  return h;
}

function rTechOut(){
  let h='<div class="hier-l">Drawing Type</div>';
  h+=mkSpec('tech_type',[{v:'front elevation',t:'Elevation',d:'Facade.'},{v:'section',t:'Section',d:'Cut through.'},{v:'floor plan',t:'Plan',d:'Top-down.'},{v:'axonometric',t:'Axon',d:'3D no perspective.'},{v:'exploded axon',t:'Exploded',d:'Layers apart.'},{v:'site plan',t:'Site Plan',d:'Context.'}]);
  h+='<div class="hier-l">Style</div>';
  h+=mkSpec('tech_style',[{v:'crisp black lines on white background',t:'Black/White',d:'Classic.'},{v:'white lines on dark background',t:'White/Dark',d:'Dramatic.'},{v:'colored with materials',t:'Colored',d:'Material hints.'}]);
  h+='<div class="hier-l">Detail <span class="badge">optional</span></div>';
  h+=mkSpec('tech_detail',[{v:'schematic',t:'Schematic',d:'Massing only.'},{v:'design development',t:'DD',d:'Major elements.'},{v:'construction document',t:'CD',d:'Everything.'}]);
  return h;
}

function rStyle(){
  const recs=new Set((getG('style')||{}).r||[]), recs2=new Set((getG('style')||{}).r2||[]);
  let h='';
  const cats=[
    {c:'Monolithic',       t:['Monolithic Phenomenological','Contemporary Brutalism','Haptic Materiality','Atmospheric Depth']},
    {c:'Vibrant',          t:['Pixelated Density','Data-Driven Form','Typological Remix','Green Dip']},
    {c:'High-Tech',        t:['Engineered Rationalism','Industrial Minimalism','Structural Expressionism','High-Tech Structuralism','Biomimetic curvature']},
    {c:'Contextual',       t:['Critical Regionalism','Desert Modernism','Tropical Modernism','Nordic Minimalism','Parametric Vernacular']},
    {c:'Parametric',       t:['Fluid Parametric','Dynamic Loops','Topologically Optimized','Sinuous Curves']},
    {c:'Deconstructivist', t:['Angular Fragmentation','Folded Plate Geometry','Folded Tectonics']},
    {c:'Firm DNA',         t:['Cross-Programmed Urbanism','Pragmatic Utopian','Topographical Integration','Material Craftsmanship']},
  ];
  cats.forEach(ca=>{
    const cnt=cntCat('style',ca.t);
    h+=`<div class="dsec"><div class="dh" onclick="togD(this)"><span class="dht">${ca.c}</span>${cnt?`<span class="dhc mono">✓${cnt}</span>`:''}</div><div class="db${cnt?' open':''}"><div class="dtags">${ca.t.map(t=>{const on=gs('style').has(t),rec=recs.has(t),sec=recs2.has(t);return`<span class="tag ${on?'on':''} ${rec&&!on?'rec':''} ${sec&&!on&&!rec?'sec-t':''} ${!on&&!rec&&!sec?'dim':''}" onclick="stylePick('${esc(t)}')">${t}</span>`;}).join('')}</div></div></div>`;
  });
  return h;
}

function stylePick(val){
  const s=gs('style');
  if(s.has(val)) s.delete(val);
  else { s.clear(); s.add(val); }
  render();
}

function rCamera(){
  let h='<div class="hier-l">Height <span class="badge">required</span></div>';
  h+=mkSpec('cam_h',[{v:"worm's-eye",t:"Worm's Eye",d:'Up.'},{v:'eye-level',t:'Eye Level',d:'Natural.'},{v:'elevated',t:'Elevated',d:'Overview.'},{v:'drone',t:'Drone',d:'High.'},{v:"bird's-eye",t:"Bird's Eye",d:'Above.'}]);
  h+='<div class="hier-l">Distance <span class="badge">required</span></div>';
  h+=mkSpec('cam_d',[{v:'close-up',t:'Detail',d:'Texture.'},{v:'mid-range',t:'Mid-Range',d:'Facade.'},{v:'wide shot',t:'Wide',d:'Context.'}]);
  h+='<div class="hier-l">Lens <span class="badge">optional</span></div>';
  h+=mkSpec('cam_l',[{v:'24mm',t:'24mm',d:'Wide.'},{v:'35mm',t:'35mm',d:'Natural.'},{v:'50mm',t:'50mm',d:'Portrait.'},{v:'85mm',t:'85mm',d:'Compressed.'}]);
  h+='<div class="hier-l">Aspect <span class="badge">optional</span></div>';
  h+=mkSpec('cam_a',[{v:'1:1',t:'1:1',d:'Square.'},{v:'4:3',t:'4:3',d:'Pres.'},{v:'16:9',t:'16:9',d:'Hero.'},{v:'2.35:1',t:'Cine',d:'Pan.'}]);
  return h;
}

function rScale(){
  let h='<div class="hier-l">Stories</div>';
  h+=mkSpec('sc_st',[{v:'1-story',t:'1',d:''},{v:'2-3',t:'2–3',d:''},{v:'4-6',t:'4–6',d:''},{v:'7-12',t:'7–12',d:''},{v:'13-20',t:'13–20',d:''},{v:'20+',t:'20+',d:''}]);
  h+='<div class="hier-l">Footprint</div>';
  h+=mkSpec('sc_fp',[{v:'pavilion',t:'Pavilion',d:''},{v:'mid-block',t:'Mid-Block',d:''},{v:'full block',t:'Full Block',d:''},{v:'campus',t:'Campus',d:''}]);
  h+='<div class="hier-l">Massing <span class="badge">optional</span></div>';
  const mt=['Boolean subtraction','Cantilever','Stepped terracing','Interlocking volumes','Courtyard','Pilotis','Heavy plinth','Chamfered corners'];
  h+='<div class="hier-items">'+mt.map(t=>`<span class="tag ${gs('sc_ms').has(t)?'on':'dim'}" onclick="tagTog('sc_ms','${esc(t)}')">${t}</span>`).join('')+'</div>';
  return h;
}

function rSite(){
  let h='<div class="hier-l">Urban Density</div>';
  h+=mkSpec('si_den',[{v:'rural',t:'Rural',d:'Open.'},{v:'suburban',t:'Suburban',d:'Low-rise.'},{v:'urban',t:'Urban',d:'City.'},{v:'downtown',t:'Downtown',d:'Dense.'}]);
  h+='<div class="hier-l">Topography</div>';
  h+=mkSpec('si_tp',[{v:'flat',t:'Flat',d:''},{v:'slope',t:'Slope',d:''},{v:'hillside',t:'Hillside',d:''},{v:'waterfront',t:'Waterfront',d:''}]);
  const clim=CLIMATES.find(c=>c.id===S.climate);
  const badVeg=clim?.bad||[];
  const selectedBad=[...gs('si_ls')].filter(v=>badVeg.includes(v));
  if(selectedBad.length>0){
    h+=`<div class="guide gw"><div class="gl mono">⚠️ Climate mismatch — ${clim.t} (${clim.d})</div><div class="gt">These plants don't grow naturally in your climate zone: <strong>${selectedBad.join(', ')}</strong>.</div><div class="gr">${selectedBad.map(v=>`<span class="rt pri" onclick="gs('si_ls').delete('${esc(v)}');render()">✕ Remove ${v}</span>`).join('')}</div></div>`;
  }
  h+=`<div class="hier-l">Landscape <span class="badge">climate: ${clim?clim.t:'—'} — defaults pre-filled</span></div>`;
  const lt=['Deciduous trees','Conifers','Ornamental grasses','Wildflower meadow','Tropical palms','Dense tropical planting','Desert xeriscape','Olive trees','Birch grove','Bioswale','Reflecting pool','Fountain','Cobblestone','DG paths','Permeable pavers','Stone paving','Street trees','Allee / Bosque','Amphitheater','Outdoor dining','Cherry blossoms','Bamboo grove','Lavender','Date palms','Agave and cacti','Banana plants','Frangipani','Bougainvillea','Pine forest','Ferns','Moss ground cover','Moss-covered stone','Dense tropical canopy'];
  const climRec=new Set(clim?.veg||[]), climBad=new Set(badVeg);
  h+='<div class="hier-items">'+lt.map(t=>{
    const on=gs('si_ls').has(t), rec=climRec.has(t), bad=climBad.has(t);
    let cls=on?'on':'dim';
    if(rec&&!on) cls='rec';
    if(bad&&!on) cls='dim';
    return`<span class="tag ${cls}" onclick="tagTog('si_ls','${esc(t)}')">${t}</span>`;
  }).join('')+'</div>';
  return h;
}

function rIntScale(){
  let h='<div class="hier-l">Ceiling Height</div>';
  h+=mkSpec('ceil',[{v:'2.4m',t:'2.4m',d:'Cozy.'},{v:'3m',t:'3m',d:'Standard.'},{v:'4m',t:'4m',d:'Gallery.'},{v:'6m',t:'6m',d:'Atrium.'},{v:'9m+',t:'9m+',d:'Grand.'}]);
  h+='<div class="hier-l">Features <span class="badge">optional</span></div>';
  const ft=['Atrium void','Grand staircase','Mezzanine','Skylight','Floor-to-ceiling glass','Courtyard view','Panoramic wall','Clerestory'];
  h+='<div class="hier-items">'+ft.map(t=>`<span class="tag ${gs('sp_ft').has(t)?'on':'dim'}" onclick="tagTog('sp_ft','${esc(t)}')">${t}</span>`).join('')+'</div>';
  return h;
}

function rWeather(){
  const W=[
    {s:'Spring',ts:[{t:'Morning',c:[{v:'spring morning mist + blossoms',n:'Mist',d:'Fresh.'},{v:'spring after rain, wet',n:'After Rain',d:'Reflective.'}]},{t:'Midday',c:[{v:'bright spring midday',n:'Bright',d:'Sharp.'},{v:'overcast spring diffuse',n:'Overcast',d:'Even.'}]},{t:'Golden',c:[{v:'golden spring through blossoms',n:'Golden',d:'Romantic.'}]}]},
    {s:'Summer',ts:[{t:'Morning',c:[{v:'summer morning soft warm',n:'Soft',d:'Gentle.'}]},{t:'Midday',c:[{v:'bright mid-summer harsh sun',n:'Harsh Sun',d:'Contrast.'},{v:'hazy summer afternoon',n:'Hazy',d:'Relaxed.'}]},{t:'Golden',c:[{v:'golden hour long shadows',n:'Golden Hour',d:'Favorite.'}]},{t:'Blue',c:[{v:'blue hour + interior glow',n:'Blue+Glow',d:'Hero.'}]},{t:'Night',c:[{v:'summer night light trails',n:'Night',d:'Dramatic.'}]}]},
    {s:'Autumn',ts:[{t:'Morning',c:[{v:'overcast autumn + foliage',n:'Foliage',d:'Colorful.'},{v:'autumn after rain wet',n:'After Rain',d:'Cinematic.'},{v:'autumn morning fog',n:'Fog',d:'Moody.'}]},{t:'Afternoon',c:[{v:'low autumn sun + leaves',n:'Low Sun',d:'Warm.'}]},{t:'Golden',c:[{v:'deep amber autumn',n:'Amber',d:'Rich.'}]},{t:'Dusk',c:[{v:'autumn dusk purple + glow',n:'Dusk',d:'Elegant.'}]}]},
    {s:'Winter',ts:[{t:'Day',c:[{v:'flat winter frost',n:'Frost',d:'Austere.'},{v:'heavy snowstorm',n:'Snow',d:'Dramatic.'},{v:'light snow gentle',n:'Light Snow',d:'Peaceful.'}]},{t:'Golden',c:[{v:'low winter gold on snow',n:'Gold',d:'Rare.'}]},{t:'Night',c:[{v:'winter night snow + glow',n:'Snow+Glow',d:'Cozy.'}]}]},
  ];
  let h=''; const cur=S.sel.weather;
  W.forEach(s=>{
    const has=s.ts.some(t=>t.c.some(c=>c.v===cur));
    h+=`<div class="dsec"><div class="dh" onclick="togD(this)"><span class="dht">${s.s}</span>${has?'<span class="dhc mono">✓</span>':''}</div><div class="db${has?' open':''}">`;
    s.ts.forEach(t=>{
      h+=`<div class="dsl">${t.t}</div><div class="spg">`;
      t.c.forEach(c=>{ const on=cur===c.v; h+=`<div class="spc ${on?'on':''}" onclick="S.sel.weather=${on?'null':`'${esc(c.v)}'`};render()"><div class="spt">${c.n}</div><div class="spd">${c.d}</div></div>`; });
      h+=`</div>`;
    });
    h+=`</div></div>`;
  });
  return h;
}

function rLight(){
  const isI=S.ie==='interior', recs=new Set((getG('lighting')||{}).r||[]), recs2=new Set((getG('lighting')||{}).r2||[]);
  let h='<div class="hier-l">Temperature <span class="badge">required</span></div>';
  h+=mkSpec('lt_t',[{v:'cool 6500K',t:'6500K',d:'Clinical.'},{v:'neutral 4000K',t:'4000K',d:'Clean.'},{v:'warm 3000K',t:'3000K',d:'Warm.'},{v:'amber 2200K',t:'2200K',d:'Intimate.'}]);
  h+='<div class="hier-l">Sources <span class="badge">optional</span></div>';
  const lt=isI?['Linear cove','Wall washers','Spotlights','Uplighting','Pendant cluster','Floor lamp','Under-cabinet','Skylight','Backlit panels','Chandelier','Track lighting','Toe-kick LED','God rays','Candle']:['Soft sunlight','Harsh sun','Diffuse overcast','Interior glow through glass','Light trails','Facade uplighting','Path lighting','Bollard lights','Neon glow','God rays','Chiaroscuro'];
  h+='<div class="hier-items">'+lt.map(t=>{ const on=gs('lt_s').has(t),rec=recs.has(t),sec=recs2.has(t); return`<span class="tag ${on?'on':''} ${rec&&!on?'rec':''} ${sec&&!on&&!rec?'sec-t':''} ${!on&&!rec&&!sec?'dim':''}" onclick="tagTog('lt_s','${esc(t)}')">${t}</span>`; }).join('')+'</div>';
  return h;
}

function rEnt(){
  const isI=S.ie==='interior';
  let h='<div class="hier-l">Density</div>';
  h+=mkSpec('en_cr',[{v:'empty',t:'Empty',d:'No people.'},{v:'single figure',t:'1',d:'Scale.'},{v:'few (3-5)',t:'Few',d:'Light.'},{v:'moderate',t:'Moderate',d:'Active.'},{v:'crowded',t:'Crowded',d:'Full.'}]);
  h+='<div class="hier-l">People <span class="badge">optional</span></div>';
  const pt=isI?['Reading','Laptop','Students','Whiteboard','Family','Chef','Receptionist','Shoppers','Wheelchair user','Children']:['Commuters','Students','Family','Dog walker','Cyclist','Tourist','Umbrella','Winter coat','Children','Elderly','Wheelchair user','Outdoor diners'];
  h+='<div class="hier-items">'+pt.map(t=>`<span class="tag ${gs('en_who').has(t)?'on':'dim'}" onclick="tagTog('en_who','${esc(t)}')">${t}</span>`).join('')+'</div>';
  h+='<div class="hier-l">Camera FX</div>';
  h+=mkSpec('en_fx',[{v:'sharp',t:'Sharp',d:''},{v:'slight blur',t:'Blur',d:'Classic.'},{v:'heavy blur',t:'Heavy',d:'Flow.'},{v:'ghosting',t:'Ghost',d:'Ethereal.'}]);
  if(!isI){ h+='<div class="hier-l">Vehicles <span class="badge">optional</span></div>'; h+=mkSpec('en_vh',[{v:'none',t:'None',d:''},{v:'bicycle',t:'Min',d:''},{v:'cars',t:'Some',d:''},{v:'traffic',t:'Active',d:''}]); }
  return h;
}

function rColor(){
  const gr=[{l:'Cool',t:['Pale blue-grey','Cool stone + glass','Vivid teal']},{l:'Neutral',t:['Bleached natural','True-color materials','Rich contrast','Deep green + wood']},{l:'Warm',t:['Dusty terracotta','Warm earth tones','Timber + brass','Rich amber','Deep orange + charcoal']},{l:'Mono',t:['All white','Grey + 1 accent','B&W contrast','Dark moody']}];
  let h='';
  gr.forEach(g=>{ h+=`<div class="dsl">${g.l}</div><div class="dtags">${g.t.map(t=>`<span class="tag ${gs('color').has(t)?'on':'dim'}" onclick="tagTog('color','${esc(t)}')">${t}</span>`).join('')}</div>`; });
  return h;
}

function rNeg(){
  if(!S.sel.negative) S.sel.negative=new Set(['Maintain verticals','No text or watermarks','No blurry foreground',"Don't crop building",'No distorted faces','No visual clutter']);
  const tags=['Maintain verticals','No organic curves','No blob architecture',"Don't modify footprint",'No warped perspective','No visual clutter','No blown-out skies','No muddy textures','No text or watermarks','No low-res','No blurry foreground',"Don't crop building",'No generic grass','No heavy traffic','No distorted faces','No flying cars','No concept art','No bloom','No soft focus','No chromatic aberration'];
  return '<div class="hier-items">'+tags.map(t=>`<span class="tag ${S.sel.negative?.has(t)?'on':'dim'}" onclick="tagTog('negative','${esc(t)}')">${t}</span>`).join('')+'</div>';
}

function rDrill(sid,data){
  const recs=new Set((getG(sid)||{}).r||[]), recs2=new Set((getG(sid)||{}).r2||[]);
  let h='';
  data.forEach(sec=>{
    const cnt=cntD(sid,sec);
    h+=`<div class="dsec"><div class="dh" onclick="togD(this)"><span class="dht">${sec.t}</span>${cnt?`<span class="dhc mono">✓${cnt}</span>`:''}</div><div class="db${cnt?' open':''}">`;
    sec.subs.forEach(sub=>{
      h+=`<div class="dsl">${sub.l}</div><div class="dtags">`;
      sub.tags.forEach(t=>{
        const on=gs(sid).has(t),rec=recs.has(t),sec2=recs2.has(t);
        h+=`<span class="tag ${on?'on':''} ${rec&&!on?'rec':''} ${sec2&&!on&&!rec?'sec-t':''} ${!on&&!rec&&!sec2?'dim':''}" onclick="tagTog('${sid}','${esc(t)}')">${t}</span>`;
      });
      h+=`</div>`;
    });
    h+=`</div></div>`;
  });
  return h;
}

function cntD(sid,sec){ let c=0; sec.subs.forEach(s=>s.tags.forEach(t=>{ if(gs(sid).has(t))c++; })); return c; }

function getExtD(){ return [{t:'Concrete & Stone',subs:[{l:'Type',tags:['Board-formed concrete','Pitted brutalist','Smooth precast','Fluted precast','Rammed earth','Bush-hammered limestone','Honed travertine']},{l:'Finish',tags:['Natural grey','White concrete','Dark charcoal','Warm sandstone','Weathered']}]},{t:'Metal',subs:[{l:'Type',tags:['Corten steel (weathered rust)','Standing seam zinc','Brushed aluminum','Perforated stainless mesh','Copper panels (patina)','Insulated metal panels']},{l:'Pattern',tags:['Vertical seam','Horizontal lapped','Perforated screen','Cassette panels']}]},{t:'Wood',subs:[{l:'Type',tags:['Shou Sugi Ban (charred)','Western Red Cedar slats','Vertical battens','Horizontal rainscreen','CNC timber louvers','Timber shingle']},{l:'Tone',tags:['Natural light','Honey warm','Dark stained','Charred black','Weathered grey']}]},{t:'Glass & Curtain Wall',subs:[{l:'System',tags:['Unitized curtain wall','Frameless structural glazing','Double-skin facade','Punched windows','Ribbon windows']},{l:'Glass',tags:['Low-iron ultra-clear','Bird-safe fritted','Reflective bronze-tinted','Light-green tinted','Electrochromic smart','Spandrel (opaque)','Polycarbonate','Channel glass']},{l:'Mullion',tags:['Polished stainless steel','Anodized aluminum','Black powder-coated','Gunmetal','Minimal silicone']}]},{t:'Shading',subs:[{l:'Type',tags:['Terracotta baguettes','Brise-soleil','Fixed louvers','Timber screen','Metal mesh','Kinetic louvers','PTFE membrane']}]},{t:'Roof',subs:[{l:'Type',tags:['Standing seam metal','Green roof (sedum)','ETFE cushion','Steel truss','PV integrated','Flat concrete','Copper (patina)']}]},{t:'Base',subs:[{l:'Type',tags:['Columns + glass','Rusticated stone','Glass at ground','Pilotis','Canopy entry','Arcade','Masonry plinth']}]}]; }
function getIntD(){ return [{t:'Walls',subs:[{l:'Raw',tags:['Board-formed concrete','Exposed brick','Raw plaster','Rammed earth']},{l:'Warm',tags:['Limewash plaster','White oak joinery','Acoustic felt','Cork wall','Acoustic timber slats','Venetian plaster']},{l:'Refined',tags:['Back-painted glass','Writeable glass','Lacquered panel','Fabric acoustic']}]},{t:'Floors',subs:[{l:'Hard',tags:['Polished concrete','Exposed aggregate','Epoxy terrazzo','Honed granite','Marble mosaic','Raised access floor']},{l:'Warm',tags:['White oak plank','Dark walnut','End-grain timber','Cork tile','Bamboo','Herringbone parquet']}]},{t:'Ceilings',subs:[{l:'Exposed',tags:['Exposed MEP plenum','Waffle slab','Painted ductwork']},{l:'Finished',tags:['Acoustic timber slats','Glulam soffit','Perforated baffles','Cloud ceiling','Stretch fabric']}]},{t:'Structure',subs:[{l:'Type',tags:['Exposed steel columns','Steel trusses','CLT panels','Glulam beams','Timber post-beam','Concrete reveals']}]},{t:'Partitions',subs:[{l:'Type',tags:['Full-height glass','Frosted glass','Steel-framed glass','Acoustic curtain','Timber screen','Pivot door','Frameless glass door']}]}]; }
function getSustD(){ return [{t:'Roof',subs:[{l:'Water',tags:['Extensive green roof','Green roof (sedum)','Blue roof','Rainwater cistern']},{l:'Energy',tags:['Rooftop PV array','Solar thermal','Cool roof']},{l:'Ecology',tags:['Pollinator garden','Bird habitat']}]},{t:'Facade',subs:[{l:'Energy',tags:['BIPV','Kinetic shading facade','Passive shading','Double-skin facade','Dynamic louvers']},{l:'Ecology',tags:['Living wall','Vertical planting']}]},{t:'Ground',subs:[{l:'Water',tags:['Bioswale','Permeable pavers','Retention pond','Constructed wetland']},{l:'Energy',tags:['Solar bollards','EV charging stations']},{l:'Ecology',tags:['Native meadow','Pollinator corridor','Food garden']}]}]; }
function getFurnD(){ return [{t:'Seating',subs:[{l:'Lounge',tags:['Lounge chairs','Sofa','Barcelona chairs','Bean bags','Window seat','Banquette']},{l:'Task',tags:['Desk chairs','Bar stools','Collaborative pod','Lecture seats']},{l:'Public',tags:['Reading nook','Museum bench','Waiting chairs']}]},{t:'Tables',subs:[{l:'Work',tags:['Sit-stand desk','Communal table','Standing table','Kitchen island']},{l:'Display',tags:['Reception desk','Bookshelf wall','Display vitrine']}]},{t:'Atmosphere',subs:[{l:'Lighting',tags:['Feature pendant','Chandelier','Pendant cluster','Track lighting','Floor lamp','Exposed filament','Neon sign']},{l:'Plants',tags:['Plant wall','Large planter','Olive tree','Hanging plants','Indoor tropical']},{l:'Features',tags:['Fireplace','Art installation','Water feature','Acoustic rug','Candles']}]},{t:'Equipment',subs:[{l:'Tech',tags:['Wayfinding totem','Projection screen','Whiteboard wall']},{l:'Transit',tags:['Ticket machine','Flight board','Gate seats','Moving walkway','Escalators']}]}]; }

function esc(s){ return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
function mkSpec(id,opts){
  const cur=S.sel[id];
  let h='<div class="spec"><div class="spec-t">';
  opts.forEach(o=>{ const on=cur===o.v; h+=`<div class="spec-o ${on?'on':''}" onclick="S.sel['${id}']=${on?'null':`'${esc(o.v)}'`};render()"><div class="sot">${o.t}</div><div class="sod">${o.d}</div></div>`; });
  h+='</div></div>';
  return h;
}
function tagTog(id,val){ if(!S.sel[id])S.sel[id]=new Set(); S.sel[id].has(val)?S.sel[id].delete(val):S.sel[id].add(val); render(); }
function togD(el){ el.nextElementSibling.classList.toggle('open'); }
function isROn(r){ for(const[k,v]of Object.entries(S.sel)){ if(v instanceof Set&&v.has(r))return true; } return false; }
function rTog(sid,val){ for(const[k,v]of Object.entries(S.sel)){ if(v instanceof Set&&v.has(val)){ v.delete(val); render(); return; } } if(!S.sel[sid])S.sel[sid]=new Set(); S.sel[sid].add(val); render(); }
function cntCat(sid,tags){ let c=0; tags.forEach(t=>{ if(gs(sid).has(t))c++; }); return c; }

function renderPrompt(){
  const steps=getSteps(); let total=0,filled=0;
  Object.keys(S.sel).forEach(k=>{ const v=S.sel[k]; total++; if(v instanceof Set?v.size>0:!!v)filled++; });
  document.getElementById('prp').innerHTML=`${filled} filled<div class="pbar"><div class="pfill" style="width:${Math.min(filled/Math.max(total,1)*100,100)}%"></div></div>`;
  const isI=S.ie==='interior', p=[], curId=steps[S.step]?.id;
  const add=t=>p.push({y:'t',t}), addV=(id,l)=>p.push({y:'v',id,l});

  if(S.f==='to_tech'){ addV('role','Role'); add('. Produce a '); addV('tech_type','Type'); add(' in '); addV('tech_style','Style'); if(gv('tech_detail')){ add(' at '); addV('tech_detail','Detail'); } add(` of ${S.type}. `); addV('negative','Constraints'); add('.'); }
  else if(S.f==='inpaint'){ add('Preserve composition. Isolate [TARGET], replace with '); addV(isI?'int_mat':'ext_mat','Materials'); add('.'); }
  else{
    addV('role','Role'); add(' a '); addV('med','Medium'); if(gv('med_eng')){ add(' ('); addV('med_eng','Engine'); add(')'); }
    add(isI?` of interior of ${S.type}. `:` of ${S.type}. `);
    if(S.f==='creation'&&!isI){ add('Building: '); addV('sc_st','Stories'); add(', '); addV('sc_fp','Footprint'); if(gv('sc_ms')){ add(', '); addV('sc_ms','Massing'); } add('. '); }
    if(S.f!=='rigid'){ add('Style: '); addV('style','Style'); add('. '); }
    if(S.f==='creation'){ add('Camera: '); addV('cam_h','Height'); add(' '); addV('cam_d','Distance'); if(gv('cam_l')){ add(' '); addV('cam_l','Lens'); } if(gv('cam_a')){ add(' '); addV('cam_a','Aspect'); } add('. '); }
    if(S.f==='sketch') add('Lock geometry. ');
    if(S.f==='rigid')  add('Lock geometry exactly. ');
    add('Materials: '); addV(isI?'int_mat':'ext_mat','Materials'); add('. ');
    if(gv('med_tech')){ add('Technique: '); addV('med_tech','Tech'); add('. '); }
    if(isI){ add('Furniture: '); addV('furniture','Furniture'); add('. Height: '); addV('ceil','Ceil'); if(gv('sp_ft')){ add(' + '); addV('sp_ft','Features'); } add('. '); }
    if(!isI){
      if(gv('sustain')){ add('Sustainable: '); addV('sustain','LEED'); add('. '); }
      add('Site: '); addV('si_den','Density'); add(' '); addV('si_tp','Topo'); if(gv('si_ls')){ add(' + '); addV('si_ls','Landscape'); } add('. ');
    }
    add('During '); addV('weather','Weather'); add('. Light: '); addV('lt_t','Temp'); if(gv('lt_s')){ add(' + '); addV('lt_s','Sources'); } add('. ');
    add('People: '); addV('en_cr','Crowd'); if(gv('en_who')){ add(' ('); addV('en_who','Who'); add(')'); } add(' '); addV('en_fx','FX'); if(gv('en_vh')){ add('. Vehicles: '); addV('en_vh','Veh'); } add('. ');
    if(isI&&gv('color')){ add('Color: '); addV('color','Color'); add('. '); }
    add('Constraints: '); addV('negative','Constraints'); add('.');
  }

  let h='';
  p.forEach(x=>{
    if(x.y==='t'){ h+=`<span class="pc">${x.t}</span>`; return; }
    const v=gv(x.id), isCur=x.id===curId;
    if(v) h+=`<span class="pf">${v}</span>`;
    else if(isCur) h+=`<span class="pw">[${x.l}]</span>`;
    else{ const si=steps.findIndex(s=>s.id===x.id); h+=`<span class="pe" onclick="goS(${si>=0?si:0})">[${x.l}]</span>`; }
  });
  document.getElementById('ptx').innerHTML=h;
}

function fallbackCopy(text, cb){
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try{ document.execCommand('copy'); if(cb)cb(); }catch(e){ alert('Copy failed — please copy manually:\n\n'+text); }
  document.body.removeChild(ta);
}

function cpFinal(){
  const isI=S.ie==='interior'; let t=''; const a=id=>gv(id)||'';
  if(S.f==='to_tech'){
    t=`${a('role')}. Produce a ${a('tech_type')} in ${a('tech_style')}${a('tech_detail')?' at '+a('tech_detail'):''} of ${S.type}. ${a('negative')}.`;
  } else if(S.f==='inpaint'){
    t=`Preserve composition. Isolate [TARGET], replace with ${a(isI?'int_mat':'ext_mat')}.`;
  } else {
    t+=a('role')+' a '+a('med'); if(a('med_eng'))t+=' ('+a('med_eng')+')';
    t+=isI?` of interior of ${S.type}. `:` of ${S.type}. `;
    if(S.f==='creation'&&!isI){ t+=`Building: ${a('sc_st')}, ${a('sc_fp')}`; if(a('sc_ms'))t+=', '+a('sc_ms'); t+='. '; }
    if(S.f!=='rigid') t+=`Style: ${a('style')}. `;
    if(S.f==='creation') t+=`Camera: ${a('cam_h')} ${a('cam_d')}${a('cam_l')?' '+a('cam_l'):''}${a('cam_a')?' '+a('cam_a'):''}. `;
    if(S.f==='sketch') t+='Lock geometry. ';
    if(S.f==='rigid') t+='Lock geometry exactly. ';
    t+=`Materials: ${a(isI?'int_mat':'ext_mat')}. `;
    if(a('med_tech')) t+=`Technique: ${a('med_tech')}. `;
    if(isI){ t+=`Furniture: ${a('furniture')}. Height: ${a('ceil')}`; if(a('sp_ft'))t+=' + '+a('sp_ft'); t+='. '; }
    if(!isI){ if(a('sustain'))t+=`Sustainable: ${a('sustain')}. `; t+=`Site: ${a('si_den')} ${a('si_tp')}`; if(a('si_ls'))t+=' + '+a('si_ls'); t+='. '; }
    t+=`During ${a('weather')}. Light: ${a('lt_t')}`; if(a('lt_s'))t+=' + '+a('lt_s'); t+='. ';
    t+=`People: ${a('en_cr')}`; if(a('en_who'))t+=' ('+a('en_who')+')'; t+=' '+a('en_fx'); if(a('en_vh'))t+='. Vehicles: '+a('en_vh'); t+='. ';
    if(isI&&a('color')) t+=`Color: ${a('color')}. `;
    t+=`Constraints: ${a('negative')}.`;
  }
  const clean = t.replace(/\s+/g,' ').trim();
  const btn = document.getElementById('circleCopy');
  function flashCopy(){ if(btn){ const o=btn.innerHTML; btn.innerHTML='✓'; setTimeout(()=>btn.innerHTML=o,1500); } }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(clean).then(flashCopy).catch(()=>fallbackCopy(clean,flashCopy));
  } else { fallbackCopy(clean,flashCopy); }
}

initApp();

function handleBack(){
  const order = ['s_formula','s_entry','s_type','s_matstyle','s_budget','s_ie','s_climate','s_leed','s_firm','bld'];
  const backMap = {
    s_entry:    ()=>show('s_formula'),
    s_type:     ()=>show('s_entry'),
    s_matstyle: ()=>show('s_entry'),
    s_budget:   ()=>goBackFromBudget(),
    s_ie:       ()=>show('s_budget'),
    s_climate:  ()=>show('s_ie'),
    s_leed:     ()=>show('s_climate'),
    s_firm:     ()=>show('s_leed'),
    bld:        ()=>restart(),
  };
  for(const id of order){
    const el = document.getElementById(id);
    if(el && el.style.display === 'flex'){
      if(backMap[id]) backMap[id]();
      return;
    }
  }
}

function updateCircleBack(){
  const backBtn = document.getElementById('circleBack');
  const copyBtn = document.getElementById('circleCopy');
  const formula = document.getElementById('s_formula');
  const builder = document.getElementById('bld');
  const onFirst  = formula && formula.style.display === 'flex';
  const inBuilder = builder && builder.style.display === 'flex';
  if(backBtn) backBtn.style.display = onFirst ? 'none' : 'flex';
  if(copyBtn) copyBtn.style.display = inBuilder ? 'flex' : 'none';
}

const _origShow = show;
show = function(id){ _origShow(id); updateCircleBack(); };

const _origPickFirm = pickFirm;
pickFirm = function(id){ _origPickFirm(id); updateCircleBack(); };
const _origPickF = pickF;
pickF = function(id){ _origPickF(id); updateCircleBack(); };
const _origRestart = restart;
restart = function(){ _origRestart(); updateCircleBack(); };

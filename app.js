// ════════════════════════════════════════════════════════════
// NANO BANANA — Integrated Architectural Prompt Engine  
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

const SECTION_TYPES = [
  { id:'atrium',    t:'Central Atrium',   d:'Full-height void connecting all levels.',     kw:'triple-height atrium, skylit void' },
  { id:'mezzanine', t:'Mezzanine Shift',  d:'Partial floor overlooking a double-height space.', kw:'mezzanine overlook, balcony' },
  { id:'sunken',    t:'Sunken Pit',       d:'Lowered floor area for intimate gathering.',  kw:'sunken seating area, floor level shift' },
  { id:'stepped',   t:'Stepped Plinth',   d:'Terraced interior floor levels.',             kw:'stepped seating, cascading levels' },
  { id:'carved',    t:'Carved Void',      d:'Subtractive spatial logic; monolithic holes.', kw:'subtractive volume, carved niches' },
  { id:'loft',      t:'Open Loft',        d:'High ceilings with exposed structural depth.', kw:'high-clearance industrial loft' },
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
const DEF_FB = { style:['Contemporary'], ext_mat:['Unitized curtain wall','Board-formed concrete'], int_mat:['White oak plank','Polished concrete'], weather:'golden hour', lt_t:'warm 3000K', cam_h:'human eye-level', cam_d:'mid-range building view', en_cr:'few people (3-5)', ceil:'3m standard', section:'Open Loft', furniture:['Lounge chairs'], color:['True-color materials'] };

// ── STATE & SCREEN CONTROL ──────────────────────────────────
const S = { f:null, entryPath:null, type:null, matStyle:null, budget:null, ie:null, climate:null, leed:null, firm:null, step:0, sel:{} };
function gv(id){ const v=S.sel[id]; if(!v)return null; if(v instanceof Set)return v.size>0?[...v].join(', '):null; return v||null; }
function gs(id){ if(!S.sel[id])S.sel[id]=new Set(); return S.sel[id]; }

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

// ── PICKING LOGIC ────────────────────────────────────────────
function pickF(id){
  S.f = id;
  if(id === 'to_tech'){
    S.type    = 'Render'; S.ie = 'exterior'; S.climate = null; S.leed = null; S.firm = null;
    S.sel = {}; S.step = 0; applyAllDefaults(); show('bld'); render();
  } else { show('s_entry'); }
}

function pickEntry(path){
  S.entryPath = path;
  if(path === 'program'){
    document.getElementById('typList').innerHTML = TYPES.map((c,i) =>
      `<div class="typ-cat" id="tc${i}">
        <div class="typ-cat-h" onclick="document.getElementById('tc${i}').classList.toggle('open')">
          <span style="display:flex;align-items:center;gap:8px">
            <span style="width:10px;height:10px;border-radius:2px;background:${c.color};display:inline-block;flex-shrink:0"></span>
            ${c.c}
          </span><span class="arrow">▶</span>
        </div>
        <div class="typ-cat-body">${c.i.map(t=>`<div class="typ-item" onclick="pickType('${t.replace(/'/g,"\\'")}');event.stopPropagation()">${t}</div>`).join('')}</div>
      </div>`
    ).join('');
    show('s_type');
  } else if(path === 'aesthetic'){
    document.getElementById('matStyleGrid').innerHTML = MAT_STYLES.map(m =>
      `<div class="mat-style-c" onclick="pickMatStyle('${m.id}')">
        <div class="mat-style-body"><div class="ms-t">${m.t}</div><div class="ms-d">${m.d}</div><div class="ms-k mono">${m.k}</div></div>
      </div>`
    ).join('');
    show('s_matstyle');
  } else { S.type='Custom'; goToBudget(); }
}

function pickType(t){ S.type=t; goToBudget(); }
function pickMatStyle(id){ S.matStyle=id; S.type=MAT_STYLES.find(m=>m.id===id)?.t||'Custom'; goToBudget(); }
function goToBudget(){ show('s_budget'); renderBudgets(); }
function goBackFromBudget(){ if(S.entryPath==='aesthetic') show('s_matstyle'); else if(S.entryPath==='skip') show('s_entry'); else show('s_type'); }

function renderBudgets(){
  const budgets = [{id:'standard',t:'Standard',d:'Cost-effective.',c:P.lt},{id:'mid',t:'Mid-Range',d:'Quality.',c:P.teal},{id:'high',t:'High-End',d:'Premium.',c:P.navy}];
  document.getElementById('bCards').innerHTML = budgets.map(b => `<div class="card" onclick="pickBudget('${b.id}')"><div class="card-body"><div class="ct">${b.t}</div><div class="cd">${b.d}</div></div></div>`).join('');
}

function pickBudget(id){ S.budget = id; if(S.f==='inpaint'||S.f==='to_tech'){ S.ie='exterior'; goToClimate(); return; } show('s_ie'); renderIE(); }
function renderIE(){
  document.getElementById('ieCards').innerHTML = `<div class="card" onclick="pickIE('exterior')"><div class="card-body"><div class="ct">Exterior</div><div class="cd">Outside view.</div></div></div><div class="card" onclick="pickIE('interior')"><div class="card-body"><div class="ct">Interior</div><div class="cd">Inside view.</div></div></div>`;
}

function pickIE(ie){ S.ie=ie; goToClimate(); }
function goToClimate(){
  document.getElementById('climateGrid').innerHTML = CLIMATES.map(c => `<div class="climate-c" onclick="pickClimate('${c.id}')"><div class="climate-body"><div class="cc-t">${c.t}</div><div class="cc-d">${c.d}</div></div></div>`).join('');
  show('s_climate');
}

function pickClimate(id){
  S.climate = id;
  document.getElementById('leedGrid').innerHTML = LEED_LEVELS.map(l => `<div class="leed-c ${l.id===null?'skip-card':''}" onclick="pickLeed(${l.id ? `'${l.id}'` : null})"><div class="leed-body"><div class="lc-t">${l.t}</div><div class="lc-d">${l.d}</div></div></div>`).join('');
  show('s_leed');
}

function pickLeed(id){
  S.leed = id;
  document.getElementById('firmGrid').innerHTML = FIRMS.map((f,i) => `<div class="firm-c" onclick="pickFirm('${f.id}')"><div class="firm-body"><div class="fn">${f.n}</div><div class="fr">${f.ref}</div><div class="fd">${f.d}</div><div class="fk mono">${f.kw}</div></div></div>`).join('');
  show('s_firm');
}

function pickFirm(id){ S.firm=id; S.sel={}; S.step=0; applyAllDefaults(); show('bld'); render(); }
function resetDef(){ S.sel={}; applyAllDefaults(); render(); }

// ── DEFAULT APPLICATION ──────────────────────────────────────
function applyAllDefaults(){
  const isI = S.ie === 'interior';
  let d = (S.entryPath==='aesthetic' && S.matStyle) ? MAT_STYLES.find(m=>m.id===S.matStyle).defaults : (DEFS[S.type] || DEF_FB);
  const fb = DEF_FB;

  const roles = { creation:'Act as an expert architectural visualizer and generate', sketch:'RENDER the provided sketch, locking geometry', rigid:'Render the provided technical input, locking geometry', inpaint:'Preserve exact composition, isolate target', to_tech:'Convert the provided image into a technical architectural drawing' };
  S.sel.role = roles[S.f];
  S.sel.med_cat = 'photorealistic';
  S.sel.med = '4K architectural photography';
  S.sel.style = new Set(d.style || fb.style);
  S.sel.cam_h = d.cam_h || fb.cam_h;
  S.sel.cam_d = d.cam_d || fb.cam_d;

  if(isI) {
    S.sel.int_mat = new Set(d.int_mat || fb.int_mat);
    S.sel.section = d.section || fb.section;
    S.sel.ceil = d.ceil || fb.ceil;
    S.sel.furniture = new Set(d.furniture || fb.furniture);
    S.sel.color = new Set(d.color || fb.color || []);
  } else {
    S.sel.ext_mat = new Set(d.ext_mat || fb.ext_mat);
  }

  const clim = CLIMATES.find(c=>c.id===S.climate);
  S.sel.weather = clim?.weather || d.weather || fb.weather;
  if(!isI && clim?.veg) S.sel.si_ls = new Set(clim.veg);

  S.sel.lt_t = d.lt_t || fb.lt_t;
  S.sel.en_cr = d.en_cr || fb.en_cr;
  S.sel.en_fx = 'slight motion blur';

  if(S.f==='creation' && !isI){ S.sel.sc_st='4-6 stories'; S.sel.sc_fp='mid-block'; }
  if(!isI){ S.sel.si_den='urban mid-rise'; S.sel.si_tp='flat'; }
  if(S.leed && !isI){ const lDef = LEED_LEVELS.find(l=>l.id===S.leed); if(lDef?.features) S.sel.sustain = new Set(lDef.features); }

  S.sel.negative = new Set(['Maintain verticals','No text or watermarks','No blurry foreground',"Don't crop building",'No distorted faces','No visual clutter']);

  if(S.firm){
    const presets = {
      fluid_param:  { style:['Fluid Parametric'], ext_mat:['Fiber-reinforced polymer','Seamless Corian','Curved glass'] },
      diagrammatic: { style:['Cross-Programmed Urbanism'], ext_mat:['Polycarbonate','Corten steel','Exposed steel columns'] },
      engineered:   { style:['Engineered Rationalism'], ext_mat:['Unitized curtain wall','Polished limestone','Stainless mullions'] },
      monolithic:   { style:['Monolithic Phenomenological'], ext_mat:['Board-formed concrete','Honed travertine'] },
      particulate:  { style:['Particulate Tectonics'], ext_mat:['Timber lattice','Ceramic louvers','Ultraclear glass'] },
      topo:         { style:['Topographical Integration'], ext_mat:['Cedar slats','Green roof (sedum)','Low-iron glass'] },
      folded:       { style:['Folded Tectonics'], ext_mat:['Corten steel','Board-formed concrete'] },
      pixel:        { style:['Pixelated Density'], ext_mat:['Colorful glazed panels','Glass bricks','Perforated metal'] },
      pragmatic:    { style:['Pragmatic Utopian'], ext_mat:['Cedar slats','Low-iron glass','Green roof (sedum)'] },
      craft:        { style:['Material Craftsmanship'], ext_mat:['Corten steel','Copper shingles','Parametric brick'] },
      dynamic:      { style:['Dynamic Loops'], ext_mat:['Brushed aluminum','Bronze-tinted glass'] },
      hightech:     { style:['High-Tech Structuralism'], ext_mat:['Unitized curtain wall','Brushed aluminum','Exposed diagrid'] },
    };
    const p = presets[S.firm];
    if(p){ if(p.style) S.sel.style = new Set(p.style); if(!isI && p.ext_mat) S.sel.ext_mat = new Set(p.ext_mat); }
  }
}

// ── CONFLICT ENGINE ──────────────────────────────────────────
function checkConflicts() {
  const w = []; const extMat = gs('ext_mat'); const cli = S.climate; const bud = S.budget; const wea = S.sel.weather || '';
  if (cli === 'hot_dry' && extMat.has('Unitized curtain wall') && !extMat.has('Brise-soleil') && !extMat.has('Fritted glass')) {
    w.push({ t: "Thermal Load Conflict", d: "Unprotected curtain walls in Hot & Dry climate is a thermal failure. AI will render glared glass." });
  }
  if (bud === 'standard' && (gs('style').has('Fluid Parametric') || gs('style').has('High-Tech Structuralism'))) {
    w.push({ t: "Fabrication Mismatch", d: "Parametric/High-Tech require bespoke CNC. Standard budget confuses AI results." });
  }
  if ((cli === 'tropical' || cli === 'hot_humid') && (wea.includes('snow') || wea.includes('frost'))) {
    w.push({ t: "Geographic Contradiction", d: "Tropical climate with snow triggers AI hallucinations." });
  }
  if (gs('style').size > 1) { w.push({ t: "Prompt Dilution", d: "AI averages contradictory styles. Limit to ONE dominant style." }); }
  return w;
}

// ── BUILDER CORE ─────────────────────────────────────────────
function getSteps(){
  const isI=S.ie==='interior', isC=S.f==='creation', isTT=S.f==='to_tech';
  const st = [{id:'role',t:'Role',d:'AI Persona.'},{id:'medium',t:'Medium & Style',d:'Output quality.'}];
  if(isTT){ st.push({id:'tech_output',t:'Drawing Type',d:'Drawing choice.'},{id:'negative',t:'Constraints',d:'Rules.'}); return st; }
  if(S.f!=='inpaint') st.push({id:'style',t:'Arch. Style',d:'Movement.'});
  if(isI && S.f!=='inpaint') st.push({id:'section', t:'Sectional Logic', d:'Vertical organization.'});
  if(isC) st.push({id:'camera',t:'Camera',d:'Framing.'});
  st.push({id:isI?'int_mat':'ext_mat', t:isI?'Interior Materials':'Exterior Materials', d:'Surfaces.'});
  if(isC&&!isI) st.push({id:'scale',t:'Building Scale',d:'Massing.'});
  if(!isI&&S.leed) st.push({id:'sustain',t:'LEED Features',d:'Sustainability.'});
  if(!isI&&S.f!=='inpaint') st.push({id:'site',t:'Site',d:'Context.'});
  if(isI){ st.push({id:'furniture',t:'Furniture',d:'FF&E.'},{id:'int_scale',t:'Spatial Scale',d:'Volumes.'}); }
  if(S.f!=='inpaint') st.push({id:'weather',t:'Weather',d:'Atmosphere.'});
  st.push({id:'lighting',t:'Lighting',d:'Temperature.'});
  if(S.f!=='inpaint') st.push({id:'entourage',t:'Entourage',d:'Life.'});
  if(isI) st.push({id:'color',t:'Color Mood',d:'Palette.'});
  st.push({id:'negative',t:'Constraints',d:'Rules.'});
  return st;
}

function renderStep(){
  const steps=getSteps(), step=steps[S.step], a=document.getElementById('ma');
  let h=`<div style="margin-bottom:6px"><div class="mhs mono">STEP ${S.step+1} OF ${steps.length}</div><div class="mht">${step.t}</div><div class="mhd">${step.d||''}</div></div>`;
  const g=getG(step.id);
  if(g&&(g.t||g.r?.length)){
    h+=`<div class="guide gi"><div class="gl mono">💡 Best for ${S.type}</div><div class="gt">${g.t}</div>`;
    if(g.r?.length) h+=`<div class="gr">${g.r.map(r=>`<span class="rt pri ${isROn(r)?'on':''}" onclick="rTog('${step.id}','${esc(r)}')">${isROn(r)?'✓ ':''}${r}</span>`).join('')}</div>`;
    h+=`</div>`;
  }
  if(g?.r2?.length){
    h+=`<div class="guide gs"><div class="gl mono">💬 Also consider</div><div class="gr">${g.r2.map(r=>`<span class="rt sec ${isROn(r)?'on':''}" onclick="rTog('${step.id}','${esc(r)}')">${isROn(r)?'✓ ':''}${r}</span>`).join('')}</div></div>`;
  }

// LEED tracking (Point/Count-Based Level Up)
      if(step.id==='sustain'&&S.leed){
        const currIdx = LEED_LEVELS.findIndex(l=>l.id===S.leed);
        const leedDef = LEED_LEVELS[currIdx];
        const selected = gs('sustain');
        const selCount = selected.size;

        if(leedDef?.features){
          const missing = leedDef.features.filter(f=>!selected.has(f));
          
          if(missing.length > 0){
            // Warning: Missing core features for current target
            h+=`<div class="guide gw"><div class="gl mono">⚠️ LEED ${leedDef.t.toUpperCase()} — Core feature missing</div><div class="gt">Add back to maintain target: <strong>${missing.join(', ')}</strong></div><div class="gr">${missing.map(f=>`<span class="rt pri" onclick="gs('sustain').add('${esc(f)}');render()">+ Add ${f}</span>`).join('')}</div></div>`;
          } else {
            // Target met. Check total volume for upgrade
            let suggestedLevel = leedDef;
            let nextLevelHint = '';

            // Define thresholds
            if (selCount >= 12 && currIdx < 4) suggestedLevel = LEED_LEVELS.find(l=>l.id==='platinum');
            else if (selCount >= 8 && currIdx < 3) suggestedLevel = LEED_LEVELS.find(l=>l.id==='gold');
            else if (selCount >= 5 && currIdx < 2) suggestedLevel = LEED_LEVELS.find(l=>l.id==='silver');

            if(suggestedLevel.id !== leedDef.id){
              // Upgrade available based on total tag count
              h+=`<div class="guide gi" style="background:var(--leedd);border-color:var(--leedb)"><div class="gl mono" style="color:var(--leed)">🌱 UPGRADE AVAILABLE</div><div class="gt">With ${selCount} sustainable features, you qualify for <strong>LEED ${suggestedLevel.t.toUpperCase()}</strong>.</div><div class="gr"><span class="rt pri" onclick="S.leed='${suggestedLevel.id}';render()">Upgrade Target to ${suggestedLevel.t}</span></div></div>`;
            } else {
              // Calculate how many more tags needed for the next tier
              const nextLevel = LEED_LEVELS[currIdx + 1];
              if (nextLevel) {
                const threshold = currIdx === 1 ? 5 : (currIdx === 2 ? 8 : 12);
                const needed = threshold - selCount;
                if (needed <= 2 && needed > 0) {
                  nextLevelHint = `Add <strong>${needed}</strong> more sustainable feature${needed>1?'s':''} to reach ${nextLevel.t}.`;
                }
              }
              h+=`<div class="guide gi"><div class="gl mono">✓ LEED ${leedDef.t.toUpperCase()} features complete</div>${nextLevelHint?`<div class="gt" style="margin-top:4px">${nextLevelHint}</div>`:''}</div>`;
            }
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
function rRole(){ const tags={creation:['Act as an expert architectural visualizer and generate','Produce a production-grade 3D render of'],to_tech:['Convert image into technical architectural drawing']}; return '<div class="hier-items">'+(tags[S.f]||['Architectural Rendering']).map(t=>`<span class="tag ${S.sel.role===t?'on':'dim'}" onclick="S.sel.role='${esc(t)}';render()">${t}</span>`).join('')+'</div>'; }
function rMedium(){ let h='<div class="hier-l">Category</div>'; h+=mkSpec('med_cat',[{v:'photorealistic',t:'Photo',d:''},{v:'linework',t:'Linework',d:''}]); return h; }
function rSection(){ let h='<div class="hier-l">Volumetric Archetype</div>'; h+=mkSpec('section',SECTION_TYPES.map(s=>({v:s.t,t:s.t,d:s.d}))); h+='<div class="hier-l">Features</div>'; const ft=['Atrium void','Sky-bridge','Light-well']; h+='<div class="hier-items">'+ft.map(t=>`<span class="tag ${gs('sp_ft').has(t)?'on':'dim'}" onclick="tagTog('sp_ft','${esc(t)}')">${t}</span>`).join('')+'</div>'; return h; }
function rStyle(){ const cats=[{c:'Monolithic',t:['Monolithic Phenomenological','Contemporary Brutalism']},{c:'High-Tech',t:['Engineered Rationalism','High-Tech Structuralism']},{c:'DNA',t:['Cross-Programmed Urbanism','Pragmatic Utopian']}]; let h=''; cats.forEach(ca=>h+=`<div class="dsl">${ca.c}</div><div class="dtags">${ca.t.map(t=>`<span class="tag ${gs('style').has(t)?'on':'dim'}" onclick="stylePick('${esc(t)}')">${t}</span>`).join('')}</div>`); return h; }
function stylePick(v){ const s=gs('style'); if(s.has(v)) s.delete(v); else { s.clear(); s.add(v); } render(); }
function rCamera(){ let h='<div class="hier-l">Height</div>'; h+=mkSpec('cam_h',[{v:'eye-level',t:'Eye Level',d:''},{v:'drone',t:'Drone',d:''}]); return h; }
function rDrill(sid,data){ let h=''; data.forEach(sec=>{ h+=`<div class="dsec"><div class="dh" onclick="togD(this)">${sec.t}</div><div class="db">`; sec.subs.forEach(sub=>h+=`<div class="dtags">${sub.tags.map(t=>`<span class="tag ${gs(sid).has(t)?'on':'dim'}" onclick="tagTog('${sid}','${esc(t)}')">${t}</span>`).join('')}</div>`); h+=`</div></div>`; }); return h; }
function rScale(){ return mkSpec('sc_st',[{v:'1-story',t:'1',d:''},{v:'4-6',t:'Mid',d:''},{v:'20+',t:'High',d:''}]); }
function rSite(){ const lt=['Deciduous trees','Bioswale','Stone paving']; return '<div class="hier-items">'+lt.map(t=>`<span class="tag ${gs('si_ls').has(t)?'on':'dim'}" onclick="tagTog('si_ls','${esc(t)}')">${t}</span>`).join('')+'</div>'; }
function rIntScale(){ return mkSpec('ceil',[{v:'3m',t:'3m',d:''},{v:'6m',t:'6m',d:''},{v:'9m+',t:'9m+',d:''}]); }
function rWeather(){ return mkSpec('weather',[{v:'golden hour long shadows',t:'Golden Hour',d:''},{v:'overcast soft diffuse',t:'Overcast',d:''}]); }
function rLight(){ return mkSpec('lt_t',[{v:'neutral 4000K',t:'4000K',d:''},{v:'warm 3000K',t:'3000K',d:''}]); }
function rEnt(){ return mkSpec('en_cr',[{v:'single figure',t:'1',d:''},{v:'few (3-5)',t:'Few',d:''}]); }
function rColor(){ return '<div class="dtags">'+['True-color materials','Warm earth tones','Cool stone + glass'].map(t=>`<span class="tag ${gs('color').has(t)?'on':'dim'}" onclick="tagTog('color','${esc(t)}')">${t}</span>`).join('')+'</div>'; }
function rNeg(){ return '<div class="hier-items">'+['Maintain verticals','No visual clutter','No low-res'].map(t=>`<span class="tag ${gs('negative').has(t)?'on':'dim'}" onclick="tagTog('negative','${esc(t)}')">${t}</span>`).join('')+'</div>'; }
function rTechOut(){ return mkSpec('tech_type',[{v:'front elevation',t:'Elevation',d:''},{v:'section',t:'Section',d:''}]); }

// ── PROMPT GENERATION ────────────────────────────────────────
function renderPrompt(){
  const isI=S.ie==='interior', a=id=>gv(id)||`[${id}]`;
  let t=`${a('role')} a ${a('med')} of ${isI?'interior of ':''}${S.type}. Style: ${a('style')}. `;
  if(isI) t+=`Sectional Logic: ${a('section')}. Height: ${a('ceil')}. Features: ${gv('sp_ft')||''}. `;
  t+=`Materials: ${a(isI?'int_mat':'ext_mat')}. Weather: ${a('weather')}. Light: ${a('lt_t')}. Negative: ${a('negative')}.`;
  document.getElementById('ptx').innerHTML=t;
}

function cpFinal(){
  const isI=S.ie==='interior', a=id=>gv(id)||'';
  let t=`${a('role')} a ${a('med')} of ${isI?'interior of ':''}${S.type}. Style: ${a('style')}. `;
  if(isI) t+=`Sectional Logic: ${a('section')}. Height: ${a('ceil')}. Features: ${gv('sp_ft')||''}. `;
  t+=`Materials: ${a(isI?'int_mat':'ext_mat')}. Weather: ${a('weather')}. Light: ${a('lt_t')}. Negative: ${a('negative')}.`;
  navigator.clipboard.writeText(t.replace(/\s+/g,' ').trim()).then(()=>alert("Prompt Copied!"));
}

// ── UTILS ────────────────────────────────────────────────────
function esc(s){ return s.replace(/'/g,"\\'"); }
function mkSpec(id,opts){ let h='<div class="spec-t" style="display:flex;gap:5px">'; opts.forEach(o=>h+=`<div class="spec-o ${S.sel[id]===o.v?'on':''}" style="flex:1;border:1px solid #bd;padding:5px;cursor:pointer" onclick="S.sel['${id}']='${esc(o.v)}';render()">${o.t}</div>`); return h+'</div>'; }
function tagTog(id,v){ const s=gs(id); s.has(v)?s.delete(v):s.add(v); render(); }
function togD(el){ el.nextElementSibling.style.display=(el.nextElementSibling.style.display==='block'?'none':'block'); }
function isROn(r){ for(const v of Object.values(S.sel)) if(v instanceof Set && v.has(r)) return true; return false; }
function rTog(sid,v){ if(isROn(v)) { for(const s of Object.values(S.sel)) if(s instanceof Set) s.delete(v); } else gs(sid).add(v); render(); }
function cntCat(sid,tags){ let c=0; tags.forEach(t=>{ if(gs(sid).has(t))c++; }); return c; }

// ── MATERIAL DATA ────────────────────────────────────────────
function getExtD(){ return [{t:'Mass',subs:[{tags:['Board-formed concrete','Honed travertine','Corten steel']}]},{t:'Skin',subs:[{tags:['Unitized curtain wall','Fritted glass','Ceramic louvers']}]},{t:'Sustainable',subs:[{tags:['BIPV','Kinetic shading facade','Green roof (sedum)']}]}]; }
function getIntD(){ return [{t:'Surfaces',subs:[{tags:['Polished concrete','White oak plank','Venetian plaster']}]},{t:'Systems',subs:[{tags:['Exposed MEP plenum','Glulam beams','Stretch fabric ceiling']}]}]; }
function getSustD(){ return [{t:'Logic',subs:[{tags:['BIPV','Double-skin facade','Native meadow']}]}]; }
function getFurnD(){ return [{t:'FF&E',subs:[{tags:['Lounge chairs','Reception desk','Bookshelf wall']}]}]; }

initApp();

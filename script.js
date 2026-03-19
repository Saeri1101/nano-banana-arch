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
    defaults:{ style:['Stoic Monolithic Form'], ext_mat:['Board-formed concrete','Honed travertine','Bush-hammered limestone'], int_mat:['Polished concrete','Honed granite','Board-formed concrete wall','Epoxy terrazzo'], lt_t:'neutral 4000K', weather:'overcast with soft diffuse light', color:['True-color materials'] }},
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
  { id:null,        t:'No LEED',  d:'Skip' },
  { id:'certified', t:'Certified',d:'40–49 pts', color: P.pale,  features:['Green roof (sedum)','Bioswale','Permeable pavers'] },
  { id:'silver',    t:'Silver',   d:'50–59 pts', color: P.lt,    features:['Green roof (sedum)','Bioswale','Permeable pavers','Solar bollard lights','Native meadow'] },
  { id:'gold',      t:'Gold',     d:'60–79 pts', color: P.green, features:['Green roof (sedum)','Bioswale','Permeable pavers','Rooftop PV array','Native meadow','EV charging stations','Living wall','Rainwater cistern'] },
  { id:'platinum',  t:'Platinum', d:'80+ pts',   color: P.navy,  features:['Green roof (sedum)','Bioswale','Permeable pavers','Rooftop PV array','BIPV','Native meadow','EV charging stations','Living wall','Rainwater cistern','Pollinator corridor','Constructed wetland','Cool roof'] },
];

// Firm preset colors cycle through palette
const FIRM_COLORS = [P.navy, P.teal, P.green, P.lt, P.pale, P.navy, P.teal, P.green, P.lt, P.pale, P.navy, P.teal];
const FIRMS = [
  { id:'fluid_param', n:'Fluid Parametric',        ref:'Zaha Hadid Architects', d:'Seamless transitions. Everything flows.',    kw:'sinuous curves, shell structures' },
  { id:'pragmatic',   n:'Pragmatic Utopian',        ref:'BIG (Bjarke Ingels)',   d:'Super-forms. Green terraces.',              kw:'stacked volumes, cascading terraces' },
  { id:'hightech',    n:'High-Tech Structuralism',  ref:'Foster + Partners',     d:'Beauty in the skeleton.',                   kw:'diagrid, precision steel' },
  { id:'hyper_brut',  n:'Hyper-Contextual',         ref:'OMA / Koolhaas',        d:'Massive cantilevers. Raw.',                 kw:'cantilevered concrete, polycarbonate' },
  { id:'pixel',       n:'Pixelated Density',        ref:'MVRDV',                 d:'Colorful data points.',                     kw:'pixelated facade, glass bricks' },
  { id:'corporate',   n:'Corporate Rationalism',    ref:'SOM / HOK',             d:'Gold standard high-rise.',                  kw:'sleek curtain wall, limestone' },
  { id:'monolithic',  n:'Monolithic Phenom.',       ref:'Zumthor / Ando',        d:'Silence. Material truth.',                  kw:'board-formed concrete, chiaroscuro' },
  { id:'topo',        n:'Topographical',            ref:'Snøhetta / Kuma',       d:'Building = landscape.',                     kw:'timber lattice, green roof' },
  { id:'craft',       n:'Material Craft',           ref:'SHoP Architects',       d:'Digital fab, textured skins.',              kw:'Corten, parametric copper' },
  { id:'playful',     n:'Playful Spectacle',        ref:'Heatherwick Studio',    d:'Dramatic one-off gestures.',                kw:'botanical, living facades' },
  { id:'folded',      n:'Folded Tectonics',         ref:'Morphosis / FOA',       d:'Angular geological fracture.',              kw:'folded plate, scored concrete' },
  { id:'dynamic',     n:'Dynamic Loops',            ref:'UNStudio',              d:'Twists, continuous surfaces.',              kw:'Moebius, metallic, rhythmic' },
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
  'Museum':{ style:['Stoic Monolithic Form'], ext_mat:['Board-formed concrete','Honed travertine','Copper panels (patina)'], int_mat:['Polished concrete','Honed granite','Cloud ceiling'], weather:'overcast with soft diffuse light', lt_t:'neutral 4000K', en_cr:'few people (3-5)', ceil:'6m double-height', furniture:['Museum bench','Display vitrine','Track lighting'], color:['True-color materials'] },
  'Office Tower':{ style:['Corporate Rationalism'], ext_mat:['Unitized curtain wall','Polished limestone base'], int_mat:['Raised access floor','CLT panels','Acoustic timber slats'], weather:'bright mid-summer harsh sun', lt_t:'neutral 4000K', en_cr:'moderate groups', ceil:'3m standard', furniture:['Sit-stand desk','Desk chairs','Whiteboard wall'], color:['True-color materials'] },
  'Bar / Nightclub':{ style:['Industrial Minimalism'], int_mat:['Exposed brick','Back-painted glass','End-grain timber'], weather:'summer night with light trails', lt_t:'amber 2200K', en_cr:'busy crowd', ceil:'4m generous', furniture:['Bar stools','Banquette','Neon sign'], color:['Dark moody'] },
  'Single-Family House':{ style:['Critical Regionalism'], ext_mat:['Brick masonry','Cedar slats','Standing seam metal roof'], int_mat:['White oak plank','Limewash plaster'], weather:'golden hour with long shadows', lt_t:'warm 3000K', en_cr:'single figure', ceil:'3m standard', furniture:['Mid-century sofa','Fireplace','Floor lamp'], color:['Warm earth tones'] },
  'Airport Terminal':{ style:['Structural Expressionism'], ext_mat:['ETFE cushion canopy','Unitized curtain wall','Fritted glass'], int_mat:['Epoxy terrazzo','Glulam soffit','Stretch fabric ceiling'], weather:'bright summer day',

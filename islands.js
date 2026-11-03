/* GT Auto Towing — inter-island detection.
   Pure functions: reads place names, works out which island group each is on,
   and lists the sea crossings between legs. No screen, no storage.

   Island groups are land areas you can drive across. Islands joined by bridges are one group
   (Samar, Leyte and Biliran are joined by the San Juanico and Biliran bridges). */
(function (root) {
  'use strict';

  const GROUPS = ['Luzon', 'Samar–Leyte', 'Masbate', 'Catanduanes', 'Mindoro', 'Marinduque', 'Romblon', 'Panay', 'Guimaras',
    'Negros', 'Cebu', 'Bohol', 'Siquijor', 'Mindanao', 'Palawan', 'Camiguin', 'Dinagat', 'Basilan', 'Sulu', 'Tawi-Tawi', 'Batanes'];

  /* Provinces and well-known cities/towns. Names shared by places on different islands
     (e.g. Naga, Pilar, San Isidro, San Andres, San Jose) are left out on purpose:
     type the province too, e.g. "Naga, Camarines Sur". */
  const PLACES = {
    'Luzon': ['Abra', 'Albay', 'Apayao', 'Aurora', 'Bataan', 'Batangas', 'Benguet', 'Bulacan', 'Cagayan', 'Camarines Norte', 'Camarines Sur',
      'Cavite', 'Ifugao', 'Ilocos Norte', 'Ilocos Sur', 'Isabela', 'Kalinga', 'La Union', 'Laguna', 'Metro Manila', 'Manila', 'NCR',
      'Mountain Province', 'Nueva Ecija', 'Nueva Vizcaya', 'Pampanga', 'Pangasinan', 'Quezon', 'Quezon City', 'Quirino', 'Rizal', 'Sorsogon',
      'Tarlac', 'Zambales', 'Makati', 'Pasig', 'Taguig', 'Caloocan', 'Baguio', 'Lucena', 'Tuguegarao', 'Angeles', 'Olongapo',
      'Daraga', 'Legazpi', 'Legaspi', 'Tabaco', 'Ligao', 'Guinobatan', 'Camalig', 'Polangui', 'Oas', 'Tiwi', 'Malilipot', 'Malinao', 'Bacacay',
      'Iriga', 'Pili', 'Goa', 'Tigaon', 'Libmanan', 'Sipocot', 'Ragay', 'Daet', 'Labo', 'Matnog', 'Bulan', 'Irosin', 'Gubat', 'Donsol', 'Castilla'],
    'Samar–Leyte': ['Northern Samar', 'Eastern Samar', 'Western Samar', 'Samar', 'Leyte', 'Southern Leyte', 'Biliran', 'Allen', 'Catarman',
      'Calbayog', 'Catbalogan', 'Borongan', 'Guiuan', 'Tacloban', 'Ormoc', 'Palo', 'Baybay', 'Maasin', 'Naval'],
    'Masbate': ['Masbate', 'Masbate City'],
    'Catanduanes': ['Catanduanes', 'Virac'],
    'Mindoro': ['Occidental Mindoro', 'Oriental Mindoro', 'Mindoro', 'Calapan'],
    'Marinduque': ['Marinduque', 'Boac'],
    'Romblon': ['Romblon'],
    'Panay': ['Aklan', 'Antique', 'Capiz', 'Iloilo', 'Iloilo City', 'Kalibo', 'Roxas City', 'Caticlan'],
    'Guimaras': ['Guimaras'],
    'Negros': ['Negros Occidental', 'Negros Oriental', 'Negros', 'Bacolod', 'Dumaguete'],
    'Cebu': ['Cebu', 'Cebu City', 'Mandaue', 'Lapu-Lapu', 'Mactan', 'Talisay City'],
    'Bohol': ['Bohol', 'Tagbilaran'],
    'Siquijor': ['Siquijor'],
    'Mindanao': ['Agusan del Norte', 'Agusan del Sur', 'Bukidnon', 'Cotabato', 'North Cotabato', 'South Cotabato', 'Davao', 'Davao City',
      'Davao de Oro', 'Davao del Norte', 'Davao del Sur', 'Davao Occidental', 'Davao Oriental', 'Lanao del Norte', 'Lanao del Sur',
      'Maguindanao', 'Misamis Occidental', 'Misamis Oriental', 'Sarangani', 'Sultan Kudarat', 'Surigao del Norte', 'Surigao del Sur',
      'Zamboanga del Norte', 'Zamboanga del Sur', 'Zamboanga Sibugay', 'Zamboanga', 'Butuan', 'Cagayan de Oro', 'General Santos',
      'Iligan', 'Surigao City', 'Pagadian', 'Dipolog', 'Koronadal', 'Mati'],
    'Palawan': ['Palawan', 'Puerto Princesa'],
    'Camiguin': ['Camiguin'],
    'Dinagat': ['Dinagat Islands', 'Dinagat'],
    'Basilan': ['Basilan'],
    'Sulu': ['Sulu', 'Jolo'],
    'Tawi-Tawi': ['Tawi-Tawi'],
    'Batanes': ['Batanes']
  };

  /* Longest names first, so "Cagayan de Oro" (Mindanao) wins over "Cagayan" (Luzon). */
  const INDEX = Object.entries(PLACES).flatMap(([g, names]) => names.map(nm => ({ g, nm, re: new RegExp('(^|[^a-z])' + nm.toLowerCase().replace(/[.*+?^${}()|[\]\\-]/g, '\\$&') + '($|[^a-z])') })))
    .sort((a, b) => b.nm.length - a.nm.length);

  /* Island group for a typed place, or null if it can't tell. */
  function islandOf(text) {
    const t = String(text || '').toLowerCase().trim();
    if (!t) return null;
    for (const p of INDEX) if (p.re.test(t)) return p.g;
    return null;
  }

  const pairKey = (a, b) => [a, b].sort().join(' ↔ ');

  /* Ferry routes that serve a pair of island groups (either direction). */
  function routesFor(a, b, routes) {
    return (routes || []).filter(r => r && r.name && ((r.a === a && r.b === b) || (r.a === b && r.b === a)));
  }

  /* points: [{label, text}] in driving order (home base, pickup, drop-offs, home base).
     picks:  {pairKey: routeName} to choose between routes serving the same pair.
     Returns the crossings, plus what it couldn't work out. */
  function planCrossings(points, routes, picks) {
    const pts = (points || []).map(p => ({ ...p, island: islandOf(p.text) }));
    const unknown = pts.filter(p => String(p.text || '').trim() && !p.island).map(p => p.label);
    const blank = pts.filter(p => !String(p.text || '').trim()).map(p => p.label);
    const crossings = [], missing = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if (!a.island || !b.island || a.island === b.island) continue;
      const key = pairKey(a.island, b.island), options = routesFor(a.island, b.island, routes);
      const route = options.find(r => r.name === (picks || {})[key]) || options[0] || null;
      if (!route) missing.push(key);
      crossings.push({ leg: `${a.label} → ${b.label}`, from: a.island, to: b.island, key, route, options: options.map(r => r.name) });
    }
    return { points: pts, crossings, missing: [...new Set(missing)], unknown, blank, inter: crossings.length > 0 };
  }

  const api = { GROUPS, PLACES, islandOf, routesFor, planCrossings, pairKey };
  root.GTIslands = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof self !== 'undefined' ? self : this);

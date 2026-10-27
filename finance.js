/* GT Auto Towing — finance engine.
   Pure functions only: no screen, no storage. index.html calls these; tests run them in Node.
   All money is in pesos (₱). Nothing here is rounded; rounding happens only when shown. */
(function (root) {
  'use strict';

  const n = v => { v = +v; return isFinite(v) ? v : 0; };
  const pos = v => Math.max(0, n(v));

  /* Crew shifts for a job: hours ÷ shift length, rounded up, at least 1.
     An explicit override (whole number ≥ 1) wins. */
  function crewShifts(hours, shiftHours, override) {
    const o = Math.floor(n(override));
    if (o >= 1) return o;
    const sh = n(shiftHours) > 0 ? n(shiftHours) : 8;
    return Math.max(1, Math.ceil(pos(hours) / sh - 1e-9));
  }

  /* Estimated operating cost of one job.
     kmDriven  every km the truck drives (to pickup + towed + return), whether or not the customer pays for it
     crew      [{role, basic, meal}] per shift. Meals live here, so no separate meal line is needed.
     lines     [{name, amt, basis:'trip'|'km', kind:'cash'|'alloc'}]
               cash  = money paid out on the trip
               alloc = set aside for maintenance, tyres, depreciation; not paid on the day */
  function estimateCost(p) {
    const km = pos(p.kmDriven), kmpl = n(p.kmpl), diesel = pos(p.diesel), tolls = pos(p.tolls);
    const problems = [];
    if (km > 0 && !(kmpl > 0)) problems.push('Fuel economy must be more than 0 km per litre');
    const litres = kmpl > 0 ? km / kmpl : 0;
    const shifts = crewShifts(p.hours, p.shiftHours, p.shifts);
    const items = [];
    items.push({ key: 'fuel', name: 'Diesel', kind: 'cash', amount: litres * diesel, detail: { km, kmpl, litres, diesel } });
    items.push({ key: 'tolls', name: 'Tolls & parking', kind: 'cash', amount: tolls });
    for (const c of (p.crew || [])) {
      if (!c || !String(c.role || '').trim()) continue;
      const perShift = pos(c.basic) + pos(c.meal);
      items.push({ key: 'crew:' + c.role, name: c.role, kind: 'cash', amount: perShift * shifts, detail: { basic: pos(c.basic), meal: pos(c.meal), perShift, shifts } });
    }
    for (const l of (p.lines || [])) {
      if (!l || !String(l.name || '').trim()) continue;
      const basis = l.basis === 'km' ? 'km' : 'trip';
      const kind = l.kind === 'alloc' ? 'alloc' : 'cash';
      const amount = basis === 'km' ? pos(l.amt) * km : pos(l.amt);
      items.push({ key: 'line:' + l.name, name: l.name, kind, amount, detail: { rate: pos(l.amt), basis } });
    }
    /* Cost factors switched off by the owner stay listed (so they can be switched back on) but count for nothing. */
    const off = p.off || {};
    for (const i of items) i.off = !!off[i.key];
    const on = items.filter(i => !i.off);
    const cash = on.filter(i => i.kind === 'cash').reduce((a, i) => a + i.amount, 0);
    const alloc = on.filter(i => i.kind === 'alloc').reduce((a, i) => a + i.amount, 0);
    return { items, kmDriven: km, litres, shifts, cash, alloc, total: cash + alloc, problems };
  }

  /* Price the customer pays, without VAT. VAT is collected for the government, not revenue. */
  function netRevenue(price, vatOn, vatPct) {
    const p = pos(price);
    return vatOn ? p / (1 + pos(vatPct) / 100) : p;
  }

  /* Price targets from cost.
     Markup: price = cost × (1 + markup)      → markup is profit as a % of COST
     Margin: price = cost ÷ (1 − margin)      → margin is profit as a % of PRICE
     25% markup and 20% margin give the same price. */
  function priceTargets(cost, markupPct, marginPct) {
    const c = pos(cost), mu = n(markupPct), mg = n(marginPct);
    const out = { breakEven: c, markupPrice: null, marginPrice: null, markupError: '', marginError: '' };
    if (mu < 0) out.markupError = 'Markup cannot be negative';
    else out.markupPrice = c * (1 + mu / 100);
    if (mg < 0) out.marginError = 'Margin cannot be negative';
    else if (mg >= 100) out.marginError = 'Margin must be below 100%';
    else out.marginPrice = c / (1 - mg / 100);
    return out;
  }

  /* Profit of a price against a cost. Percentages are null when they cannot be worked out. */
  function evaluate(revenue, cost, km) {
    const r = pos(revenue), c = pos(cost), k = pos(km);
    const profit = r - c;
    return {
      revenue: r, cost: c, profit,
      marginPct: r > 0 ? profit / r * 100 : null,
      markupPct: c > 0 ? profit / c * 100 : null,
      revPerKm: k > 0 ? r / k : null,
      costPerKm: k > 0 ? c / k : null,
      viable: r > 0 && profit >= 0
    };
  }

  /* Actual result of a finished job.
     estItems  the estimate saved with the job (allocations are carried over, never asked for)
     actual    {amounts:{key: number or ''}, collected: number or ''}
     A cash cost left blank keeps its estimate and is counted in `pending`,
     so the result is only called "actual" when pending is 0 and the payment is recorded. */
  function actualResult(estItems, actual) {
    const a = actual || {}, amounts = a.amounts || {};
    const given = v => v !== '' && v !== null && v !== undefined && isFinite(+v);
    let cash = 0, alloc = 0, pending = 0;
    const rows = [];
    for (const it of (estItems || [])) {
      if (it.off) continue;
      if (it.kind === 'alloc') { const v = pos(it.amount); alloc += v; rows.push({ ...it, value: v, source: 'allocated' }); continue; }
      if (given(amounts[it.key])) { const v = pos(amounts[it.key]); cash += v; rows.push({ ...it, value: v, source: 'actual' }); }
      else if (it.optional) { rows.push({ ...it, value: 0, source: 'none' }); }
      else { const v = it.amount == null ? 0 : pos(it.amount); cash += v; pending++; rows.push({ ...it, value: v, source: 'estimate' }); }
    }
    const collected = given(a.collected) ? pos(a.collected) : null;
    const cost = cash + alloc;
    return {
      rows, cash, alloc, cost, pending, collected,
      profit: collected === null ? null : collected - cost,
      complete: pending === 0 && collected !== null
    };
  }

  const api = { crewShifts, estimateCost, netRevenue, priceTargets, evaluate, actualResult };
  root.GTFinance = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof self !== 'undefined' ? self : this);

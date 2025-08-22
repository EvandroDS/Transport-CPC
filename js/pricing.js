// Common helpers duplicated per page to keep files independent.
// Sets footer year and wires up booking buttons (replace with your real links).

(function(){
  // Footer year
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }

  // Booking actions (replace alert with Calendly/BookWhen link)
  function openBooking(){
    // TODO: Replace with: window.open('https://calendly.com/YOUR-LINK','_blank');
    alert('Booking coming soon. Plug in your Calendly/BookWhen link.');
  }
  var bookBtn = document.getElementById('bookBtn');
  if (bookBtn) bookBtn.addEventListener('click', openBooking);
  var registerCpcBtn = document.getElementById('registerCpcBtn');
  if (registerCpcBtn) registerCpcBtn.addEventListener('click', openBooking);
  var bookingBtn = document.getElementById('bookingBtn');
  if (bookingBtn) bookingBtn.addEventListener('click', openBooking);
  var bookCallBtn = document.getElementById('bookCallBtn');
  if (bookCallBtn) bookCallBtn.addEventListener('click', openBooking);
})();

// Pricing estimator logic – tweak the numbers below as needed.

(function(){
  var service = document.getElementById('serviceSelect');
  var fleet = document.getElementById('fleetSize');
  var duration = document.getElementById('duration');
  var locationSel = document.getElementById('location');
  var output = document.getElementById('estimateValue');

  var BASE = {
    lightETM: { min: 450, max: 600 },      // per month
    fullETM:  { min: 850, max: 1200 },     // per month
    audit:    { min: 250, max: 350 },      // one-off
    cpc:      { min: 60,  max: 75   }      // per driver/session
  };

  function fleetMultiplier(size){
    size = Number(size) || 1;
    if(size <= 3) return 1;
    if(size <= 10) return 1.25;
    if(size <= 20) return 1.5;
    return 1.75;
  }

  var LOC = { standard: 1, urban: 1.1, remote: 1.15 };

  function durationDiscount(months){
    months = Number(months) || 1;
    if(months >= 12) return 0.9;
    if(months >= 6)  return 0.95;
    return 1;
  }

  function formatGBP(value){
    return new Intl.NumberFormat('en-GB',{style:'currency', currency:'GBP', maximumFractionDigits:0}).format(value);
  }

  function recalc(){
    var s = service.value;
    var f = Number(fleet.value || 1);
    var mths = Number(duration.value || 1);
    var locMul = LOC[locationSel.value] || 1;
    var base = BASE[s];
    if(!base){ output.textContent = '£—'; return; }

    if(s === 'audit'){
      var mul = fleetMultiplier(f) * locMul;
      var lo = base.min * mul;
      var hi = base.max * mul;
      output.textContent = formatGBP(lo) + ' – ' + formatGBP(hi) + ' (one-off)';
      return;
    }
    if(s === 'cpc'){
      var lo2 = base.min * f;
      var hi2 = base.max * f;
      output.textContent = formatGBP(lo2) + ' – ' + formatGBP(hi2) + ' (per session)';
      return;
    }
    var mul2 = fleetMultiplier(f) * locMul * durationDiscount(mths);
    var lo3 = base.min * mul2;
    var hi3 = base.max * mul2;
    output.textContent = formatGBP(lo3) + ' – ' + formatGBP(hi3) + ' / month';
  }

  ['change','keyup'].forEach(function(evt){
    [service,fleet,duration,locationSel].forEach(function(el){
      if(el) el.addEventListener(evt, recalc);
    });
  });
  recalc();
})();

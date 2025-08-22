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

// About-specific JS placeholder.

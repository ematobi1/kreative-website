  // ─── PAGE LOADER ───
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('pageLoader').classList.add('done');
    }, 1400);
  });

  // ─── CUSTOM CURSOR ───
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
  });
  (function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
    requestAnimationFrame(animateCursor);
  })();
  document.querySelectorAll('a, button, .product-card, .gallery-item, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2.5)');
    el.addEventListener('mouseleave', () => {});
  });

  // ─── NAV SCROLL ───
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
  });

  // ─── MOBILE MENU ───
  document.getElementById('mobileBtn').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
  function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

  // ─── FADE IN OBSERVER ───
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ─── TOAST ───
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
  }

  // ─── GALLERY FILTER ───
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.opacity = '1'; item.style.pointerEvents = 'all';
        } else {
          item.style.opacity = '0.25'; item.style.pointerEvents = 'none';
        }
      });
    });
  });

  // ─── LIGHTBOX ───
  function openLightbox() {
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
  const _lb = document.getElementById('lightbox');
  if (_lb) _lb.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });

  // ─── FILE UPLOAD ───
  function handleFiles(e) {
    const list = document.getElementById('filePreview');
    if (!list) return;
    list.innerHTML = '';
    Array.from(e.target.files).forEach(f => {
      const chip = document.createElement('div');
      chip.className = 'file-chip';
      chip.innerHTML = `${f.name.substring(0,22)}${f.name.length>22?'…':''} <button onclick="this.parentElement.remove()">×</button>`;
      list.appendChild(chip);
    });
  }

  // ─── FAQ ───
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  }

  // ─── FORM SUBMISSIONS ───
  function submitQuote(e) {
    e.preventDefault();
    showToast('✓ Quote request submitted! We\'ll be in touch within 24 hours.');
    e.target.reset();
    document.getElementById('filePreview').innerHTML = '';
  }
  function submitOrder(e) {
    e.preventDefault();
    showToast('✓ Order placed! Check your email for confirmation.');
  }
  function submitContact(e) {
    e.preventDefault();
    showToast('✓ Message sent! We\'ll respond within one business day.');
    e.target.reset();
  }
  function subscribeEmail(e) {
    e.preventDefault();
    showToast('✓ You\'re subscribed! Welcome to the Kreative family.');
    e.target.reset();
  }

  // ─── ADD TO CART ───
  let cartCount = 0;
  function addToCart(name, price) {
    cartCount++;
    showToast(`✓ ${name} added to cart`);
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    const row = document.createElement('div');
    row.className = 'summary-item';
    row.innerHTML = `<span>${name} × 1</span><span>$${price}.00</span>`;
    cartItems.appendChild(row);
  }

  // ─── CARD FORMATTING ───
  function formatCard(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = v.replace(/(.{4})/g, '$1 ').trim();
  }
  function formatExp(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) v = v.substring(0, 2) + ' / ' + v.substring(2);
    input.value = v;
  }

  // ─── CHATBOT ───
  const botReplies = {
    'quote':      'To get a custom quote, scroll up to our "Request a Quote" section and fill out the form — or call us at (404) 683-4961. We respond within 24 hours!',
    'turnaround': 'Standard turnaround is 7–14 business days from proof approval. Rush orders (3–5 business days) are available for an additional fee. Large bulk orders may require extra time — we confirm your timeline upfront.',
    'file':       'We accept PNG, JPG, PDF, AI (Adobe Illustrator), EPS, PSD, and SVG files. For best print quality please provide 300 DPI+ images or vector files (AI, EPS, SVG) for logos. CMYK color mode and transparent backgrounds for logos are preferred.',
    'bulk':       'We offer great bulk pricing starting at 12+ pieces. For orders over 50 pieces, contact us directly at (404) 683-4961 or bkngalame@gmail.com for a custom wholesale quote.',
    'services':   'Kreative Additions LLC offers: Custom Apparel (tees, hoodies, jerseys), Home Décor Fabrics (pillows, wall art, table runners), Photo & Image Printing, Branded Merchandise, Event & Team Wear, and Gift & Keepsake Items (totes, scarves, bandanas). Every item is fully customizable!',
    'shipping':   'We ship to all 50 US states via UPS and USPS. Free shipping is included on orders over $150. Expedited and overnight options are available. For international orders please contact us directly.',
    'contact':    'You can reach us at:<br>📞 (404) 683-4961<br>✉ bkngalame@gmail.com<br>📍 344 Macroom Ct, Loganville, GA 30052<br>⏰ Mon–Fri, 9am–6pm EST',
    'location':   'We are located at 344 Macroom Ct, Loganville, GA 30052. We serve clients nationwide and ship to all 50 US states.',
    'hours':      'Our business hours are Monday through Friday, 9am–6pm EST. You can always reach us by email at bkngalame@gmail.com and we will respond within one business day.',
    'return':     'We stand behind every order. If items are defective or significantly different from the approved proof, we will reprint or refund at no cost. Because all items are custom-made, we cannot accept returns for buyer\'s remorse.',
    'design':     'Yes! Our in-house design team can create or refine artwork for your project. A free design consultation is included with every order. For full custom design work, a separate design fee may apply depending on complexity.',
    'payment':    'We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are secured with 256-bit SSL encryption.',
    'minimum':    'There is no minimum order requirement — you can order as little as one piece! Our best pricing kicks in at 12+ units. Contact us for bulk pricing on orders over 50 pieces.',
    'about':      'Kreative Additions LLC is a premium custom fabric printing company based in Loganville, Georgia. With over 7 years in business and 500+ projects completed, we deliver exceptional custom-printed fabrics for apparel, home décor, gifts, and branded merchandise — with a 98% client satisfaction rate.',
    'default':    'Great question! For detailed help you can call us at (404) 683-4961 or email bkngalame@gmail.com. Our team is available Mon–Fri, 9am–6pm EST and we\'d love to help bring your vision to life!'
  };
  function getBotReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('quote') || msg.includes('price') || msg.includes('cost') || msg.includes('how much')) return botReplies.quote;
    if (msg.includes('turnaround') || msg.includes('how long') || msg.includes('fast') || msg.includes('rush') || msg.includes('delivery') || msg.includes('when')) return botReplies.turnaround;
    if (msg.includes('file') || msg.includes('format') || msg.includes('png') || msg.includes('pdf') || msg.includes('svg') || msg.includes('resolution') || msg.includes('dpi')) return botReplies.file;
    if (msg.includes('bulk') || msg.includes('wholesale') || msg.includes('large order') || msg.includes('50+') || msg.includes('100+')) return botReplies.bulk;
    if (msg.includes('service') || msg.includes('offer') || msg.includes('what do') || msg.includes('what can') || msg.includes('product') || msg.includes('apparel') || msg.includes('hoodie') || msg.includes('tee') || msg.includes('pillow') || msg.includes('tote')) return botReplies.services;
    if (msg.includes('ship') || msg.includes('deliver') || msg.includes('tracking') || msg.includes('usps') || msg.includes('ups')) return botReplies.shipping;
    if (msg.includes('phone') || msg.includes('call') || msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('get in touch')) return botReplies.contact;
    if (msg.includes('location') || msg.includes('address') || msg.includes('where') || msg.includes('loganville') || msg.includes('georgia')) return botReplies.location;
    if (msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('schedule') || msg.includes('available')) return botReplies.hours;
    if (msg.includes('return') || msg.includes('refund') || msg.includes('policy') || msg.includes('wrong') || msg.includes('defect')) return botReplies.return;
    if (msg.includes('design') || msg.includes('artwork') || msg.includes('logo') || msg.includes('no design') || msg.includes('help with')) return botReplies.design;
    if (msg.includes('pay') || msg.includes('payment') || msg.includes('visa') || msg.includes('card') || msg.includes('paypal') || msg.includes('apple pay')) return botReplies.payment;
    if (msg.includes('minimum') || msg.includes('min order') || msg.includes('one piece') || msg.includes('single')) return botReplies.minimum;
    if (msg.includes('about') || msg.includes('company') || msg.includes('who are') || msg.includes('kreative') || msg.includes('history') || msg.includes('experience')) return botReplies.about;
    return botReplies.default;
  }
  function appendMsg(text, role) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    const now = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${now}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }
  function sendChat() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    appendMsg(msg, 'user');
    input.value = '';
    setTimeout(() => appendMsg(getBotReply(msg), 'bot'), 700);
  }
  function sendQuick(msg) {
    appendMsg(msg, 'user');
    setTimeout(() => appendMsg(getBotReply(msg), 'bot'), 700);
  }
  function toggleChat() {
    const win = document.getElementById('chatWindow');
    win.classList.toggle('open');
    document.querySelector('.chatbot-badge').style.display = 'none';
  }

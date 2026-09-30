/* Lógica pública de pedido. El catálogo permanece en products.js. */
(() => {
  const data = window.SABOR_DATA;
  const state = { items: [], customCake: null };
  const $ = (selector) => document.querySelector(selector);
  const money = (value) => `$${Number(value).toLocaleString('es-CL')}`;
  const emoji = { wave: String.fromCharCode(0xD83D, 0xDC4B), receipt: String.fromCharCode(0xD83E, 0xDDFE), person: String.fromCharCode(0xD83D, 0xDC64), calendar: String.fromCharCode(0xD83D, 0xDCC5), cart: String.fromCharCode(0xD83D, 0xDED2), money: String.fromCharCode(0xD83D, 0xDCB0), delivery: String.fromCharCode(0xD83D, 0xDE9A), note: String.fromCharCode(0xD83D, 0xDCDD), smile: String.fromCharCode(0xD83D, 0xDE0A) };

  // offerStart y offerEnd deben ser ISO 8601 con zona horaria, por ejemplo:
  // 2026-10-01T00:00:00-03:00
  const isActiveOffer = (product, now = new Date()) => {
    if (!Number.isFinite(product.offerPrice) || product.offerPrice < 0 || !product.offerStart || !product.offerEnd) return false;
    const start = new Date(product.offerStart);
    const end = new Date(product.offerEnd);
    return !Number.isNaN(start.valueOf()) && !Number.isNaN(end.valueOf()) && start <= now && now <= end;
  };
  const currentPrice = (product, now) => isActiveOffer(product, now) ? product.offerPrice : product.price;
  const pendingItems = () => [
    ...state.items.filter((item) => item.price === null || item.price === undefined),
    ...(state.customCake ? [{ name: 'Torta personalizada' }] : [])
  ];
  const hasPendingItems = () => pendingItems().length > 0;
  const confirmedTotal = () => state.items.reduce((total, item) => total + (Number.isFinite(item.price) ? item.price * item.qty : 0), 0);
  const showToast = (message) => {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2000);
  };

  const card = (product, options = {}) => {
    const active = isActiveOffer(product);
    const price = currentPrice(product);
    const photo = product.image ? `<img src="${product.image}" alt="${product.name}" loading="lazy">` : '✦';
    const badge = options.showBadge && product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
    const priceMarkup = price === null || price === undefined
      ? 'Consultar valor'
      : active
        ? `<s>${money(product.price)}</s> <strong>${money(price)}</strong><small class="offer-label">🔥 Oferta por tiempo limitado</small>`
        : money(price);
    return `<article class="card${options.featured ? ' featured-card' : ''}"><div class="photo">${photo}${badge}</div><div><h3>${product.name}</h3><span class="qty">${product.quantity || 'Consultar valor'}</span><p>${product.description}</p><span class="price">${priceMarkup}</span><button class="add" type="button" data-sabor-add="${product.id}">${price === null || price === undefined ? 'Consultar' : 'Agregar'}</button></div></article>`;
  };

  const allProducts = () => [...data.products, ...data.classicCakes];
  const addProduct = (id) => {
    const product = allProducts().find((item) => item.id === id);
    if (!product) return;
    const price = currentPrice(product);
    const existing = state.items.find((item) => item.id === product.id && item.price === price);
    if (existing) existing.qty += 1;
    else state.items.push({ ...product, price, qty: 1 });
    renderCart();
    showToast(`${product.name} agregado al pedido`);
  };
  const bindProductButtons = () => {
    document.querySelectorAll('[data-sabor-add]').forEach((button) => {
      button.onclick = () => addProduct(button.dataset.saborAdd);
    });
  };
  const renderFeatured = () => {
    const section = $('#featured');
    const featured = data.products.filter((product) => product.available && product.featured);
    if (!featured.length) { section.hidden = true; return; }
    section.hidden = false;
    $('#featuredTrack').innerHTML = featured.map((product) => card(product, { featured: true, showBadge: true })).join('');
    section.querySelectorAll('[data-carousel]').forEach((button) => {
      button.onclick = () => $('#featuredTrack').scrollBy({ left: Number(button.dataset.carousel) * $('#featuredTrack').clientWidth * .82, behavior: 'smooth' });
    });
  };
  const renderProducts = () => {
    const render = (selector, list) => { $(selector).innerHTML = list.filter((product) => product.available).map(card).join(''); };
    render('#cocktail', data.products.filter((product) => product.category === 'Cóctel'));
    render('#boxes', data.products.filter((product) => product.category === 'Box'));
    render('#sweets', data.products.filter((product) => product.category === 'Dulces'));
    render('#classics', data.classicCakes);
    renderFeatured();
    renderOffers();
    bindProductButtons();
  };
  const renderOffers = () => {
    const active = data.products.filter((product) => isActiveOffer(product));
    let section = $('#offers');
    if (!active.length) {
      if (section) section.remove();
      return;
    }
    if (!section) {
      section = document.createElement('section');
      section.id = 'offers';
      section.className = 'alt offers-section';
      $('#menu').before(section);
    }
    section.innerHTML = `<div class="w"><div class="head"><span class="k">Disponibles ahora</span><h2>🔥 Ofertas de hoy</h2><p>Promociones vigentes por tiempo limitado.</p></div><div class="grid" id="offerGrid">${active.map(card).join('')}</div></div>`;
    bindProductButtons();
  };

  const renderCart = () => {
    const count = state.items.reduce((sum, item) => sum + item.qty, 0) + (state.customCake ? 1 : 0);
    document.querySelectorAll('.count').forEach((element) => { element.textContent = count; });
    const box = $('#cartbox');
    box.hidden = count === 0;
    if (!count) return;
    const rows = state.items.map((item) => {
      const value = Number.isFinite(item.price) ? money(item.price) : 'Valor por confirmar';
      return `<div class="item"><div><b>${item.name}</b><small>Cantidad: ${item.qty}${item.quantity ? ` · ${item.quantity}` : ''}<br>${value}</small></div><div class="control"><button type="button" data-change="${item.id}" data-step="-1" aria-label="Disminuir">−</button> ${item.qty} <button type="button" data-change="${item.id}" data-step="1" aria-label="Aumentar">+</button><button type="button" class="remove" data-remove="${item.id}">Eliminar</button></div></div>`;
    }).join('');
    const custom = state.customCake ? `<div class="item"><div><b>Torta personalizada</b><small>Cantidad: 1<br>Valor por confirmar</small></div><button type="button" class="remove" data-remove="custom-cake">Eliminar</button></div>` : '';
    const pending = pendingItems();
    const summaryLabel = hasPendingItems() ? 'Total confirmado' : 'Total del pedido';
    const pendingSummary = pending.length ? `<p class="pending"><b>Valores por confirmar:</b><br>${pending.map((item) => `• ${item.name}`).join('<br>')}</p>` : '';
    box.innerHTML = `${rows}${custom}<p><b>${summaryLabel}: ${money(confirmedTotal())}</b></p>${pendingSummary}`;
    box.querySelectorAll('[data-change]').forEach((button) => {
      button.onclick = () => {
        const item = state.items.find((row) => row.id === button.dataset.change);
        item.qty += Number(button.dataset.step);
        if (item.qty < 1) state.items.splice(state.items.indexOf(item), 1);
        renderCart();
      };
    });
    box.querySelectorAll('[data-remove]').forEach((button) => {
      button.onclick = () => {
        if (button.dataset.remove === 'custom-cake') state.customCake = null;
        else state.items.splice(state.items.findIndex((item) => item.id === button.dataset.remove), 1);
        renderCart();
      };
    });
  };

  const buildWhatsAppMessage = (form) => {
    const pending = pendingItems();
    const delivery = $('#delivery').value;
    const date = new Date(`${$('#date').value}T00:00`).toLocaleDateString('es-CL');
    const order = String(Number(localStorage.getItem('sabor-order') || 0) + 1).padStart(3, '0');
    const lines = [`Hola ${emoji.wave} Quiero realizar un pedido en Sabor de Elis.`, '', `${emoji.receipt} *Pedido #${order}*`, '', `${emoji.person} *Cliente*`, `Nombre: ${$('#name').value.trim()}`, '', `${emoji.calendar} *Fecha requerida*`, `Fecha: ${date}`, `Hora: ${$('#time').value}`, ''];
    if (state.items.length) {
      lines.push(`${emoji.cart} *PRODUCTOS*`, '');
      state.items.forEach((item) => {
        lines.push(`• ${item.name}`, `  Cantidad: ${item.qty}`);
        if (Number.isFinite(item.price)) lines.push(`  ${item.quantity || 'Unidad'} × ${money(item.price)}`, `  ${money(item.price * item.qty)}`);
        else lines.push('  Valor por confirmar');
      });
      lines.push('');
    }
    if (state.customCake) {
      const cake = state.customCake;
      lines.push('🎂 *TORTA PERSONALIZADA*', '', `Tamaño: ${cake.size}`, `Bizcocho: ${cake.sponge}`, `Relleno 1: ${cake.fill[0]}`, ...(cake.fill[1] ? [`Relleno 2: ${cake.fill[1]}`] : []), `Cobertura: ${cake.cover}`, `Topper: ${cake.topper}`, ...(cake.theme ? [`Temática: ${cake.theme}`] : []), 'Valor: Por confirmar', '');
    }
    lines.push(`${emoji.money} *RESUMEN*`, '', `${pending.length ? 'Total confirmado' : 'Total del pedido'}: ${money(confirmedTotal())}`);
    if (pending.length) lines.push('', 'Valores por confirmar:', ...pending.map((item) => `• ${item.name}`));
    lines.push('', `${emoji.delivery} *ENTREGA*`, '', `Modalidad: ${delivery}`, `Dirección: ${delivery === 'Delivery' ? $('#address').value.trim() : data.business.pickupAddress}`);
    if ($('#notes').value.trim()) lines.push('', `${emoji.note} *OBSERVACIONES*`, '', $('#notes').value.trim());
    lines.push('', `Gracias ${emoji.smile}`);
    return { order, text: lines.join('\n') };
  };

  const fillings = ['Chocolate', 'Bariloche', 'Manjar con nuez', 'Chocolate blanco', 'Crema de Oreo', 'Crema de café', 'Trufa', 'Pannacota', 'Chocolate con naranja', 'Crema pastelera', 'Maracuyá', 'Ganache de fresa'];
  $('#fills').innerHTML = fillings.map((fill) => `<label><input type="checkbox" value="${fill}"> ${fill}</label>`).join('');
  $('#addCake').onclick = () => {
    const fill = [...$('#fills').querySelectorAll(':checked')].map((input) => input.value);
    if (!$('#size').value || !$('#sponge').value || !$('#cover').value || !fill.length || fill.length > 2) return showToast('Completa los datos y elige hasta dos rellenos');
    state.customCake = { size: $('#size').value, sponge: $('#sponge').value, cover: $('#cover').value, topper: $('#topper').value, theme: $('#theme').value.trim(), fill };
    renderCart();
    location.hash = 'pedido';
    showToast('Torta personalizada agregada al pedido');
  };
  const updateFulfillment = () => {
    const isDelivery = $('#delivery').value === 'Delivery';
    $('#addressbox').hidden = !isDelivery;
    $('#address').required = isDelivery;
    document.querySelectorAll('[data-fulfillment]').forEach((button) => {
      button.classList.toggle('active', button.dataset.fulfillment === $('#delivery').value);
    });
  };
  document.querySelectorAll('[data-fulfillment]').forEach((button) => {
    button.onclick = () => { $('#delivery').value = button.dataset.fulfillment; updateFulfillment(); };
  });
  $('#delivery').onchange = updateFulfillment;
  updateFulfillment();
  $('#continueOrder').onclick = () => {
    if (!state.items.length && !state.customCake) return showToast('Agrega al menos un producto al pedido');
    $('#reviewStep').hidden = true;
    $('#checkout').hidden = false;
    $('#checkout').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  $('#checkout').onsubmit = (event) => {
    event.preventDefault();
    if (!state.items.length && !state.customCake) return showToast('Agrega al menos un producto al pedido');
    if (!event.currentTarget.reportValidity()) return;
    const message = buildWhatsAppMessage(event.currentTarget);
    localStorage.setItem('sabor-order', message.order);
    window.open(`https://api.whatsapp.com/send?phone=${data.business.whatsapp}&text=${encodeURIComponent(message.text)}`, '_blank', 'noopener');
  };

  const style = document.createElement('style');
  style.textContent = '.price s{color:var(--m);font-weight:500;margin-right:4px}.price strong{color:var(--a)}.price .offer-label{display:block;color:#b8493d;font-size:.76rem;margin-top:4px}.pending{color:#f4ded7}.offers-section{padding-block:48px}';
  document.head.append(style);
  window.saborOrder = { isActiveOffer, currentPrice, hasPendingItems, buildWhatsAppMessage, state, renderProducts, renderCart, renderFeatured, addProduct };
  renderProducts();
  renderCart();
})();

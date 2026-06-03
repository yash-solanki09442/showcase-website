/**
 * Showcase — cart, wishlist, currency, page logic
 * Requires products.js loaded first
 */
(function () {
  const { products, getProductById, formatPrice } = window.ShowcaseCatalog;

  const STORAGE_KEYS = {
    cart: 'showcase_cart',
    wishlist: 'showcase_wishlist',
    currency: 'showcase_currency',
  };

  function getCurrency() {
    return sessionStorage.getItem(STORAGE_KEYS.currency) || 'USD';
  }

  function setCurrency(code) {
    sessionStorage.setItem(STORAGE_KEYS.currency, code);
    document.dispatchEvent(new CustomEvent('showcase:currency'));
  }

  function getCart() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.cart) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    sessionStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('showcase:cart'));
  }

  function getWishlist() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.wishlist) || '[]');
    } catch {
      return [];
    }
  }

  function saveWishlist(list) {
    sessionStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(list));
    document.dispatchEvent(new CustomEvent('showcase:wishlist'));
  }

  function cartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function wishlistCount() {
    return getWishlist().length;
  }

  function addToCart(productId, options) {
    const product = getProductById(productId);
    if (!product) return false;
    const cart = getCart();
    const color = (options && options.color) || product.colors[0];
    const size = (options && options.size) || product.sizes[0];
    const key = productId + '|' + color + '|' + size;
    const existing = cart.find(function (i) {
      return i.key === key;
    });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        key: key,
        productId: productId,
        qty: 1,
        color: color,
        size: size,
        priceUsd: product.priceUsd,
      });
    }
    saveCart(cart);
    return true;
  }

  function updateCartQty(key, delta) {
    const cart = getCart();
    const item = cart.find(function (i) {
      return i.key === key;
    });
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
  }

  function removeFromCart(key) {
    saveCart(
      getCart().filter(function (i) {
        return i.key !== key;
      })
    );
  }

  function toggleWishlist(productId) {
    const list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(productId);
    saveWishlist(list);
    return list.includes(productId);
  }

  function isInWishlist(productId) {
    return getWishlist().includes(productId);
  }

  function showToast(message) {
    var el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(el._timer);
    el._timer = setTimeout(function () {
      el.classList.remove('is-visible');
    }, 2800);
  }

  function renderBadges() {
    var cartBadge = document.querySelector('[data-cart-count]');
    var wishBadge = document.querySelector('[data-wishlist-count]');
    var c = cartCount();
    var w = wishlistCount();
    if (cartBadge) {
      cartBadge.textContent = c;
      cartBadge.classList.toggle('hidden', c === 0);
    }
    if (wishBadge) {
      wishBadge.textContent = w;
      wishBadge.classList.toggle('hidden', w === 0);
    }
  }

  function initCurrencyToggle() {
    var container = document.querySelector('[data-currency-toggle]');
    if (!container) return;
    var buttons = container.querySelectorAll('button[data-currency]');
    function sync() {
      var cur = getCurrency();
      buttons.forEach(function (btn) {
        btn.classList.toggle('is-active', btn.dataset.currency === cur);
      });
    }
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setCurrency(btn.dataset.currency);
        sync();
      });
    });
    document.addEventListener('showcase:currency', function () {
      sync();
      document.querySelectorAll('[data-price-usd]').forEach(function (el) {
        var usd = Number(el.dataset.priceUsd);
        if (!Number.isNaN(usd))
          el.textContent = formatPrice(usd, getCurrency());
      });
      document.querySelectorAll('[data-line-usd]').forEach(function (el) {
        var usd = Number(el.dataset.lineUsd);
        if (!Number.isNaN(usd))
          el.textContent = formatPrice(usd, getCurrency());
      });
    });
    sync();
  }

  function initHeader() {
    var header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener(
        'scroll',
        function () {
          header.classList.toggle('is-scrolled', window.scrollY > 20);
        },
        { passive: true }
      );
    }
    var toggle = document.querySelector('[data-menu-toggle]');
    var mobileNav = document.querySelector('[data-mobile-nav]');
    if (toggle && mobileNav) {
      toggle.addEventListener('click', function () {
        mobileNav.classList.toggle('is-open');
      });
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileNav.classList.remove('is-open');
        });
      });
    }
  }

  function heartSvg(filled) {
    if (filled) {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-8-5.4-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.6-8 11-8 11z"/></svg>';
    }
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 21s-8-5.4-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.6-8 11-8 11z"/></svg>';
  }

  function productCardHtml(product) {
    var cur = getCurrency();
    var href = 'product.html?id=' + encodeURIComponent(product.id);
    var saved = isInWishlist(product.id);
    return (
      '<article class="product-card" data-product-id="' +
      product.id +
      '">' +
      '<div class="product-card__media-wrap">' +
      '<a class="product-card__link" href="' +
      href +
      '">' +
      '<img class="product-card__img" src="' +
      product.images[0] +
      '" alt="' +
      product.name +
      '" loading="lazy" width="400" height="533" />' +
      '</a>' +
      '<div class="product-card__actions">' +
      '<button type="button" class="card-action" data-wishlist-toggle aria-label="' +
      (saved ? 'Remove from wishlist' : 'Add to wishlist') +
      '" aria-pressed="' +
      saved +
      '">' +
      heartSvg(saved) +
      '</button>' +
      '<button type="button" class="card-action" data-quick-add aria-label="Add to bag">+</button>' +
      '</div></div>' +
      '<div class="product-card__info">' +
      '<span class="product-card__category">' +
      product.category +
      '</span>' +
      '<h3 class="product-card__name"><a href="' +
      href +
      '">' +
      product.name +
      '</a></h3>' +
      '<p class="product-card__price" data-price-usd="' +
      product.priceUsd +
      '">' +
      formatPrice(product.priceUsd, cur) +
      '</p></div></article>'
    );
  }

  function bindProductCardActions(container) {
    if (!container) return;
    container.querySelectorAll('[data-wishlist-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var card = btn.closest('[data-product-id]');
        var id = card && card.dataset.productId;
        if (!id) return;
        var nowSaved = toggleWishlist(id);
        btn.setAttribute('aria-pressed', nowSaved);
        btn.innerHTML = heartSvg(nowSaved);
        showToast(nowSaved ? 'Saved to wishlist' : 'Removed from wishlist');
        renderBadges();
      });
    });
    container.querySelectorAll('[data-quick-add]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var card = btn.closest('[data-product-id]');
        var id = card && card.dataset.productId;
        if (!id) return;
        addToCart(id, {});
        showToast('Added to your bag');
        renderBadges();
      });
    });
  }

  function renderProductGrid(container, list) {
    if (!container) return;
    if (!list.length) {
      container.innerHTML =
        '<p class="empty-state">No pieces match your selection.</p>';
      return;
    }
    container.innerHTML = list.map(productCardHtml).join('');
    bindProductCardActions(container);
  }

  function initShopPage() {
    var grid = document.querySelector('[data-product-grid]');
    var chips = document.querySelectorAll('[data-filter]');
    var sortSelect = document.querySelector('[data-sort]');
    var params = new URLSearchParams(window.location.search);
    var category = params.get('category') || 'All';

    chips.forEach(function (chip) {
      chip.classList.toggle('is-active', chip.dataset.filter === category);
    });

    function apply() {
      var list = products.slice();
      if (category !== 'All') {
        list = list.filter(function (p) {
          return p.category === category;
        });
      }
      var sort = (sortSelect && sortSelect.value) || 'featured';
      if (sort === 'price-asc') list.sort(function (a, b) { return a.priceUsd - b.priceUsd; });
      if (sort === 'price-desc') list.sort(function (a, b) { return b.priceUsd - a.priceUsd; });
      if (sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name); });
      renderProductGrid(grid, list);
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        category = chip.dataset.filter;
        chips.forEach(function (c) {
          c.classList.toggle('is-active', c === chip);
        });
        var url = new URL(window.location.href);
        if (category === 'All') url.searchParams.delete('category');
        else url.searchParams.set('category', category);
        history.replaceState({}, '', url);
        apply();
      });
    });
    if (sortSelect) sortSelect.addEventListener('change', apply);
    document.addEventListener('showcase:currency', apply);
    apply();
  }

  function renderReviews(product) {
    var stars = function (n) {
      return '★'.repeat(Math.floor(n)) + '☆'.repeat(5 - Math.floor(n));
    };
    return (
      '<section class="reviews" aria-label="Reviews">' +
      '<h3>Client Reviews</h3>' +
      '<div class="review-item">' +
      '<div class="review-item__stars">' + stars(product.rating) + '</div>' +
      '<p class="review-item__meta">' + product.rating + ' · ' + product.reviewCount + ' reviews</p>' +
      '<p>Exceptional craftsmanship. True atelier quality—worth every moment of anticipation.</p>' +
      '</div>' +
      '<div class="review-item">' +
      '<div class="review-item__stars">★★★★★</div>' +
      '<p class="review-item__meta">Verified · Geneva</p>' +
      '<p>Impeccable packaging and concierge delivery. A definitive Showcase experience.</p>' +
      '</div>' +
      '<div class="review-item">' +
      '<div class="review-item__stars">★★★★☆</div>' +
      '<p class="review-item__meta">Verified · 1 month ago</p>' +
      '<p>The ' + product.name.toLowerCase() + ' photographs beautifully and wears even better in person.</p>' +
      '</div></section>'
    );
  }

  function initProductPage() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var product = id ? getProductById(id) : null;
    var root = document.querySelector('[data-pdp]');
    var relatedEl = document.querySelector('[data-related-grid]');

    if (!product || !root) {
      if (root) {
        root.innerHTML =
          '<div class="empty-state"><h2>Piece not found</h2><p><a href="shop.html">Return to the boutique</a></p></div>';
      }
      return;
    }

    document.title = product.name + ' — Showcase';
    var selectedColor = product.colors[0];
    var selectedSize = product.sizes[0];
    var imageIndex = 0;

    function renderRelated() {
      if (!relatedEl) return;
      var related = products
        .filter(function (p) {
          return p.category === product.category && p.id !== product.id;
        })
        .slice(0, 4);
      if (!related.length) {
        related = products.filter(function (p) { return p.id !== product.id; }).slice(0, 4);
      }
      renderProductGrid(relatedEl, related);
    }

    function render() {
      var cur = getCurrency();
      root.innerHTML =
        '<div class="pdp-gallery">' +
        '<div class="pdp-gallery__main"><img src="' + product.images[imageIndex] + '" alt="' + product.name + '" /></div>' +
        '<div class="pdp-gallery__thumbs">' +
        product.images
          .map(function (src, i) {
            return (
              '<button type="button" class="pdp-gallery__thumb ' +
              (i === imageIndex ? 'is-active' : '') +
              '" data-thumb="' + i + '"><img src="' + src + '" alt="" /></button>'
            );
          })
          .join('') +
        '</div></div>' +
        '<div class="pdp-meta">' +
        '<p class="eyebrow">' + product.category + '</p>' +
        '<h1>' + product.name + '</h1>' +
        '<p class="pdp-price" data-price-usd="' + product.priceUsd + '">' + formatPrice(product.priceUsd, cur) + '</p>' +
        '<p class="pdp-desc">' + product.description + '</p>' +
        '<div class="option-group"><label>Colour</label><div class="option-pills" data-colors>' +
        product.colors
          .map(function (c) {
            return '<button type="button" class="option-pill ' + (c === selectedColor ? 'is-selected' : '') + '" data-color="' + c + '">' + c + '</button>';
          })
          .join('') +
        '</div></div>' +
        '<div class="option-group"><label>Size</label><div class="option-pills" data-sizes>' +
        product.sizes
          .map(function (s) {
            return '<button type="button" class="option-pill ' + (s === selectedSize ? 'is-selected' : '') + '" data-size="' + s + '">' + s + '</button>';
          })
          .join('') +
        '</div></div>' +
        '<div class="pdp-actions">' +
        '<button type="button" class="btn btn--block" data-add-cart>Add to Bag</button>' +
        '<button type="button" class="btn btn--outline btn--block" data-wishlist>' +
        (isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist') +
        '</button></div>' +
        renderReviews(product) +
        '</div>';

      root.querySelectorAll('[data-thumb]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          imageIndex = Number(btn.dataset.thumb);
          render();
        });
      });
      root.querySelectorAll('[data-color]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectedColor = btn.dataset.color;
          render();
        });
      });
      root.querySelectorAll('[data-size]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectedSize = btn.dataset.size;
          render();
        });
      });
      root.querySelector('[data-add-cart]').addEventListener('click', function () {
        addToCart(product.id, { color: selectedColor, size: selectedSize });
        showToast('Added to your bag');
        renderBadges();
      });
      root.querySelector('[data-wishlist]').addEventListener('click', function () {
        toggleWishlist(product.id);
        showToast(isInWishlist(product.id) ? 'Saved to wishlist' : 'Removed from wishlist');
        render();
        renderBadges();
      });
    }

    document.addEventListener('showcase:currency', render);
    render();
    renderRelated();
  }

  function initCartPage() {
    var listEl = document.querySelector('[data-cart-items]');
    var summaryEl = document.querySelector('[data-cart-summary]');
    var emptyEl = document.querySelector('[data-cart-empty]');
    var layoutEl = document.querySelector('[data-cart-layout]');

    function render() {
      var cart = getCart();
      var cur = getCurrency();
      if (!cart.length) {
        if (listEl) listEl.innerHTML = '';
        layoutEl && layoutEl.classList.add('hidden');
        summaryEl && summaryEl.classList.add('hidden');
        emptyEl && emptyEl.classList.remove('hidden');
        return;
      }
      emptyEl && emptyEl.classList.add('hidden');
      layoutEl && layoutEl.classList.remove('hidden');
      summaryEl && summaryEl.classList.remove('hidden');

      var subtotal = 0;
      listEl.innerHTML = cart
        .map(function (item) {
          var p = getProductById(item.productId);
          if (!p) return '';
          var line = item.priceUsd * item.qty;
          subtotal += line;
          return (
            '<div class="cart-item" data-key="' + item.key + '">' +
            '<a href="product.html?id=' + encodeURIComponent(p.id) + '"><img class="cart-item__img" src="' + p.images[0] + '" alt="' + p.name + '" width="100" height="133" /></a>' +
            '<div><h3 class="product-card__name"><a href="product.html?id=' + encodeURIComponent(p.id) + '">' + p.name + '</a></h3>' +
            '<p class="product-card__category">' + item.color + ' · ' + item.size + '</p>' +
            '<p class="product-card__price" data-price-usd="' + item.priceUsd + '">' + formatPrice(item.priceUsd, cur) + ' each</p>' +
            '<div class="qty-control mt-lg">' +
            '<button type="button" data-qty="-1" aria-label="Decrease">−</button><span>' + item.qty + '</span>' +
            '<button type="button" data-qty="1" aria-label="Increase">+</button></div>' +
            '<button type="button" class="btn btn--ghost" data-remove>Remove</button></div>' +
            '<p class="product-card__price" data-line-usd="' + line + '">' + formatPrice(line, cur) + '</p></div>'
          );
        })
        .join('');

      summaryEl.innerHTML =
        '<h3>Order Summary</h3>' +
        '<div class="cart-summary__row"><span>Subtotal</span><span data-subtotal-usd="' + subtotal + '">' + formatPrice(subtotal, cur) + '</span></div>' +
        '<div class="cart-summary__row"><span>Shipping</span><span>Complimentary</span></div>' +
        '<div class="cart-summary__total"><span>Total</span><span data-subtotal-usd="' + subtotal + '">' + formatPrice(subtotal, cur) + '</span></div>' +
        '<button type="button" class="btn btn--accent btn--block" data-checkout>Proceed to Checkout</button>' +
        '<p class="cart-demo-note">Demo only — no payment processed</p>';

      listEl.querySelectorAll('[data-qty]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          updateCartQty(btn.closest('.cart-item').dataset.key, Number(btn.dataset.qty));
          render();
          renderBadges();
        });
      });
      listEl.querySelectorAll('[data-remove]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          removeFromCart(btn.closest('.cart-item').dataset.key);
          render();
          renderBadges();
        });
      });
      summaryEl.querySelector('[data-checkout]').addEventListener('click', function () {
        showToast('Checkout is not enabled in this demo');
      });
    }

    document.addEventListener('showcase:currency', render);
    render();
  }

  function initWishlistPage() {
    var grid = document.querySelector('[data-wishlist-grid]');
    var emptyEl = document.querySelector('[data-wishlist-empty]');

    function render() {
      var list = getWishlist()
        .map(getProductById)
        .filter(Boolean);
      if (!list.length) {
        grid && grid.classList.add('hidden');
        emptyEl && emptyEl.classList.remove('hidden');
        return;
      }
      emptyEl && emptyEl.classList.add('hidden');
      grid && grid.classList.remove('hidden');
      renderProductGrid(grid, list);
      grid.querySelectorAll('.product-card').forEach(function (card) {
        var id = card.dataset.productId;
        var row = document.createElement('div');
        row.className = 'wishlist-card-actions';
        var addBtn = document.createElement('button');
        addBtn.className = 'btn btn--outline';
        addBtn.textContent = 'Add to Bag';
        addBtn.addEventListener('click', function () {
          addToCart(id, {});
          showToast('Added to your bag');
          renderBadges();
        });
        var rmBtn = document.createElement('button');
        rmBtn.className = 'btn btn--ghost';
        rmBtn.textContent = 'Remove';
        rmBtn.addEventListener('click', function () {
          toggleWishlist(id);
          render();
          renderBadges();
        });
        row.appendChild(addBtn);
        row.appendChild(rmBtn);
        card.querySelector('.product-card__info').appendChild(row);
      });
    }

    document.addEventListener('showcase:currency', render);
    render();
  }

  function initLandingFeatured() {
    var el = document.querySelector('[data-featured-grid]');
    if (el) {
      renderProductGrid(el, products.slice(0, 4));
    }
    document.querySelectorAll('[data-collection-grid]').forEach(function (grid) {
      var cat = grid.dataset.collectionGrid;
      var items = products.filter(function (p) { return p.category === cat; }).slice(0, 3);
      renderProductGrid(grid, items);
    });
  }

  function boot() {
    if (!window.ShowcaseCatalog) {
      console.error('Showcase: products.js must load before app.js');
      return;
    }
    initHeader();
    initCurrencyToggle();
    renderBadges();
    document.addEventListener('showcase:cart', renderBadges);
    document.addEventListener('showcase:wishlist', renderBadges);

    var page = document.body.dataset.page;
    if (page === 'shop') initShopPage();
    if (page === 'product') initProductPage();
    if (page === 'cart') initCartPage();
    if (page === 'wishlist') initWishlistPage();
    if (page === 'home') initLandingFeatured();
    document.dispatchEvent(new CustomEvent('showcase:currency'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

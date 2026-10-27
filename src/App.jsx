import { useMemo, useState } from 'react';
import {
  Search, Heart, ShoppingBag, Menu, X, Star, Plus, Minus, Trash2,
  ArrowUpRight, Sparkles, Package, SlidersHorizontal, Check, ImagePlus,
  ChevronRight, Leaf, ShieldCheck
} from 'lucide-react';

const starterProducts = [
  {
    id: 1,
    name: 'The Oversized Cashmere Turtleneck',
    category: 'Apparel',
    price: 340,
    quantity: 8,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
    badge: 'Best Seller',
    description: 'Spun from ultra-soft cashmere, this relaxed turtleneck brings quiet elegance to everyday dressing. A timeless layer with a soft hand-feel and graceful drape.',
    specifications: 'Cashmere blend · Relaxed fit · Ribbed trim · Sizes S–XL'
  },
  {
    id: 2,
    name: 'Structured Italian Leather Tote',
    category: 'Accessories',
    price: 480,
    quantity: 4,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
    badge: 'New Arrival',
    description: 'A structured tote crafted for everyday use. Clean lines, considered details, and a spacious interior make it an enduring companion.',
    specifications: 'Full-grain leather · Suede lining · Reinforced handles · One size'
  },
  {
    id: 3,
    name: 'Minimalist Suede Chelsea Boots',
    category: 'Footwear',
    price: 395,
    quantity: 12,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85',
    badge: 'Limited Edition',
    description: 'Refined Chelsea boots with a supple suede upper, elastic side panels, and a balanced silhouette that works from weekday to weekend.',
    specifications: 'Suede upper · Elastic side gussets · Stacked heel · EU 38–42'
  },
  {
    id: 4,
    name: 'Hand-Blown Amber Glass Carafe',
    category: 'Home',
    price: 165,
    quantity: 3,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1615873968403-89e0676297c5?auto=format&fit=crop&w=900&q=85',
    badge: 'Artisan',
    description: 'A sculptural glass carafe with warm amber tones. Each piece brings a subtle handmade character to a considered table setting.',
    specifications: 'Hand-blown glass · 1.2 litre capacity · Hand wash recommended'
  },
  {
    id: 5,
    name: 'Tailored Wool Blend Trench Coat',
    category: 'Apparel',
    price: 620,
    quantity: 7,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85',
    badge: 'Classic',
    description: 'An elegant take on the classic trench, tailored with a clean shape, a self-tie belt, and thoughtful details for cooler days.',
    specifications: 'Wool blend · Belted waist · Button fastening · Sizes XS–L'
  },
  {
    id: 6,
    name: 'Pure Silk Twill Scarf',
    category: 'Accessories',
    price: 145,
    quantity: 15,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=85',
    badge: '',
    description: 'A versatile silk scarf finished with delicate edges and an archival-inspired print. Wear it at the neck, in your hair, or on a bag.',
    specifications: '100% silk · Twill weave · Hand-rolled edges · 90 × 90 cm'
  },
  {
    id: 7,
    name: 'Classic Leather Loafers',
    category: 'Footwear',
    price: 310,
    quantity: 2,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1533867617858-e7d97e06050e?auto=format&fit=crop&w=900&q=85',
    badge: 'Essential',
    description: 'Polished leather loafers with a timeless profile and a cushioned insole. Designed to pair with tailored and relaxed looks alike.',
    specifications: 'Leather upper · Cushioned insole · Rubber sole · EU 37–41'
  },
  {
    id: 8,
    name: 'Scented Soy Wax Pillar Candle',
    category: 'Home',
    price: 68,
    quantity: 20,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85',
    badge: 'Organic',
    description: 'A softly scented candle with notes of cedarwood, amber, and vetiver. Hand-poured to bring a calm finishing touch to your space.',
    specifications: 'Plant-based wax · 350 g · Approx. 60-hour burn time'
  }
];

const categories = ['All', 'Apparel', 'Accessories', 'Footwear', 'Home'];
const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

function App() {
  const [products, setProducts] = useState(starterProducts);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [drawer, setDrawer] = useState('');
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    if (sort === 'low-high') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high-low') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, category, sort, search]);

  const inventoryValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lowStockCount = products.filter((product) => product.quantity < 5).length;

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2800);
  }

  function addToCart(product) {
    if (product.quantity < 1) {
      notify('This product is out of stock.');
      return;
    }
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        if (found.quantity >= product.quantity) {
          notify('You have reached the available stock.');
          return current;
        }
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
    notify(`Added ${product.name} to your bag.`);
  }

  function changeCartQuantity(id, amount) {
    setCart((current) => current.map((item) => {
      if (item.id !== id) return item;
      const product = products.find((entry) => entry.id === id);
      return { ...item, quantity: Math.min(product?.quantity ?? item.quantity, item.quantity + amount) };
    }).filter((item) => item.quantity > 0));
  }

  function toggleWishlist(product) {
    const exists = wishlist.some((item) => item.id === product.id);
    setWishlist((current) => exists ? current.filter((item) => item.id !== product.id) : [...current, product]);
    notify(exists ? 'Removed from your wishlist.' : 'Added to your wishlist.');
  }

  function addProduct(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim();
    const image = String(data.get('image')).trim();
    const description = String(data.get('description')).trim();
    const specifications = String(data.get('specifications')).trim();
    const price = Number(data.get('price'));
    const quantity = Number(data.get('quantity'));
    const rating = Number(data.get('rating'));
    if (!name || !image || !description || !specifications || !data.get('category') || !data.get('rating') || !data.get('price') || !data.get('quantity')) {
      notify('Please complete every field.');
      return;
    }
    if (!Number.isFinite(price) || price <= 0 || !Number.isInteger(quantity) || quantity < 0 || rating < 1 || rating > 5) {
      notify('Check the price, quantity, and rating values.');
      return;
    }
    const product = {
      id: Date.now(), name, image, description, specifications,
      category: String(data.get('category')), price, quantity, rating,
      badge: quantity < 5 ? 'Low Stock' : 'New Arrival'
    };
    setProducts((current) => [product, ...current]);
    setCategory('All');
    setSearch('');
    setShowAddForm(false);
    event.currentTarget.reset();
    notify('Product added to your collection.');
  }

  return (
    <div className="site-shell">
      <div className="announcement">Complimentary shipping on orders over $250 <span>•</span> Discover the Autumn / Winter Edit</div>
      <header className="site-header">
        <div className="nav-wrap">
          <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu size={21} /></button>
          <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`}>
            <button onClick={() => { setCategory('All'); setMobileMenu(false); }}>New Arrivals</button>
            {categories.slice(1).map((item) => <button key={item} onClick={() => { setCategory(item); setMobileMenu(false); }}>{item === 'Home' ? 'Living' : item}</button>)}
          </nav>
          <a className="brand" href="#top" onClick={() => { setCategory('All'); setSearch(''); }}><span>Aurelia <i>&</i> Co.</span><small>PRODUCT MANAGEMENT</small></a>
          <div className="nav-actions">
            <button className="icon-button" onClick={() => setShowSearch(!showSearch)} aria-label="Search"><Search size={19} /></button>
            <button className="icon-button wishlist-action" onClick={() => setDrawer('wishlist')} aria-label="Open wishlist"><Heart size={19} /><span className="count-badge">{wishlist.length}</span></button>
            <button className="icon-button" onClick={() => setDrawer('cart')} aria-label="Open cart"><ShoppingBag size={19} /><span className="count-badge dark">{cartCount}</span></button>
          </div>
        </div>
        {showSearch && <div className="search-strip"><Search size={18} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or categories..." /><button className="icon-button" onClick={() => { setSearch(''); setShowSearch(false); }} aria-label="Close search"><X size={18} /></button></div>}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={13} /> AUTUMN / WINTER COLLECTION</span>
            <h1>Elegance in<br /><em>Every Detail</em></h1>
            <p>Discover thoughtfully crafted essentials and timeless pieces designed for modern living and lasting grace.</p>
            <div className="hero-buttons"><a className="button button-dark" href="#collection">Explore Collection <ArrowUpRight size={16} /></a><button className="button button-outline" onClick={() => { setCategory('Accessories'); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); }}>Shop Accessories</button></div>
            <div className="hero-note"><span className="note-icon"><Leaf size={20} /></span><span><b>Considered by design</b><small>Quality pieces, selected with care.</small></span></div>
          </div>
          <div className="hero-visual"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90" alt="Neutral fashion collection" /><div className="image-caption"><span>01 / THE EDIT</span><b>Quiet luxury, everyday.</b></div></div>
          <div className="hero-index">AURELIA JOURNAL <span>—</span> VOL. 01</div>
        </section>

        <section className="collection section-wrap" id="collection">
          <div className="section-top"><div><span className="eyebrow">CURATED SELECTION</span><h2>The Collection</h2><p>Thoughtful details. Pieces to keep.</p></div><button className="button button-outline add-product-top" onClick={() => setShowAddForm(true)}><Plus size={16} /> Add Product</button></div>
          <div className="collection-toolbar"><div className="category-tabs" aria-label="Filter by category">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item === 'All' ? 'All Items' : item === 'Home' ? 'Living' : item}</button>)}</div><label className="sort-control"><SlidersHorizontal size={14} /><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low-high">Price: Low to High</option><option value="high-low">Price: High to Low</option></select></label></div>
          <div className="result-line"><span>{filteredProducts.length} pieces in the collection</span><span>{lowStockCount > 0 ? `${lowStockCount} items running low` : 'All stock levels healthy'}</span></div>
          {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}>
            <div className="product-image-wrap"><button className="image-click" onClick={() => setSelectedProduct(product)} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.src = 'https://placehold.co/800x1000/E6DDD3/3D3833?text=Aurelia+%26+Co.'; }} /></button>{product.badge && <span className={`product-badge ${product.quantity < 5 ? 'low-stock-badge' : ''}`}>{product.quantity < 5 ? 'Low Stock' : product.badge}</span>}<button className={`heart-button ${wishlist.some((item) => item.id === product.id) ? 'hearted' : ''}`} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist"><Heart size={17} fill={wishlist.some((item) => item.id === product.id) ? 'currentColor' : 'none'} /></button><button className="quick-view" onClick={() => setSelectedProduct(product)}>Quick view <ArrowUpRight size={14} /></button></div>
            <div className="product-info"><div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating.toFixed(1)}</span></div><button className="product-title" onClick={() => setSelectedProduct(product)}>{product.name}</button><div className="product-bottom"><span className="price">{money(product.price)} <small>each</small></span><span className="stock-text">Qty: {product.quantity} {product.quantity < 5 ? '· Low stock' : '· In stock'}</span></div><div className="product-subtotal"><span>Inventory subtotal</span><strong>{money(product.price * product.quantity)}</strong></div><button className="add-to-bag" disabled={product.quantity === 0} onClick={() => addToCart(product)}><ShoppingBag size={14} /> {product.quantity === 0 ? 'Out of stock' : 'Add to bag'}</button></div>
          </article>)}</div> : <div className="empty-state"><Package size={32} /><h3>No pieces found</h3><p>Try another category or search term.</p><button className="button button-dark" onClick={() => { setCategory('All'); setSearch(''); }}>Reset filters</button></div>}
        </section>

        <section className="add-section"><div className="add-section-copy"><span className="eyebrow">INVENTORY STUDIO</span><h2>Every piece,<br /><em>thoughtfully managed.</em></h2><p>Add a new product to your collection and keep your inventory up to date. Your totals update automatically.</p><button className="button button-light" onClick={() => setShowAddForm(true)}><Plus size={16} /> Add a new product</button></div><div className="inventory-stats"><div><span>Products listed</span><strong>{products.length.toString().padStart(2, '0')}</strong></div><div><span>Inventory value</span><strong>{money(inventoryValue)}</strong></div><div><span>Low-stock products</span><strong>{lowStockCount.toString().padStart(2, '0')}</strong></div><p><ShieldCheck size={16} /> Live inventory summary</p></div></section>

        <section className="philosophy"><span className="eyebrow">OUR PHILOSOPHY</span><h2>“Simplicity is the<br /><em>ultimate sophistication.</em>”</h2><p>We believe in creating enduring pieces that transcend passing trends. Every detail is chosen with care, purpose, and a respect for quality.</p><div className="philosophy-rule"><span></span><Sparkles size={16} /><span></span></div></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="brand footer-logo" href="#top">Aurelia <i>&</i> Co.</a><p>Refined essentials and considered details for everyday living.</p><span className="footer-mark">A / C</span></div><div><h4>Explore</h4><a href="#collection" onClick={() => setCategory('All')}>All products</a><a href="#collection" onClick={() => setCategory('Apparel')}>Apparel</a><a href="#collection" onClick={() => setCategory('Accessories')}>Accessories</a><a href="#collection" onClick={() => setCategory('Footwear')}>Footwear</a></div><div><h4>Your account</h4><button onClick={() => setDrawer('cart')}>Shopping bag ({cartCount})</button><button onClick={() => setDrawer('wishlist')}>Wishlist ({wishlist.length})</button><button onClick={() => setShowAddForm(true)}>Add a product</button></div><div><h4>Inventory overview</h4><p>{products.length} products in your collection.</p><p>Total inventory value: <b>{money(inventoryValue)}</b></p><p>{lowStockCount} products have low stock.</p></div></div><div className="footer-bottom"><span>© 2026 Aurelia & Co. Product Management App</span><span>CRAFTED WITH CARE <i>✳</i></span></div></footer>

      {showAddForm && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddForm(false); }}><section className="form-modal modal-card"><div className="modal-heading"><div><span className="eyebrow">INVENTORY STUDIO</span><h2>Add a product</h2><p>Complete all fields to add a new piece.</p></div><button className="icon-button" onClick={() => setShowAddForm(false)} aria-label="Close form"><X /></button></div><form className="product-form" onSubmit={addProduct}><label className="full-field">Product name<input name="name" required placeholder="e.g. Linen Everyday Shirt" /></label><label>Category<select name="category" required defaultValue=""><option value="" disabled>Select category</option>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label><label>Feature image URL<input name="image" type="url" required placeholder="https://example.com/image.jpg" /></label><label>Description<textarea name="description" required rows="3" placeholder="Describe the product..." /></label><label>Product specifications<textarea name="specifications" required rows="2" placeholder="Materials, size, dimensions..." /></label><div className="form-row"><label>Rating (1–5)<input name="rating" type="number" required min="1" max="5" step="0.1" placeholder="4.8" /></label><label>Price (USD)<input name="price" type="number" required min="0.01" step="0.01" placeholder="125.00" /></label><label>Quantity<input name="quantity" type="number" required min="0" step="1" placeholder="10" /></label></div><div className="form-note"><ImagePlus size={16} /> Use a direct image URL. Products with fewer than 5 units are marked Low Stock.</div><div className="form-actions"><button type="button" className="button button-outline" onClick={() => setShowAddForm(false)}>Cancel</button><button type="submit" className="button button-dark"><Plus size={16} /> Save product</button></div></form></section></div>}

      {selectedProduct && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}><section className="detail-modal modal-card"><button className="modal-close icon-button" onClick={() => setSelectedProduct(null)} aria-label="Close details"><X /></button><div className="detail-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div><div className="detail-copy"><span className="eyebrow">{selectedProduct.category.toUpperCase()} / PRODUCT DETAILS</span><h2>{selectedProduct.name}</h2><div className="detail-rating"><Star size={14} fill="currentColor" /> {selectedProduct.rating.toFixed(1)} <span>Customer rating</span></div><strong className="detail-price">{money(selectedProduct.price)}</strong><p>{selectedProduct.description}</p><div className="spec-box"><span>SPECIFICATIONS</span><p>{selectedProduct.specifications}</p></div><div className="detail-stock"><span>Availability</span><b className={selectedProduct.quantity < 5 ? 'low-stock-text' : ''}>{selectedProduct.quantity < 5 ? `Only ${selectedProduct.quantity} left in stock` : `${selectedProduct.quantity} available`}</b></div><button className="button button-dark detail-add" disabled={selectedProduct.quantity === 0} onClick={() => addToCart(selectedProduct)}><ShoppingBag size={16} /> Add to bag</button><button className="detail-wishlist" onClick={() => toggleWishlist(selectedProduct)}><Heart size={15} /> {wishlist.some((item) => item.id === selectedProduct.id) ? 'Remove from wishlist' : 'Add to wishlist'}</button></div></section></div>}

      {drawer && <div className="drawer-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrawer(''); }}><aside className="drawer"><div className="drawer-header"><div><span className="eyebrow">AURELIA & CO.</span><h2>{drawer === 'cart' ? 'Your shopping bag' : 'Your wishlist'}</h2></div><button className="icon-button" onClick={() => setDrawer('')} aria-label="Close drawer"><X /></button></div><div className="drawer-items">{(drawer === 'cart' ? cart : wishlist).length === 0 ? <div className="drawer-empty"><ShoppingBag size={32} /><h3>{drawer === 'cart' ? 'Your bag is empty' : 'Your wishlist is empty'}</h3><p>Discover the collection and find a piece you love.</p><button className="button button-dark" onClick={() => setDrawer('')}>Explore collection</button></div> : (drawer === 'cart' ? cart : wishlist).map((item) => <div className="drawer-item" key={item.id}><img src={item.image} alt={item.name} /><div className="drawer-item-info"><span className="eyebrow">{item.category}</span><h3>{item.name}</h3><b>{money(item.price)}</b>{drawer === 'cart' ? <div className="quantity-control"><button onClick={() => changeCartQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeCartQuantity(item.id, 1)} aria-label="Increase quantity" disabled={item.quantity >= (products.find((p) => p.id === item.id)?.quantity ?? item.quantity)}><Plus size={13} /></button><button className="remove-item" onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))}><Trash2 size={14} /> Remove</button></div> : <button className="text-action" onClick={() => { addToCart(item); setDrawer('cart'); }}>Move to bag <ChevronRight size={14} /></button>}</div></div>)}</div>{drawer === 'cart' && <div className="drawer-footer"><div className="subtotal-row"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="button button-dark checkout-button" disabled={!cart.length} onClick={() => { setCart([]); setDrawer(''); notify('Demo checkout complete. Thank you for exploring Aurelia & Co.'); }}><Check size={16} /> Complete demo checkout</button><small>This is a classroom demo. No payment will be collected.</small></div>}</aside></div>}

      {notice && <div className="toast"><Check size={16} /><span>{notice}</span></div>}
    </div>
  );
}

export default App;

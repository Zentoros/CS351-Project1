import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Plus, Minus, Trash2, Check, SlidersHorizontal } from 'lucide-react';
import products from './data/products.json';
import { ProductList, money } from './components/Products';
import { validateAccount, states } from './utils/validation';
const categories = ['Running', 'Basketball', 'Cleats', 'Tennis', 'Training'];
function useRoute() {
  const [route, setRoute] = useState(location.hash.slice(1) || '/');
  useEffect(() => {
    const go = () => {
      setRoute(location.hash.slice(1) || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', go);
    return () => window.removeEventListener('hashchange', go);
  }, []);
  return route;
}
function Navbar({
  count,
  route
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  return <><div className="announcement">FOR THE EVERYDAY ATHLETE. FOR THE EXTRAORDINARY GOALS.</div><header className="navbar navbar-expand-lg"><div className="container-fluid shell"><a className="brand" href="#/"><span className="brand-icon"><img className="brand-mark" src="/images/ag-logo.png" alt="" /></span><span>AWRECKING<br />GOALS<span className="brand-period">.</span></span></a><button className="nav-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation"><a className={route === '/' ? 'active' : ''} href="#/">Home</a><a className={route.startsWith('/shop') || route.startsWith('/product') ? 'active' : ''} href="#/shop">Shop</a><a href="#/shop?audience=Women">Women</a><a href="#/shop?audience=Men">Men</a><a href="#/shop?category=Cleats">Cleats</a><a className={route.includes('account') ? 'active' : ''} href="#/account">Account</a><a className={`cart-link ${route === '/cart' ? 'active' : ''}`} href="#/cart"><ShoppingBag size={19} /> Cart <span>{count}</span></a></nav></div></header></>;
}
function Footer() {
  return <footer><div className="shell footer-top"><a className="footer-brand" href="#/"><img className="footer-mark" src="/images/ag-logo.png" alt="" />AWRECKING GOALS.</a><p>Whatever your sport. Make your next move.</p><nav aria-label="Footer navigation"><a href="#/shop">Shop</a><a href="#/shop?category=Cleats">Cleats</a><a href="#/account">Account</a><a href="#/cart">Cart</a></nav></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Awrecking Goals</span><span>Fictitious student storefront · No real orders or payments</span></div></footer>;
}
function HomeView() {
  return <><section className="hero"><div className="hero-copy"><div className="eyebrow"><span /> BUILT FOR YOUR NEXT PERSONAL BEST</div><h1>LESS TALK.<br />MORE <em>GOALS.</em></h1><p>The early starts. The extra reps. The final whistle.<br />Find the footwear that keeps you moving.</p><div className="hero-actions"><a className="button gold" href="#/shop?audience=Women">Shop women</a><a className="button hero-outline" href="#/shop?audience=Men">Shop men</a></div><div className="hero-note">YOUR SPORT. YOUR PACE. YOUR NEXT CHAPTER.</div></div><div className="hero-photo"><img src="/images/runner-v2.jpg" alt="A woman and a man running side by side on an outdoor track" /><div className="photo-label">01 / EVERY ATHLETE. EVERY GOAL.</div></div></section><div className="sport-strip"><div className="shell">{categories.map((c, i) => <a href={`#/shop?category=${c}`} key={c}><span className="strip-number">0{i + 1}</span>{c.toUpperCase()}<span className="strip-slash">/</span></a>)}</div></div><section className="shell section"><div className="section-heading"><div><p className="eyebrow dark">THE STARTING LINEUP</p><h2>Your next go-to.</h2></div><a className="text-link" href="#/shop">Shop all 25 styles</a></div><ProductList products={products.filter(p => p.featuredProduct).slice(0, 4)} /></section><section className="manifesto shell"><span className="eyebrow dark">PROGRESS OVER PERFECTION</span><h2>You don't need to be a pro.<br />You just need to show up.</h2><a className="button red" href="#/shop?category=Training">Find your training shoes</a></section></>;
}
function ShopView({
  route
}) {
  const param = new URLSearchParams(route.split('?')[1]);
  const requestedCategory = param.get('category') === 'Soccer' ? 'Cleats' : param.get('category');
  const category = categories.includes(requestedCategory) ? requestedCategory : 'All';
  const audience = ['Women', 'Men'].includes(param.get('audience')) ? param.get('audience') : 'All';
  const [sort, setSort] = useState('featured');
  const link = (c, a) => {
    const q = new URLSearchParams();
    if (c !== 'All') q.set('category', c);
    if (a !== 'All') q.set('audience', a);
    return '#/shop' + (q.size ? '?' + q.toString() : '');
  };
  let list = products.filter(p => (category === 'All' || p.category === category) && (audience === 'All' || p.gender === audience + "'s" || p.gender === 'Unisex'));
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  return <main className="shell section"><p className="eyebrow dark">GEAR UP. GET AFTER IT.</p><h1 className="page-title">{audience === 'All' ? category === 'All' ? 'The collection.' : category + '.' : audience + "'s collection."}</h1><p className="intro">Original athletic footwear for every way you move.</p><nav className="audience-tabs" aria-label="Shop women and men">{['All', 'Women', 'Men'].map(a => <a key={a} className={a === audience ? 'selected' : ''} aria-current={a === audience ? 'page' : undefined} href={link(category, a)}>{a === 'All' ? 'Everyone' : a}</a>)}</nav><div className="shop-controls"><nav className="category-tabs" aria-label="Product categories">{['All', ...categories].map(c => <a key={c} className={c === category ? 'selected' : ''} aria-current={c === category ? 'page' : undefined} href={link(c, audience)}>{c === 'All' ? 'All sports' : c}</a>)}</nav><label className="sort"><SlidersHorizontal size={16} /><span className="visually-hidden">Sort products</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><p className="result-count">{list.length} styles{audience !== 'All' && list.some(p => p.gender === 'Unisex') ? ' · Includes our shared unisex style' : ''}</p>{list.length ? <ProductList products={list} /> : <div className="empty-state"><h2>No styles in this selection.</h2><a className="button red" href="#/shop">View all styles</a></div>}</main>;
}
function ProductDetailView({
  product,
  onAdd
}) {
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  function add(e) {
    e.preventDefault();
    setAdded(false);
    if (!product.sizes.includes(size) || !product.colors.includes(color)) {
      setError('Choose a size and color before adding to your bag.');
      return;
    }
    const n = Number(quantity);
    if (!Number.isInteger(n) || n < 1 || n > product.quantityInStock) {
      setError(`Enter a whole quantity between 1 and ${product.quantityInStock}.`);
      return;
    }
    try {
      onAdd(product, size, color, n);
      setError('');
      setAdded(true);
    } catch (err) {
      setError(err.message);
    }
  }
  return <main className="shell section"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="#/shop">Shop</a><span>/</span><a href={`#/shop?category=${product.category}`}>{product.category}</a><span>/</span><span>{product.name}</span></nav><div className="row g-5 detail"><div className="col-md-7"><div className="detail-image"><img src={product.image} alt={product.imageAlt} /></div><p className="image-note">Original AI-generated design. Shown in {product.colors[0]}.</p></div><div className="col-md-5"><p className="eyebrow dark">{product.category} / {product.gender.toUpperCase()}</p><h1>{product.name}</h1><p className="rating">★ {product.rating} <span>({product.numberOfReviews} reviews)</span></p><p className="detail-price">{money(product.price)}</p><p>{product.longDescription}</p><form onSubmit={add} noValidate><fieldset><legend>Color <span>— {color || 'Select a color'}</span></legend><div className="option-buttons">{product.colors.map(c => <button type="button" key={c} aria-pressed={color === c} className={color === c ? 'chosen' : ''} onClick={() => {
                setColor(c);
                setAdded(false);
              }}>{c}</button>)}</div></fieldset><fieldset><legend>Size <span>— {product.sizeSystem}</span></legend><div className="option-buttons sizes">{product.sizes.map(s => <button type="button" key={s} aria-pressed={size === s} className={size === s ? 'chosen' : ''} onClick={() => {
                setSize(s);
                setAdded(false);
              }}>{s}</button>)}</div></fieldset><label className="quantity-label" htmlFor="quantity">Quantity <input id="quantity" type="number" min="1" max={product.quantityInStock} step="1" value={quantity} onChange={e => {
              setQuantity(e.target.value);
              setAdded(false);
            }} /></label>{error && <p className="error" role="alert">{error}</p>}<button className="button red wide" type="submit"><ShoppingBag size={19} /> Add to cart · {money(product.price * (Number(quantity) || 1))}</button>{added && <p className="success" role="status"><Check size={18} /> Added to your cart. <a href="#/cart">View cart</a></p>}</form><p className="stock">{product.quantityInStock} in stock · Complimentary shipping</p><div className="specs"><h2>The details</h2><dl>{[['Collection', product.gender], ['Sizing', product.sizeSystem], ['Material', product.material], ['Weight', product.weight], ['Heel drop', product.heelDrop], ['Arch support', product.archSupport], ['Water resistant', product.waterResistant ? 'Yes' : 'No'], ['SKU', product.sku]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><ul>{product.features.map(f => <li key={f}>{f}</li>)}</ul><h3>Care</h3><p>{product.care}</p></div></div></div></main>;
}
export function CartItem({
  item,
  onQuantity,
  onRemove
}) {
  const [error, setError] = useState('');
  const max = products.find(p => p.id === item.productId).quantityInStock;
  function change(n) {
    if (!Number.isInteger(n) || n < 1 || n > max) {
      setError(`Choose 1–${max} items.`);
      return;
    }
    setError('');
    onQuantity(item.key, n);
  }
  return <article className="cart-item"><a href={`#/product/${item.productId}`}><img src={item.image} alt={item.name} /></a><div className="cart-item-main"><span className="eyebrow dark">{item.category}</span><a href={`#/product/${item.productId}`}><h2>{item.name}</h2></a><p>{item.sizeSystem} {item.size} · {item.color}</p><span>{money(item.unitPrice)} each</span><div className="cart-item-controls"><div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => change(item.quantity - 1)}><Minus size={15} /></button><input aria-label={`${item.name} quantity`} type="number" min="1" max={max} value={item.quantity} onChange={e => change(Number(e.target.value))} /><button aria-label={`Increase ${item.name} quantity`} disabled={item.quantity >= max} onClick={() => change(item.quantity + 1)}><Plus size={15} /></button></div><button className="remove-button" onClick={() => onRemove(item.key)}><Trash2 size={16} />Remove</button></div>{error && <p className="error" role="alert">{error}</p>}</div><strong>{money(item.unitPrice * item.quantity)}</strong></article>;
}
export function Cart({
  cartItems,
  onQuantity,
  onRemove
}) {
  const count = cartItems.reduce((n, i) => n + i.quantity, 0),
    subtotal = cartItems.reduce((n, i) => n + i.quantity * i.unitPrice, 0);
  return <main className="shell section"><p className="eyebrow dark">READY FOR YOUR NEXT MOVE</p><h1 className="page-title">Your cart<span className="gold-text">.</span></h1>{!count ? <div className="empty-state"><ShoppingBag size={50} /><h2>Your starting lineup is empty.</h2><p>Find your next pair and make it yours.</p><a className="button red" href="#/shop">Explore the collection</a></div> : <div className="row g-5"><div className="col-lg-8"><p className="result-count">{count} {count === 1 ? 'item' : 'items'}</p>{cartItems.map(item => <CartItem key={item.key} item={item} onQuantity={onQuantity} onRemove={onRemove} />)}</div><div className="col-lg-4"><aside className="cart-summary"><h2>The rundown</h2><div><span>Subtotal ({count} items)</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><span>Complimentary</span></div><div className="summary-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>This is a demo store. Checkout and payment processing are not available.</p><a className="button red wide" href="#/shop">Keep shopping</a></aside></div></div>}</main>;
}
function AccountView() {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);
  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!values.username.trim()) er.username = 'Enter your username.';
    if (!values.password) er.password = 'Enter your password.';
    setErrors(er);
    setValid(!Object.keys(er).length);
  }
  return <main className="shell section account-layout"><div><p className="eyebrow dark">YOUR NEXT CHAPTER</p><h1 className="page-title">Back for<br />more<span className="gold-text">?</span></h1><p>One goal down. Plenty more to go.</p></div><div className="form-panel"><h2>Sign in</h2><p className="muted">Demo form — no account authentication is connected.</p><form noValidate onSubmit={submit}>{['username', 'password'].map(k => <Field key={k} name={k} label={k === 'username' ? 'Username' : 'Password'} type={k === 'password' ? 'password' : 'text'} value={values[k]} error={errors[k]} autoComplete={k === 'password' ? 'current-password' : 'username'} onChange={e => {
          setValues({
            ...values,
            [k]: e.target.value
          });
          setValid(false);
        }} />)}<button className="button red wide">Sign in</button>{valid && <p role="status" className="success">Your form is valid. This student demo does not log you in or save credentials.</p>}</form><p className="form-switch">New to the team? <a href="#/create-account">Create an account</a></p></div></main>;
}
function Field({
  name,
  label,
  error,
  ...props
}) {
  return <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} className={`form-control ${error ? 'is-invalid' : ''}`} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} {...props} />{error && <p className="error" id={`${name}-error`}>{error}</p>}</div>;
}
function CreateAccountView() {
  const empty = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  };
  const [v, setV] = useState(empty),
    [errors, setErrors] = useState({}),
    [success, setSuccess] = useState(false);
  const change = k => e => {
    setV({
      ...v,
      [k]: e.target.value
    });
    setSuccess(false);
  };
  function submit(e) {
    e.preventDefault();
    const er = validateAccount(v);
    setErrors(er);
    setSuccess(!Object.keys(er).length);
    if (Object.keys(er).length) setTimeout(() => document.getElementById(Object.keys(er)[0])?.focus(), 0);else setV({
      ...v,
      password: '',
      confirm: ''
    });
  }
  return <main className="shell section account-layout"><div><p className="eyebrow dark">EVERY GOAL STARTS SOMEWHERE</p><h1 className="page-title">Join the<br />lineup<span className="gold-text">.</span></h1><p>Make your next move with Awrecking Goals.</p></div><div className="form-panel"><h2>Create an account</h2><p className="muted">Required fields are marked *. Demo only; details are not saved.</p><form noValidate onSubmit={submit}>{Object.keys(errors).length > 0 && <p className="error" role="alert">Please correct the highlighted fields.</p>}<Field name="username" label="Username *" required value={v.username} onChange={change('username')} error={errors.username} autoComplete="username" /><Field name="email" label="Email *" required type="email" value={v.email} onChange={change('email')} error={errors.email} autoComplete="email" /><Field name="password" label="Password *" required type="password" value={v.password} onChange={change('password')} error={errors.password} autoComplete="new-password" /><p className="field-hint">8+ characters, including an uppercase letter, lowercase letter and number.</p><Field name="confirm" label="Confirm password *" required type="password" value={v.confirm} onChange={change('confirm')} error={errors.confirm} autoComplete="new-password" /><h3 className="optional-title">Shipping details <span>Optional</span></h3><p className="muted">If you add an address, complete all four address fields.</p><Field name="street" label="Street address" value={v.street} onChange={change('street')} error={errors.street} autoComplete="street-address" /><Field name="city" label="City" value={v.city} onChange={change('city')} error={errors.city} autoComplete="address-level2" /><div className="row"><div className="col-sm-6 field"><label htmlFor="state">State</label><select id="state" className={`form-select ${errors.state ? 'is-invalid' : ''}`} value={v.state} onChange={change('state')} aria-invalid={!!errors.state} aria-describedby={errors.state ? 'state-error' : undefined}><option value="">Select state</option>{states.map(s => <option key={s}>{s}</option>)}</select>{errors.state && <p className="error" id="state-error">{errors.state}</p>}</div><div className="col-sm-6"><Field name="zip" label="ZIP code" value={v.zip} onChange={change('zip')} error={errors.zip} autoComplete="postal-code" /></div></div><Field name="phone" label="Phone number" type="tel" value={v.phone} onChange={change('phone')} error={errors.phone} autoComplete="tel" /><button className="button red wide">Create account</button>{success && <p className="success" role="status"><Check size={18} /> All fields passed validation. This demo does not create or store a real account.</p>}</form><p className="form-switch">Already on the team? <a href="#/account">Sign in</a></p></div></main>;
}
export default function App() {
  const route = useRoute(),
    [cart, setCart] = useState([]);
  function add(p, size, color, quantity) {
    const key = `${p.id}:${size}:${color}`;
    const existing = cart.find(i => i.key === key);
    if ((existing?.quantity || 0) + quantity > p.quantityInStock) throw Error(`Only ${p.quantityInStock} available for this selection.`);
    setCart(items => existing ? items.map(i => i.key === key ? {
      ...i,
      quantity: i.quantity + quantity
    } : i) : [...items, {
      key,
      productId: p.id,
      name: p.name,
      image: p.image,
      category: p.category,
      size,
      color,
      quantity,
      gender: p.gender,
      sizeSystem: p.sizeSystem,
      unitPrice: p.price
    }]);
  }
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  useEffect(() => {
    const ctx = document.modelContext;
    if (!ctx?.registerTool) return;
    const controller = new AbortController();
    try {
      Promise.resolve(ctx.registerTool({
        name: 'read_product_catalog',
        description: 'Read the sports shoe catalog and its selectable sizes and colors.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        },
        annotations: {
          readOnlyHint: true
        },
        execute: () => ({
          products: products.map(({
            id,
            name,
            category,
            price,
            sizes,
            colors
          }) => ({
            id,
            name,
            category,
            price,
            sizes,
            colors
          }))
        })
      }, {
        signal: controller.signal
      })).catch(() => {});
    } catch {}
    return () => controller.abort();
  }, []);
  let view;
  if (route === '/') view = <HomeView />;else if (route.startsWith('/shop')) view = <ShopView route={route} />;else if (route.startsWith('/product/')) {
    const p = products.find(p => p.id === Number(route.split('/')[2]));
    view = p ? <ProductDetailView key={p.id} product={p} onAdd={add} /> : <main className="shell section"><h1>Product not found</h1><a href="#/shop">Return to shop</a></main>;
  } else if (route === '/account') view = <AccountView />;else if (route === '/create-account') view = <CreateAccountView />;else if (route === '/cart') view = <Cart cartItems={cart} onQuantity={(key, n) => setCart(items => items.map(i => i.key === key ? {
    ...i,
    quantity: n
  } : i))} onRemove={key => setCart(items => items.filter(i => i.key !== key))} />;else view = <main className="shell section"><h1>Page not found</h1><a href="#/">Go home</a></main>;
  return <><a className="skip-link" href="#main-content" onClick={e => {
      e.preventDefault();
      document.getElementById("main-content")?.focus();
    }}>Skip to content</a><Navbar route={route} count={count} /><div id="main-content" tabIndex="-1">{view}</div><Footer /></>;
}

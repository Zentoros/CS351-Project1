import React from 'react';
export const money = n => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(n);
export function ProductCard({
  product
}) {
  return <a className="product-card" href={`#/product/${product.id}`}><div className="product-image"><img src={product.image} alt={product.imageAlt} loading="lazy" />{product.newArrival && <span className="product-tag">NEW</span>}</div><div className="product-meta"><span>{product.category}</span><span>★ {product.rating.toFixed(1)}</span></div><div className="product-title"><h3>{product.name}</h3><strong>{money(product.price)}</strong></div><p>{product.description}</p><span className="product-options">{product.gender} · {product.colors[0]}</span></a>;
}
export function ProductList({
  products
}) {
  return <div className="row g-4">{products.map(p => <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={p.id}><ProductCard product={p} /></div>)}</div>;
}

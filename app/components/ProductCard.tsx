import Link from "next/link";
import type { Product } from "../data/products";

interface ProductCardProps { product: Product }

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="product-card" href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
      <div className="card-art" style={{ backgroundColor: product.accent }}>
        <div className="card-orb" aria-hidden="true" />
        <span className="card-art-emoji" aria-hidden="true">{product.emoji}</span>
        <span className="card-art-tag">SHIPYARD / EDITION 01</span>
      </div>
      <div className="card-info">
        <span className="eyebrow category">{product.category}</span>
        <div className="card-title-row">
          <h3>{product.name}</h3>
          <span className="card-arrow" aria-hidden="true">↗</span>
        </div>
        <p>{product.tagline}</p>
        <span className="price">${product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}

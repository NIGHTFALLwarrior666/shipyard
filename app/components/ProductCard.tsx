import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "../data/products";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="v2-product-card"
      aria-label={`View ${product.name} details`}
      style={{ "--card-accent": product.accent } as CSSProperties}
    >
      <div className="v2-product-image">
        <span className="v2-product-number">{String(index + 1).padStart(2, "0")} / 08</span>
        <span className="v2-product-circle" aria-hidden="true" />
        <Image
          src={product.image}
          alt={`${product.name} product illustration`}
          width={800}
          height={600}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          className="v2-card-product"
        />
        <span className="v2-product-view" aria-hidden="true">VIEW PRODUCT <span>↗</span></span>
      </div>
      <div className="v2-product-text">
        <div className="v2-product-meta"><span>{product.category}</span><span>SHIPYARD™ / 026</span></div>
        <div className="v2-product-name"><h3>{product.name}</h3><span className="v2-product-arrow" aria-hidden="true">↗</span></div>
        <p>{product.tagline}</p>
        <span className="v2-product-price">${product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LazyComparison from "../../components/LazyComparison";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../data/products";

type ProductPageProps = { params: Promise<{ id: string }> };

/** Pre-render all eight product pages at build time. */
export function generateStaticParams(): { id: string }[] {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? `${product.name} — ShipYard` : "Product not found — ShipYard", description: product?.description ?? "Discover the ShipYard catalog." };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <header className="site-header"><div className="container nav-inner"><Link className="wordmark" href="/"><span className="logo-mark" aria-hidden="true">S</span> SHIPYARD<span className="wordmark-dot">.</span></Link><Link className="top-back" href="/">← All products</Link><span className="nav-edition">COLLECTION / 001</span></div></header>
      <main className="container detail-main">
        <Link href="/" className="breadcrumb">COLLECTION <span>/</span> {product.category.toUpperCase()} <span>/</span> {product.name.toUpperCase()}</Link>
        <article className="detail-layout">
          <div className="detail-art" style={{ backgroundColor: product.accent }}><span className="detail-art-ring" aria-hidden="true" /><Image src={product.image} alt={`${product.name} product illustration`} width={800} height={600} sizes="(max-width: 740px) 100vw, 55vw" className="detail-product-image" priority /><span className="detail-art-caption">DESIGNED FOR YOUR NEXT CHAPTER</span></div>
          <div className="detail-content"><span className="eyebrow"><span className="live-dot" /> {product.category.toUpperCase()} / COLLECTION 001</span><h1>{product.name}</h1><p className="detail-tagline">{product.tagline}</p><p className="detail-price">${product.price.toFixed(2)}</p><hr /><h2>THE DETAILS</h2><p className="detail-description">{product.description}</p><h2>SPECIFICATIONS</h2><ul className="specs-list">{product.specs.map((spec) => <li key={spec}><span className="spec-icon" aria-hidden="true">↗</span>{spec}</li>)}</ul><Link className="detail-back-button" href="/">← Continue exploring</Link></div>
        </article>
        <LazyComparison currentProductId={product.id} />
      </main>
      <footer className="site-footer"><div className="container footer-inner"><span className="wordmark">SHIPYARD<span className="wordmark-dot">.</span></span><span>MADE FOR WHAT&apos;S NEXT.</span><span>© 2026 SHIPYARD</span></div></footer>
    </>
  );
}

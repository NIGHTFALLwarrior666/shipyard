import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-inner">
          <Link className="wordmark" href="/" aria-label="ShipYard homepage"><span className="logo-mark" aria-hidden="true">S</span> SHIPYARD<span className="wordmark-dot">.</span></Link>
          <nav aria-label="Main navigation">
            <a href="#collection">Collection</a>
            <a href="#about">Our story</a>
          </nav>
          <span className="nav-edition">COLLECTION / 001</span>
        </div>
      </header>

      <main>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow hero-overline"><span className="live-dot" /> CURATED FOR THE EVERYDAY</span>
            <h1 id="hero-title">GOOD GEAR.<br /><span className="text-gradient">GREAT DAYS.</span></h1>
            <p>Beautifully considered essentials for people who move, create, and make every moment count.</p>
            <a className="primary-cta" href="#collection">Explore collection <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <span className="hero-visual-ring ring-one" /><span className="hero-visual-ring ring-two" />
            <span className="hero-sneaker">👟</span>
            <span className="hero-floating-note note-one">01 / PERFORMANCE</span>
            <span className="hero-floating-note note-two">FORM MEETS FUNCTION</span>
          </div>
          <div className="hero-bottom"><span>INDEPENDENT OBJECTS / ENDLESS POSSIBILITIES</span><span>SCROLL TO DISCOVER ↓</span></div>
        </section>

        <section id="collection" className="collection container" aria-labelledby="collection-title">
          <div className="section-intro">
            <div><span className="eyebrow">THE CURATED DROP / 2026</span><h2 id="collection-title">Made to move <em>with you.</em></h2></div>
            <p>Eight essentials. Four categories. No unnecessary noise — just the gear worth keeping close.</p>
          </div>
          <div className="catalog-bar"><span>ALL PRODUCTS</span><span>{String(products.length).padStart(2,"0")} ITEMS AVAILABLE</span></div>
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        <section className="about-section" id="about"><div className="container about-inner"><span className="eyebrow">OUR PHILOSOPHY</span><h2>Less searching.<br /><em>More living.</em></h2><p>We bring together the pieces that make everyday life a little brighter. Practical by design, memorable by nature.</p><a href="#collection">Back to collection ↗</a></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><span className="wordmark">SHIPYARD<span className="wordmark-dot">.</span></span><span>MADE FOR WHAT&apos;S NEXT.</span><span>© 2026 SHIPYARD</span></div></footer>
    </>
  );
}

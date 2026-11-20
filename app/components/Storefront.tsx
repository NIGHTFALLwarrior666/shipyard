"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const categories = ["All", "Sneakers", "Audio", "Wearables", "Gadgets"] as const;
type Category = (typeof categories)[number];

const categoriesDetail = [
  { name: "Sneakers", index: "01", text: "MOVE WITHOUT LIMITS" },
  { name: "Audio", index: "02", text: "FEEL EVERY FREQUENCY" },
  { name: "Wearables", index: "03", text: "ENGINEERED FOR MOTION" },
  { name: "Gadgets", index: "04", text: "TOOLS FOR THE CURIOUS" },
] as const;

export default function Storefront() {
  const [category, setCategory] = useState<Category>("All");
  const progressRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const filtered = category === "All" ? products : products.filter((item) => item.category === category);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    root.classList.add("v2-motion-ready");
    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.08 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove("v2-motion-ready");
    };
  }, [category]);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY || 0;
      const travel = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, scrollTop / travel)})`;
      }
      if (!reducedMotion && visualRef.current && heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight || 1;
        const factor = Math.min(1.2, scrollTop / heroHeight);
        visualRef.current.style.setProperty("--v2-parallax-y", `${factor * 72}px`);
        visualRef.current.style.setProperty("--v2-parallax-r", `${factor * -7}deg`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const jumpToCategory = (value: Category) => {
    setCategory(value);
    document.getElementById("collection")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const moveSpotlight = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--v2-spot-x", `${event.clientX - rect.left}px`);
    heroRef.current.style.setProperty("--v2-spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className="v2-site" ref={rootRef}>
      <div className="v2-scroll-progress" ref={progressRef} aria-hidden="true" />
      <header className="v2-nav">
        <div className="v2-nav-inner">
          <Link href="/" className="v2-logo" aria-label="ShipYard home">
            <span className="v2-logo-mark">S<span className="v2-logo-slash">/</span></span>
            <span>SHIPYARD<span className="v2-logo-period">.</span></span>
          </Link>
          <nav className="v2-nav-links" aria-label="Main navigation">
            <a href="#collection">COLLECTION</a>
            <a href="#philosophy">OUR WORLD</a>
          </nav>
          <a className="v2-nav-link" href="#collection">
            EXPLORE THE DROP <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>
        <section className="v2-hero" id="top" ref={heroRef} onPointerMove={moveSpotlight} aria-labelledby="v2-hero-title">
          <div className="v2-hero-noise" aria-hidden="true" />
          <div className="v2-hero-grid" aria-hidden="true" />
          <div className="v2-hero-inner">
            <div className="v2-hero-intro">
              <div className="v2-line-marker"><span className="v2-pulse-dot" /> NEW WAVE / COLLECTION 026</div>
              <span className="v2-hero-series">INDEPENDENT OBJECTS. UNLIMITED POTENTIAL.</span>
            </div>
            <div className="v2-hero-title-container">
              <div className="v2-hero-copy">
                <span className="v2-hero-kicker">BUILT FOR THE WAY YOU MOVE //</span>
                <h1 id="v2-hero-title">
                  NEVER<br />
                  <span className="v2-hero-outline">ORDINARY</span><span className="v2-hero-star">✳</span>
                </h1>
                <div className="v2-hero-desc-row">
                  <p>Objects for the restless. Designed to move different, live louder, and make every day feel like the main event.</p>
                  <a href="#collection" className="v2-circle-cta" aria-label="Explore the collection">
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <div className="v2-hero-art-frame" ref={visualRef}>
                <div className="v2-hero-art-halo" aria-hidden="true" />
                <div className="v2-hero-art-corner v2-corner-tl" aria-hidden="true" />
                <div className="v2-hero-art-corner v2-corner-br" aria-hidden="true" />
                <span className="v2-art-label v2-art-label-top">FORM_001 / SNEAKER</span>
                <div className="v2-hero-art-product">
                  <Image src="/products/wave-runner.svg" alt="Wave Runner sneaker from the ShipYard collection" width={800} height={600} sizes="(max-width: 900px) 80vw, 44vw" priority />
                </div>
                <span className="v2-art-label v2-art-label-bottom">REWRITE THE EVERYDAY ↗</span>
              </div>
            </div>
            <div className="v2-hero-bottom">
              <div className="v2-hero-bottom-left"><span className="v2-crosshair">✳</span> THE NEW STANDARD OF EVERYDAY</div>
              <a href="#manifesto" className="v2-scroll-prompt">SCROLL TO EXPLORE <span>↓</span></a>
              <span>01 / 04</span>
            </div>
          </div>
        </section>

        <div className="v2-marquee" aria-label="Design without compromise">
          <div className="v2-marquee-track" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <span className="v2-marquee-group" key={i}>
                NOT HERE TO FIT IN <span>✳</span> MADE TO STAND OUT <span>✳</span> LESS ORDINARY <span>✳</span>
              </span>
            ))}
          </div>
        </div>

        <section className="v2-manifesto" id="manifesto" aria-labelledby="manifesto-title">
          <div className="v2-shell">
            <div className="v2-section-overline" data-reveal><span>01</span><span>THE IDEA</span><span>BEYOND THE EXPECTED</span></div>
            <div className="v2-manifesto-grid">
              <div className="v2-manifesto-stamp" data-reveal>
                <span>SY / 2026</span><span className="v2-stamp-symbol">✳</span><span>KEEP MOVING</span>
              </div>
              <div className="v2-manifesto-text" data-reveal>
                <h2 id="manifesto-title">GOOD DESIGN<br />DOESN&apos;T <span>WHISPER.</span></h2>
                <div className="v2-manifesto-description"><span className="v2-small-line" /><p>We don&apos;t believe in everyday. We believe in the details that turn every moment into something worth remembering. No filler. No compromises. Just objects with a point of view.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-feature" id="featured" aria-labelledby="feature-title">
          <div className="v2-feature-visual" data-reveal>
            <div className="v2-feature-visual-grid" aria-hidden="true" />
            <span className="v2-feature-number">02<span>/08</span></span>
            <div className="v2-feature-image"><Image src="/products/orbit-watch.svg" alt="Orbit Watch, a featured ShipYard smartwatch" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <span className="v2-feature-corner">FIELD NOTES_02 / DESIGN MEETS FUNCTION</span>
          </div>
          <div className="v2-feature-copy" data-reveal>
            <div className="v2-feature-top"><span className="v2-pulse-dot" /> OBJECT OF DESIRE / 002</div>
            <p className="v2-feature-label">SPOTLIGHT ON / ORBIT WATCH</p>
            <h2 id="feature-title">TIME TO<br /><em>MOVE</em> DIFFERENT.</h2>
            <p className="v2-feature-description">More than a watch. A reminder to keep chasing what&apos;s next. Smart where it counts. Bold everywhere else.</p>
            <div className="v2-feature-price-row"><span>FROM $219.00</span><span>COLLECTION / 001</span></div>
            <Link href="/products/orbit-watch" className="v2-feature-button">DISCOVER THE ORBIT WATCH <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="v2-categories" aria-labelledby="categories-title">
          <div className="v2-shell">
            <div className="v2-section-overline" data-reveal><span>02</span><span>THE UNIVERSE</span><span>FOUR WAYS TO MOVE</span></div>
            <div className="v2-categories-heading" data-reveal>
              <h2 id="categories-title">FIND YOUR<br /><span>FREQUENCY.</span></h2>
              <p>Four worlds. One vision. Pick your lane, then make it yours.</p>
            </div>
            <div className="v2-categories-list" data-reveal>
              {categoriesDetail.map((item) => (
                <button className="v2-category-row" key={item.name} type="button" onClick={() => jumpToCategory(item.name)}>
                  <span className="v2-category-index">{item.index}</span>
                  <span className="v2-category-name">{item.name}</span>
                  <span className="v2-category-desc">{item.text}</span>
                  <span className="v2-category-go" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-collection" id="collection" aria-labelledby="collection-title">
          <div className="v2-shell">
            <div className="v2-section-overline" data-reveal><span>03</span><span>THE COLLECTION</span><span>CURATED / NOT COMPROMISED</span></div>
            <div className="v2-collection-header" data-reveal>
              <h2 id="collection-title">THE<br /><span>GOOD STUFF.</span></h2>
              <div className="v2-collection-aside"><span>08 OBJECTS / 04 WORLDS</span><p>Consider this your edit of everything worth owning. High impact, no excess.</p></div>
            </div>
            <div className="v2-filter-bar" role="group" aria-label="Filter collection by category">
              {categories.map((item) => (
                <button type="button" key={item} className={`v2-filter-button ${item === category ? "is-active" : ""}`} aria-pressed={item === category} onClick={() => setCategory(item)}>
                  {item.toUpperCase()} {item === "All" ? "(08)" : `(${products.filter((product) => product.category === item).length.toString().padStart(2, "0")})`}
                </button>
              ))}
              <span className="v2-filter-count" aria-live="polite">{String(filtered.length).padStart(2, "0")} RESULTS</span>
            </div>
            <div className="v2-products-grid" aria-live="polite">
              {filtered.map((item) => (
                <div key={item.id} className="v2-product-shell" data-reveal>
                  <ProductCard product={item} index={products.findIndex((product) => product.id === item.id)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-philosophy" id="philosophy" aria-labelledby="philosophy-title">
          <div className="v2-philosophy-orbit v2-orbit-one" aria-hidden="true" />
          <div className="v2-philosophy-orbit v2-orbit-two" aria-hidden="true" />
          <div className="v2-shell v2-philosophy-inner">
            <div className="v2-section-overline" data-reveal><span>04</span><span>THE NEXT CHAPTER</span><span>KEEP EXPLORING</span></div>
            <div className="v2-philosophy-content" data-reveal>
              <span className="v2-planet">✳</span>
              <h2 id="philosophy-title">LIFE&apos;S TOO SHORT<br />FOR <span>BORING.</span></h2>
              <p>Elevated essentials. Unapologetic energy. A collection built for the ones who refuse to stand still.</p>
              <a href="#collection" className="v2-bottom-cta">FIND YOUR NEXT THING <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="v2-footer">
        <div className="v2-shell">
          <div className="v2-footer-top">
            <span className="v2-footer-wordmark">SHIPYARD<span>.</span></span>
            <a href="#top">BACK TO THE TOP ↑</a>
          </div>
          <div className="v2-footer-bottom">
            <span>© 2026 SHIPYARD / OBJECTS FOR THE UNORDINARY</span>
            <span>BUILT TO MOVE DIFFERENT.</span>
            <span>INDEPENDENT / ALWAYS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

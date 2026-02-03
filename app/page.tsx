"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function HomePage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  /* ================= FEATURED PRODUCTS ================= */
  const featuredProducts = useMemo(() => {
    const categories = Array.from(new Set(products.map(p => p.category)));

    const mixed = categories.flatMap(category =>
      products.filter(p => p.category === category).slice(0, 4)
    );

    return mixed.slice(0, 20);
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let scroll = el.scrollLeft;
    let rafId: number;
    let isUserInteracting = false;
    let isVisible = true;

    const speed = window.innerWidth < 768 ? 0.25 : 0.35;

    const observer = new IntersectionObserver(
      ([entry]) => (isVisible = entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(el);

    const animate = () => {
      if (!isUserInteracting && isVisible) {
        scroll += speed;
        if (scroll >= el.scrollWidth - el.clientWidth) scroll = 0;
        el.scrollLeft = scroll;
      }
      rafId = requestAnimationFrame(animate);
    };

    const stop = () => (isUserInteracting = true);
    const start = () => {
      scroll = el.scrollLeft;
      isUserInteracting = false;
    };

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("touchend", start);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="bg-gray-50 text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/home.jpg"
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-full max-w-5xl px-6 md:px-16 ml-auto text-right">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            Smart Shopping.
            <br />
            Simple WhatsApp Order.
          </h1>

          <p className="mt-6 text-base md:text-xl text-gray-200 max-w-xl ml-auto">
            Choose category • Add to cart • Order instantly
          </p>

          <div className="mt-8 flex gap-4 justify-end flex-wrap">
            <Link
              href="/men"
              className="px-8 py-3 md:px-10 md:py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
            >
              Start Shopping
            </Link>

            <Link
              href="/cart"
              className="px-8 py-3 md:px-10 md:py-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
            >
              Cart
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm opacity-80 animate-bounce">
          ↓ Scroll
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="-mt-20 pt-28 pb-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
            <CategoryCard title="Men" image="/man.jpg" link="/men" />
            <CategoryCard title="Women" image="/women.jpg" link="/women" />
            <CategoryCard title="Watches" image="/watch.jpg" link="/watches" />
            <CategoryCard title="Shoes" image="/shoes.jpg" link="/shoes" />
            <CategoryCard title="Home & Kitchen" image="/homeKitchen.jpg" link="/home-kitchen" />
            <CategoryCard title="Kids Clothing" image="/child.jpg" link="/kids" />
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Featured Products
          </h2>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-6 cursor-grab"
          >
            {featuredProducts.map(p => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
                className="min-w-[220px] sm:min-w-[260px]"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </main>
  );
}

/* ================= CATEGORY CARD ================= */

function CategoryCard({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="relative group h-[190px] sm:h-[210px] md:h-[230px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      <div className="absolute bottom-0 w-full p-5">
        <h3 className="text-base md:text-lg font-semibold text-white text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
}

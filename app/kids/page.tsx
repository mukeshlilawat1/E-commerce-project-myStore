"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

type KidsFilter =
    | "all"
    | "boys"
    | "girls"
    | "tshirts"
    | "winter"
    | "party";

export default function KidsPage() {
    const [filter, setFilter] = useState<KidsFilter>("all");

    /* ================= FAST FILTERED PRODUCTS ================= */
    const kidsProducts = useMemo(() => {
        return products.filter(p => {
            if (p.category !== "kids") return false;
            if (filter === "all") return true;
            return p.subCategory === filter;
        });
    }, [filter]);

    return (
        <main className="bg-gradient-to-b from-sky-50 via-white to-pink-50 text-gray-900">

            {/* ================= HERO ================= */}
            <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/kidsHome.jpg')" }}
                />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-16 ml-auto text-right">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">
                        Kids Clothing
                    </h1>

                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-xl ml-auto">
                        Comfortable • Colorful • Everyday Fun Wear
                    </p>

                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-end">
                        <Link
                            href="/cart"
                            className="px-8 sm:px-10 py-4 rounded-full bg-black text-white font-semibold hover:scale-105 transition"
                        >
                            View Cart
                        </Link>

                        <Link
                            href="/"
                            className="px-8 sm:px-10 py-4 rounded-full border border-black font-semibold hover:bg-black hover:text-white transition"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= FILTER BAR ================= */}
            <section className="relative z-10 bg-white/90 backdrop-blur border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
                    <FilterBadge label="All" active={filter === "all"} onClick={() => setFilter("all")} />
                    <FilterBadge label="Boys Wear" active={filter === "boys"} onClick={() => setFilter("boys")} />
                    <FilterBadge label="Girls Wear" active={filter === "girls"} onClick={() => setFilter("girls")} />
                    <FilterBadge label="T-Shirts" active={filter === "tshirts"} onClick={() => setFilter("tshirts")} />
                    <FilterBadge label="Winter Wear" active={filter === "winter"} onClick={() => setFilter("winter")} />
                    <FilterBadge label="Party Wear" active={filter === "party"} onClick={() => setFilter("party")} />
                </div>
            </section>

            {/* ================= PRODUCTS GRID ================= */}
            <section className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {kidsProducts.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg">
                            No products found in this category
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                            {kidsProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="pb-16 sm:pb-24 text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                    Cute Styles for Little Stars ✨
                </h2>

                <p className="text-gray-600 mb-8">
                    Add items to cart and order instantly via WhatsApp
                </p>

                <Link
                    href="/cart"
                    className="inline-block px-10 sm:px-12 py-4 sm:py-5 rounded-full text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl hover:scale-105 transition"
                >
                    Order on WhatsApp 💬
                </Link>
            </section>
        </main>
    );
}

/* ================= FILTER BADGE ================= */

function FilterBadge({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`
                px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap
                ${active
                    ? "bg-black text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"}
            `}
        >
            {label}
        </button>
    );
}

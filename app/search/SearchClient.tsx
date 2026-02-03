"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useMemo, useState } from "react";

const categories = ["all", "men", "women", "shoes", "watches"];

export default function SearchClient() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [query, setQuery] = useState(initialQuery);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
    const [category, setCategory] = useState("all");

    /* ================= DEBOUNCE ================= */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    /* ================= URL → STATE SYNC ================= */
    useEffect(() => {
        setQuery(initialQuery);
        setDebouncedQuery(initialQuery);
    }, [initialQuery]);

    /* ================= FILTER (OPTIMIZED) ================= */
    const filteredProducts = useMemo(() => {
        const q = debouncedQuery.trim().toLowerCase();
        if (!q && category === "all") return products;

        return products.filter(p => {
            const matchName = q
                ? p.name.toLowerCase().includes(q)
                : true;

            const matchCategory =
                category === "all" || p.category === category;

            return matchName && matchCategory;
        });
    }, [debouncedQuery, category]);

    return (
        <main className="min-h-screen bg-[#f6f7f9] px-6 py-16 text-gray-900">
            <div className="max-w-7xl mx-auto">

                {/* ================= CATEGORY FILTER ================= */}
                <div className="flex gap-3 mb-12 flex-wrap">
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium transition
                                ${category === c
                                    ? "bg-black text-white"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}
                            `}
                        >
                            {c.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* ================= RESULTS TITLE ================= */}
                {debouncedQuery && (
                    <h2 className="text-xl font-semibold mb-8">
                        Results for{" "}
                        <span className="text-gray-500">“{debouncedQuery}”</span>
                    </h2>
                )}

                {/* ================= RESULTS ================= */}
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500 text-lg">
                        No products found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

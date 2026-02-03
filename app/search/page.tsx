"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

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

    /* ================= UPDATE QUERY FROM URL ================= */
    useEffect(() => {
        setQuery(initialQuery);
        setDebouncedQuery(initialQuery);
    }, [initialQuery]);

    /* ================= FILTER ================= */
    const filteredProducts = products.filter(p => {
        const matchName = p.name
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase());

        const matchCategory =
            category === "all" || p.category === category;

        return matchName && matchCategory;
    });

    return (
        <main className="bg-black text-white min-h-screen px-6 py-16">
            <div className="max-w-7xl mx-auto">

                {/* ================= CATEGORY FILTER ================= */}
                <div className="flex gap-3 mb-12 flex-wrap">
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`
                              px-4 py-2 rounded-full text-sm transition
                              ${category === c
                                    ? "bg-white text-black"
                                    : "bg-[#111] text-gray-300 border border-white/10 hover:bg-white/10"
                                }
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
                        <span className="text-gray-400">“{debouncedQuery}”</span>
                    </h2>
                )}

                {/* ================= RESULTS ================= */}
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-400 text-lg">
                        No products found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={`${product.id}-${index}`}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

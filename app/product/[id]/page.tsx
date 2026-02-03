"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>(); // ✅ FIX
    const id = params.id;

    const { addToCart } = useCart();

    const product = products.find(p => String(p.id) === id);

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState(0);

    const [relatedProducts, setRelatedProducts] = useState<typeof products>([]);
    const [customersAlsoBought, setCustomersAlsoBought] = useState<typeof products>([]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gray-50">
                Product not found
            </div>
        );
    }

    /* ================= IMAGE NORMALIZE ================= */
    const images = Array.isArray(product.images)
        ? product.images
        : product.images
            ? [product.images]
            : product.image
                ? [product.image]
                : ["/placeholder.jpg"];

    /* ================= SHUFFLE ================= */
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

    /* ================= RECOMMENDATIONS ================= */
    useEffect(() => {
        setRelatedProducts(
            shuffle(
                products.filter(p =>
                    p.id !== product.id &&
                    p.category === product.category &&
                    p.subCategory === product.subCategory
                )
            ).slice(0, 6)
        );

        setCustomersAlsoBought(
            shuffle(
                products.filter(p =>
                    p.id !== product.id &&
                    p.category === product.category
                )
            ).slice(0, 6)
        );
    }, [product]);

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 px-4 sm:px-6 py-12">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

                {/* IMAGE */}
                <div className="flex flex-col gap-4">
                    <div className="w-full max-h-[600px] rounded-2xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                        <img
                            src={images[activeImage]}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`h-20 w-16 rounded-xl overflow-hidden border transition
                                    ${activeImage === idx ? "border-black" : "border-gray-300"}
                                `}
                            >
                                <img src={img} alt="thumb" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* DETAILS */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        {product.name}
                    </h1>

                    <p className="text-green-600 text-2xl font-semibold">
                        ₹{product.price}
                    </p>

                    <p className="text-gray-600 max-w-xl leading-relaxed">
                        {product.description}
                    </p>

                    {product.sizes && (
                        <div>
                            <p className="mb-2 text-sm font-medium">Select Size</p>
                            <div className="flex gap-3 flex-wrap">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-full border transition
                                            ${selectedSize === size
                                                ? "bg-black text-white border-black"
                                                : "border-gray-300 hover:bg-gray-100"}
                                        `}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {!selectedSize && (
                                <p className="text-red-500 text-xs mt-2">
                                    Please select a size
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex gap-4 flex-wrap mt-4">
                        <button
                            onClick={() => {
                                if (product.sizes && !selectedSize) return;
                                addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    qty: 1,
                                    size: selectedSize ?? undefined,
                                    images,
                                });
                            }}
                            className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 transition"
                        >
                            Add to Cart
                        </button>

                        <button className="px-8 py-3 rounded-full border border-gray-400 hover:bg-gray-100 transition">
                            Order on WhatsApp
                        </button>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="mt-28">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                        Related Products
                    </h2>

                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {relatedProducts.map(item => (
                            <div key={item.id} className="min-w-[220px] sm:min-w-[260px]">
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {customersAlsoBought.length > 0 && (
                <section className="mt-28">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                        Customers Also Bought
                    </h2>

                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {customersAlsoBought.map(item => (
                            <div key={item.id} className="min-w-[220px] sm:min-w-[260px]">
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

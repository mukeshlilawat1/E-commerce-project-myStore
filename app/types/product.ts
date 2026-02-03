/* ================= COMMON BASE ================= */

interface BaseProduct {
    id: number;
    name: string;
    price: number;

    /* 🔥 IMPORTANT: COMMON FIELDS */
    category: string;
    subCategory?: string;   // ✅ KEY FIX (OPTIONAL FOR ALL)

    description?: string;

    image?: string;
    images?: string[];

    colors?: string[];
    sizes?: string[];

    rating?: number;
    reviews?: number;
}

/* ================= MEN ================= */

export interface MenProduct extends BaseProduct {
    category: "men";
    subCategory: "tshirts" | "shirts" | "jeans";

    material?: "Cotton" | "Denim" | "Linen" | "Polyester";
}

/* ================= WOMEN ================= */

export interface WomenProduct extends BaseProduct {
    category: "women";
    subCategory:
        | "jewellery"
        | "ethnic"
        | "tops"
        | "kurti"
        | "Footwear"
        | "Dress";

    jewelleryType?: "choker" | "necklace" | "earrings" | "bangles";

    material?: string;
    stones?: string[];
}

/* ================= WATCHES ================= */

export interface WatchProduct extends BaseProduct {
    category: "watches";

    watchType: "luxury" | "analog" | "sports" | "smart";

    material?: "Steel" | "Leather" | "Silicone" | "Ceramic";
}

/* ================= SHOES / SANDALS ================= */

export interface ShoeProduct extends BaseProduct {
    category: "shoes" | "sandals";

    material?: "Leather" | "Synthetic" | "Canvas" | "Rubber";
}

/* ================= FINAL PRODUCT TYPE ================= */

export type Product =
    | MenProduct
    | WomenProduct
    | WatchProduct
    | ShoeProduct;

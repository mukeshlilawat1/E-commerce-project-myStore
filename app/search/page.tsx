import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="p-10 text-white">Loading search...</div>}>
            <SearchClient />
        </Suspense>
    );
}

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { defaultPrices } from "../data/defaultPrices";

export function usePackagePrices() {
  const [prices, setPrices] = useState(defaultPrices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const snapshot = await getDocs(collection(db, "packages"));
        const fetched = {};
        snapshot.forEach((doc) => {
          fetched[doc.id] = doc.data();
        });
        setPrices((prev) => ({ ...prev, ...fetched }));
      } catch (err) {
        setError(err);
        // defaultPrices remain — UI never breaks
      } finally {
        setLoading(false);
      }
    }
    fetchPrices();
  }, []);

  return { prices, loading, error };
}

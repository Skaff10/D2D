import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export function useServicePrices() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const snapshot = await getDocs(collection(db, "service_prices"));
        const fetched = {};
        snapshot.forEach((doc) => {
          fetched[doc.id] = doc.data().pricing;
        });
        setPrices(fetched);
      } catch (err) {
        console.error("Failed to fetch service prices", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPrices();
  }, []);

  return { prices, loading, error };
}

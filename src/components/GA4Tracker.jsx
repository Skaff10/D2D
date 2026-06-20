import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export default function GA4Tracker() {
  const location = useLocation();

  useEffect(() => {
    // Add a small delay to allow document.title to update (e.g., via React Helmet)
    const timeoutId = setTimeout(() => {
      if (import.meta.env.MODE === "production") {
        ReactGA.send({
          hitType: "pageview",
          page: location.pathname + location.search,
          title: document.title,
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location]);

  return null;
}

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useUTMCapture() {
  const location = useLocation();
  const [utmData, setUtmData] = useState(() => {
    const stored = sessionStorage.getItem("utm_data");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing stored UTM data", e);
      }
    }
    return {
      utm_source: "direct",
      utm_medium: "none",
      utm_campaign: "",
      utm_content: "",
    };
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const source = searchParams.get("utm_source");

    if (source) {
      const newUtmData = {
        utm_source: source,
        utm_medium: searchParams.get("utm_medium") || "none",
        utm_campaign: searchParams.get("utm_campaign") || "",
        utm_content: searchParams.get("utm_content") || "",
      };
      sessionStorage.setItem("utm_data", JSON.stringify(newUtmData));
      setUtmData(newUtmData);
    } else if (!sessionStorage.getItem("utm_data")) {
      const defaultUtm = {
        utm_source: "direct",
        utm_medium: "none",
        utm_campaign: "",
        utm_content: "",
      };
      sessionStorage.setItem("utm_data", JSON.stringify(defaultUtm));
      setUtmData(defaultUtm);
    }
  }, [location.search]);

  return utmData;
}

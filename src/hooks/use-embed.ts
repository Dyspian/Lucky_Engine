import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function useIsEmbedded() {
  const [searchParams] = useSearchParams();
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    // Robust check for iframe context
    try {
      setInIframe(window.self !== window.top);
    } catch (e) {
      setInIframe(true);
    }
  }, []);

  // Returns true if ?embed=true is in URL OR if running inside an iframe
  return searchParams.get("embed") === "true" || inIframe;
}
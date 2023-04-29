import { useEffect, useState } from "react";

export default function useClientReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, [ready, setReady]);

  return ready;
}

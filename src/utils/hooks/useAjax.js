import { useState, useEffect } from "react";

export function useAjax(endpoint) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ err: false });
  const [data, setData] = useState({});
  console.log("useAajax");
  useEffect(async () => {
    try {
      console.log("try");
      const data = await fetch(endpoint).then((res) => res.json());
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log("catch");
      setLoading(false);
      setError({ err });
    }
  }, [endpoint, loading]);

  const reload = () => {
    setLoading(false);
    setError(false);
  };
  console.log("dano?");
  return [data, loading, error, reload];
}

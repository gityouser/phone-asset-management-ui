import { useState, useEffect } from "react";

export function useAjax(endpoint) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ err: false });
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(endpoint).then((res) => res.json());
        setData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError({ err });
      }
    }

    fetchData();
  }, [endpoint, loading]);

  const reload = () => {
    setLoading(false);
    setError(false);
  };
  return [data, loading, error, reload];
}

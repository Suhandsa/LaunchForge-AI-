import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useFetch — generic data-fetching hook.
 *
 * @param {Function} fetchFn  — async function to call
 * @param {any[]}    deps     — dependency array (re-fetch when changed)
 * @param {{ immediate?: boolean }} options
 *
 * @returns {{ data, loading, error, refetch }}
 */
export function useFetch(fetchFn, deps = [], { immediate = true } = {}) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);
  const abortRef = useRef(null);

  const execute = useCallback(async (...args) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn(...args);
      setData(result);
      return result;
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line

  useEffect(() => {
    if (immediate) execute();
    return () => abortRef.current?.abort();
  }, [execute, immediate]);

  return { data, loading, error, refetch: execute };
}

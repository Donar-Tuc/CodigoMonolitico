import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!url) return;

        setLoading(true);
        setError(null);

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.text();
            })
            .then(text => {
                try {
                    const json = JSON.parse(text);
                    setData(json);
                } catch (e) {
                    throw new Error("Invalid JSON response");
                }
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading };
}

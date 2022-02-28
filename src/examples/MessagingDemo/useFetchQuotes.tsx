import axios from "axios";
import { useEffect, useState } from "react";

const cache = {
    quotes: null,
};

export const useFetchQuotes = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const fetchQuotes = async () => {
            if (cache.quotes) {
                return setQuotes(cache.quotes);
            }

            const results = await axios.get("https://type.fit/api/quotes");

            cache.quotes = results.data;
            setQuotes(results.data);
        };

        fetchQuotes();
    }, []);

    return quotes;
};

import { use, useEffect, useState } from "react";

export default function CurrencyPage() {
    const[amount, setAmount] = useState(100);
    const[fromCurrency, setFromCurrency] = useState("USD");
    const[toCurrency, setToCurrency] = useState("EUR");
    const[exchangeRate, setExchangeRate] = useState({});
    const[result, setResult] = useState<{amount: string, rate: string}|null>(null);
    const[currencies, setCurrencies] = useState({});
    const[loading, setLoading] = useState(false);

    // Fetch list of available currencies on component mount
    useEffect(() => {
        fetch("https://api.frankfurter.dev/currencies")
        .then((res) => res.json())
        .then((data) => setCurrencies(data))
        .catch((error) => console.error("Error fetching currencies:", error));
    }, []);
    
    // Fetch exchange rate whenever fromCurrency changes
    const fetchExchangeRate = async () => {
        try {
            const res = await fetch(`https://api.frankfurter.dev/latest?from=${fromCurrency}`);
            const data = await res.json();
            setExchangeRate(data.rates);
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        }
    };

    useEffect(() => {
        if (fromCurrency) {
            fetchExchangeRate();
        }
    }, [fromCurrency]);

    // Convert currency based on user input
    const convertCurrency = async() => {
        if (!amount || amount <= 0) return;
        setLoading(true);
        try {
            const res =  await fetch(`https://api.frankfurter.dev/latest?from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json();
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            setResult({
                amount: convertedAmount,
                rate: rate.toFixed(4)
            });
        } catch (error) {
            console.error("Error converting currency:", error);
        } finally {
            setLoading(false);
        }
    };

    // Swap from and to currencies
    const swapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
        setResult(null);
    };

    const popularCurrencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "BRL"];

    return (
        <div className=""></div>
    );

}
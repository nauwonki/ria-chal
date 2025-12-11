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

    const swapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
        setResult(null);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Currency Exchange Dashboard
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Welcome to the Currency Exchange Dashboard. Here you can find real-time exchange rates and currency conversion tools.
            </p>
        </main>
        </div>
    );

}
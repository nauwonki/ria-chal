import { useEffect, useState } from "react";

export default function CurrencyPage() {
    const[amount, setAmount] = useState('100');
    const[fromCurrency, setFromCurrency] = useState("USD");
    const[toCurrency, setToCurrency] = useState("EUR");
    const[exchangeRate, setExchangeRate] = useState<Record<string, number>>({} as Record<string, number>);
    const[result, setResult] = useState<{amount: string, rate: string}|null>(null);
    const[currencies, setCurrencies] = useState<Record<string, string>>({} as Record<string, string>);
    const[loading, setLoading] = useState(false);

    // Fetch list of available currencies on component mount
    useEffect(() => {
        fetch("https://api.frankfurter.app/currencies")
        .then((res) => res.json())
        .then((data) => setCurrencies(data))
        .catch((error) => console.error("Error fetching currencies:", error));
    }, []);
    
    // Fetch exchange rate whenever fromCurrency changes
    const fetchExchangeRate = async () => {
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`);
            const data = await res.json();
            if (data.rates) {
                setExchangeRate(data.rates);
            }
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
        const numAmount = parseFloat(amount);
        if (!amount || numAmount <= 0) return;
        const rate = exchangeRate[toCurrency];
        setResult({
            amount: (numAmount * rate).toFixed(2),
            rate: rate.toFixed(4)
        });
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
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-pink-50 p-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Currency Converter</h1>
                </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Amount</label>
                            <div className="flex gap-4">
                                <input 
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 font-medium placeholder:text-gray-400"
                                    placeholder="Enter amount"
                                />
                                <select 
                                    value={fromCurrency} 
                                    onChange={(e) => {
                                        setFromCurrency(e.target.value);
                                        setResult(null);
                                    }}
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white min-w-[140px] text-gray-900 font-medium" 
                                >
                                {Object.entries(currencies).map(([code, name]) => (
                                    <option key={code} value={code}>
                                        {code} - {name}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={swapCurrencies}
                                className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                title="Swap Currencies"
                            >
                                change
                            </button>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">To</label>
                            <select 
                                value={toCurrency} 
                                onChange={(e) => {
                                    setToCurrency(e.target.value);
                                    setResult(null);
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 font-medium bg-white"
                            >   
                            {Object.entries(currencies).map(([code, name]) => (
                                <option key={code} value={code}>
                                    {code} - {name}
                                </option>
                            ))}
                                
                            </select> 
                        </div>
                        <button
                            onClick={convertCurrency}
                            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            disabled={loading || !amount}
                        >
                            {loading ? "Converting..." : "Convert"}
                        </button>
                        {result && (
                            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md">
                                <div className="text-center">
                                    <p className="text-lg font-semibold text-green-800">Converted Amount</p>
                                    <p className="text-2xl text-green-900">{result.amount} {toCurrency}</p>
                                    <p className="text-sm text-green-700">Exchange Rate: 1 {fromCurrency} = {result.rate} {toCurrency}</p>
                                </div>  
                            </div>
                        )}
                    </div>
                

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-bold text-gray-800">Live Exchange Rates</h2>
                        </div>
                    </div>
                    <button
                        onClick={fetchExchangeRate}
                        className="mb-4 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                        Refresh
                        </button>
                </div>
                <div className="text-sm text-center text-gray-500 mt-4">
                    Base Currency: {fromCurrency}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {popularCurrencies
                        .filter(currency => currency !== fromCurrency)
                        .map((currency) => (
                            <div
                                key={currency}
                                className="bg-white p-4 rounded-lg shadow-md text-center"
                                onClick={() => {
                                    setToCurrency(currency);
                                    setResult(null);
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">{currency}</p>
                                        <p className="text-sm text-gray-600">{currencies[currency] || currency}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-indigo-600">
                                            {exchangeRate[currency]?.toFixed(4) || '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
    );
}
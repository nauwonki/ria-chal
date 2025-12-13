"use client";

import { useState } from "react";
import { calculateFees, Feeconfig } from "../fees/feeUtil";

export default function FeesPage({ realRate }: { realRate: number}) {
    const [amount, setAmount] = useState('');
    const fees: Feeconfig = {
        flat: 5.00,
        percentage: 0.02,
        fxMarkup: 0.01
    };

    const numAmount = parseFloat(amount);
    const result = (!isNaN(numAmount) && numAmount > 0) ? calculateFees(numAmount, realRate, fees) : null;

    return (
        <div className="mt-8 p-4 bg-white shadow-lg rounded-lg text-gray-900 font-medium">
            <h2 className="text-2xl font-bold mb-4">Transfer Fees Calculator</h2>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount to transfer" 
                className="border p-2 rounded w-full mb-4 text-gray-900 font-medium"
            />
            {result ? (
                <div className="space-y-2">
                    <div>Flat Fee: ${result.flatFee.toFixed(2)}</div>
                    <div>Percentage Fee: ${result.percentageFee.toFixed(2)}</div>
                    <div>FX Rate after Markup: {result.fxRate.toFixed(6)}</div>
                    <div>Total Transfer Fee: ${result.transferFee.toFixed(2)}</div>
                    <div>Amount Recipient Gets: ${result.recipientGets.toFixed(2)}</div>
                </div>
            ) : (
                <div>Please enter a valid amount to see fee breakdown.</div>
            )}

        </div>
    );
}


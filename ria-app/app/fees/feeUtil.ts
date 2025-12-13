export type Feeconfig = {
    flat: number;
    percentage: number;
    fxMarkup: number;
};

export function calculateFees(amount: number, realRate: number, config: Feeconfig) {
    const flatFee = config.flat;
    const percentageFee = config.percentage * amount;
    const fxRate = (1 - config.fxMarkup) * realRate;
    const transferFee = flatFee + percentageFee;
    const recipientGets = amount * fxRate - transferFee; 
    return {
        flatFee: Number(flatFee.toFixed(2)),
        percentageFee: Number(percentageFee.toFixed(2)),
        fxRate: Number(fxRate.toFixed(6)),
        transferFee: Number(transferFee.toFixed(2)),
        recipientGets: Number(recipientGets.toFixed(2))
    };
}
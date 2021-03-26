/**
 * Population growth formula from Wolfram Alpha, using a max sustainable population to shape an expotenial function.
 *
 * The equation is: N = (K N_0)/(N_0 + (K - N_0) e^(-r t))
 * Where:
 *     N | population
 *     N_0 | initial population
 *     r | rate of maximum population growth
 *     K | maximum sustainable population
 *     t | time period
 *
 * @param currentPop Current/initial population
 * @param maxPop The maximum sustainable population - i.e. what a planet could support
 * @param growthRate Rate of maximum population growth (defaults to 0.3) - i.e. the maximum increase per population
 * @param period Time period (defaults to 1) - i.e. number of years
 */
export const wolframGrowth = (currentPop: number, maxPop: number, growthRate = 0.3, period = 1): number => {
    const exp = Math.pow(Math.E, -growthRate * period);

    return Math.round((maxPop * currentPop) / (currentPop + (maxPop - currentPop) * exp));
};

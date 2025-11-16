
import React, { useState, useCallback } from 'react';
import Input from './components/Input';
import ResultCard from './components/ResultCard';
import { InterestCalculationResult } from './types';
import { CalculatorIcon, RefreshCwIcon } from './components/Icon';

const App: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('10000');
  const [rate, setRate] = useState<string>('5');
  const [time, setTime] = useState<string>('10');
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12);
  const [result, setResult] = useState<InterestCalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = useCallback(() => {
    setError('');
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = compoundFrequency;

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      setError('Please enter valid positive numbers for all fields.');
      setResult(null);
      return;
    }

    const amount = p * Math.pow(1 + r / n, n * t);
    const totalInterest = amount - p;

    setResult({
      principal: p,
      totalInterest: totalInterest,
      totalAmount: amount,
    });
  }, [principal, rate, time, compoundFrequency]);

  const handleReset = useCallback(() => {
    setPrincipal('10000');
    setRate('5');
    setTime('10');
    setCompoundFrequency(12);
    setResult(null);
    setError('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Compound Interest Calculator
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Visualize your investment growth with clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Parameters</h2>
            <div className="space-y-6">
              <Input
                id="principal"
                label="Principal Amount ($)"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="e.g., 10000"
                type="number"
              />
              <Input
                id="rate"
                label="Annual Interest Rate (%)"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g., 5"
                type="number"
              />
              <Input
                id="time"
                label="Time Period (Years)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 10"
                type="number"
              />
              <div>
                <label htmlFor="compoundFrequency" className="block text-sm font-medium text-gray-600 mb-2">
                  Compounding Frequency
                </label>
                <select
                  id="compoundFrequency"
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800"
                >
                  <option value={1}>Annually</option>
                  <option value={2}>Semi-Annually</option>
                  <option value={4}>Quarterly</option>
                  <option value={12}>Monthly</option>
                  <option value={365}>Daily</option>
                </select>
              </div>
            </div>
             {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleCalculate}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <CalculatorIcon className="h-5 w-5 mr-2" />
                Calculate
              </button>
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300"
              >
                <RefreshCwIcon className="h-5 w-5 mr-2" />
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center">
            {result ? (
              <ResultCard result={result} />
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg">Your results will be displayed here.</p>
                <p className="text-sm mt-2">Enter your investment details and click "Calculate".</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

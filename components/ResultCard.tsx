
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { InterestCalculationResult } from '../types';

interface ResultCardProps {
  result: InterestCalculationResult;
}

const COLORS = ['#0088FE', '#00C49F'];

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border rounded-md shadow-md">
        <p className="label">{`${payload[0].name} : ${currencyFormatter.format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const data = [
    { name: 'Principal', value: result.principal },
    { name: 'Total Interest', value: result.totalInterest },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Future Value</h2>
      <p className="text-5xl font-bold text-center text-blue-600 mb-6">
        {currencyFormatter.format(result.totalAmount)}
      </p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600">Principal Amount</span>
          <span className="font-semibold text-gray-800">{currencyFormatter.format(result.principal)}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600">Total Interest Earned</span>
          <span className="font-semibold text-green-600">{currencyFormatter.format(result.totalInterest)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

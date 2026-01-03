'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FunctionType } from '@/types';

interface ROICalculatorProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

export function ROICalculator({ data, functionType }: ROICalculatorProps) {
  const [employees, setEmployees] = useState(100);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);

  const calculations = useMemo(() => {
    const weeklyHoursSaved = hoursPerWeek * 0.6; // 60% automation
    const weeklySavings = weeklyHoursSaved * employees * hourlyRate;
    const annualSavings = weeklySavings * 52;
    const deploymentCost = 150000; // Example ArqAI cost
    const roi = ((annualSavings - deploymentCost) / deploymentCost) * 100;
    const paybackMonths = deploymentCost / (weeklySavings * 4);

    return {
      weeklyHoursSaved: Math.round(weeklyHoursSaved * employees),
      weeklySavings: Math.round(weeklySavings),
      annualSavings: Math.round(annualSavings),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths),
    };
  }, [employees, hourlyRate, hoursPerWeek]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employees
          </label>
          <Input
            type="number"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hourly Rate ($)
          </label>
          <Input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours/Week on Tasks
          </label>
          <Input
            type="number"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            min={1}
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#A7FF83] to-[#8ae066] rounded-xl p-4 text-center"
        >
          <DollarSign className="h-6 w-6 mx-auto mb-1 text-[#0A2463]" />
          <div className="text-2xl font-bold text-[#0A2463]">
            ${calculations.annualSavings.toLocaleString()}
          </div>
          <div className="text-xs text-[#0A2463]/70">Annual Savings</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0A2463] rounded-xl p-4 text-center text-white"
        >
          <TrendingUp className="h-6 w-6 mx-auto mb-1 text-[#A7FF83]" />
          <div className="text-2xl font-bold">{calculations.roi}%</div>
          <div className="text-xs text-white/70">First Year ROI</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#F8F9FA] rounded-xl p-4 text-center"
        >
          <Clock className="h-6 w-6 mx-auto mb-1 text-[#0A2463]" />
          <div className="text-2xl font-bold text-[#0A2463]">
            {calculations.paybackMonths}
          </div>
          <div className="text-xs text-gray-500">Months to Payback</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#F8F9FA] rounded-xl p-4 text-center"
        >
          <Calculator className="h-6 w-6 mx-auto mb-1 text-[#0A2463]" />
          <div className="text-2xl font-bold text-[#0A2463]">
            {calculations.weeklyHoursSaved.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Hours Saved/Week</div>
        </motion.div>
      </div>

      {/* Export */}
      <div className="flex justify-center">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export as PDF
        </Button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        * Based on typical 60% automation rate. Actual results may vary based on your specific use case.
      </p>
    </div>
  );
}

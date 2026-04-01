'use client'

import { useState, useMemo } from 'react'

function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

function getTierCost(producers: number): number {
  if (producers <= 5) return 99
  if (producers <= 15) return 299
  if (producers <= 30) return 499
  return 999
}

function getTierLabel(producers: number): string {
  if (producers <= 5) return '1-5 producers'
  if (producers <= 15) return '6-15 producers'
  if (producers <= 30) return '16-30 producers'
  return '31+ producers'
}

export default function AgencyCalculator() {
  const [producers, setProducers] = useState(5)
  const [adminStaff, setAdminStaff] = useState(2)
  const [adminRate, setAdminRate] = useState(18)
  const [producerRate, setProducerRate] = useState(35)
  const [hoursPerDay, setHoursPerDay] = useState(2)
  const [softwareCost, setSoftwareCost] = useState(400)
  const [leakage, setLeakage] = useState(500)

  const calculations = useMemo(() => {
    const workingDays = 22

    const adminLaborMonth = adminStaff * adminRate * hoursPerDay * workingDays
    const producerLostTimeMonth = producers * producerRate * hoursPerDay * workingDays
    const currentSoftwareMonth = softwareCost
    const commissionLeakageMonth = leakage

    const totalCurrentMonth =
      adminLaborMonth + producerLostTimeMonth + currentSoftwareMonth + commissionLeakageMonth
    const totalCurrentYear = totalCurrentMonth * 12

    const aiTrackerCost = getTierCost(producers)
    const tierLabel = getTierLabel(producers)

    // With AI Commission Tracker:
    // 70% reduction in admin hours
    const reducedAdminLabor = adminLaborMonth * 0.3
    // Producers reclaim most of their admin time (70% reduction)
    const reducedProducerLost = producerLostTimeMonth * 0.3
    // Software cost replaced by AI Commission Tracker
    const newSoftwareCost = aiTrackerCost
    // 80% reduction in commission leakage
    const reducedLeakage = commissionLeakageMonth * 0.2

    const totalNewMonth = reducedAdminLabor + reducedProducerLost + newSoftwareCost + reducedLeakage
    const totalNewYear = totalNewMonth * 12

    const savingsMonth = totalCurrentMonth - totalNewMonth
    const savingsYear = savingsMonth * 12

    return {
      adminLaborMonth,
      producerLostTimeMonth,
      currentSoftwareMonth,
      commissionLeakageMonth,
      totalCurrentMonth,
      totalCurrentYear,
      aiTrackerCost,
      tierLabel,
      reducedAdminLabor,
      reducedProducerLost,
      newSoftwareCost,
      reducedLeakage,
      totalNewMonth,
      totalNewYear,
      savingsMonth,
      savingsYear,
    }
  }, [producers, adminStaff, adminRate, producerRate, hoursPerDay, softwareCost, leakage])

  const handleNumberChange = (
    setter: (val: number) => void,
    value: string,
    min: number = 0
  ) => {
    const num = parseFloat(value)
    if (isNaN(num) || num < min) {
      setter(min)
    } else {
      setter(num)
    }
  }

  return (
    <div id="calculator" className="mt-16">
      {/* Navy Blue Hero Band */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-10 rounded-xl mb-10">
        <div className="text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Agency Total Cost Calculator
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            See how much your back office is really costing you and how much you
            could save with AI Commission Tracker
          </p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN: Inputs */}
          <div className="bg-white border-2 border-primary/20 rounded-xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-6">
              Your Agency Numbers
            </h3>

            <div className="space-y-5">
              {/* Producers */}
              <div>
                <label
                  htmlFor="calc-producers"
                  className="block text-sm font-semibold text-neutral mb-1.5"
                >
                  How many producers/agents are on your team?
                </label>
                <input
                  id="calc-producers"
                  type="number"
                  min={1}
                  value={producers}
                  onChange={(e) => handleNumberChange(setProducers, e.target.value, 1)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                />
              </div>

              {/* Admin Staff */}
              <div>
                <label
                  htmlFor="calc-admin-staff"
                  className="block text-sm font-semibold text-neutral mb-1.5"
                >
                  How many admin staff handle your back office?
                </label>
                <input
                  id="calc-admin-staff"
                  type="number"
                  min={0}
                  value={adminStaff}
                  onChange={(e) => handleNumberChange(setAdminStaff, e.target.value, 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                />
              </div>

              {/* Admin Hourly Rate */}
              <div>
                <label
                  htmlFor="calc-admin-rate"
                  className="block text-sm font-semibold text-neutral mb-1.5"
                >
                  What is your admin hourly rate?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light font-medium">
                    $
                  </span>
                  <input
                    id="calc-admin-rate"
                    type="number"
                    min={0}
                    value={adminRate}
                    onChange={(e) => handleNumberChange(setAdminRate, e.target.value, 0)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                  />
                </div>
              </div>

              {/* Producer Hourly Rate */}
              <div>
                <label
                  htmlFor="calc-producer-rate"
                  className="block text-sm font-semibold text-neutral mb-1.5"
                >
                  What is your average producer hourly rate?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light font-medium">
                    $
                  </span>
                  <input
                    id="calc-producer-rate"
                    type="number"
                    min={0}
                    value={producerRate}
                    onChange={(e) => handleNumberChange(setProducerRate, e.target.value, 0)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                  />
                </div>
              </div>

              {/* Hours Per Day */}
              <div>
                <label
                  htmlFor="calc-hours"
                  className="block text-sm font-semibold text-neutral mb-1.5"
                >
                  Hours per day each person spends on admin/back office tasks?
                </label>
                <input
                  id="calc-hours"
                  type="number"
                  min={0}
                  max={8}
                  step={0.5}
                  value={hoursPerDay}
                  onChange={(e) => handleNumberChange(setHoursPerDay, e.target.value, 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                />
              </div>

              {/* Current Software Cost */}
              <div>
                <label
                  htmlFor="calc-software"
                  className="block text-sm font-semibold text-neutral mb-1.5"
                >
                  Current AMS &amp; CRM software cost per month?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light font-medium">
                    $
                  </span>
                  <input
                    id="calc-software"
                    type="number"
                    min={0}
                    value={softwareCost}
                    onChange={(e) => handleNumberChange(setSoftwareCost, e.target.value, 0)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                  />
                </div>
              </div>

              {/* Commission Leakage */}
              <div>
                <label
                  htmlFor="calc-leakage"
                  className="block text-sm font-semibold text-neutral mb-1.5"
                >
                  Estimated commission leakage per month?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light font-medium">
                    $
                  </span>
                  <input
                    id="calc-leakage"
                    type="number"
                    min={0}
                    value={leakage}
                    onChange={(e) => handleNumberChange(setLeakage, e.target.value, 0)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                  />
                </div>
                <p className="text-xs text-neutral-light mt-1">
                  Missed payments, underpayments, and untracked chargebacks
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="space-y-6">
            {/* Current Cost Breakdown */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-red-800 mb-5">
                Your Current Back Office Cost
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="text-red-700 text-sm">
                    Admin labor ({adminStaff} staff x ${adminRate}/hr x {hoursPerDay}hrs x 22 days)
                  </span>
                  <span className="font-semibold text-red-800">
                    {formatCurrency(calculations.adminLaborMonth)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="text-red-700 text-sm">
                    Producer lost selling time ({producers} x ${producerRate}/hr x {hoursPerDay}hrs x 22 days)
                  </span>
                  <span className="font-semibold text-red-800">
                    {formatCurrency(calculations.producerLostTimeMonth)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="text-red-700 text-sm">Current software cost</span>
                  <span className="font-semibold text-red-800">
                    {formatCurrency(calculations.currentSoftwareMonth)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="text-red-700 text-sm">Commission leakage</span>
                  <span className="font-semibold text-red-800">
                    {formatCurrency(calculations.commissionLeakageMonth)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="font-bold text-red-900">Total per month</span>
                  <span className="font-bold text-xl text-red-900">
                    {formatCurrency(calculations.totalCurrentMonth)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-900">Total per year</span>
                  <span className="font-bold text-2xl text-red-900">
                    {formatCurrency(calculations.totalCurrentYear)}
                  </span>
                </div>
              </div>
            </div>

            {/* With AI Commission Tracker */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-green-800 mb-5">
                With AI Commission Tracker
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-green-700 text-sm">
                    Admin labor (70% reduction)
                  </span>
                  <span className="font-semibold text-green-800">
                    {formatCurrency(calculations.reducedAdminLabor)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-green-700 text-sm">
                    Producer admin time (70% reduction)
                  </span>
                  <span className="font-semibold text-green-800">
                    {formatCurrency(calculations.reducedProducerLost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-green-700 text-sm">
                    AI Commission Tracker ({calculations.tierLabel})
                  </span>
                  <span className="font-semibold text-green-800">
                    {formatCurrency(calculations.newSoftwareCost)}/mo
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-green-700 text-sm">
                    Commission leakage (80% reduction)
                  </span>
                  <span className="font-semibold text-green-800">
                    {formatCurrency(calculations.reducedLeakage)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="font-bold text-green-900">New total per month</span>
                  <span className="font-bold text-xl text-green-900">
                    {formatCurrency(calculations.totalNewMonth)}
                  </span>
                </div>
              </div>
            </div>

            {/* Annual Savings Highlight */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 md:p-8 text-white text-center">
              <div className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">
                Your Annual Savings
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {formatCurrency(calculations.savingsYear)}
              </div>
              <div className="text-blue-200 text-lg mb-1">
                per year ({formatCurrency(calculations.savingsMonth)}/month)
              </div>
              <div className="text-blue-300 text-sm mb-6">
                That is a{' '}
                {calculations.totalCurrentMonth > 0
                  ? Math.round(
                      ((calculations.totalCurrentMonth - calculations.totalNewMonth) /
                        calculations.totalCurrentMonth) *
                        100
                    )
                  : 0}
                % reduction in back office costs
              </div>
              <a
                href="https://ams.metropointtech.com/login"
                className="inline-block bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-lg text-xl font-semibold transition shadow-lg"
              >
                Start Your Free Trial
              </a>
              <p className="text-sm text-blue-200 mt-3">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

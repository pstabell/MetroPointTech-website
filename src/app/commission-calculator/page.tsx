'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

// Metadata must be in a separate layout or handled differently for client components
// We'll use head tags via Next.js conventions

export default function CommissionCalculatorPage() {
  const [premium, setPremium] = useState('')
  const [rate, setRate] = useState('')
  const [actual, setActual] = useState('')
  const [showResults, setShowResults] = useState(false)

  const parseDollar = (val: string) => {
    const num = parseFloat(val.replace(/[^0-9.]/g, ''))
    return isNaN(num) ? 0 : num
  }

  const parsePercent = (val: string) => {
    const num = parseFloat(val.replace(/[^0-9.]/g, ''))
    return isNaN(num) ? 0 : num
  }

  const premiumNum = parseDollar(premium)
  const rateNum = parsePercent(rate)
  const actualNum = parseDollar(actual)

  const expectedCommission = premiumNum * (rateNum / 100)
  const commissionGap = expectedCommission - actualNum
  const leakPercentage = expectedCommission > 0 ? (commissionGap / expectedCommission) * 100 : 0

  const canCalculate = premiumNum > 0 && rateNum > 0 && actualNum > 0

  const handleCalculate = () => {
    if (canCalculate) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setPremium('')
    setRate('')
    setActual('')
    setShowResults(false)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const getStatusColor = () => {
    if (leakPercentage < 1) return 'green'
    if (leakPercentage <= 3) return 'yellow'
    return 'red'
  }

  const getStatusMessage = () => {
    const color = getStatusColor()
    if (color === 'green') return 'Your commissions look healthy'
    if (color === 'yellow') return 'You may have a small leak worth investigating'
    return `You could be losing ${formatCurrency(commissionGap)}+ per year`
  }

  const getStatusStyles = () => {
    const color = getStatusColor()
    if (color === 'green') return { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700', badge: 'bg-green-500' }
    if (color === 'yellow') return { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-500' }
    return { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700', badge: 'bg-red-500' }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Band */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-8 md:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Free Commission Leak Calculator
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Find out if your carriers are underpaying you in 30 seconds
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-primary/20 rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl font-bold text-primary mb-6">Enter Your Numbers</h2>

            <div className="space-y-5">
              {/* Total Annual Book Premium */}
              <div>
                <label htmlFor="premium" className="block text-sm font-semibold text-neutral mb-1.5">
                  Total Annual Book Premium
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light font-medium">$</span>
                  <input
                    id="premium"
                    type="text"
                    inputMode="decimal"
                    placeholder="500,000"
                    value={premium}
                    onChange={(e) => {
                      setPremium(e.target.value)
                      setShowResults(false)
                    }}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                  />
                </div>
                <p className="text-xs text-neutral-light mt-1">Your total written premium across all carriers</p>
              </div>

              {/* Expected Average Commission Rate */}
              <div>
                <label htmlFor="rate" className="block text-sm font-semibold text-neutral mb-1.5">
                  Expected Average Commission Rate
                </label>
                <div className="relative">
                  <input
                    id="rate"
                    type="text"
                    inputMode="decimal"
                    placeholder="12"
                    value={rate}
                    onChange={(e) => {
                      setRate(e.target.value)
                      setShowResults(false)
                    }}
                    className="w-full pl-4 pr-8 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-light font-medium">%</span>
                </div>
                <p className="text-xs text-neutral-light mt-1">Typical new business rate for your carriers (e.g. 10-15%)</p>
              </div>

              {/* Actual Commission Received */}
              <div>
                <label htmlFor="actual" className="block text-sm font-semibold text-neutral mb-1.5">
                  Actual Commission Received Last Year
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-light font-medium">$</span>
                  <input
                    id="actual"
                    type="text"
                    inputMode="decimal"
                    placeholder="54,000"
                    value={actual}
                    onChange={(e) => {
                      setActual(e.target.value)
                      setShowResults(false)
                    }}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg transition"
                  />
                </div>
                <p className="text-xs text-neutral-light mt-1">Total commission dollars deposited in the last 12 months</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCalculate}
                disabled={!canCalculate}
                className={`flex-1 py-3 rounded-lg text-lg font-semibold transition ${
                  canCalculate
                    ? 'bg-accent hover:bg-accent-dark text-white cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Calculate My Leak
              </button>
              {showResults && (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg text-lg font-semibold border-2 border-gray-200 text-neutral hover:bg-gray-50 transition"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {showResults && canCalculate && (
            <div className="mt-8 space-y-6">
              {/* Status Banner */}
              <div className={`${getStatusStyles().bg} border-2 ${getStatusStyles().border} rounded-xl p-6 text-center`}>
                <div className={`inline-block ${getStatusStyles().badge} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                  {leakPercentage < 1 ? 'HEALTHY' : leakPercentage <= 3 ? 'WARNING' : 'LEAK DETECTED'}
                </div>
                <div className={`text-3xl md:text-4xl font-bold ${getStatusStyles().text} mb-2`}>
                  {commissionGap > 0 ? formatCurrency(commissionGap) : '$0'} Gap
                </div>
                <p className={`text-lg ${getStatusStyles().text}`}>
                  {getStatusMessage()}
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-neutral-lighter rounded-xl p-6">
                <h3 className="font-bold text-primary mb-4">Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-neutral-light">Total Annual Premium</span>
                    <span className="font-semibold">{formatCurrency(premiumNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-neutral-light">Expected Rate</span>
                    <span className="font-semibold">{rateNum}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-neutral-light">Expected Commission</span>
                    <span className="font-semibold">{formatCurrency(expectedCommission)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-neutral-light">Actual Commission Received</span>
                    <span className="font-semibold">{formatCurrency(actualNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-bold text-primary">Commission Gap</span>
                    <span className={`font-bold text-lg ${getStatusStyles().text}`}>
                      {commissionGap > 0 ? formatCurrency(commissionGap) : '$0'} ({leakPercentage > 0 ? leakPercentage.toFixed(1) : '0'}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 md:p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">
                  AI Commission Tracker catches these leaks automatically.
                </h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Stop losing revenue to commission errors. Upload your carrier statements and see exactly where the money goes.
                </p>
                <a
                  href="https://www.metropointtech.com/ams-app"
                  className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg"
                >
                  Start Your Free Trial
                </a>
                <p className="text-sm text-blue-200 mt-3">No credit card required. 14-day free trial.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Explainer Section (always visible) */}
      <section className="py-10 md:py-14 bg-neutral-lighter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Commission Leaks Happen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">1</div>
              <h3 className="font-bold mb-2">Rate Changes</h3>
              <p className="text-sm text-neutral-light">
                Carriers adjust commission schedules and agents don't always catch when rates drop mid-term.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">2</div>
              <h3 className="font-bold mb-2">Missed Payments</h3>
              <p className="text-sm text-neutral-light">
                Policies renew, but the commission payment never arrives. Without tracking, it goes unnoticed.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">3</div>
              <h3 className="font-bold mb-2">Chargebacks</h3>
              <p className="text-sm text-neutral-light">
                Cancellations and chargebacks eat into your commissions. Are they all legitimate?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

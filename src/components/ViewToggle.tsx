'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ViewToggle() {
  const [view, setView] = useState<'agent' | 'agency'>('agent')

  return (
    <div>
      {/* Toggle Button */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-100 rounded-xl p-1.5 border border-gray-200">
          <button
            onClick={() => setView('agent')}
            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all ${
              view === 'agent'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👤 Agent View
          </button>
          <button
            onClick={() => setView('agency')}
            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all ${
              view === 'agency'
                ? 'bg-violet-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🏢 Agency View
          </button>
        </div>
      </div>

      {view === 'agent' ? (
        <div>
          <p className="text-center text-lg text-neutral-dark mb-10 max-w-3xl mx-auto">
            Solo agents use Agent View to track their own commissions, catch discrepancies, and make sure they get paid every dollar they earned.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                <Image src="/images/ams-app/reconciliation.png" alt="Commission reconciliation" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Upload & Reconcile</h3>
              <p className="text-neutral-dark">Import your commission statements and instantly see what matched, what is missing, and what needs attention.</p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                <Image src="/images/ams-app/carriers.png" alt="Carrier management" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Carrier Management</h3>
              <p className="text-neutral-dark">All your carriers in one place. Progressive, Travelers, Safeco, and many more P&C carriers supported.</p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                <Image src="/images/ams-app/ledger.png" alt="Policy revenue ledger" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Policy Revenue Ledger</h3>
              <p className="text-neutral-dark">Track every commission dollar across all your policies in one clear ledger.</p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
                <Image src="/images/ams-app/f1-dark-dashboard.png" alt="Dashboard dark mode" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Dark Mode</h3>
              <p className="text-neutral-dark">Switch between light and dark themes. Your preference, your comfort.</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center text-lg text-neutral-dark mb-10 max-w-3xl mx-auto">
            Agency owners and managers use Agency View to reconcile carrier statements, manage agents, and oversee all commissions across the entire team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                <Image src="/images/ams-app/f2-dashboard.png" alt="Agency dashboard" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Agency Dashboard</h3>
              <p className="text-neutral-dark">See all commissions, policies, and transactions across your entire agency in one view.</p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                <Image src="/images/ams-app/f2-reconciliation.png" alt="Agency reconciliation" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Agency Reconciliation</h3>
              <p className="text-neutral-dark">Upload carrier commission statements and reconcile across all agents and house accounts.</p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                <Image src="/images/ams-app/f2-admin.png" alt="Admin panel" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Admin Panel</h3>
              <p className="text-neutral-dark">Manage users, carriers, commission rules, and column mappings from one central control panel.</p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-violet-600">
                <Image src="/images/ams-app/f2-dark-dashboard.png" alt="Agency dark mode" width={1440} height={900} className="w-full h-auto" />
              </div>
              <h3 className="font-bold text-xl mt-4 mb-2">Dark Mode</h3>
              <p className="text-neutral-dark">The full agency experience is available in dark mode for comfortable extended use.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

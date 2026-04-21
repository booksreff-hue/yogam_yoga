import React from "react"
import FadeIn from "../components/FadeIn"
import { Clock, Sun, Moon, Phone } from "lucide-react"

export default function ClassTimings() {
  return (
    <section id="class-timings" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <FadeIn className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-title text-ocean-900 mb-4 tracking-tight">Class Timings</h2>
          <p className="text-xl md:text-2xl font-title text-azure-700 italic">Find a batch that fits your schedule</p>
          <div className="w-20 h-1 bg-gradient-to-r from-aqua-500 to-azure-600 mx-auto rounded-full mt-6" />
        </FadeIn>

        <FadeIn className="space-y-8">
          {/* Morning Batches */}
          <div className="bg-[#ffffe6] rounded-2xl shadow-lg p-8 border border-aqua-200/60">
            <div className="flex items-center gap-3 mb-6">
              <Sun className="w-8 h-8 text-amber-500" />
              <h3 className="text-2xl md:text-3xl font-title text-ocean-900">Morning Batches</h3>
            </div>

            <div className="space-y-6">
              {/* Batch 1 - Pravin */}
              <div className="rounded-xl bg-[#b8f9ff] p-5 border border-aqua-200/60">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-ocean-600" />
                  <span className="font-semibold text-ocean-900">Batch 1</span>
                </div>
                <ul className="text-ocean-700 space-y-1 text-sm">
                  <li>6:30 AM - 7:30 AM</li>
                  <li>Monday to Friday</li>
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-medium text-ocean-800">Teacher:</span>
                  <span className="text-sm text-ocean-700">Pravin</span>
                </div>
                <a href="tel:9881144997" className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                  <Phone className="w-4 h-4" /> 9881144997
                </a>
              </div>

              {/* Batch 2 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#b8f9ff] p-5 border border-aqua-200/60">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-ocean-600" />
                    <span className="font-semibold text-ocean-900">Batch 2</span>
                  </div>
                  <ul className="text-ocean-700 space-y-1 text-sm">
                    <li>8:00 AM - 9:00 AM</li>
                    <li>Monday, Wednesday, Friday</li>
                  </ul>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-medium text-ocean-800">Teacher:</span>
                    <span className="text-sm text-ocean-700">Sultan</span>
                  </div>
                  <a href="tel:9928118704" className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                    <Phone className="w-4 h-4" /> 9928118704
                  </a>
                </div>

                <div className="rounded-xl bg-[#b8f9ff] p-5 border border-aqua-200/60">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-ocean-600" />
                    <span className="font-semibold text-ocean-900">Batch 2</span>
                  </div>
                  <ul className="text-ocean-700 space-y-1 text-sm">
                    <li>8:00 AM - 9:00 AM</li>
                    <li>Tuesday, Thursday, Saturday</li>
                  </ul>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-medium text-ocean-800">Teacher:</span>
                    <span className="text-sm text-ocean-700">Austin</span>
                  </div>
                  <a href="tel:9665004092" className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                    <Phone className="w-4 h-4" /> 9665004092
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Evening Batches */}
          <div className="bg-[#ffffe6] rounded-2xl shadow-lg p-8 border border-aqua-200/60">
            <div className="flex items-center gap-3 mb-6">
              <Moon className="w-8 h-8 text-indigo-500" />
              <h3 className="text-2xl md:text-3xl font-title text-ocean-900">Evening Batches</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Batch 1 - Pravin */}
              <div className="rounded-xl bg-[#b8f9ff] p-5 border border-aqua-200/60">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-ocean-600" />
                  <span className="font-semibold text-ocean-900">Batch 1</span>
                </div>
                <ul className="text-ocean-700 space-y-1 text-sm">
                  <li>5:30 PM - 6:30 PM</li>
                  <li>Monday, Wednesday, Friday</li>
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-medium text-ocean-800">Teacher:</span>
                  <span className="text-sm text-ocean-700">Pravin</span>
                </div>
                <a href="tel:9881144997" className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                  <Phone className="w-4 h-4" /> 9881144997
                </a>
              </div>

              {/* Batch 2 - Pravin */}
              <div className="rounded-xl bg-[#b8f9ff] p-5 border border-aqua-200/60">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-ocean-600" />
                  <span className="font-semibold text-ocean-900">Batch 2</span>
                </div>
                <ul className="text-ocean-700 space-y-1 text-sm">
                  <li>7:00 PM - 8:00 PM</li>
                  <li>Monday to Friday</li>
                </ul>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-medium text-ocean-800">Teacher:</span>
                  <span className="text-sm text-ocean-700">Pravin</span>
                </div>
                <a href="tel:9881144997" className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                  <Phone className="w-4 h-4" /> 9881144997
                </a>
              </div>
            </div>
          </div>

          {/* Free Trials */}
          <div className="bg-[#b8f9ff] rounded-2xl p-6 border border-aqua-200/60 text-center">
            <h3 className="text-xl md:text-2xl font-title text-ocean-900 mb-2">Free Trials Available!</h3>
            <p className="text-ocean-700">
              One full week of free trials. Come experience our classes before committing.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

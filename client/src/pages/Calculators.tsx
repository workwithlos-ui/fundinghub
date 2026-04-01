/* Design: Growth Engine - Dynamic Momentum
 * Funding calculators: Loan Payment + Credit Stacking */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Calculator, CreditCard, DollarSign, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES } from "@/lib/data";

function LoanCalculator() {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("8");
  const [term, setTerm] = useState("60");
  const monthly = (() => {
    const p = parseFloat(amount) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = parseInt(term) || 1;
    if (r === 0) return p / n;
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  })();
  const total = monthly * (parseInt(term) || 1);
  const interest = total - (parseFloat(amount) || 0);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Loan Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
          <input type="range" min="5000" max="5000000" step="5000" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-2 accent-[#1e40af]" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1"
            className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
          <input type="range" min="1" max="30" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)}
            className="w-full mt-2 accent-[#1e40af]" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Loan Term (months)</label>
          <input type="number" value={term} onChange={(e) => setTerm(e.target.value)}
            className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
          <input type="range" min="3" max="300" step="3" value={term} onChange={(e) => setTerm(e.target.value)}
            className="w-full mt-2 accent-[#1e40af]" />
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-slate-900 mb-6">Payment Summary</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <p className="text-xs text-slate-500">Monthly Payment</p>
            <p className="font-heading font-extrabold text-3xl text-[#1e40af]">${monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-4 border border-slate-100">
              <p className="text-xs text-slate-500">Total Payment</p>
              <p className="font-heading font-bold text-lg text-slate-900">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-100">
              <p className="text-xs text-slate-500">Total Interest</p>
              <p className="font-heading font-bold text-lg text-red-600">${interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>
        <Link href="/apply">
          <Button className="w-full mt-6 bg-[#059669] hover:bg-[#047857] text-white font-semibold">
            Apply for This Amount <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function StackingCalculator() {
  const [creditScore, setCreditScore] = useState("720");
  const [numCards, setNumCards] = useState("8");
  const score = parseInt(creditScore) || 700;
  const cards = parseInt(numCards) || 5;
  const avgLimit = score >= 750 ? 30000 : score >= 700 ? 22000 : score >= 680 ? 15000 : 8000;
  const total = avgLimit * cards;
  const savings = total * 0.18 * 1.5; // 18% APR savings over 18 months

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Your Credit Score</label>
          <input type="number" value={creditScore} onChange={(e) => setCreditScore(e.target.value)}
            className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
          <input type="range" min="580" max="850" step="10" value={creditScore} onChange={(e) => setCreditScore(e.target.value)}
            className="w-full mt-2 accent-[#059669]" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Number of Cards to Apply For</label>
          <input type="number" value={numCards} onChange={(e) => setNumCards(e.target.value)}
            className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
          <input type="range" min="3" max="15" step="1" value={numCards} onChange={(e) => setNumCards(e.target.value)}
            className="w-full mt-2 accent-[#059669]" />
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-xs font-medium text-[#1e40af] mb-1">How it works</p>
          <p className="text-sm text-slate-600">We estimate average credit limits based on your score and the number of strategic applications. Actual results may vary based on your full credit profile.</p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-heading font-bold text-lg text-slate-900 mb-6">Stacking Estimate</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-slate-100">
            <p className="text-xs text-slate-500">Estimated Total Credit</p>
            <p className="font-heading font-extrabold text-3xl text-[#059669]">${total.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-4 border border-slate-100">
              <p className="text-xs text-slate-500">Avg. Per Card</p>
              <p className="font-heading font-bold text-lg text-slate-900">${avgLimit.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-100">
              <p className="text-xs text-slate-500">Interest Saved (18mo)</p>
              <p className="font-heading font-bold text-lg text-[#059669]">${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            <p className="text-xs text-emerald-800">At 0% APR for 12-21 months, you save compared to traditional financing at 18% APR.</p>
          </div>
        </div>
        <Link href="/apply">
          <Button className="w-full mt-6 bg-[#059669] hover:bg-[#047857] text-white font-semibold">
            Start Credit Card Stacking <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function Calculators() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Tools</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">Funding Calculators</h1>
            <p className="text-lg text-slate-300 max-w-xl">Estimate your monthly payments and see how much you could access through credit card stacking.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="loan" className="space-y-8">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
              <TabsTrigger value="loan" className="rounded-lg text-sm font-medium data-[state=active]:bg-[#1e40af] data-[state=active]:text-white px-6">
                <Calculator className="w-4 h-4 mr-1.5" /> Loan Payment Calculator
              </TabsTrigger>
              <TabsTrigger value="stacking" className="rounded-lg text-sm font-medium data-[state=active]:bg-[#1e40af] data-[state=active]:text-white px-6">
                <CreditCard className="w-4 h-4 mr-1.5" /> Credit Stacking Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="loan">
              <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-1">Loan Payment Calculator</h2>
                <p className="text-sm text-slate-500 mb-6">Calculate your estimated monthly payment for any business loan.</p>
                <LoanCalculator />
              </Card>
            </TabsContent>

            <TabsContent value="stacking">
              <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-1">Credit Card Stacking Calculator</h2>
                <p className="text-sm text-slate-500 mb-6">Estimate how much 0% interest credit you could access through strategic card applications.</p>
                <StackingCalculator />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
}

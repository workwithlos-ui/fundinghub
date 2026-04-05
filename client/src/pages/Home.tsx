import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Building2, Wrench, ArrowRight, Star,
  CheckCircle2, Sparkles, Shield, Target, Activity, Landmark, CreditCard
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fundingOptions, faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ── Intelligent Funding Engine ── */
const FUNDING_KNOWLEDGE = {
  "business-capital": {
    name: "Unsecured Business Capital",
    minCredit: 680,
    minRevenue: 0,
    minTime: 0,
    maxAmount: 250000,
    rate: "0% intro for 12–21 mo",
    speed: "7–14 days",
    likelihood: (c: number) => c >= 740 ? 95 : c >= 700 ? 85 : 70,
    timeline: "7–14 business days",
    programs: ["Chase Ink Business", "Amex Blue Business", "BofA Business Advantage"]
  },
  "line-of-credit": {
    name: "Business Line of Credit",
    minCredit: 600,
    minRevenue: 10000,
    minTime: 0.5,
    maxAmount: 500000,
    rate: "7–25% APR",
    speed: "3–10 days",
    likelihood: (c: number, r: number) => r >= 50000 ? 90 : 75,
    timeline: "3–5 business days",
    programs: ["Revolving Credit Line", "Working Capital Reserve"]
  },
  "revenue-based": {
    name: "Revenue-Based Funding",
    minCredit: 500,
    minRevenue: 15000,
    minTime: 0.3,
    maxAmount: 1000000,
    rate: "Factor 1.1–1.5",
    speed: "24–72 hours",
    likelihood: (r: number) => r >= 30000 ? 98 : 85,
    timeline: "24–48 hours",
    programs: ["Merchant Cash Advance", "Revenue Advance", "Sales-Based Financing"]
  },
  "sba-7a": {
    name: "SBA 7(a) Loan",
    minCredit: 680,
    minRevenue: 25000,
    minTime: 2,
    maxAmount: 5000000,
    rate: "Prime + 2.25–4.75%",
    speed: "30–90 days",
    likelihood: (c: number, t: number) => (c >= 700 && t >= 3) ? 80 : 40,
    timeline: "45–60 days",
    programs: ["SBA 7(a) Standard", "SBA Express", "SBA 504"]
  },
  "equipment": {
    name: "Equipment Financing",
    minCredit: 580,
    minRevenue: 5000,
    minTime: 0,
    maxAmount: 2000000,
    rate: "4.5–18% APR",
    speed: "3–10 days",
    likelihood: (c: number) => c >= 650 ? 90 : 70,
    timeline: "5–7 business days",
    programs: ["Equipment Lease", "Equipment Loan", "Section 179 Financing"]
  }
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Intelligent Funding Calculator ── */
function IntelligentCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    revenue: "",
    timeInBusiness: "",
    creditScore: "",
    amountNeeded: "",
    useOfFunds: ""
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateResults = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const rev = parseInt(formData.revenue) || 0;
      const years = parseFloat(formData.timeInBusiness) || 0;
      const credit = parseInt(formData.creditScore) || 0;

      const results: any[] = [];

      if (credit >= FUNDING_KNOWLEDGE["business-capital"].minCredit) {
        results.push({
          ...FUNDING_KNOWLEDGE["business-capital"],
          score: FUNDING_KNOWLEDGE["business-capital"].likelihood(credit),
          match: "Best Match"
        });
      }
      if (rev >= FUNDING_KNOWLEDGE["line-of-credit"].minRevenue && years >= FUNDING_KNOWLEDGE["line-of-credit"].minTime) {
        results.push({
          ...FUNDING_KNOWLEDGE["line-of-credit"],
          score: FUNDING_KNOWLEDGE["line-of-credit"].likelihood(credit, rev),
          match: rev > 50000 ? "Elite Match" : "Strong Match"
        });
      }
      if (rev >= FUNDING_KNOWLEDGE["revenue-based"].minRevenue) {
        results.push({
          ...FUNDING_KNOWLEDGE["revenue-based"],
          score: FUNDING_KNOWLEDGE["revenue-based"].likelihood(rev),
          match: "Fastest Path"
        });
      }
      if (credit >= FUNDING_KNOWLEDGE["sba-7a"].minCredit && years >= FUNDING_KNOWLEDGE["sba-7a"].minTime) {
        results.push({
          ...FUNDING_KNOWLEDGE["sba-7a"],
          score: FUNDING_KNOWLEDGE["sba-7a"].likelihood(credit, years),
          match: "Lowest Rate"
        });
      }
      if (formData.useOfFunds === "equipment" || credit >= 580) {
        results.push({
          ...FUNDING_KNOWLEDGE["equipment"],
          score: FUNDING_KNOWLEDGE["equipment"].likelihood(credit),
          match: "Asset-Backed"
        });
      }

      // Fallback: always give at least one result
      if (results.length === 0) {
        results.push({
          ...FUNDING_KNOWLEDGE["revenue-based"],
          score: 75,
          match: "Recommended Path"
        });
      }

      setRecommendations(results.sort((a, b) => b.score - a.score).slice(0, 3));
      setIsCalculating(false);
      setStep(3);
    }, 1500);
  };

  return (
    <Card className="relative overflow-hidden bg-white border-slate-200/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-0 w-full max-w-xl rounded-3xl">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
        <motion.div
          className="h-full bg-slate-950"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-8 lg:p-10">
        <AnimatePresence mode="wait">
          {/* Step 1: Business Profile */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Step 1 of 2</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">See what you qualify for</h3>
                <p className="text-slate-500 text-sm">Takes 60 seconds. No credit check.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Revenue</label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => handleInputChange("revenue", e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-950/10 transition-all outline-none text-slate-800"
                  >
                    <option value="">Select range</option>
                    <option value="5000">Under $10K/mo</option>
                    <option value="15000">$10K – $25K/mo</option>
                    <option value="35000">$25K – $50K/mo</option>
                    <option value="75000">$50K – $100K/mo</option>
                    <option value="150000">$100K+/mo</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time in Business</label>
                  <select
                    value={formData.timeInBusiness}
                    onChange={(e) => handleInputChange("timeInBusiness", e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-950/10 transition-all outline-none text-slate-800"
                  >
                    <option value="">Select</option>
                    <option value="0.25">Under 6 months</option>
                    <option value="0.75">6 – 12 months</option>
                    <option value="1.5">1 – 2 years</option>
                    <option value="3">2+ years</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Personal Credit Score</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: "< 580", value: "500" },
                    { label: "580+", value: "580" },
                    { label: "650+", value: "650" },
                    { label: "700+", value: "700" },
                    { label: "750+", value: "750" },
                  ].map((score) => (
                    <button
                      key={score.value}
                      onClick={() => handleInputChange("creditScore", score.value)}
                      className={cn(
                        "h-10 rounded-lg border text-[11px] font-bold transition-all duration-200",
                        formData.creditScore === score.value
                          ? "bg-slate-950 border-slate-950 text-white shadow-lg shadow-slate-950/20"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
                      )}
                    >
                      {score.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!formData.revenue || !formData.timeInBusiness || !formData.creditScore}
                className="w-full h-14 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base transition-all duration-300 group disabled:opacity-40"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-center text-[11px] text-slate-400">No credit check · No commitment · Instant results</p>
            </motion.div>
          )}

          {/* Step 2: Funding Intent */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Step 2 of 2</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">How much do you need?</h3>
                <p className="text-slate-500 text-sm">We'll match you to the right product and lender.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Capital Needed</label>
                  <select
                    value={formData.amountNeeded}
                    onChange={(e) => handleInputChange("amountNeeded", e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-950/10 transition-all outline-none text-slate-800"
                  >
                    <option value="">Select amount</option>
                    <option value="25000">$10K – $50K</option>
                    <option value="75000">$50K – $150K</option>
                    <option value="250000">$150K – $500K</option>
                    <option value="1000000">$500K+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">What's the money for?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "growth", label: "Growth & Marketing", icon: TrendingUp },
                      { id: "inventory", label: "Inventory & Stock", icon: Target },
                      { id: "equipment", label: "Equipment", icon: Wrench },
                      { id: "realestate", label: "Real Estate", icon: Building2 },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleInputChange("useOfFunds", item.id)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200",
                          formData.useOfFunds === item.id
                            ? "bg-slate-950 border-slate-950 text-white shadow-lg shadow-slate-950/20"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4 shrink-0", formData.useOfFunds === item.id ? "text-white" : "text-slate-400")} />
                        <span className="text-xs font-bold leading-tight">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="h-14 px-6 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
                  Back
                </Button>
                <Button
                  onClick={calculateResults}
                  disabled={!formData.amountNeeded || !formData.useOfFunds || isCalculating}
                  className="flex-1 h-14 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base transition-all disabled:opacity-40"
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-pulse" /> Finding your options...
                    </span>
                  ) : "Show My Options"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && recommendations && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Your funding options</h3>
                  <p className="text-slate-500 text-sm">Ranked by approval likelihood.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 shrink-0">
                  {recommendations.length} matches found
                </div>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{rec.match}</span>
                        <h4 className="text-base font-bold text-slate-900">{rec.name}</h4>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-2xl font-bold text-slate-950">{rec.score}%</span>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase leading-tight">Approval Odds</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100/80 mb-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Rate</span>
                        <span className="text-xs font-bold text-slate-700">{rec.rate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Funded In</span>
                        <span className="text-xs font-bold text-slate-700">{rec.timeline}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Up To</span>
                        <span className="text-xs font-bold text-slate-700">${(rec.maxAmount / 1000).toLocaleString()}K</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {rec.programs.map((p: string) => (
                        <span key={p} className="text-[9px] font-medium bg-white border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{p}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                <Link href="/apply">
                  <Button className="w-full h-14 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-xl shadow-slate-950/10 transition-all hover:scale-[1.01]">
                    Apply Now — Get Funded Fast <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <button
                  onClick={() => { setStep(1); setRecommendations(null); setFormData({ revenue: "", timeInBusiness: "", creditScore: "", amountNeeded: "", useOfFunds: "" }); }}
                  className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-1"
                >
                  Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

/* ── Testimonial Card ── */
const testimonials = [
  { name: "Marcus J.", business: "Auto Repair, Atlanta GA", amount: "$175,000", quote: "I needed capital fast to open my second location. FundingHub had me funded in 10 days. The process was shockingly simple.", type: "Business Capital" },
  { name: "David O.", business: "Restaurant Group, Chicago IL", amount: "$250,000", quote: "Banks said no because of my credit score. FundingHub looked at my revenue instead. $250K in 48 hours. Revenue is up 40% since.", type: "Revenue-Based" },
  { name: "Lisa M.", business: "Construction LLC, Phoenix AZ", amount: "$450,000", quote: "We needed equipment for a major contract. FundingHub arranged financing in under a week. We won the contract and paid it off early.", type: "Equipment Financing" },
];

/* ── Main Home Page ── */
export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden subtle-grid">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-5%] left-[5%] w-[35%] h-[50%] bg-slate-100/60 blur-[140px] rounded-full" />
          <div className="absolute bottom-[5%] right-[0%] w-[25%] h-[35%] bg-slate-50 blur-[100px] rounded-full" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 mb-8">
                <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">$50M+ Deployed to 500+ Businesses</span>
              </div>

              <h1 className="text-5xl lg:text-[4.5rem] font-bold text-slate-950 leading-[1.05] mb-6 tracking-tight">
                Get your business<br />
                funded in as little<br />
                <span className="text-slate-400">as 24 hours.</span>
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed mb-4 max-w-lg">
                $25K to $5M. No endless paperwork. No waiting weeks for a bank that's going to say no anyway.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                Tell us about your business and we'll show you exactly what you qualify for — right now.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12">
                <Link href="/apply">
                  <Button className="h-14 px-8 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-2xl shadow-slate-950/15 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                    Apply in 5 Minutes
                  </Button>
                </Link>
                <Link href="/ai-advisor" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors no-underline group">
                  Talk to our AI Advisor <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {[11, 12, 13].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 overflow-hidden ring-1 ring-slate-200">
                      <img src={`https://i.pravatar.cc/100?img=${i}`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-slate-950 text-slate-950" />)}
                  </div>
                  <p className="text-[11px] font-bold text-slate-500">Trusted by 500+ business owners</p>
                </div>
                <div className="h-8 w-px bg-slate-200 mx-2" />
                <div>
                  <p className="text-sm font-bold text-slate-900">93%</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Approval Rate</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Calculator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative"
            >
              <IntelligentCalculator />
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-slate-100/50 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-slate-50 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/40">
        <div className="container">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Funding Through Our Network of 50+ Institutional Lenders</p>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16 opacity-35 grayscale">
            {["CHASE", "WELLS FARGO", "AMEX", "BANK OF AMERICA", "SBA"].map(brand => (
              <span key={brand} className="text-lg font-black tracking-tighter text-slate-900">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "$500M+", label: "Deployed to businesses like yours" },
              { value: "15,000+", label: "Businesses funded and growing" },
              { value: "24 hrs", label: "Fastest time to funding" },
              { value: "93%", label: "Of applicants get approved" },
            ].map((stat, i) => (
              <AnimatedSection key={i} className="text-center lg:text-left">
                <p className="text-4xl lg:text-5xl font-bold text-slate-950 mb-2 tracking-tight">{stat.value}</p>
                <p className="text-sm text-slate-500 leading-snug">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNDING PRODUCTS ── */}
      <section className="py-24 lg:py-32 bg-slate-50/50">
        <div className="container">
          <AnimatedSection className="max-w-3xl mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 mb-6 tracking-tight">
              Every funding product<br />your business needs.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              From fast working capital to long-term SBA loans — we match you to the right product, not just the easiest one to sell.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fundingOptions.map((option, i) => {
              const icons: Record<string, React.ElementType> = {
                "credit-stacking": CreditCard,
                "lines-of-credit": Landmark,
                "revenue-based": TrendingUp,
                "real-estate": Building2,
                "sba-loans": Shield,
                "equipment": Wrench,
              };
              const Icon = icons[option.slug] || TrendingUp;
              return (
                <AnimatedSection key={option.slug}>
                  <Link href={`/funding/${option.slug}`} className="group block h-full no-underline">
                    <Card className="h-full p-8 rounded-3xl border-slate-100 bg-white hover:border-slate-200 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 gap-0">
                      <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-slate-950 group-hover:border-slate-950 transition-all duration-500">
                        <Icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 mb-2 leading-tight">{option.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">{option.tagline}</p>
                      <div className="mt-auto flex items-center text-xs font-bold text-slate-400 group-hover:text-slate-950 transition-colors">
                        Learn more <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 lg:py-32 bg-slate-950 text-white overflow-hidden rounded-[3rem] mx-4 lg:mx-8 my-8">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <AnimatedSection>
                <h2 className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight leading-[1.05]">
                  Funding shouldn't<br />
                  <span className="text-slate-500">take 90 days.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-16 leading-relaxed">
                  We've removed every unnecessary step between you and your capital. Here's how it works.
                </p>
              </AnimatedSection>

              <div className="space-y-12">
                {[
                  { step: "01", title: "Apply in 5 minutes", desc: "Tell us about your business. No tax returns, no business plan required for most products. Just the basics." },
                  { step: "02", title: "Get matched instantly", desc: "Our system analyzes your profile against 50+ lenders and surfaces the options you actually qualify for — not just the ones with the best margins for us." },
                  { step: "03", title: "Funds in your account", desc: "Accept your offer, sign digitally, and receive funds via direct deposit. Some products fund the same day." },
                ].map((item, i) => (
                  <AnimatedSection key={i} className="flex gap-6">
                    <span className="text-sm font-bold text-slate-700 font-mono mt-1 shrink-0">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900 border border-white/10 p-10 space-y-6">
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">What you need to apply</p>
                {[
                  { label: "3 months of bank statements", check: true },
                  { label: "Government-issued ID", check: true },
                  { label: "Basic business information", check: true },
                  { label: "No business plan required", check: true },
                  { label: "No collateral for most products", check: true },
                  { label: "No application fee, ever", check: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-300">{item.label}</span>
                  </div>
                ))}
                <div className="pt-4">
                  <Link href="/apply">
                    <Button className="w-full h-12 bg-white hover:bg-slate-100 text-slate-950 rounded-xl font-bold transition-all">
                      Start Your Application <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="max-w-2xl mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 mb-4 tracking-tight">Real businesses.<br />Real results.</h2>
            <p className="text-lg text-slate-500">We don't just find funding. We find the right funding.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i}>
                <Card className="h-full p-8 rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-500 gap-0">
                  <div className="flex items-center gap-0.5 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-8 flex-1">"{t.quote}"</p>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.business}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-950">{t.amount}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.type}</p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 lg:py-32 bg-slate-50/50">
        <div className="container max-w-4xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-950 mb-4 tracking-tight">Questions we get a lot</h2>
            <p className="text-slate-500">Straight answers. No fluff.</p>
          </AnimatedSection>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-slate-100 rounded-2xl px-6 bg-white hover:border-slate-200 transition-all"
              >
                <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-6 text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 leading-relaxed pb-6 text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container">
          <div className="relative rounded-[3rem] bg-slate-950 p-12 lg:p-24 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
            <div className="absolute top-[-20%] left-[20%] w-[40%] h-[60%] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
                Stop waiting.<br />
                Start growing.
              </h2>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                Every day you wait is a day your competitors aren't. Apply now and see your options in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button className="h-16 px-10 bg-white hover:bg-slate-100 text-slate-950 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-[1.02]">
                    Apply for Funding
                  </Button>
                </Link>
                <Link href="/ai-advisor">
                  <Button variant="outline" className="h-16 px-10 rounded-2xl border-white/20 text-white font-bold text-lg bg-transparent hover:bg-white/10 hover:border-white/40">
                    Talk to AI Advisor
                  </Button>
                </Link>
              </div>
              <p className="text-slate-600 text-sm mt-8">No application fee · No credit check to get started · Results in 60 seconds</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

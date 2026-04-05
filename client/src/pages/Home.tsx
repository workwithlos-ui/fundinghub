import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CreditCard, Landmark, TrendingUp, Building2, ShieldCheck,
  Wrench, BarChart3, MessageSquare, ArrowRight, Star,
  CheckCircle2, Clock, Users, DollarSign, ChevronRight,
  Zap, Sparkles, Shield, Target, Activity, Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES, fundingOptions, testimonials, stats, processSteps, faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ── Intelligent Funding Engine ── */
const FUNDING_KNOWLEDGE = {
  "credit-stacking": {
    name: "0% Credit Card Stacking",
    minCredit: 680,
    minRevenue: 0,
    minTime: 0,
    maxAmount: 250000,
    rate: "0% for 12-21 mo",
    speed: "7-14 days",
    likelihood: (c: number) => c >= 740 ? 95 : (c >= 700 ? 85 : 70),
    timeline: "7-14 business days",
    programs: ["Chase Ink Business", "Amex Blue Business", "BofA Business Advantage"]
  },
  "line-of-credit": {
    name: "Business Line of Credit",
    minCredit: 600,
    minRevenue: 10000,
    minTime: 0.5,
    maxAmount: 500000,
    rate: "7-25% APR",
    speed: "3-10 days",
    likelihood: (c: number, r: number) => r >= 50000 ? 90 : 75,
    timeline: "3-5 business days",
    programs: ["Revolving Credit Line", "Working Capital Reserve"]
  },
  "revenue-based": {
    name: "Revenue-Based Funding",
    minCredit: 500,
    minRevenue: 15000,
    minTime: 0.3,
    maxAmount: 1000000,
    rate: "Factor 1.1-1.5",
    speed: "24-72 hours",
    likelihood: (r: number) => r >= 30000 ? 98 : 85,
    timeline: "24-48 hours",
    programs: ["MCA", "Revenue Advance", "Sales-Based Financing"]
  },
  "sba-7a": {
    name: "SBA 7(a) Loan",
    minCredit: 680,
    minRevenue: 25000,
    minTime: 2,
    maxAmount: 5000000,
    rate: "Prime + 2.25-4.75%",
    speed: "30-90 days",
    likelihood: (c: number, t: number) => (c >= 700 && t >= 3) ? 80 : 40,
    timeline: "45-60 days",
    programs: ["SBA 7(a) Standard", "SBA Express"]
  },
  "equipment": {
    name: "Equipment Financing",
    minCredit: 580,
    minRevenue: 5000,
    minTime: 0,
    maxAmount: 2000000,
    rate: "4.5-18% APR",
    speed: "3-10 days",
    likelihood: (c: number) => c >= 650 ? 90 : 70,
    timeline: "5-7 business days",
    programs: ["Equipment Lease", "Equipment Loan"]
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
    industry: "",
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
      const needed = parseInt(formData.amountNeeded) || 0;

      const results: any[] = [];

      // Logic for recommendations
      if (credit >= FUNDING_KNOWLEDGE["credit-stacking"].minCredit) {
        results.push({
          ...FUNDING_KNOWLEDGE["credit-stacking"],
          score: FUNDING_KNOWLEDGE["credit-stacking"].likelihood(credit),
          match: "High Match"
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
          match: "Instant Approval Path"
        });
      }

      if (credit >= FUNDING_KNOWLEDGE["sba-7a"].minCredit && years >= FUNDING_KNOWLEDGE["sba-7a"].minTime) {
        results.push({
          ...FUNDING_KNOWLEDGE["sba-7a"],
          score: FUNDING_KNOWLEDGE["sba-7a"].likelihood(credit, years),
          match: "Long-term Growth"
        });
      }

      if (formData.useOfFunds === "equipment" || credit >= 580) {
        results.push({
          ...FUNDING_KNOWLEDGE["equipment"],
          score: FUNDING_KNOWLEDGE["equipment"].likelihood(credit),
          match: "Asset-Backed"
        });
      }

      setRecommendations(results.sort((a, b) => b.score - a.score).slice(0, 3));
      setIsCalculating(false);
      setStep(3);
    }, 1500);
  };

  return (
    <Card className="relative overflow-hidden bg-white border-slate-200/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-0 w-full max-w-xl rounded-3xl">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
        <motion.div 
          className="h-full bg-slate-950" 
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="p-8 lg:p-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Funding Analysis</h3>
                <p className="text-slate-500 text-sm">Tell us about your business to see elite funding options.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Revenue</label>
                  <select 
                    value={formData.revenue} 
                    onChange={(e) => handleInputChange("revenue", e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-950/5 transition-all outline-none"
                  >
                    <option value="">Select range</option>
                    <option value="5000">Under $10K</option>
                    <option value="15000">$10K - $25K</option>
                    <option value="35000">$25K - $50K</option>
                    <option value="75000">$50K - $100K</option>
                    <option value="150000">$100K+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time in Business</label>
                  <select 
                    value={formData.timeInBusiness} 
                    onChange={(e) => handleInputChange("timeInBusiness", e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-950/5 transition-all outline-none"
                  >
                    <option value="">Select</option>
                    <option value="0.25">Startup (< 6mo)</option>
                    <option value="0.75">6-12 months</option>
                    <option value="1.5">1-2 years</option>
                    <option value="3">2+ years</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Personal Credit Score</label>
                <div className="grid grid-cols-5 gap-2">
                  {["580-", "580+", "650+", "700+", "750+"].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleInputChange("creditScore", score.replace("+", "").replace("-", "500"))}
                      className={cn(
                        "h-10 rounded-lg border text-[11px] font-bold transition-all",
                        formData.creditScore === score.replace("+", "").replace("-", "500")
                          ? "bg-slate-950 border-slate-950 text-white shadow-lg shadow-slate-950/20"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
                      )}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.revenue || !formData.timeInBusiness || !formData.creditScore}
                className="w-full h-14 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base transition-all group"
              >
                Next Step <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Funding Intent</h3>
                <p className="text-slate-500 text-sm">Precision matching requires understanding your goals.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Capital Needed</label>
                  <select 
                    value={formData.amountNeeded} 
                    onChange={(e) => handleInputChange("amountNeeded", e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-950/5 transition-all outline-none"
                  >
                    <option value="">Select amount</option>
                    <option value="25000">$10K - $50K</option>
                    <option value="75000">$50K - $150K</option>
                    <option value="250000">$150K - $500K</option>
                    <option value="1000000">$500K+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Use of Funds</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "growth", label: "Growth & Marketing", icon: TrendingUp },
                      { id: "inventory", label: "Inventory", icon: Target },
                      { id: "equipment", label: "Equipment", icon: Wrench },
                      { id: "realestate", label: "Real Estate", icon: Building2 },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleInputChange("useOfFunds", item.id)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                          formData.useOfFunds === item.id
                            ? "bg-slate-950 border-slate-950 text-white shadow-lg shadow-slate-950/20"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4", formData.useOfFunds === item.id ? "text-white" : "text-slate-400")} />
                        <span className="text-xs font-bold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="h-14 px-6 rounded-2xl border-slate-200 text-slate-600 font-bold">Back</Button>
                <Button 
                  onClick={calculateResults}
                  disabled={!formData.amountNeeded || !formData.useOfFunds || isCalculating}
                  className="flex-1 h-14 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base transition-all"
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-pulse" /> Analyzing Market...
                    </span>
                  ) : "Generate Recommendations"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && recommendations && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Your Funding Match</h3>
                  <p className="text-slate-500 text-sm">Based on elite lending criteria.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  Analysis Complete
                </div>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{rec.match}</span>
                        <h4 className="text-base font-bold text-slate-900">{rec.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-slate-950">{rec.score}%</span>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Approval Likelihood</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 py-3 border-y border-slate-100/50 mb-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Est. Rate</span>
                        <span className="text-xs font-bold text-slate-700">{rec.rate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Timeline</span>
                        <span className="text-xs font-bold text-slate-700">{rec.timeline}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Max Limit</span>
                        <span className="text-xs font-bold text-slate-700">${(rec.maxAmount/1000).toLocaleString()}K</span>
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
                  <Button className="w-full h-14 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-xl shadow-slate-950/10">
                    Secure Pre-Approval <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <button 
                  onClick={() => setStep(1)} 
                  className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Adjust Parameters & Recalculate
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-slate-950 selection:text-white">
      <Navbar />

      {/* ── Hero: Elite Fintech Style ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden subtle-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-100/50 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-slate-50 blur-[100px] rounded-full" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">The Future of Business Capital</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-950 leading-[1.1] mb-8 tracking-tight">
                Elite funding for <br />
                <span className="text-slate-400">ambitious builders.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
                Access $50K to $5M in institutional capital. No friction, no legacy banking delays. Just the fuel your business deserves.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link href="/apply">
                  <Button className="h-14 px-8 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-2xl shadow-slate-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Start Application
                  </Button>
                </Link>
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-slate-950 text-slate-950" />)}
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Trusted by 500+ Founders</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
                <div>
                  <p className="text-2xl font-bold text-slate-950">$50M+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capital Deployed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-950">24hr</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Approval</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-950">0%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intro Interest</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative"
            >
              <IntelligentCalculator />
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-50 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-100 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/30">
        <div className="container">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Institutional Grade Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale contrast-125">
            {["CHASE", "AMEX", "WELLS FARGO", "BOFA", "SBA"].map(brand => (
              <span key={brand} className="text-xl font-black tracking-tighter text-slate-900">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Grid: Clean & Minimal ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 mb-6 tracking-tight">Capital for every <br />stage of growth.</h2>
            <p className="text-lg text-slate-500 leading-relaxed">We've engineered a suite of funding products designed for the modern entrepreneur. No red tape, just results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundingOptions.map((option, i) => (
              <AnimatedSection key={option.slug}>
                <Link href={`/funding/${option.slug}`} className="group block h-full no-underline">
                  <Card className="h-full p-8 rounded-3xl border-slate-100 bg-white hover:border-slate-200 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-500">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3">{option.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">{option.tagline}</p>
                    <div className="flex items-center text-xs font-bold text-slate-950 group-hover:gap-2 transition-all">
                      Explore Product <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process: Linear Style ── */}
      <section className="py-24 lg:py-32 bg-slate-950 text-white overflow-hidden rounded-[3rem] mx-4 lg:mx-8 mb-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight">Built for speed. <br /><span className="text-slate-500">Optimized for you.</span></h2>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Intelligent Analysis", desc: "Our engine analyzes 100+ data points to find your optimal funding path in seconds." },
                  { step: "02", title: "Elite Matching", desc: "We match you with institutional lenders that fit your specific business profile." },
                  { step: "03", title: "Rapid Funding", desc: "Funds are deployed directly to your account, often in as little as 24 hours." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-sm font-bold text-slate-700 font-mono">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-8 flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-slate-950/50 border border-white/5 flex flex-col items-center justify-center p-10 text-center">
                  <Shield className="w-16 h-16 text-slate-700 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Bank-Grade Security</h3>
                  <p className="text-slate-500 text-sm">Your data is encrypted with AES-256 and never shared without your explicit consent.</p>
                </div>
              </div>
              {/* Floating accents */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-950 mb-4 tracking-tight">Common Questions</h2>
            <p className="text-slate-500">Everything you need to know about elite business funding.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-slate-100 rounded-2xl px-6 bg-slate-50/30 hover:bg-white hover:border-slate-200 transition-all">
                <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container">
          <div className="relative rounded-[3rem] bg-slate-50 border border-slate-100 p-12 lg:p-24 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full subtle-grid opacity-50" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-bold text-slate-950 mb-8 tracking-tight">Ready to scale?</h2>
              <p className="text-lg text-slate-500 mb-12">Join 500+ founders who have secured their future with FundingHub.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button className="h-16 px-10 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-slate-950/20">
                    Apply for Funding
                  </Button>
                </Link>
                <Link href="/ai-advisor">
                  <Button variant="outline" className="h-16 px-10 rounded-2xl border-slate-200 text-slate-900 font-bold text-lg bg-white hover:bg-slate-50">
                    Talk to AI Advisor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

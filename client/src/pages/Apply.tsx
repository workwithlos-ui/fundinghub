/* Design: Growth Engine - Dynamic Momentum
 * Multi-step application: Business Info > Funding Needs > Credit > Owner > Review */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, DollarSign, CreditCard, User, FileCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { industries, fundingPurposes } from "@/lib/data";

const STORAGE_KEY = "fundinghub_application";

interface AppData {
  businessName: string; industry: string; yearsInBusiness: string; annualRevenue: string; monthlyRevenue: string;
  amountNeeded: string; purpose: string; timeline: string; currentDebt: string;
  creditScore: string; bankruptcies: string; taxLiens: string;
  ownerName: string; email: string; phone: string; ownership: string;
}

const initial: AppData = {
  businessName: "", industry: "", yearsInBusiness: "", annualRevenue: "", monthlyRevenue: "",
  amountNeeded: "", purpose: "", timeline: "", currentDebt: "",
  creditScore: "", bankruptcies: "", taxLiens: "",
  ownerName: "", email: "", phone: "", ownership: "",
};

const steps = [
  { id: 1, label: "Business Info", icon: Building2 },
  { id: 2, label: "Funding Needs", icon: DollarSign },
  { id: 3, label: "Credit Profile", icon: CreditCard },
  { id: 4, label: "Owner Info", icon: User },
  { id: 5, label: "Review", icon: FileCheck },
];

function Input({ label, value, onChange, type = "text", placeholder = "", required = true }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-1.5 block">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none transition-all"
      />
    </div>
  );
}

function Select({ label, value, onChange, options, required = true }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-1.5 block">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none transition-all"
      >
        <option value="">Select...</option>
        {options.map((o: string | { label: string; value: string }) =>
          typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
    </div>
  );
}

export default function Apply() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AppData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { setData(JSON.parse(saved)); } catch {} }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = (field: keyof AppData) => (value: string) => setData({ ...data, [field]: value });

  const validate = (): boolean => {
    const errs: string[] = [];
    if (step === 1) {
      if (!data.businessName) errs.push("Business name is required");
      if (!data.industry) errs.push("Industry is required");
      if (!data.yearsInBusiness) errs.push("Years in business is required");
      if (!data.annualRevenue) errs.push("Annual revenue is required");
      if (!data.monthlyRevenue) errs.push("Monthly revenue is required");
    } else if (step === 2) {
      if (!data.amountNeeded) errs.push("Funding amount is required");
      if (!data.purpose) errs.push("Funding purpose is required");
      if (!data.timeline) errs.push("Timeline is required");
    } else if (step === 3) {
      if (!data.creditScore) errs.push("Credit score range is required");
      if (!data.bankruptcies) errs.push("Bankruptcy status is required");
      if (!data.taxLiens) errs.push("Tax lien status is required");
    } else if (step === 4) {
      if (!data.ownerName) errs.push("Owner name is required");
      if (!data.email) errs.push("Email is required");
      if (!data.phone) errs.push("Phone is required");
      if (!data.ownership) errs.push("Ownership percentage is required");
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const next = () => { if (validate()) { setErrors([]); setStep(step + 1); window.scrollTo(0, 0); } };
  const prev = () => { setErrors([]); setStep(step - 1); window.scrollTo(0, 0); };
  const submit = () => {
    const appId = `FH-${Date.now().toString(36).toUpperCase()}`;
    const apps = JSON.parse(localStorage.getItem("fundinghub_apps") || "[]");
    apps.push({ ...data, id: appId, status: "submitted", date: new Date().toISOString() });
    localStorage.setItem("fundinghub_apps", JSON.stringify(apps));
    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20">
          <div className="container max-w-2xl">
            <Card className="p-8 md:p-12 text-center border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#059669]" />
              </div>
              <h1 className="font-heading font-extrabold text-3xl text-slate-900 mb-3">Application Submitted!</h1>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Thank you for applying with FundingHub. Our team will review your application and reach out within 24 hours.
              </p>
              <div className="bg-slate-50 rounded-xl p-6 text-left mb-8">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">What Happens Next</h3>
                <div className="space-y-4">
                  {[
                    { time: "Within 24 hours", desc: "A funding advisor reviews your application and matches you with the best options." },
                    { time: "24-48 hours", desc: "You'll receive a call or email with your personalized funding offers." },
                    { time: "48-72 hours", desc: "Once you accept an offer, funds are deposited into your business account." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1e40af]/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#1e40af]">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.time}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/dashboard">
                  <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="font-semibold">Back to Home</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container max-w-3xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${step >= s.id ? "text-[#1e40af]" : "text-slate-300"}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step > s.id ? "bg-[#059669] text-white" : step === s.id ? "bg-[#1e40af] text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                    </div>
                    <span className="hidden sm:block text-xs font-medium">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > s.id ? "bg-[#059669]" : "bg-slate-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-[#1e40af] to-[#059669] h-1.5 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                {/* Step 1: Business Info */}
                {step === 1 && (
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Business Information</h2>
                    <p className="text-sm text-slate-500 mb-6">Tell us about your business so we can find the right funding options.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <Input label="Business Name" value={data.businessName} onChange={update("businessName")} placeholder="Your Business LLC" />
                      </div>
                      <Select label="Industry" value={data.industry} onChange={update("industry")} options={industries} />
                      <Select label="Years in Business" value={data.yearsInBusiness} onChange={update("yearsInBusiness")} options={[
                        { label: "Less than 6 months", value: "0-6mo" }, { label: "6-12 months", value: "6-12mo" },
                        { label: "1-2 years", value: "1-2yr" }, { label: "2-5 years", value: "2-5yr" }, { label: "5+ years", value: "5+yr" }
                      ]} />
                      <Select label="Annual Revenue" value={data.annualRevenue} onChange={update("annualRevenue")} options={[
                        { label: "Under $100K", value: "<100k" }, { label: "$100K - $250K", value: "100-250k" },
                        { label: "$250K - $500K", value: "250-500k" }, { label: "$500K - $1M", value: "500k-1m" },
                        { label: "$1M - $5M", value: "1-5m" }, { label: "$5M+", value: "5m+" }
                      ]} />
                      <Select label="Monthly Revenue" value={data.monthlyRevenue} onChange={update("monthlyRevenue")} options={[
                        { label: "Under $10K", value: "<10k" }, { label: "$10K - $25K", value: "10-25k" },
                        { label: "$25K - $50K", value: "25-50k" }, { label: "$50K - $100K", value: "50-100k" },
                        { label: "$100K - $250K", value: "100-250k" }, { label: "$250K+", value: "250k+" }
                      ]} />
                    </div>
                  </div>
                )}

                {/* Step 2: Funding Needs */}
                {step === 2 && (
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Funding Needs</h2>
                    <p className="text-sm text-slate-500 mb-6">Help us understand what you need so we can match you with the best options.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Select label="Funding Amount Needed" value={data.amountNeeded} onChange={update("amountNeeded")} options={[
                        { label: "$10K - $25K", value: "10-25k" }, { label: "$25K - $50K", value: "25-50k" },
                        { label: "$50K - $100K", value: "50-100k" }, { label: "$100K - $250K", value: "100-250k" },
                        { label: "$250K - $500K", value: "250-500k" }, { label: "$500K - $1M", value: "500k-1m" },
                        { label: "$1M+", value: "1m+" }
                      ]} />
                      <Select label="Funding Purpose" value={data.purpose} onChange={update("purpose")} options={fundingPurposes} />
                      <Select label="How Soon Do You Need Funding?" value={data.timeline} onChange={update("timeline")} options={[
                        { label: "Immediately (24-72 hours)", value: "asap" }, { label: "Within 1-2 weeks", value: "1-2wk" },
                        { label: "Within 1 month", value: "1mo" }, { label: "1-3 months", value: "1-3mo" },
                        { label: "Just exploring options", value: "exploring" }
                      ]} />
                      <Select label="Current Business Debt" value={data.currentDebt} onChange={update("currentDebt")} options={[
                        { label: "None", value: "none" }, { label: "Under $25K", value: "<25k" },
                        { label: "$25K - $100K", value: "25-100k" }, { label: "$100K - $500K", value: "100-500k" },
                        { label: "$500K+", value: "500k+" }
                      ]} required={false} />
                    </div>
                  </div>
                )}

                {/* Step 3: Credit Profile */}
                {step === 3 && (
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Credit Profile</h2>
                    <p className="text-sm text-slate-500 mb-6">This helps us determine which funding products you qualify for. This is not a credit check.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <Select label="Personal Credit Score Range" value={data.creditScore} onChange={update("creditScore")} options={[
                          { label: "Excellent (750+)", value: "750+" }, { label: "Good (700-749)", value: "700-749" },
                          { label: "Fair (650-699)", value: "650-699" }, { label: "Below Average (580-649)", value: "580-649" },
                          { label: "Poor (Below 580)", value: "<580" }, { label: "Not Sure", value: "unknown" }
                        ]} />
                      </div>
                      <Select label="Any Bankruptcies?" value={data.bankruptcies} onChange={update("bankruptcies")} options={[
                        { label: "No", value: "no" }, { label: "Yes, discharged 7+ years ago", value: "7+yr" },
                        { label: "Yes, discharged 3-7 years ago", value: "3-7yr" }, { label: "Yes, discharged less than 3 years ago", value: "<3yr" },
                        { label: "Currently in bankruptcy", value: "active" }
                      ]} />
                      <Select label="Any Tax Liens?" value={data.taxLiens} onChange={update("taxLiens")} options={[
                        { label: "No", value: "no" }, { label: "Yes, resolved", value: "resolved" },
                        { label: "Yes, active", value: "active" }
                      ]} />
                    </div>
                  </div>
                )}

                {/* Step 4: Owner Info */}
                {step === 4 && (
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Owner Information</h2>
                    <p className="text-sm text-slate-500 mb-6">We need your contact information to send you funding offers.</p>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <Input label="Full Name" value={data.ownerName} onChange={update("ownerName")} placeholder="John Smith" />
                      </div>
                      <Input label="Email Address" value={data.email} onChange={update("email")} type="email" placeholder="john@business.com" />
                      <Input label="Phone Number" value={data.phone} onChange={update("phone")} type="tel" placeholder="(555) 123-4567" />
                      <Select label="Ownership Percentage" value={data.ownership} onChange={update("ownership")} options={[
                        { label: "100%", value: "100" }, { label: "75-99%", value: "75-99" },
                        { label: "51-74%", value: "51-74" }, { label: "25-50%", value: "25-50" },
                        { label: "Under 25%", value: "<25" }
                      ]} />
                    </div>
                  </div>
                )}

                {/* Step 5: Review */}
                {step === 5 && (
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Review Your Application</h2>
                    <p className="text-sm text-slate-500 mb-6">Please review your information before submitting.</p>
                    <div className="space-y-6">
                      {[
                        { title: "Business Information", fields: [
                          ["Business Name", data.businessName], ["Industry", data.industry],
                          ["Years in Business", data.yearsInBusiness], ["Annual Revenue", data.annualRevenue],
                          ["Monthly Revenue", data.monthlyRevenue]
                        ]},
                        { title: "Funding Needs", fields: [
                          ["Amount Needed", data.amountNeeded], ["Purpose", data.purpose],
                          ["Timeline", data.timeline], ["Current Debt", data.currentDebt || "Not specified"]
                        ]},
                        { title: "Credit Profile", fields: [
                          ["Credit Score", data.creditScore], ["Bankruptcies", data.bankruptcies],
                          ["Tax Liens", data.taxLiens]
                        ]},
                        { title: "Owner Information", fields: [
                          ["Name", data.ownerName], ["Email", data.email],
                          ["Phone", data.phone], ["Ownership", data.ownership + "%"]
                        ]},
                      ].map((section, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-5">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-heading font-semibold text-slate-900">{section.title}</h3>
                            <button onClick={() => setStep(i + 1)} className="text-xs text-[#1e40af] font-medium hover:underline">Edit</button>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {section.fields.map(([label, value]) => (
                              <div key={label as string}>
                                <span className="text-xs text-slate-400">{label}</span>
                                <p className="text-sm font-medium text-slate-700">{value as string}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Errors */}
                {errors.length > 0 && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    {errors.map((e, i) => <p key={i} className="text-sm text-red-600">{e}</p>)}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                  {step > 1 ? (
                    <Button variant="outline" onClick={prev} className="font-medium">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>
                  ) : <div />}
                  {step < 5 ? (
                    <Button onClick={next} className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={submit} className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8">
                      Submit Application <CheckCircle2 className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-slate-400 text-center mt-6">
            Your information is encrypted and secure. We never share your data without your consent.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Design: Growth Engine - Dynamic Momentum
 * Credit Advisory $1,500 package landing page */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Shield, TrendingUp, Users, Calendar, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES, creditAdvisoryPackage } from "@/lib/data";

export default function CreditAdvisory() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", creditScore: "", goals: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.creditAdvisory} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60" />
        </div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300 font-medium">Premium Program</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4 leading-tight">
                {creditAdvisoryPackage.title}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {creditAdvisoryPackage.tagline}. Our expert team works with you one-on-one to transform your credit profile and unlock better funding options.
              </p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-heading font-extrabold text-5xl text-white">{creditAdvisoryPackage.price}</span>
                <span className="text-slate-400">one-time investment</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#booking">
                  <Button size="lg" className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8">
                    Book Your Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/95 backdrop-blur-sm p-6 border-0 shadow-2xl">
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">What's Included</h3>
                <div className="space-y-4">
                  {creditAdvisoryPackage.includes.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#059669] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-heading font-semibold text-sm text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 mb-4">Expected Results</h2>
            <p className="text-slate-600">Our clients consistently achieve significant improvements in their credit profiles within 90 days.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {creditAdvisoryPackage.results.map((result, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-[#059669] mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50/50">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-extrabold text-3xl text-slate-900 text-center mb-12">How the Program Works</h2>
          <div className="space-y-8">
            {[
              { week: "Week 1-2", title: "Credit Analysis & Strategy", desc: "We pull and analyze all three credit reports, identify every opportunity for improvement, and create your personalized optimization roadmap.", icon: Shield },
              { week: "Week 3-6", title: "Active Dispute & Optimization", desc: "We initiate disputes for inaccurate items, optimize your credit utilization, and implement tradeline strategies to boost your scores.", icon: TrendingUp },
              { week: "Week 7-10", title: "Building & Monitoring", desc: "We add positive tradelines, monitor dispute results, and adjust strategy based on progress. Weekly coaching calls keep you on track.", icon: Users },
              { week: "Week 11-12", title: "Final Review & Funding Prep", desc: "Final credit review, score assessment, and personalized funding roadmap. You'll know exactly which products you now qualify for.", icon: Calendar },
            ].map((phase, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center shrink-0">
                    <phase.icon className="w-5 h-5 text-white" />
                  </div>
                  {i < 3 && <div className="w-0.5 h-full bg-slate-200 mt-2" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-semibold text-[#1e40af] uppercase tracking-wider">{phase.week}</p>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mt-1 mb-2">{phase.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-16 bg-white">
        <div className="container max-w-2xl">
          <Card className="p-6 md:p-8 border border-slate-100">
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Book Your Free Consultation</h2>
                  <p className="text-sm text-slate-500">Schedule a free 15-minute call to discuss your credit goals and see if the program is right for you.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Current Credit Score</label>
                      <select value={formData.creditScore} onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })}
                        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none">
                        <option value="">Select range</option>
                        <option value="<500">Below 500</option>
                        <option value="500-579">500-579</option>
                        <option value="580-649">580-649</option>
                        <option value="650-699">650-699</option>
                        <option value="700+">700+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">What are your credit goals?</label>
                    <textarea rows={3} value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none resize-none"
                      placeholder="e.g., I want to improve my score to qualify for business funding..." />
                  </div>
                  <Button type="submit" className="w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold h-11">
                    <Phone className="w-4 h-4 mr-2" /> Book Free Consultation
                  </Button>
                  <p className="text-xs text-slate-400 text-center">No obligation. 100% free consultation.</p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-[#059669] mx-auto mb-4" />
                <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Consultation Booked!</h2>
                <p className="text-slate-600 mb-6">A credit advisor will call you within 24 hours to schedule your free consultation.</p>
                <Link href="/"><Button variant="outline" className="font-medium">Back to Home</Button></Link>
              </div>
            )}
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

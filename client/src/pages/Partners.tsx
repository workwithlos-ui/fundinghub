/* Design: Growth Engine — Dynamic Momentum
 * Partner program page with commission tiers */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, DollarSign, BarChart3, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES, partnerTiers } from "@/lib/data";

export default function Partners() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", tier: "", experience: "" });
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
          <img src={IMAGES.partnerHandshake} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl py-8">
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Partner Program</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">
              Earn Up to 10% Commission on Every Funded Deal
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Join our partner network and earn generous commissions by referring business owners who need funding. Three tiers to match your volume and commitment level.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-400" /> Up to 10% commission</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> 500+ active partners</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-emerald-400" /> Real-time tracking</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 mb-4">Choose Your Partnership Level</h2>
            <p className="text-slate-600">Each tier offers increasing benefits and commission rates based on your referral volume.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTiers.map((tier, i) => (
              <Card key={tier.name} className={`p-6 border ${i === 2 ? "border-[#1e40af] ring-2 ring-[#1e40af]/20" : "border-slate-100"} bg-white relative`}>
                {i === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1e40af] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">{tier.name}</h3>
                  <p className="font-heading font-extrabold text-3xl text-[#059669]">{tier.commission}</p>
                  <p className="text-xs text-slate-500 mt-1">per funded deal</p>
                </div>
                <p className="text-sm text-slate-600 mb-5">{tier.description}</p>
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Includes</p>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className={`w-full mt-6 font-semibold ${i === 2 ? "bg-[#1e40af] hover:bg-[#1e3a8a] text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800"}`}>
                  Apply as {tier.name.split(" ")[0]}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-slate-50/50">
        <div className="container max-w-2xl">
          <Card className="p-6 md:p-8 border border-slate-100 bg-white">
            {!submitted ? (
              <>
                <h2 className="font-heading font-bold text-2xl text-slate-900 mb-1">Apply to Partner</h2>
                <p className="text-sm text-slate-500 mb-6">Fill out the form below and our partnerships team will be in touch within 48 hours.</p>
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
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Company (optional)</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Preferred Tier</label>
                    <select value={formData.tier} onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none">
                      <option value="">Select...</option>
                      <option value="referral">Referral Partner (1-3%)</option>
                      <option value="affiliate">Affiliate Partner (3-5%)</option>
                      <option value="broker">Broker Partner (5-10%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Tell us about your experience</label>
                    <textarea rows={3} value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none resize-none" />
                  </div>
                  <Button type="submit" className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold h-11">
                    Submit Partner Application
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-[#059669] mx-auto mb-4" />
                <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Application Received!</h2>
                <p className="text-slate-600 mb-6">Our partnerships team will review your application and contact you within 48 hours.</p>
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

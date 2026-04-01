/* Design: Growth Engine - Dynamic Momentum
 * Individual funding option detail page */
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Clock, DollarSign, Shield,
  CreditCard, Landmark, TrendingUp, Building2, ShieldCheck,
  Wrench, BarChart3, MessageSquare, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fundingOptions } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  CreditCard, Landmark, TrendingUp, Building2, ShieldCheck,
  Wrench, BarChart3, MessageSquare,
};

export default function FundingDetail() {
  const params = useParams<{ slug: string }>();
  const option = fundingOptions.find((o) => o.slug === params.slug);

  if (!option) {
    return (
      <div className="min-h-screen"><Navbar />
        <div className="pt-28 pb-20 container text-center">
          <h1 className="font-heading font-bold text-2xl text-slate-900 mb-4">Funding Option Not Found</h1>
          <Link href="/"><Button>Back to Home</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[option.icon] || DollarSign;
  const otherOptions = fundingOptions.filter((o) => o.slug !== option.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{option.title}</span>
            </div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${option.color}25` }}>
              <Icon className="w-7 h-7" style={{ color: option.color }} />
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">{option.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">{option.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/apply">
                <Button size="lg" className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8">
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: "Min Amount", value: option.minAmount },
              { label: "Max Amount", value: option.maxAmount },
              { label: "Terms", value: option.termRange },
              { label: "Rates", value: option.rateRange },
              { label: "Speed", value: option.speed },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-lg text-[#1e40af]">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Benefits */}
      <section className="py-16 bg-slate-50/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 md:p-8 border border-slate-100 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1e40af]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#1e40af]" />
                </div>
                <h2 className="font-heading font-bold text-xl text-slate-900">Requirements</h2>
              </div>
              <ul className="space-y-3">
                {option.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#1e40af] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600">{req}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 mt-4">Minimum credit score: {option.creditMin}</p>
            </Card>

            <Card className="p-6 md:p-8 border border-slate-100 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#059669]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                </div>
                <h2 className="font-heading font-bold text-xl text-slate-900">Benefits</h2>
              </div>
              <ul className="space-y-3">
                {option.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600">{ben}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 text-center mb-10">How the Process Works</h2>
          <div className="space-y-6">
            {option.process.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  {i < option.process.length - 1 && <div className="w-0.5 h-full bg-slate-200 mt-2" />}
                </div>
                <div className="pb-6">
                  <p className="font-heading font-semibold text-slate-900 mb-1">Step {i + 1}</p>
                  <p className="text-sm text-slate-600">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50/50">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            {option.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-heading font-semibold text-slate-900 hover:text-[#1e40af] py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Other Options */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 text-center mb-8">Explore Other Funding Options</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherOptions.map((opt) => {
              const OIcon = iconMap[opt.icon] || DollarSign;
              return (
                <Link key={opt.slug} href={`/funding/${opt.slug}`}>
                  <Card className="card-hover p-5 border border-slate-100 bg-white cursor-pointer group h-full">
                    <OIcon className="w-6 h-6 mb-3" style={{ color: opt.color }} />
                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#1e40af] transition-colors mb-1">{opt.shortTitle}</h3>
                    <p className="text-xs text-slate-500">{opt.minAmount} - {opt.maxAmount}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a]">
        <div className="container text-center">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-white mb-4">
            Ready to Get Started with {option.shortTitle}?
          </h2>
          <p className="text-blue-200 mb-6 max-w-md mx-auto">
            Apply in 5 minutes and get matched with the best {option.shortTitle.toLowerCase()} options for your business.
          </p>
          <Link href="/apply">
            <Button size="lg" className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8">
              Start Your Application <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

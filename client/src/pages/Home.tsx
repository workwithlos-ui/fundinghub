/* Design: Growth Engine — Dynamic Momentum
 * Landing page: Hero + Estimator + Funding Grid + Stats + Process + Testimonials + FAQ + CTA */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import {
  CreditCard, Landmark, TrendingUp, Building2, ShieldCheck,
  Wrench, BarChart3, MessageSquare, ArrowRight, Star,
  CheckCircle2, Clock, Users, DollarSign, ChevronRight,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IMAGES, fundingOptions, testimonials, stats, processSteps, faqs } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  CreditCard, Landmark, TrendingUp, Building2, ShieldCheck,
  Wrench, BarChart3, MessageSquare,
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    const prefix = target.match(/^[^0-9]*/)?.[0] || "";
    const suf = target.match(/[^0-9]*$/)?.[0] || "";
    let current = 0;
    const step = Math.max(1, Math.floor(num / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= num) { current = num; clearInterval(interval); }
      setDisplay(`${prefix}${current.toLocaleString()}${suf}`);
    }, 30);
    return () => clearInterval(interval);
  }, [inView, target]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Funding Estimator ── */
function FundingEstimator() {
  const [revenue, setRevenue] = useState("");
  const [timeInBusiness, setTimeInBusiness] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [amountNeeded, setAmountNeeded] = useState("");
  const [result, setResult] = useState<null | {
    options: { name: string; amount: string; rate: string; speed: string }[];
    message: string;
  }>(null);

  const estimate = () => {
    const rev = parseInt(revenue) || 0;
    const years = parseInt(timeInBusiness) || 0;
    const credit = parseInt(creditScore) || 0;
    const needed = parseInt(amountNeeded) || 50000;
    const options: { name: string; amount: string; rate: string; speed: string }[] = [];

    if (credit >= 680) {
      const max = Math.min(250000, needed * 1.2);
      options.push({ name: "0% Credit Card Stacking", amount: `$${Math.round(max / 1000) * 1000 >= 50000 ? (Math.round(max / 1000) * 1000).toLocaleString() : "50,000"}`, rate: "0% for 12-21 mo", speed: "7-14 days" });
    }
    if (rev >= 10000 && years >= 0.5) {
      const max = Math.min(500000, rev * 5);
      options.push({ name: "Business Line of Credit", amount: `$${Math.max(10000, Math.min(max, needed)).toLocaleString()}`, rate: "7-25% APR", speed: "3-10 days" });
    }
    if (rev >= 15000) {
      const max = Math.min(500000, rev * 3);
      options.push({ name: "Revenue-Based Funding", amount: `$${Math.max(25000, Math.min(max, needed)).toLocaleString()}`, rate: "Factor 1.1-1.5", speed: "24-72 hours" });
    }
    if (credit >= 680 && years >= 2) {
      options.push({ name: "SBA Loan", amount: `$${Math.min(5000000, needed).toLocaleString()}`, rate: "5.5-8% APR", speed: "30-90 days" });
    }
    if (credit >= 580) {
      options.push({ name: "Equipment Financing", amount: `Up to $${Math.min(2000000, needed).toLocaleString()}`, rate: "4.5-18% APR", speed: "3-10 days" });
    }

    if (options.length === 0) {
      options.push({ name: "Revenue-Based Funding", amount: `$${Math.max(10000, Math.min(rev * 2, needed)).toLocaleString()}`, rate: "Factor 1.2-1.5", speed: "24-72 hours" });
      options.push({ name: "Credit Building Program", amount: "Build first", rate: "$997 program", speed: "90 days" });
    }

    setResult({
      options: options.slice(0, 4),
      message: options.length >= 3
        ? "Great news! You likely qualify for multiple funding options."
        : "We have options for you. Let's find the best fit."
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 p-6 lg:p-8 w-full max-w-md">
      <div className="flex items-center gap-2 mb-5">
        <Zap className="w-5 h-5 text-[#059669]" />
        <h3 className="font-heading font-bold text-lg text-slate-900">Instant Funding Estimator</h3>
      </div>

      {!result ? (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Monthly Revenue</label>
            <select value={revenue} onChange={(e) => setRevenue(e.target.value)} className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white text-slate-800">
              <option value="">Select range</option>
              <option value="5000">Under $10K</option>
              <option value="15000">$10K - $25K</option>
              <option value="37500">$25K - $50K</option>
              <option value="75000">$50K - $100K</option>
              <option value="175000">$100K - $250K</option>
              <option value="500000">$250K+</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Time in Business</label>
            <select value={timeInBusiness} onChange={(e) => setTimeInBusiness(e.target.value)} className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white text-slate-800">
              <option value="">Select</option>
              <option value="0.25">Less than 6 months</option>
              <option value="0.75">6-12 months</option>
              <option value="1.5">1-2 years</option>
              <option value="3">2-5 years</option>
              <option value="7">5+ years</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Credit Score Range</label>
            <select value={creditScore} onChange={(e) => setCreditScore(e.target.value)} className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white text-slate-800">
              <option value="">Select range</option>
              <option value="500">Below 580</option>
              <option value="600">580 - 649</option>
              <option value="670">650 - 699</option>
              <option value="720">700 - 749</option>
              <option value="770">750+</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">Funding Amount Needed</label>
            <select value={amountNeeded} onChange={(e) => setAmountNeeded(e.target.value)} className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm bg-white text-slate-800">
              <option value="">Select amount</option>
              <option value="25000">$10K - $25K</option>
              <option value="50000">$25K - $50K</option>
              <option value="100000">$50K - $100K</option>
              <option value="250000">$100K - $250K</option>
              <option value="500000">$250K - $500K</option>
              <option value="1000000">$500K+</option>
            </select>
          </div>
          <Button
            onClick={estimate}
            disabled={!revenue || !timeInBusiness || !creditScore || !amountNeeded}
            className="w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold h-11"
          >
            See What You Qualify For
          </Button>
          <p className="text-xs text-slate-400 text-center">No credit check required. Instant results.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <p className="text-sm font-semibold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {result.message}
            </p>
          </div>
          {result.options.map((opt, i) => (
            <div key={i} className="border border-slate-100 rounded-lg p-3 hover:border-[#1e40af]/30 transition-colors">
              <p className="font-heading font-semibold text-sm text-slate-900">{opt.name}</p>
              <div className="flex justify-between mt-1.5 text-xs text-slate-500">
                <span>Up to {opt.amount}</span>
                <span>{opt.rate}</span>
              </div>
              <p className="text-xs text-[#059669] mt-1">{opt.speed}</p>
            </div>
          ))}
          <Link href="/apply">
            <Button className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold h-11">
              Start Your Application <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <button onClick={() => setResult(null)} className="text-xs text-slate-400 hover:text-slate-600 w-full text-center">
            Recalculate
          </button>
        </div>
      )}
    </Card>
  );
}

/* ── Main Home Page ── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        </div>
        <div className="container relative z-10 py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                <span className="text-sm text-white/90 font-medium">Trusted by 15,000+ businesses</span>
              </div>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                Get Funded in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                  24–72 Hours
                </span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                Access $10K to $5M+ in business funding with competitive rates and flexible terms.
                No upfront fees. Multiple options. One simple application.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/apply">
                  <Button size="lg" className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8 h-12 text-base">
                    Apply Now — It's Free <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/funding/credit-stacking">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 h-12 text-base">
                    Explore Options
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit impact</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to apply</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 93% approval</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <FundingEstimator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-extrabold text-2xl md:text-3xl text-[#1e40af]">
                  <CountUp target={stat.value} />
                </p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Funding Options Grid ── */}
      <section className="py-20 bg-slate-50/50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-[#059669] uppercase tracking-wider mb-3">Funding Solutions</p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">
                Every Funding Option Your Business Needs
              </h2>
              <p className="text-slate-600 leading-relaxed">
                From 0% credit cards to SBA loans, we match you with the right capital solution based on your unique business profile.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fundingOptions.map((opt, i) => {
              const Icon = iconMap[opt.icon] || DollarSign;
              return (
                <AnimatedSection key={opt.slug}>
                  <Link href={`/funding/${opt.slug}`}>
                    <Card className="card-hover p-6 h-full border border-slate-100 bg-white cursor-pointer group">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${opt.color}12` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: opt.color }} />
                      </div>
                      <h3 className="font-heading font-bold text-base text-slate-900 mb-2 group-hover:text-[#1e40af] transition-colors">
                        {opt.shortTitle}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-3">{opt.tagline}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-50">
                        <span>{opt.minAmount} – {opt.maxAmount}</span>
                        <span className="flex items-center gap-1 text-[#1e40af] font-medium group-hover:gap-2 transition-all">
                          Learn more <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-[#1e40af] uppercase tracking-wider mb-3">Simple Process</p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">
                Four Steps to Funding
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our streamlined process gets you from application to funded in record time.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.step}>
                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e40af] to-[#3b82f6] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
                    <span className="text-white font-heading font-extrabold text-lg">{step.step}</span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#1e40af]/30 to-transparent" />
                  )}
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Social Proof ── */}
      <section className="py-20 bg-slate-50/50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-[#059669] uppercase tracking-wider mb-3">Success Stories</p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">
                Trusted by Thousands of Business Owners
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Real results from real businesses. See how FundingHub has helped entrepreneurs access the capital they need.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i}>
                <Card className="p-6 h-full border border-slate-100 bg-white">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">"{t.quote}"</p>
                  <div className="border-t border-slate-50 pt-4">
                    <p className="font-heading font-semibold text-sm text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.business} — {t.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium text-[#059669]">{t.type}</span>
                      <span className="text-xs font-bold text-[#1e40af]">{t.amount}</span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Image Section ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img
                src={IMAGES.fundingSuccess}
                alt="Successful business owner"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection>
              <p className="text-sm font-semibold text-[#1e40af] uppercase tracking-wider mb-3">Why FundingHub</p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-6">
                Your Success Is Our Business
              </h2>
              <div className="space-y-5">
                {[
                  { icon: Clock, title: "Fast Approvals", desc: "Most applications are reviewed within 24 hours. No weeks of waiting." },
                  { icon: Users, title: "Expert Guidance", desc: "Dedicated funding advisors who understand your industry and goals." },
                  { icon: DollarSign, title: "Competitive Rates", desc: "Access to 75+ lenders means we find you the best available terms." },
                  { icon: ShieldCheck, title: "Transparent Process", desc: "No hidden fees, no surprises. You see all terms before you commit." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1e40af]/5 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#1e40af]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-50/50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-[#1e40af] uppercase tracking-wider mb-3">FAQ</p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
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
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-blue-200 mb-8 max-w-xl mx-auto">
              Join 15,000+ business owners who've secured funding through FundingHub. Apply in 5 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <Button size="lg" className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8 h-12 text-base">
                  Start Your Application <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/calculators">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 h-12 text-base">
                  Try Our Calculators
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

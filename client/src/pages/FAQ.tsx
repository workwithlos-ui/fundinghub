/* Design: Growth Engine - Dynamic Momentum */
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { faqs } from "@/lib/data";

const additionalFaqs = [
  { q: "What industries do you work with?", a: "We work with virtually every industry including restaurants, retail, construction, healthcare, professional services, technology, real estate, transportation, manufacturing, and more. Our lending partners specialize in different sectors, so we can find the right fit for your business." },
  { q: "Do you offer funding for startups?", a: "Yes, though options are more limited for businesses under 6 months old. Revenue-based funding typically requires 4+ months of bank statements. For newer businesses, we recommend our credit card stacking program (requires good personal credit) or our business credit building program." },
  { q: "How do you make money?", a: "FundingHub earns a referral fee from our lending partners when you accept a funding offer. There is never a fee charged to you for applying, getting pre-qualified, or receiving offers. Our service is completely free for business owners." },
  { q: "Can I refinance existing business debt?", a: "Absolutely. Many of our clients use new funding to consolidate or refinance existing higher-interest debt. This can lower your monthly payments and total cost of capital." },
  { q: "What if I get denied?", a: "A denial from one lender doesn't mean you can't get funded. We work with 75+ lending partners, each with different criteria. If your initial match doesn't work out, we'll explore alternative options. We also offer credit consulting to help improve your profile for future applications." },
  { q: "Is my information secure?", a: "Yes. We use bank-level 256-bit SSL encryption to protect your data. We never sell your personal information, and we only share application details with lending partners you've been matched with." },
];

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Support</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-slate-300 max-w-xl">Everything you need to know about FundingHub and our funding process.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="font-heading font-bold text-xl text-slate-900 mb-6">General Questions</h2>
          <Accordion type="single" collapsible className="mb-12">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`gen-${i}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-heading font-semibold text-slate-900 hover:text-[#1e40af] py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 className="font-heading font-bold text-xl text-slate-900 mb-6">More Questions</h2>
          <Accordion type="single" collapsible>
            {additionalFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`add-${i}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-heading font-semibold text-slate-900 hover:text-[#1e40af] py-5">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Still Have Questions?</h3>
            <p className="text-sm text-slate-600 mb-4">Our funding advisors are here to help. Apply now and get a free consultation.</p>
            <Link href="/apply">
              <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold">
                Contact Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

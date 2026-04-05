import { Link } from "wouter";
import { ArrowRight, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  "Funding Options": [
    { label: "Credit Card Stacking", href: "/funding/credit-stacking" },
    { label: "Lines of Credit", href: "/funding/lines-of-credit" },
    { label: "Revenue-Based Funding", href: "/funding/revenue-based" },
    { label: "Real Estate Funding", href: "/funding/real-estate" },
    { label: "SBA Loans & Grants", href: "/funding/sba-loans" },
    { label: "Equipment Financing", href: "/funding/equipment" },
  ],
  "Services": [
    { label: "Credit Building", href: "/funding/credit-building" },
    { label: "Credit Consulting", href: "/funding/consulting" },
    { label: "Credit Advisory", href: "/credit-advisory" },
    { label: "Partner Program", href: "/partners" },
  ],
  "Resources": [
    { label: "Blog", href: "/blog" },
    { label: "Funding Calculator", href: "/calculators" },
    { label: "FAQ", href: "/faq" },
    { label: "Apply Now", href: "/apply" },
  ],
  "Company": [
    { label: "About Us", href: "/faq" },
    { label: "Contact", href: "/apply" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Privacy Policy", href: "/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="group flex items-center gap-2.5 no-underline mb-6">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-slate-950/20">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
                <span className="relative text-white font-heading font-bold text-lg tracking-tighter">F</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-slate-900 transition-colors group-hover:text-slate-950">
                FundingHub
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-xs">
              The institutional-grade capital platform for modern founders. Connecting ambitious builders with fast, flexible funding solutions since 2019.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all duration-300 text-slate-400">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all duration-300 text-slate-400">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all duration-300 text-slate-400">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-6">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-slate-500 hover:text-slate-950 transition-colors no-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <p className="text-[11px] font-medium text-slate-400">
              &copy; {new Date().getFullYear()} FundingHub. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400 max-w-2xl leading-relaxed">
              FundingHub is a financial technology company, not a bank. Funding products are offered by our institutional lending partners. Terms and conditions apply. All loans are subject to credit approval and verification.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-[11px] font-bold text-slate-400 hover:text-slate-950 uppercase tracking-widest no-underline">Privacy</Link>
            <Link href="/faq" className="text-[11px] font-bold text-slate-400 hover:text-slate-950 uppercase tracking-widest no-underline">Terms</Link>
            <Link href="/faq" className="text-[11px] font-bold text-slate-400 hover:text-slate-950 uppercase tracking-widest no-underline">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

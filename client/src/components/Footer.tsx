import { Link } from "wouter";

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
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e40af] to-[#059669] flex items-center justify-center">
                <span className="text-white font-heading font-extrabold text-sm">F</span>
              </div>
              <span className="font-heading font-extrabold text-xl text-white">FundingHub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Connecting business owners with fast, flexible funding solutions since 2019.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors text-slate-400 hover:text-white text-xs font-bold">in</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors text-slate-400 hover:text-white text-xs font-bold">X</a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors text-slate-400 hover:text-white text-xs font-bold">fb</a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} FundingHub. All rights reserved. FundingHub is a financial technology company, not a bank.
          </p>
          <p className="text-xs text-slate-500">
            Funding products are offered by our lending partners. Terms and conditions apply.
          </p>
        </div>
      </div>
    </footer>
  );
}

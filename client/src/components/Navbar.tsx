import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Funding Options", href: "/funding/lines-of-credit", hasDropdown: true },
  { label: "Apply Now", href: "/apply" },
  { label: "Credit Advisory", href: "/credit-advisory" },
  { label: "Resources", href: "/blog" },
  { label: "Partner Program", href: "/partners" },
  { label: "AI Advisor", href: "/ai-advisor" },
];

const fundingDropdown = [
  { label: "Unsecured Business Capital", href: "/funding/credit-stacking", description: "Access $50K–$250K+ with no collateral" },
  { label: "Business Lines of Credit", href: "/funding/lines-of-credit", description: "Flexible revolving capital, draw as needed" },
  { label: "Revenue-Based Funding", href: "/funding/revenue-based", description: "Funded in 24–72 hours based on sales" },
  { label: "Real Estate Funding", href: "/funding/real-estate", description: "Commercial & investment property loans" },
  { label: "SBA Loans & Grants", href: "/funding/sba-loans", description: "Lowest rates, government-backed" },
  { label: "Equipment Financing", href: "/funding/equipment", description: "Finance any equipment, any industry" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
    scrolled
      ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]"
      : "bg-transparent py-5"
  );

  return (
    <header className={navClasses}>
      <nav className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 no-underline">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-slate-950/20">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
            <span className="relative text-white font-heading font-bold text-lg tracking-tighter">F</span>
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-slate-900 transition-colors group-hover:text-slate-950">
            FundingHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200",
                    dropdownOpen
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/60 p-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {fundingDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group block p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 no-underline"
                          >
                            <p className="text-[13px] font-semibold text-slate-900 group-hover:text-slate-950 mb-0.5">{item.label}</p>
                            <p className="text-[12px] text-slate-500 group-hover:text-slate-600 leading-tight">{item.description}</p>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <Link href="/apply" className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors no-underline group">
                          <span className="text-[12px] font-bold text-slate-900">Apply now — see what you qualify for</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-[13px] font-medium rounded-full text-slate-600 hover:text-slate-950 hover:bg-white/50 transition-all duration-200 no-underline"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/dashboard" className="text-[13px] font-medium text-slate-600 hover:text-slate-950 transition-colors no-underline">
            Dashboard
          </Link>
          <Link href="/apply" className="no-underline">
            <Button className="bg-slate-950 hover:bg-slate-800 text-white text-[13px] font-bold px-6 h-10 rounded-full shadow-lg shadow-slate-950/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              Get Funded
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-900 transition-colors hover:bg-slate-200"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="container py-8 space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-4">Funding Products</p>
                {fundingDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2.5 text-base font-semibold text-slate-900 hover:text-slate-950 no-underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="h-px bg-slate-100" />
              <div className="space-y-1">
                {navLinks.filter(l => !l.hasDropdown).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-2.5 text-base font-semibold text-slate-900 hover:text-slate-950 no-underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2">
                <Link href="/apply" className="no-underline">
                  <Button className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold h-14 rounded-2xl text-lg">
                    Apply for Funding
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

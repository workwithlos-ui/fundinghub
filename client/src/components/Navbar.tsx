/* Design: Growth Engine - Dynamic Momentum
 * Sticky top nav with transparent-to-solid scroll transition */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Funding Options", href: "/funding/credit-stacking", hasDropdown: true },
  { label: "Apply Now", href: "/apply" },
  { label: "Credit Advisory", href: "/credit-advisory" },
  { label: "Resources", href: "/blog" },
  { label: "Partner Program", href: "/partners" },
  { label: "AI Advisor", href: "/ai-advisor" },
];

const fundingDropdown = [
  { label: "0% Credit Card Stacking", href: "/funding/credit-stacking" },
  { label: "Business Lines of Credit", href: "/funding/lines-of-credit" },
  { label: "Revenue-Based Funding", href: "/funding/revenue-based" },
  { label: "Real Estate Funding", href: "/funding/real-estate" },
  { label: "SBA Loans & Grants", href: "/funding/sba-loans" },
  { label: "Equipment Financing", href: "/funding/equipment" },
  { label: "Business Credit Building", href: "/funding/credit-building" },
  { label: "Credit Consulting", href: "/funding/consulting" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const isHome = location === "/";
  const bgClass = scrolled || !isHome
    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
    : "bg-transparent";

  const textClass = scrolled || !isHome ? "text-slate-800" : "text-white";
  const logoTextClass = scrolled || !isHome ? "text-[#1e40af]" : "text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <nav className="container flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e40af] to-[#059669] flex items-center justify-center">
            <span className="text-white font-heading font-extrabold text-sm">F</span>
          </div>
          <span className={`font-heading font-extrabold text-xl tracking-tight transition-colors ${logoTextClass}`}>
            FundingHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/10 ${textClass}`}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden"
                    >
                      {fundingDropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1e40af] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/10 ${textClass}`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" className={`text-sm font-medium ${textClass}`}>
              Dashboard
            </Button>
          </Link>
          <Link href="/apply">
            <Button className="bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold px-5">
              Get Funded
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 rounded-lg ${textClass}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container py-4 space-y-1">
              {fundingDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 my-2" />
              <Link href="/apply" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                Apply Now
              </Link>
              <Link href="/credit-advisory" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                Credit Advisory
              </Link>
              <Link href="/blog" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                Resources
              </Link>
              <Link href="/partners" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                Partner Program
              </Link>
              <Link href="/ai-advisor" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                AI Advisor
              </Link>
              <Link href="/dashboard" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                Dashboard
              </Link>
              <div className="pt-2">
                <Link href="/apply">
                  <Button className="w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold">
                    Get Funded Now
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

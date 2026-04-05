/* ============================================================
 * FundingHub - Centralized data store
 * Design: "Growth Engine" - Dynamic Momentum
 * All static content for the platform lives here
 * ============================================================ */

export const IMAGES = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/91190584/k8igKPrP4wcYWkrfeCE2cZ/hero-bg-AEzgfuCwqvhYvHgKNMG9Mo.webp",
  fundingSuccess: "https://d2xsxph8kpxj0f.cloudfront.net/91190584/k8igKPrP4wcYWkrfeCE2cZ/funding-success-ErD2SK4iGamqCDCep5gJjQ.webp",
  creditAdvisory: "https://d2xsxph8kpxj0f.cloudfront.net/91190584/k8igKPrP4wcYWkrfeCE2cZ/credit-advisory-MdQfMxR7Wd6iBDbc4dQbqy.webp",
  partnerHandshake: "https://d2xsxph8kpxj0f.cloudfront.net/91190584/k8igKPrP4wcYWkrfeCE2cZ/partner-handshake-ZVQ42W8MpfrNNwLJby5YFn.webp",
  calculatorBg: "https://d2xsxph8kpxj0f.cloudfront.net/91190584/k8igKPrP4wcYWkrfeCE2cZ/calculator-bg-36qyzumGUKhVZkdWWzcBgp.webp",
};

export interface FundingOption {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  minAmount: string;
  maxAmount: string;
  termRange: string;
  rateRange: string;
  speed: string;
  creditMin: string;
  requirements: string[];
  benefits: string[];
  process: string[];
  faqs: { q: string; a: string }[];
}

export const fundingOptions: FundingOption[] = [
  {
    slug: "credit-stacking",
    title: "Unsecured Business Capital",
    shortTitle: "Business Capital",
    tagline: "Access $50K–$250K+ in unsecured capital with 0% intro rates",
    description: "Get access to substantial unsecured business capital with 0% introductory rates for 12–21 months. No collateral, no lengthy bank process. This is the fastest, most flexible funding option for businesses with solid personal credit — capital in your account in as little as 7 days.",
    icon: "CreditCard",
    color: "#1e40af",
    minAmount: "$50,000",
    maxAmount: "$250,000+",
    termRange: "12-21 months at 0% APR",
    rateRange: "0% intro APR, then 15-24%",
    speed: "7-14 days",
    creditMin: "680+",
    requirements: [
      "Personal credit score of 680+",
      "No recent bankruptcies (7+ years)",
      "Less than 6 credit inquiries in last 6 months",
      "Existing credit history of 2+ years",
      "No derogatory marks on credit report"
    ],
    benefits: [
      "0% interest for 12-21 months",
      "No collateral required",
      "Flexible use of funds",
      "Build business credit simultaneously",
      "Multiple cards for higher total limits",
      "Cash advance options available"
    ],
    process: [
      "Free consultation and credit analysis",
      "Strategic application plan created",
      "Guided application submissions",
      "Card activation and fund access",
      "Ongoing credit optimization support"
    ],
    faqs: [
      { q: "Will this hurt my credit score?", a: "There will be temporary hard inquiries, but our strategic approach minimizes impact. Most clients see their scores recover within 60-90 days, and the increased available credit often improves scores long-term." },
      { q: "How much can I actually get?", a: "Most clients receive between $50,000 and $250,000 in total credit limits. Your exact amount depends on your credit profile, income, and existing credit utilization." },
      { q: "What can I use the funds for?", a: "Anything business-related: inventory, equipment, marketing, payroll, expansion, or even transferring higher-interest debt to save on interest payments." },
      { q: "What happens after the 0% period ends?", a: "We help you plan ahead. Options include paying down balances, transferring to new 0% offers, or converting to a business line of credit." }
    ]
  },
  {
    slug: "lines-of-credit",
    title: "Business Lines of Credit",
    shortTitle: "Lines of Credit",
    tagline: "Revolving credit lines from $10K to $500K for ongoing needs",
    description: "A business line of credit gives you flexible, revolving access to capital. Draw funds when you need them, pay interest only on what you use, and replenish your available credit as you repay. Ideal for managing cash flow, seasonal expenses, and growth opportunities.",
    icon: "Landmark",
    color: "#059669",
    minAmount: "$10,000",
    maxAmount: "$500,000",
    termRange: "12-36 months revolving",
    rateRange: "7-25% APR",
    speed: "3-10 days",
    creditMin: "600+",
    requirements: [
      "6+ months in business",
      "Monthly revenue of $10,000+",
      "Personal credit score of 600+",
      "Business bank account",
      "No active bankruptcies"
    ],
    benefits: [
      "Only pay interest on what you draw",
      "Revolving access - reuse as you repay",
      "No collateral needed for most lines",
      "Builds business credit history",
      "Fast access to funds when needed",
      "Flexible repayment terms"
    ],
    process: [
      "Submit application with business details",
      "Quick underwriting review (24-48 hours)",
      "Receive line of credit offers",
      "Accept terms and sign agreement",
      "Draw funds as needed via portal"
    ],
    faqs: [
      { q: "How is this different from a loan?", a: "A line of credit is revolving - you can draw and repay repeatedly. A loan gives you a lump sum with fixed payments. Lines of credit offer more flexibility for ongoing needs." },
      { q: "Do I need collateral?", a: "Most lines under $150K are unsecured. Larger lines may require collateral but often come with better rates." },
      { q: "How quickly can I access funds?", a: "Once approved, you can typically draw funds within 24 hours via ACH transfer to your business bank account." },
      { q: "Can I increase my credit line?", a: "Yes, after 6-12 months of responsible use, most lenders will offer credit line increases." }
    ]
  },
  {
    slug: "revenue-based",
    title: "Revenue-Based Funding",
    shortTitle: "Revenue-Based",
    tagline: "Get $25K-$500K based on your monthly revenue, not your credit",
    description: "Revenue-based funding provides capital based on your business's monthly revenue rather than your personal credit score. Repayments are a fixed percentage of daily or weekly revenue, so payments flex with your business performance. Perfect for businesses with strong revenue but imperfect credit.",
    icon: "TrendingUp",
    color: "#7c3aed",
    minAmount: "$25,000",
    maxAmount: "$500,000",
    termRange: "3-18 months",
    rateRange: "Factor rate 1.1-1.5",
    speed: "24-72 hours",
    creditMin: "500+",
    requirements: [
      "4+ months in business",
      "Monthly revenue of $15,000+",
      "Business bank account with consistent deposits",
      "No open bankruptcies",
      "Positive daily bank balance"
    ],
    benefits: [
      "Credit score is not the primary factor",
      "Payments flex with your revenue",
      "Fastest funding option (24-72 hours)",
      "Simple application process",
      "High approval rates",
      "No collateral required"
    ],
    process: [
      "Complete simple online application",
      "Connect business bank account for verification",
      "Receive offers within hours",
      "Accept and sign digitally",
      "Funds deposited in 24-72 hours"
    ],
    faqs: [
      { q: "What is a factor rate?", a: "A factor rate is a multiplier applied to your advance amount. For example, a $100K advance at 1.3 factor rate means you repay $130K total. It's simpler than APR for short-term funding." },
      { q: "How are payments collected?", a: "Payments are automatically deducted daily or weekly from your business bank account as a fixed percentage of revenue or a fixed amount." },
      { q: "Can I get funded with bad credit?", a: "Yes, revenue-based funding focuses on your business revenue, not your personal credit. Scores as low as 500 can qualify." },
      { q: "Is there a prepayment discount?", a: "Many of our lending partners offer prepayment discounts. Paying early can save you significantly on total cost." }
    ]
  },
  {
    slug: "real-estate",
    title: "Real Estate Funding",
    shortTitle: "Real Estate",
    tagline: "Commercial mortgages, bridge loans, and investment property funding",
    description: "Whether you're purchasing commercial property, refinancing, or need a bridge loan for a real estate investment, our real estate funding solutions provide competitive rates and flexible terms. We work with a network of commercial lenders to find the best fit for your project.",
    icon: "Building2",
    color: "#b45309",
    minAmount: "$100,000",
    maxAmount: "$5,000,000+",
    termRange: "1-30 years",
    rateRange: "5.5-12% APR",
    speed: "2-6 weeks",
    creditMin: "620+",
    requirements: [
      "Property appraisal or purchase agreement",
      "Personal credit score of 620+",
      "Down payment of 10-30%",
      "Business financial statements",
      "Property insurance",
      "Environmental assessment (for commercial)"
    ],
    benefits: [
      "Competitive commercial rates",
      "Long-term fixed or adjustable rates",
      "Build equity in real property",
      "Tax advantages for business property",
      "Multiple property types eligible",
      "Bridge loan options for quick closings"
    ],
    process: [
      "Initial consultation and property review",
      "Pre-qualification and document collection",
      "Property appraisal and underwriting",
      "Loan approval and terms negotiation",
      "Closing and fund disbursement"
    ],
    faqs: [
      { q: "What types of properties qualify?", a: "Office buildings, retail spaces, warehouses, multi-family (5+ units), mixed-use properties, and land for development all qualify." },
      { q: "How much down payment do I need?", a: "Typically 10-30% depending on property type, loan amount, and your financial profile. SBA 504 loans can go as low as 10%." },
      { q: "Can I refinance an existing property?", a: "Yes, we offer cash-out refinancing and rate-and-term refinancing for existing commercial properties." },
      { q: "What about bridge loans?", a: "Bridge loans are available for 6-24 months to cover gaps between purchase and permanent financing. Rates are higher but closing is much faster." }
    ]
  },
  {
    slug: "sba-loans",
    title: "SBA Loans & Grants",
    shortTitle: "SBA Loans",
    tagline: "Government-backed loans with the lowest rates and longest terms",
    description: "SBA loans are the gold standard of business financing, offering the lowest interest rates and longest repayment terms available. We guide you through the complex SBA application process and connect you with preferred SBA lenders to maximize your approval chances.",
    icon: "ShieldCheck",
    color: "#1e40af",
    minAmount: "$25,000",
    maxAmount: "$5,000,000",
    termRange: "5-25 years",
    rateRange: "5.5-8% APR",
    speed: "30-90 days",
    creditMin: "680+",
    requirements: [
      "2+ years in business (preferred)",
      "Personal credit score of 680+",
      "Profitable or near-profitable operations",
      "Business plan (for startups)",
      "Collateral for larger loans",
      "No defaults on government loans"
    ],
    benefits: [
      "Lowest available interest rates",
      "Longest repayment terms (up to 25 years)",
      "Government guarantee reduces lender risk",
      "Multiple program options (7a, 504, microloans)",
      "Can be used for most business purposes",
      "Build strong banking relationships"
    ],
    process: [
      "Pre-qualification assessment",
      "Document preparation and business plan review",
      "Lender matching and application submission",
      "SBA underwriting and approval",
      "Closing and fund disbursement"
    ],
    faqs: [
      { q: "What's the difference between SBA 7(a) and 504?", a: "SBA 7(a) is the most flexible - use funds for almost anything. SBA 504 is specifically for real estate and major equipment purchases, with even lower rates and longer terms." },
      { q: "Can startups get SBA loans?", a: "Yes, but it's more challenging. Startups typically need a strong business plan, industry experience, and personal credit above 700. SBA microloans are often the best option for newer businesses." },
      { q: "How long does the process take?", a: "SBA loans typically take 30-90 days from application to funding. We help streamline the process by preparing your documentation upfront." },
      { q: "Are there SBA grants available?", a: "The SBA itself doesn't offer grants for most businesses, but we help identify federal, state, and local grant programs you may qualify for." }
    ]
  },
  {
    slug: "equipment",
    title: "Equipment Financing",
    shortTitle: "Equipment",
    tagline: "Finance or lease business equipment with the equipment as collateral",
    description: "Equipment financing allows you to purchase or lease the machinery, vehicles, technology, and tools your business needs without a large upfront payment. The equipment itself serves as collateral, making approval easier and rates lower than unsecured options.",
    icon: "Wrench",
    color: "#475569",
    minAmount: "$5,000",
    maxAmount: "$2,000,000+",
    termRange: "2-7 years",
    rateRange: "4.5-18% APR",
    speed: "3-10 days",
    creditMin: "580+",
    requirements: [
      "Equipment quote or invoice",
      "1+ year in business (preferred)",
      "Personal credit score of 580+",
      "Business financial statements",
      "Equipment must have useful life beyond loan term"
    ],
    benefits: [
      "Equipment serves as collateral (easier approval)",
      "Preserve working capital",
      "Fixed monthly payments",
      "Potential tax benefits (Section 179)",
      "Lease or purchase options",
      "New and used equipment eligible"
    ],
    process: [
      "Get equipment quote from vendor",
      "Submit application with equipment details",
      "Quick credit review and approval",
      "Sign financing agreement",
      "Vendor paid directly, you receive equipment"
    ],
    faqs: [
      { q: "Should I lease or finance?", a: "Leasing is better if you want lower payments and plan to upgrade frequently. Financing is better if you want to own the equipment and build equity." },
      { q: "Can I finance used equipment?", a: "Yes, both new and used equipment qualify. Used equipment may have slightly higher rates and shorter terms." },
      { q: "What types of equipment qualify?", a: "Virtually any business equipment: vehicles, machinery, medical equipment, restaurant equipment, technology, construction equipment, and more." },
      { q: "What about the Section 179 tax deduction?", a: "Section 179 allows you to deduct the full purchase price of qualifying equipment in the year of purchase. Consult your tax advisor for specifics." }
    ]
  },
  {
    slug: "credit-building",
    title: "Business Credit Building",
    shortTitle: "Credit Building",
    tagline: "Build a strong business credit profile that separates personal and business finances",
    description: "Our business credit building program helps you establish and grow your business credit profile with Dun & Bradstreet, Experian Business, and Equifax Business. A strong business credit profile lets you access funding without personal guarantees and protects your personal credit.",
    icon: "BarChart3",
    color: "#059669",
    minAmount: "N/A",
    maxAmount: "N/A",
    termRange: "90-day program",
    rateRange: "Program fee: $997",
    speed: "Results in 90 days",
    creditMin: "Any",
    requirements: [
      "Registered business entity (LLC, Corp, etc.)",
      "EIN number",
      "Business bank account",
      "Business phone number",
      "Business address"
    ],
    benefits: [
      "Separate business and personal credit",
      "Access funding without personal guarantees",
      "Higher credit limits over time",
      "Better rates and terms on future funding",
      "Professional business profile",
      "Vendor credit and net terms access"
    ],
    process: [
      "Business credit profile audit",
      "Foundation building (D-U-N-S, registrations)",
      "Starter vendor accounts and tradelines",
      "Tier 2 credit accounts",
      "Monitoring and ongoing optimization"
    ],
    faqs: [
      { q: "How long does it take to build business credit?", a: "With our accelerated program, most clients have a solid business credit profile within 90 days. Continued building over 6-12 months creates an even stronger profile." },
      { q: "Do I need good personal credit?", a: "No, business credit is separate from personal credit. You can build business credit regardless of your personal score." },
      { q: "What is a D-U-N-S number?", a: "A D-U-N-S number is a unique identifier assigned by Dun & Bradstreet to your business. It's essential for building business credit and is required by many lenders and vendors." },
      { q: "Will this help me get loans later?", a: "Absolutely. A strong business credit profile significantly improves your chances of approval and helps you qualify for better rates and higher amounts." }
    ]
  },
  {
    slug: "consulting",
    title: "Credit Consulting",
    shortTitle: "Consulting",
    tagline: "Expert credit repair and optimization to maximize your funding potential",
    description: "Our credit consulting service provides personalized credit analysis, dispute management, and strategic optimization to improve your personal and business credit scores. Better credit means better funding options, lower rates, and higher approval amounts.",
    icon: "MessageSquare",
    color: "#7c3aed",
    minAmount: "N/A",
    maxAmount: "N/A",
    termRange: "30-90 day programs",
    rateRange: "Starting at $499",
    speed: "Results in 30-90 days",
    creditMin: "Any",
    requirements: [
      "Current credit reports from all 3 bureaus",
      "Willingness to follow credit optimization plan",
      "Valid identification",
      "Commitment to the program timeline"
    ],
    benefits: [
      "Professional credit analysis and strategy",
      "Dispute management for errors and negatives",
      "Score optimization techniques",
      "Tradeline strategy and recommendations",
      "Ongoing monitoring and support",
      "Prepares you for maximum funding approval"
    ],
    process: [
      "Comprehensive credit report analysis",
      "Custom optimization strategy created",
      "Dispute letters and negotiations initiated",
      "Score monitoring and progress tracking",
      "Final review and funding readiness assessment"
    ],
    faqs: [
      { q: "How much can my score improve?", a: "Results vary, but most clients see 40-100+ point improvements within 90 days. The amount depends on what's on your report and the types of issues present." },
      { q: "Is credit repair legal?", a: "Absolutely. You have the legal right to dispute inaccurate, incomplete, or unverifiable information on your credit reports under the Fair Credit Reporting Act (FCRA)." },
      { q: "How is this different from DIY credit repair?", a: "We bring expertise in credit law, dispute strategy, and lender relationships. Our success rates on disputes are significantly higher than DIY efforts." },
      { q: "Do you guarantee results?", a: "We cannot guarantee specific score increases, but we guarantee our effort and expertise. If we can't identify actionable items on your report, we'll let you know upfront." }
    ]
  }
];

export interface Testimonial {
  name: string;
  business: string;
  location: string;
  amount: string;
  type: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marcus Johnson",
    business: "Johnson's Auto Repair",
    location: "Atlanta, GA",
    amount: "$175,000",
    type: "Unsecured Business Capital",
    quote: "I needed capital to open my second location and FundingHub had me funded in 10 days. No collateral, no endless paperwork. The process was shockingly simple and the team was with me every step.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    business: "Bloom Digital Marketing",
    location: "Austin, TX",
    amount: "$85,000",
    type: "Business Line of Credit",
    quote: "As a growing agency, cash flow was always tight between client payments. My line of credit from FundingHub gave me the breathing room to hire two more team members and take on bigger clients.",
    rating: 5
  },
  {
    name: "David Okafor",
    business: "Fresh Eats Restaurant Group",
    location: "Chicago, IL",
    amount: "$250,000",
    type: "Revenue-Based Funding",
    quote: "Banks turned me down because of my credit score, but FundingHub looked at my restaurant's revenue instead. I got $250K in 48 hours and used it to renovate and expand. Revenue is up 40% since.",
    rating: 5
  },
  {
    name: "Lisa Martinez",
    business: "Martinez Construction LLC",
    location: "Phoenix, AZ",
    amount: "$450,000",
    type: "Equipment Financing",
    quote: "We needed heavy equipment for a major contract but didn't have the cash upfront. FundingHub arranged equipment financing in under a week. The monthly payments are very manageable and we won the contract.",
    rating: 5
  },
  {
    name: "James Wright",
    business: "Wright Properties",
    location: "Miami, FL",
    amount: "$1,200,000",
    type: "Real Estate Funding",
    quote: "FundingHub connected me with a commercial lender who understood my investment strategy. I closed on a 12-unit apartment building with great terms. They made the complex process feel simple.",
    rating: 5
  },
  {
    name: "Priya Patel",
    business: "TechServe Solutions",
    location: "San Jose, CA",
    amount: "$120,000",
    type: "SBA Loan",
    quote: "The SBA loan process seemed overwhelming until FundingHub walked me through it. They helped prepare my business plan, matched me with the right lender, and I got approved at an incredible rate.",
    rating: 5
  }
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "complete-guide-business-funding-2025",
    title: "The Complete Guide to Business Funding in 2025",
    excerpt: "Everything you need to know about securing capital for your business, from traditional bank loans to alternative funding options.",
    category: "Funding Guide",
    readTime: "8 min read",
    date: "March 15, 2025",
    content: `<h2>Understanding Your Funding Options</h2>
<p>The business funding landscape has evolved dramatically. Today's entrepreneurs have more options than ever, from traditional bank loans to innovative alternative funding solutions. Understanding these options is the first step to securing the right capital for your business.</p>

<h2>Traditional Bank Loans</h2>
<p>Bank loans remain a solid option for established businesses with strong credit and financials. They offer the lowest rates but come with stringent requirements and lengthy approval processes. Most banks require 2+ years in business, strong personal credit (700+), and detailed financial documentation.</p>

<h2>SBA Loans</h2>
<p>SBA loans are government-backed and offer excellent terms - low rates (5.5-8%) and long repayment periods (up to 25 years). The tradeoff is a longer application process (30-90 days). They're ideal for businesses that can plan ahead and meet the documentation requirements.</p>

<h2>Alternative Funding</h2>
<p>Alternative lenders have revolutionized business funding by using technology and data to make faster decisions. Revenue-based funding, merchant cash advances, and online lines of credit can be approved in hours rather than weeks. While rates are higher, the speed and accessibility make them valuable tools.</p>

<h2>Unsecured Business Capital</h2>
<p>One of the most powerful and underutilized funding strategies is accessing unsecured business capital at 0% introductory rates. This can provide $50K–$250K+ in interest-free capital for 12–21 months. It requires solid personal credit but offers unmatched flexibility with no collateral required.</p>

<h2>Choosing the Right Option</h2>
<p>The best funding option depends on your specific situation: how quickly you need capital, your credit profile, your revenue, and how you plan to use the funds. Many successful businesses use a combination of funding types to optimize their capital structure.</p>`
  },
  {
    slug: "credit-card-stacking-strategy",
    title: "How to Access $50K–$250K in Unsecured Business Capital at 0% Interest",
    excerpt: "Learn how business owners with solid credit are accessing $50K–$250K in unsecured capital at 0% interest — no collateral, no lengthy bank process.",
    category: "Strategy",
    readTime: "6 min read",
    date: "March 8, 2025",
    content: `<h2>What Is Unsecured Business Capital?</h2>
<p>Unsecured business capital gives you access to $50K–$250K+ in funding without putting up any collateral. By leveraging your strong personal credit profile, you can access substantial capital at 0% introductory rates for 12–21 months — giving you real runway to grow your business without the cost of traditional financing.</p>

<h2>How It Works</h2>
<p>Our team analyzes your credit profile and identifies the best combination of business credit products for your situation. We guide the entire process to maximize your total approved amount while minimizing impact on your credit score.</p>

<h2>Who Qualifies</h2>
<p>You'll need a personal credit score of 680+, a clean credit report with no recent derogatory marks, and fewer than 6 hard inquiries in the last 6 months. The stronger your credit profile, the more capital you can access.</p>

<h2>The Strategic Approach</h2>
<p>Success requires careful planning: identifying the right products, timing applications, and managing the accounts properly afterward. Working with an experienced funding advisor significantly increases your success rate and total approved amounts.</p>

<h2>Planning Ahead</h2>
<p>Smart business owners plan their capital strategy before the introductory period ends. Options include paying off balances from business revenue, refinancing to a business line of credit, or using the capital to generate enough ROI that the cost is irrelevant.</p>`
  },
  {
    slug: "improve-business-credit-score",
    title: "7 Proven Steps to Build Your Business Credit Score Fast",
    excerpt: "A step-by-step guide to establishing and improving your business credit profile for better funding options and lower rates.",
    category: "Credit Building",
    readTime: "7 min read",
    date: "February 28, 2025",
    content: `<h2>Why Business Credit Matters</h2>
<p>A strong business credit profile separates your personal and business finances, protects your personal credit, and opens doors to funding without personal guarantees. It's one of the most important assets you can build for your business.</p>

<h2>Step 1: Establish Your Business Foundation</h2>
<p>Register your business as an LLC or corporation, get an EIN, open a business bank account, and set up a dedicated business phone number. These basics are required before you can build business credit.</p>

<h2>Step 2: Get Your D-U-N-S Number</h2>
<p>Register with Dun & Bradstreet to get your free D-U-N-S number. This is the most widely used business credit identifier and is essential for building your profile.</p>

<h2>Step 3: Start with Vendor Credit</h2>
<p>Apply for net-30 vendor accounts that report to business credit bureaus. Companies like Uline, Grainger, and Quill are known for approving new businesses and reporting payment history.</p>

<h2>Step 4: Pay Early, Not Just On Time</h2>
<p>Paying before the due date (especially within the first 10 days) gives you the highest possible payment scores with Dun & Bradstreet.</p>

<h2>Step 5: Monitor Your Reports</h2>
<p>Regularly check your business credit reports from D&B, Experian Business, and Equifax Business. Dispute any errors promptly.</p>

<h2>Step 6: Graduate to Tier 2 Credit</h2>
<p>After establishing vendor credit, apply for business credit cards and small lines of credit from business-friendly lenders.</p>

<h2>Step 7: Maintain and Grow</h2>
<p>Continue adding positive tradelines, keep utilization low, and maintain perfect payment history. Your business credit profile will strengthen over time.</p>`
  },
  {
    slug: "revenue-based-funding-explained",
    title: "Revenue-Based Funding: The Fast Track to Business Capital",
    excerpt: "How revenue-based funding works, who it's best for, and how to get the best terms on your advance.",
    category: "Funding Guide",
    readTime: "5 min read",
    date: "February 20, 2025",
    content: `<h2>What Is Revenue-Based Funding?</h2>
<p>Revenue-based funding (also called a merchant cash advance or revenue advance) provides a lump sum of capital in exchange for a percentage of your future revenue. Unlike traditional loans, approval is based primarily on your business revenue rather than your credit score.</p>

<h2>How Repayment Works</h2>
<p>Repayments are typically collected daily or weekly as a fixed percentage of your revenue or a fixed daily/weekly amount. This means payments naturally adjust with your business performance - you pay more when business is good and less during slower periods.</p>

<h2>Understanding Factor Rates</h2>
<p>Revenue-based funding uses factor rates instead of APR. A factor rate of 1.2 on a $100K advance means you repay $120K total. Factor rates typically range from 1.1 to 1.5 depending on your risk profile and term length.</p>

<h2>Who Benefits Most</h2>
<p>Revenue-based funding is ideal for businesses with strong, consistent revenue but less-than-perfect credit. Restaurants, retail stores, e-commerce businesses, and service companies with regular cash flow are excellent candidates.</p>

<h2>Getting the Best Terms</h2>
<p>To get the best factor rates: maintain consistent bank deposits, keep a positive daily balance, avoid overdrafts, and work with a funding advisor who has relationships with multiple lenders to negotiate on your behalf.</p>`
  },
  {
    slug: "sba-loan-application-tips",
    title: "SBA Loan Application: 10 Tips to Get Approved",
    excerpt: "Expert tips for navigating the SBA loan process and maximizing your chances of approval.",
    category: "SBA Loans",
    readTime: "9 min read",
    date: "February 12, 2025",
    content: `<h2>Why SBA Loans Are Worth the Effort</h2>
<p>SBA loans offer the best terms in business lending - rates as low as 5.5%, terms up to 25 years, and amounts up to $5 million. The application process is more involved, but the savings over the life of the loan are substantial.</p>

<h2>Tip 1: Know Which Program Fits</h2>
<p>The SBA 7(a) program is the most flexible and popular. The 504 program is best for real estate and equipment. Microloans (up to $50K) are ideal for startups and smaller needs.</p>

<h2>Tip 2: Check Your Credit First</h2>
<p>Most SBA lenders want personal credit scores of 680+. Check your reports, dispute errors, and address any issues before applying.</p>

<h2>Tip 3: Prepare Your Business Plan</h2>
<p>A solid business plan is essential, especially for newer businesses. Include market analysis, financial projections, and a clear explanation of how you'll use and repay the funds.</p>

<h2>Tip 4: Organize Financial Documents</h2>
<p>Gather 3 years of tax returns (personal and business), current financial statements, bank statements, and a debt schedule. Having everything ready speeds up the process significantly.</p>

<h2>Tip 5: Work with an SBA-Preferred Lender</h2>
<p>Preferred lenders can approve SBA loans faster because they have delegated authority from the SBA. This can cut weeks off the approval timeline.</p>

<h2>Tips 6-10: Additional Strategies</h2>
<p>Show consistent revenue growth, minimize existing debt, offer collateral when possible, demonstrate industry experience, and consider working with a funding advisor who specializes in SBA loans to guide you through the process.</p>`
  },
  {
    slug: "business-funding-mistakes",
    title: "5 Costly Mistakes Business Owners Make When Seeking Funding",
    excerpt: "Avoid these common pitfalls that can cost you thousands or get your application denied.",
    category: "Tips & Advice",
    readTime: "6 min read",
    date: "February 5, 2025",
    content: `<h2>Mistake #1: Not Knowing Your Credit Before Applying</h2>
<p>Many business owners apply for funding without checking their credit first. Surprise issues on your report can lead to denials and wasted hard inquiries. Always pull your personal and business credit reports before applying for any funding.</p>

<h2>Mistake #2: Applying to the Wrong Lender</h2>
<p>Different lenders specialize in different types of businesses and risk profiles. Applying to a lender that doesn't serve your industry or credit tier wastes time and can result in unnecessary credit inquiries.</p>

<h2>Mistake #3: Borrowing More Than You Need</h2>
<p>It's tempting to take the maximum amount offered, but over-leveraging your business can create cash flow problems. Calculate exactly what you need and add a reasonable buffer - don't just take the max.</p>

<h2>Mistake #4: Ignoring the Total Cost of Capital</h2>
<p>A low monthly payment doesn't mean a low total cost. Always calculate the total repayment amount and effective APR. A short-term advance with a 1.4 factor rate can be more expensive than a longer-term loan at 15% APR.</p>

<h2>Mistake #5: Not Shopping Multiple Offers</h2>
<p>Accepting the first offer you receive is almost always a mistake. Working with a funding marketplace or advisor gives you access to multiple offers so you can compare terms and choose the best option.</p>`
  }
];

export const stats = [
  { value: "$500M+", label: "Funded to Date" },
  { value: "15,000+", label: "Businesses Funded" },
  { value: "24-72hrs", label: "Average Funding Time" },
  { value: "93%", label: "Approval Rate" },
];

export const processSteps = [
  {
    step: 1,
    title: "Apply Online",
    description: "Complete our simple application in under 5 minutes. No impact on your credit score.",
  },
  {
    step: 2,
    title: "Get Matched",
    description: "Our team reviews your profile and matches you with the best funding options available.",
  },
  {
    step: 3,
    title: "Review Offers",
    description: "Compare multiple funding offers with transparent terms, rates, and repayment schedules.",
  },
  {
    step: 4,
    title: "Get Funded",
    description: "Accept your offer and receive funds in as little as 24 hours via direct deposit.",
  },
];

export const partnerTiers = [
  {
    name: "Referral Partner",
    commission: "1-3%",
    description: "Perfect for individuals who occasionally refer business owners seeking funding.",
    requirements: ["No minimum referrals", "Simple referral link tracking", "Monthly payouts"],
    features: ["Unique referral link", "Basic dashboard", "Email support", "Monthly commission payouts"],
  },
  {
    name: "Affiliate Partner",
    commission: "3-5%",
    description: "For content creators, bloggers, and influencers in the business/finance space.",
    requirements: ["5+ referrals per month", "Active online presence", "Compliance with guidelines"],
    features: ["Custom landing pages", "Advanced analytics", "Priority support", "Bi-weekly payouts", "Co-branded materials"],
  },
  {
    name: "Broker Partner",
    commission: "5-10%",
    description: "For licensed brokers and financial professionals who actively source deals.",
    requirements: ["10+ deals per month", "Industry experience", "Compliance certification"],
    features: ["White-label portal", "Real-time deal tracking", "Dedicated account manager", "Weekly payouts", "Training and certification", "Highest commission rates"],
  },
];

export const faqs = [
  {
    q: "How quickly can I get funded?",
    a: "Depending on the funding type, you can receive funds in as little as 24 hours. Revenue-based funding is the fastest (24-72 hours), while SBA loans take 30-90 days. Most of our funding options fall in the 3-14 day range."
  },
  {
    q: "What credit score do I need?",
    a: "It depends on the funding type. Revenue-based funding accepts scores as low as 500. Business lines of credit typically require 600+. Unsecured business capital and SBA loans generally need 680+. We have options for virtually every credit profile."
  },
  {
    q: "Will applying affect my credit score?",
    a: "Our initial pre-qualification uses a soft credit pull that does NOT affect your score. Hard inquiries only occur when you choose to proceed with a specific funding offer."
  },
  {
    q: "How much funding can I qualify for?",
    a: "Funding amounts range from $5,000 to $5,000,000+ depending on the type of funding, your business revenue, credit profile, and time in business. Use our Funding Estimator tool on the homepage to get an instant estimate."
  },
  {
    q: "What documents do I need to apply?",
    a: "For most funding types, you'll need: government-issued ID, business bank statements (3-6 months), proof of business ownership, and basic business information. SBA loans and real estate funding require additional documentation."
  },
  {
    q: "Can I get funding if I have bad credit?",
    a: "Yes. Revenue-based funding focuses on your business revenue rather than credit score. We also offer credit consulting services to help improve your score for better future funding options."
  },
  {
    q: "Is there a fee to apply?",
    a: "No. There is never a fee to apply or get pre-qualified through FundingHub. We earn our revenue from lender partnerships, not from applicants."
  },
  {
    q: "Can I get multiple types of funding?",
    a: "Absolutely. Many of our clients use a combination of funding types — for example, unsecured business capital for immediate growth plus a business line of credit for ongoing cash flow management."
  },
];

export const creditAdvisoryPackage = {
  price: "$1,500",
  title: "90-Day Credit Optimization Program",
  tagline: "Transform your credit profile and unlock better funding options",
  includes: [
    {
      title: "Comprehensive Credit Analysis",
      description: "Deep dive into all three credit bureau reports (Equifax, Experian, TransUnion) with detailed findings and action plan."
    },
    {
      title: "Weekly Coaching Calls",
      description: "12 one-on-one sessions with a certified credit specialist to review progress, answer questions, and adjust strategy."
    },
    {
      title: "Dispute Management",
      description: "Professional dispute letters for inaccurate, incomplete, or unverifiable items. We handle all bureau communications."
    },
    {
      title: "Tradeline Strategy",
      description: "Strategic recommendations for authorized user tradelines and new accounts to optimize your credit mix and age."
    },
    {
      title: "Score Monitoring Dashboard",
      description: "Real-time access to your credit scores and report changes throughout the program."
    },
    {
      title: "Funding Readiness Assessment",
      description: "Final evaluation of your credit profile with specific recommendations for which funding products you now qualify for."
    }
  ],
  results: [
    "Average 60-100+ point score improvement",
    "Removal of inaccurate negative items",
    "Optimized credit utilization ratios",
    "Strategic new account recommendations",
    "Business credit foundation established",
    "Personalized funding roadmap"
  ]
};

export const industries = [
  "Restaurant / Food Service",
  "Retail / E-commerce",
  "Construction / Contracting",
  "Healthcare / Medical",
  "Professional Services",
  "Technology / SaaS",
  "Real Estate / Property Management",
  "Transportation / Logistics",
  "Manufacturing",
  "Auto / Repair Services",
  "Beauty / Salon / Spa",
  "Fitness / Wellness",
  "Education / Training",
  "Agriculture / Farming",
  "Other"
];

export const fundingPurposes = [
  "Working Capital / Cash Flow",
  "Expansion / New Location",
  "Equipment Purchase",
  "Inventory",
  "Marketing / Advertising",
  "Hiring / Payroll",
  "Debt Consolidation",
  "Real Estate Purchase",
  "Renovation / Buildout",
  "Vehicle Purchase",
  "Technology / Software",
  "Other"
];

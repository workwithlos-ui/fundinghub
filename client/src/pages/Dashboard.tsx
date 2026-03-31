/* Design: Growth Engine — Dynamic Momentum
 * Applicant dashboard with localStorage-based auth */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText, Upload, MessageSquare, Bell, User, CheckCircle2,
  Clock, ArrowRight, LogOut, DollarSign, Shield, AlertCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AUTH_KEY = "fundinghub_user";

interface UserData { name: string; email: string; password: string; }

function AuthScreen({ onLogin }: { onLogin: (user: UserData) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      if (!name || !email || !password) { setError("All fields are required"); return; }
      if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
      const user = { name, email, password };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      onLogin(user);
    } else {
      const saved = localStorage.getItem(AUTH_KEY);
      if (!saved) { setError("No account found. Please sign up first."); return; }
      const user = JSON.parse(saved);
      if (user.email !== email || user.password !== password) { setError("Invalid email or password"); return; }
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container max-w-md">
          <Card className="p-6 md:p-8 border border-slate-100 bg-white">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e40af] to-[#059669] flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-heading font-bold text-2xl text-slate-900">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {mode === "login" ? "Sign in to your dashboard" : "Get started with FundingHub"}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" placeholder="John Smith" />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" placeholder="john@business.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" placeholder="Min 6 characters" />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>}
              <Button type="submit" className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold h-11">
                {mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
            <p className="text-sm text-slate-500 text-center mt-4">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                className="text-[#1e40af] font-medium hover:underline">
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const statusSteps = ["Applied", "Under Review", "Approved", "Funded"];

const mockOffers = [
  { lender: "Capital Growth Partners", type: "Revenue-Based Funding", amount: "$75,000", rate: "Factor 1.25", term: "12 months", status: "pending" },
  { lender: "BlueVine Financial", type: "Business Line of Credit", amount: "$50,000", rate: "12% APR", term: "24 months revolving", status: "pending" },
];

const mockMessages = [
  { from: "FundingHub Team", subject: "Application Received", date: "2 hours ago", read: false, body: "Thank you for your application. A funding advisor has been assigned to your case and will be in touch within 24 hours." },
  { from: "Sarah M., Funding Advisor", subject: "Welcome to FundingHub", date: "1 day ago", read: true, body: "Hi! I'm Sarah, your dedicated funding advisor. I've reviewed your application and I'm excited to help you find the right funding solution." },
];

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setLoading(false);
  }, []);

  if (loading) return null;
  if (!user) return <AuthScreen onLogin={setUser} />;

  const apps = JSON.parse(localStorage.getItem("fundinghub_apps") || "[]");
  const latestApp = apps[apps.length - 1];
  const currentStatus = 1; // Under Review

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
                Welcome back, {user.name.split(" ")[0]}
              </h1>
              <p className="text-sm text-slate-500 mt-1">Manage your applications and funding offers</p>
            </div>
            <Button variant="outline" onClick={() => { localStorage.removeItem(AUTH_KEY); setUser(null); }}
              className="text-sm font-medium text-slate-600">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>

          <Tabs defaultValue="status" className="space-y-6">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl">
              <TabsTrigger value="status" className="rounded-lg text-sm font-medium data-[state=active]:bg-[#1e40af] data-[state=active]:text-white">
                <FileText className="w-4 h-4 mr-1.5" /> Status
              </TabsTrigger>
              <TabsTrigger value="documents" className="rounded-lg text-sm font-medium data-[state=active]:bg-[#1e40af] data-[state=active]:text-white">
                <Upload className="w-4 h-4 mr-1.5" /> Documents
              </TabsTrigger>
              <TabsTrigger value="offers" className="rounded-lg text-sm font-medium data-[state=active]:bg-[#1e40af] data-[state=active]:text-white">
                <DollarSign className="w-4 h-4 mr-1.5" /> Offers
              </TabsTrigger>
              <TabsTrigger value="messages" className="rounded-lg text-sm font-medium data-[state=active]:bg-[#1e40af] data-[state=active]:text-white">
                <MessageSquare className="w-4 h-4 mr-1.5" /> Messages
              </TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg text-sm font-medium data-[state=active]:bg-[#1e40af] data-[state=active]:text-white">
                <User className="w-4 h-4 mr-1.5" /> Profile
              </TabsTrigger>
            </TabsList>

            {/* Status Tab */}
            <TabsContent value="status">
              {latestApp ? (
                <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                  <h2 className="font-heading font-bold text-xl text-slate-900 mb-6">Application Status</h2>
                  <div className="flex items-center justify-between mb-8">
                    {statusSteps.map((s, i) => (
                      <div key={s} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            i < currentStatus ? "bg-[#059669] text-white" : i === currentStatus ? "bg-[#1e40af] text-white" : "bg-slate-100 text-slate-400"
                          }`}>
                            {i < currentStatus ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{i + 1}</span>}
                          </div>
                          <span className={`text-xs mt-2 font-medium ${i <= currentStatus ? "text-slate-900" : "text-slate-400"}`}>{s}</span>
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div className={`w-12 sm:w-20 h-0.5 mx-2 mb-5 ${i < currentStatus ? "bg-[#059669]" : "bg-slate-200"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#1e40af] mt-0.5" />
                      <div>
                        <p className="font-heading font-semibold text-sm text-slate-900">Under Review</p>
                        <p className="text-sm text-slate-600 mt-1">Your application is being reviewed by our funding team. You'll receive an update within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">Application ID</p>
                      <p className="font-heading font-semibold text-sm text-slate-900 mt-1">{latestApp.id}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">Submitted</p>
                      <p className="font-heading font-semibold text-sm text-slate-900 mt-1">{new Date(latestApp.date).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">Amount Requested</p>
                      <p className="font-heading font-semibold text-sm text-slate-900 mt-1">{latestApp.amountNeeded}</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 border border-slate-100 bg-white text-center">
                  <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h2 className="font-heading font-bold text-xl text-slate-900 mb-2">No Applications Yet</h2>
                  <p className="text-sm text-slate-500 mb-6">Start your funding journey by submitting an application.</p>
                  <Link href="/apply">
                    <Button className="bg-[#059669] hover:bg-[#047857] text-white font-semibold">
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              )}
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-2">Document Upload</h2>
                <p className="text-sm text-slate-500 mb-6">Upload required documents to speed up your application review.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {["Bank Statements (3 months)", "Government-Issued ID", "Business License", "Tax Returns", "Profit & Loss Statement", "Voided Check"].map((doc) => (
                    <div key={doc} className="border border-dashed border-slate-200 rounded-xl p-4 hover:border-[#1e40af]/40 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#1e40af] transition-colors" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">{doc}</p>
                          <p className="text-xs text-slate-400">PDF, JPG, PNG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400">All documents are encrypted and stored securely. We never share your documents without your consent.</p>
              </Card>
            </TabsContent>

            {/* Offers Tab */}
            <TabsContent value="offers">
              <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-6">Funding Offers</h2>
                {latestApp ? (
                  <div className="space-y-4">
                    {mockOffers.map((offer, i) => (
                      <div key={i} className="border border-slate-100 rounded-xl p-5 hover:border-[#1e40af]/30 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-heading font-semibold text-slate-900">{offer.lender}</p>
                            <p className="text-xs text-slate-500">{offer.type}</p>
                          </div>
                          <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">Pending Review</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div><p className="text-xs text-slate-400">Amount</p><p className="font-heading font-bold text-[#059669]">{offer.amount}</p></div>
                          <div><p className="text-xs text-slate-400">Rate</p><p className="font-heading font-semibold text-sm text-slate-900">{offer.rate}</p></div>
                          <div><p className="text-xs text-slate-400">Term</p><p className="font-heading font-semibold text-sm text-slate-900">{offer.term}</p></div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold">Accept Offer</Button>
                          <Button size="sm" variant="outline" className="text-xs font-medium">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Submit an application to receive funding offers.</p>
                )}
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-6">Messages & Notifications</h2>
                <div className="space-y-3">
                  {mockMessages.map((msg, i) => (
                    <div key={i} className={`border rounded-xl p-4 cursor-pointer transition-colors ${msg.read ? "border-slate-100 hover:border-slate-200" : "border-[#1e40af]/20 bg-blue-50/30 hover:border-[#1e40af]/40"}`}>
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-heading font-semibold text-sm text-slate-900 flex items-center gap-2">
                          {!msg.read && <span className="w-2 h-2 rounded-full bg-[#1e40af]" />}
                          {msg.subject}
                        </p>
                        <span className="text-xs text-slate-400">{msg.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">From: {msg.from}</p>
                      <p className="text-sm text-slate-600">{msg.body}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="p-6 md:p-8 border border-slate-100 bg-white">
                <h2 className="font-heading font-bold text-xl text-slate-900 mb-6">Profile Settings</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                    <input type="text" defaultValue={user.name}
                      className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                    <input type="email" defaultValue={user.email}
                      className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-slate-50 text-slate-500" disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
                    <input type="tel" placeholder="(555) 123-4567"
                      className="w-full h-11 rounded-lg border border-slate-200 px-4 text-sm bg-white text-slate-800 focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 outline-none" />
                  </div>
                  <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold">Save Changes</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Design: Growth Engine - Dynamic Momentum
 * Blog listing and article detail */
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/data";

export function BlogList() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Resources</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">Business Funding Blog</h1>
            <p className="text-lg text-slate-300 max-w-xl">Expert insights, strategies, and guides to help you secure the right funding for your business.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="card-hover h-full border border-slate-100 bg-white cursor-pointer group overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-[#1e40af] to-[#059669]" />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium bg-[#1e40af]/10 text-[#1e40af] px-2.5 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                      <h2 className="font-heading font-bold text-lg text-slate-900 mb-2 group-hover:text-[#1e40af] transition-colors leading-snug">{post.title}</h2>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{post.date}</span>
                        <span className="text-sm font-medium text-[#1e40af] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a]">
        <div className="container text-center">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-white mb-4">Need Funding Now?</h2>
          <p className="text-blue-200 mb-6">Apply in 5 minutes and get matched with the best options for your business.</p>
          <Link href="/apply">
            <Button size="lg" className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8">
              Apply Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen"><Navbar />
        <div className="pt-28 pb-20 container text-center">
          <h1 className="font-heading font-bold text-2xl text-slate-900 mb-4">Article Not Found</h1>
          <Link href="/blog"><Button>Back to Blog</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium bg-white/10 text-white px-2.5 py-1 rounded-full">{post.category}</span>
            <span className="text-xs text-slate-400">{post.date}</span>
            <span className="text-xs text-slate-400">{post.readTime}</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Ready to Get Funded?</h3>
            <p className="text-sm text-slate-600 mb-4">Apply in 5 minutes and get matched with the best funding options for your business.</p>
            <Link href="/apply">
              <Button className="bg-[#059669] hover:bg-[#047857] text-white font-semibold">
                Start Your Application <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

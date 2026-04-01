import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import FundingDetail from "./pages/FundingDetail";
import Dashboard from "./pages/Dashboard";
import { BlogList, BlogDetail } from "./pages/Blog";
import Calculators from "./pages/Calculators";
import FAQ from "./pages/FAQ";
import Partners from "./pages/Partners";
import CreditAdvisory from "./pages/CreditAdvisory";
import AIAdvisor from "./pages/AIAdvisor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/apply" component={Apply} />
      <Route path="/funding/:slug" component={FundingDetail} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/calculators" component={Calculators} />
      <Route path="/faq" component={FAQ} />
      <Route path="/partners" component={Partners} />
      <Route path="/credit-advisory" component={CreditAdvisory} />
      <Route path="/ai-advisor" component={AIAdvisor} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

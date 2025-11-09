import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import ClientSignIn from "@/pages/ClientSignIn";
import ParkingMap from "@/pages/ParkingMap";
import ReservationForm from "@/pages/ReservationForm";
import PaymentPage from "@/pages/PaymentPage";
import CodeDisplay from "@/pages/CodeDisplay";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import ReservationHistory from "@/pages/ReservationHistory";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/client-signin" component={ClientSignIn} />
      <Route path="/parking" component={ParkingMap} />
      <Route path="/reserve/:spotId" component={ReservationForm} />
      <Route path="/payment/:spotId" component={PaymentPage} />
      <Route path="/payment-success/:spotId" component={CodeDisplay} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/reservation-history" component={ReservationHistory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

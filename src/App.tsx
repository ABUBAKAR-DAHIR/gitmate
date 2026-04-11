import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import Matches from "./pages/Matches";
import WhyGitMate from "./pages/WhyGitMate";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import { useEffect, useState } from "react";
import Details from "./pages/Details";

const queryClient = new QueryClient();




const App = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  
  useEffect(() => {
      const authenticate = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true })
          setIsAuthenticated(!!res.data) // true if user data exists
        } catch (err) {
          setIsAuthenticated(false)
        }
      }
      authenticate()
  }, [])
  
  if (isAuthenticated === null) return <div>Loading...</div> // show while checking auth

  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/why-gitmate" element={<WhyGitMate />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute isAuthenticated = {isAuthenticated}/>}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/matches" element={<Matches />} />
          </Route>
            <Route path="/details" element={<Details />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
};

export default App;

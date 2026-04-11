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
    import api from "./lib/axios";
    import IndexSkeleton from "./loadings/IndexSkeleton"
    import GuardedRoutes from "./components/GuardedRoutes";

    const queryClient = new QueryClient();




    const App = () => {
      
      const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
      const [isProfiled, setIsProfiled] = useState<boolean | null>(null)
      
      useEffect(() => {
          const authenticate = async () => {
            try {
              setIsAuthenticated(null)
              setIsProfiled(null)
              
              const res = await api.get("/auth/me")
              const user = res.data.user
              
              if(!user) {
                setIsProfiled(false)
                return
              }

              setIsAuthenticated(!!user) // true if user data exists
              
               try {
                const profileRes = await api.get("/profile");
                setIsProfiled(profileRes.data.success === true);
              } catch (error: any) {
                console.log("Frontend profile fetch error: ", error.message)
                setIsProfiled(false);
              } 

            } catch (error: any) {
              console.log("Frontend fetch error: ", error.message)
              setIsAuthenticated(false)
              setIsProfiled(false)
            }
          }
          authenticate()
      }, [])
      
      console.log("isProfiled: ", isProfiled)
      console.log("isAuthenticated: ", isAuthenticated)
      if (isAuthenticated === null || isProfiled === null) return <IndexSkeleton />

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
                <Route element={<GuardedRoutes isProfiled = {isProfiled}/>}>
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
              </Route>

            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    };

    export default App;

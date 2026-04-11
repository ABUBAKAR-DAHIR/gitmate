import { motion } from "framer-motion";
import { GitBranch, ArrowRight, Code2, Users, Zap, Shield, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const queryClient = useQueryClient()
  // const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
  const isAuthenticated = useAuth()
    const { refreshAuth } = useAuth();

  const fetchUser = async () => {
    try {
      const resData = await api.get("auth/me", {
        withCredentials: true
      })

      return resData.data.user ?? null
    } catch (err) {
      return null 
    }
  }
  const logout = async () => {
    return await api.get("/auth/logout", {
      withCredentials: true
    })
  }


  const {data: user, error, isLoading: userLoading} = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 0
  })

  const {mutate: logoutUser, isPending: loggingOut} = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      await refreshAuth()
    }
  })

  // useEffect(()=> {
  //   setIsLoggingOut(loggingOut)
  // }, [loggingOut])

  
  
  if(userLoading) console.log("loading...")
  else if(loggingOut) console.log("logging out")
  else if(!user) console.log("not logged in")
  else console.log("logged in")
  

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">GitMate</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/why-gitmate" className="text-sm text-muted-foreground hover:text-foreground">Why GitMate?</Link>
              {
                isAuthenticated ? (
                  <Button 
                    variant="github" 
                    size="sm" 
                    onClick={() => logoutUser()}
                  >
                    {loggingOut ? "logging out..." : "Logout"}
                  </Button>
                ) : (
                  <Button variant="github" size="sm" asChild>
                    <Link to="/login">Sign in</Link>
                  </Button>
                )
              }
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Developer Collaboration Platform</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-foreground leading-tight mb-6">
              Find Your<br />
              <span className="gradient-text">Coding Soulmate</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Connect with developers using verified GitHub data. Match based on real code, not resumes. Build together, grow together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild>
                {
                    user 
                    ?
                    <Link to="/dashboard">
                      <LayoutDashboard /> Dashboard
                    </Link>
                    :
                    <Link to="/login">
                      Get Started
                    </Link>

                }
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/why-gitmate">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Developers Choose GitMate</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Built by engineers, for engineers. No fake profiles, no empty claims.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Verified Skills", desc: "Every skill backed by real commits and contributions" },
              { icon: Users, title: "Smart Matching", desc: "Algorithm matches based on code patterns and interests" },
              { icon: Zap, title: "Zero Friction", desc: "Swipe to connect, built-in chat and project tools" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl p-8 text-center hover:border-primary/30 transition-all"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-border/50 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to find your match?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of developers building the future together.</p>
          <Button size="lg" asChild>
            {
                user 
                ?
                <Link to="/dashboard">
                  <LayoutDashboard /> Go to Dashboard
                </Link>
                :
                <Link to="/login">
                  Get Started
                </Link>
            }
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">GitMate</span>
          </div>
          <p className="text-xs text-muted-foreground">Built for developers, by developers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

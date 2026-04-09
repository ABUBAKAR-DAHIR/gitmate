import { motion } from "framer-motion";
import { GitBranch, Github, Shield, Lock, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<any>()
  const handleGitHubLogin = () => {
    // Simulate OAuth flow - redirect to onboarding
    window.location.href = "./dashboard";
  };

  useEffect(()=>{
    const fetchUser = async() => {
      try {
        const userData = await fetch("http://localhost:3000/auth/me", {
          credentials: "include"
        })
  
        const user = await userData.json()
  
        if(user.isLoggedIn){
          setLoggedIn(true)
          setUser(user.user)
        }

        else setLoggedIn(false)
        
      } catch (error: any) {
        console.error("Frontend fetch error: ", error.message)
        setLoggedIn(false)
      }
    }

    fetchUser()
  }, [])
  
  return  (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">GitMate</span>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                Find Your<br />
                <span className="gradient-text">Coding Soulmate</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-md">
                Connect with developers who share your passion. Build together, grow together.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Verified skills from real commits</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-info" />
                </div>
                <span className="text-sm text-muted-foreground">No fake profiles, no empty claims</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-warning" />
                </div>
                <span className="text-sm text-muted-foreground">Only public repos are accessed</span>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="text-sm text-muted-foreground">
            Trusted by 10,000+ developers worldwide
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-semibold text-foreground">GitMate</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Sign in to GitMate</h2>
            <p className="mt-2 text-muted-foreground">Let your code speak for you.</p>
          </div>

          {/* Login Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-6">
            <Button
              variant="github"
              size="xl"
              className="w-full"
              onClick={handleGitHubLogin}
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                We only access public repositories. Your code, keys, and private data remain secure.
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>

          {/* Explore link */}
          <div className="text-center pt-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Learn more about GitMate →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  ) 

  // <div className="text-white">
  //   loggedIn already
  //   {user.email}</div>
};

export default Login;

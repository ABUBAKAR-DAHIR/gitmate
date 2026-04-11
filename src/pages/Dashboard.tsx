import { motion } from "framer-motion";
import { Users, MessageSquare, FolderKanban, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/cards/StatCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

// const user = {
//   name: "Developer",
//   image: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
//   email: "developer",
// };

const recentMatches = [
  { id: "1", name: "Sarah Chen", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", role: "Full Stack" },
  { id: "2", name: "Alex Kim", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", role: "Backend" },
  { id: "3", name: "Jordan Lee", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan", role: "ML Engineer" },
];

const Dashboard = () => {

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

  if(userLoading) return <div>loading...</div>

  return (
    <AppLayout user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        > 
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">{user.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Ready to find your next collaborator?</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Matches"
            value={23}
            icon={Users}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Active Chats"
            value={7}
            icon={MessageSquare}
            subtitle="3 unread"
          />
          <StatCard
            title="Projects"
            value={4}
            icon={FolderKanban}
            subtitle="2 in progress"
          />
          <StatCard
            title="Profile Views"
            value={156}
            icon={Zap}
            trend={{ value: 24, positive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Find Collaborators CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-border/50 rounded-2xl p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-foreground mb-2">Find Collaborators</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Swipe through developers with verified GitHub profiles. Match based on real code, not claims.
                </p>
                <Button size="lg" asChild>
                  <Link to="/feed">
                    Start Swiping <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Recent Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Recent Matches</h3>
                <Link to="/matches" className="text-sm text-primary hover:underline">View all</Link>
              </div>
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div key={match.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                    <img
                      src={match.image}
                      alt={match.name}
                      className="w-10 h-10 rounded-full border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{match.name}</p>
                      <p className="text-xs text-muted-foreground">{match.role}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Link to="/projects" className="group">
            <div className="bg-card border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group-hover:shadow-glow">
              <FolderKanban className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-medium text-foreground">Create Project</h4>
              <p className="text-sm text-muted-foreground">Start a new project and find collaborators</p>
            </div>
          </Link>
          <Link to="/profile" className="group">
            <div className="bg-card border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group-hover:shadow-glow">
              <Users className="w-6 h-6 text-accent mb-3" />
              <h4 className="font-medium text-foreground">Update Profile</h4>
              <p className="text-sm text-muted-foreground">Sync your latest GitHub activity</p>
            </div>
          </Link>
          <Link to="/why-gitmate" className="group">
            <div className="bg-card border border-border/50 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group-hover:shadow-glow">
              <Zap className="w-6 h-6 text-warning mb-3" />
              <h4 className="font-medium text-foreground">Why GitMate?</h4>
              <p className="text-sm text-muted-foreground">Learn about our matching algorithm</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

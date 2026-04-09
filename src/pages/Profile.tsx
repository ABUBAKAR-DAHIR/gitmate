import { motion } from "framer-motion";
import { GitBranch, Star, Code2, MapPin, ExternalLink, RefreshCw, Edit2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const mockUser = {
  name: "Developer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
  username: "developer",
};

const mockProfile = {
  bio: "Full-stack developer passionate about building scalable applications and open-source contribution.",
  location: "San Francisco, CA",
  joined: "January 2024",
  stats: {
    repos: 47,
    commits: 1234,
    stars: 89,
    contributions: 856,
  },
  languages: [
    { name: "TypeScript", percentage: 45, color: "bg-blue-500" },
    { name: "Python", percentage: 30, color: "bg-green-500" },
    { name: "JavaScript", percentage: 15, color: "bg-yellow-500" },
    { name: "Go", percentage: 10, color: "bg-cyan-500" },
  ],
  skills: ["Frontend", "Backend", "Full Stack", "DevOps"],
  techStack: ["React", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
  featuredRepos: [
    { name: "awesome-project", description: "A full-stack web application with modern tooling", stars: 45, forks: 12, language: "TypeScript" },
    { name: "ml-experiments", description: "Collection of machine learning experiments and notebooks", stars: 23, forks: 8, language: "Python" },
    { name: "dotfiles", description: "My personal development environment configuration", stars: 15, forks: 3, language: "Shell" },
  ],
  collaborations: [
    { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", project: "E-commerce Platform" },
    { name: "Alex Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", project: "API Gateway" },
  ],
};

const Profile = () => {
  return (
    <AppLayout user={mockUser}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/50 rounded-2xl overflow-hidden"
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5" />
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
              <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-3xl">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>@{mockUser.username}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" /> Sync GitHub
                    </Button>
                    <Button variant="subtle" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-muted-foreground max-w-2xl">{mockProfile.bio}</p>

            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {mockProfile.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Joined {mockProfile.joined}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
        >
          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <GitBranch className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{mockProfile.stats.repos}</p>
            <p className="text-xs text-muted-foreground">Repositories</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <Code2 className="w-5 h-5 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{mockProfile.stats.commits.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Commits</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <Star className="w-5 h-5 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{mockProfile.stats.stars}</p>
            <p className="text-xs text-muted-foreground">Stars</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <GitBranch className="w-5 h-5 text-info mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">{mockProfile.stats.contributions}</p>
            <p className="text-xs text-muted-foreground">Contributions</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">Top Languages</h3>
              <div className="space-y-4">
                {mockProfile.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{lang.name}</span>
                      <span className="text-muted-foreground font-mono">{lang.percentage}%</span>
                    </div>
                    <Progress value={lang.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills & Tech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockProfile.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {skill}
                  </Badge>
                ))}
              </div>
              <h3 className="font-semibold text-foreground mb-3 mt-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {mockProfile.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-mono text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Repos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">Featured Repositories</h3>
              <div className="grid gap-4">
                {mockProfile.featuredRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="p-4 bg-secondary/30 rounded-xl border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground font-mono">{repo.name}</h4>
                      <Badge variant="outline" className="text-xs font-mono">
                        {repo.language}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" /> {repo.forks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Current Collaborations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">Current Collaborations</h3>
              <div className="space-y-3">
                {mockProfile.collaborations.map((collab) => (
                  <div key={collab.name} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={collab.avatar} alt={collab.name} />
                      <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{collab.name}</p>
                      <p className="text-xs text-muted-foreground">{collab.project}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

import { motion } from "framer-motion";
import { MessageSquare, GitBranch, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const mockUser = {
  name: "Developer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
  username: "developer",
};

const mockMatches = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    topLanguages: ["TypeScript", "Python"],
    repoCount: 67,
    stars: 234,
    matchedAt: "2 hours ago",
    commonInterests: ["Open Source", "Web3"],
  },
  {
    id: "2",
    name: "Alex Kim",
    username: "alexk",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    topLanguages: ["Go", "Rust"],
    repoCount: 45,
    stars: 178,
    matchedAt: "1 day ago",
    commonInterests: ["Distributed Systems", "DevOps"],
  },
  {
    id: "3",
    name: "Jordan Lee",
    username: "jordanl",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    topLanguages: ["Python", "C++"],
    repoCount: 32,
    stars: 512,
    matchedAt: "3 days ago",
    commonInterests: ["Machine Learning", "NLP"],
  },
  {
    id: "4",
    name: "Taylor Morgan",
    username: "taylorm",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor",
    topLanguages: ["TypeScript", "JavaScript"],
    repoCount: 89,
    stars: 156,
    matchedAt: "1 week ago",
    commonInterests: ["UI/UX", "Design Systems"],
  },
];

const Matches = () => {
  return (
    <AppLayout user={mockUser}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Matches</h1>
            <p className="text-muted-foreground mt-1">{mockMatches.length} developers want to collaborate with you</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search matches..."
              className="pl-9 bg-card border-border/50"
            />
          </div>
        </motion.div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 border-2 border-border">
                  <AvatarImage src={match.avatar} alt={match.name} />
                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{match.name}</h3>
                      <p className="text-sm text-muted-foreground">@{match.username}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{match.matchedAt}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" /> {match.repoCount} repos
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {match.stars} stars
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {match.topLanguages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs font-mono">
                        {lang}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-xs text-muted-foreground">Common:</span>
                    {match.commonInterests.map((interest) => (
                      <span key={interest} className="text-xs text-primary">{interest}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/profile/${match.id}`}>View Profile</Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link to="/chat">
                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Matches;

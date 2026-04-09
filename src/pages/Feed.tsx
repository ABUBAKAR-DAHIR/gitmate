import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X, Heart, Star, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { DeveloperCard } from "@/components/cards/DeveloperCard";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Developer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
  username: "developer",
};

const mockDevelopers = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Full-stack developer passionate about building scalable applications. Love React and Node.js.",
    location: "San Francisco, CA",
    topLanguages: ["TypeScript", "Python", "Go"],
    repoCount: 67,
    stars: 234,
    interests: ["Open Source", "Web3", "AI/ML"],
  },
  {
    id: "2",
    name: "Alex Kim",
    username: "alexk",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Backend engineer focused on distributed systems and cloud infrastructure.",
    location: "Seattle, WA",
    topLanguages: ["Go", "Rust", "Python"],
    repoCount: 45,
    stars: 178,
    interests: ["Distributed Systems", "DevOps", "Kubernetes"],
  },
  {
    id: "3",
    name: "Jordan Lee",
    username: "jordanl",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    bio: "ML Engineer building intelligent systems. PhD in Computer Science.",
    location: "Boston, MA",
    topLanguages: ["Python", "C++", "Julia"],
    repoCount: 32,
    stars: 512,
    interests: ["Machine Learning", "NLP", "Computer Vision"],
  },
  {
    id: "4",
    name: "Taylor Morgan",
    username: "taylorm",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor",
    bio: "Frontend developer and design enthusiast. Creating beautiful user experiences.",
    location: "Austin, TX",
    topLanguages: ["TypeScript", "JavaScript", "CSS"],
    repoCount: 89,
    stars: 156,
    interests: ["UI/UX", "Design Systems", "Accessibility"],
  },
];

const Feed = () => {
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState(mockDevelopers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [showMatch, setShowMatch] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);
    
    // Simulate match on right swipe (50% chance)
    if (dir === "right" && Math.random() > 0.5) {
      setTimeout(() => setShowMatch(true), 300);
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    }
  };

  const currentDeveloper = developers[currentIndex];
  const nextDeveloper = developers[currentIndex + 1];

  return (
    <AppLayout user={mockUser}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Find Collaborators</h1>
          <p className="text-muted-foreground">Swipe right to connect, left to skip</p>
        </div>

        {/* Card Stack */}
        <div className="relative flex justify-center items-center min-h-[500px]">
          {currentIndex >= developers.length ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">You've seen everyone!</h3>
              <p className="text-muted-foreground">Check back later for more developers</p>
              <Button variant="outline" onClick={() => setCurrentIndex(0)}>
                <RotateCcw className="w-4 h-4 mr-2" /> Start Over
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Background card */}
              {nextDeveloper && (
                <div className="absolute">
                  <DeveloperCard
                    developer={nextDeveloper}
                    className="opacity-50 scale-95"
                  />
                </div>
              )}

              {/* Active card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDeveloper.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  style={{ x, rotate, opacity }}
                  animate={
                    direction === "left"
                      ? { x: -500, opacity: 0, rotate: -30 }
                      : direction === "right"
                      ? { x: 500, opacity: 0, rotate: 30 }
                      : { x: 0, opacity: 1, rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <DeveloperCard developer={currentDeveloper} />
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {currentIndex < developers.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-destructive/50 hover:bg-destructive/10 hover:border-destructive"
              onClick={() => handleSwipe("left")}
            >
              <X className="w-6 h-6 text-destructive" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-warning/50 hover:bg-warning/10 hover:border-warning"
            >
              <Star className="w-6 h-6 text-warning" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-primary/50 hover:bg-primary/10 hover:border-primary"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="w-6 h-6 text-primary" />
            </Button>
          </motion.div>
        )}

        {/* Match Modal */}
        <AnimatePresence>
          {showMatch && currentDeveloper && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              onClick={() => setShowMatch(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card border border-border/50 rounded-2xl p-8 text-center max-w-md mx-4 shadow-glow"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6"
                >
                  <Heart className="w-10 h-10 text-primary" fill="currentColor" />
                </motion.div>
                
                <h2 className="text-2xl font-bold gradient-text mb-2">It's a Match!</h2>
                <p className="text-muted-foreground mb-6">
                  You and {developers[currentIndex - 1]?.name} both want to connect
                </p>

                <div className="flex justify-center gap-3 mb-6">
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-16 h-16 rounded-full border-2 border-primary"
                  />
                  <img
                    src={developers[currentIndex - 1]?.avatar}
                    alt={developers[currentIndex - 1]?.name}
                    className="w-16 h-16 rounded-full border-2 border-accent"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowMatch(false)}>
                    Keep Swiping
                  </Button>
                  <Button className="flex-1" onClick={() => navigate("/chat")}>
                    Start Chat
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default Feed;

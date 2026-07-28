import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  X,
  Heart,
  Star,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { DeveloperCard } from "@/components/cards/DeveloperCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const Feed = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [showMatch, setShowMatch] = useState(false);

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-18, 18]);

  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.6, 1, 1, 1, 0.6]
  );

  const {
    data: developers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["similar-profiles"],
    queryFn: async () => {
      const { data } = await api.get("/profile/similar");
      return data;
    },
  });

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);

    if (dir === "right" && Math.random() > 0.5) {
      setTimeout(() => setShowMatch(true), 800);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    }
  };

  const currentDeveloper = developers[currentIndex];
  const nextDeveloper = developers[currentIndex + 1];

  // ---------------- Loading ----------------

  if (isLoading) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Discover Developers
            </h1>

            <p className="mt-3 text-muted-foreground">
              Finding your best collaborators...
            </p>
          </div>

          <div className="flex justify-center py-10">
            <DeveloperCard isLoading />
          </div>
        </div>
      </AppLayout>
    );
  }

  // ---------------- Error ----------------

  if (isError) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex justify-center py-10">
            <DeveloperCard
              error={
                error instanceof Error
                  ? error.message
                  : "Unable to load developers."
              }
            />
          </div>
        </div>
      </AppLayout>
    );
  }

  // ---------------- UI ----------------

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 pb-8 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-6 text-center">

          <h1 className="text-4xl font-bold tracking-tight">
            Discover Developers
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            We found developers whose goals, experience, and availability
            closely match yours.
          </p>
        </div>

        {/* Card Stack */}

        <div className="relative flex my-8 items-center justify-center">
          {currentIndex >= developers.length ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center space-y-5 text-center"
            >
              <div className="rounded-full bg-primary/10 p-6">
                <Heart
                  className="h-10 w-10 text-primary"
                  fill="currentColor"
                />
              </div>

              <h2 className="text-3xl font-bold">
                That's everyone!
              </h2>

              <p className="max-w-sm text-muted-foreground">
                We'll recommend more developers as new profiles become
                available.
              </p>

              <Button onClick={() => setCurrentIndex(0)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Again
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Background Card */}

              {nextDeveloper && (
                <div className="absolute">
                  <DeveloperCard
                    developer={nextDeveloper}
                    className="scale-95 opacity-35 blur-[1px]"
                  />
                </div>
              )}

              {/* Active Card */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDeveloper.userId}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  style={{
                    x,
                    rotate,
                    opacity,
                  }}
                  animate={
                    direction === "left"
                      ? {
                          x: -500,
                          opacity: 0,
                          rotate: -25,
                        }
                      : direction === "right"
                      ? {
                          x: 500,
                          opacity: 0,
                          rotate: 25,
                        }
                      : {
                          x: 0,
                          opacity: 1,
                          rotate: 0,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                  }}
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
            className="mt-4 flex justify-center gap-5"
          >
            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-destructive/40 bg-background shadow-lg hover:border-destructive hover:bg-destructive/10"
                onClick={() => handleSwipe("left")}
              >
                <X className="h-7 w-7 text-destructive" />
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-yellow-500/40 bg-background shadow-lg hover:border-yellow-500 hover:bg-yellow-500/10"
              >
                <Star className="h-7 w-7 text-yellow-500" />
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-primary/40 bg-background shadow-lg hover:border-primary hover:bg-primary/10"
                onClick={() => handleSwipe("right")}
              >
                <Heart className="h-7 w-7 text-primary" />
              </Button>
            </motion.div>
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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                }}
                className="w-full max-w-md overflow-hidden rounded-3xl border bg-card shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-primary via-primary/80 to-primary/30 p-6 text-center text-primary-foreground">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                    }}
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur"
                  >
                    <Heart
                      className="h-8 w-8"
                      fill="currentColor"
                    />
                  </motion.div>

                  <h2 className="text-2xl font-bold">
                    You matched!
                  </h2>

                  <p className="mt-1 text-primary-foreground/80">
                    {currentDeveloper.similarity} compatibility
                  </p>
                </div>

                <div className="p-6 text-center">
                  <div className="mb-5 flex justify-center">
                    <div className="relative">
                      <img
                        src={currentDeveloper.image}
                        alt={currentDeveloper.name}
                        className="h-20 w-20 rounded-full border-4 border-background shadow-lg"
                      />

                      <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground shadow">
                        <Heart
                          className="h-4 w-4"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold">
                    {currentDeveloper.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {currentDeveloper.bio}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border bg-muted/30 p-3">
                      <div className="text-muted-foreground">
                        Experience
                      </div>

                      <div className="font-medium">
                        {currentDeveloper.experience}
                      </div>
                    </div>

                    <div className="rounded-xl border bg-muted/30 p-3">
                      <div className="text-muted-foreground">
                        Availability
                      </div>

                      <div className="font-medium">
                        {currentDeveloper.availability}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowMatch(false)}
                    >
                      Keep Browsing
                    </Button>

                    <Button
                      className="flex-1"
                      onClick={() => navigate("/chat")}
                    >
                      Start Chat
                    </Button>
                  </div>
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
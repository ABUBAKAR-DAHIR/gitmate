import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Code2,
  Edit2,
  ExternalLink,
  GitBranch,
  MapPin,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProfileData {
  id: string;
  bio: string | null;
  experience:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";
  skills: string;
  goals: string;
  availability: string;
  timezone: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  profile: ProfileData;
  user: User;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const parseItems = (
  value: string | null | undefined,
) => {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const formatExperience = (
  experience: string,
) => {
  return (
    experience.charAt(0) +
    experience
      .slice(1)
      .toLowerCase()
  );
};

const formatJoinedDate = (
  date: string,
) => {
  return new Date(
    date,
  ).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );
};

const Profile = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useQuery<ProfileResponse>({
    queryKey: ["profile"],

    queryFn: async () => {
      const response =
        await api.get<ProfileResponse>(
          "/profile",
        );

      return response.data;
    },
  });

  const user = data?.user;

  const profile = data?.profile;

  const skills = useMemo(
    () =>
      parseItems(
        profile?.skills,
      ),
    [profile?.skills],
  );

  const goals = useMemo(
    () =>
      parseItems(
        profile?.goals,
      ),
    [profile?.goals],
  );

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-32 bg-muted" />

            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
                <div className="w-32 h-32 rounded-full bg-muted border-4 border-card" />

                <div className="flex-1 space-y-3">
                  <div className="h-7 w-48 rounded bg-muted" />

                  <div className="h-4 w-32 rounded bg-muted" />
                </div>
              </div>

              <div className="h-4 max-w-2xl mt-6 rounded bg-muted" />

              <div className="h-4 w-72 mt-3 rounded bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="h-28 bg-card border border-border/50 rounded-xl animate-pulse"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="h-72 bg-card border border-border/50 rounded-xl animate-pulse" />

            <div className="lg:col-span-2 h-96 bg-card border border-border/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (
    isError ||
    !data?.success ||
    !user ||
    !profile
  ) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-card border border-destructive/30 rounded-2xl p-10 text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Unable to load profile
            </h1>

            <p className="text-sm text-muted-foreground mt-2">
              We could not retrieve your
              profile information.
            </p>

            <Button
              className="mt-6"
              onClick={() =>
                navigate("/profile/edit")
              }
            >
              Create Profile
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-card border border-border/50 rounded-2xl overflow-hidden"
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5" />

          {/* Profile Information */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
              <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                <AvatarImage
                  src={
                    user.image ??
                    undefined
                  }
                  alt={user.name}
                />

                <AvatarFallback className="text-3xl">
                  {getInitials(
                    user.name,
                  )}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {user.name}
                    </h1>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>
                        {formatExperience(
                          profile.experience,
                        )} Developer
                      </span>

                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync GitHub
                    </Button>

                    <Button
                      variant="subtle"
                      size="sm"
                      onClick={() =>
                        navigate(
                          "/profile/edit",
                        )
                      }
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-muted-foreground max-w-2xl">
              {profile.bio ||
                "No biography has been added yet."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />

                {profile.timezone}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />

                Joined{" "}
                {formatJoinedDate(
                  user.createdAt,
                )}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
        >
          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <GitBranch className="w-5 h-5 text-primary mx-auto mb-2" />

            <p className="text-2xl font-bold font-mono text-foreground">
              —
            </p>

            <p className="text-xs text-muted-foreground">
              Repositories
            </p>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <Code2 className="w-5 h-5 text-success mx-auto mb-2" />

            <p className="text-2xl font-bold font-mono text-foreground">
              —
            </p>

            <p className="text-xs text-muted-foreground">
              Commits
            </p>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <Star className="w-5 h-5 text-warning mx-auto mb-2" />

            <p className="text-2xl font-bold font-mono text-foreground">
              —
            </p>

            <p className="text-xs text-muted-foreground">
              Stars
            </p>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <GitBranch className="w-5 h-5 text-info mx-auto mb-2" />

            <p className="text-2xl font-bold font-mono text-foreground">
              —
            </p>

            <p className="text-xs text-muted-foreground">
              Contributions
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Experience */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Experience
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground">
                      Developer Level
                    </span>

                    <span className="text-muted-foreground font-mono">
                      {formatExperience(
                        profile.experience,
                      )}
                    </span>
                  </div>

                  <Progress
                    value={
                      profile.experience ===
                      "BEGINNER"
                        ? 33
                        : profile.experience ===
                            "INTERMEDIATE"
                          ? 66
                          : 100
                    }
                    className="h-2"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Availability
                  </p>

                  <p className="text-sm text-foreground mt-1">
                    {
                      profile.availability
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Skills and Goals */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Skills
              </h3>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map(
                    (skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/30"
                      >
                        {skill}
                      </Badge>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills added yet.
                </p>
              )}

              <h3 className="font-semibold text-foreground mb-3 mt-6">
                Goals
              </h3>

              {goals.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {goals.map(
                    (goal) => (
                      <Badge
                        key={goal}
                        variant="outline"
                        className="font-mono text-xs"
                      >
                        {goal}
                      </Badge>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No goals added yet.
                </p>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Repositories */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Featured Repositories
              </h3>

              <div className="py-10 text-center">
                <GitBranch className="w-8 h-8 text-muted-foreground mx-auto mb-3" />

                <p className="text-sm font-medium text-foreground">
                  GitHub data is not synced
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  Connect GitHub to display
                  repositories and activity.
                </p>
              </div>
            </motion.div>

            {/* Current Collaborations */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Current Collaborations
              </h3>

              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-primary" />
                </div>

                <p className="text-sm font-medium text-foreground">
                  No active collaborations
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  Your active projects will
                  appear here.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
import { motion } from "framer-motion";
import { GitBranch, Star, Code2, MapPin, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Developer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  topLanguages: string[];
  repoCount: number;
  stars: number;
  interests: string[];
}

interface DeveloperCardProps {
  developer: Developer;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  style?: React.CSSProperties;
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  JavaScript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Python: "bg-green-500/20 text-green-400 border-green-500/30",
  Rust: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Go: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Java: "bg-red-500/20 text-red-400 border-red-500/30",
  "C++": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Ruby: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  default: "bg-muted text-muted-foreground border-border",
};

export const DeveloperCard = ({ developer, className, style }: DeveloperCardProps) => {
  return (
    <motion.div
      className={cn(
        "w-full max-w-sm bg-card border border-border/50 rounded-2xl overflow-hidden shadow-glow",
        className
      )}
      style={style}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header with gradient */}
      <div className="relative h-24 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="absolute -top-12 left-6">
          <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
            <AvatarImage src={developer.avatar} alt={developer.name} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {developer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Info */}
        <div className="pt-14">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{developer.name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-sm">@{developer.username}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>

          {developer.location && (
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {developer.location}
            </div>
          )}

          {developer.bio && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{developer.bio}</p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-sm">
              <GitBranch className="w-4 h-4 text-primary" />
              <span className="font-mono text-foreground">{developer.repoCount}</span>
              <span className="text-muted-foreground">repos</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="w-4 h-4 text-warning" />
              <span className="font-mono text-foreground">{developer.stars}</span>
              <span className="text-muted-foreground">stars</span>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-4">
            <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
              <Code2 className="w-3 h-3" />
              Top Languages
            </div>
            <div className="flex flex-wrap gap-2">
              {developer.topLanguages.slice(0, 4).map((lang) => (
                <Badge
                  key={lang}
                  variant="outline"
                  className={cn(
                    "text-xs font-mono",
                    languageColors[lang] || languageColors.default
                  )}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-2">Interests</div>
            <div className="flex flex-wrap gap-2">
              {developer.interests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-1 text-xs bg-secondary rounded-md text-secondary-foreground"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

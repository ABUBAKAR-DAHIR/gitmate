import { motion } from "framer-motion";
import { Github, Bell, Palette, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AppLayout } from "@/components/layout/AppLayout";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Developer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
  username: "developer",
};

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <AppLayout user={mockUser}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </motion.div>

        <div className="space-y-6">
          {/* GitHub Connection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">GitHub Connection</h3>
                <p className="text-sm text-muted-foreground">Manage your GitHub authentication</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Connected as @{mockUser.username}</p>
                  <p className="text-xs text-muted-foreground">Last synced: 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Re-authenticate</Button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Configure how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="matches" className="text-foreground">New Matches</Label>
                  <p className="text-xs text-muted-foreground">Get notified when someone wants to connect</p>
                </div>
                <Switch id="matches" defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="messages" className="text-foreground">Messages</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications for new messages</p>
                </div>
                <Switch id="messages" defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="projects" className="text-foreground">Project Updates</Label>
                  <p className="text-xs text-muted-foreground">Get updates about your projects</p>
                </div>
                <Switch id="projects" defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly" className="text-foreground">Weekly Digest</Label>
                  <p className="text-xs text-muted-foreground">Receive a weekly summary of activity</p>
                </div>
                <Switch id="weekly" />
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Appearance</h3>
                <p className="text-sm text-muted-foreground">Customize your visual experience</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-primary/10 border-2 border-primary rounded-xl text-center transition-all">
                <div className="w-full h-12 rounded-lg bg-background mb-3 border border-border" />
                <span className="text-sm font-medium text-foreground">Dark</span>
              </button>
              <button className="p-4 bg-secondary border-2 border-border/50 rounded-xl text-center transition-all hover:border-primary/30">
                <div className="w-full h-12 rounded-lg bg-muted mb-3" />
                <span className="text-sm font-medium text-muted-foreground">Light</span>
              </button>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Privacy</h3>
                <p className="text-sm text-muted-foreground">Control your data and visibility</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visible" className="text-foreground">Profile Visibility</Label>
                  <p className="text-xs text-muted-foreground">Allow others to discover your profile</p>
                </div>
                <Switch id="profile-visible" defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-activity" className="text-foreground">Show Activity</Label>
                  <p className="text-xs text-muted-foreground">Display your recent GitHub activity</p>
                </div>
                <Switch id="show-activity" defaultChecked />
              </div>
            </div>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;

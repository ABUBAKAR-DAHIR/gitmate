import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Code2, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const mockUser = {
  name: "Developer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=developer",
  username: "developer",
};

const mockConversations = [
  {
    id: "1",
    user: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", online: true },
    lastMessage: "That sounds like a great idea! Let me check the repo.",
    timestamp: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    user: { name: "Alex Kim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", online: false },
    lastMessage: "I've pushed the changes to the feature branch.",
    timestamp: "1h ago",
    unread: 0,
  },
  {
    id: "3",
    user: { name: "Jordan Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan", online: true },
    lastMessage: "The ML model is ready for integration.",
    timestamp: "3h ago",
    unread: 0,
  },
];

const mockMessages = [
  { id: "1", sender: "them", content: "Hey! I saw your project and I'm really interested in collaborating.", timestamp: "10:30 AM" },
  { id: "2", sender: "me", content: "That's awesome! Which part of the project caught your attention?", timestamp: "10:32 AM" },
  { id: "3", sender: "them", content: "The backend architecture looks really clean. I'd love to contribute to the API layer.", timestamp: "10:35 AM" },
  { id: "4", sender: "me", content: "Perfect! We definitely need help with that. Here's the current structure:", timestamp: "10:37 AM" },
  { id: "5", sender: "me", content: "```typescript\ninterface APIConfig {\n  baseUrl: string;\n  timeout: number;\n  retries: number;\n}\n```", timestamp: "10:38 AM", isCode: true },
  { id: "6", sender: "them", content: "That sounds like a great idea! Let me check the repo.", timestamp: "10:40 AM" },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(mockConversations[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: "me",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setMessage("");
  };

  return (
    <AppLayout user={mockUser}>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border bg-card flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          {/* Conversations List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {mockConversations.map((conv) => (
                <motion.button
                  key={conv.id}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
                    selectedChat.id === conv.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-secondary/50"
                  )}
                  onClick={() => setSelectedChat(conv)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                      <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conv.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{conv.user.name}</span>
                      <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                <AvatarFallback>{selectedChat.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-foreground">{selectedChat.user.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedChat.user.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    )}
                  >
                    {msg.isCode ? (
                      <pre className="text-sm font-mono bg-background/20 rounded-lg p-3 overflow-x-auto">
                        <code>{msg.content.replace(/```\w*\n?/g, "").trim()}</code>
                      </pre>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                    <p
                      className={cn(
                        "text-xs mt-1",
                        msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Code2 className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-secondary/50 border-border/50"
              />
              <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;

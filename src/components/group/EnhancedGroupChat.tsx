
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Paperclip, Image, Smile, Phone, Video, Search, MoreVertical, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'ai' | 'system';
  attachments?: string[];
  reactions?: { emoji: string; users: string[] }[];
}

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface EnhancedGroupChatProps {
  group: StudyGroup;
}

export const EnhancedGroupChat = ({ group }: EnhancedGroupChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      senderId: "system",
      senderName: "System",
      content: "Welcome to the Advanced Mathematics study group chat! 🎓",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: "system"
    },
    {
      id: "2",
      senderId: "teacher1",
      senderName: "Dr. Sarah Johnson",
      content: "Hello everyone! Feel free to ask questions about today's integration lesson here. I'll be monitoring throughout the day.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      type: "user"
    },
    {
      id: "3",
      senderId: "student1",
      senderName: "Alex Chen",
      content: "Hi Dr. Johnson! I'm having trouble with integration by parts. Could you explain when to use which part as 'u' and which as 'dv'?",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: "user"
    },
    {
      id: "4",
      senderId: "ai-tutor",
      senderName: "AI Study Assistant",
      content: "Great question, Alex! For integration by parts (∫u dv = uv - ∫v du), here's a helpful acronym: LIATE\n\nL - Logarithmic functions\nI - Inverse trig functions  \nA - Algebraic functions\nT - Trigonometric functions\nE - Exponential functions\n\nChoose 'u' from whichever comes first in this list. For example, in ∫x ln(x) dx, choose u = ln(x) and dv = x dx.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: "ai"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: "current-user",
        senderName: "You",
        content: newMessage,
        timestamp: new Date(),
        type: "user"
      };

      setMessages(prev => [...prev, message]);
      setNewMessage("");

      // Simulate AI response for math questions
      if (newMessage.toLowerCase().includes("help") || newMessage.includes("?")) {
        setIsTyping(true);
        setTimeout(() => {
          const aiResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            senderId: "ai-tutor",
            senderName: "AI Study Assistant",
            content: "I'd be happy to help! Could you provide more details about what specific concept you're struggling with? I can break it down step by step for you.",
            timestamp: new Date(),
            type: "ai"
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsTyping(false);
        }, 2000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredMessages = messages.filter(message =>
    searchQuery === "" || message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Enhanced Chat Header */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="md:hidden">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-teal-100 text-teal-700">
                {getInitials(group.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{group.name}</h2>
              <p className="text-sm text-slate-600">
                25 members • 3 online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="hidden sm:flex"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="mt-3">
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Enhanced Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {filteredMessages.map((message, index) => {
            const isCurrentUser = message.senderId === "current-user";
            const showAvatar = !isCurrentUser && (index === 0 || filteredMessages[index - 1].senderId !== message.senderId);

            return (
              <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                  {/* Avatar */}
                  {showAvatar && !isCurrentUser && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      {message.type === "ai" ? (
                        <div className="bg-teal-100 w-full h-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-teal-600" />
                        </div>
                      ) : message.type === "system" ? (
                        <div className="bg-slate-100 w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        </div>
                      ) : (
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {getInitials(message.senderName)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}

                  {/* Message Bubble */}
                  <div className={`space-y-1 ${!showAvatar && !isCurrentUser ? "ml-10" : ""}`}>
                    {/* Sender Name & Time */}
                    {showAvatar && !isCurrentUser && message.type !== "system" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-slate-700">
                          {message.senderName}
                        </span>
                        {message.type === "ai" && (
                          <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                            AI
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Message Content */}
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.type === "system" 
                        ? "bg-slate-100 text-slate-600 text-center text-sm mx-auto"
                        : isCurrentUser
                        ? "bg-teal-600 text-white"
                        : message.type === "ai"
                        ? "bg-teal-50 text-slate-900 border border-teal-200"
                        : "bg-slate-100 text-slate-900"
                    }`}>
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                    </div>

                    {/* Timestamp */}
                    <div className={`text-xs text-slate-500 ${isCurrentUser ? "text-right" : "text-left"}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end space-x-2">
              <Avatar className="h-8 w-8">
                <div className="bg-teal-100 w-full h-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-teal-600" />
                </div>
              </Avatar>
              <div className="bg-slate-100 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Enhanced Message Input */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600 mb-2">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600 mb-2">
            <Image className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12 py-3 rounded-full border-slate-300 focus:border-teal-500"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-teal-600 hover:bg-teal-700 rounded-full p-3"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-xs text-slate-500 text-center">
            💡 Ask the AI tutor for help with math problems, explanations, or study tips!
          </p>
        </div>
      </div>
    </div>
  );
};

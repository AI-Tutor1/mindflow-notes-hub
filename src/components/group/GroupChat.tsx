
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Paperclip, Image, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'ai' | 'system';
  attachments?: string[];
}

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface GroupChatProps {
  group: StudyGroup;
}

export const GroupChat = ({ group }: GroupChatProps) => {
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
    },
    {
      id: "5",
      senderId: "student2",
      senderName: "Emma Rodriguez",
      content: "That's super helpful! The LIATE rule makes so much sense now. Thank you AI tutor! 🙌",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: "user"
    },
    {
      id: "6",
      senderId: "student3",
      senderName: "James Wilson",
      content: "Quick question - for the homework due tomorrow, are we supposed to show all steps for problem 7?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "user"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "ai":
        return <Bot className="w-4 h-4" />;
      case "system":
        return null;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const shouldShowDateDivider = (currentMessage: ChatMessage, previousMessage?: ChatMessage) => {
    if (!previousMessage) return true;
    return currentMessage.timestamp.toDateString() !== previousMessage.timestamp.toDateString();
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Group Chat</h2>
            <p className="text-sm text-slate-600">
              {messages.filter(m => m.type === "user").length} messages • AI tutor available
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((message, index) => {
          const previousMessage = index > 0 ? messages[index - 1] : undefined;
          const showDateDivider = shouldShowDateDivider(message, previousMessage);

          return (
            <div key={message.id}>
              {/* Date Divider */}
              {showDateDivider && (
                <div className="flex items-center justify-center my-4">
                  <div className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full">
                    {formatDate(message.timestamp)}
                  </div>
                </div>
              )}

              {/* Message */}
              <div className={`flex items-start space-x-3 ${
                message.senderId === "current-user" ? "flex-row-reverse space-x-reverse" : ""
              }`}>
                {/* Avatar */}
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
                    <AvatarFallback className={
                      message.senderId === "current-user" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-100 text-gray-700"
                    }>
                      {getInitials(message.senderName)}
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* Message Content */}
                <div className={`flex-1 max-w-xs sm:max-w-md ${
                  message.senderId === "current-user" ? "text-right" : ""
                }`}>
                  {/* Sender Name & Time */}
                  {message.type !== "system" && (
                    <div className={`flex items-center space-x-2 mb-1 ${
                      message.senderId === "current-user" ? "justify-end" : ""
                    }`}>
                      <span className="text-xs font-medium text-slate-700">
                        {message.senderName}
                      </span>
                      {message.type === "ai" && (
                        <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                          AI Assistant
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`rounded-lg p-3 ${
                    message.type === "system" 
                      ? "bg-slate-100 text-slate-600 text-center text-sm"
                      : message.senderId === "current-user"
                      ? "bg-blue-600 text-white"
                      : message.type === "ai"
                      ? "bg-teal-50 text-slate-900 border border-teal-200"
                      : "bg-white text-slate-900 border border-slate-200"
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <div className="bg-teal-100 w-full h-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-teal-600" />
              </div>
            </Avatar>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
            <Image className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-xs text-slate-500">
            💡 Ask the AI tutor for help with math problems, explanations, or study tips!
          </p>
        </div>
      </div>
    </div>
  );
};

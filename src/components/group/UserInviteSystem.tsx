
import { useState } from "react";
import { Mail, UserPlus, Search, X, Send, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface UserInviteSystemProps {
  groupName: string;
  groupId: string;
}

export const UserInviteSystem = ({ groupName, groupId }: UserInviteSystemProps) => {
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [inviteMessage, setInviteMessage] = useState(
    `Hi! I'd like to invite you to join our study group "${groupName}". We collaborate on assignments, share resources, and help each other learn. Hope you can join us!`
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [inviteLink, setInviteLink] = useState(`https://studygroups.app/invite/${groupId}`);
  const [linkCopied, setLinkCopied] = useState(false);

  const [users] = useState([
    { id: "1", name: "Sarah Wilson", email: "sarah.wilson@email.com", avatar: "SW", status: "online" },
    { id: "2", name: "Michael Chen", email: "m.chen@email.com", avatar: "MC", status: "offline" },
    { id: "3", name: "Emily Rodriguez", email: "emily.r@email.com", avatar: "ER", status: "online" },
    { id: "4", name: "David Kim", email: "david.kim@email.com", avatar: "DK", status: "away" },
    { id: "5", name: "Lisa Johnson", email: "lisa.j@email.com", avatar: "LJ", status: "online" }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmail = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && emailInput.trim()) {
      const email = emailInput.trim();
      if (email.includes("@") && !inviteEmails.includes(email)) {
        setInviteEmails([...inviteEmails, email]);
        setEmailInput("");
      }
    }
  };

  const removeEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(e => e !== email));
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSendInvites = () => {
    // Handle sending invites
    console.log("Sending invites to:", { emails: inviteEmails, users: selectedUsers, message: inviteMessage });
    setOpen(false);
    // Reset form
    setInviteEmails([]);
    setSelectedUsers([]);
    setEmailInput("");
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Invite Members to {groupName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email Invite</TabsTrigger>
            <TabsTrigger value="users">Find Users</TabsTrigger>
            <TabsTrigger value="link">Share Link</TabsTrigger>
          </TabsList>

          {/* Email Invite Tab */}
          <TabsContent value="email" className="space-y-4">
            <div>
              <Label htmlFor="email-input">Email Addresses</Label>
              <Input
                id="email-input"
                placeholder="Enter email address and press Enter"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={handleAddEmail}
              />
              <p className="text-xs text-slate-500 mt-1">
                Press Enter after each email address
              </p>
            </div>

            {inviteEmails.length > 0 && (
              <div>
                <Label>Email Recipients ({inviteEmails.length})</Label>
                <div className="mt-2 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {inviteEmails.map((email) => (
                    <Badge key={email} variant="secondary" className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {email}
                      <button onClick={() => removeEmail(email)} className="ml-1 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="invite-message">Personal Message</Label>
              <Textarea
                id="invite-message"
                placeholder="Add a personal message to your invitation..."
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSendInvites}
                disabled={inviteEmails.length === 0}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Invites ({inviteEmails.length})
              </Button>
            </div>
          </TabsContent>

          {/* Find Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div>
              <Label htmlFor="user-search">Search Users</Label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  id="user-search"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  className={`cursor-pointer transition-colors ${
                    selectedUsers.includes(user.id)
                      ? "bg-teal-50 border-teal-200"
                      : "hover:bg-slate-50"
                  }`}
                  onClick={() => toggleUserSelection(user.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                      </div>
                      {selectedUsers.includes(user.id) && (
                        <Check className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedUsers.length > 0 && (
              <>
                <Separator />
                <div>
                  <Label>Selected Users ({selectedUsers.length})</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedUsers.map((userId) => {
                      const user = users.find(u => u.id === userId);
                      return user ? (
                        <Badge key={userId} variant="secondary" className="flex items-center gap-1">
                          {user.name}
                          <button onClick={() => toggleUserSelection(userId)} className="ml-1 hover:text-red-600">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="user-message">Personal Message</Label>
                  <Textarea
                    id="user-message"
                    placeholder="Add a personal message to your invitation..."
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSendInvites}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Invites ({selectedUsers.length})
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          {/* Share Link Tab */}
          <TabsContent value="link" className="space-y-4">
            <div>
              <Label>Invite Link</Label>
              <p className="text-sm text-slate-600 mb-3">
                Anyone with this link can join your study group
              </p>
              <div className="flex gap-2">
                <Input value={inviteLink} readOnly className="flex-1" />
                <Button
                  onClick={copyInviteLink}
                  variant="outline"
                  className={linkCopied ? "text-green-600" : ""}
                >
                  {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              {linkCopied && (
                <p className="text-sm text-green-600 mt-1">Link copied to clipboard!</p>
              )}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Share Options</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    📱 SMS
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    📘 Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    🐦 Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label>Link Settings</Label>
              <Card className="mt-2">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Expire Link</p>
                      <p className="text-sm text-slate-600">Automatically disable after 7 days</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Require Approval</p>
                      <p className="text-sm text-slate-600">Review requests before adding members</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

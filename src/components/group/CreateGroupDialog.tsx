
import { useState } from "react";
import { Plus, Users, Mail, Upload, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface CreateGroupDialogProps {
  onCreateGroup: (groupData: any) => void;
}

export const CreateGroupDialog = ({ onCreateGroup }: CreateGroupDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [groupData, setGroupData] = useState({
    name: "",
    subject: "",
    grade: "",
    description: "",
    isPrivate: false,
    allowStudentInvites: true,
    maxMembers: 50
  });
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [searchResults, setSearchResults] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", avatar: "JD" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "JS" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", avatar: "MJ" }
  ]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", 
    "History", "Geography", "Computer Science", "Art", "Music"
  ];

  const grades = [
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", 
    "Grade 11", "Grade 12", "University", "Graduate"
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

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

  const handleCreateGroup = () => {
    const newGroup = {
      ...groupData,
      invitedEmails: inviteEmails,
      invitedUsers: selectedUsers,
      createdAt: new Date(),
      id: Date.now().toString()
    };
    onCreateGroup(newGroup);
    setOpen(false);
    setStep(1);
    setGroupData({
      name: "",
      subject: "",
      grade: "",
      description: "",
      isPrivate: false,
      allowStudentInvites: true,
      maxMembers: 50
    });
    setInviteEmails([]);
    setSelectedUsers([]);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return groupData.name && groupData.subject && groupData.grade;
      case 2:
        return true; // Settings are optional
      case 3:
        return true; // Invites are optional
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Create Study Group
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum 
                  ? "bg-teal-600 text-white" 
                  : "bg-slate-200 text-slate-600"
              }`}>
                {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNum ? "bg-teal-600" : "bg-slate-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <p className="text-sm text-slate-600">Set up your study group details</p>
            </div>

            <div>
              <Label htmlFor="group-name">Group Name *</Label>
              <Input
                id="group-name"
                placeholder="e.g., Advanced Mathematics"
                value={groupData.name}
                onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select value={groupData.subject} onValueChange={(value) => setGroupData({ ...groupData, subject: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="grade">Grade Level *</Label>
                <Select value={groupData.grade} onValueChange={(value) => setGroupData({ ...groupData, grade: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose and goals of this study group..."
                value={groupData.description}
                onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label>Group Avatar</Label>
              <div className="mt-2 flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-lg">
                    {groupData.name ? groupData.name.charAt(0).toUpperCase() : "G"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Group Settings */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Group Settings</h3>
              <p className="text-sm text-slate-600">Configure privacy and permissions</p>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Private Group</h4>
                    <p className="text-sm text-slate-600">Only invited members can join</p>
                  </div>
                  <Button
                    variant={groupData.isPrivate ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGroupData({ ...groupData, isPrivate: !groupData.isPrivate })}
                  >
                    {groupData.isPrivate ? "Private" : "Public"}
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Student Invites</h4>
                    <p className="text-sm text-slate-600">Allow students to invite others</p>
                  </div>
                  <Button
                    variant={groupData.allowStudentInvites ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGroupData({ ...groupData, allowStudentInvites: !groupData.allowStudentInvites })}
                  >
                    {groupData.allowStudentInvites ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="max-members">Maximum Members</Label>
                  <Select value={groupData.maxMembers.toString()} onValueChange={(value) => setGroupData({ ...groupData, maxMembers: parseInt(value) })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25 members</SelectItem>
                      <SelectItem value="50">50 members</SelectItem>
                      <SelectItem value="100">100 members</SelectItem>
                      <SelectItem value="200">200 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Invite Members */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Invite Members</h3>
              <p className="text-sm text-slate-600">Add people to your study group</p>
            </div>

            {/* Email Invites */}
            <div>
              <Label htmlFor="email-invites">Invite by Email</Label>
              <Input
                id="email-invites"
                placeholder="Enter email address and press Enter"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={handleAddEmail}
              />
              <p className="text-xs text-slate-500 mt-1">Press Enter to add each email</p>
              
              {inviteEmails.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {inviteEmails.map((email) => (
                    <Badge key={email} variant="secondary" className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {email}
                      <button onClick={() => removeEmail(email)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* User Search */}
            <div>
              <Label htmlFor="user-search">Search Users</Label>
              <Input
                id="user-search"
                placeholder="Search by name or email..."
                className="mb-3"
              />
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                      selectedUsers.includes(user.id)
                        ? "bg-teal-50 border-teal-200"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                    onClick={() => toggleUserSelection(user.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-slate-600">{user.email}</p>
                      </div>
                    </div>
                    {selectedUsers.includes(user.id) && (
                      <Check className="w-4 h-4 text-teal-600" />
                    )}
                  </div>
                ))}
              </div>

              {selectedUsers.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Selected ({selectedUsers.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUsers.map((userId) => {
                      const user = searchResults.find(u => u.id === userId);
                      return user ? (
                        <Badge key={userId} variant="secondary" className="flex items-center gap-1">
                          {user.name}
                          <button onClick={() => toggleUserSelection(userId)}>
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleCreateGroup}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Create Group
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

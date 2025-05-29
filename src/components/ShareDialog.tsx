
import { useState } from "react";
import { Share2, Link, Users, Globe, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  pageTitle: string;
  pageId: string;
}

export const ShareDialog = ({ pageTitle, pageId }: ShareDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [allowEditing, setAllowEditing] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [emailToShare, setEmailToShare] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();

  // Mock data for study groups
  const studyGroups = [
    { id: "1", name: "Advanced Mathematics", memberCount: 25 },
    { id: "2", name: "Physics Study Circle", memberCount: 18 },
    { id: "3", name: "Chemistry Lab Partners", memberCount: 12 },
  ];

  const shareLink = `https://tuitional.ai/mindpages/${pageId}${isPublic ? '?public=true' : ''}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      toast({
        title: "Link copied",
        description: "Share link has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareToGroup = () => {
    if (!selectedGroup) return;
    
    const group = studyGroups.find(g => g.id === selectedGroup);
    toast({
      title: "Shared to group",
      description: `"${pageTitle}" has been shared with ${group?.name}`,
    });
    setSelectedGroup("");
  };

  const shareViaEmail = () => {
    if (!emailToShare) return;
    
    // In a real app, this would send an email invitation
    toast({
      title: "Invitation sent",
      description: `Share invitation sent to ${emailToShare}`,
    });
    setEmailToShare("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share "{pageTitle}"</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link" className="flex items-center space-x-2">
              <Link className="w-4 h-4" />
              <span>Link</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Groups</span>
            </TabsTrigger>
            <TabsTrigger value="public" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Public</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Share via Email</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  placeholder="Enter email address..."
                  value={emailToShare}
                  onChange={(e) => setEmailToShare(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={shareViaEmail}
                  disabled={!emailToShare}
                >
                  Send
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Share Link</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-slate-50"
                />
                <Button onClick={copyToClipboard} variant="outline">
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-comments" className="text-sm font-medium">
                  Allow comments
                </Label>
                <Switch
                  id="allow-comments"
                  checked={allowComments}
                  onCheckedChange={setAllowComments}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-editing" className="text-sm font-medium">
                  Allow editing
                </Label>
                <Switch
                  id="allow-editing"
                  checked={allowEditing}
                  onCheckedChange={setAllowEditing}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Share with Study Group</Label>
              <div className="flex space-x-2 mt-2">
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a study group..." />
                  </SelectTrigger>
                  <SelectContent>
                    {studyGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{group.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {group.memberCount} members
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={shareToGroup}
                  disabled={!selectedGroup}
                >
                  Share
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Available Groups</Label>
              <div className="space-y-2">
                {studyGroups.map((group) => (
                  <div 
                    key={group.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-sm">{group.name}</p>
                        <p className="text-xs text-slate-500">{group.memberCount} members</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedGroup(group.id);
                        shareToGroup();
                      }}
                    >
                      Share
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="public" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Make this page public</Label>
                <p className="text-xs text-slate-500 mt-1">
                  Anyone with the link can view this page
                </p>
              </div>
              <Switch
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            {isPublic && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Globe className="w-4 h-4" />
                    <span className="font-medium">Public Access Enabled</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    This page is now publicly accessible. Anyone with the link can view it.
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Public Link</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      value={shareLink}
                      readOnly
                      className="flex-1 bg-slate-50"
                    />
                    <Button onClick={copyToClipboard} variant="outline">
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

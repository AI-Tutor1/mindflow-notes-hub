
import { useState } from "react";
import { Search, MoreVertical, UserPlus, Mail, Crown, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'teacher' | 'admin';
  joinedDate: Date;
  lastActive: Date;
  performance?: {
    avgScore: number;
    completedAssignments: number;
    participationScore: number;
  };
}

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface GroupMembersProps {
  group: StudyGroup;
}

export const GroupMembers = ({ group }: GroupMembersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [members] = useState<GroupMember[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@school.edu",
      avatar: undefined,
      role: "teacher",
      joinedDate: new Date("2024-01-15"),
      lastActive: new Date(),
      performance: { avgScore: 95, completedAssignments: 12, participationScore: 98 }
    },
    {
      id: "2",
      name: "Alex Chen",
      email: "alex.chen@student.edu",
      avatar: undefined,
      role: "admin",
      joinedDate: new Date("2024-01-20"),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      performance: { avgScore: 92, completedAssignments: 11, participationScore: 95 }
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      email: "emma.rodriguez@student.edu",
      avatar: undefined,
      role: "student",
      joinedDate: new Date("2024-01-22"),
      lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000),
      performance: { avgScore: 88, completedAssignments: 10, participationScore: 87 }
    },
    {
      id: "4",
      name: "James Wilson",
      email: "james.wilson@student.edu",
      avatar: undefined,
      role: "student",
      joinedDate: new Date("2024-01-25"),
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      performance: { avgScore: 85, completedAssignments: 9, participationScore: 82 }
    },
    {
      id: "5",
      name: "Sophie Kim",
      email: "sophie.kim@student.edu",
      avatar: undefined,
      role: "student",
      joinedDate: new Date("2024-02-01"),
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      performance: { avgScore: 90, completedAssignments: 8, participationScore: 91 }
    }
  ]);

  const isTeacher = group.role === "teacher" || group.role === "admin";

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "teacher":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        {isTeacher && (
          <Button className="bg-teal-600 hover:bg-teal-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Members
          </Button>
        )}
      </div>

      {/* Members Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">{members.length}</div>
            <p className="text-sm text-slate-600">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">
              {members.filter(m => m.role === "student").length}
            </div>
            <p className="text-sm text-slate-600">Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">
              {members.filter(m => {
                const diff = new Date().getTime() - m.lastActive.getTime();
                return diff < 24 * 60 * 60 * 1000; // Active in last 24h
              }).length}
            </div>
            <p className="text-sm text-slate-600">Active Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Group Members ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                {isTeacher && <TableHead>Performance</TableHead>}
                {isTeacher && <TableHead className="w-[50px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-teal-100 text-teal-700">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">{member.name}</p>
                        <p className="text-sm text-slate-500">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(member.role)}>
                      {member.role === "teacher" && <Crown className="w-3 h-3 mr-1" />}
                      {member.role === "admin" && <Crown className="w-3 h-3 mr-1" />}
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {member.joinedDate.toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {formatLastActive(member.lastActive)}
                    </span>
                  </TableCell>
                  {isTeacher && member.performance && (
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>Avg: {member.performance.avgScore}%</div>
                        <div className="text-xs text-slate-500">
                          {member.performance.completedAssignments} assignments
                        </div>
                      </div>
                    </TableCell>
                  )}
                  {isTeacher && (
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

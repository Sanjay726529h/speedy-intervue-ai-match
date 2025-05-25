
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building, UserCheck, Activity, Settings, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const platformStats = [
    { label: "Total Users", value: "12,847", change: "+8.2%", color: "blue" },
    { label: "Active Companies", value: "342", change: "+12.5%", color: "green" },
    { label: "Interviews Today", value: "89", change: "+5.3%", color: "purple" },
    { label: "System Uptime", value: "99.9%", change: "Stable", color: "orange" },
  ];

  const recentActivity = [
    { action: "New company registration", entity: "TechStart Inc.", time: "2 min ago", type: "company" },
    { action: "Interview completed", entity: "John Smith → DataCorp", time: "5 min ago", type: "interview" },
    { action: "Bulk resume upload", entity: "AI Solutions (47 resumes)", time: "12 min ago", type: "upload" },
    { action: "System maintenance", entity: "AI Engine update", time: "1 hour ago", type: "system" },
  ];

  const userManagement = [
    { name: "TechCorp Inc.", type: "Company", status: "Active", users: 12, joined: "2024-01-15" },
    { name: "Sarah Chen", type: "Interviewer", status: "Active", rating: 4.8, joined: "2024-02-20" },
    { name: "StartupXYZ", type: "Company", status: "Pending", users: 3, joined: "2024-03-10" },
    { name: "Mike Johnson", type: "Candidate", status: "Active", interviews: 8, joined: "2024-02-28" },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Platform Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border-${stat.color}-200`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium text-${stat.color}-700`}>{stat.label}</CardTitle>
                <Activity className={`h-4 w-4 text-${stat.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</div>
                <p className={`text-xs text-${stat.color}-600 mt-1`}>{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Controls */}
        <Card>
          <CardHeader>
            <CardTitle>System Controls</CardTitle>
            <CardDescription>Manage platform-wide settings and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200">
                <Users className="h-6 w-6" />
                <span>User Management</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-accent-50 hover:bg-accent-100 text-accent-700 border-accent-200">
                <Settings className="h-6 w-6" />
                <span>System Settings</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200">
                <Activity className="h-6 w-6" />
                <span>System Health</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
            <CardDescription>Real-time monitoring of system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{activity.action}</h4>
                    <p className="text-sm text-slate-600">{activity.entity}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-sm text-slate-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Review and manage platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userManagement.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{user.name}</h4>
                    <p className="text-sm text-slate-600">
                      {user.type} • Joined {user.joined}
                      {user.users && ` • ${user.users} users`}
                      {user.rating && ` • ${user.rating}★ rating`}
                      {user.interviews && ` • ${user.interviews} interviews`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Interview Success Rates</CardTitle>
              <CardDescription>Weekly performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">AI Assessments</span>
                  <span className="text-sm text-slate-600">92% completion</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Human Interviews</span>
                  <span className="text-sm text-slate-600">87% completion</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Mock Interviews</span>
                  <span className="text-sm text-slate-600">95% completion</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Technical metrics and health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Response Time</span>
                  <span className="text-sm text-green-600">1.2s avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">AI Processing</span>
                  <span className="text-sm text-green-600">0.8s avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Error Rate</span>
                  <span className="text-sm text-green-600">0.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;


import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Calendar, BarChart3, FileText, Brain, CheckCircle } from 'lucide-react';

const CandidateDashboard = () => {
  const mockInterviews = [
    { company: "TechCorp Inc.", role: "Senior React Developer", date: "Mar 15, 2024", status: "Scheduled", type: "AI Assessment" },
    { company: "StartupXYZ", role: "Full Stack Engineer", date: "Mar 12, 2024", status: "Completed", type: "Human Interview" },
    { company: "BigTech Co.", role: "Frontend Developer", date: "Mar 10, 2024", status: "Completed", type: "Mock Interview" },
  ];

  const skillScores = [
    { skill: "React.js", score: 92, improvement: "+8" },
    { skill: "JavaScript", score: 88, improvement: "+5" },
    { skill: "TypeScript", score: 85, improvement: "+12" },
    { skill: "Node.js", score: 78, improvement: "+3" },
  ];

  return (
    <DashboardLayout title="Candidate Dashboard">
      <div className="space-y-8">
        {/* Profile Completion */}
        <Card className="bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200">
          <CardHeader>
            <CardTitle className="text-accent-800">Complete Your Profile</CardTitle>
            <CardDescription className="text-accent-600">
              Improve your chances by completing all sections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-accent-700">Profile Completion</span>
                <span className="text-sm text-accent-600">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="border-accent-300 text-accent-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
                <Button size="sm" variant="outline" className="border-accent-300 text-accent-700">
                  Add Skills
                </Button>
                <Button size="sm" variant="outline" className="border-accent-300 text-accent-700">
                  Portfolio Links
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Interviews Taken</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">12</div>
              <p className="text-xs text-blue-600 mt-1">+3 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">83%</div>
              <p className="text-xs text-green-600 mt-1">Above average</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">AI Score</CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">89</div>
              <p className="text-xs text-purple-600 mt-1">Out of 100</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Mock Interviews</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">7</div>
              <p className="text-xs text-orange-600 mt-1">Practice sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Continue your interview preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200">
                <Brain className="h-6 w-6" />
                <span>Start Mock Interview</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-accent-50 hover:bg-accent-100 text-accent-700 border-accent-200">
                <FileText className="h-6 w-6" />
                <span>Upload Resume</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                <BarChart3 className="h-6 w-6" />
                <span>View Progress</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
            <CardDescription>Track your interview history and upcoming sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInterviews.map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{interview.company}</h4>
                    <p className="text-sm text-slate-600">{interview.role} • {interview.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-xs">
                      {interview.type}
                    </Badge>
                    <Badge variant={interview.status === "Scheduled" ? "default" : "secondary"}>
                      {interview.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      {interview.status === "Scheduled" ? "Join" : "View Report"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Assessment Progress</CardTitle>
            <CardDescription>Track your technical skill improvements over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillScores.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">{skill.skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-green-600">{skill.improvement}</span>
                      <span className="font-bold text-slate-900">{skill.score}%</span>
                    </div>
                  </div>
                  <Progress value={skill.score} className="h-2" />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button className="w-full" variant="outline">
                Take New Skill Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;

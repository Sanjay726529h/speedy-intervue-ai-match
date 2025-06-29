
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Users, Calendar, BarChart3, FileText, Star } from 'lucide-react';

const CompanyDashboard = () => {
  const mockCandidates = [
    { name: "John Smith", role: "Senior Frontend Developer", score: 92, status: "Interview Scheduled" },
    { name: "Sarah Chen", role: "Full Stack Engineer", score: 88, status: "AI Assessment Complete" },
    { name: "Mike Johnson", role: "DevOps Engineer", score: 85, status: "Resume Screening" },
    { name: "Lisa Wong", role: "Backend Developer", score: 90, status: "Human Interview" },
  ];

  const mockJobs = [
    { title: "Senior React Developer", applicants: 47, status: "Active", posted: "2 days ago" },
    { title: "Python Backend Engineer", applicants: 32, status: "Active", posted: "1 week ago" },
    { title: "DevOps Specialist", applicants: 18, status: "Paused", posted: "3 days ago" },
  ];

  return (
    <DashboardLayout title="Company Dashboard">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">234</div>
              <p className="text-xs text-blue-600 mt-1">+12% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Interviews Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">18</div>
              <p className="text-xs text-green-600 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">AI Assessments</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">156</div>
              <p className="text-xs text-purple-600 mt-1">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Avg. Score</CardTitle>
              <Star className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">87.5</div>
              <p className="text-xs text-orange-600 mt-1">Out of 100</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200">
                <Upload className="h-6 w-6" />
                <span>Upload Job Description</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-accent-50 hover:bg-accent-100 text-accent-700 border-accent-200">
                <Users className="h-6 w-6" />
                <span>Review Candidates</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                <Calendar className="h-6 w-6" />
                <span>Schedule Interviews</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Top Ranked Candidates</CardTitle>
            <CardDescription>AI-ranked candidates based on job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCandidates.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{candidate.name}</h4>
                    <p className="text-sm text-slate-600">{candidate.role}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{candidate.score}</div>
                      <div className="text-xs text-slate-500">AI Score</div>
                    </div>
                    <Badge variant={candidate.status === "Interview Scheduled" ? "default" : "secondary"}>
                      {candidate.status}
                    </Badge>
                    <Button size="sm" variant="outline">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Job Postings */}
        <Card>
          <CardHeader>
            <CardTitle>Active Job Postings</CardTitle>
            <CardDescription>Manage your current job openings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{job.title}</h4>
                    <p className="text-sm text-slate-600">{job.applicants} applicants • Posted {job.posted}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                      {job.status}
                    </Badge>
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;

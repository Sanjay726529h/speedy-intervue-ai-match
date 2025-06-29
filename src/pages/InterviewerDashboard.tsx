
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, Star, Video, FileText } from 'lucide-react';

const InterviewerDashboard = () => {
  const upcomingInterviews = [
    { 
      candidate: "John Smith", 
      company: "TechCorp Inc.", 
      role: "Senior React Developer", 
      time: "2:00 PM", 
      date: "Today",
      duration: "60 min"
    },
    { 
      candidate: "Sarah Chen", 
      company: "StartupXYZ", 
      role: "Full Stack Engineer", 
      time: "10:00 AM", 
      date: "Tomorrow",
      duration: "45 min"
    },
    { 
      candidate: "Mike Johnson", 
      company: "BigTech Co.", 
      role: "DevOps Engineer", 
      time: "3:30 PM", 
      date: "Mar 16",
      duration: "60 min"
    },
  ];

  const completedInterviews = [
    { candidate: "Lisa Wong", company: "DataCorp", role: "Backend Developer", date: "Mar 10", rating: 4.5, submitted: true },
    { candidate: "Tom Wilson", company: "AI Solutions", role: "ML Engineer", date: "Mar 9", rating: 4.2, submitted: true },
    { candidate: "Emma Davis", company: "CloudTech", role: "DevOps Engineer", date: "Mar 8", rating: 3.8, submitted: false },
  ];

  return (
    <DashboardLayout title="Interviewer Dashboard">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">8</div>
              <p className="text-xs text-blue-600 mt-1">Interviews scheduled</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Completed</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">47</div>
              <p className="text-xs text-green-600 mt-1">Total interviews</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Avg. Rating</CardTitle>
              <Star className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">4.3</div>
              <p className="text-xs text-purple-600 mt-1">From companies</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Hours</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">32</div>
              <p className="text-xs text-orange-600 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200">
          <CardHeader>
            <CardTitle className="text-accent-800">Today's Schedule</CardTitle>
            <CardDescription className="text-accent-600">
              Your upcoming interviews for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.filter(interview => interview.date === "Today").map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-accent-200">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{interview.candidate}</h4>
                    <p className="text-sm text-slate-600">{interview.role} at {interview.company}</p>
                    <p className="text-sm text-accent-600">{interview.time} • {interview.duration}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Video className="h-4 w-4 mr-2" />
                      Join Interview
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interviews for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{interview.candidate}</h4>
                    <p className="text-sm text-slate-600">{interview.role} at {interview.company}</p>
                    <p className="text-sm text-slate-500">{interview.date} at {interview.time} • {interview.duration}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={interview.date === "Today" ? "default" : "secondary"}>
                      {interview.date}
                    </Badge>
                    <Button size="sm" variant="outline">Prepare</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Interviews - Pending Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
            <CardDescription>Complete evaluations and submit reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedInterviews.map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{interview.candidate}</h4>
                    <p className="text-sm text-slate-600">{interview.role} at {interview.company}</p>
                    <p className="text-sm text-slate-500">Interviewed on {interview.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{interview.rating}</span>
                    </div>
                    <Badge variant={interview.submitted ? "default" : "destructive"}>
                      {interview.submitted ? "Submitted" : "Pending"}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      {interview.submitted ? "View Report" : "Submit Report"}
                    </Button>
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

export default InterviewerDashboard;

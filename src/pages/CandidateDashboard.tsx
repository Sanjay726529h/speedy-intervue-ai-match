import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Calendar, BarChart3, FileText, Brain, CheckCircle, Settings, Plus, X, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiService, User } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [processingScore, setProcessingScore] = useState(false);
  const [resumeScore, setResumeScore] = useState<any>(null);
  
  // Modal states
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [jobDescModalOpen, setJobDescModalOpen] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');
  const [portfolioInput, setPortfolioInput] = useState('');
  const [jobDescInput, setJobDescInput] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await apiService.getCandidateProfile();
      setProfileData(response.user);
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await apiService.uploadResume(file);
      await loadProfileData();
      toast({
        title: "Success",
        description: "Resume uploaded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload resume",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddSkills = async () => {
    if (!skillsInput.trim()) return;

    const skills = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
    
    try {
      await apiService.addSkills(skills);
      await loadProfileData();
      setSkillsModalOpen(false);
      setSkillsInput('');
      toast({
        title: "Success",
        description: "Skills added successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add skills",
        variant: "destructive",
      });
    }
  };

  const handleAddPortfolio = async () => {
    if (!portfolioInput.trim()) return;

    try {
      await apiService.addPortfolio(portfolioInput);
      await loadProfileData();
      setPortfolioModalOpen(false);
      setPortfolioInput('');
      toast({
        title: "Success",
        description: "Portfolio link added successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add portfolio",
        variant: "destructive",
      });
    }
  };

  const handleAddJobDescription = async () => {
    if (!jobDescInput.trim()) return;

    try {
      await apiService.addJobDescription(jobDescInput);
      await loadProfileData();
      setJobDescModalOpen(false);
      setJobDescInput('');
      toast({
        title: "Success",
        description: "Job description added successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add job description",
        variant: "destructive",
      });
    }
  };

  const handleGetResumeScore = async () => {
    if (!profileData?.resumeUploaded) {
      toast({
        title: "No Resume",
        description: "Please upload your resume first",
        variant: "destructive",
      });
      return;
    }

    if (!profileData?.jobDescription) {
      toast({
        title: "No Job Description",
        description: "Please add a job description first",
        variant: "destructive",
      });
      return;
    }

    setProcessingScore(true);
    try {
      const response = await apiService.getResumeScore();
      setResumeScore(response);
      await loadProfileData();
      toast({
        title: "Analysis Complete",
        description: `Your resume score: ${response.score}/100`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to analyze resume",
        variant: "destructive",
      });
    } finally {
      setProcessingScore(false);
    }
  };

  const handleStartInterview = async () => {
    if (!profileData?.resumeUploaded) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume before starting an interview",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiService.startInterview();
      await loadProfileData();
      toast({
        title: "Interview Started",
        description: "Mock interview session initiated!",
      });
      // Navigate to interview page or open interview modal
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start interview",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Candidate Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

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
                <span className="text-sm text-accent-600">{profileData?.profileCompletion || 0}%</span>
              </div>
              <Progress value={profileData?.profileCompletion || 0} className="h-2" />
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                    aria-label="Upload resume file"
                    title="Upload resume file"
                  />
                  <Button size="sm" variant="outline" className="border-accent-300 text-accent-700" disabled={uploading}>
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Resume'}
                  </Button>
                </div>
                
                <Dialog open={skillsModalOpen} onOpenChange={setSkillsModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="border-accent-300 text-accent-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skills
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Skills</DialogTitle>
                      <DialogDescription>
                        Add your technical skills (comma-separated)
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Input
                          id="skills"
                          placeholder="e.g., React, TypeScript, Node.js"
                          value={skillsInput}
                          onChange={(e) => setSkillsInput(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleAddSkills} className="w-full">
                        Add Skills
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={portfolioModalOpen} onOpenChange={setPortfolioModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="border-accent-300 text-accent-700">
                      Portfolio Link
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Portfolio Link</DialogTitle>
                      <DialogDescription>
                        Add a link to your portfolio or GitHub profile
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input
                          id="portfolio"
                          placeholder="https://github.com/yourusername"
                          value={portfolioInput}
                          onChange={(e) => setPortfolioInput(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleAddPortfolio} className="w-full">
                        Add Portfolio
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={jobDescModalOpen} onOpenChange={setJobDescModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="border-accent-300 text-accent-700">
                      Add Job Description
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Job Description</DialogTitle>
                      <DialogDescription>
                        Add a job description to match your resume against
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="jobDesc">Job Description</Label>
                        <Textarea
                          id="jobDesc"
                          placeholder="Paste the job description here..."
                          value={jobDescInput}
                          onChange={(e) => setJobDescInput(e.target.value)}
                          rows={6}
                        />
                      </div>
                      <Button onClick={handleAddJobDescription} className="w-full">
                        Add Job Description
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-accent-300 text-accent-700"
                  onClick={() => navigate('/profile')}
                >
                  Profile Settings
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
              <div className="text-2xl font-bold text-blue-900">{profileData?.interviewsTaken || 0}</div>
              <p className="text-xs text-blue-600 mt-1">Total interviews</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{profileData?.successRate || 0}%</div>
              <p className="text-xs text-green-600 mt-1">Interview success</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">AI Score</CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{profileData?.aiScore || 0}</div>
              <p className="text-xs text-purple-600 mt-1">Out of 100</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Mock Interviews</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{profileData?.mockInterviews || 0}</div>
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
              <Button 
                className="h-24 flex flex-col items-center justify-center space-y-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-200"
                onClick={handleStartInterview}
                disabled={!profileData?.resumeUploaded}
              >
                <Brain className="h-6 w-6" />
                <span>Start Mock Interview</span>
              </Button>
              
              <Button 
                className="h-24 flex flex-col items-center justify-center space-y-2 bg-accent-50 hover:bg-accent-100 text-accent-700 border-accent-200"
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                <FileText className="h-6 w-6" />
                <span>Upload Resume</span>
              </Button>
              
              <Button 
                className="h-24 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                onClick={handleGetResumeScore}
                disabled={processingScore || !profileData?.resumeUploaded || !profileData?.jobDescription}
              >
                <BarChart3 className="h-6 w-6" />
                <span>{processingScore ? 'Processing...' : 'Check Resume Score'}</span>
              </Button>
            </div>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
              aria-label="Upload resume file"
              title="Upload resume file"
            />
          </CardContent>
        </Card>

        {/* Resume Score Results */}
        {resumeScore && (
          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">Resume Analysis Results</CardTitle>
              <CardDescription className="text-purple-600">
                Your resume score and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-purple-800">Score</span>
                <div className="text-3xl font-bold text-purple-900">{resumeScore.score}/100</div>
              </div>
              <Progress value={resumeScore.score} className="h-3" />
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Recommendations</h4>
                  <p className="text-purple-700 text-sm">{resumeScore.recommendations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills Display */}
        {profileData?.skills && profileData.skills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>Technical skills you've added to your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Link */}
        {profileData?.portfolio && (
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Your portfolio or GitHub link</CardDescription>
            </CardHeader>
            <CardContent>
              <a 
                href={profileData.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {profileData.portfolio}
              </a>
            </CardContent>
          </Card>
        )}

        {/* Profile Status */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Status</CardTitle>
            <CardDescription>Current status of your profile sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Resume Uploaded</span>
                <Badge variant={profileData?.resumeUploaded ? "default" : "secondary"}>
                  {profileData?.resumeUploaded ? "✓ Complete" : "✗ Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Skills Added</span>
                <Badge variant={profileData?.skills && profileData.skills.length > 0 ? "default" : "secondary"}>
                  {profileData?.skills && profileData.skills.length > 0 ? "✓ Complete" : "✗ Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Portfolio Link</span>
                <Badge variant={profileData?.portfolio && profileData.portfolio.trim() !== "" ? "default" : "secondary"}>
                  {profileData?.portfolio && profileData.portfolio.trim() !== "" ? "✓ Complete" : "✗ Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Job Description</span>
                <Badge variant={profileData?.jobDescription ? "default" : "secondary"}>
                  {profileData?.jobDescription ? "✓ Complete" : "✗ Missing"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;

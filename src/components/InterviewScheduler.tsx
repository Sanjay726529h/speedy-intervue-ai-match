
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [interviewerId, setInterviewerId] = useState('');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [interviewers, setInterviewers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadInterviews();
    loadCandidates();
    loadInterviewers();
  }, [user]);

  const loadInterviews = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('interviews')
        .select(`
          *,
          candidate:profiles!interviews_candidate_id_fkey(name, email),
          interviewer:profiles!interviews_interviewer_id_fkey(name, email),
          company:profiles!interviews_company_id_fkey(name, email)
        `);

      // Filter based on user role
      if (user.role === 'candidate') {
        query = query.eq('candidate_id', user.id);
      } else if (user.role === 'interviewer') {
        query = query.eq('interviewer_id', user.id);
      } else if (user.role === 'company') {
        query = query.eq('company_id', user.id);
      }

      const { data, error } = await query.order('scheduled_at', { ascending: true });

      if (error) throw error;
      setInterviews(data || []);
    } catch (error) {
      console.error('Error loading interviews:', error);
    }
  };

  const loadCandidates = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'candidate');

      if (error) throw error;
      setCandidates(data || []);
    } catch (error) {
      console.error('Error loading candidates:', error);
    }
  };

  const loadInterviewers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'interviewer');

      if (error) throw error;
      setInterviewers(data || []);
    } catch (error) {
      console.error('Error loading interviewers:', error);
    }
  };

  const scheduleInterview = async () => {
    if (!scheduledDate || !scheduledTime || !candidateId || !interviewerId || !user) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      const { error } = await supabase
        .from('interviews')
        .insert({
          candidate_id: candidateId,
          interviewer_id: interviewerId,
          company_id: user.id,
          scheduled_at: scheduledAt,
          status: 'scheduled',
          interview_data: {}
        });

      if (error) throw error;

      toast({
        title: "Interview scheduled!",
        description: "The interview has been scheduled successfully.",
      });

      // Reset form
      setScheduledDate('');
      setScheduledTime('');
      setCandidateId('');
      setInterviewerId('');
      
      loadInterviews(); // Refresh the list
    } catch (error: any) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Scheduling failed",
        description: error.message || "Failed to schedule interview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {user?.role === 'company' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule New Interview
            </CardTitle>
            <CardDescription>
              Schedule interviews between candidates and interviewers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidate">Candidate</Label>
                <Select value={candidateId} onValueChange={setCandidateId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name} ({candidate.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interviewer">Interviewer</Label>
                <Select value={interviewerId} onValueChange={setInterviewerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewers.map((interviewer) => (
                      <SelectItem key={interviewer.id} value={interviewer.id}>
                        {interviewer.name} ({interviewer.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={scheduleInterview} disabled={loading} className="w-full">
              {loading ? 'Scheduling...' : 'Schedule Interview'}
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {user?.role === 'candidate' ? 'My Interviews' : 'Scheduled Interviews'}
          </CardTitle>
          <CardDescription>
            View and manage your interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          {interviews.length === 0 ? (
            <p className="text-center text-slate-500 py-8">
              No interviews scheduled yet.
            </p>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview) => (
                <div key={interview.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">
                        {new Date(interview.scheduled_at).toLocaleDateString()} at{' '}
                        {new Date(interview.scheduled_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Candidate</p>
                      <p className="font-medium">{interview.candidate?.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Interviewer</p>
                      <p className="font-medium">{interview.interviewer?.name}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Company</p>
                      <p className="font-medium">{interview.company?.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewScheduler;

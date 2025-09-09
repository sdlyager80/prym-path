
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SkillsMapping from '../components/dashboard/SkillsMapping';
import { 
  TrendingUp,
  BookOpen,
  Clock,
  Award,
  Target,
  ArrowRight,
  PlayCircle
} from "lucide-react";
import { curriculum } from "@/components/data/curriculum"; // Changed import path
import { UserExerciseSubmission, SkillMapping } from "@/api/entities";


const StatCard = ({ icon, label, value, color }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    progress: 0,
    coursesCompleted: 0,
    totalCourses: 0,
    timeInvested: 0
  });
  const [nextExercise, setNextExercise] = useState(null);
  const [skillMappings, setSkillMappings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const allExercises = curriculum.flatMap(m => m.weeks.flatMap(w => w.days.flatMap(d => d.exercises)));
      const [submissions, skillsData] = await Promise.all([
        UserExerciseSubmission.list(),
        SkillMapping.list('-priority', 5)
      ]);

      const submissionIds = new Set(submissions.map(s => s.exercise_id));
      const completedCount = submissions.filter(s => s.status === 'completed').length;
      const totalExercises = allExercises.length;
      const progress = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;
      
      const firstUnfinished = allExercises.find(ex => !submissionIds.has(ex.id));
      setNextExercise(firstUnfinished);

      setStats({
        progress: progress,
        coursesCompleted: completedCount,
        totalCourses: totalExercises,
        timeInvested: submissions.reduce((sum, s) => sum + (s.time_spent_minutes || 0), 0)
      });
      
      setSkillMappings(skillsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const learningStreak = Math.floor(Math.random() * 10) + 1; // Placeholder for now

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Career Transformation Hub</h1>
              <p className="text-gray-600">Master your transition from Salesforce to ServiceNow</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<TrendingUp className="w-5 h-5 text-blue-600" />} label="Overall Progress" value={`${stats.progress}%`} color="blue" />
            <StatCard icon={<BookOpen className="w-5 h-5 text-green-600" />} label="Labs Completed" value={`${stats.coursesCompleted}/${stats.totalCourses}`} color="green" />
            <StatCard icon={<Clock className="w-5 h-5 text-purple-600" />} label="Time Invested" value={`${stats.timeInvested}m`} color="purple" />
            <StatCard icon={<Award className="w-5 h-5 text-yellow-600" />} label="Learning Streak" value={`${learningStreak} days`} color="yellow" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-purple-600" />
                    Your Next Step
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                     <div className="text-center p-8 text-gray-500">Loading your next lab...</div>
                  ) : nextExercise ? (
                    <div className="p-4 bg-purple-50 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-purple-800">{nextExercise.title}</p>
                            <p className="text-sm text-purple-600">{nextExercise.duration_hours} hours</p>
                        </div>
                        <Link to={createPageUrl(`Exercise?id=${nextExercise.id}`)}>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                {nextExercise.type === 'session' ? 'View Content' : 'Start Lab'} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                  ) : (
                     <div className="text-center p-8 text-green-600 font-semibold">
                        Congratulations! You've completed all available labs.
                   </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <SkillsMapping skillMappings={skillMappings} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

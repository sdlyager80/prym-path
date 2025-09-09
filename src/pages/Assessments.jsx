import React, { useState, useEffect } from 'react';
import { Assessment, UserAssessmentAttempt, User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Award, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';

export default function AssessmentsPage() {
    const [assessments, setAssessments] = useState([]);
    const [userAttempts, setUserAttempts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [assessmentsData, allAttempts] = await Promise.all([
                    Assessment.list('phase'),
                    UserAssessmentAttempt.list()
                ]);
                setAssessments(assessmentsData);

                const attemptsByAssessment = allAttempts.reduce((acc, attempt) => {
                    if (!acc[attempt.assessment_id] || new Date(attempt.completed_at) > new Date(acc[attempt.assessment_id].completed_at)) {
                        acc[attempt.assessment_id] = attempt;
                    }
                    return acc;
                }, {});
                setUserAttempts(attemptsByAssessment);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleStartAssessment = async (assessmentId) => {
        const user = await User.me();
        const newAttempt = await UserAssessmentAttempt.create({
            assessment_id: assessmentId,
            user_id: user.id,
            status: 'in_progress',
            started_at: new Date().toISOString(),
            answers: {}
        });
        navigate(createPageUrl(`AssessmentAttempt?id=${newAttempt.id}`));
    };

    if (isLoading) {
        return <div className="p-6">Loading assessments...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Award className="w-8 h-8 text-purple-600" />
                        Knowledge Assessments
                    </h1>
                    <p className="text-gray-600 mt-2">Test your understanding of the training material and earn your certificate.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assessments.map(assessment => {
                        const lastAttempt = userAttempts[assessment.id];
                        const isCompleted = lastAttempt && lastAttempt.status === 'completed';

                        return (
                            <Card key={assessment.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <CardTitle>{assessment.title}</CardTitle>
                                            <CardDescription>Phase {assessment.phase}, Week {assessment.week}</CardDescription>
                                        </div>
                                    </div>
                                    
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-gray-600 mb-4">{assessment.description}</p>
                                    <div className="flex items-center text-sm text-gray-500 gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{assessment.time_limit_minutes} minutes</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col items-start gap-4">
                                    {isCompleted && (
                                        <div className="w-full">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium text-gray-700">Last Score</span>
                                                <span className="text-sm font-bold text-purple-700">{Math.round((lastAttempt.score / lastAttempt.total_possible_score) * 100)}%</span>
                                            </div>
                                            <Progress value={(lastAttempt.score / lastAttempt.total_possible_score) * 100} className="w-full" />
                                            <p className="text-xs text-gray-500 mt-1">Completed on {format(new Date(lastAttempt.completed_at), 'MMM d, yyyy')}</p>
                                        </div>
                                    )}
                                    <Button onClick={() => handleStartAssessment(assessment.id)} className="w-full">
                                        {isCompleted ? "Retake Assessment" : "Start Assessment"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserAssessmentAttempt, Assessment, AssessmentQuestion, User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { createPageUrl } from '@/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function QuestionRenderer({ question, answer, onAnswerChange }) {
    const handleMultiSelectChange = (option, checked) => {
        const currentAnswers = answer || [];
        if (checked) {
            onAnswerChange([...currentAnswers, option]);
        } else {
            onAnswerChange(currentAnswers.filter(item => item !== option));
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-lg font-medium">{question.question_text}</p>
            {question.code_snippet && (
                <pre className="bg-gray-800 text-white p-4 rounded-md text-sm"><code>{question.code_snippet}</code></pre>
            )}

            {question.question_type === 'multiple_choice' && (
                <RadioGroup value={answer} onValueChange={onAnswerChange}>
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                            <RadioGroupItem value={option} id={`q-${question.id}-opt-${index}`} />
                            <Label htmlFor={`q-${question.id}-opt-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}

            {question.question_type === 'multiple_select' && (
                <div className="space-y-2">
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                            <Checkbox 
                                id={`q-${question.id}-opt-${index}`}
                                checked={(answer || []).includes(option)}
                                onCheckedChange={(checked) => handleMultiSelectChange(option, checked)}
                            />
                            <Label htmlFor={`q-${question.id}-opt-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                        </div>
                    ))}
                </div>
            )}
            
            {/* TODO: Add renderer for code_completion */}
        </div>
    );
}


function AssessmentResults({ attempt, questions, onRetake }) {
    const navigate = useNavigate();
    const scorePercentage = Math.round((attempt.score / attempt.total_possible_score) * 100);

    return (
        <div className="max-w-3xl mx-auto text-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Assessment Complete!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <p className="text-lg text-gray-600">Your Score:</p>
                        <p className={`text-6xl font-bold ${scorePercentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                            {scorePercentage}%
                        </p>
                        <p className="text-gray-500">({attempt.score} / {attempt.total_possible_score} points)</p>
                    </div>
                    {scorePercentage < 70 && (
                        <p className="text-yellow-700 bg-yellow-100 p-3 rounded-md">
                            You need a score of 70% or higher to pass. Keep studying and try again!
                        </p>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                     <Button variant="outline" onClick={() => navigate(createPageUrl('Assessments'))}>Back to Assessments</Button>
                     <Button onClick={onRetake}>Retake Assessment</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function AssessmentAttemptPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const attemptId = new URLSearchParams(location.search).get('id');

    const [attempt, setAttempt] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const loadAttemptData = useCallback(async () => {
        if (!attemptId) return;
        setIsLoading(true);
        try {
            const attemptData = await UserAssessmentAttempt.get(attemptId);
            setAttempt(attemptData);
            setAnswers(attemptData.answers || {});

            const [assessmentData, questionsData] = await Promise.all([
                Assessment.get(attemptData.assessment_id),
                AssessmentQuestion.filter({ assessment_id: attemptData.assessment_id })
            ]);
            setAssessment(assessmentData);
            setQuestions(questionsData);
        } catch (error) {
            console.error("Error loading assessment data:", error);
        }
        setIsLoading(false);
    }, [attemptId]);

    useEffect(() => {
        loadAttemptData();
    }, [loadAttemptData]);

    const handleAnswerChange = (questionId, answer) => {
        const newAnswers = { ...answers, [questionId]: answer };
        setAnswers(newAnswers);
        // Persist answers immediately
        UserAssessmentAttempt.update(attemptId, { answers: newAnswers });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        let score = 0;
        let totalPossibleScore = 0;

        questions.forEach(q => {
            totalPossibleScore += q.points;
            const userAnswer = answers[q.id];
            if (!userAnswer) return;

            const correctAnswers = q.correct_answers.sort();
            
            if (q.question_type === 'multiple_choice') {
                if (userAnswer === correctAnswers[0]) {
                    score += q.points;
                }
            } else if (q.question_type === 'multiple_select') {
                const sortedUserAnswer = [...userAnswer].sort();
                if (JSON.stringify(sortedUserAnswer) === JSON.stringify(correctAnswers)) {
                    score += q.points;
                }
            }
        });

        await UserAssessmentAttempt.update(attemptId, {
            status: 'completed',
            score,
            total_possible_score: totalPossibleScore,
            completed_at: new Date().toISOString()
        });
        
        // Reload data to show results
        loadAttemptData();
    };

    const handleRetake = async () => {
        const user = await User.me();
        const newAttempt = await UserAssessmentAttempt.create({
            assessment_id: assessment.id,
            user_id: user.id,
            status: 'in_progress',
            started_at: new Date().toISOString(),
            answers: {}
        });
        navigate(createPageUrl(`AssessmentAttempt?id=${newAttempt.id}`), { replace: true });
        // Full page reload to ensure clean state
        window.location.reload();
    };

    if (isLoading) {
        return <div className="p-6">Loading assessment...</div>;
    }
    
    if (!attempt || !assessment) {
        return <div className="p-6">Assessment not found.</div>;
    }

    if (attempt.status === 'completed') {
        return <div className="p-6 bg-gray-50 min-h-screen flex items-center"><AssessmentResults attempt={attempt} questions={questions} onRetake={handleRetake} /></div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>{assessment.title}</span>
                            <span className="text-sm font-normal text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> {assessment.time_limit_minutes} min</span>
                        </CardTitle>
                        <p className="text-sm text-gray-600 pt-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </CardHeader>
                    <CardContent>
                        {currentQuestion && (
                            <QuestionRenderer 
                                question={currentQuestion}
                                answer={answers[currentQuestion.id]}
                                onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
                            />
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <Button onClick={handleNext}>
                                Next <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        <CheckCircle className="w-4 h-4 mr-2" /> Finish & Submit
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will finalize your answers and score your assessment. You cannot make changes after submitting.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleSubmit}>Yes, Submit My Answers</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
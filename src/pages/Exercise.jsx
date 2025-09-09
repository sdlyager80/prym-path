
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { UserExerciseSubmission } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, CheckSquare, PartyPopper, BookOpen, FileText } from 'lucide-react';
import CodeBlock from '../components/setup/CodeBlock';
import { curriculum } from '@/components/data/curriculum';
import ReactMarkdown from 'react-markdown';

// Helper function to find exercise in the nested curriculum data
const findExercise = (id) => {
    for (const module of curriculum) {
        for (const week of module.weeks) {
            for (const day of week.days) {
                const exercise = day.exercises.find(ex => ex.id === id);
                if (exercise) return exercise;
            }
        }
    }
    return null;
};

export default function ExercisePage() {
    const [exercise, setExercise] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const exerciseId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        if (!exerciseId) {
            setIsLoading(false);
            return;
        }

        const fetchExerciseData = async () => {
            setIsLoading(true);
            const foundExercise = findExercise(exerciseId);
            setExercise(foundExercise);

            if (foundExercise) {
                const submissions = await UserExerciseSubmission.filter({ exercise_id: exerciseId, status: 'completed' });
                if (submissions.length > 0) {
                    setIsCompleted(true);
                }
            }
            setIsLoading(false);
        };
        fetchExerciseData();
    }, [exerciseId]);

    const handleMarkComplete = async () => {
        if (!exerciseId) return;
        await UserExerciseSubmission.create({
            exercise_id: exerciseId,
            status: 'completed',
            submission_notes: 'Lab completed via UI.'
        });
        setIsCompleted(true);
    };

    if (isLoading) {
        return <div className="p-6">Loading exercise...</div>;
    }

    if (!exercise) {
        return <div className="p-6">Exercise not found. Please check the ID and try again.</div>;
    }
    
    const getIconForType = (type) => {
        switch (type) {
            case 'session': return <FileText className="w-6 h-6 text-blue-600" />;
            case 'exercise': return <BookOpen className="w-6 h-6 text-purple-600" />;
            default: return <BookOpen className="w-6 h-6 text-gray-500" />;
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link to={createPageUrl("Phases")} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Curriculum
                </Link>

                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    {getIconForType(exercise.type)}
                                    <CardTitle className="text-3xl font-bold">{exercise.title}</CardTitle>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm mt-2">
                                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {exercise.duration_hours} hours</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                           <ReactMarkdown>{exercise.content}</ReactMarkdown>
                        </div>
                        {(exercise.codeBlocks || []).map((block, i) => (
                            <div key={i} className="my-4">
                                <p className="font-semibold text-sm mb-2">{block.title}</p>
                                <CodeBlock code={block.code} language={block.language} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Completion</CardTitle>
                        <CardDescription>Mark this item as complete once you have finished the exercise or reviewed the content.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        {isCompleted ? (
                            <div className="flex items-center gap-2 text-green-600 font-semibold p-4 bg-green-50 rounded-md w-full">
                                <PartyPopper className="w-5 h-5" />
                                <span>Congratulations! You've completed this item.</span>
                            </div>
                        ) : (
                            <Button onClick={handleMarkComplete} size="lg">
                                <CheckSquare className="w-5 h-5 mr-2" />
                                Mark as Complete
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

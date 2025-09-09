
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, BookOpen, FileText, Check, Award } from "lucide-react";
import { curriculum } from "@/components/data/curriculum";
import { UserExerciseSubmission } from "@/api/entities";

const getIconForType = (type, isCompleted) => {
    if (isCompleted) return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    switch (type) {
        case 'session': return <FileText className="w-5 h-5 text-blue-600" />;
        case 'exercise': return <BookOpen className="w-5 h-5 text-purple-600" />;
        case 'project': return <Check className="w-5 h-5 text-orange-600" />;
        case 'assessment': return <Award className="w-5 h-5 text-yellow-600" />;
        default: return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
};

export default function PhasesPage() {
    const [completedExercises, setCompletedExercises] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setIsLoading(true);
            const submissions = await UserExerciseSubmission.list({ status: "completed" });
            const completedIds = new Set(submissions.map(s => s.exercise_id));
            setCompletedExercises(completedIds);
            setIsLoading(false);
        };
        fetchSubmissions();
    }, []);

    if (isLoading) {
        return <div className="p-6">Loading curriculum progress...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Training Curriculum</h1>
                    <p className="text-gray-600">Follow the structured modules to master ServiceNow.</p>
                </div>

                <div className="space-y-4">
                    {(curriculum || []).map(module => (
                        <Card key={module.id}>
                            <CardHeader>
                                <CardTitle>{module.title}</CardTitle>
                                <p className="text-gray-500 text-sm">{module.duration} - {module.learningObjectives}</p>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {(module.weeks || []).map(week => (
                                        <AccordionItem key={week.id} value={week.id}>
                                            <AccordionTrigger className="font-semibold text-lg">
                                                {week.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {(week.days || []).map(day => (
                                                    <div key={day.id} className="pt-4">
                                                        <h4 className="font-medium text-md text-gray-800 mb-2 pl-2">{day.title}</h4>
                                                        <div className="space-y-3 pl-4 border-l-2 border-gray-200 ml-2">
                                                            {(day.exercises || []).map(exercise => {
                                                                const isCompleted = completedExercises.has(exercise.id);
                                                                return (
                                                                    <div key={exercise.id} className={`flex items-center justify-between p-3 rounded-md transition-colors ${isCompleted ? 'bg-green-50' : 'hover:bg-gray-100'}`}>
                                                                        <div className="flex items-center gap-3">
                                                                            {getIconForType(exercise.type, isCompleted)}
                                                                            <div>
                                                                                <p className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{exercise.title}</p>
                                                                                <p className="text-xs text-gray-500">{exercise.duration_hours} hours</p>
                                                                            </div>
                                                                        </div>
                                                                        {isCompleted ? (
                                                                            <Badge variant="outline" className="text-green-700 border-green-200 bg-white">Completed</Badge>
                                                                        ) : (
                                                                            <Link to={createPageUrl(`Exercise?id=${exercise.id}`)}>
                                                                                <Button variant="outline" size="sm">
                                                                                    {exercise.type === 'session' ? 'View Content' : 'Start Lab'}
                                                                                </Button>
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

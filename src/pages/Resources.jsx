import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, ExternalLink, BookOpen, Video, FileText, Award, Code, Users, Target, TrendingUp, Calendar, DollarSign, CheckCircle, Clock } from 'lucide-react';

const certificationPathway = [
    {
        phase: "Phase 1: Foundation (Months 1-3)",
        certs: [
            {
                name: "ServiceNow Certified System Administrator (CSA)",
                priority: "Essential",
                timeline: "6-8 weeks",
                cost: "$300",
                coverage: [
                    "ServiceNow Fundamentals (15%)",
                    "User Interface & Navigation (10%)",
                    "Database Administration (15%)",
                    "User Administration & Security (20%)",
                    "Workflow & Notifications (15%)",
                    "Reporting (10%)",
                    "Platform Maintenance (15%)"
                ]
            }
        ]
    },
    {
        phase: "Phase 2: Specialization (Months 4-6)",
        certs: [
            {
                name: "Customer Service Management (CSM) Implementation Specialist",
                priority: "High for Sales Focus",
                timeline: "8-10 weeks",
                cost: "$300",
                coverage: [
                    "CSM Overview & Architecture (10%)",
                    "Account & Contact Management (20%)",
                    "Case Management (25%)",
                    "Knowledge Management (15%)",
                    "Service Level Management (15%)",
                    "CSM Portal & Mobile (10%)",
                    "CSM Reporting (5%)"
                ]
            }
        ]
    },
    {
        phase: "Phase 3: Technical Depth (Months 7-9)",
        certs: [
            {
                name: "ServiceNow Certified Application Developer (CAD)",
                priority: "High for Technical Roles",
                timeline: "10-12 weeks",
                cost: "$300",
                coverage: [
                    "Application Design (20%)",
                    "Application User Interface (20%)",
                    "Security & Restrictions (10%)",
                    "Application Automation (25%)",
                    "Working with External Systems (15%)",
                    "Application Management & Maintenance (10%)"
                ]
            }
        ]
    }
];

const careerLevels = [
    {
        level: "Entry Level: ServiceNow Administrator/Developer (0-2 years)",
        roles: ["ServiceNow Administrator", "Junior ServiceNow Developer", "Business Analyst - ServiceNow", "Technical Consultant (Entry Level)"],
        salary: "$65,000 - $95,000",
        requiredCerts: ["ServiceNow CSA", "One Implementation Specialist cert"],
        skills: ["Platform administration and maintenance", "Basic application development", "Requirements gathering and analysis", "User training and support"]
    },
    {
        level: "Mid-Level: Senior Developer/Consultant (2-5 years)",
        roles: ["Senior ServiceNow Developer", "ServiceNow Technical Consultant", "Solution Architect (Junior)", "Pre-Sales Engineer"],
        salary: "$95,000 - $140,000",
        requiredCerts: ["ServiceNow CSA", "ServiceNow CAD", "2-3 Implementation Specialist certs", "Multiple micro-certifications"],
        skills: ["Complex application architecture", "Integration design and development", "Performance optimization", "Team leadership and mentoring"]
    },
    {
        level: "Senior Level: Architect/Practice Lead (5+ years)",
        roles: ["ServiceNow Technical Architect", "Practice Lead/Director", "Principal Consultant", "Pre-Sales Architect"],
        salary: "$140,000 - $200,000+",
        requiredCerts: ["ServiceNow CTA (Certified Technical Architect)", "Multiple Implementation Specialist certifications", "Industry-specific certifications"],
        skills: ["Enterprise architecture design", "Strategic platform planning", "Team building and development", "Client executive relationships"]
    }
];

const industryFocus = [
    {
        industry: "Telecommunications",
        description: "ServiceNow Telecommunications Service Management for complex product catalogs and service ordering.",
        keyTopics: ["Complex product bundling", "Service activation workflows", "Network resource management"],
        certifications: ["Telecommunications Service Management", "Product Catalog Management", "Order Management"]
    },
    {
        industry: "Financial Services", 
        description: "Compliance-focused implementations with complex approval workflows and audit trails.",
        keyTopics: ["Regulatory compliance", "Multi-level approvals", "Risk assessment integration"],
        certifications: ["Financial Services Operations", "Risk Management", "Compliance Automation"]
    },
    {
        industry: "Healthcare",
        description: "HIPAA-compliant implementations with patient data protection and care coordination.",
        keyTopics: ["HIPAA compliance", "Patient workflow integration", "Medical device management"],
        certifications: ["Healthcare Service Management", "Medical Device Tracking", "Patient Portal Development"]
    },
    {
        industry: "SaaS Companies",
        description: "Subscription management and usage-based billing for software companies.",
        keyTopics: ["Subscription lifecycle", "Usage-based pricing", "Customer success integration"],
        certifications: ["Subscription Management", "Usage Analytics", "Customer Success Automation"]
    }
];

export default function ResourcesPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-purple-600" />
                        Training Resources
                    </h1>
                    <p className="text-gray-600 mt-2">Comprehensive resources for your Salesforce to ServiceNow transition.</p>
                </div>

                <Tabs defaultValue="certification" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="certification">Certification Path</TabsTrigger>
                        <TabsTrigger value="career">Career Roadmap</TabsTrigger>
                        <TabsTrigger value="industry">Industry Focus</TabsTrigger>
                        <TabsTrigger value="tools">Tools & Scripts</TabsTrigger>
                        <TabsTrigger value="community">Community</TabsTrigger>
                    </TabsList>

                    <TabsContent value="certification" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-6 h-6 text-yellow-600" />
                                    ServiceNow Certification Roadmap
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {certificationPathway.map((phase, index) => (
                                        <div key={index} className="border-l-4 border-purple-500 pl-4">
                                            <h3 className="font-semibold text-lg text-purple-800">{phase.phase}</h3>
                                            {phase.certs.map((cert, certIndex) => (
                                                <div key={certIndex} className="mt-3 p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div>
                                                            <p className="font-medium text-lg">{cert.name}</p>
                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                <span className="flex items-center gap-1">
                                                                    <Target className="w-4 h-4" />
                                                                    {cert.priority}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    {cert.timeline}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <DollarSign className="w-4 h-4" />
                                                                    {cert.cost}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Badge className={cert.priority.includes('Essential') ? 'bg-red-100 text-red-700' : cert.priority.includes('High') ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}>
                                                            {cert.priority.split(' ')[0]}
                                                        </Badge>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium mb-2">Exam Coverage:</p>
                                                        <div className="grid md:grid-cols-2 gap-2">
                                                            {cert.coverage.map((topic, topicIndex) => (
                                                                <div key={topicIndex} className="flex items-center gap-2 text-sm">
                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                    {topic}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                                    <h3 className="font-semibold text-lg mb-4">Investment ROI Analysis</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium mb-3">Total Investment (2 years)</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Core Certifications:</span>
                                                    <span>$900</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Study Materials:</span>
                                                    <span>$500-1,000</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Training Courses:</span>
                                                    <span>$1,000-3,000</span>
                                                </div>
                                                <div className="flex justify-between font-bold border-t pt-2">
                                                    <span>Total:</span>
                                                    <span>$2,400-5,000</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-3">Expected Salary Growth</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Year 0 (Salesforce):</span>
                                                    <span>$90,000</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Year 1 (ServiceNow + CSA):</span>
                                                    <span>$95,000</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Year 2 (+ Specialist):</span>
                                                    <span>$120,000</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Year 3 (Senior):</span>
                                                    <span>$140,000</span>
                                                </div>
                                                <div className="flex justify-between font-bold text-green-600 border-t pt-2">
                                                    <span>ROI:</span>
                                                    <span>3,400% (5 years)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="career" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                    Career Progression Roadmap
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {careerLevels.map((level, index) => (
                                        <div key={index} className="border-l-4 border-green-500 pl-6">
                                            <h3 className="font-semibold text-xl text-green-800">{level.level}</h3>
                                            
                                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">Typical Roles</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                                        {level.roles.map((role, roleIndex) => (
                                                            <li key={roleIndex}>{role}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="font-medium mb-2">Key Skills</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                                        {level.skills.map((skill, skillIndex) => (
                                                            <li key={skillIndex}>{skill}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium">Required Certifications</span>
                                                    <Badge variant="outline">{level.salary}</Badge>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {level.requiredCerts.map((cert, certIndex) => (
                                                        <Badge key={certIndex} variant="secondary" className="text-xs">
                                                            {cert}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                                    <h3 className="font-semibold text-lg mb-4">90-Day Quick Start Plan for Salesforce Professionals</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-white rounded-lg">
                                            <h4 className="font-medium text-blue-800 mb-2">Days 1-30: Platform Immersion</h4>
                                            <ul className="text-sm space-y-1">
                                                <li>• Obtain PDI</li>
                                                <li>• Complete Fundamentals</li>
                                                <li>• Practice navigation</li>
                                                <li>• Understand data model</li>
                                            </ul>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg">
                                            <h4 className="font-medium text-blue-800 mb-2">Days 31-60: Practical Application</h4>
                                            <ul className="text-sm space-y-1">
                                                <li>• Build sales application</li>
                                                <li>• Implement processes</li>
                                                <li>• Integration project</li>
                                                <li>• Apply SF knowledge</li>
                                            </ul>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg">
                                            <h4 className="font-medium text-blue-800 mb-2">Days 61-90: Certification Prep</h4>
                                            <ul className="text-sm space-y-1">
                                                <li>• CSA study intensive</li>
                                                <li>• Practice exams</li>
                                                <li>• Take certification</li>
                                                <li>• Plan next steps</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="industry" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {industryFocus.map((industry, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{industry.industry}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">{industry.description}</p>
                                        <div className="space-y-3">
                                            <div className="text-sm">
                                                <p className="font-medium">Key Topics:</p>
                                                <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                                                    {industry.keyTopics.map((topic, topicIndex) => (
                                                        <li key={topicIndex}>{topic}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Button size="sm" variant="outline" className="w-full">View Case Study</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="tools" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Development Tools</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">PDI Setup Scripts</span>
                                        <Button size="sm" variant="outline">Download</Button>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">Test Data Generator</span>
                                        <Button size="sm" variant="outline">Download</Button>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">Code Templates</span>
                                        <Button size="sm" variant="outline">Download</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Migration Utilities</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">Salesforce Data Mapper</span>
                                        <Button size="sm" variant="outline">Download</Button>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">Field Mapping Template</span>
                                        <Button size="sm" variant="outline">Download</Button>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">Integration Templates</span>
                                        <Button size="sm" variant="outline">Download</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="community" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        ServiceNow Community
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        ServiceNow Developer Portal
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Community Forums
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        ServiceNow Blog
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Training Support</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm font-medium text-blue-900">Need Help?</p>
                                        <p className="text-xs text-blue-700 mt-1">Join our dedicated Slack channel for real-time support from instructors and fellow students.</p>
                                    </div>
                                    <Button className="w-full">Join Training Community</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
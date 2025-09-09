import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap, Rocket, Factory, HeartPulse, Trophy, GanttChart, ListChecks } from 'lucide-react';
import CodeBlock from '../components/setup/CodeBlock';

const techStartupCode = {
    tableBuilder: `// 1. Create Application Scope
- Name: CloudTech Solutions
- Scope: x_cloudtech
- Version: 1.0.0

// 2. Set up core tables with inheritance
var tableBuilder = new TableBuilder();
tableBuilder.createExtendedTable('x_cloudtech_lead', 'task', {
    company_size: 'choice',
    industry: 'choice', 
    lead_source: 'choice',
    score: 'integer',
    qualification_status: 'choice'
});

// 3. Create choice lists for dropdowns
createChoiceList('x_cloudtech_lead', 'company_size', [
    {value: '1-10', label: '1-10 employees'},
    {value: '11-50', label: '11-50 employees'},
    {value: '51-200', label: '51-200 employees'},
    {value: '201-1000', label: '201-1000 employees'},
    {value: '1000+', label: '1000+ employees'}
]);`,
    leadScoring: `// Lead Scoring Business Rule
(function executeRule(current, previous) {
    var scorer = new LeadScorer();
    var score = scorer.calculateScore(current);
    current.score = score;
    
    // Auto-qualify high-scoring leads
    if (score >= 80) {
        current.qualification_status = 'qualified';
        // Trigger opportunity creation
        gs.eventQueue('lead.qualified', current);
    }
})(current, previous);`,
    productConfig: `var ProductConfigurator = Class.create();
ProductConfigurator.prototype = {
    calculatePrice: function(baseProduct, addOns, userCount, term) {
        var pricing = { /* ... full logic ... */ };
        // ... calculation logic ...
        return pricing;
    }
};`,
    provisioning: `var ProvisioningManager = Class.create();
ProvisioningManager.prototype = {
    provisionCustomer: function(contractId) {
        var rm = new sn_ws.RESTMessageV2();
        rm.setEndpoint('https://api.cloudprovider.com/tenants');
        // ... full REST call logic ...
        var response = rm.execute();
        // ... handle response ...
    }
};`
};

export default function CapstoneProjectPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-purple-600" />
                        Capstone Project Framework
                    </h1>
                    <p className="text-gray-600 mt-2">Design and build a complete end-to-end solution to demonstrate mastery of the program.</p>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="techstartup">
                            <Rocket className="w-4 h-4 mr-2"/>TechStartup
                        </TabsTrigger>
                        <TabsTrigger value="manufacturing">
                            <Factory className="w-4 h-4 mr-2"/>Manufacturing
                        </TabsTrigger>
                        <TabsTrigger value="health">
                            <HeartPulse className="w-4 h-4 mr-2"/>HealthSystem
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-6 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Trophy className="text-yellow-500" /> Project Objectives</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Demonstrate comprehensive understanding of ServiceNow platform capabilities.</li>
                                    <li>Apply industry best practices for solution architecture and design.</li>
                                    <li>Build a production-ready application using advanced ServiceNow features.</li>
                                    <li>Present their solution to stakeholders and peers.</li>
                                    <li>Create documentation suitable for ongoing maintenance and enhancement.</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><GanttChart className="text-blue-500" /> Project Timeline & Milestones</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="font-semibold">Week 1-2: Foundation & Design</li>
                                    <li className="font-semibold">Week 3-4: Core Development</li>
                                    <li className="font-semibold">Week 5-6: Advanced Features</li>
                                    <li className="font-semibold">Week 7-8: Integration & Testing</li>
                                    <li className="font-semibold">Week 9: Final Polish & Preparation</li>
                                    <li className="font-semibold">Week 10: Presentation & Evaluation</li>
                                </ul>
                            </CardContent>
                        </Card>
                         <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><ListChecks className="text-green-500" /> Evaluation Criteria</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <p className="text-2xl font-bold">40%</p>
                                    <p className="text-sm font-medium">Technical Excellence</p>
                                </div>
                                 <div className="p-4 bg-gray-100 rounded-lg">
                                    <p className="text-2xl font-bold">30%</p>
                                    <p className="text-sm font-medium">Business Impact</p>
                                </div>
                                 <div className="p-4 bg-gray-100 rounded-lg">
                                    <p className="text-2xl font-bold">20%</p>
                                    <p className="text-sm font-medium">Implementation Quality</p>
                                </div>
                                 <div className="p-4 bg-gray-100 rounded-lg">
                                    <p className="text-2xl font-bold">10%</p>
                                    <p className="text-sm font-medium">Presentation</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="techstartup" className="mt-6 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Option 1: TechStartup SaaS Platform</CardTitle>
                                <CardDescription>Build a complete Software-as-a-Service quote-to-cash solution.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">Business Scenario:</p>
                                <p className="text-sm text-gray-700">CloudTech Solutions needs a unified platform to manage their customer lifecycle, challenged by manual sales processes, disconnected systems, and poor customer visibility.</p>
                            </CardContent>
                        </Card>
                        <Accordion type="multiple" collapsible className="w-full">
                            <AccordionItem value="requirements">
                                <AccordionTrigger className="text-lg font-semibold">Core Requirements</AccordionTrigger>
                                <AccordionContent className="p-4">
                                    <ul className="list-disc space-y-2 pl-5">
                                        <li>Lead Management System with web-to-lead and automated scoring/routing.</li>
                                        <li>Opportunity Management with pipeline analytics and team collaboration.</li>
                                        <li>Product Configuration Engine for SaaS subscriptions and usage-based pricing.</li>
                                        <li>Quote and Contract Management with e-signature integration.</li>
                                        <li>Automated Provisioning via API to cloud infrastructure.</li>
                                        <li>Customer Success Platform with health scoring and usage analytics.</li>
                                        <li>Executive dashboards for MRR, CAC, LTV, and Churn.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="specs">
                                <AccordionTrigger className="text-lg font-semibold">Technical Specifications</AccordionTrigger>
                                <AccordionContent className="p-4 space-y-4">
                                     <div>
                                        <h4 className="font-medium mb-2">Data Model Design</h4>
                                        <p className="text-sm mb-2">Core tables include Lead, Account, Opportunity, Product, Quote, Contract, and Customer Health, extending base ServiceNow tables where appropriate.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Integration Requirements</h4>
                                        <p className="text-sm mb-2">Integrate with marketing automation (e.g., Mailchimp), e-signature (e.g., DocuSign), cloud providers (e.g., AWS/Azure), payment gateways (e.g., Stripe), and support systems.</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="guide">
                                <AccordionTrigger className="text-lg font-semibold">Technical Implementation Guide</AccordionTrigger>
                                <AccordionContent className="p-4 space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Phase 1: Foundation</h4>
                                        <CodeBlock code={techStartupCode.tableBuilder} language="javascript" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Phase 2: Core Processes</h4>
                                        <CodeBlock code={techStartupCode.leadScoring} language="javascript" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Phase 3: Advanced Features</h4>
                                        <CodeBlock code={techStartupCode.productConfig} language="javascript" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Phase 4: Integration</h4>
                                        <CodeBlock code={techStartupCode.provisioning} language="javascript" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>
                    
                    <TabsContent value="manufacturing" className="mt-6 text-center text-gray-500 p-8">
                        Content for GlobalManufacturing B2B Commerce coming soon.
                    </TabsContent>
                    <TabsContent value="health" className="mt-6 text-center text-gray-500 p-8">
                        Content for HealthSystem Medical Equipment Sales coming soon.
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    );
}
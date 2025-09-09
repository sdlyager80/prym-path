import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Zap } from 'lucide-react';
import CodeBlock from '../components/setup/CodeBlock';

const platformArchitecture = {
    fundamental: [
        { aspect: 'Architecture', salesforce: 'Multi-tenant, shared infrastructure', servicenow: 'Single-tenant instances with shared platform' },
        { aspect: 'Deployment Model', salesforce: 'Orgs within shared tenancy', servicenow: 'Dedicated instances per customer' },
        { aspect: 'Customization Scope', salesforce: 'Namespace-based packages', servicenow: 'Application scopes within instance' },
        { aspect: 'Data Model', salesforce: 'Objects with standard/custom fields', servicenow: 'Tables with inheritance hierarchy' },
        { aspect: 'Security Model', salesforce: 'Profiles + Permission Sets', servicenow: 'Roles + Access Control Lists (ACLs)' },
    ],
    devEnv: [
        { salesforce: 'Developer Console', servicenow: 'Studio IDE', diff: 'ServiceNow provides more integrated development experience' },
        { salesforce: 'Apex Classes', servicenow: 'Script Includes', diff: "ServiceNow uses JavaScript vs Salesforce's Java-like Apex" },
        { salesforce: 'Triggers', servicenow: 'Business Rules', diff: 'ServiceNow business rules are more flexible and configurable' },
        { salesforce: 'Lightning Components', servicenow: 'UI Pages/Widgets', diff: 'Different component architectures and frameworks' },
        { salesforce: 'SOQL', servicenow: 'GlideRecord API', diff: "ServiceNow's query syntax is more object-oriented" },
    ]
};

const dataModel = {
    coreStructures: [
        { sf: 'Objects', sn: 'Tables', notes: 'ServiceNow tables can extend other tables (inheritance)' },
        { sf: 'Records', sn: 'Records', notes: 'Same concept, different APIs for manipulation' },
        { sf: 'Fields', sn: 'Fields/Columns', notes: 'ServiceNow offers more field types and configurations' },
        { sf: 'Standard Objects', sn: 'Base System Tables', notes: 'ServiceNow has richer out-of-box data model' },
        { sf: 'Custom Objects', sn: 'Custom Tables', notes: 'ServiceNow custom tables can extend system tables' },
        { sf: 'Junction Objects', sn: 'Many-to-Many Tables', notes: 'Similar concept, different implementation approach' },
    ],
    relationships: [
        { sf: 'Lookup Relationships', sn: 'Reference Fields', notes: 'Direct equivalent, similar functionality' },
        { sf: 'Master-Detail', sn: 'Reference Fields with ACLs', notes: 'ServiceNow uses ACLs to control cascade behavior' },
        { sf: 'Hierarchical Relationships', sn: 'Parent Field + Tree Structure', notes: 'ServiceNow has built-in hierarchy support' },
        { sf: 'Many-to-Many', sn: 'M2M Tables or Related Lists', notes: 'Multiple implementation options in ServiceNow' },
    ]
};

const codeExamples = {
    recordCreation: {
        salesforce: `// Salesforce Apex
Account acc = new Account();
acc.Name = 'Test Account';
acc.Industry = 'Technology';
insert acc;`,
        servicenow: `// ServiceNow JavaScript
var gr = new GlideRecord('core_company');
gr.initialize();
gr.name = 'Test Account';
gr.industry = 'Technology';
gr.insert();`
    },
    queryingRecords: {
        salesforce: `// Salesforce SOQL
List<Account> accounts = [SELECT Id, Name, Industry 
                         FROM Account 
                         WHERE Industry = 'Technology' 
                         LIMIT 10];`,
        servicenow: `// ServiceNow GlideRecord
var gr = new GlideRecord('core_company');
gr.addQuery('industry', 'Technology');
gr.setLimit(10);
gr.query();
while (gr.next()) {
    // Process each record
    gs.info('Company: ' + gr.name);
}`
    }
};

export default function SkillsMapPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Zap className="w-8 h-8 text-purple-600" />
                        Salesforce to ServiceNow Skills Map
                    </h1>
                    <p className="text-gray-600 mt-2">A comprehensive reference for translating your Salesforce expertise to ServiceNow.</p>
                </div>

                <Tabs defaultValue="platform" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <TabsTrigger value="platform">Platform</TabsTrigger>
                        <TabsTrigger value="data">Data Model</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="automation">Automation</TabsTrigger>
                        <TabsTrigger value="ui">UI/UX</TabsTrigger>
                        <TabsTrigger value="crm">CRM Mapping</TabsTrigger>
                    </TabsList>

                    <TabsContent value="platform" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Platform Architecture Comparison</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible defaultValue="item-1">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-lg font-semibold">Fundamental Differences</AccordionTrigger>
                                        <AccordionContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Aspect</TableHead>
                                                        <TableHead>Salesforce</TableHead>
                                                        <TableHead>ServiceNow</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {platformArchitecture.fundamental.map((item, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium">{item.aspect}</TableCell>
                                                            <TableCell>{item.salesforce}</TableCell>
                                                            <TableCell>{item.servicenow}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-lg font-semibold">Development Environment</AccordionTrigger>
                                        <AccordionContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Salesforce</TableHead>
                                                        <TableHead>ServiceNow</TableHead>
                                                        <TableHead>Key Differences</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {platformArchitecture.devEnv.map((item, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium">{item.salesforce}</TableCell>
                                                            <TableCell>{item.servicenow}</TableCell>
                                                            <TableCell>{item.diff}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="data" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Model & Objects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible defaultValue="item-1">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-lg font-semibold">Core Data Structures</AccordionTrigger>
                                        <AccordionContent>
                                            <Table>
                                                <TableHeader><TableRow><TableHead>Salesforce Concept</TableHead><TableHead>ServiceNow Equivalent</TableHead><TableHead>Notes</TableHead></TableRow></TableHeader>
                                                <TableBody>
                                                    {dataModel.coreStructures.map((item, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium">{item.sf}</TableCell>
                                                            <TableCell>{item.sn}</TableCell>
                                                            <TableCell>{item.notes}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                     <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-lg font-semibold">Relationships</AccordionTrigger>
                                        <AccordionContent>
                                            <Table>
                                                <TableHeader><TableRow><TableHead>Salesforce</TableHead><TableHead>ServiceNow</TableHead><TableHead>Considerations</TableHead></TableRow></TableHeader>
                                                <TableBody>
                                                    {dataModel.relationships.map((item, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium">{item.sf}</TableCell>
                                                            <TableCell>{item.sn}</TableCell>
                                                            <TableCell>{item.notes}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                     <TabsContent value="automation" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Automation: Code Examples</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible defaultValue="item-1">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-lg font-semibold">Record Creation</AccordionTrigger>
                                        <AccordionContent className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Salesforce Apex</h4>
                                                <CodeBlock code={codeExamples.recordCreation.salesforce} language="apex" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">ServiceNow JavaScript</h4>
                                                <CodeBlock code={codeExamples.recordCreation.servicenow} language="javascript" />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-lg font-semibold">Querying Records</AccordionTrigger>
                                        <AccordionContent className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-medium mb-2">Salesforce SOQL</h4>
                                                <CodeBlock code={codeExamples.queryingRecords.salesforce} language="sql" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">ServiceNow GlideRecord</h4>
                                                <CodeBlock code={codeExamples.queryingRecords.servicenow} language="javascript" />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                         <div className="text-center p-8 text-gray-500">Security content coming soon.</div>
                    </TabsContent>
                     <TabsContent value="ui">
                         <div className="text-center p-8 text-gray-500">UI/UX content coming soon.</div>
                    </TabsContent>
                     <TabsContent value="crm">
                         <div className="text-center p-8 text-gray-500">CRM Mapping content coming soon.</div>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    );
}
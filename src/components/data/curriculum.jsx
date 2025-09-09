export const curriculum = [
  {
    id: "module-1",
    title: "Module 1: Platform Fundamentals & Salesforce Comparison",
    duration: "2 weeks (20 hours)",
    prerequisites: "Salesforce experience (Admin/Developer level)",
    learningObjectives: "Understand core ServiceNow platform concepts through Salesforce lens",
    weeks: [
      {
        id: "module-1-week-1",
        title: "Week 1: Architecture & Data Model Comparison",
        days: [
          {
            id: "module-1-week-1-day-1",
            title: "Day 1: Platform Architecture Deep-Dive",
            exercises: [
              {
                id: "m1-w1-d1-ex1",
                type: "session",
                title: "Session 1.1: Architecture Comparison",
                duration_hours: 2,
                content: `
SALESFORCE MINDSET → SERVICENOW REALITY

**Multi-tenant Orgs → Single-tenant Instances**
- **Salesforce:** Shared infrastructure, namespace isolation
- **ServiceNow:** Dedicated instance, complete customization freedom
- **Migration Impact:** More flexibility, different scaling considerations

**Metadata vs Configuration**
- **Salesforce:** Metadata API, version control challenges
- **ServiceNow:** Update sets, integrated change management
- **Developer Impact:** Easier deployment, better change tracking

**Governor Limits vs Performance Considerations**
- **Salesforce:** Hard limits (SOQL queries, DML operations)
- **ServiceNow:** Performance guidelines, transaction timeouts
- **Code Impact:** Different optimization strategies needed
                `
              },
              {
                id: "m1-w1-d1-ex2",
                type: "exercise",
                title: "Hands-On Exercise 1.1: Instance Exploration",
                duration_hours: 0.75,
                content: `
**Task:** Compare Salesforce org to ServiceNow instance
1. Log into provided ServiceNow instance
2. Navigate equivalent of Setup → System Definition
3. Create comparison chart:

| Salesforce Setup Menu | ServiceNow Equivalent | Key Differences |
|---|---|---|
| Object Manager | Tables & Columns | Inheritance model |
| Users | User Administration | Role-based security |
| Profiles | Roles | Hierarchical inheritance |
| Custom Settings | System Properties | More granular control |
                `
              },
              {
                id: "m1-w1-d1-ex3",
                type: "session",
                title: "Session 1.2: Data Model Fundamentals",
                duration_hours: 2,
                content: `
OBJECT → TABLE THINKING

**Salesforce Objects vs ServiceNow Tables**
- Standard Objects → Base System Tables
- Custom Objects → Extended Tables
- Junction Objects → Many-to-Many Tables

**Key Concept: Table Inheritance**
- Unlike Salesforce: Tables can extend other tables
- Inherits all fields from parent table
- Adds specialized fields for specific use case
- Example: \`task\` table extended by \`incident\`, \`problem\`, \`change\`

**Field Types Evolution**
- Salesforce Formula Fields → ServiceNow Calculated Fields
- Salesforce Lookup/Master-Detail → ServiceNow Reference Fields
- Salesforce Picklists → ServiceNow Choice Lists
- Salesforce Auto-Number → ServiceNow Display Rules
                `
              },
              {
                id: "m1-w1-d1-ex4",
                type: "exercise",
                title: "Practical Exercise 1.2: Data Model Mapping",
                duration_hours: 1.5,
                content: `
**Scenario:** Map Salesforce Sales Cloud to ServiceNow structure. Your Mission is to create the ServiceNow equivalent of Salesforce Sales objects.

**Salesforce Objects to Map:**
- Account → ?
- Contact → ?
- Lead → ?
- Opportunity → ?
- Quote → ?

**Instructions:**
1. Identify appropriate ServiceNow base tables to extend.
2. Determine an inheritance strategy.
3. Map the field types.
4. Design the relationship structure between the new tables.

**Deliverable:** A data model diagram illustrating the table inheritance and relationships.
                `
              }
            ]
          },
          {
            id: "module-1-week-1-day-2",
            title: "Day 2: Security Model Translation",
            exercises: [
              {
                id: "m1-w1-d2-ex1",
                type: "session",
                title: "Session 2.1: From Profiles to Roles",
                duration_hours: 2,
                content: `
SECURITY MODEL REVOLUTION

**Salesforce Security Stack:**
Profiles (Object/Field permissions) + Permission Sets (Additive permissions) + Sharing Rules (Record access) + Role Hierarchy (Data visibility)

**ServiceNow Security Stack:**
Roles (Hierarchical inheritance) + ACLs (Script-based permissions) + Domain Separation (Data isolation) + Field-level Security (Granular control)

**Key Differences:**
1. ServiceNow roles inherit permissions from other roles they contain (cascading effect).
2. ACLs (Access Control Lists) can use scripts for powerful, dynamic security rules.
3. Field-level security is managed granularly via ACLs.
4. Domain separation allows for multi-tenant behavior within a single instance.
                `
              },
              {
                id: "m1-w1-d2-ex2",
                type: "exercise",
                title: "Exercise 2.1: Security Model Design",
                duration_hours: 2,
                content: `
**Challenge:** Design the ServiceNow security model for a sales organization.

**Requirements:**
- Sales Reps: Can see their own accounts and accounts owned by their team members.
- Sales Managers: Can see all accounts within their region and for all their direct reports.
- Sales Directors: Can see all accounts within their entire division.
- Executives: Can see everything.

**Salesforce Approach (for your reference):**
- A base Profile for account access.
- Role Hierarchy for vertical data visibility.
- Sharing Rules for team-based access.
- Manual Sharing for one-off exceptions.

**Your ServiceNow Approach (to design):**
1. Design a role hierarchy (e.g., \`sales_exec\` contains \`sales_director\`, which contains \`sales_manager\`, etc.).
2. Plan the ACL conditions (e.g., a read ACL on the Account table that checks if \`gs.getUserID()\` is the account owner or if the user has the \`sales_manager\` role and the owner is in their team).
3. Document the key differences in implementation compared to the Salesforce approach.
                `
              }
            ]
          },
          {
            id: "module-1-week-1-day-3",
            title: "Day 3: Scripting Language Transition",
            exercises: [
               {
                id: "m1-w1-d3-ex1",
                type: "session",
                title: "Session 3.1: From Apex to JavaScript",
                duration_hours: 3,
                content: `
CODE LANGUAGE EVOLUTION: Apex → JavaScript

**Key Differences:**
1. **Language:** ServiceNow server-side logic uses JavaScript, not a proprietary language like Apex.
2. **Execution:** JavaScript is interpreted, meaning no compile-time checking for errors as in Apex.
3. **Debugging:** Different debugging tools and approaches (e.g., \`gs.log()\` vs \`System.debug()\`).

**Common Patterns Translation:**
- **Apex Trigger** → **ServiceNow Business Rule:** Server-side logic that runs on database operations.
- **Apex Class** → **ServiceNow Script Include:** Reusable libraries of code, similar to utility classes.
- **SOQL Query** → **GlideRecord API:** ServiceNow's object-oriented API for database queries.
- **DML Operations** → **GlideRecord CRUD Methods:** (\`insert()\`, \`update()\`, \`deleteRecord()\`).
                `
              },
              {
                id: "m1-w1-d3-ex2",
                type: "exercise",
                title: "Coding Exercise 3.1: Apex to ServiceNow Translation",
                duration_hours: 1.5,
                content: "Challenge: Convert the following Apex trigger logic to a ServiceNow business rule.",
                codeBlocks: [
                  {
                    title: "Original Salesforce Apex Trigger",
                    language: "apex",
                    code: `trigger AccountTrigger on Account (before insert, before update) {
    for (Account acc : Trigger.new) {
        if (acc.Industry == 'Technology' && acc.AnnualRevenue > 1000000) {
            acc.Priority__c = 'High';
            acc.Account_Manager__c = getTopPerformer(); // Assumes helper method exists
        }
        
        if (acc.Phone == null || acc.Phone == '') {
            acc.addError('Phone number is required for all accounts');
        }
    }
}`
                  },
                  {
                    title: "Your ServiceNow Conversion (Business Rule)",
                    language: "javascript",
                    code: `// Table: core_company
// When: before insert, before update

(function executeRule(current, previous) {
    
    // Your JavaScript conversion here
    if (current.industry == 'technology' && current.revenue > 1000000) {
        current.priority = '1'; // Assuming '1' is the value for High
        // To call a function, it must be in a Script Include
        // current.account_manager = new SalesUtils().getTopPerformer();
    }
    
    if (current.phone.nil()) {
        gs.addErrorMessage('Phone number is required for all accounts');
        current.setAbortAction(true); // Stops the database action
    }
    
})(current, previous);`
                  }
                ]
              }
            ]
          },
          {
            id: "module-1-week-1-day-4",
            title: "Day 4: User Interface Philosophy",
             exercises: [
              {
                id: "m1-w1-d4-ex1",
                type: "session",
                title: "Session 4.1: From Lightning to ServiceNow UI",
                duration_hours: 2,
                content: `
UI FRAMEWORK EVOLUTION

- **Page Layouts** → **Form Designers:** Drag-and-drop interface for arranging fields on a form.
- **Lightning Components** → **UI Pages/Widgets:** Building blocks for custom interfaces.
- **Lightning App Builder** → **UI Builder / Page Designer:** Tools for creating portal pages.

**Key Philosophy Differences:**
1. **ServiceNow:** Prefers configuration over deep customization for core forms.
2. **Unified Experience:** ServiceNow aims for a consistent UI across all its applications.
3. **Form Logic:** In ServiceNow, dynamic form behavior is controlled by UI Policies (no-code) and Client Scripts (code).

**Form Design Comparison:**
- **Salesforce:** Page Layout + Record Types + Field Dependencies
- **ServiceNow:** Form Layout + UI Policies (for visibility/readonly/mandatory) + Client Scripts (for complex logic)
                `
              },
               {
                id: "m1-w1-d4-ex2",
                type: "exercise",
                title: "UI Design Exercise 4.1: Lightning to ServiceNow Forms",
                duration_hours: 2,
                content: `
**Challenge:** Recreate a dynamic Salesforce page layout in ServiceNow.

**Original Lightning Page Requirements:**
- An Account form with multiple sections (e.g., 'Account Details', 'Billing Information').
- Certain fields should only appear if the 'Account Type' is 'Customer'.
- Some fields become mandatory if the 'Stage' is 'Prospecting'.
- Related lists for Contacts and Opportunities must be visible.

**Your ServiceNow Implementation Plan:**
1. Use the **Form Designer** to create the sections and arrange the fields.
2. Create a **UI Policy** with the condition 'Type IS Customer' to show/hide the relevant fields.
3. Create another **UI Policy** with the condition 'Stage IS Prospecting' to make other fields mandatory.
4. Configure the **Related Lists** at the bottom of the form definition.

**Deliverable:** A working ServiceNow Account form that has equivalent dynamic functionality to the Salesforce page layout.
                `
              }
            ]
          }
        ]
      },
      {
        id: "module-1-week-2",
        title: "Week 2: Development Environment & Tools",
        days: [
           {
            id: "module-1-week-2-day-5",
            title: "Day 5: Development Tools Comparison",
            exercises: [
              {
                id: "m1-w2-d5-ex1",
                type: "session",
                title: "Session 5.1: Developer Console vs Studio",
                duration_hours: 2,
                content: `
DEVELOPMENT ENVIRONMENT TRANSITION

The **ServiceNow Studio IDE** is the equivalent of the Salesforce Developer Console and more. It's a true Integrated Development Environment.

**Key ServiceNow Developer Tools:**
1. **Studio:** The central IDE for application development. All application files (Business Rules, Script Includes, Tables, etc.) are created and edited here.
2. **Script Debugger:** Allows for setting breakpoints and stepping through server-side code, similar to the Developer Console's debugger.
3. **Application Explorer:** A navigation pane within the main UI to see all files associated with an application.
4. **Update Set Manager:** The tool for managing "Update Sets," which are ServiceNow's equivalent of "Change Sets" for deploying customizations.
                `
              },
               {
                id: "m1-w2-d5-ex2",
                type: "exercise",
                title: "Exercise 5.1: Development Environment Setup",
                duration_hours: 1,
                content: `
**Hands-On Setup:**
1. In your Personal Developer Instance (PDI), navigate to "System Applications" > "Studio".
2. Click "Create Application" to start the wizard for a new scoped application. This is equivalent to creating a new package or project.
3. Once inside Studio, explore the "File" menu and the "Create Application File" button. Compare the file types available to the options in Salesforce's Developer Console.
4. Practice navigating between different application files using the application explorer on the left.
                `
              },
              {
                id: "m1-w2-d5-ex3",
                type: "session",
                title: "Session 5.2: Debugging and Testing",
                duration_hours: 2,
                content: `
DEBUGGING EVOLUTION

**Salesforce Debug Logs → ServiceNow System Logs:**
ServiceNow provides real-time log monitoring via "System Logs" > "All". You can add filters and search for specific messages logged using \`gs.log()\` or \`gs.info()\`.

**Testing Approaches:**
- **Salesforce Test Classes → ServiceNow ATF (Automated Test Framework):** The biggest difference is that ATF is a "no-code" testing framework. You build tests by stringing together visual steps like "Open a Form", "Set Field Values", "Click a UI Action", and "Validate Results". This allows for creating robust regression tests without writing any test code.
                `
              }
            ]
          },
          {
            id: "module-1-week-2-day-6",
            title: "Day 6: Change Management and Deployment",
            exercises: [
              {
                id: "m1-w2-d6-ex1",
                type: "session",
                title: "Session 6.1: From Change Sets to Update Sets",
                duration_hours: 3,
                content: `
DEPLOYMENT STRATEGY TRANSFORMATION

**Salesforce Change Management:**
Change Sets → Validation → Deployment → Manual post-deploy verification.

**ServiceNow Change Management:**
Update Sets → Preview (to check for conflicts) → Commit → Automatic application of changes.

**Key Advantages of Update Sets:**
1. **Automatic Capture:** As you make configuration changes in your development instance, they are automatically added to your *current* Update Set.
2. **Conflict Resolution:** Before committing an update set in the target instance, you can preview it to see if it will overwrite any newer changes. You can then choose how to resolve the conflict.
3. **Easy Rollback:** Every Update Set that is committed can be backed out from the target instance.
                `
              },
               {
                id: "m1-w2-d6-ex2",
                type: "exercise",
                title: "Exercise 6.1: Deployment Simulation",
                duration_hours: 2,
                content: `
**Challenge:** Deploy a customization using update sets.

**Scenario:** Create and deploy an enhancement to the Account (core_company) table.

1.  **In Dev:** Navigate to "Local Update Sets" and create a new one named "Account Enhancements". Make it your current update set.
2.  **In Dev:** Make customizations: add a new field to the \`core_company\` table, modify the form layout, and create a simple business rule. Verify these changes are captured in your update set.
3.  **In Dev:** Set the state of the update set to "Complete". Export it to an XML file.
4.  **In QA/Target:** Navigate to "Retrieved Update Sets". Import the XML file.
5.  **In QA/Target:** Preview the update set to check for conflicts.
6.  **In QA/Target:** Commit the update set and verify your changes are now live.
7.  **Document:** Write down the key differences you observed compared to deploying a Salesforce Change Set.
                `
              }
            ]
          },
          {
            id: "module-1-week-2-day-7",
            title: "Day 7: Integration Patterns",
            exercises: [
               {
                id: "m1-w2-d7-ex1",
                type: "session",
                title: "Session 7.1: API and Integration Comparison",
                duration_hours: 3,
                content: `
INTEGRATION EVOLUTION

- **REST/SOAP APIs:** Both platforms have robust support.
- **Outbound Messages → Business Rule + REST Message:** A ServiceNow business rule can trigger a "REST Message" to send data to an external system.
- **Platform Events → Event Management / Business Rules:** ServiceNow can publish and consume events, often orchestrated with business rules or Flow Designer.

**ServiceNow Integration Advantages:**
1. **Built-in REST Table API:** Every table in ServiceNow automatically has a full CRUD REST API available at \`/api/now/table/{tableName}\`. No custom Apex class needed.
2. **MID Server:** A lightweight Java application that runs on a server in your local network. It allows your ServiceNow instance in the cloud to securely communicate with on-premise resources (databases, servers) behind your firewall.
3. **Integration Hub:** A low-code/no-code framework with pre-built "spokes" for common integrations (e.g., Slack, Jira, Microsoft Teams).
                `
              },
               {
                id: "m1-w2-d7-ex2",
                type: "exercise",
                title: "Integration Exercise 7.1: API Comparison",
                duration_hours: 3,
                content: `
**Challenge:** Compare Salesforce and ServiceNow API approaches for querying Account data.

**Task 1: Salesforce REST API (Review)**
- Recall the endpoint for a SOQL query via the REST API.
- Recall the authentication flow (OAuth 2.0).
- Example: \`/services/data/vXX.X/query?q=SELECT+Id,Name+FROM+Account\`

**Task 2: ServiceNow REST API (Exploration)**
- Use a REST client (like Postman) to explore the Table API for the \`core_company\` table.
- The endpoint will be \`https://{your-instance}.service-now.com/api/now/table/core_company\`.
- Use Basic Auth (your admin username/password) for simplicity in your PDI.
- Try adding query parameters like \`sysparm_query=industry=technology^ORDERBYname\` and \`sysparm_limit=10\`.

**Task 3: Side-by-Side Comparison**
- Create a chart comparing the ease of use, query syntax, and authentication for this basic task.
- Document the steps needed in Salesforce (create a Connected App) vs. ServiceNow (it's just enabled by default).
                `
              },
              {
                id: "m1-w2-d7-ex3",
                type: "assessment",
                title: "Module 1 Assessment: Comprehensive Comparison Project",
                duration_hours: 4,
                content: `
**Scenario:** Your company is evaluating ServiceNow as a potential Salesforce replacement, and you have been tasked with presenting the technical capabilities.

**Your Role:** Technical Architect.

**Deliverables:**
1. **Architecture Comparison Presentation:** A slide deck comparing the two platforms on architecture, data model, security, and deployment.
2. **Data Model Migration Plan:** A document outlining how you would map key Sales Cloud objects (Account, Contact, Opportunity) to ServiceNow tables.
3. **Security Model Translation:** A plan for how to replicate your existing Salesforce role hierarchy and sharing model using ServiceNow Roles and ACLs.
4. **Integration Strategy Document:** An assessment of your top 3 current integrations and a plan for migrating them to ServiceNow.

**Evaluation Criteria:**
- **40%:** Accurate understanding of ServiceNow concepts.
- **30%:** Clear translation from Salesforce concepts.
- **20%:** Practical migration considerations are addressed.
- **10%:** Professional quality of documents.
                `
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "Module 2: Sales Process Automation & Workflow Design",
    duration: "2 weeks (20 hours)",
    prerequisites: "Module 1",
    learningObjectives: "Build a complete sales automation system in ServiceNow by converting Salesforce automation patterns.",
    weeks: [
        {
            id: "module-2-week-3",
            title: "Week 3: Automation Framework Translation",
            days: [
                {
                    id: "m2-w3-d8",
                    title: "Day 8: From Process Builder to Flow Designer",
                    exercises: [
                        {
                            id: "m2-w3-d8-ex1",
                            type: "session",
                            title: "Session 8.1: Automation Philosophy",
                            duration_hours: 2,
                            content: `
AUTOMATION EVOLUTION

**Salesforce Automation Stack (in order of preference):**
Flow → Process Builder → Workflow Rules → Apex Triggers

**ServiceNow Automation Stack:**
Flow Designer → Business Rules → Workflow Engine (legacy) → Script Includes

**Key Paradigm Shifts:**
1. **Visual First:** ServiceNow's **Flow Designer** is the modern, visual tool for building complex, multi-step automations, much like Salesforce Flow.
2. **Integrated Approvals:** Approval steps are a native part of Flow Designer, simplifying complex approval processes.
3. **Business Rules for Granular Control:** Business Rules are still heavily used for simple, direct actions on a single table (e.g., "when this field changes, set that field"). Think of them as a lightweight, powerful trigger.
                            `
                        },
                        {
                            id: "m2-w3-d8-ex2",
                            type: "exercise",
                            title: "Exercise 8.1: Process Builder Migration",
                            duration_hours: 2.5,
                            content: `
**Challenge:** Convert a Salesforce Process Builder process to a ServiceNow Flow Designer flow.

**Original Salesforce Process:**
- **Trigger:** An Opportunity's Stage changes to "Closed Won".
- **Action 1:** Create a Renewal Opportunity record for 1 year in the future.
- **Action 2:** Send a congratulations email notification to the Opportunity owner.
- **Action 3:** Update the related Account's "Type" field to "Customer".
- **Action 4:** Create a follow-up Task for the Account Manager.

**Your ServiceNow Flow Conversion:**
1. Create a new Flow in **Flow Designer**.
2. Set the **Trigger** to "Record Updated" on the Opportunity table, with a condition for Stage changing to "Closed Won".
3. Add an **Action** to "Create Record" for the renewal Opportunity.
4. Add an **Action** to "Send Email".
5. Add an **Action** to "Update Record" for the parent Account.
6. Add another **Action** to "Create Record" for the Task.
                            `
                        }
                    ]
                },
                {
                    id: "m2-w3-d9",
                    title: "Day 9: Advanced Business Rules",
                    exercises: [
                        {
                            id: "m2-w3-d9-ex1",
                            type: "session",
                            title: "Session 9.1: From Apex Triggers to Business Rules",
                            duration_hours: 3,
                            content: `
TRIGGER LOGIC EVOLUTION

**Apex Trigger Patterns → ServiceNow Business Rule Patterns:**
- **Before Insert/Update** → **"Before" Business Rules:** Run before the database action. Good for validation and modifying values on the current record.
- **After Insert/Update** → **"After" Business Rules:** Run after the database action. Good for updating related records.
- **Async Execution** → **"Async" Business Rules:** Run in the background after the record is saved. Good for calling integrations or intensive calculations.

**Error Handling:**
- In Apex: \`record.addError('message')\`
- In a "Before" Business Rule: \`current.setAbortAction(true); gs.addErrorMessage('message');\`
                            `
                        },
                        {
                            id: "m2-w3-d9-ex2",
                            type: "exercise",
                            title: "Advanced Exercise 9.1: Complex Business Logic Migration",
                            duration_hours: 3,
                            content: `
**Challenge:** Deconstruct a complex Apex trigger and plan its migration to ServiceNow.

**Original Apex Logic:**
- A trigger on Lead conversion that performs custom logic.
- It assigns the new Account to a territory based on multiple criteria (industry, location, size).
- It creates a standardized Opportunity.
- It calculates a potential commission and stores it on a related object.

**Your ServiceNow Implementation Plan:**
1. **Lead Conversion:** Use a UI Action (a button) on the Lead form to trigger the process.
2. **Script Include:** Create a \`LeadConversionUtils\` Script Include to hold the complex logic.
3. **Territory Assignment:** The utility will contain the function to determine the territory.
4. **Record Creation:** The utility will use GlideRecord to create the Account, Contact, and Opportunity records.
5. **Business Rule:** An "After" business rule on the Opportunity table could then trigger the commission calculation.
                            `
                        }
                    ]
                },
                {
                    id: "m2-w3-d10",
                    title: "Day 10: Client-Side Automation",
                    exercises: [
                        {
                            id: "m2-w3-d10-ex1",
                            type: "session",
                            title: "Session 10.1: From LWC to Client Scripts",
                            duration_hours: 2,
                            content: `
CLIENT-SIDE EVOLUTION

While Service Portal widgets are the equivalent of LWCs for building pages, **Client Scripts** and **UI Policies** are the primary tools for dynamic form behavior.

- **UI Policies:** NO-CODE. Used for simple show/hide, mandatory, and read-only logic based on field values. (e.g., "If Category is 'Hardware', show the 'Asset Tag' field").
- **Client Scripts:** CODE. Used for more complex logic on the form.

**Common Client Script Types:**
- **onLoad:** Runs when the form loads.
- **onChange:** Runs when a specific field's value changes.
- **onSubmit:** Runs when the form is submitted. Good for final validation.

**Communicating with the Server:**
- **LWC with \`@wire\` or Apex call** → **Client Script with \`GlideAjax\`:** GlideAjax is the standard way for a client script to securely call a server-side Script Include to fetch data or perform a calculation without reloading the page.
                            `
                        },
                        {
                            id: "m2-w3-d10-ex2",
                            type: "exercise",
                            title: "Exercise 10.1: Replicating Dynamic Form Logic",
                            duration_hours: 2,
                            content: `
**Challenge:** Convert Lightning Component functionality to ServiceNow form logic.

**Original Lightning Component Functionality:**
- When a user selects an Account on an Opportunity, the component calls Apex to get the Account's "Billing Address" and automatically populates the Opportunity's "Shipping Address" with it.

**Your ServiceNow Client Script Implementation:**
1. Create a **Script Include** named \`AccountUtils\` with a function like \`getBillingAddress(accountId)\`. Make sure it's "Client-callable".
2. This function will take an account sys_id, query the \`core_company\` table, and return the address.
3. Create an **\`onChange\` Client Script** on the Opportunity table that runs when the "Account" field changes.
4. In the script, create a \`GlideAjax\` call to your \`AccountUtils\` script include.
5. In the callback function, use \`g_form.setValue('shipping_address', response.answer);\` to set the address on the form.
                            `
                        }
                    ]
                }
            ]
        },
        {
            id: "module-2-week-4",
            title: "Week 4: Complete Sales Process Implementation",
            days: [
                {
                    id: "m2-w4-d11",
                    title: "Day 11-12: Lead Management System",
                    exercises: [
                        {
                            id: "m2-w4-d11-ex1",
                            type: "project",
                            title: "Major Exercise 11.1: Complete Lead System Build",
                            duration_hours: 4,
                            content: `
**Project:** Build an end-to-end lead management system in a scoped application.

**Components to Build:**
1. **Lead Table:** Create a new table \`x_prym_lead\` that extends the \`task\` table. Add fields for Lead Source, Status, Industry, etc.
2. **Lead Scoring:** Create a "before" Business Rule that calculates a score based on lead source and industry.
3. **Web Form:** Create a Record Producer that allows unauthenticated users to create a lead from the Service Portal (web-to-lead).
4. **Conversion Logic:** Create a "Qualified" UI Action (button) on the lead form. When clicked, it should trigger a Script Include that:
    - Creates an Account and Contact.
    - Creates an Opportunity linked to the new Account.
    - Sets the Lead state to "Converted".
5. **Dashboard:** Create a simple dashboard showing leads by status and source.
                            `
                        }
                    ]
                },
                {
                    id: "m2-w4-d13",
                    title: "Day 13-14: Opportunity Management",
                    exercises: [
                        {
                            id: "m2-w4-d13-ex1",
                            type: "project",
                            title: "Major Exercise 13.1: Opportunity System Build",
                            duration_hours: 4,
                            content: `
**Project:** Build a complete opportunity management system.

**Core Requirements:**
1. **Opportunity Table:** Create an \`x_prym_opportunity\` table extending \`task\`. Add fields for Stage, Amount, Probability, Close Date.
2. **Stage Automation:** Create a "before" Business Rule that automatically sets the "Probability" field based on the selected "Stage".
3. **Forecasting:** Create a calculated field or another business rule to calculate "Forecast Amount" (Amount * Probability).
4. **Win/Loss Logic:** Create UI Actions for "Closed Won" and "Closed Lost". These should lock the record from further edits and update the "Closed Date".
5. **Team Management:** Add a "Sales Team" related list to the form so multiple users can be associated with an opportunity.
                            `
                        }
                    ]
                },
                {
                     id: "m2-w4-d14-ex1",
                     type: "assessment",
                     title: "Module 2 Assessment: Sales Automation Portfolio",
                     duration_hours: 8,
                     content: `
**Challenge:** Build and present a production-ready sales automation system in ServiceNow.

**Requirements:**
1. Demonstrate a complete lead-to-opportunity process.
2. The process must include lead capture, qualification, assignment, and conversion.
3. The opportunity must have automated stage progression and forecasting.
4. The system must include automated approvals for discounts over 25%.
5. The system must generate email notifications for key events (e.g., new lead assignment, opportunity closed).

**Technical Requirements:**
- All work must be in a scoped application.
- Use a combination of Business Rules, Client Scripts, and Flow Designer appropriately.
- Forms must be user-friendly and well-designed.

**Deliverables:**
1. A working application in your ServiceNow PDI.
2. Technical documentation explaining your design choices.
3. A live 15-minute demonstration of the entire process.
                     `
                }
            ]
        }
    ]
  },
  {
      id: "module-3",
      title: "Module 3: Advanced Configuration & Integration",
      duration: "2 weeks (20 hours)",
      prerequisites: "Module 2",
      learningObjectives: "Master enterprise-level customization and system integration.",
      weeks: [
        {
            id: "module-3-week-5",
            title: "Week 5: Advanced Development Patterns",
            days: [
                 {
                    id: "m3-w5-d15",
                    title: "Day 15: Complex Data Relationships",
                    exercises: [
                        {
                            id: "m3-w5-d15-ex1",
                            type: "exercise",
                            title: "Exercise 15.1: Complex Data Model Design",
                            duration_hours: 3,
                            content: `
**Challenge:** Design an enterprise account hierarchy for a global company.

**Requirements:**
- A parent company can have multiple subsidiary companies.
- Each company can operate in multiple geographic regions.
- A contact can have different roles at different subsidiary companies.
- Track historical relationships (e.g., a company was previously owned by a different parent).

**Your Implementation Plan:**
1. **Table Structure:** Use the base \`core_company\` table. Add a "Parent" reference field on the table that points back to itself to create the hierarchy.
2. **Geographic Structure:** Create a custom "Region" table and a many-to-many relationship between Company and Region.
3. **Contact Roles:** Create a custom "Contact Relationship" table that has reference fields to both Contact and Company, along with a "Role" field.
4. **Historical Tracking:** Use a "before" business rule on the Company table. When the "Parent" field changes, create a record in a new "Account History" table to log the change.
                            `
                        }
                    ]
                },
                {
                    id: "m3-w5-d16",
                    title: "Day 16: Advanced Scripting Patterns",
                    exercises: [
                        {
                            id: "m3-w5-d16-ex1",
                            type: "exercise",
                            title: "Exercise 16.1: Advanced Script Development",
                            duration_hours: 3,
                            content: `
**Challenge:** Build a reusable utility library (Script Include) for your sales application.

**Components to Create:**
- Create a new **Script Include** named \`SalesUtils\`.
- **Function 1: \`getTerritoryForAccount(accountGR)\`:** Takes a GlideRecord object for an account and returns the sys_id of the correct territory based on the account's country and industry.
- **Function 2: \`calculateCommission(opportunityGR)\`:** Takes an opportunity GlideRecord and calculates a commission amount based on the opportunity amount and type.
- **Function 3: \`validateData(recordGR)\`:** A generic function that checks for common data quality issues on a record.

**Requirements:**
- The Script Include must be well-documented with comments.
- It should be designed to be called from Business Rules or other server-side scripts.
- It should include proper error handling.
                            `
                        }
                    ]
                },
                {
                    id: "m3-w5-d17",
                    title: "Day 17: Integration Architecture",
                    exercises: [
                         {
                            id: "m3-w5-d17-ex1",
                            type: "exercise",
                            title: "Exercise 17.1: Complete Integration Implementation",
                            duration_hours: 3,
                            content: `
**Challenge:** Implement an integration that syncs customer data with an external system.

**Integration Scenario:**
- When an Account's "Type" is changed to "Customer" in ServiceNow, send the Account's details (Name, ID, Phone) to an external REST endpoint.
- For this exercise, you can use a free public API testing site like Beeceptor or Webhook.site to act as your external system.

**Your Implementation Requirements:**
1. **Create a REST Message:** In ServiceNow, navigate to "System Web Services" > "Outbound" > "REST Message". Create a new record pointing to your test endpoint's URL. Define the POST method.
2. **Create a Business Rule:** Create an "async" business rule on the Account (\`core_company\`) table that triggers when "Type" changes to "Customer".
3. **Script the Business Rule:** In the business rule script, get the REST Message you created. Set the body of the request with the account details (e.g., in JSON format). Execute the REST call.
4. **Add Logging:** Log the request body and the response status from the external system for debugging.
                            `
                        }
                    ]
                }
            ]
        },
        {
            id: "module-3-week-6",
            title: "Week 6: Performance and Production Readiness",
             days: [
                 {
                    id: "m3-w6-d18",
                    title: "Day 18: Performance Optimization",
                    exercises: [
                         {
                            id: "m3-w6-d18-ex1",
                            type: "session",
                            title: "Session 18.1: Enterprise Performance Patterns",
                            duration_hours: 3,
                            content: `
PRODUCTION PERFORMANCE OPTIMIZATION

**Key Areas:**
- **Database Queries:** Inefficient GlideRecord queries are the #1 cause of performance issues. Always filter queries as much as possible. Avoid querying inside a loop.
- **Business Rules:** Avoid "global" business rules (rules without conditions). Ensure the "order" of business rules is logical. Use "async" rules for non-urgent, intensive tasks.
- **Client Scripts:** Avoid making synchronous GlideAjax calls. Minimize server calls from the client.

**ServiceNow Performance Tools:**
- **Slow Queries Log:** See which database queries are taking the longest.
- **Transaction Logs:** Analyze the performance of every transaction in the system.
- **Script Tracer:** A powerful tool to trace the execution of server-side scripts for a transaction.
                            `
                        }
                    ]
                },
                {
                    id: "m3-w6-d19",
                    title: "Day 19: Security and Compliance",
                     exercises: [
                         {
                            id: "m3-w6-d19-ex1",
                            type: "session",
                            title: "Session 19.1: Enterprise Security Implementation",
                            duration_hours: 3,
                            content: `
SECURITY AND COMPLIANCE MASTERY

**ServiceNow Security Framework:**
1. **ACL Scripting:** Go beyond simple conditions. Use script-based ACLs for dynamic security. Example: "A user can only update this opportunity if they are a member of the Sales Team AND the opportunity is still Open."
2. **Domain Separation:** ServiceNow's hard multi-tenancy solution. Data is separated by "domain," and users/processes in one domain cannot see data in another. This is a complex architecture used by Managed Service Providers or large conglomerates.
3. **Field Encryption:** Use "Encryption Contexts" to apply role-based encryption to specific fields.
4. **Audit Log:** The system automatically logs every change to a record in the \`sys_audit\` table, providing a complete audit trail for compliance.
                            `
                        }
                    ]
                },
                {
                    id: "m3-w6-d20",
                    title: "Day 20: Production Deployment",
                     exercises: [
                        {
                            id: "m3-w6-d20-ex1",
                            type: "session",
                            title: "Session 20.1: Deployment and Change Management",
                            duration_hours: 3,
                            content: `
PRODUCTION DEPLOYMENT STRATEGY

**Deployment Best Practices:**
- **Environment Management:** Typically DEV → TEST/QA → PROD. Clones are used to copy PROD data down to sub-production instances.
- **Update Set Management:** Batch related changes into a single named update set. Clone an instance *before* committing large update sets.
- **Automated Testing:** Use the Automated Test Framework (ATF) to create a suite of regression tests that can be run after every deployment to validate core functionality.
                            `
                        },
                        {
                             id: "m3-w6-d20-ex2",
                             type: "assessment",
                             title: "Module 3 Assessment: Enterprise Implementation",
                             duration_hours: 12,
                             content: `
**Challenge:** Design and implement an enterprise-grade solution that enhances your previous sales application.

**Requirements:**
1. **Complex Data Model:** Implement a hierarchical account model.
2. **Advanced Automation:** Build a reusable Script Include library for your core business logic.
3. **External Integration:** Create an integration to sync "Closed Won" opportunities to an external system.
4. **Security:** Implement a scripted ACL to enforce a complex access rule.
5. **Performance:** Identify and optimize one inefficient query or business rule in your application.

**Deliverables:**
1. Your updated, working application in ServiceNow.
2. Architecture document explaining your advanced design patterns.
3. Security assessment report detailing your new ACL.
4. A short write-up of your performance optimization.
5. A live demonstration of the new features.
                             `
                        }
                    ]
                }
            ]
        }
      ]
  }
];
// Mock implementation to remove Base44 dependencies

// Mock data storage
const mockData = {
  skillMappings: [
    {
      id: '1',
      salesforce_skill: 'Apex Classes',
      servicenow_equivalent: 'Script Includes',
      similarity_level: 'similar',
      transition_notes: 'Both are reusable code libraries, but ServiceNow uses JavaScript instead of Apex',
      priority: 1
    },
    {
      id: '2',
      salesforce_skill: 'Lightning Components',
      servicenow_equivalent: 'UI Pages/Widgets',
      similarity_level: 'different',
      transition_notes: 'Different frameworks and approaches, requires significant learning',
      priority: 2
    },
    {
      id: '3',
      salesforce_skill: 'Process Builder',
      servicenow_equivalent: 'Flow Designer',
      similarity_level: 'direct',
      transition_notes: 'Very similar visual workflow tools with drag-and-drop interfaces',
      priority: 3
    },
    {
      id: '4',
      salesforce_skill: 'SOQL',
      servicenow_equivalent: 'GlideRecord',
      similarity_level: 'similar',
      transition_notes: 'Both query data, but GlideRecord uses object-oriented JavaScript syntax',
      priority: 4
    },
    {
      id: '5',
      salesforce_skill: 'Profiles & Permission Sets',
      servicenow_equivalent: 'Roles & ACLs',
      similarity_level: 'similar',
      transition_notes: 'ServiceNow uses role inheritance and script-based access control',
      priority: 5
    }
  ],
  submissions: [],
  assessments: [
    {
      id: 'assess-1',
      title: 'Platform Fundamentals',
      description: 'Test your understanding of core ServiceNow concepts',
      phase: 1,
      week: 1,
      time_limit_minutes: 30,
      passing_score: 70
    },
    {
      id: 'assess-2',
      title: 'Development Basics',
      description: 'Assess your knowledge of ServiceNow development practices',
      phase: 1,
      week: 2,
      time_limit_minutes: 45,
      passing_score: 70
    },
    {
      id: 'assess-3',
      title: 'Sales Process Automation',
      description: 'Evaluate your skills in building sales solutions on ServiceNow',
      phase: 2,
      week: 4,
      time_limit_minutes: 60,
      passing_score: 70
    }
  ],
  assessmentQuestions: [
    {
      id: 'q-1-1',
      assessment_id: 'assess-1',
      question_text: 'What is the ServiceNow equivalent of a Salesforce Object?',
      question_type: 'multiple_choice',
      options: ['Table', 'Record', 'Field', 'Form'],
      correct_answers: ['Table'],
      points: 10
    },
    {
      id: 'q-1-2',
      assessment_id: 'assess-1',
      question_text: 'Which of the following are true about ServiceNow instances? (Select all that apply)',
      question_type: 'multiple_select',
      options: [
        'Each customer gets a dedicated instance',
        'Instances share infrastructure like Salesforce orgs',
        'Instances can be cloned for testing',
        'All instances use the same URL'
      ],
      correct_answers: ['Each customer gets a dedicated instance', 'Instances can be cloned for testing'],
      points: 10
    }
  ],
  attempts: []
};

// Mock entity implementations
export const SkillMapping = {
  list: async (orderBy, limit) => {
    let data = [...mockData.skillMappings];
    if (orderBy && orderBy.startsWith('-')) {
      const field = orderBy.substring(1);
      data.sort((a, b) => b[field] - a[field]);
    }
    if (limit) {
      data = data.slice(0, limit);
    }
    return data;
  }
};

export const UserExerciseSubmission = {
  list: async (filters) => {
    if (filters?.status) {
      return mockData.submissions.filter(s => s.status === filters.status);
    }
    return mockData.submissions;
  },
  
  filter: async (filters) => {
    return mockData.submissions.filter(s => 
      Object.entries(filters).every(([key, value]) => s[key] === value)
    );
  },
  
  create: async (data) => {
    const newSubmission = {
      id: `sub-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString()
    };
    mockData.submissions.push(newSubmission);
    return newSubmission;
  }
};

export const Assessment = {
  list: async () => mockData.assessments,
  get: async (id) => mockData.assessments.find(a => a.id === id)
};

export const AssessmentQuestion = {
  filter: async (filters) => {
    return mockData.assessmentQuestions.filter(q => 
      Object.entries(filters).every(([key, value]) => q[key] === value)
    );
  }
};

export const UserAssessmentAttempt = {
  list: async () => mockData.attempts,
  get: async (id) => mockData.attempts.find(a => a.id === id),
  
  create: async (data) => {
    const newAttempt = {
      id: `attempt-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString()
    };
    mockData.attempts.push(newAttempt);
    return newAttempt;
  },
  
  update: async (id, data) => {
    const index = mockData.attempts.findIndex(a => a.id === id);
    if (index !== -1) {
      mockData.attempts[index] = { ...mockData.attempts[index], ...data };
      return mockData.attempts[index];
    }
    return null;
  },
  
  filter: async (filters) => {
    return mockData.attempts.filter(a => 
      Object.entries(filters).every(([key, value]) => a[key] === value)
    );
  }
};

export const User = {
  me: async () => ({
    id: 'user-1',
    email: 'student@example.com',
    name: 'Demo Student'
  })
};
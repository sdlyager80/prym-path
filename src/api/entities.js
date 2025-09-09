import { supabase } from '@/lib/supabase';

// Static data for skills and assessments (could be moved to Supabase tables later)
const staticData = {
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
  ]
};

// Mock implementations for when Supabase is not available
const mockImplementations = {
  SkillMapping: {
    list: async (orderBy, limit) => {
      let data = [...staticData.skillMappings];
      if (orderBy && orderBy.startsWith('-')) {
        const field = orderBy.substring(1);
        data.sort((a, b) => b[field] - a[field]);
      }
      if (limit) {
        data = data.slice(0, limit);
      }
      return data;
    }
  },
  
  UserExerciseSubmission: {
    list: async () => [],
    filter: async () => [],
    create: async (data) => ({ id: `mock-${Date.now()}`, ...data })
  },
  
  Assessment: {
    list: async () => staticData.assessments,
    get: async (id) => staticData.assessments.find(a => a.id === id)
  },
  
  AssessmentQuestion: {
    filter: async (filters) => {
      return staticData.assessmentQuestions.filter(q => 
        Object.entries(filters).every(([key, value]) => q[key] === value)
      );
    }
  },
  
  UserAssessmentAttempt: {
    list: async () => [],
    get: async () => null,
    create: async (data) => ({ id: `mock-${Date.now()}`, ...data }),
    update: async (id, data) => ({ id, ...data }),
    filter: async () => []
  },
  
  User: {
    me: async () => ({ id: 'demo-user', email: 'demo@example.com', name: 'Demo User' })
  }
};

// Entity implementations
export const SkillMapping = {
  list: async (orderBy, limit) => {
    // For now, use static data. Later can move to Supabase table
    return mockImplementations.SkillMapping.list(orderBy, limit);
  }
};

export const UserExerciseSubmission = {
  list: async (filters) => {
    if (!supabase) return mockImplementations.UserExerciseSubmission.list(filters);
    
    try {
      let query = supabase
        .from('exercise_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }
  },
  
  filter: async (filters) => {
    if (!supabase) return mockImplementations.UserExerciseSubmission.filter(filters);
    
    try {
      let query = supabase.from('exercise_submissions').select('*');
      
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error filtering submissions:', error);
      return [];
    }
  },
  
  create: async (data) => {
    if (!supabase) return mockImplementations.UserExerciseSubmission.create(data);
    
    try {
      const user = await User.me();
      if (!user) throw new Error('User not authenticated');
      
      const { data: submission, error } = await supabase
        .from('exercise_submissions')
        .upsert({
          user_id: user.id,
          exercise_id: data.exercise_id,
          status: data.status || 'completed',
          time_spent_minutes: data.time_spent_minutes || 0,
          submission_notes: data.submission_notes
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return submission;
    } catch (error) {
      console.error('Error creating submission:', error);
      throw error;
    }
  }
};

export const Assessment = {
  list: async () => staticData.assessments,
  get: async (id) => staticData.assessments.find(a => a.id === id)
};

export const AssessmentQuestion = {
  filter: async (filters) => {
    return staticData.assessmentQuestions.filter(q => 
      Object.entries(filters).every(([key, value]) => q[key] === value)
    );
  }
};

export const UserAssessmentAttempt = {
  list: async () => {
    if (!supabase) return mockImplementations.UserAssessmentAttempt.list();
    
    try {
      const { data, error } = await supabase
        .from('assessment_attempts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching attempts:', error);
      return [];
    }
  },
  
  get: async (id) => {
    if (!supabase) return mockImplementations.UserAssessmentAttempt.get(id);
    
    try {
      const { data, error } = await supabase
        .from('assessment_attempts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching attempt:', error);
      return null;
    }
  },
  
  create: async (data) => {
    if (!supabase) return mockImplementations.UserAssessmentAttempt.create(data);
    
    try {
      const user = await User.me();
      if (!user) throw new Error('User not authenticated');
      
      const { data: attempt, error } = await supabase
        .from('assessment_attempts')
        .insert({
          user_id: user.id,
          assessment_id: data.assessment_id,
          status: data.status || 'in_progress',
          answers: data.answers || {},
          started_at: data.started_at || new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return attempt;
    } catch (error) {
      console.error('Error creating attempt:', error);
      throw error;
    }
  },
  
  update: async (id, updates) => {
    if (!supabase) return mockImplementations.UserAssessmentAttempt.update(id, updates);
    
    try {
      const { data, error } = await supabase
        .from('assessment_attempts')
        .update({
          ...updates,
          ...(updates.status === 'completed' && !updates.completed_at && {
            completed_at: new Date().toISOString()
          })
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error updating attempt:', error);
      throw error;
    }
  },
  
  filter: async (filters) => {
    if (!supabase) return mockImplementations.UserAssessmentAttempt.filter(filters);
    
    try {
      let query = supabase.from('assessment_attempts').select('*');
      
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error filtering attempts:', error);
      return [];
    }
  }
};

export const User = {
  me: async () => {
    if (!supabase) return mockImplementations.User.me();
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) return null;
      
      // Get profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return {
        id: user.id,
        email: user.email,
        name: profile?.full_name || user.email.split('@')[0]
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }
};
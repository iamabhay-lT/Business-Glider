export interface JobCategoryConfig {
  id: string;
  name: string;
  roles: string[];
  suggestedSkills: string[];
  description: string;
}

export const JOB_CATEGORIES: JobCategoryConfig[] = [
  {
    id: 'it-tech',
    name: 'IT & Technology',
    description: 'Software development, cybersecurity, cloud architecture, and data science',
    roles: [
      'Software Developer',
      'Full Stack Developer',
      'Frontend Developer',
      'Backend Developer',
      'Mobile App Developer (iOS/Android)',
      'Data Analyst / Data Scientist',
      'UI/UX Designer',
      'DevOps Engineer',
      'Cloud Solutions Architect',
      'Cybersecurity Specialist',
      'QA / Automation Engineer',
      'AI / Machine Learning Engineer',
      'Product Manager (Tech)'
    ],
    suggestedSkills: [
      'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Python', 'Java', 'SQL',
      'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Figma', 'Git', 'REST APIs', 'GraphQL'
    ]
  },
  {
    id: 'sales-marketing',
    name: 'Sales & Marketing',
    description: 'Business development, lead generation, digital growth, and advertising',
    roles: [
      'Sales Executive',
      'Business Development Manager',
      'Digital Marketing Specialist',
      'SEO / SEM Specialist',
      'Social Media Manager',
      'Content Strategist',
      'Account Manager',
      'Brand Manager',
      'Direct Sales Representative',
      'Telecaller / Inside Sales'
    ],
    suggestedSkills: [
      'Lead Generation', 'B2B Sales', 'CRM (HubSpot/Salesforce)', 'Google Ads', 'Meta Ads',
      'SEO', 'Email Marketing', 'Cold Calling', 'Negotiation', 'Market Research', 'Copywriting'
    ]
  },
  {
    id: 'finance-accounting',
    name: 'Finance & Accounting',
    description: 'Auditing, taxation, financial planning, investment, and bookkeeping',
    roles: [
      'Accountant',
      'Chartered Accountant (CA)',
      'Financial Analyst',
      'Tax Consultant',
      'Internal Auditor',
      'Payroll Specialist',
      'Investment Banker',
      'Billing / Accounts Payable Executive'
    ],
    suggestedSkills: [
      'TallyPrime', 'SAP FICO', 'QuickBooks', 'Financial Modeling', 'GST Filing', 'Income Tax',
      'Budgeting', 'Advanced Excel', 'Auditing', 'Financial Reporting'
    ]
  },
  {
    id: 'hr-admin',
    name: 'HR & Administration',
    description: 'Talent acquisition, employee engagement, office management, and compliance',
    roles: [
      'HR Executive',
      'Talent Acquisition Specialist',
      'HR Generalist',
      'HR Business Partner (HRBP)',
      'Office Administrator',
      'Executive Assistant',
      'Recruitment Coordinator'
    ],
    suggestedSkills: [
      'Recruiting', 'Screening Candidates', 'Employee Relations', 'HRIS', 'Labor Laws',
      'Payroll Management', 'Onboarding', 'Vendor Coordination', 'Performance Appraisal'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Teaching, academic research, coaching, curriculum design, and tutoring',
    roles: [
      'Primary / High School Teacher',
      'College Professor / Lecturer',
      'Corporate Trainer',
      'Curriculum Developer',
      'Academic Counselor',
      'Online Tutor',
      'Special Education Teacher'
    ],
    suggestedSkills: [
      'Classroom Management', 'Lesson Planning', 'EdTech Tools', 'Student Mentoring',
      'Curriculum Design', 'Public Speaking', 'Assessment Design', 'Subject Expertise'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clinical nursing, pharmacy, physiotherapy, medical lab, and hospital administration',
    roles: [
      'Staff Nurse',
      'Pharmacist',
      'Medical Lab Technician',
      'Physiotherapist',
      'Hospital Administrator',
      'Radiologist Technician',
      'Clinical Research Associate'
    ],
    suggestedSkills: [
      'Patient Care', 'Emergency Response', 'Pharmacy Dispensing', 'Medical Records (EMR)',
      'Phlebotomy', 'Medical Diagnostics', 'Infection Control', 'Healthcare Compliance'
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'Hotel operations, culinary arts, food & beverage, guest services, and travel',
    roles: [
      'Front Desk Executive',
      'Hotel Operations Manager',
      'Chef / Sous Chef',
      'F&B Service Associate',
      'Travel Consultant',
      'Event Planner / Coordinator',
      'Housekeeping Supervisor'
    ],
    suggestedSkills: [
      'Guest Relationship Management', 'POS Systems', 'Menu Planning', 'Food Safety (HACCP)',
      'Reservation Software', 'Event Management', 'Multitasking', 'Customer Hospitality'
    ]
  },
  {
    id: 'construction-engineering',
    name: 'Construction & Engineering',
    description: 'Civil projects, mechanical design, electrical infrastructure, and architecture',
    roles: [
      'Civil Engineer',
      'Site Supervisor',
      'Electrical Engineer',
      'Mechanical Engineer',
      'Architect',
      'AutoCAD / BIM Modeler',
      'Structural Engineer',
      'Project Planner'
    ],
    suggestedSkills: [
      'AutoCAD', 'Revit', 'BIM', 'Site Inspection', 'Project Estimations', 'Quality Control',
      'Structural Analysis', 'Safety Compliance (OSHA)', 'Contractor Management'
    ]
  },
  {
    id: 'logistics-transport',
    name: 'Logistics & Transport',
    description: 'Supply chain management, warehouse operations, fleet logistics, and shipping',
    roles: [
      'Supply Chain Coordinator',
      'Warehouse Manager',
      'Logistics Executive',
      'Fleet Supervisor',
      'Inventory Controller',
      'Dispatch Officer',
      'Freight Forwarder'
    ],
    suggestedSkills: [
      'Warehouse Management Systems (WMS)', 'Inventory Control', 'Route Optimization',
      'Vendor Coordination', 'Supply Chain Analytics', 'Dispatch Planning', 'ERP Systems'
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Store operations, visual merchandising, cashiering, and floor sales',
    roles: [
      'Store Manager',
      'Retail Sales Associate',
      'Cashier / Billing Executive',
      'Visual Merchandiser',
      'Store Inventory Clerk'
    ],
    suggestedSkills: [
      'POS Operations', 'Customer Service', 'Visual Merchandising', 'Stock Auditing',
      'Cash Handling', 'Product Demonstration', 'Sales Closing'
    ]
  },
  {
    id: 'media-creative',
    name: 'Media & Creative',
    description: 'Graphic design, video editing, photography, copywriting, and multimedia production',
    roles: [
      'Graphic Designer',
      'Video Editor',
      'Animator / Motion Designer',
      'Copywriter',
      'Photographer / Videographer',
      'Creative Director',
      'Content Producer'
    ],
    suggestedSkills: [
      'Adobe Premiere Pro', 'Adobe After Effects', 'Photoshop', 'Illustrator', 'Figma',
      'Storyboarding', 'Video Production', 'Creative Copywriting', 'Visual Storytelling'
    ]
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Physical surveillance, facility safety, loss prevention, and private security',
    roles: [
      'Security Supervisor',
      'Surveillance / CCTV Operator',
      'Security Officer',
      'Fire & Safety Officer',
      'Loss Prevention Specialist'
    ],
    suggestedSkills: [
      'CCTV Monitoring', 'Access Control', 'First Aid / CPR', 'Incident Reporting',
      'Fire Safety Protocols', 'Patrolling', 'Risk Assessment'
    ]
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Inbound assistance, technical helpline, customer success, and chat operations',
    roles: [
      'Customer Support Executive (Voice)',
      'Chat / Email Support Specialist',
      'Technical Support Engineer',
      'Customer Success Manager',
      'Call Center Team Lead'
    ],
    suggestedSkills: [
      'Zendesk', 'Freshdesk', 'Active Listening', 'Conflict Resolution', 'CRM Handling',
      'Multi-lingual Fluency', 'Typing Speed 40+ WPM', 'SLA Adherence'
    ]
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Corporate law, legal compliance, contract management, and litigation',
    roles: [
      'Legal Associate',
      'Corporate Counsel',
      'Contract Specialist',
      'Compliance Officer',
      'Paralegal'
    ],
    suggestedSkills: [
      'Contract Drafting', 'Legal Research', 'Regulatory Compliance', 'Due Diligence',
      'IPR Filing', 'Litigation Support', 'Statutory Filings'
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production line assembly, quality assurance, industrial tooling, and CNC operation',
    roles: [
      'Production Engineer',
      'Quality Control (QC) Inspector',
      'CNC Machine Operator',
      'Maintenance Technician',
      'Plant Manager',
      'Industrial Safety Executive'
    ],
    suggestedSkills: [
      'Six Sigma', 'Lean Manufacturing', 'CNC Programming', 'Quality Audits',
      'Preventative Maintenance', 'PLC Systems', 'Industrial Safety'
    ]
  },
  {
    id: 'work-from-home',
    name: 'Work From Home',
    description: 'Remote customer care, data entry, virtual assistance, and remote freelancing',
    roles: [
      'Virtual Assistant',
      'Remote Data Entry Specialist',
      'Remote Content Writer',
      'Remote Customer Support',
      'Remote Sales Representative',
      'Online Researcher'
    ],
    suggestedSkills: [
      'Remote Communication (Slack/Zoom)', 'Time Management', 'Google Workspace',
      'Data Entry Accuracy', 'Self-Motivation', 'Fast Internet & System Proficiency'
    ]
  },
  {
    id: 'other',
    name: 'Other',
    description: 'General services, specialized trades, and multi-domain opportunities',
    roles: [
      'General Operations Associate',
      'Field Executive',
      'Quality Auditor',
      'Special Projects Associate'
    ],
    suggestedSkills: [
      'Problem Solving', 'Communication', 'Teamwork', 'Adaptability', 'Basic Computer Skills'
    ]
  }
];

export function getCategoryById(id?: string): JobCategoryConfig | undefined {
  if (!id) return undefined;
  const target = id.toLowerCase();
  return JOB_CATEGORIES.find((c) => (c.id || '').toLowerCase() === target || (c.name || '').toLowerCase() === target);
}

export function getCategoryByName(name?: string): JobCategoryConfig | undefined {
  if (!name) return undefined;
  const target = name.toLowerCase();
  return JOB_CATEGORIES.find((c) => (c.name || '').toLowerCase() === target);
}

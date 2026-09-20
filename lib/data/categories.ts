export interface CategoryItem {
  id: string;
  name: string;
  queryParam: string;
  paramType: 'category' | 'workMode' | 'jobType';
  description: string;
  iconName: string;
}

export const POPULAR_JOB_CATEGORIES: CategoryItem[] = [
  { id: 'it', name: 'IT & Technology', queryParam: 'IT & Technology', paramType: 'category', description: 'Software, cloud, web, and AI development', iconName: 'Code' },
  { id: 'sales', name: 'Sales & Marketing', queryParam: 'Sales & Marketing', paramType: 'category', description: 'B2B sales, growth, digital marketing, PR', iconName: 'TrendingUp' },
  { id: 'finance', name: 'Finance & Accounting', queryParam: 'Finance & Accounting', paramType: 'category', description: 'Auditing, CA, banking, taxation, fintech', iconName: 'DollarSign' },
  { id: 'hr', name: 'HR & Administration', queryParam: 'HR & Administration', paramType: 'category', description: 'Talent acquisition, operations, management', iconName: 'Users' },
  { id: 'education', name: 'Education', queryParam: 'Education', paramType: 'category', description: 'Teaching, e-learning, academia, tutoring', iconName: 'GraduationCap' },
  { id: 'healthcare', name: 'Healthcare', queryParam: 'Healthcare', paramType: 'category', description: 'Medical, pharma, clinical, caregiving', iconName: 'HeartPulse' },
  { id: 'hospitality', name: 'Hospitality', queryParam: 'Hospitality', paramType: 'category', description: 'Hotels, dining, events, travel, tourism', iconName: 'Utensils' },
  { id: 'construction', name: 'Construction', queryParam: 'Construction', paramType: 'category', description: 'Civil infrastructure, building, planning', iconName: 'HardHat' },
  { id: 'engineering', name: 'Engineering', queryParam: 'Engineering', paramType: 'category', description: 'Mechanical, electrical, industrial automation', iconName: 'Wrench' },
  { id: 'logistics', name: 'Logistics', queryParam: 'Logistics', paramType: 'category', description: 'Supply chain, fleet transport, warehousing', iconName: 'Truck' },
  { id: 'retail', name: 'Retail', queryParam: 'Retail', paramType: 'category', description: 'Store management, e-commerce, merchandising', iconName: 'ShoppingBag' },
  { id: 'media', name: 'Media & Entertainment', queryParam: 'Media & Entertainment', paramType: 'category', description: 'Content, broadcasting, journalism, video', iconName: 'Film' },
  { id: 'design', name: 'Design & Creative', queryParam: 'Design & Creative', paramType: 'category', description: 'UI/UX, graphic design, brand, motion', iconName: 'Palette' },
  { id: 'security', name: 'Security', queryParam: 'Security', paramType: 'category', description: 'Physical defense, surveillance, cyber safety', iconName: 'ShieldCheck' },
  { id: 'government', name: 'Government / Public Sector', queryParam: 'Government / Public Sector', paramType: 'category', description: 'PSU, municipal, public administration', iconName: 'Landmark' },
  { id: 'remote', name: 'Remote Jobs', queryParam: 'Remote', paramType: 'workMode', description: 'Work from anywhere with high flexibility', iconName: 'Globe' },
  { id: 'part-time', name: 'Part-Time Jobs', queryParam: 'Part-time', paramType: 'jobType', description: 'Flexible hours, hourly contracts, shifts', iconName: 'Clock' },
  { id: 'freelance', name: 'Freelance', queryParam: 'Freelance', paramType: 'jobType', description: 'Independent project contracts and gigs', iconName: 'Briefcase' },
];

export const VENDOR_CATEGORIES = [
  'Suppliers',
  'Manufacturers',
  'Digital Marketing',
  'Web Development',
  'Printing',
  'Event Management',
  'Catering',
  'Security',
  'Construction',
  'Transport',
  'Photography',
  'Videography',
  'Graphic Design',
  'Consultants',
  'Freelancers',
  'HR / Manpower',
  'Equipment Suppliers',
  'Wholesale Suppliers',
  'Professional Services',
];

export const POPULAR_VENDOR_CATEGORIES: { id: string; name: string }[] = VENDOR_CATEGORIES.map((name) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
}));

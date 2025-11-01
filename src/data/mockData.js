export const MOCK_USERS = [
  { id: 's1', name: 'Praveen Kumar', role: 'student' },
  { id: 's2', name: 'Charan S', role: 'student' },
  { id: 's3', name: 'Jahnvi Singh', role: 'student' },
  { id: 'a1', name: 'Dr. Parthiban', role: 'admin' },
  { id: 'a2', name: 'Prof. Rajesh Kumar', role: 'admin' },
];

export const MOCK_ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'Data Structures: Hash Map Implementation',
    description: 'Implement a collision-free Hash Map using separate chaining in C++ or Java.',
    dueDate: '2025-11-05',
    adminId: 'a1', // Dr. Parthiban
    driveLink: 'https://drive.google.com/link/to/hashmap_specs_a1',
  },
  {
    id: 'a2',
    title: 'Database Design: ER Diagram & Normalization',
    description: 'Design a normalized (up to 3NF) database schema for a Library Management System.',
    dueDate: '2025-11-12',
    adminId: 'a1', // Dr. Parthiban
    driveLink: 'https://drive.google.com/link/to/db_guidelines_a2',
  },
  {
    id: 'a3',
    title: 'Operating Systems: Process Scheduling Simulation',
    description: 'Develop a C program to simulate and compare FCFS and SJF scheduling algorithms.',
    dueDate: '2025-11-19',
    adminId: 'a2', // Prof. Rajesh Kumar
    driveLink: 'https://drive.google.com/link/to/os_project_a3',
  },
];

// Submission status for each student/assignment pair
export const MOCK_SUBMISSIONS = [
  // Submissions for Assignment a1
  { assignmentId: 'a1', studentId: 's1', isSubmitted: true, submissionDate: '2025-10-30' },
  { assignmentId: 'a1', studentId: 's2', isSubmitted: false, submissionDate: null },
  { assignmentId: 'a1', studentId: 's3', isSubmitted: true, submissionDate: '2025-10-29' },

  // Submissions for Assignment a2
  { assignmentId: 'a2', studentId: 's1', isSubmitted: true, submissionDate: '2025-10-30' },
  { assignmentId: 'a2', studentId: 's2', isSubmitted: true, submissionDate: '2025-10-30' },
  { assignmentId: 'a2', studentId: 's3', isSubmitted: false, submissionDate: null },
  
  // New submissions for Assignment a3
  { assignmentId: 'a3', studentId: 's1', isSubmitted: false, submissionDate: null },
  { assignmentId: 'a3', studentId: 's2', isSubmitted: false, submissionDate: null },
  { assignmentId: 'a3', studentId: 's3', isSubmitted: false, submissionDate: null },
];
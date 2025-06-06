// Mock data for testing
export const mockMembers = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "nguyenvana@company.com",
    role: "member",
    department: "Development",
    position: "Frontend Developer",
    lastLogin: "2025-01-15T08:45:00.000Z",
    isActive: true
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "tranthib@company.com", 
    role: "member",
    department: "Design",
    position: "UI/UX Designer",
    lastLogin: "2025-01-14T16:30:00.000Z",
    isActive: true
  },
  {
    id: 3,
    name: "Le Van C",
    email: "levanc@company.com",
    role: "member",
    department: "Development",
    position: "Backend Developer",
    lastLogin: "2025-01-15T07:20:00.000Z",
    isActive: true
  },
  {
    id: 4,
    name: "Pham Thi D",
    email: "phamthid@company.com",
    role: "member",
    department: "QA",
    position: "QA Engineer",
    lastLogin: "2025-01-12T11:10:00.000Z",
    isActive: true
  },
  {
    id: 5,
    name: "Hoang Van E", 
    email: "hoangvane@company.com",
    role: "member",
    department: "Management",
    position: "Project Manager",
    lastLogin: "2025-01-14T13:45:00.000Z",
    isActive: true
  },
  {
    id: 6,
    name: "Vo Thi F",
    email: "vothif@company.com",
    role: "member",
    department: "Marketing",
    position: "Marketing Specialist",
    lastLogin: "2025-01-13T15:30:00.000Z",
    isActive: true
  },
  {
    id: 7,
    name: "Dang Van G",
    email: "dangvang@company.com",
    role: "member",
    department: "Development",
    position: "DevOps Engineer",
    lastLogin: "2025-01-11T10:20:00.000Z",
    isActive: true
  },
  {
    id: 8,
    name: "Bui Thi H",
    email: "buithih@company.com",
    role: "member",
    department: "Design",
    position: "Graphic Designer",
    lastLogin: "2025-01-10T14:15:00.000Z",
    isActive: true
  }
];

export const mockAdmins = [
  {
    id: 101,
    name: "Admin System",
    email: "admin@company.com",
    role: "admin",
    department: "Management",
    position: "System Administrator",
    lastLogin: "2025-01-15T10:30:00.000Z",
    isActive: true
  },
  {
    id: 102,
    name: "Nguyen Duc Admin",
    email: "nguyenducadmin@company.com",
    role: "admin",
    department: "Management", 
    position: "Project Lead",
    lastLogin: "2025-01-14T14:20:00.000Z",
    isActive: true
  },
  {
    id: 103,
    name: "Le Thi Manager",
    email: "lethimanager@company.com",
    role: "admin",
    department: "Management",
    position: "Team Manager",
    lastLogin: "2025-01-13T09:15:00.000Z",
    isActive: true
  }
];

export const mockTasks = [
  {
    id: 1,
    title: "Implement user authentication",
    description: "Create login/register functionality with JWT tokens, password encryption, and session management. This is a critical feature for the application security.",
    date: "2025-06-15",
    assignedTo: ["Nguyen Van A", "Le Van C"],
    assignedToEmails: ["nguyenvana@company.com", "levanc@company.com"],
    assignedMember: [
      { id: 1, name: "Nguyen Van A", email: "nguyenvana@company.com" },
      { id: 3, name: "Le Van C", email: "levanc@company.com" }
    ],
    priority: "high",
    status: "in-progress",
    createdAt: "2025-06-01T09:00:00.000Z",
    createdBy: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    assignedAt: "2025-06-01T09:15:00.000Z",
    progress: 30,
    estimatedHours: 40,
    actualHours: 12
  },
  {
    id: 2,
    title: "Design dashboard wireframes",
    description: "Create comprehensive wireframes for admin dashboard including user management, analytics, and reporting sections. Focus on user experience and accessibility.",
    date: "2025-06-10", 
    assignedTo: ["Tran Thi B"],
    assignedToEmails: ["tranthib@company.com"],
    assignedMember: [
      { id: 2, name: "Tran Thi B", email: "tranthib@company.com" }
    ],
    priority: "medium",
    status: "completed",
    createdAt: "2025-05-28T10:30:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-05-28T10:45:00.000Z",
    completedAt: "2025-06-09T16:30:00.000Z",
    progress: 100,
    estimatedHours: 24,
    actualHours: 22
  },
  {
    id: 3,
    title: "Setup database schema",
    description: "Design and implement database structure with proper relationships, indexes, and constraints. Include migration scripts and documentation.",
    date: "2025-06-20",
    assignedTo: ["Le Van C"],
    assignedToEmails: ["levanc@company.com"],
    assignedMember: [
      { id: 3, name: "Le Van C", email: "levanc@company.com" }
    ],
    priority: "urgent",
    status: "pending",
    createdAt: "2025-06-02T14:15:00.000Z",
    createdBy: {
      id: 101,
      name: "Admin System",
      email: "admin@company.com"
    },
    assignedAt: "2025-06-02T14:30:00.000Z",
    progress: 0,
    estimatedHours: 32,
    actualHours: 0
  },
  {
    id: 4,
    title: "API Testing Suite",
    description: "Create comprehensive testing suite for all API endpoints including unit tests, integration tests, and performance tests. Use Jest and Supertest frameworks.",
    date: "2025-06-25",
    assignedTo: ["Pham Thi D"],
    assignedToEmails: ["phamthid@company.com"],
    assignedMember: [
      { id: 4, name: "Pham Thi D", email: "phamthid@company.com" }
    ],
    priority: "high",
    status: "in-progress",
    createdAt: "2025-06-03T11:20:00.000Z",
    createdBy: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    assignedAt: "2025-06-03T11:35:00.000Z",
    progress: 40,
    estimatedHours: 36,
    actualHours: 14
  },
  {
    id: 5,
    title: "Project Documentation",
    description: "Write comprehensive project documentation including API documentation, user guides, and deployment instructions. Use Markdown and include diagrams.",
    date: "2025-06-30",
    assignedTo: ["Nguyen Van A", "Tran Thi B"],
    assignedToEmails: ["nguyenvana@company.com", "tranthib@company.com"],
    assignedMember: [
      { id: 1, name: "Nguyen Van A", email: "nguyenvana@company.com" },
      { id: 2, name: "Tran Thi B", email: "tranthib@company.com" }
    ],
    priority: "medium",
    status: "pending",
    createdAt: "2025-06-04T09:45:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-06-04T10:00:00.000Z",
    progress: 0,
    estimatedHours: 28,
    actualHours: 0
  },
  {
    id: 6,
    title: "Weekly Team Meeting",
    description: "Regular team sync meeting to discuss project progress, blockers, and upcoming tasks. Prepare agenda and meeting notes.",
    date: "2025-06-07",
    assignedTo: ["Hoang Van E", "Nguyen Van A", "Tran Thi B", "Le Van C", "Pham Thi D"],
    assignedToEmails: ["hoangvane@company.com", "nguyenvana@company.com", "tranthib@company.com", "levanc@company.com", "phamthid@company.com"],
    assignedMember: [
      { id: 5, name: "Hoang Van E", email: "hoangvane@company.com" },
      { id: 1, name: "Nguyen Van A", email: "nguyenvana@company.com" },
      { id: 2, name: "Tran Thi B", email: "tranthib@company.com" },
      { id: 3, name: "Le Van C", email: "levanc@company.com" },
      { id: 4, name: "Pham Thi D", email: "phamthid@company.com" }
    ],
    priority: "low",
    status: "completed",
    createdAt: "2025-06-01T08:00:00.000Z",
    createdBy: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    assignedAt: "2025-06-01T08:15:00.000Z",
    completedAt: "2025-06-07T10:00:00.000Z",
    progress: 100,
    estimatedHours: 2,
    actualHours: 2
  },
  {
    id: 7,
    title: "Market Research Analysis",
    description: "Conduct comprehensive market research on competitor products and user behavior patterns. Analyze trends and create detailed report.",
    date: "2025-06-18",
    assignedTo: ["Vo Thi F"],
    assignedToEmails: ["vothif@company.com"],
    assignedMember: [
      { id: 6, name: "Vo Thi F", email: "vothif@company.com" }
    ],
    priority: "medium",
    status: "in-progress",
    createdAt: "2025-06-02T13:30:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-06-02T13:45:00.000Z",
    progress: 75,
    estimatedHours: 30,
    actualHours: 22
  },
  {
    id: 8,
    title: "Security Audit",
    description: "Perform comprehensive security audit of the application including vulnerability scanning, penetration testing, and security compliance review.",
    date: "2025-06-22",
    assignedTo: ["Le Van C", "Pham Thi D"],
    assignedToEmails: ["levanc@company.com", "phamthid@company.com"],
    assignedMember: [
      { id: 3, name: "Le Van C", email: "levanc@company.com" },
      { id: 4, name: "Pham Thi D", email: "phamthid@company.com" }
    ],
    priority: "urgent",
    status: "pending",
    createdAt: "2025-06-03T14:20:00.000Z",
    createdBy: {
      id: 101,
      name: "Admin System",
      email: "admin@company.com"
    },
    assignedAt: "2025-06-03T14:35:00.000Z",
    progress: 0,
    estimatedHours: 45,
    actualHours: 0
  },
  {
    id: 9,
    title: "Mobile App Design",
    description: "Create mobile application design mockups and prototypes for iOS and Android platforms. Focus on responsive design and user experience.",
    date: "2025-07-05",
    assignedTo: ["Tran Thi B", "Bui Thi H"],
    assignedToEmails: ["tranthib@company.com", "buithih@company.com"],
    assignedMember: [
      { id: 2, name: "Tran Thi B", email: "tranthib@company.com" },
      { id: 8, name: "Bui Thi H", email: "buithih@company.com" }
    ],
    priority: "high",
    status: "in-progress",
    createdAt: "2025-06-03T16:10:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-06-03T16:25:00.000Z",
    progress: 30,
    estimatedHours: 60,
    actualHours: 18
  },
  {
    id: 10,
    title: "Database Migration",
    description: "Plan and execute database migration from legacy system to new infrastructure. Ensure data integrity and minimize downtime.",
    date: "2025-06-28",
    assignedTo: ["Le Van C", "Dang Van G"],
    assignedToEmails: ["levanc@company.com", "dangvang@company.com"],
    assignedMember: [
      { id: 3, name: "Le Van C", email: "levanc@company.com" },
      { id: 7, name: "Dang Van G", email: "dangvang@company.com" }
    ],
    priority: "urgent",
    status: "pending",
    createdAt: "2025-06-04T11:30:00.000Z",
    createdBy: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    assignedAt: "2025-06-04T11:45:00.000Z",
    progress: 0,
    estimatedHours: 40,
    actualHours: 0
  },
  {
    id: 11,
    title: "Customer Support Portal",
    description: "Develop customer support portal with ticket system, knowledge base, and live chat functionality. Include admin dashboard for support team.",
    date: "2025-07-10",
    assignedTo: ["Nguyen Van A", "Tran Thi B", "Pham Thi D"],
    assignedToEmails: ["nguyenvana@company.com", "tranthib@company.com", "phamthid@company.com"],
    assignedMember: [
      { id: 1, name: "Nguyen Van A", email: "nguyenvana@company.com" },
      { id: 2, name: "Tran Thi B", email: "tranthib@company.com" },
      { id: 4, name: "Pham Thi D", email: "phamthid@company.com" }
    ],
    priority: "medium",
    status: "pending",
    createdAt: "2025-06-04T15:20:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-06-04T15:35:00.000Z",
    progress: 0,
    estimatedHours: 80,
    actualHours: 0
  },
  {
    id: 12,
    title: "Performance Optimization",
    description: "Optimize application performance including database queries, caching implementation, and code optimization. Improve loading times by 50%.",
    date: "2025-07-15",
    assignedTo: ["Nguyen Van A", "Le Van C", "Dang Van G"],
    assignedToEmails: ["nguyenvana@company.com", "levanc@company.com", "dangvang@company.com"],
    assignedMember: [
      { id: 1, name: "Nguyen Van A", email: "nguyenvana@company.com" },
      { id: 3, name: "Le Van C", email: "levanc@company.com" },
      { id: 7, name: "Dang Van G", email: "dangvang@company.com" }
    ],
    priority: "high",
    status: "pending",
    createdAt: "2025-06-04T16:30:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-06-04T16:45:00.000Z",
    progress: 0,
    estimatedHours: 50,
    actualHours: 0
  }
];

export const priorityOptions = [
  { value: "low", label: "🟢 Low", color: "#10b981" },
  { value: "medium", label: "🟡 Medium", color: "#f59e0b" },
  { value: "high", label: "🟠 High", color: "#f97316" },
  { value: "urgent", label: "🔴 Urgent", color: "#ef4444" }
];

export const statusOptions = [
  { value: "pending", label: "⏳ Pending", color: "#6b7280" },
  { value: "in-progress", label: "🔄 In Progress", color: "#3b82f6" },
  { value: "completed", label: "✅ Completed", color: "#10b981" },
  { value: "cancelled", label: "❌ Cancelled", color: "#ef4444" }
];

// Mock Account Data for Testing Login - cleaned up version
export const mockAccounts = [
  // Admin Accounts
  {
    id: 101,
    username: "admin",
    password: "admin123",
    email: "admin@company.com",
    role: "admin",
    name: "Admin System",
    department: "Management",
    position: "System Administrator",
    lastLogin: "2025-01-15T10:30:00.000Z",
    isActive: true
  },
  {
    id: 102,
    username: "admin2",
    password: "admin456",
    email: "nguyenducadmin@company.com",
    role: "admin",
    name: "Nguyen Duc Admin",
    department: "Management", 
    position: "Project Lead",
    lastLogin: "2025-01-14T14:20:00.000Z",
    isActive: true
  },
  {
    id: 103,
    username: "manager",
    password: "manager123",
    email: "lethimanager@company.com",
    role: "admin",
    name: "Le Thi Manager",
    department: "Management",
    position: "Team Manager",
    lastLogin: "2025-01-13T09:15:00.000Z",
    isActive: true
  },

  // Member Accounts
  {
    id: 1,
    username: "nguyenvana",
    password: "member123",
    email: "nguyenvana@company.com",
    role: "member",
    name: "Nguyen Van A",
    department: "Development",
    position: "Frontend Developer",
    lastLogin: "2025-01-15T08:45:00.000Z",
    isActive: true
  },
  {
    id: 2,
    username: "tranthib",
    password: "designer123",
    email: "tranthib@company.com",
    role: "member",
    name: "Tran Thi B",
    department: "Design",
    position: "UI/UX Designer",
    lastLogin: "2025-01-14T16:30:00.000Z",
    isActive: true
  },
  {
    id: 3,
    username: "levanc",
    password: "backend123",
    email: "levanc@company.com",
    role: "member",
    name: "Le Van C",
    department: "Development",
    position: "Backend Developer",
    lastLogin: "2025-01-15T07:20:00.000Z",
    isActive: true
  },
  {
    id: 4,
    username: "phamthid",
    password: "qa123",
    email: "phamthid@company.com",
    role: "member",
    name: "Pham Thi D",
    department: "QA",
    position: "QA Engineer",
    lastLogin: "2025-01-12T11:10:00.000Z",
    isActive: true
  },
  {
    id: 5,
    username: "hoangvane",
    password: "pm123",
    email: "hoangvane@company.com",
    role: "member",
    name: "Hoang Van E",
    department: "Management",
    position: "Project Manager",
    lastLogin: "2025-01-14T13:45:00.000Z",
    isActive: true
  },
  {
    id: 6,
    username: "vothif",
    password: "marketing123",
    email: "vothif@company.com",
    role: "member",
    name: "Vo Thi F",
    department: "Marketing",
    position: "Marketing Specialist",
    lastLogin: "2025-01-13T15:30:00.000Z",
    isActive: true
  },
  {
    id: 7,
    username: "dangvang",
    password: "devops123",
    email: "dangvang@company.com",
    role: "member",
    name: "Dang Van G",
    department: "Development",
    position: "DevOps Engineer",
    lastLogin: "2025-01-11T10:20:00.000Z",
    isActive: true
  },
  {
    id: 8,
    username: "buithih",
    password: "design123",
    email: "buithih@company.com",
    role: "member",
    name: "Bui Thi H",
    department: "Design",
    position: "Graphic Designer",
    lastLogin: "2025-01-10T14:15:00.000Z",
    isActive: true
  }
];

// Helper functions for local development - these will be replaced by Firebase functions
export const getAdminById = (adminId) => {
  return mockAdmins.find(admin => admin.id === adminId);
};

export const getMemberById = (memberId) => {
  return mockMembers.find(member => member.id === memberId);
};

// Authentication Helper Functions for local use
export const authenticateUser = (username, password) => {
  const user = mockAccounts.find(
    account => account.username === username && account.password === password && account.isActive
  );
  
  if (user) {
    // Update last login time
    user.lastLogin = new Date().toISOString();
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department,
        position: user.position,
        lastLogin: user.lastLogin
      }
    };
  }
  
  return {
    success: false,
    message: "Invalid username or password"
  };
};

export const getUserByUsername = (username) => {
  return mockAccounts.find(account => account.username === username);
};

export const getUserByEmail = (email) => {
  return mockAccounts.find(account => account.email === email);
};

// Development Helper Function
export const printTestAccounts = () => {
  console.log('=== 🧪 MOCK TEST ACCOUNTS ===');
  console.log('\n👨‍💼 ADMIN ACCOUNTS:');
  mockAccounts
    .filter(account => account.role === 'admin')
    .forEach(account => {
      console.log(`• Username: ${account.username} | Password: ${account.password} | Name: ${account.name}`);
    });

  console.log('\n👥 MEMBER ACCOUNTS:');
  mockAccounts
    .filter(account => account.role === 'member')
    .forEach(account => {
      console.log(`• Username: ${account.username} | Password: ${account.password} | Name: ${account.name}`);
    });

  console.log('\n📝 Usage: Navigate to login page and use any username/password combination above');
  console.log('===============================\n');
};

// Auto-print test accounts in development mode
if (process.env.NODE_ENV === 'development') {
  printTestAccounts();
}
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
  },
  {
    id: 9,
    name: "Tran Van I",
    email: "tranvani@company.com",
    role: "member",
    department: "Development",
    position: "Mobile Developer",
    lastLogin: "2025-01-16T09:30:00.000Z",
    isActive: true
  },
  {
    id: 10,
    name: "Ly Thi K",
    email: "lythik@company.com", 
    role: "member",
    department: "Finance",
    position: "Financial Analyst",
    lastLogin: "2025-01-15T11:25:00.000Z",
    isActive: true
  },
  {
    id: 11,
    name: "Ngo Van L",
    email: "ngovanl@company.com",
    role: "member",
    department: "Development",
    position: "Data Scientist",
    lastLogin: "2025-01-14T10:15:00.000Z",
    isActive: true
  },
  {
    id: 12,
    name: "Duong Thi M",
    email: "duongthim@company.com",
    role: "member",
    department: "HR",
    position: "HR Specialist",
    lastLogin: "2025-01-13T14:40:00.000Z",
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
  },
  {
    id: 104,
    name: "Pham Van Director",
    email: "phamvandirector@company.com",
    role: "admin",
    department: "Executive",
    position: "Technical Director",
    lastLogin: "2025-01-15T08:30:00.000Z",
    isActive: true
  },
  {
    id: 105,
    name: "Tran Thi CTO",
    email: "tranthicto@company.com",
    role: "admin",
    department: "Executive", 
    position: "Chief Technology Officer",
    lastLogin: "2025-01-14T09:45:00.000Z",
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
    title: "Tối ưu hiệu suất ứng dụng",
    description: "Tối ưu hóa thời gian tải và hiệu suất tổng thể của ứng dụng. Tập trung vào code splitting, lazy loading, và tối ưu hóa các truy vấn database.",
    date: "2025-07-05",
    assignedTo: ["Nguyen Van A", "Dang Van G"],
    assignedToEmails: ["nguyenvana@company.com", "dangvang@company.com"],
    assignedMember: [
      { id: 1, name: "Nguyen Van A", email: "nguyenvana@company.com" },
      { id: 7, name: "Dang Van G", email: "dangvang@company.com" }
    ],
    priority: "high",
    status: "pending",
    createdAt: "2025-06-15T10:00:00.000Z",
    createdBy: {
      id: 104,
      name: "Pham Van Director",
      email: "phamvandirector@company.com"
    },
    assignedAt: "2025-06-15T10:30:00.000Z",
    progress: 0,
    estimatedHours: 50,
    actualHours: 0
  },
  {
    id: 8,
    title: "Nghiên cứu công nghệ mới",
    description: "Nghiên cứu và đánh giá các framework và thư viện mới để nâng cao hiệu quả phát triển. Tập trung vào Next.js, Svelte, và GraphQL.",
    date: "2025-07-10",
    assignedTo: ["Tran Van I", "Le Van C"],
    assignedToEmails: ["tranvani@company.com", "levanc@company.com"],
    assignedMember: [
      { id: 9, name: "Tran Van I", email: "tranvani@company.com" },
      { id: 3, name: "Le Van C", email: "levanc@company.com" }
    ],
    priority: "medium",
    status: "pending",
    createdAt: "2025-06-16T09:20:00.000Z",
    createdBy: {
      id: 105,
      name: "Tran Thi CTO",
      email: "tranthicto@company.com"
    },
    assignedAt: "2025-06-16T09:45:00.000Z",
    progress: 0,
    estimatedHours: 40,
    actualHours: 0
  },
  {
    id: 9,
    title: "Thiết kế logo mới",
    description: "Thiết kế logo mới cho dự án, đảm bảo phù hợp với định hướng thương hiệu. Chuẩn bị các phiên bản khác nhau cho web, mobile, và print.",
    date: "2025-06-25",
    assignedTo: ["Bui Thi H"],
    assignedToEmails: ["buithih@company.com"],
    assignedMember: [
      { id: 8, name: "Bui Thi H", email: "buithih@company.com" }
    ],
    priority: "high",
    status: "in-progress",
    createdAt: "2025-06-10T14:00:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-06-10T14:30:00.000Z",
    progress: 65,
    estimatedHours: 30,
    actualHours: 19
  },
  {
    id: 10,
    title: "Phân tích tài chính Q2",
    description: "Phân tích chi tiết tài chính quý II, bao gồm so sánh với kế hoạch và đề xuất điều chỉnh ngân sách cho các quý tiếp theo.",
    date: "2025-07-15",
    assignedTo: ["Ly Thi K"],
    assignedToEmails: ["lythik@company.com"],
    assignedMember: [
      { id: 10, name: "Ly Thi K", email: "lythik@company.com" }
    ],
    priority: "urgent",
    status: "pending",
    createdAt: "2025-06-17T11:15:00.000Z",
    createdBy: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    assignedAt: "2025-06-17T11:30:00.000Z",
    progress: 0,
    estimatedHours: 35,
    actualHours: 0
  },
  {
    id: 11,
    title: "Xây dựng mô hình dữ liệu",
    description: "Phát triển mô hình dữ liệu dự đoán để phân tích hành vi người dùng và tối ưu hóa trải nghiệm sử dụng ứng dụng.",
    date: "2025-07-20",
    assignedTo: ["Ngo Van L"],
    assignedToEmails: ["ngovanl@company.com"],
    assignedMember: [
      { id: 11, name: "Ngo Van L", email: "ngovanl@company.com" }
    ],
    priority: "medium",
    status: "in-progress",
    createdAt: "2025-06-18T08:30:00.000Z",
    createdBy: {
      id: 104,
      name: "Pham Van Director",
      email: "phamvandirector@company.com"
    },
    assignedAt: "2025-06-18T09:00:00.000Z",
    progress: 40,
    estimatedHours: 60,
    actualHours: 24
  },
  {
    id: 12,
    title: "Đề xuất chính sách nhân sự mới",
    description: "Nghiên cứu và đề xuất chính sách nhân sự mới, tập trung vào cải thiện sự hài lòng của nhân viên và giữ chân nhân tài.",
    date: "2025-07-25",
    assignedTo: ["Duong Thi M"],
    assignedToEmails: ["duongthim@company.com"],
    assignedMember: [
      { id: 12, name: "Duong Thi M", email: "duongthim@company.com" }
    ],
    priority: "medium",
    status: "pending",
    createdAt: "2025-06-19T13:45:00.000Z",
    createdBy: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    assignedAt: "2025-06-19T14:15:00.000Z",
    progress: 0,
    estimatedHours: 45,
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

// Mock feedback data
export const mockFeedback = [
  {
    id: 1001,
    fromUser: {
      id: 1,
      name: "Nguyen Van A",
      email: "nguyenvana@company.com"
    },
    toAdmin: {
      id: 101,
      name: "Admin System",
      email: "admin@company.com"
    },
    subject: "Cải thiện giao diện dashboard",
    message: "Tôi nhận thấy giao diện dashboard hiện tại còn khá khó sử dụng. Có thể thêm biểu đồ thống kê và cải thiện cách hiển thị thông báo để dễ dàng theo dõi công việc hơn không?",
    createdAt: "2025-05-30T08:45:00.000Z",
    read: true
  },
  {
    id: 1002,
    fromUser: {
      id: 3,
      name: "Le Van C",
      email: "levanc@company.com"
    },
    toAdmin: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    subject: "Yêu cầu tính năng thông báo qua email",
    message: "Khi có task mới được giao hoặc deadline sắp tới, tôi muốn nhận được email thông báo. Điều này sẽ giúp tôi không bỏ lỡ bất kỳ công việc quan trọng nào, đặc biệt là khi không thường xuyên đăng nhập vào hệ thống.",
    createdAt: "2025-06-01T14:22:00.000Z",
    read: false
  },
  {
    id: 1003,
    fromUser: {
      id: 2,
      name: "Tran Thi B",
      email: "tranthib@company.com"
    },
    toAdmin: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    subject: "Báo cáo lỗi khi tải tài liệu lên",
    message: "Tôi đang gặp lỗi khi cố gắng tải tài liệu thiết kế lên hệ thống. Mỗi khi tôi chọn file có kích thước lớn hơn 5MB, hệ thống báo lỗi và không cho phép tải lên. Điều này gây khó khăn vì các file thiết kế thường có kích thước lớn. Mong admin xem xét tăng giới hạn kích thước file.",
    createdAt: "2025-06-03T09:15:00.000Z",
    read: true
  },
  {
    id: 1004,
    fromUser: {
      id: 5,
      name: "Hoang Van E",
      email: "hoangvane@company.com"
    },
    toAdmin: {
      id: 101,
      name: "Admin System",
      email: "admin@company.com"
    },
    subject: "Đề xuất tính năng chat nhóm",
    message: "Chúng ta nên có một tính năng chat nhóm trong hệ thống để các thành viên trong cùng dự án có thể trao đổi nhanh chóng. Hiện tại mọi người đang phải sử dụng các nền tảng bên ngoài như Slack hoặc Microsoft Teams, nhưng sẽ tiện lợi hơn nếu tích hợp trực tiếp vào hệ thống quản lý task này.",
    createdAt: "2025-06-04T11:30:00.000Z",
    read: false
  },
  {
    id: 1005,
    fromUser: {
      id: 4,
      name: "Pham Thi D",
      email: "phamthid@company.com"
    },
    toAdmin: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    subject: "Cảm ơn về cập nhật mới",
    message: "Tôi muốn gửi lời cảm ơn vì những cập nhật gần đây trên hệ thống. Việc thêm tính năng drag-and-drop cho các task giúp việc sắp xếp công việc trở nên dễ dàng hơn rất nhiều. Giao diện mới cũng rất trực quan và dễ sử dụng.",
    createdAt: "2025-06-05T15:45:00.000Z",
    read: true
  },
  {
    id: 1006,
    fromUser: {
      id: 6,
      name: "Vo Thi F",
      email: "vothif@company.com"
    },
    toAdmin: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    subject: "Đề xuất tính năng lịch công việc",
    message: "Tôi nghĩ chúng ta cần một tính năng lịch công việc tương tự như Google Calendar để có thể theo dõi các deadline và sự kiện quan trọng. Điều này sẽ giúp mọi người lên kế hoạch công việc hiệu quả hơn và không bỏ lỡ các deadline quan trọng.",
    createdAt: "2025-06-07T10:20:00.000Z",
    read: false
  },
  {
    id: 1007,
    fromUser: {
      id: 7,
      name: "Dang Van G",
      email: "dangvang@company.com"
    },
    toAdmin: {
      id: 101,
      name: "Admin System",
      email: "admin@company.com"
    },
    subject: "Yêu cầu hỗ trợ kỹ thuật",
    message: "Tôi đang gặp vấn đề với môi trường phát triển của mình và không thể truy cập đến API của hệ thống. Tôi đã thử refresh token và xác thực lại nhưng vẫn gặp lỗi 403 Forbidden. Có thể kiểm tra quyền truy cập của tài khoản tôi không?",
    createdAt: "2025-06-08T08:30:00.000Z",
    read: false
  },
  {
    id: 1008,
    fromUser: {
      id: 8,
      name: "Bui Thi H",
      email: "buithih@company.com"
    },
    toAdmin: {
      id: 102,
      name: "Nguyen Duc Admin",
      email: "nguyenducadmin@company.com"
    },
    subject: "Đề xuất chức năng search nâng cao",
    message: "Chức năng tìm kiếm hiện tại chỉ cho phép tìm theo tiêu đề task, nhưng sẽ hữu ích hơn nhiều nếu chúng ta có thể tìm kiếm theo người được giao, ngày tạo, độ ưu tiên và các tag. Điều này sẽ giúp người dùng tìm kiếm task cụ thể nhanh chóng hơn.",
    createdAt: "2025-06-09T13:15:00.000Z",
    read: true
  },
  {
    id: 1009,
    fromUser: {
      id: 1,
      name: "Nguyen Van A",
      email: "nguyenvana@company.com"
    },
    toAdmin: {
      id: 103,
      name: "Le Thi Manager",
      email: "lethimanager@company.com"
    },
    subject: "Phản hồi về đánh giá hiệu suất",
    message: "Tôi muốn phản hồi về đánh giá hiệu suất gần đây. Tôi cảm thấy một số tiêu chí đánh giá chưa phản ánh đúng khối lượng công việc thực tế mà tôi đã hoàn thành. Liệu chúng ta có thể sắp xếp một cuộc họp để thảo luận chi tiết hơn về vấn đề này không?",
    createdAt: "2025-06-10T09:45:00.000Z",
    read: false
  },
  {
    id: 1010,
    fromUser: {
      id: 3,
      name: "Le Van C",
      email: "levanc@company.com"
    },
    toAdmin: {
      id: 101,
      name: "Admin System",
      email: "admin@company.com"
    },
    subject: "Đề xuất workshop kỹ thuật",
    message: "Tôi muốn đề xuất tổ chức một workshop kỹ thuật về Docker và Kubernetes cho team. Nhiều thành viên trong nhóm đang gặp khó khăn với việc quản lý môi trường phát triển và triển khai, và tôi nghĩ một buổi đào tạo về chủ đề này sẽ rất hữu ích.",
    createdAt: "2025-06-11T14:00:00.000Z",
    read: true
  }
];

// Function to initialize mock data in localStorage
export const initializeMockData = () => {
  if (!localStorage.getItem('feedback')) {
    localStorage.setItem('feedback', JSON.stringify(mockFeedback));
  }
  
  // Initialize members
  if (!localStorage.getItem('members')) {
    localStorage.setItem('members', JSON.stringify(mockMembers));
  }
  
  // Initialize admins
  if (!localStorage.getItem('admins')) {
    localStorage.setItem('admins', JSON.stringify(mockAdmins));
  }
  
  // Initialize tasks
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  }
  
  console.log("Mock data initialized successfully!");
};
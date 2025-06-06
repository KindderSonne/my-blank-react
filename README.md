# 📋 Task Management System

> Hệ thống quản lý nhiệm vụ dành cho doanh nghiệp với giao diện hiện đại và tính năng đầy đủ

## 🌟 Tổng Quan

Task Management System là một ứng dụng web được xây dựng bằng React, giúp quản lý và phân công nhiệm vụ trong môi trường làm việc nhóm. Hệ thống hỗ trợ 2 vai trò chính: **Admin** (quản trị viên) và **Member** (thành viên), mỗi vai trò có những chức năng riêng biệt phù hợp với nhu cầu công việc.

## 🚀 Tính Năng Chính

### 👑 Dành cho Admin
- ✅ **Quản lý nhiệm vụ**: Tạo, chỉnh sửa, xóa tasks
- ✅ **Phân công công việc**: Assign tasks cho nhiều members
- ✅ **Quản lý thành viên**: Xem danh sách, trạng thái members
- ✅ **Dashboard**: Thống kê tổng quan hệ thống
- ✅ **Feedback Management**: Xem và quản lý phản hồi

### 👤 Dành cho Member
- ✅ **Xem nhiệm vụ cá nhân**: Danh sách tasks được giao
- ✅ **Cập nhật tiến độ**: Thay đổi trạng thái công việc
- ✅ **Comment & Rating**: Bình luận và đánh giá tasks
- ✅ **Lọc và tìm kiếm**: Filter theo status, priority, keyword
- ✅ **Profile Management**: Quản lý thông tin cá nhân

### 🎯 Tính Năng Chung
- 🔐 **Xác thực người dùng** với session management
- 📱 **Responsive Design** hoạt động mượt trên mọi thiết bị
- 🌐 **Giao diện tiếng Việt** thân thiện với người dùng
- ⚡ **Real-time Updates** cho comments và notifications
- 📊 **Thống kê và báo cáo** chi tiết

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 19.1.0 + Vite 6.3.5
- **Routing**: React Router DOM 7.6.0
- **Backend**: Firebase Realtime Database + Supabase
- **Authentication**: Cookie-based với js-cookie
- **Styling**: CSS Modules + Modern CSS
- **Build Tool**: Vite với Hot Module Replacement
- **Code Quality**: ESLint với React plugins

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 hoặc **yarn**: >= 1.22.0

### Bước 1: Clone Repository
```bash
git clone <repository-url>
cd my-blank-react
```

### Bước 2: Cài Đặt Dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

### Bước 3: Khởi Chạy Development Server
```bash
# Sử dụng npm
npm run dev

# Hoặc sử dụng yarn
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### Bước 4: Build cho Production
```bash
# Build ứng dụng
npm run build

# Preview build
npm run preview
```

## 🔑 Tài Khoản Test

### Admin Accounts
| Tên đăng nhập | Mật khẩu | Vai trò | Mô tả |
|---------------|----------|---------|-------|
| `admin` | `admin123` | Admin | Tài khoản admin chính |
| `nguyenducadmin` | `admin123` | Admin | Project Lead |
| `lethimanager` | `admin123` | Admin | Team Manager |

### Member Accounts
| Tên đăng nhập | Mật khẩu | Vai trò | Bộ phận |
|---------------|----------|---------|---------|
| `member1` | `member123` | Member | Development |
| `nguyenvana` | `member123` | Member | Frontend Dev |
| `tranthib` | `member123` | Member | UI/UX Design |
| `levanc` | `member123` | Member | Backend Dev |
| `phamthid` | `member123` | Member | QA Engineer |

## 📖 Hướng Dẫn Sử Dụng

### 🚪 Đăng Nhập
1. Truy cập `http://localhost:5173`
2. Nhập **tên đăng nhập** và **mật khẩu** (xem bảng tài khoản test ở trên)
3. Click **"🚀 Đăng Nhập"**
4. Hệ thống sẽ tự động chuyển hướng dựa trên vai trò:
   - Admin → `/admin`
   - Member → `/member`

### 👑 Hướng Dẫn cho Admin

#### Tạo Task Mới
1. Vào **"Create Task"** từ sidebar
2. Điền thông tin:
   - **Task Name**: Tên nhiệm vụ (bắt buộc)
   - **Priority**: Mức độ ưu tiên (Low/Medium/High/Urgent)
   - **Due Date**: Ngày hết hạn (bắt buộc)
   - **Description**: Mô tả chi tiết
3. **Assign Members**:
   - Gõ tên hoặc email trong ô tìm kiếm
   - Chọn members từ dropdown suggestions
   - Có thể assign cho nhiều người
4. Click **"Create Task"**

#### Quản Lý Tasks
1. Vào **"View Tasks"** để xem tất cả nhiệm vụ
2. **Filter Options**:
   - Status: All/Pending/In Progress/Completed
   - Priority: All/Low/Medium/High/Urgent
   - Search: Tìm kiếm theo tên hoặc mô tả
3. **Sort Options**: Date/Priority/Status
4. Click vào task để xem chi tiết và comments

#### Quản Lý Members
1. Vào **"Members"** để xem danh sách thành viên
2. Thông tin hiển thị:
   - Tên, email, bộ phận, chức vụ
   - Trạng thái hoạt động
   - Lần đăng nhập cuối
3. Có thể filter và search members

### 👤 Hướng Dẫn cho Member

#### Xem Tasks Cá Nhân
1. Vào **"My Tasks"** để xem nhiệm vụ được giao
2. **Dashboard Overview**:
   - Tổng số tasks
   - Tasks hoàn thành
   - Tasks quá hạn
   - Tasks đang làm

#### Cập Nhật Trạng Thái Task
1. Click vào task muốn cập nhật
2. Sử dụng dropdown **"Update Status"**:
   - **Pending**: Chưa bắt đầu
   - **In Progress**: Đang thực hiện
   - **Completed**: Hoàn thành
3. Thay đổi sẽ được lưu tự động

#### Comment và Đánh Giá
1. Trong trang chi tiết task, scroll xuống phần **"Comments & Ratings"**
2. **Thêm comment**:
   - Nhập nội dung comment
   - Chọn rating (1-5 sao)
   - Click **"Add Comment"**
3. **Quản lý comments**:
   - Chỉ có thể xóa comment của chính mình
   - Comments hiển thị real-time
   - Xem average rating của task

#### Lọc và Tìm Kiếm
1. Sử dụng **Filter Controls**:
   - **Status Filter**: Lọc theo trạng thái
   - **Priority Filter**: Lọc theo mức độ ưu tiên
   - **Search**: Tìm kiếm trong tên và mô tả
2. **Sort Options**:
   - **By Date**: Sắp xếp theo deadline
   - **By Priority**: Sắp xếp theo mức độ ưu tiên
   - **By Status**: Sắp xếp theo trạng thái

## 📁 Cấu Trúc Dự Án

```
my-blank-react/
├── src/
│   ├── admin/              # Components dành cho Admin
│   │   ├── CreateTask.jsx  # Tạo task mới
│   │   ├── ViewTask.jsx    # Xem và quản lý tasks
│   │   ├── Member.jsx      # Quản lý members
│   │   ├── Profile.jsx     # Profile admin
│   │   └── Feedback.jsx    # Quản lý feedback
│   ├── member/             # Components dành cho Member
│   │   ├── MyTasks.jsx     # Tasks cá nhân
│   │   ├── Profile.jsx     # Profile member
│   │   └── Feedback.jsx    # Gửi feedback
│   ├── layout/             # Layout components
│   │   ├── AdminLayout.jsx # Layout cho admin
│   │   └── MemberLayout.jsx# Layout cho member
│   ├── components/         # Shared components
│   ├── Login/              # Authentication
│   ├── data/               # Mock data và API
│   ├── firebase.js         # Firebase configuration
│   └── App.jsx             # Main app component
├── public/                 # Static assets
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

## 🎨 Screenshots

### Login Page
- Giao diện đăng nhập hiện đại với form validation
- Hỗ trợ cả admin và member accounts

### Admin Dashboard
- Overview tổng quan hệ thống
- Quick actions và statistics
- Sidebar navigation với collapse/expand

### Member Dashboard
- Personal task overview
- Progress tracking
- Quick filters và search

### Task Management
- Create/Edit tasks với rich UI
- Member assignment với search suggestions
- Priority và status management

## 🔧 Cấu Hình

### Environment Variables
Tạo file `.env` trong thư mục root (nếu cần):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
```



## 📝 Development Notes

### Available Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Code Style
- Sử dụng ESLint với React rules
- Prettier cho code formatting
- CSS Modules cho styling

### Data Management
- LocalStorage cho session và tasks
- Mock data trong `src/data/mockData.js`
- Firebase ready cho production




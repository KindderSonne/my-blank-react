import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import AdminLayout from './layout/AdminLayout';
import MemberLayout from './layout/MemberLayout';
import CreateTask from './admin/CreateTask';
import ViewTask from './admin/ViewTask';
import Member from './admin/Member';
import AdminProfile from './admin/Profile';
import MyTasks from './member/MyTasks';
import MemberProfile from './member/Profile';
import MemberFeedback from './member/Feedback';
import AdminFeedback from './admin/Feedback';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/tasks" replace />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="tasks" element={<ViewTask />} />
          <Route path="tasks/:taskId" element={<ViewTask />} />
          <Route path="view-task" element={<ViewTask />} />
          <Route path="member" element={<Member />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="feedback" element={<AdminFeedback />} />
        </Route>

        {/* Member Routes */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<Navigate to="/member/my-tasks" replace />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="my-tasks/:taskId" element={<MyTasks />} />
          <Route path="profile" element={<MemberProfile />} />
          <Route path="feedback" element={<MemberFeedback />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
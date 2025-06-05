import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MemberSidebar from '../member/MemberSideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MemberLayout.css';

const MemberLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Listen for sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle);
    
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle);
    };
  }, []);

  return (
    <div className="member-layout">
      <MemberSidebar />
      
      <div className={`member-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        
        <main className="member-content">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MemberLayout;
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MemberSidebar from '../member/MemberSideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdPopup from '../components/AdPopup';
import Cookies from 'js-cookie';
import './MemberLayout.css';

const MemberLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);

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

  // Show advertisement popup after 1 minute
  useEffect(() => {
    // Check if the user has opted out of seeing the popup
    const hideAdPopup = Cookies.get('hideAdPopup');
    
    if (!hideAdPopup) {
      const timer = setTimeout(() => {
        setShowAdPopup(true);
      }, 60000); // 60000ms = 1 minute
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseAdPopup = () => {
    setShowAdPopup(false);
  };

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

      {showAdPopup && <AdPopup onClose={handleCloseAdPopup} />}
    </div>
  );
};

export default MemberLayout;
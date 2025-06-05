import React, { useState, useEffect } from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsCollapsed(true); 
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        
        // Dispatch custom event for layout to listen
        window.dispatchEvent(new CustomEvent('sidebarToggle', {
            detail: { collapsed: !isCollapsed }
        }));
    };

    return (
        <>
            {/* Toggle Button */}
            <button 
                className={`sidebar-toggle ${isCollapsed ? 'collapsed' : ''}`}
                onClick={toggleSidebar}
                title={isCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
            >
                {isCollapsed ? '☰' : '✕'}
            </button>

            {/* Sidebar */}
            <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                {!isCollapsed && (
                    <>
                        <div className="sidebar-content">
                            <h4>Admin Panel</h4>
                            <div className="sidebar-nav">
                                <button onClick={() => navigate('/admin/tasks')}>
                                    👀 View Task
                                </button>
                                <button onClick={() => navigate('/admin/create-task')}>
                                    📝 Create Task
                                </button>
                                <button onClick={() => navigate('/admin/member')}>
                                    👥 Member
                                </button>
                                <button onClick={() => navigate('/admin/profile')}>
                                    👤 Profile
                                </button>
                            </div>
                        </div>
                        
                        {/* Logout button at bottom */}
                        <div className="sidebar-bottom">
                            <button 
                                onClick={() => navigate('/')}
                                className="logout-btn"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    </>
                )}
                
                {/* Collapsed state - only icons */}
                {isCollapsed && (
                    <>
                        <div className="sidebar-icons">
                            <button 
                                onClick={() => navigate('/admin/tasks')}
                                title="View Task"
                                className="icon-only"
                            >
                                👀
                            </button>
                            <button 
                                onClick={() => navigate('/admin/create-task')}
                                title="Create Task"
                                className="icon-only"
                            >
                                📝
                            </button>
                            <button 
                                onClick={() => navigate('/admin/member')}
                                title="Member"
                                className="icon-only"
                            >
                                👥
                            </button>
                            <button 
                                onClick={() => navigate('/admin/profile')}
                                title="Profile"
                                className="icon-only"
                            >
                                👤
                            </button>
                        </div>
                        
                        {/* Logout icon at bottom */}
                        <div className="sidebar-bottom-collapsed">
                            <button 
                                onClick={() => navigate('/')}
                                title="Logout"
                                className="icon-only logout-icon"
                            >
                                🚪 
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile Overlay */}
            {isMobile && !isCollapsed && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setIsCollapsed(true)}
                />
            )}
        </>
    )
}

export default AdminSidebar
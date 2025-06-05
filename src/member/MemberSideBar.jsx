import React, { useState, useEffect } from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom';

const MemberSidebar = () => {
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
            <div className={`member-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                {!isCollapsed && (
                    <>
                        <div className="sidebar-content">
                            <h4>Member Panel</h4>
                            <div className="sidebar-nav">
                                <button onClick={() => navigate('/member/my-tasks')}>
                                    📋 My Tasks
                                </button>
                                <button onClick={() => navigate('/member/profile')}>
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
                                onClick={() => navigate('/member/my-tasks')}
                                title="My Tasks"
                                className="icon-only"
                            >
                                📋
                            </button>
                            <button 
                                onClick={() => navigate('/member/profile')}
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

export default MemberSidebar
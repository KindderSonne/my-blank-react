import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        username: ''
    });

    useEffect(() => {
        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(currentUser);
        setEditForm({
            name: currentUser.name || '',
            email: currentUser.email || '',
            username: currentUser.username || ''
        });
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing && user) {
            setEditForm({
                name: user.name || '',
                email: user.email || '',
                username: user.username || ''
            });
        }
    };

    const handleSaveProfile = () => {
        const updatedUser = {
            ...user,
            ...editForm
        };
        
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditForm({
            name: user.name || '',
            email: user.email || '',
            username: user.username || ''
        });
    };

    const getRoleLabel = (role) => {
        switch(role) {
            case 'admin': return 'Quản trị viên';
            case 'member': return 'Thành viên';
            default: return 'Người dùng';
        }
    };

    const getRoleColor = (role) => {
        switch(role) {
            case 'admin': return '#dc2626';
            case 'member': return '#16a34a';
            default: return '#64748b';
        }
    };

    if (!user) {
        return <div className="profile-loading">Đang tải thông tin...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1>👤 Thông tin cá nhân</h1>
                <p>Quản lý thông tin tài khoản của bạn</p>
            </div>

            <div className="profile-container">
                {/* Avatar Section */}
                <div className="profile-avatar-section">
                    <div className="profile-avatar-large">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-avatar-info">
                        <h2>{user.name || 'Chưa có tên'}</h2>
                        <span 
                            className="profile-role-badge"
                            style={{ backgroundColor: getRoleColor(user.role) }}
                        >
                            {getRoleLabel(user.role)}
                        </span>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="profile-info-section">
                    <div className="profile-info-header">
                        <h3>Thông tin tài khoản</h3>
                        <button 
                            className={`profile-edit-btn ${isEditing ? 'editing' : ''}`}
                            onClick={handleEditToggle}
                        >
                            {isEditing ? '❌ Hủy' : '✏️ Chỉnh sửa'}
                        </button>
                    </div>

                    <div className="profile-info-grid">
                        <div className="profile-info-item">
                            <label>Họ và tên</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                    className="profile-input"
                                />
                            ) : (
                                <div className="profile-value">{user.name || 'Chưa cập nhật'}</div>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <label>Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                    className="profile-input"
                                />
                            ) : (
                                <div className="profile-value">{user.email || 'Chưa cập nhật'}</div>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <label>Tên đăng nhập</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                    className="profile-input"
                                />
                            ) : (
                                <div className="profile-value">@{user.username || 'Chưa cập nhật'}</div>
                            )}
                        </div>

                        <div className="profile-info-item">
                            <label>Vai trò</label>
                            <div className="profile-value">
                                <span 
                                    className="profile-role-small"
                                    style={{ backgroundColor: getRoleColor(user.role) }}
                                >
                                    {getRoleLabel(user.role)}
                                </span>
                            </div>
                        </div>

                        <div className="profile-info-item">
                            <label>Ngày tạo tài khoản</label>
                            <div className="profile-value">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Không xác định'}
                            </div>
                        </div>

                        <div className="profile-info-item">
                            <label>Trạng thái</label>
                            <div className="profile-value">
                                <span className={`profile-status ${user.isActive !== false ? 'active' : 'inactive'}`}>
                                    {user.isActive !== false ? '🟢 Hoạt động' : '🔴 Tạm dừng'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="profile-actions">
                            <button 
                                className="profile-cancel-btn"
                                onClick={handleCancelEdit}
                            >
                                Hủy
                            </button>
                            <button 
                                className="profile-save-btn"
                                onClick={handleSaveProfile}
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    )}
                </div>

                {/* Statistics Section (for admins) */}
                {user.role === 'admin' && (
                    <div className="profile-stats-section">
                        <h3>Thống kê hoạt động</h3>
                        <div className="profile-stats-grid">
                            <div className="profile-stat-card">
                                <div className="profile-stat-icon">📊</div>
                                <div className="profile-stat-content">
                                    <h4>Quản trị hệ thống</h4>
                                    <p>Quyền quản lý toàn bộ</p>
                                </div>
                            </div>
                            <div className="profile-stat-card">
                                <div className="profile-stat-icon">👥</div>
                                <div className="profile-stat-content">
                                    <h4>Quản lý thành viên</h4>
                                    <p>Thêm, sửa, xóa người dùng</p>
                                </div>
                            </div>
                            <div className="profile-stat-card">
                                <div className="profile-stat-icon">📋</div>
                                <div className="profile-stat-content">
                                    <h4>Quản lý nhiệm vụ</h4>
                                    <p>Tạo và phân công task</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Member specific section */}
                {user.role === 'member' && (
                    <div className="profile-stats-section">
                        <h3>Hoạt động của tôi</h3>
                        <div className="profile-stats-grid">
                            <div className="profile-stat-card">
                                <div className="profile-stat-icon">📋</div>
                                <div className="profile-stat-content">
                                    <h4>Nhiệm vụ của tôi</h4>
                                    <p>Xem và cập nhật task</p>
                                </div>
                            </div>
                            <div className="profile-stat-card">
                                <div className="profile-stat-icon">✅</div>
                                <div className="profile-stat-content">
                                    <h4>Hoàn thành công việc</h4>
                                    <p>Đánh dấu task đã xong</p>
                                </div>
                            </div>
                            <div className="profile-stat-card">
                                <div className="profile-stat-icon">🔄</div>
                                <div className="profile-stat-content">
                                    <h4>Cập nhật tiến độ</h4>
                                    <p>Theo dõi quá trình làm việc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile; 
import React, { useState, useEffect } from 'react';
import { mockAccounts } from '../data/mockData';
import './Member.css';

const Member = () => {
    const [members, setMembers] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [newMember, setNewMember] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        role: 'member'
    });

    useEffect(() => {
        // Load all accounts (excluding current admin)
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const allMembers = mockAccounts.filter(account => account.email !== currentUser.email);
        setMembers(allMembers);
    }, []);

    const handleAddMember = (e) => {
        e.preventDefault();
        const newId = Math.max(...mockAccounts.map(acc => acc.id)) + 1;
        const memberToAdd = {
            ...newMember,
            id: newId,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        
        setMembers([...members, memberToAdd]);
        setNewMember({
            name: '',
            email: '',
            username: '',
            password: '',
            role: 'member'
        });
        setShowAddPopup(false);
    };

    const toggleMemberStatus = (memberId) => {
        setMembers(members.map(member => 
            member.id === memberId 
                ? { ...member, isActive: !member.isActive }
                : member
        ));
    };

    const deleteMember = (memberId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thành viên này?')) {
            setMembers(members.filter(member => member.id !== memberId));
        }
    };

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            member.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || member.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getRoleColor = (role) => {
        switch(role) {
            case 'admin': return '#dc2626';
            case 'member': return '#16a34a';
            default: return '#64748b';
        }
    };

    const getRoleLabel = (role) => {
        switch(role) {
            case 'admin': return 'Quản trị viên';
            case 'member': return 'Thành viên';
            default: return role;
        }
    };

    return (
        <div className="member-management">
            <div className="member-header">
                <div className="header-content">
                    <h1>👥 Quản lý thành viên</h1>
                    <p>Quản lý danh sách thành viên trong hệ thống</p>
                </div>
                <button 
                    className="add-member-btn"
                    onClick={() => setShowAddPopup(true)}
                >
                    ➕ Thêm thành viên
                </button>
            </div>

            {/* Statistics */}
            <div className="member-stats">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>Tổng thành viên</h3>
                        <div className="stat-number">{members.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>Đang hoạt động</h3>
                        <div className="stat-number">{members.filter(m => m.isActive !== false).length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">👨‍💼</div>
                    <div className="stat-content">
                        <h3>Quản trị viên</h3>
                        <div className="stat-number">{members.filter(m => m.role === 'admin').length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">👤</div>
                    <div className="stat-content">
                        <h3>Thành viên</h3>
                        <div className="stat-number">{members.filter(m => m.role === 'member').length}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="member-filters">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="🔍 Tìm kiếm thành viên..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-group">
                    <label>Vai trò:</label>
                    <select 
                        value={filterRole} 
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Tất cả vai trò</option>
                        <option value="admin">Quản trị viên</option>
                        <option value="member">Thành viên</option>
                    </select>
                </div>
            </div>

            {/* Members Table */}
            <div className="members-table-container">
                <table className="members-table">
                    <thead>
                        <tr>
                            <th>Thông tin</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map(member => (
                            <tr key={member.id}>
                                <td>
                                    <div className="member-info">
                                        <div className="member-avatar">
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="member-details">
                                            <div className="member-name">{member.name}</div>
                                            <div className="member-email">{member.email}</div>
                                            <div className="member-username">@{member.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span 
                                        className="role-badge"
                                        style={{ backgroundColor: getRoleColor(member.role) }}
                                    >
                                        {getRoleLabel(member.role)}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${member.isActive !== false ? 'active' : 'inactive'}`}>
                                        {member.isActive !== false ? '🟢 Hoạt động' : '🔴 Tạm dừng'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="action-btn toggle"
                                            onClick={() => toggleMemberStatus(member.id)}
                                            title={member.isActive !== false ? 'Tạm dừng' : 'Kích hoạt'}
                                        >
                                            {member.isActive !== false ? '⏸️' : '▶️'}
                                        </button>
                                        <button 
                                            className="action-btn delete"
                                            onClick={() => deleteMember(member.id)}
                                            title="Xóa"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Member Popup */}
            {showAddPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h2>➕ Thêm thành viên mới</h2>
                            <button 
                                className="close-btn"
                                onClick={() => setShowAddPopup(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleAddMember} className="add-member-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Họ và tên *</label>
                                    <input
                                        type="text"
                                        value={newMember.name}
                                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        value={newMember.email}
                                        onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tên đăng nhập *</label>
                                    <input
                                        type="text"
                                        value={newMember.username}
                                        onChange={(e) => setNewMember({...newMember, username: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu *</label>
                                    <input
                                        type="password"
                                        value={newMember.password}
                                        onChange={(e) => setNewMember({...newMember, password: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Vai trò</label>
                                    <select
                                        value={newMember.role}
                                        onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                                    >
                                        <option value="member">Thành viên</option>
                                        <option value="admin">Quản trị viên</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => setShowAddPopup(false)}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className="submit-btn">
                                    Thêm thành viên
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Member; 
import React, { useState, useEffect } from 'react';
import './Feedback.css';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [filterRead, setFilterRead] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const currentAdmin = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        // Load feedback from localStorage
        const storedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
        
        // Filter feedback directed to the current admin
        const adminFeedback = storedFeedback.filter(
            feedback => feedback.toAdmin.id === currentAdmin.id
        );
        
        setFeedbacks(adminFeedback);
    }, [currentAdmin.id]);

    const markAsRead = (feedbackId) => {
        const updatedFeedbacks = feedbacks.map(feedback => 
            feedback.id === feedbackId ? { ...feedback, read: true } : feedback
        );
        
        setFeedbacks(updatedFeedbacks);
        
        // Update in localStorage
        const allFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
        const updatedAllFeedback = allFeedback.map(feedback => 
            feedback.id === feedbackId ? { ...feedback, read: true } : feedback
        );
        
        localStorage.setItem('feedback', JSON.stringify(updatedAllFeedback));
        
        // If this is the selected feedback, update it too
        if (selectedFeedback && selectedFeedback.id === feedbackId) {
            setSelectedFeedback({ ...selectedFeedback, read: true });
        }
    };

    const deleteFeedback = (feedbackId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa ý kiến này?')) {
            const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
            setFeedbacks(updatedFeedbacks);
            
            // Update in localStorage
            const allFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
            const updatedAllFeedback = allFeedback.filter(feedback => feedback.id !== feedbackId);
            
            localStorage.setItem('feedback', JSON.stringify(updatedAllFeedback));
            
            // If this is the selected feedback, clear it
            if (selectedFeedback && selectedFeedback.id === feedbackId) {
                setSelectedFeedback(null);
            }
        }
    };

    const viewFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        
        // Mark as read if not already read
        if (!feedback.read) {
            markAsRead(feedback.id);
        }
    };

    const closeDetailView = () => {
        setSelectedFeedback(null);
    };

    const filteredFeedbacks = feedbacks.filter(feedback => {
        const matchesReadFilter = 
            filterRead === 'all' || 
            (filterRead === 'read' && feedback.read) || 
            (filterRead === 'unread' && !feedback.read);
            
        const matchesSearchTerm = 
            feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.fromUser.name.toLowerCase().includes(searchTerm.toLowerCase());
            
        return matchesReadFilter && matchesSearchTerm;
    });

    const getFormattedDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const unreadCount = feedbacks.filter(f => !f.read).length;
    
    return (
        <div className="admin-feedback-page">
            <div className="feedback-header">
                <div className="header-content">
                    <h1>📬 Quản lý ý kiến</h1>
                    <p>Xem và phản hồi các ý kiến từ thành viên</p>
                </div>
            </div>

            {/* Statistics */}
            <div className="feedback-stats">
                <div className="stat-card">
                    <div className="stat-icon">💬</div>
                    <div className="stat-content">
                        <h3>Tổng số</h3>
                        <div className="stat-number">{feedbacks.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📩</div>
                    <div className="stat-content">
                        <h3>Chưa đọc</h3>
                        <div className="stat-number">{unreadCount}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>Đã đọc</h3>
                        <div className="stat-number">{feedbacks.length - unreadCount}</div>
                    </div>
                </div>
            </div>
            
            <div className="feedback-container">
                {/* Filters */}
                <div className="feedback-filters">
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder="🔍 Tìm kiếm ý kiến..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label>Trạng thái:</label>
                        <select 
                            value={filterRead} 
                            onChange={(e) => setFilterRead(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">Tất cả</option>
                            <option value="read">Đã đọc</option>
                            <option value="unread">Chưa đọc</option>
                        </select>
                    </div>
                </div>

                <div className="feedback-content">
                    {/* Feedback List */}
                    <div className="feedback-list">
                        <h2>Danh sách ý kiến ({filteredFeedbacks.length})</h2>
                        
                        {filteredFeedbacks.length === 0 ? (
                            <div className="no-feedback">
                                <div className="no-data-icon">📭</div>
                                <p>Không có ý kiến nào</p>
                            </div>
                        ) : (
                            <div className="feedback-list-items">
                                {filteredFeedbacks.map(feedback => (
                                    <div 
                                        key={feedback.id} 
                                        className={`feedback-item ${feedback.read ? 'read' : 'unread'} ${selectedFeedback && selectedFeedback.id === feedback.id ? 'active' : ''}`}
                                        onClick={() => viewFeedback(feedback)}
                                    >
                                        <div className="feedback-item-header">
                                            <div className="feedback-item-from">
                                                <div className="sender-avatar">
                                                    {feedback.fromUser.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{feedback.fromUser.name}</span>
                                            </div>
                                            <div className="feedback-item-date">
                                                {getFormattedDate(feedback.createdAt)}
                                            </div>
                                        </div>
                                        <div className="feedback-item-subject">
                                            {!feedback.read && <span className="unread-badge">Mới</span>}
                                            <h3>{feedback.subject}</h3>
                                        </div>
                                        <div className="feedback-item-preview">
                                            {feedback.message.length > 100 
                                                ? `${feedback.message.substring(0, 100)}...` 
                                                : feedback.message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Feedback Detail View */}
                    {selectedFeedback ? (
                        <div className="feedback-detail">
                            <div className="feedback-detail-header">
                                <h2>{selectedFeedback.subject}</h2>
                                <button 
                                    className="close-detail-btn"
                                    onClick={closeDetailView}
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className="feedback-metadata">
                                <div className="feedback-sender">
                                    <div className="sender-avatar large">
                                        {selectedFeedback.fromUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="sender-info">
                                        <h3>{selectedFeedback.fromUser.name}</h3>
                                        <p>{selectedFeedback.fromUser.email}</p>
                                        <span className="feedback-date">
                                            {getFormattedDate(selectedFeedback.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="feedback-detail-content">
                                {selectedFeedback.message}
                            </div>
                            
                            <div className="feedback-actions">
                                <button 
                                    className="action-btn delete"
                                    onClick={() => deleteFeedback(selectedFeedback.id)}
                                >
                                    🗑️ Xóa
                                </button>
                                <button 
                                    className="action-btn reply"
                                    onClick={() => window.location.href = `mailto:${selectedFeedback.fromUser.email}?subject=Re: ${selectedFeedback.subject}`}
                                >
                                    ↩️ Phản hồi
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="feedback-detail empty">
                            <div className="empty-state">
                                <div className="empty-icon">📄</div>
                                <h3>Chọn một ý kiến để xem</h3>
                                <p>Chọn một ý kiến từ danh sách bên trái để xem chi tiết</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feedback;
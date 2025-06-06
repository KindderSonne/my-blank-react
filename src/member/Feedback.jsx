import React, { useState, useEffect } from 'react';
import { mockAdmins } from '../data/mockData';
import './Feedback.css';

function Feedback() {
    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [admins, setAdmins] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
    
    useEffect(() => {
        // Load admin list
        setAdmins(mockAdmins);
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!selectedAdmin) {
            setError('Vui lòng chọn quản trị viên để gửi ý kiến');
            return;
        }
        
        if (!subject.trim()) {
            setError('Vui lòng nhập tiêu đề ý kiến');
            return;
        }
        
        if (!message.trim()) {
            setError('Vui lòng nhập nội dung ý kiến');
            return;
        }
        
        // Create feedback object
        const feedback = {
            id: Date.now(),
            fromUser: {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email
            },
            toAdmin: JSON.parse(selectedAdmin),
            subject: subject,
            message: message,
            createdAt: new Date().toISOString(),
            read: false
        };
        
        // Get existing feedback from localStorage or create empty array
        const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
        
        // Add new feedback
        const updatedFeedback = [...existingFeedback, feedback];
        
        // Save to localStorage
        localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
        
        // Reset form and show success message
        setSelectedAdmin('');
        setSubject('');
        setMessage('');
        setError('');
        setSubmitted(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };
    
    return (
        <div className="feedback-page">
            <div className="feedback-header">
                <h1>💬 Gửi ý kiến</h1>
                <p>Gửi ý kiến, góp ý hoặc yêu cầu đến quản trị viên</p>
            </div>
            
            <div className="feedback-container">
                {submitted && (
                    <div className="feedback-success">
                        <div className="success-icon">✅</div>
                        <div className="success-message">
                            <h3>Gửi ý kiến thành công!</h3>
                            <p>Ý kiến của bạn đã được gửi đến quản trị viên.</p>
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="feedback-error">
                        <div className="error-icon">⚠️</div>
                        <div className="error-message">{error}</div>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-group">
                        <label>Gửi đến quản trị viên:</label>
                        <select 
                            value={selectedAdmin}
                            onChange={(e) => setSelectedAdmin(e.target.value)}
                            className="feedback-select"
                        >
                            <option value="">-- Chọn quản trị viên --</option>
                            {admins.map(admin => (
                                <option key={admin.id} value={JSON.stringify(admin)}>
                                    {admin.name} ({admin.position})
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Tiêu đề:</label>
                        <input 
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Nhập tiêu đề ý kiến"
                            className="feedback-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Nội dung:</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Nhập nội dung ý kiến, góp ý hoặc yêu cầu của bạn..."
                            className="feedback-textarea"
                            rows={5}
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            Gửi ý kiến
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Feedback;
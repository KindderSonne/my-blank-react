import React, { useState, useEffect } from 'react';
import { priorityOptions, statusOptions, mockMembers } from '../data/mockData';
import './EditTaskPopup.css';

function EditTaskPopup({ task, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        priority: 'medium',
        status: 'pending',
        assignedMember: []
    });

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [showMemberDropdown, setShowMemberDropdown] = useState(false);

    useEffect(() => {
        if (task && isOpen) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                date: task.date || '',
                priority: task.priority || 'medium',
                status: task.status || 'pending',
                assignedMember: task.assignedMember || []
            });
            setSelectedMembers(task.assignedMember || []);
        }
    }, [task, isOpen]);

    if (!isOpen || !task) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMemberToggle = (member) => {
        const isSelected = selectedMembers.some(m => m.id === member.id);
        
        if (isSelected) {
            setSelectedMembers(prev => prev.filter(m => m.id !== member.id));
        } else {
            setSelectedMembers(prev => [...prev, member]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const updatedTask = {
            ...task,
            ...formData,
            assignedMember: selectedMembers,
            assignedTo: selectedMembers.map(m => m.name),
            assignedToEmails: selectedMembers.map(m => m.email)
        };
        
        onSave(updatedTask);
    };

    const availableMembers = mockMembers.filter(member => 
        !selectedMembers.some(selected => selected.id === member.id)
    );

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="edit-popup">
                <div className="popup-header">
                    <h2>✏️ Edit Task</h2>
                    <button className="close-button" onClick={onClose}>
                        ✕
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="popup-content">
                        <div className="form-group">
                            <label htmlFor="title">Task Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter task title"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description *</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter task description"
                                className="form-textarea"
                                rows="4"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="date">Due Date *</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority *</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    required
                                    className="form-select"
                                >
                                    {priorityOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status *</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                                className="form-select"
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Assigned Members</label>
                            
                            <div className="selected-members">
                                {selectedMembers.map(member => (
                                    <div key={member.id} className="selected-member-tag">
                                        <span className="member-avatar">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                        <span className="member-name">{member.name}</span>
                                        <button
                                            type="button"
                                            className="remove-member"
                                            onClick={() => handleMemberToggle(member)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {availableMembers.length > 0 && (
                                <div className="add-members-section">
                                    <button
                                        type="button"
                                        className="add-members-btn"
                                        onClick={() => setShowMemberDropdown(!showMemberDropdown)}
                                    >
                                        + Add Members
                                    </button>

                                    {showMemberDropdown && (
                                        <div className="members-dropdown">
                                            {availableMembers.map(member => (
                                                <div
                                                    key={member.id}
                                                    className="member-option"
                                                    onClick={() => {
                                                        handleMemberToggle(member);
                                                        setShowMemberDropdown(false);
                                                    }}
                                                >
                                                    <div className="member-avatar">
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="member-details">
                                                        <div className="member-name">{member.name}</div>
                                                        <div className="member-email">{member.email}</div>
                                                        <div className="member-department">{member.department}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="popup-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskPopup; 
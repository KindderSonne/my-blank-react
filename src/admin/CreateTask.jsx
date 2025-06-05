import './CreateTask.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMembers, priorityOptions, mockTasks } from '../data/mockData';

function CreateTask() {
    const navigate = useNavigate();
    const [priority, setPriority] = useState('medium');
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskDescription, setTaskDescription] = useState(''); // Sửa typo
    const [memberInput, setMemberInput] = useState('');
    const [selectedMember, setSelectedMember] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [memberSuggestions, setMemberSuggestions] = useState([]); // Sửa typo

    const handleMemberChange = (value) => {
        setMemberInput(value);
        if (value.length > 0) {
            const filtered = mockMembers.filter(mem =>
                (mem.name.toLowerCase().includes(value.toLowerCase()) ||
                mem.email.toLowerCase().includes(value.toLowerCase())) && // Thêm dấu ngoặc đơn
                !selectedMember.some(selected => selected.id === mem.id)
            );
            setMemberSuggestions(filtered);
            setShowSuggestions(true);        
        } else {
            setShowSuggestions(false);
        }
    }
    
    const selectMember = (member) => {
        if(!selectedMember.some(mem => mem.id === member.id)) {
            setSelectedMember([...selectedMember, member]);
            setMemberInput('');
            setShowSuggestions(false);
        }
    }

    const removeMember = (memberId) => {
        setSelectedMember(selectedMember.filter(mem => mem.id !== memberId));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName || !taskDate) {
            alert('Please fill in all required fields');
            return;
        }

        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        const newTask = {
            id : Date.now(),
            title: taskName,
            date: taskDate,
            priority: priority,
            description: taskDescription,
            assignedTo: selectedMember.map(mem => mem.name),
            assignedToEmails: selectedMember.map(mem => mem.email),
            assignedMember: selectedMember,
            status: 'pending',
            createdAt: new Date().toISOString(),
            assignedAt: new Date().toISOString(),
            createdBy: {
                id: currentUser.id || 1,
                name: currentUser.name || 'Admin',
                email: currentUser.email || 'admin@example.com'
            }
        };

        // Load existing tasks from localStorage or use mockTasks
        const savedTasks = localStorage.getItem('updatedTasks');
        const existingTasks = savedTasks ? JSON.parse(savedTasks) : [...mockTasks];
        
        // Add new task to the list
        const updatedTasks = [...existingTasks, newTask];
        
        // Save to localStorage
        localStorage.setItem('updatedTasks', JSON.stringify(updatedTasks));
        
        console.log('New Task Created:', newTask);

        const assignMemberNames = selectedMember.map(mem => mem.name).join(', ');
        alert(`Task "${taskName}" has been assigned to: ${assignMemberNames}`);
        
        // Navigate to tasks view to see the new task
        navigate('/admin/tasks');
    }

    return (
        <div className="create-task-container">
            <div className="create-task-header">
                <h1>Create Task</h1>
                <p>Assign Task to Team Members</p>
            </div>
            
            <form onSubmit={handleSubmit} className="create-task-form">
                <h3 className="form-section-title">Task Details</h3>
                
                <div className="form-group">
                    <label>Task Name *</label>
                    <input 
                        type="text" 
                        className="form-input"
                        placeholder="Enter task name" 
                        required
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label>Priority</label>
                    <select
                        className="form-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}>
                        {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Due Date *</label>
                    <input 
                        type="date" 
                        className="form-input"
                        required
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        className="form-textarea"
                        placeholder="Enter task description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        rows="4"
                    />
                </div>
                
                <div className="form-group member-section">
                    <label>Assigned Members</label>
                    <div className="selected-members">
                        {selectedMember.map((member) => (
                            <div key={member.id} className="assigned-member">
                                <span>{member.name}</span>
                                <button 
                                    type="button" 
                                    className="remove-member-btn"
                                    onClick={() => removeMember(member.id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="member-search-container">
                        <input 
                            type="text"
                            className="member-input"
                            placeholder="Search members by name or email"
                            value={memberInput}
                            onChange={(e) => handleMemberChange(e.target.value)}
                            onFocus={() => memberInput && setShowSuggestions(true)}
                        />
                        
                        {showSuggestions && memberSuggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {memberSuggestions.map((member) => (
                                    <div 
                                        key={member.id} 
                                        className="suggestion-item"
                                        onClick={() => selectMember(member)}
                                    >
                                        {member.name} ({member.email})
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                <button type="submit" className="submit-btn">
                    Create Task
                </button>
            </form>
        </div>
    );
}

export default CreateTask;
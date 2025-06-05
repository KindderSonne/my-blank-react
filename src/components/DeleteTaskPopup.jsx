import React from 'react';
import './DeleteTaskPopup.css';

function DeleteTaskPopup({ task, isOpen, onClose, onConfirm }) {
    if (!isOpen || !task) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="delete-popup">
                <div className="popup-header">
                    <h2>🗑️ Delete Task</h2>
                    <button className="close-button" onClick={onClose}>
                        ✕
                    </button>
                </div>
                
                <div className="popup-content">
                    <div className="warning-icon">
                        ⚠️
                    </div>
                    <h3>Are you sure you want to delete this task?</h3>
                    <p>This action cannot be undone.</p>
                    
                    <div className="task-preview">
                        <div className="task-title">
                            <strong>Task:</strong> {task.title}
                        </div>
                        <div className="task-details">
                            <span className={`priority-badge priority-${task.priority}`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            <span className={`status-badge status-${task.status}`}>
                                {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                            </span>
                        </div>
                        <div className="task-assignees">
                            <strong>Assigned to:</strong> {task.assignedMember.length} member{task.assignedMember.length > 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
                
                <div className="popup-actions">
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="delete-button" onClick={() => onConfirm(task.id)}>
                        Delete Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTaskPopup; 
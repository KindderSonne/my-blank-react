import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockTasks, priorityOptions, statusOptions } from '../data/mockData';
import './MyTasks.css';

const MyTasks = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [searchTerm, setSearchTerm] = useState('');

    // Comment states
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Load tasks from localStorage or use mockTasks as fallback
    const loadTasks = () => {
        const savedTasks = localStorage.getItem('updatedTasks');
        let allTasks = savedTasks ? JSON.parse(savedTasks) : [...mockTasks];
        
        // Filter tasks assigned to current member
        const memberTasks = allTasks.filter(task => 
            task.assignedMember.some(member => member.email === currentUser.email)
        );
        return memberTasks;
    };

    // Load comments from localStorage
    const loadComments = (taskId) => {
        const savedComments = localStorage.getItem(`taskComments_${taskId}`);
        const comments = savedComments ? JSON.parse(savedComments) : [];
        return comments;
    };

    // Save comments to localStorage
    const saveComments = (taskId, commentsData) => {
        localStorage.setItem(`taskComments_${taskId}`, JSON.stringify(commentsData));
    };

    useEffect(() => {
        const memberTasks = loadTasks();
        setTasks(memberTasks);
        
        // Load comments if viewing specific task
        if (taskId) {
            const taskComments = loadComments(taskId);
            setComments(taskComments);
        }

        // Set up periodic refresh for comments to ensure sync
        let intervalId;
        if (taskId) {
            intervalId = setInterval(() => {
                const currentComments = loadComments(taskId);
                setComments(prevComments => {
                    if (JSON.stringify(prevComments) !== JSON.stringify(currentComments)) {
                        return currentComments;
                    }
                    return prevComments;
                });
            }, 2000); // Check every 2 seconds
        }
        
        // Cleanup interval on unmount
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [currentUser.email, taskId]);

    // Manual refresh function
    const refreshComments = () => {
        if (taskId) {
            const freshComments = loadComments(taskId);
            setComments(freshComments);
        }
    };

    // Add new comment
    const addComment = () => {
        if (!newComment.trim()) return;
        
        const comment = {
            id: Date.now(),
            author: currentUser.name,
            authorEmail: currentUser.email,
            authorRole: currentUser.role,
            content: newComment,
            rating: newRating,
            createdAt: new Date().toISOString(),
            avatar: currentUser.name.split(' ').map(n => n[0]).join('')
        };

        const updatedComments = [...comments, comment];
        setComments(updatedComments);
        saveComments(taskId, updatedComments);
        
        // Reset form
        setNewComment('');
        setNewRating(5);
    };

    // Delete comment (only author can delete their own comment)
    const deleteComment = (commentId) => {
        const comment = comments.find(c => c.id === commentId);
        
        if (comment.authorEmail === currentUser.email) {
            const updatedComments = comments.filter(c => c.id !== commentId);
            setComments(updatedComments);
            saveComments(taskId, updatedComments);
        }
    };

    // Calculate average rating
    const getAverageRating = () => {
        if (comments.length === 0) return 0;
        const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
        return (sum / comments.length).toFixed(1);
    };

    // Update task status and save to localStorage
    const updateTaskStatus = (taskId, newStatus) => {
        // Get all tasks from localStorage or mockTasks
        const savedTasks = localStorage.getItem('updatedTasks');
        let allTasks = savedTasks ? JSON.parse(savedTasks) : [...mockTasks];
        
        // Update the specific task
        allTasks = allTasks.map(task => 
            task.id === taskId 
                ? { 
                    ...task, 
                    status: newStatus,
                    ...(newStatus === 'completed' && { completedAt: new Date().toISOString() })
                }
                : task
        );
        
        // Save updated tasks to localStorage
        localStorage.setItem('updatedTasks', JSON.stringify(allTasks));
        
        // Update local state with member tasks only
        const memberTasks = allTasks.filter(task => 
            task.assignedMember.some(member => member.email === currentUser.email)
        );
        setTasks(memberTasks);
    };

    // Enhanced filtering and sorting
    const filteredTasks = tasks
        .filter(task => {
            if (filterStatus !== 'all' && task.status !== filterStatus) return false;
            if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
            if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                !task.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(a.date) - new Date(b.date);
                case 'priority':
                    const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });

    const getStatusCount = (status) => {
        return tasks.filter(task => task.status === status).length;
    };

    const getOverdueTasks = () => {
        return tasks.filter(task => 
            new Date(task.date) < new Date() && task.status !== 'completed'
        ).length;
    };

    // Task Detail View
    if (taskId) {
        const task = tasks.find(t => t.id === parseInt(taskId));
        
        if (!task) {
            return (
                <div className="my-tasks">
                    <div className="task-not-found">
                        <h2>Task not found or not assigned to you</h2>
                        <button onClick={() => navigate('/member/my-tasks')}>Back to My Tasks</button>
                    </div>
                </div>
            );
        }

        const isOverdue = new Date(task.date) < new Date() && task.status !== 'completed';

        return (
            <div className="my-tasks member-view">
                <div className="task-header">
                    <button className="back-button" onClick={() => navigate('/member/my-tasks')}>
                        ← Back to My Tasks
                    </button>
                    <div className="task-header-actions">
                        <h1>Task Details - Member View</h1>
                    </div>
                </div>
                
                <div className="task-details-card member-card">
                    <div className="task-title-section">
                        <h2>{task.title}</h2>
                        <div className="task-badges">
                            <span className={`priority-badge priority-${task.priority}`}>
                                {priorityOptions.find(p => p.value === task.priority)?.label}
                            </span>
                            <span className={`status-badge status-${task.status}`}>
                                {statusOptions.find(s => s.value === task.status)?.label}
                            </span>
                            {isOverdue && <span className="overdue-badge">⚠️ OVERDUE</span>}
                        </div>
                    </div>

                    {/* Member Status Control */}
                    <div className="member-controls">
                        <h3>🔧 Update Task Status</h3>
                        <div className="control-group">
                            <label>Current Status:</label>
                            <select 
                                value={task.status} 
                                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                className="status-select"
                            >
                                {statusOptions.map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="task-info-grid member-info-grid">
                        <div className="info-item">
                            <strong>📅 Due Date:</strong> 
                            <span className={isOverdue ? 'overdue' : ''}>
                                {new Date(task.date).toLocaleDateString()}
                                {isOverdue && ' ⚠️ OVERDUE'}
                            </span>
                        </div>
                        <div className="info-item">
                            <strong>📝 Created:</strong> 
                            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="info-item">
                            <strong>👨‍💼 Created By:</strong> 
                            <span>{task.createdBy.name} ({task.createdBy.email})</span>
                        </div>
                        <div className="info-item">
                            <strong>⏱️ Assigned At:</strong> 
                            <span>{new Date(task.assignedAt).toLocaleDateString()}</span>
                        </div>
                        {task.completedAt && (
                            <div className="info-item">
                                <strong>✅ Completed At:</strong> 
                                <span>{new Date(task.completedAt).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>

                    <div className="task-description">
                        <h3>📋 Description</h3>
                        <p>{task.description}</p>
                    </div>

                    {/* Team Members Section */}
                    <div className="task-members-section">
                        <h3>👥 Team Members ({task.assignedMember.length})</h3>
                        <div className="members-grid member-members-grid">
                            {task.assignedMember.map(member => {
                                const isCurrentUser = member.email === currentUser.email;
                                return (
                                    <div key={member.id} className={`member-card member-member-card ${isCurrentUser ? 'current-user-card' : ''}`}>
                                        <div className="member-avatar">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="member-info">
                                            <div className="member-name">
                                                {member.name} {isCurrentUser && '(You)'}
                                            </div>
                                            <div className="member-email">{member.email}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Comments and Rating Section */}
                    <div className="task-comments-section">
                        <div className="comments-header">
                            <h3>💬 Comments & Reviews</h3>
                            <div className="average-rating">
                                <span className="rating-label">Average Rating:</span>
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span 
                                            key={star} 
                                            className={`star ${star <= Math.round(getAverageRating()/2) ? 'filled' : ''}`}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                    <span className="rating-number">({getAverageRating()}/10)</span>
                                </div>
                                <span className="comments-count">({comments.length} comments)</span>
                                <button 
                                    onClick={refreshComments}
                                    className="refresh-comments-btn"
                                    title="Refresh comments"
                                >
                                    🔄
                                </button>
                            </div>
                        </div>

                        {/* Add Comment Form */}
                        <div className="add-comment-form">
                            <h4>✍️ Add Your Comment & Rating</h4>
                            <div className="comment-form-content">
                                <div className="rating-input">
                                    <label>Your Rating (1-10):</label>
                                    <div className="rating-controls">
                                        <input 
                                            type="range" 
                                            min="1" 
                                            max="10" 
                                            value={newRating}
                                            onChange={(e) => setNewRating(parseInt(e.target.value))}
                                            className="rating-slider"
                                        />
                                        <span className="rating-display">{newRating}/10</span>
                                        <div className="rating-stars-input">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span 
                                                    key={star} 
                                                    className={`star ${star <= Math.round(newRating/2) ? 'filled' : ''}`}
                                                >
                                                    ⭐
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-input">
                                    <label>Your Comment:</label>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Share your thoughts about this task..."
                                        rows="4"
                                        className="comment-textarea"
                                    />
                                </div>
                                <button 
                                    onClick={addComment}
                                    className="submit-comment-btn"
                                    disabled={!newComment.trim()}
                                >
                                    📝 Post Comment
                                </button>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="comments-list">
                            {comments.length > 0 ? (
                                comments
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map(comment => {
                                        const canDelete = comment.authorEmail === currentUser.email;
                                        
                                        return (
                                            <div key={comment.id} className="comment-item">
                                                <div className="comment-header">
                                                    <div className="comment-author-info">
                                                        <div className="comment-avatar">
                                                            {comment.avatar}
                                                        </div>
                                                        <div className="comment-author-details">
                                                            <div className="author-name">
                                                                {comment.author}
                                                                <span className={`role-badge role-${comment.authorRole}`}>
                                                                    {comment.authorRole}
                                                                </span>
                                                            </div>
                                                            <div className="comment-date">
                                                                {new Date(comment.createdAt).toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="comment-rating-actions">
                                                        <div className="comment-rating">
                                                            <div className="rating-stars-comment">
                                                                {[1, 2, 3, 4, 5].map(star => (
                                                                    <span 
                                                                        key={star} 
                                                                        className={`star ${star <= Math.round(comment.rating/2) ? 'filled' : ''}`}
                                                                    >
                                                                        ⭐
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <span className="comment-rating-number">{comment.rating}/10</span>
                                                        </div>
                                                        {canDelete && (
                                                            <button 
                                                                onClick={() => deleteComment(comment.id)}
                                                                className="delete-comment-btn"
                                                                title="Delete comment"
                                                            >
                                                                🗑️
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="comment-content">
                                                    {comment.content}
                                                </div>
                                            </div>
                                        );
                                    })
                            ) : (
                                <div className="no-comments">
                                    <p>No comments yet. Be the first to share your thoughts!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="my-tasks">
                <div className="tasks-header member-header">
                    <div className="header-content">
                        <h1>📋 My Tasks</h1>
                        <p>Welcome back, {currentUser.name}! Here are your assigned tasks</p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="stats-grid member-stats">
                    <div className="stat-card total">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h3>Total Tasks</h3>
                            <div className="stat-number">{tasks.length}</div>
                        </div>
                    </div>
                    <div className="stat-card pending">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-content">
                            <h3>Pending</h3>
                            <div className="stat-number">{getStatusCount('pending')}</div>
                        </div>
                    </div>
                    <div className="stat-card in-progress">
                        <div className="stat-icon">🔄</div>
                        <div className="stat-content">
                            <h3>In Progress</h3>
                            <div className="stat-number">{getStatusCount('in-progress')}</div>
                        </div>
                    </div>
                    <div className="stat-card completed">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <h3>Completed</h3>
                            <div className="stat-number">{getStatusCount('completed')}</div>
                        </div>
                    </div>
                    <div className="stat-card overdue">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <h3>Overdue</h3>
                            <div className="stat-number">{getOverdueTasks()}</div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="filters-section member-filters">
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder="🔍 Search my tasks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label>Status:</label>
                        <select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            {statusOptions.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Priority:</label>
                        <select 
                            value={filterPriority} 
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Priorities</option>
                            {priorityOptions.map(priority => (
                                <option key={priority.value} value={priority.value}>
                                    {priority.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Sort by:</label>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="date">Due Date</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </div>

                {/* Tasks Grid */}
                <div className="tasks-grid member-tasks-grid">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => {
                            const isOverdue = new Date(task.date) < new Date() && task.status !== 'completed';
                            return (
                                <div 
                                    key={task.id} 
                                    className={`task-card member-task-card ${isOverdue ? 'overdue-card' : ''}`}
                                    onClick={() => navigate(`/member/my-tasks/${task.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="task-card-header">
                                        <h3 className="task-card-title">{task.title}</h3>
                                        <div className="task-card-badges">
                                            <span className={`priority-badge priority-${task.priority}`}>
                                                {priorityOptions.find(p => p.value === task.priority)?.label}
                                            </span>
                                            <span className={`status-badge status-${task.status}`}>
                                                {statusOptions.find(s => s.value === task.status)?.label}
                                            </span>
                                            {isOverdue && <span className="overdue-badge">⚠️ OVERDUE</span>}
                                        </div>
                                    </div>

                                    <div className="task-card-body">
                                        <p className="task-description-preview">
                                            {task.description.length > 150 
                                                ? task.description.substring(0, 150) + '...' 
                                                : task.description
                                            }
                                        </p>
                                        
                                        <div className="task-card-info member-task-info">
                                            <div className="task-due-date">
                                                <strong>📅 Due:</strong> {new Date(task.date).toLocaleDateString()}
                                            </div>
                                            <div className="task-created-by">
                                                <strong>👨‍💼 Created by:</strong> {task.createdBy.name}
                                            </div>
                                            <div className="task-assigned-at">
                                                <strong>📌 Assigned:</strong> {new Date(task.assignedAt).toLocaleDateString()}
                                            </div>
                                            {task.completedAt && (
                                                <div className="task-completed-at">
                                                    <strong>✅ Completed:</strong> {new Date(task.completedAt).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>

                                        {/* Member can update status */}
                                        <div className="member-actions">
                                            <label><strong>Update Status:</strong></label>
                                            <select 
                                                value={task.status} 
                                                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="status-select-small"
                                            >
                                                {statusOptions.map(status => (
                                                    <option key={status.value} value={status.value}>
                                                        {status.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* View Details Button */}
                                        <div className="task-actions">
                                            <button 
                                                className="view-details-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/member/my-tasks/${task.id}`);
                                                }}
                                            >
                                                👁️ View Details & Comments
                                            </button>
                                        </div>

                                        {/* Show other team members */}
                                        {task.assignedMember.length > 1 && (
                                            <div className="team-members">
                                                <strong>👥 Team Members:</strong>
                                                <div className="members-list">
                                                    {task.assignedMember.map(member => (
                                                        <span 
                                                            key={member.id} 
                                                            className={`member-tag ${member.email === currentUser.email ? 'current-user' : ''}`}
                                                        >
                                                            {member.name} {member.email === currentUser.email && '(You)'}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-tasks">
                            <h3>No tasks found</h3>
                            <p>You don't have any tasks assigned yet, or try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default MyTasks; 
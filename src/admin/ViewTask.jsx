import { mockMembers, priorityOptions, mockTasks, statusOptions, getAdminById, getMemberById } from '../data/mockData';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteTaskPopup from '../components/DeleteTaskPopup';
import EditTaskPopup from '../components/EditTaskPopup';
import './ViewTask.css'

function ViewTask() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Popup states
    const [deletePopup, setDeletePopup] = useState({ isOpen: false, task: null });
    const [editPopup, setEditPopup] = useState({ isOpen: false, task: null });

    // Comment states
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);

    // Load tasks from localStorage or use mockTasks as fallback
    const loadTasks = () => {
        const savedTasks = localStorage.getItem('updatedTasks');
        return savedTasks ? JSON.parse(savedTasks) : [...mockTasks];
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
        const allTasks = loadTasks();
        setTasks(allTasks);
        
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
    }, [taskId]);

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
        
        const currentUser = JSON.parse(localStorage.getItem('user'));
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

    // Delete comment (only author or admin can delete)
    const deleteComment = (commentId) => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const comment = comments.find(c => c.id === commentId);
        
        if (comment.authorEmail === currentUser.email || currentUser.role === 'admin') {
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

    // Admin actions - now saves to localStorage
    const updateTaskStatus = (taskId, newStatus) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId 
                ? { 
                    ...task, 
                    status: newStatus,
                    ...(newStatus === 'completed' && { completedAt: new Date().toISOString() })
                }
                : task
        );
        
        setTasks(updatedTasks);
        localStorage.setItem('updatedTasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (taskIdToDelete) => {
        const updatedTasks = tasks.filter(task => task.id !== taskIdToDelete);
        setTasks(updatedTasks);
        localStorage.setItem('updatedTasks', JSON.stringify(updatedTasks));
        setDeletePopup({ isOpen: false, task: null });
        
        // If we're viewing the deleted task, navigate back to task list
        if (taskIdToDelete === parseInt(taskId)) {
            navigate('/admin/tasks');
        }
    };

    const saveTask = (updatedTask) => {
        const updatedTasks = tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('updatedTasks', JSON.stringify(updatedTasks));
        setEditPopup({ isOpen: false, task: null });
    };

    const openDeletePopup = (task) => {
        setDeletePopup({ isOpen: true, task });
    };

    const openEditPopup = (task) => {
        setEditPopup({ isOpen: true, task });
    };

    const closeDeletePopup = () => {
        setDeletePopup({ isOpen: false, task: null });
    };

    const closeEditPopup = () => {
        setEditPopup({ isOpen: false, task: null });
    };

    // Nếu có taskId trong URL, hiển thị chi tiết task
    if (taskId) {
        const task = tasks.find(t => t.id === parseInt(taskId));
        
        if (!task) {
            return (
                <div className="view-task">
                    <div className="task-not-found">
                        <h2>Task not found</h2>
                        <button onClick={() => navigate('/admin/tasks')}>Back to Task Management</button>
                    </div>
                </div>
            );
        }

        const createdByAdmin = getAdminById(task.createdBy.id);

        return (
            <div className="view-task admin-view">
                <div className="task-header">
                    <button className="back-button" onClick={() => navigate('/admin/tasks')}>
                        ← Back to Task Management
                    </button>
                    <div className="task-header-actions">
                        <h1>Task Details - Admin View</h1>
                        <div className="header-buttons">
                            <button className="edit-button" onClick={() => openEditPopup(task)}>
                                ✏️ Edit Task
                            </button>
                            <button className="delete-button" onClick={() => openDeletePopup(task)}>
                                🗑️ Delete Task
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="task-details-card admin-card">
                    <div className="task-title-section">
                        <h2>{task.title}</h2>
                        <div className="task-badges">
                            <span className={`priority-badge priority-${task.priority}`}>
                                {priorityOptions.find(p => p.value === task.priority)?.label}
                            </span>
                            <span className={`status-badge status-${task.status}`}>
                                {statusOptions.find(s => s.value === task.status)?.label}
                            </span>
                        </div>
                    </div>

                    {/* Admin Controls */}
                    <div className="admin-controls">
                        <h3>🛠️ Admin Controls</h3>
                        <div className="control-group">
                            <label>Update Status:</label>
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

                    <div className="task-info-grid admin-info-grid">
                        <div className="info-item">
                            <strong>📅 Due Date:</strong> 
                            <span className={new Date(task.date) < new Date() && task.status !== 'completed' ? 'overdue' : ''}>
                                {new Date(task.date).toLocaleDateString()}
                                {new Date(task.date) < new Date() && task.status !== 'completed' && ' ⚠️ OVERDUE'}
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

                    {/* Enhanced Members Section */}
                    <div className="task-members-section">
                        <h3>👥 Assigned Members ({task.assignedMember.length})</h3>
                        <div className="members-grid admin-members-grid">
                            {task.assignedMember.map(member => {
                                return (
                                    <div key={member.id} className="member-card admin-member-card">
                                        <div className="member-avatar">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="member-info">
                                            <div className="member-name">{member.name}</div>
                                            <div className="member-email">{member.email}</div>
                                        </div>
                                        <button 
                                            className="remove-member-btn"
                                            onClick={() => {
                                                // Logic to remove member from task
                                                const updatedTask = {
                                                    ...task,
                                                    assignedMember: task.assignedMember.filter(m => m.id !== member.id),
                                                    assignedTo: task.assignedTo.filter(name => name !== member.name),
                                                    assignedToEmails: task.assignedToEmails.filter(email => email !== member.email)
                                                };
                                                saveTask(updatedTask);
                                            }}
                                        >
                                            Remove
                                        </button>
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
                                        const currentUser = JSON.parse(localStorage.getItem('user'));
                                        const canDelete = comment.authorEmail === currentUser.email || currentUser.role === 'admin';
                                        
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

                {/* Popups only appear in task detail view */}
                <DeleteTaskPopup
                    task={deletePopup.task}
                    isOpen={deletePopup.isOpen}
                    onClose={closeDeletePopup}
                    onConfirm={deleteTask}
                />

                <EditTaskPopup
                    task={editPopup.task}
                    isOpen={editPopup.isOpen}
                    onClose={closeEditPopup}
                    onSave={saveTask}
                />
            </div>
        );
    }

    // Enhanced filtering and sorting - Removed progress sorting
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
                case 'created':
                    return new Date(b.createdAt) - new Date(a.createdAt);
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

    return (
        <div className="view-task admin-dashboard">
            <div className="tasks-header admin-header">
                <div className="header-content">
                    <h1>🔧 Admin Task Management Dashboard</h1>
                    <p>Manage and monitor all project tasks</p>
                </div>
                <button 
                    className="create-task-button" 
                    onClick={() => navigate('/admin/create-task')}
                >
                    ➕ Create New Task
                </button>
            </div>

            {/* Enhanced Statistics Cards */}
            <div className="stats-grid admin-stats">
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

            {/* Enhanced Filters and Search */}
            <div className="filters-section admin-filters">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="🔍 Search tasks..."
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
                        <option value="created">Created Date</option>
                    </select>
                </div>
            </div>

            {/* Enhanced Tasks Grid - Removed time tracking and progress */}
            <div className="tasks-grid admin-tasks-grid">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => {
                        const isOverdue = new Date(task.date) < new Date() && task.status !== 'completed';
                        return (
                            <div 
                                key={task.id} 
                                className={`task-card admin-task-card ${isOverdue ? 'overdue-card' : ''}`}
                                onClick={() => navigate(`/admin/tasks/${task.id}`)}
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
                                        {task.description.length > 100 
                                            ? task.description.substring(0, 100) + '...' 
                                            : task.description
                                        }
                                    </p>
                                    
                                    <div className="task-card-info admin-task-info">
                                        <div className="task-due-date">
                                            📅 {new Date(task.date).toLocaleDateString()}
                                        </div>
                                        <div className="task-assignees">
                                            👥 {task.assignedMember.length} member{task.assignedMember.length > 1 ? 's' : ''}
                                        </div>
                                        <div className="task-created-by">
                                            👨‍💼 {task.createdBy.name}
                                        </div>
                                    </div>

                                    <div className="task-members-preview">
                                        {task.assignedMember.slice(0, 3).map(member => (
                                            <div key={member.id} className="member-avatar-small">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        ))}
                                        {task.assignedMember.length > 3 && (
                                            <div className="member-avatar-small more">
                                                +{task.assignedMember.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-tasks">
                        <h3>No tasks found</h3>
                        <p>Try adjusting your filters or create a new task.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewTask;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { 
  MessageSquare, 
  Paperclip, 
  MoreHorizontal, 
  ChevronDown,
  GripVertical,
  Calendar,
  User
} from 'lucide-react';
import { moveTask, deleteTask, updateTask } from '../../redux/slices/tasksSlice';

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'low':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'low':
        return 'bg-orange-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStatusChange = (newStatus) => {
    dispatch(moveTask({ taskId: task.id, newStatus }));
    setShowStatusDropdown(false);
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
    setShowMoreActions(false);
  };

  const getStatusOptions = (currentStatus) => {
    const allStatuses = [
      { value: 'todo', label: 'To Do', color: 'text-orange-600' },
      { value: 'progress', label: 'In Progress', color: 'text-blue-600' },
      { value: 'done', label: 'Done', color: 'text-green-600' }
    ];
    return allStatuses.filter(status => status.value !== currentStatus);
  };

  // Simple Avatar Component (inline)
  const SimpleAvatar = ({ userId, size = 'sm' }) => {
    const users = {
      'user1': { name: 'John Doe', color: '#6366f1' },
      'user2': { name: 'Sarah Miller', color: '#f59e0b' },
      'user3': { name: 'Mike Johnson', color: '#22c55e' },
      'user4': { name: 'Emily Davis', color: '#ef4444' },
      'user5': { name: 'Chris Wilson', color: '#8b5cf6' }
    };
    
    const user = users[userId] || { name: 'U', color: '#6b7280' };
    const initials = user.name.split(' ').map(n => n).join('').slice(0, 2);
    const sizeClass = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';
    
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center text-white font-semibold border-2 border-white`}
        style={{ backgroundColor: user.color }}
        title={user.name}
      >
        {initials}
      </div>
    );
  };

  // Simple Badge Component (inline)
  const SimpleBadge = ({ variant, text }) => {
    const getVariantClasses = (variant) => {
      switch (variant) {
        case 'high':
          return 'bg-red-100 text-red-700 border-red-200';
        case 'low':
          return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'completed':
          return 'bg-green-100 text-green-700 border-green-200';
        default:
          return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getVariantClasses(variant)}`}>
        {text}
      </span>
    );
  };

  const renderAssignees = () => {
    const maxVisible = 3;
    const visibleAssignees = task.assignees?.slice(0, maxVisible) || [];
    const remainingCount = (task.assignees?.length || 0) - maxVisible;

    return (
      <div className="flex items-center -space-x-1">
        {visibleAssignees.map((assigneeId, index) => (
          <SimpleAvatar
            key={assigneeId}
            userId={assigneeId}
            size="sm"
          />
        ))}
        {remainingCount > 0 && (
          <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
            snapshot.isDragging 
              ? 'shadow-2xl rotate-2 transform scale-105 border-primary-300' 
              : 'hover:border-gray-300'
          } ${snapshot.isDragging ? 'z-50' : ''}`}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging 
              ? `${provided.draggableProps.style?.transform} rotate(3deg)` 
              : provided.draggableProps.style?.transform,
          }}
        >
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-between p-4 cursor-move hover:bg-gray-50 rounded-t-lg transition-colors group"
          >
            <div className="flex items-center space-x-2 flex-1">
              <div className={`w-2 h-2 rounded-full ${getPriorityDot(task.priority)}`} />
            </div>
            <div className="flex items-center space-x-1">
              <GripVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <button
                  onClick={() => setShowMoreActions(!showMoreActions)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
                
                {showMoreActions && (
                  <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <button
                      onClick={() => {
                        setShowMoreActions(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                    >
                      Edit Task
                    </button>
                    <button
                      onClick={handleDeleteTask}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete Task
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 pb-4">
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {task.title}
            </h3>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>

            {task.images && task.images.length > 0 && (
              <div className="mb-3">
                <img
                  src={task.images}
                  alt={task.title}
                  className="w-full h-32 object-cover rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() => {
                  }}
                />
              </div>
            )}

            <div className="mb-3">
              <SimpleBadge
                text={task.priority === 'completed' ? 'Completed' : `${task.priority} Priority`}
                variant={task.priority}
              />
            </div>

            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {task.category}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                {task.comments > 0 && (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs">{task.comments}</span>
                  </div>
                )}
                {task.files > 0 && (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Paperclip className="w-4 h-4" />
                    <span className="text-xs">{task.files}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {renderAssignees()}
              </div>
            </div>

            <div className="mt-3 relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">Move to...</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showStatusDropdown && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  {getStatusOptions(task.status).map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(status.value)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${status.color}`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {snapshot.isDragging && (
            <div className="absolute inset-0 bg-primary-50 bg-opacity-50 rounded-lg pointer-events-none" />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
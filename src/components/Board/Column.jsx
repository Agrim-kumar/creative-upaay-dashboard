import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { Plus, MoreHorizontal, ArrowRight } from 'lucide-react';
import TaskCard from './TaskCard';
import Modal from '../UI/Modal';
import { addTask } from '../../redux/slices/tasksSlice';

const Column = ({ column, isDraggingOver, draggingOverWith }) => {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    priority: 'low',
    category: 'Design'
  });

  const getDropZoneStyles = (status, isDraggingOver) => {
    const baseStyles = "min-h-96 rounded-lg transition-all duration-300 p-2";
    
    if (isDraggingOver) {
      switch (status) {
        case 'todo':
          return `${baseStyles} bg-orange-50 border-2 border-dashed border-orange-300 shadow-inner`;
        case 'progress':
          return `${baseStyles} bg-blue-50 border-2 border-dashed border-blue-300 shadow-inner`;
        case 'done':
          return `${baseStyles} bg-green-50 border-2 border-dashed border-green-300 shadow-inner`;
        default:
          return `${baseStyles} bg-gray-50 border-2 border-dashed border-gray-300`;
      }
    }
    
    return `${baseStyles} bg-gray-50 border border-transparent`;
  };

  const getColumnHeaderColor = (status) => {
    switch (status) {
      case 'todo':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-700',
          accent: 'bg-orange-500',
          border: 'border-orange-200'
        };
      case 'progress':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          accent: 'bg-blue-500',
          border: 'border-blue-200'
        };
      case 'done':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          accent: 'bg-green-500',
          border: 'border-green-200'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          accent: 'bg-gray-500',
          border: 'border-gray-200'
        };
    }
  };

  const handleAddTask = () => {
    if (newTaskData.title.trim()) {
      const newTask = {
        ...newTaskData,
        id: Date.now().toString(),
        status: column.status,
        projectId: 'mobile-app', // Should come from current project
        assignees: ['user1'],
        comments: 0,
        files: 0,
        createdAt: new Date().toISOString()
      };
      
      dispatch(addTask(newTask));
      setNewTaskData({
        title: '',
        description: '',
        priority: 'low',
        category: 'Design'
      });
      setShowAddModal(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewTaskData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const colors = getColumnHeaderColor(column.status);
  
  return (
    <div className="h-full">
      {}
      <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4 mb-4 shadow-sm`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${colors.accent}`}></div>
            <h3 className={`font-semibold ${colors.text}`}>
              {column.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
              {column.count}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setShowAddModal(true)}
              className={`p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-all duration-200 ${colors.text} hover:scale-110`}
              title="Add new task"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button className={`p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors ${colors.text}`}>
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {}
        <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${colors.accent}`}
            style={{ width: `${Math.min((column.count / 10) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {}
      <Droppable droppableId={column.status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={getDropZoneStyles(column.status, snapshot.isDraggingOver)}
          >
            {}
            {snapshot.isDraggingOver && (
              <div className={`mb-4 p-4 rounded-lg border-2 border-dashed ${colors.border} ${colors.bg} text-center`}>
                <ArrowRight className={`w-6 h-6 mx-auto mb-2 ${colors.text} animate-pulse`} />
                <p className={`text-sm font-medium ${colors.text}`}>
                  Drop your task here
                </p>
              </div>
            )}

            {}
            <div className="space-y-4">
              {column.tasks?.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            </div>
            
            {provided.placeholder}

            {}
            {(!column.tasks || column.tasks.length === 0) && !snapshot.isDraggingOver && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm mb-2">No tasks yet</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
                >
                  Add your first task
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>

      {}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-white transition-all duration-200 flex items-center justify-center space-x-2 group"
      >
        <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">Add new card</span>
      </button>

      {}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={`Add New Task - ${column.title}`}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title..."
              value={newTaskData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Enter task description..."
              value={newTaskData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={newTaskData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="low">Low Priority</option>
                <option value="high">High Priority</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={newTaskData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="Design">Design</option>
                <option value="Planning">Planning</option>
                <option value="Research">Research</option>
                <option value="Development">Development</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddTask}
              disabled={!newTaskData.title.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Column;
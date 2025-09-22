import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { moveTask, reorderTasks } from '../../redux/slices/tasksSlice';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);
  const activeProject = useSelector(state => state.projects.activeProject);
  const filters = useSelector(state => state.filters);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Project filter
      if (task.projectId !== activeProject) return false;
      
      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      
      // Category filter
      if (filters.category !== 'all' && task.category !== filters.category) return false;
      
      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return task.title.toLowerCase().includes(searchLower) ||
               task.description.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
  }, [tasks, activeProject, filters]);

  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter(task => task.status === 'todo'),
      progress: filteredTasks.filter(task => task.status === 'progress'),
      done: filteredTasks.filter(task => task.status === 'done'),
    };
  }, [filteredTasks]);

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      status: 'todo',
      tasks: tasksByStatus.todo,
      count: tasksByStatus.todo.length,
      color: 'bg-orange-100 text-orange-800',
      borderColor: 'border-orange-200',
      accentColor: 'bg-orange-500'
    },
    {
      id: 'progress',
      title: 'On Progress',
      status: 'progress',
      tasks: tasksByStatus.progress,
      count: tasksByStatus.progress.length,
      color: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-200',
      accentColor: 'bg-blue-500'
    },
    {
      id: 'done',
      title: 'Done',
      status: 'done',
      tasks: tasksByStatus.done,
      count: tasksByStatus.done.length,
      color: 'bg-green-100 text-green-800',
      borderColor: 'border-green-200',
      accentColor: 'bg-green-500'
    }
  ];

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If no destination (dropped outside)
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    
    // If moving between different columns
    if (sourceStatus !== destinationStatus) {
      dispatch(moveTask({
        taskId: draggableId,
        newStatus: destinationStatus,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }));
    } else {
      // If reordering within the same column
      dispatch(reorderTasks({
        taskId: draggableId,
        status: sourceStatus,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }));
    }
  };

  const onDragStart = (start) => {
    // Optional: Add haptic feedback or visual changes when drag starts
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const onDragUpdate = (update) => {
    // Optional: Handle drag updates for real-time feedback
    const { destination } = update;
    if (destination) {
      // Could add visual indicators here
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6">
      <DragDropContext 
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <div className="flex space-x-6 h-full overflow-x-auto pb-6">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`h-full transition-all duration-200 ${
                      snapshot.isDraggingOver 
                        ? 'transform scale-102 shadow-lg' 
                        : ''
                    }`}
                  >
                    <Column
                      column={column}
                      isDraggingOver={snapshot.isDraggingOver}
                      draggingOverWith={snapshot.draggingOverWith}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
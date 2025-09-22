// Action types
export const MOVE_TASK = 'MOVE_TASK';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

// Action creators
export const moveTask = (taskId, sourceStatus, destinationStatus, sourceIndex, destinationIndex) => ({
  type: MOVE_TASK,
  payload: {
    taskId,
    sourceStatus,
    destinationStatus,
    sourceIndex,
    destinationIndex,
  },
});

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (taskId, updates) => ({
  type: UPDATE_TASK,
  payload: { taskId, updates },
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});
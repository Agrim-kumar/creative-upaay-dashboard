export const APP_CONFIG = {
  NAME: 'Creative Upaay Dashboard',
  VERSION: '1.0.0',
  DESCRIPTION: 'A modern project management dashboard',
};

export const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'progress',
  DONE: 'done',
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUSES.TODO]: 'To Do',
  [TASK_STATUSES.IN_PROGRESS]: 'On Progress',
  [TASK_STATUSES.DONE]: 'Done',
};

export const TASK_PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  COMPLETED: 'completed',
};

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITIES.HIGH]: 'High Priority',
  [TASK_PRIORITIES.MEDIUM]: 'Medium Priority',
  [TASK_PRIORITIES.LOW]: 'Low Priority',
  [TASK_PRIORITIES.COMPLETED]: 'Completed',
};

export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITIES.HIGH]: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-200',
  },
  [TASK_PRIORITIES.MEDIUM]: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
  [TASK_PRIORITIES.LOW]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    border: 'border-yellow-200',
  },
  [TASK_PRIORITIES.COMPLETED]: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
  },
};

// Task Categories
export const TASK_CATEGORIES = {
  DESIGN: 'Design',
  PLANNING: 'Planning',
  RESEARCH: 'Research',
  DEVELOPMENT: 'Development',
  TESTING: 'Testing',
  DEPLOYMENT: 'Deployment',
};

// Column Colors
export const COLUMN_COLORS = {
  [TASK_STATUSES.TODO]: {
    primary: 'purple',
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    text: 'text-purple-700',
    dot: 'bg-purple-500',
  },
  [TASK_STATUSES.IN_PROGRESS]: {
    primary: 'orange',
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
  },
  [TASK_STATUSES.DONE]: {
    primary: 'green',
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
};

// Project Colors
export const PROJECT_COLORS = {
  BLUE: '#3b82f6',
  INDIGO: '#6366f1',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
  RED: '#ef4444',
  ORANGE: '#f97316',
  AMBER: '#f59e0b',
  YELLOW: '#eab308',
  LIME: '#84cc16',
  GREEN: '#22c55e',
  EMERALD: '#10b981',
  TEAL: '#14b8a6',
  CYAN: '#06b6d4',
  SKY: '#0ea5e9',
};

export const PROJECT_COLOR_CLASSES = {
  [PROJECT_COLORS.BLUE]: 'bg-blue-500',
  [PROJECT_COLORS.INDIGO]: 'bg-indigo-500',
  [PROJECT_COLORS.PURPLE]: 'bg-purple-500',
  [PROJECT_COLORS.PINK]: 'bg-pink-500',
  [PROJECT_COLORS.RED]: 'bg-red-500',
  [PROJECT_COLORS.ORANGE]: 'bg-orange-500',
  [PROJECT_COLORS.AMBER]: 'bg-amber-500',
  [PROJECT_COLORS.YELLOW]: 'bg-yellow-500',
  [PROJECT_COLORS.LIME]: 'bg-lime-500',
  [PROJECT_COLORS.GREEN]: 'bg-green-500',
  [PROJECT_COLORS.EMERALD]: 'bg-emerald-500',
  [PROJECT_COLORS.TEAL]: 'bg-teal-500',
  [PROJECT_COLORS.CYAN]: 'bg-cyan-500',
  [PROJECT_COLORS.SKY]: 'bg-sky-500',
};

// Navigation Items
export const NAVIGATION_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    active: true,
  },
  {
    id: 'team',
    label: 'Team',
    path: '/team',
    active: false,
  },
  {
    id: 'contacts',
    label: 'Contacts',
    path: '/contacts',
    active: false,
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    active: false,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    path: '/calendar',
    active: false,
  },
];

// Local Storage Keys
export const STORAGE_KEYS = {
  DASHBOARD_STATE: 'dashboardState',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed',
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  TASKS: '/api/tasks',
  PROJECTS: '/api/projects',
  USERS: '/api/users',
  COMMENTS: '/api/comments',
  FILES: '/api/files',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Animation Durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  SLOWER: 500,
};

// Default Values
export const DEFAULTS = {
  TASK_PRIORITY: TASK_PRIORITIES.LOW,
  TASK_STATUS: TASK_STATUSES.TODO,
  TASK_CATEGORY: TASK_CATEGORIES.DESIGN,
  PROJECT_COLOR: PROJECT_COLORS.BLUE,
  AVATAR_FALLBACK: '👤',
  EMPTY_STATE_MESSAGE: 'No items found',
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please select a supported file.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_DELETED: 'Task deleted successfully!',
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  FILE_UPLOADED: 'File uploaded successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
};

// Feature Flags (for future use)
export const FEATURE_FLAGS = {
  DRAG_AND_DROP: true,
  FILE_UPLOAD: true,
  COMMENTS: true,
  NOTIFICATIONS: false,
  DARK_MODE: false,
  REAL_TIME_UPDATES: false,
};
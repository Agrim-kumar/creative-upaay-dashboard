import { format, parseISO, isValid, differenceInDays, isToday, isYesterday, isTomorrow } from 'date-fns';
import { 
  TASK_PRIORITIES, 
  TASK_PRIORITY_COLORS, 
  PROJECT_COLOR_CLASSES,
  PROJECT_COLORS,
  DATE_FORMATS,
  ERROR_MESSAGES 
} from './constants';



export const formatDate = (date, formatString = DATE_FORMATS.DISPLAY) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, formatString) : 'Invalid Date';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const getRelativeDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) return 'Invalid Date';
    
    if (isToday(dateObj)) return 'Today';
    if (isYesterday(dateObj)) return 'Yesterday';
    if (isTomorrow(dateObj)) return 'Tomorrow';
    
    const daysDiff = differenceInDays(new Date(), dateObj);
    
    if (daysDiff > 0) {
      return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
    } else {
      return `In ${Math.abs(daysDiff)} day${Math.abs(daysDiff) === 1 ? '' : 's'}`;
    }
  } catch (error) {
    console.error('Error getting relative date:', error);
    return 'Invalid Date';
  }
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  try {
    const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    return isValid(dateObj) && differenceInDays(dateObj, new Date()) < 0;
  } catch {
    return false;
  }
};

export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const slugify = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateInitials = (name) => {
  if (!name || typeof name !== 'string') return 'N/A';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};



export const groupBy = (array, key) => {
  if (!Array.isArray(array)) return {};
  return array.reduce((groups, item) => {
    const group = item[key];
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {});
};

export const sortBy = (array, key, direction = 'asc') => {
  if (!Array.isArray(array)) return [];
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (direction === 'desc') {
      return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
    }
    return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
  });
};

export const filterTasks = (tasks, filters) => {
  if (!Array.isArray(tasks)) return [];
  
  return tasks.filter(task => {
    if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    if (filters.category && filters.category !== 'all' && task.category !== filters.category) {
      return false;
    }
    
    if (filters.assignee && filters.assignee !== 'all') {
      if (!task.assignees || !task.assignees.includes(filters.assignee)) {
        return false;
      }
    }
    
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const searchableText = `${task.title} ${task.description}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });
};


export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

export const omit = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  const keysToOmit = Array.isArray(keys) ? keys : [keys];
  const result = {};
  
  for (const key in obj) {
    if (Object.hasOwn(obj, key) && !keysToOmit.includes(key)) {
      result[key] = obj[key];
    }
  }
  
  return result;
};

export const pick = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  const keysToPick = Array.isArray(keys) ? keys : [keys];
  const result = {};
  
  keysToPick.forEach(key => {
    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key];
    }
  });
  
  return result;
};



export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

export const validateTaskTitle = (title) => {
  if (!validateRequired(title)) return 'Title is required';
  if (typeof title === 'string' && title.length > 100) return 'Title must be less than 100 characters';
  return null;
};

export const validateTaskDescription = (description) => {
  if (typeof description === 'string' && description.length > 1000) {
    return 'Description must be less than 1000 characters';
  }
  return null;
};



export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
  if (!filename || typeof filename !== 'string') return '';
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.slice(lastDot + 1).toLowerCase() : '';
};

export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  return imageExtensions.includes(getFileExtension(filename));
};

export const validateFileSize = (file, maxSize = 5 * 1024 * 1024) => {
  if (!file || !file.size) return ERROR_MESSAGES.GENERIC;
  if (file.size > maxSize) return ERROR_MESSAGES.FILE_TOO_LARGE;
  return null;
};

export const validateFileType = (file, allowedTypes = []) => {
  if (!file || !file.type) return ERROR_MESSAGES.GENERIC;
  if (allowedTypes.length === 0) return null;
  if (!allowedTypes.includes(file.type)) return ERROR_MESSAGES.INVALID_FILE_TYPE;
  return null;
};



export const getPriorityColor = (priority) => {
  return TASK_PRIORITY_COLORS[priority] || TASK_PRIORITY_COLORS[TASK_PRIORITIES.LOW];
};

export const getProjectColorClass = (color) => {
  return PROJECT_COLOR_CLASSES[color] || 'bg-gray-500';
};

export const generateRandomColor = () => {
  const colors = Object.values(PROJECT_COLORS);
  return colors[Math.floor(Math.random() * colors.length)];
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16), 
    g: parseInt(result[2], 16), 
    b: parseInt(result[3], 16)  
  } : null;
};

export const getContrastColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};



export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};



export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};



export const getQueryParams = (search = window.location.search) => {
  const params = new URLSearchParams(search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && value !== '') {
      query.append(key, value);
    }
  }
  return query.toString();
};



export const generateId = (prefix = '') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}${prefix ? '_' : ''}${timestamp}_${random}`;
};

export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};



export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

export const createAsyncQueue = () => {
  const queue = [];
  let processing = false;

  const process = async () => {
    if (processing || queue.length === 0) return;
    
    processing = true;
    while (queue.length > 0) {
      const { fn, resolve, reject } = queue.shift();
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    processing = false;
  };

  return {
    add: (fn) => {
      return new Promise((resolve, reject) => {
        queue.push({ fn, resolve, reject });
        process();
      });
    },
    size: () => queue.length,
    clear: () => queue.splice(0, queue.length),
  };
};

export default {
  formatDate,
  getRelativeDate,
  isOverdue,
  
  capitalize,
  truncateText,
  slugify,
  generateInitials,
  
  groupBy,
  sortBy,
  filterTasks,
  
  deepClone,
  omit,
  pick,
  
  validateEmail,
  validateRequired,
  validateTaskTitle,
  validateTaskDescription,
  
  formatFileSize,
  getFileExtension,
  isImageFile,
  validateFileSize,
  validateFileType,
  
  getPriorityColor,
  getProjectColorClass,
  generateRandomColor,
  hexToRgb,
  getContrastColor,
  
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  
  debounce,
  throttle,
  measurePerformance,
  createAsyncQueue,
  
  getQueryParams,
  buildQueryString,
  
  generateId,
  generateRandomString,
};

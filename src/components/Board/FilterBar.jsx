import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPriorityFilter, setCategoryFilter, setSearchTerm, clearFilters } from '../../redux/slices/filtersSlice';
import { Filter, Calendar, Search, X, ChevronDown } from 'lucide-react';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const priorities = [
    { value: 'all', label: 'All Priorities', color: 'text-gray-600' },
    { value: 'high', label: 'High Priority', color: 'text-red-600' },
    { value: 'low', label: 'Low Priority', color: 'text-orange-600' },
    { value: 'completed', label: 'Completed', color: 'text-green-600' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Design', label: 'Design' },
    { value: 'Planning', label: 'Planning' },
    { value: 'Research', label: 'Research' },
    { value: 'Development', label: 'Development' }
  ];

  const handlePriorityChange = (priority) => {
    dispatch(setPriorityFilter(priority));
    setShowPriorityDropdown(false);
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
    setShowCategoryDropdown(false);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const getCurrentPriorityLabel = () => {
    const priority = priorities.find(p => p.value === filters.priority);
    return priority ? priority.label : 'All Priorities';
  };

  const getCurrentCategoryLabel = () => {
    const category = categories.find(c => c.value === filters.category);
    return category ? category.label : 'All Categories';
  };

  const hasActiveFilters = filters.priority !== 'all' || filters.category !== 'all' || filters.searchTerm !== '';

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{getCurrentPriorityLabel()}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showPriorityDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      onClick={() => handlePriorityChange(priority.value)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm transition-colors ${
                        filters.priority === priority.value ? 'bg-blue-50 text-blue-700' : priority.color
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">{getCurrentCategoryLabel()}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-sm transition-colors ${
                        filters.category === category.value ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-1 px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">Clear</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Showing {hasActiveFilters ? 'filtered' : 'all'} tasks
          </span>
        </div>
      </div>

      {(showPriorityDropdown || showCategoryDropdown) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowPriorityDropdown(false);
            setShowCategoryDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default FilterBar;
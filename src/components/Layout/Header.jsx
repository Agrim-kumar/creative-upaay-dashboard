import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Calendar, Filter, Share, ChevronDown, Plus } from 'lucide-react';
import FilterBar from '../Board/FilterBar';

const Header = () => {
  const dispatch = useDispatch();
  const activeProjectId = useSelector(state => state.projects.activeProject);
  const activeProject = useSelector(state => 
    state.projects.items.find(p => p.id === activeProjectId)
  );
  
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const teamMembers = [
    { id: 1, avatar: 'KV', name: 'Kanhaiya Verma', color: '#6366f1' },
    { id: 2, avatar: 'JD', name: 'John Doe', color: '#f59e0b' },
    { id: 3, avatar: 'SM', name: 'Sarah Miller', color: '#22c55e' },
    { id: 4, avatar: 'RJ', name: 'Robert Johnson', color: '#ef4444' },
    { id: 5, avatar: 'LW', name: 'Lisa Williams', color: '#8b5cf6' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Project info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeProject?.color || '#6366f1' }}
                ></div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {activeProject?.name || 'Mobile App'}
                </h1>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
  <Calendar className="w-4 h-4" />
  <span>
    {new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </span>
</div>
            </div>

            {/* Right side - Actions and team */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
              </div>

              {/* Filter button */}
              <button
                onClick={() => setShowFilterBar(!showFilterBar)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>

              {/* Share button */}
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>

              {/* Team avatars */}
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {teamMembers.slice(0, 4).map((member) => (
                    <div
                      key={member.id}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                      style={{ backgroundColor: member.color }}
                      title={member.name}
                    >
                      {member.avatar}
                    </div>
                  ))}
                  {teamMembers.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                      +{teamMembers.length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* Invite button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
                <Plus className="w-4 h-4" />
                <span>Invite</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      {showFilterBar && <FilterBar onClose={() => setShowFilterBar(false)} />}
    </>
  );
};

export default Header;

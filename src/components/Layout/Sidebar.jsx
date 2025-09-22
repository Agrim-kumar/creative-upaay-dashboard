import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  Settings, 
  Users, 
  Home,
  Plus,
  MoreHorizontal 
} from 'lucide-react';
import { setActiveProject } from '../../redux/slices/projectsSlice';
import ThoughtsTimer from '../UI/ThoughtsTimer';

const Sidebar = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.items);
  const activeProjectId = useSelector(state => state.projects.activeProject);

  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: FileText, label: 'Messages', count: 3 },
    { icon: Users, label: 'Tasks', count: 7 },
    { icon: Users, label: 'Members' },
    { icon: Settings, label: 'Settings' },
  ];

  const handleProjectClick = (projectId) => {
    dispatch(setActiveProject(projectId));
  };

  return (
    <div className="w-64 bg-white h-full shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Creative Upaay </h1>
      </div>

      {/* Navigation */}
      <nav className=" px-4 py-4 space-y-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              item.active 
                ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.count && (
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                {item.count}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* My Projects */}
      <div className="px-4 pb-4">
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              My Projects
            </h3>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  project.id === activeProjectId
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                ></div>
                <span className="text-sm font-medium flex-1">{project.name}</span>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Thoughts Time */}
      <div className="bg-yellow-50  border-yellow-200 rounded-lg p-3  max-w-xs mx-auto mb-4">
        
      </div>
    </div>
  );
};

export default Sidebar;
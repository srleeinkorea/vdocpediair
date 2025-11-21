import React from 'react';
import { Agent } from '../types';

interface SidebarProps {
  agents: Agent<any>[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
  onOpenCreateAgentModal: () => void;
}

const BookOpenIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
);

const StatusActiveIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const StatusInactiveIcon: React.FC<{ className?: string }> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
);
  

const Sidebar: React.FC<SidebarProps> = ({ agents, selectedItemId, onSelectItem, onOpenCreateAgentModal }) => {
  const categories = agents.reduce<Record<string, Agent<any>[]>>((acc, agent) => {
    if (!acc[agent.category]) {
      acc[agent.category] = [];
    }
    acc[agent.category].push(agent);
    return acc;
  }, {});

  return (
    <aside className="w-64 md:w-72 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">PEDI-AIR 에이전트</h2>
      </div>
       <div className="p-4 border-b border-gray-200">
        <button 
          onClick={onOpenCreateAgentModal}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-center"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          새 에이전트 생성
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="mb-4">
            <h3 className="px-2 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">관리</h3>
            <ul>
                <li>
                <button
                    onClick={() => onSelectItem('knowledge-base')}
                    className={`w-full text-left flex items-center p-3 rounded-md transition-colors duration-200 ${
                    selectedItemId === 'knowledge-base'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <BookOpenIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium">Knowledge DB</span>
                </button>
                </li>
            </ul>
        </div>
        {Object.entries(categories).map(([category, agentList]) => (
          <div key={category} className="mb-4">
            <h3 className="px-2 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{category}</h3>
            <ul>
              {agentList.map(agent => (
                <li key={agent.id}>
                  <button
                    onClick={() => onSelectItem(agent.id)}
                    className={`w-full text-left flex items-center p-3 rounded-md transition-colors duration-200 ${
                      selectedItemId === agent.id
                        ? 'bg-blue-500 text-white shadow-sm'
                        : `text-gray-600 hover:bg-gray-100 ${!agent.enabled ? 'opacity-60' : ''}`
                    }`}
                  >
                    <agent.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium">{agent.name}</span>
                    {agent.enabled ? (
                        <StatusActiveIcon className="h-5 w-5 text-green-500" aria-label="활성" />
                    ) : (
                        <StatusInactiveIcon className="h-5 w-5 text-gray-400" aria-label="비활성" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-400">
        <p className="font-semibold text-gray-500">RAMSES</p>
        <p>Responsive Agent Management System</p>
      </div>
    </aside>
  );
};

export default Sidebar;
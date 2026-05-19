import { useState } from 'react';
import { LayoutDashboard, Target, FileSpreadsheet, Bot, Wrench, Menu } from 'lucide-react';
import Dashboard from './components/modules/Dashboard';
import OpportunityModule from './components/modules/OpportunityModule';
import BomModule from './components/modules/BomModule';
import AiAssistantModule from './components/modules/AiAssistantModule';
import NonStandardModule from './components/modules/NonStandardModule';

const MODULES = [
  { id: 'dashboard', label: '工作台概览', icon: LayoutDashboard, component: Dashboard },
  { id: 'opportunity', label: '商机与需求 (识图/纠偏)', icon: Target, component: OpportunityModule },
  { id: 'bom', label: '寻源与 BOM (解析/寻源)', icon: FileSpreadsheet, component: BomModule },
  { id: 'assistant', label: '查单与内部协同 (AI助手)', icon: Bot, component: AiAssistantModule },
  { id: 'custom', label: '非标件定制 (智能报价)', icon: Wrench, component: NonStandardModule },
];

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ActiveComponent = MODULES.find(m => m.id === activeModule)?.component || Dashboard;

  return (
    <div className="flex h-screen bg-gray-50 text-slate-800 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className={`font-bold text-lg text-red-500 overflow-hidden whitespace-nowrap transition-all ${sidebarOpen ? 'w-auto' : 'w-0 opacity-0'}`}>
            京东工业 FAE
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeModule === module.id
                  ? 'bg-red-600 text-white'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <module.icon className="w-5 h-5 flex-shrink-0" />
              <span
                className={`ml-3 overflow-hidden whitespace-nowrap transition-all ${
                  sidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'
                }`}
              >
                {module.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {MODULES.find((m) => m.id === activeModule)?.label}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>桌面 AI 机器人已连接</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>工业 AI 智能眼镜(陈伟)在线</span>
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <ActiveComponent onNavigate={setActiveModule} />
          </div>
        </div>
      </main>
    </div>
  );
}

// Just importing User for the header layout placeholder
import { User } from 'lucide-react';


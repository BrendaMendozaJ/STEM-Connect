import { useState } from 'react';
import { Home, Compass, MessageSquare, BarChart3, BookOpen } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'intereses', label: 'Intereses', icon: Compass },
    { id: 'orientacion', label: 'Orientación', icon: MessageSquare },
    { id: 'visualizacion', label: 'Visualización', icon: BarChart3 },
    { id: 'inspiracion', label: 'Inspiración', icon: BookOpen }
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'inicio':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black rounded-2xl p-8 text-cyan-100 shadow-2xl border border-cyan-500/30">
              <h2 className="text-4xl font-bold mb-4 text-cyan-400 font-mono">Descubre tu Camino STEM</h2>
              <p className="text-xl mb-6">Conoce científicos latinoamericanos inspiradores y encuentra tu vocación con ayuda de IA</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/50">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">[500+]</div>
                  <div className="text-sm text-cyan-300 font-mono">Científicos LATAM</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/50">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">[15]</div>
                  <div className="text-sm text-cyan-300 font-mono">Áreas de investigación</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'orientacion':
        return (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
              <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">Orientación Vocacional IA</h2>
              <p className="text-cyan-300 font-mono">&gt;&gt;&gt; Conversa para descubrir tu camino STEM ideal</p>
            </div>

            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-cyan-500/30">
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-black/20">
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg border bg-gray-800 text-cyan-100 border-cyan-500/50 font-mono">
                    <p className="text-sm">¡Hola! Soy tu orientador vocacional STEM. ¿En qué área te gustaría especializarte?</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan-500/30 p-4 bg-gray-900">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="&gt;&gt;&gt; Escribe tu consulta STEM..."
                    className="flex-1 px-4 py-2 bg-black/50 border border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-cyan-100 font-mono placeholder-cyan-500/70"
                  />
                  <button className="px-6 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors font-mono font-bold">
                    [SEND]
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 font-mono">{currentPage}</h2>
            <p className="text-cyan-300">Página en construcción</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900">
      <nav className="w-64 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-cyan-100 p-6 flex flex-col shadow-2xl border-r border-cyan-500/30">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-cyan-400 font-mono">AI-PathFinder</h1>
          <p className="text-cyan-300 text-sm font-mono">&gt;&gt;&gt; Sistema STEM</p>
        </div>
        
        <ul className="space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id 
                      ? 'bg-cyan-400 text-black' 
                      : 'hover:bg-blue-800/50 text-cyan-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <main className="flex-1 p-10">
        <div className="max-w-6xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
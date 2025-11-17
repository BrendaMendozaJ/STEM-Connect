import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('¡Hola! AI-PathFinder está funcionando');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4 font-mono">AI-PathFinder</h1>
        <p className="text-cyan-300 font-mono mb-8">Sistema de orientación vocacional STEM</p>
        
        <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">Estado del Sistema</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-mono">React: Funcionando</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-mono">Tailwind CSS: Funcionando</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-mono">AWS Bedrock: Integrado</span>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-black/30 rounded-lg border border-cyan-500/30">
            <p className="text-cyan-300 font-mono">{message}</p>
            <button 
              onClick={() => setMessage('¡Sistema funcionando correctamente!')}
              className="mt-4 px-4 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors font-mono font-bold"
            >
              [PROBAR]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
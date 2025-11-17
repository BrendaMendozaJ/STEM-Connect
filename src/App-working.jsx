import { useState, useEffect } from 'react';
import { Home, Compass, MessageSquare, BarChart3, BookOpen, Menu, X } from 'lucide-react';

// Componente de Navegación
const Navigation = ({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'intereses', label: 'Intereses', icon: Compass },
    { id: 'orientacion', label: 'Orientación', icon: MessageSquare },
    { id: 'visualizacion', label: 'Visualización', icon: BarChart3 },
    { id: 'inspiracion', label: 'Inspiración', icon: BookOpen }
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300
        w-64 bg-gradient-to-b from-gray-900 via-blue-900 to-black text-cyan-100 p-6
        flex flex-col shadow-2xl border-r border-cyan-500/30
      `}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-cyan-400 font-mono">AI-PathFinder</h1>
          <p className="text-cyan-300 text-sm font-mono">Sistema de orientación STEM</p>
        </div>
        
        <ul className="space-y-2 flex-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200 font-medium
                    ${currentPage === item.id 
                      ? 'bg-cyan-400 text-black shadow-lg border border-cyan-300' 
                      : 'hover:bg-blue-800/50 border border-transparent hover:border-cyan-500/50'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-6 border-t border-cyan-500/30">
          <p className="text-xs text-cyan-400 font-mono">PhawAI + TaRecDA 2025</p>
        </div>
      </nav>
    </>
  );
};

// Página de Inicio
const HomePage = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-gray-900/80 via-blue-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 text-cyan-100 shadow-2xl border border-cyan-500/30">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
          <p className="text-cyan-300 font-mono text-xl">Sistema de orientación vocacional STEM</p>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-cyan-100 font-mono">Descubre tu Camino STEM</h2>
        <p className="text-xl mb-6 opacity-90">
          Conecta con científicos latinoamericanos inspiradores y encuentra tu vocación con inteligencia artificial
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400 transition-all">
            <div className="text-3xl font-bold text-cyan-400 font-mono">[500+]</div>
            <div className="text-sm text-cyan-300 font-mono">Científicos LATAM</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 hover:border-purple-400 transition-all">
            <div className="text-3xl font-bold text-purple-400 font-mono">[15]</div>
            <div className="text-sm text-cyan-300 font-mono">Áreas de investigación</div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 hover:border-blue-400 transition-all">
            <div className="text-3xl font-bold text-blue-400 font-mono">[8]</div>
            <div className="text-sm text-cyan-300 font-mono">Países representados</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <h3 className="text-2xl font-bold mb-6 text-cyan-400 font-mono text-center">🚀 Funcionalidades</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-cyan-500/30 hover:shadow-xl hover:border-cyan-400 transition-all hover:scale-105">
            <Compass className="text-cyan-400 mb-4" size={32} />
            <h4 className="text-xl font-bold mb-2 text-cyan-100 font-mono">Explora Intereses</h4>
            <p className="text-cyan-300 text-sm">Descubre áreas de la ciencia que te apasionan y personaliza tu experiencia</p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:border-purple-400 transition-all hover:scale-105">
            <MessageSquare className="text-purple-400 mb-4" size={32} />
            <h4 className="text-xl font-bold mb-2 text-cyan-100 font-mono">Orientación IA</h4>
            <p className="text-cyan-300 text-sm">Conversa con nuestro asistente vocacional powered by AWS Bedrock</p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-500/30 hover:shadow-xl hover:border-green-400 transition-all hover:scale-105">
            <BookOpen className="text-green-400 mb-4" size={32} />
            <h4 className="text-xl font-bold mb-2 text-cyan-100 font-mono">Inspiración</h4>
            <p className="text-cyan-300 text-sm">Científicos latinoamericanos y recursos educativos generados con IA</p>
          </div>
        </div>
      </div>

      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/30 text-center">
        <p className="text-cyan-300 font-mono mb-2">
            <strong className="text-cyan-400">PhawAI + TaRecDA 2025</strong> - Arequipa, Perú
        </p>
        <p className="text-sm text-cyan-400 font-mono">
          Proyecto de orientación vocacional STEM para estudiantes latinoamericanos
        </p>
      </div>
    </div>
  );
};

// Página de Orientación con Bedrock
const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bedrockStatus, setBedrockStatus] = useState('checking');

  useEffect(() => {
    // Verificar estado de Bedrock
    const checkBedrock = async () => {
      try {
        const response = await fetch('https://ebs7w97sj7.execute-api.us-east-1.amazonaws.com/prod/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'test', conversationHistory: [] })
        });
        setBedrockStatus(response.ok ? 'online' : 'offline');
      } catch (error) {
        setBedrockStatus('offline');
      }
    };
    checkBedrock();
  }, []);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      let botResponse;
      if (bedrockStatus === 'online') {
        const response = await fetch('https://ebs7w97sj7.execute-api.us-east-1.amazonaws.com/prod/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, conversationHistory: [] })
        });
        const data = await response.json();
        botResponse = data.response || 'Error en la respuesta';
      } else {
        botResponse = generateFallbackResponse(text);
      }

      const botMessage = { id: Date.now() + 1, type: 'bot', text: botResponse };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, type: 'bot', text: generateFallbackResponse(text) };
      setMessages([...newMessages, errorMessage]);
    }
    
    setIsTyping(false);
  };

  const generateFallbackResponse = (text) => {
    const responses = [
      "Como orientador STEM, te recomiendo explorar biotecnología o ciencias de datos. Estas áreas tienen gran demanda en Latinoamérica.",
      "Las carreras más prometedoras incluyen inteligencia artificial, bioingeniería y ciencias ambientales. ¿Cuál te interesa más?",
      "Científicos latinoamericanos como Eva Ramón Gallegos (biotecnología) y Mario Molina (química) son grandes ejemplos a seguir.",
      "Para estudiantes latinoamericanos, recomiendo matemáticas aplicadas o ingeniería biomédica por su impacto social."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">Orientación Vocacional IA</h2>
            <p className="text-cyan-300 font-mono">>>> Conversa para descubrir tu camino STEM ideal</p>
          </div>
          <div className={`px-3 py-1 rounded text-xs font-mono border ${
            bedrockStatus === 'online' 
              ? 'bg-green-900/50 text-green-400 border-green-500/50' 
              : bedrockStatus === 'offline'
              ? 'bg-red-900/50 text-red-400 border-red-500/50'
              : 'bg-yellow-900/50 text-yellow-400 border-yellow-500/50'
          }`}>
            AWS Bedrock: {bedrockStatus === 'online' ? 'ON' : bedrockStatus === 'offline' ? 'OFF' : 'CHECKING'}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-cyan-500/30">
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-black/20">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg border ${
                message.type === 'user' 
                  ? 'bg-cyan-600 text-black border-cyan-400 font-mono' 
                  : 'bg-gray-800 text-cyan-100 border-cyan-500/50 font-mono'
              }`}>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 px-4 py-3 rounded-lg border border-cyan-500/50">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-cyan-500/30 p-4 bg-gray-900">
          <div className="flex gap-2 mb-3">
            {['¿Qué carreras STEM me recomiendas?', '¿Cómo saber si la IA es para mí?', 'Cuéntame sobre biotecnología'].map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="px-3 py-1 bg-cyan-900/50 text-cyan-400 rounded-lg text-xs border border-cyan-500/50 hover:bg-cyan-800/50 transition-colors font-mono"
              >
                {question}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder=">>> Escribe tu consulta STEM..."
              className="flex-1 px-4 py-2 bg-black/50 border border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-cyan-100 font-mono placeholder-cyan-500/70"
            />
            <button
              onClick={() => setMessages([])}
              className="px-4 py-2 bg-red-900/50 text-red-400 rounded-lg border border-red-500/50 hover:bg-red-800/50 transition-colors text-sm font-mono"
            >
              [CLEAR]
            </button>
            <button
              onClick={() => handleSendMessage(inputText)}
              className="px-6 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors font-mono font-bold"
            >
              [SEND]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página simple para otras secciones
const SimplePage = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">{title}</h2>
        <p className="text-cyan-300 font-mono">>>> {description}</p>
      </div>
      <div className="bg-black/40 rounded-xl p-8 shadow-lg border border-cyan-500/30 text-center">
        <p className="text-cyan-300 font-mono">Sección en desarrollo...</p>
        <p className="text-sm text-cyan-400 font-mono mt-2">¡Próximamente disponible!</p>
      </div>
    </div>
  );
};

// App Principal
function App() {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch(currentPage) {
      case 'inicio': return <HomePage />;
      case 'orientacion': return <ChatbotPage />;
      case 'intereses': return <SimplePage title="Explora tus Intereses" description="Selecciona las áreas de STEM que te apasionan" />;
      case 'visualizacion': return <SimplePage title="Visualización de Datos" description="Estadísticas sobre científicos e investigación en América Latina" />;
      case 'inspiracion': return <SimplePage title="Inspiración STEM" description="Científicos latinoamericanos y recursos educativos" />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 relative">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1 p-6 lg:p-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {renderPage()}
        </div>
      </main>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
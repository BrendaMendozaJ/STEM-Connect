import { useState, useEffect } from 'react';
import { Home, Compass, MessageSquare, BarChart3, BookOpen, Menu, X } from 'lucide-react';
import StarField from './components/StarField';
import { saveChatHistory, loadChatHistory, clearChatHistory } from './utils/chatStorage';
import { realScientists, getScientistsByFilters } from './data/scientists';
import { fetchLatinScientists, fetchPapers } from './services/openAlexAPI';
import { generateChatResponse } from './services/huggingFaceAPI';
// import aiService from './services/aiService';
import { generateComicPanel, generateComicStory } from './services/imageGeneration';

// Componente de Navegación
const Navigation = ({ currentPage, setCurrentPage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'intereses', label: 'Intereses', icon: Compass },
    { id: 'orientacion', label: 'Orientación', icon: MessageSquare },
    { id: 'visualizacion', label: 'Visualización', icon: BarChart3 },
    { id: 'inspiracion', label: 'Inspiración', icon: BookOpen },
    { id: 'recursos', label: 'Recursos', icon: X }
  ];

  // Actualizar URL sin recargar página
  useEffect(() => {
    const path = currentPage === 'inicio' ? '/' : `/${currentPage}`;
    window.history.pushState(null, '', path);
  }, [currentPage]);

  // Manejar navegación del navegador
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const page = path === '/' ? 'inicio' : path.substring(1);
      if (['inicio', 'intereses', 'orientacion', 'visualizacion', 'inspiracion', 'recursos'].includes(page)) {
        setCurrentPage(page);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setCurrentPage]);

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
          <img 
            src="/logo.png" 
            alt="AI-PathFinder Logo" 
            className="w-64 h-64 mx-auto mb-6"
          />
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
            <h4 className="text-xl font-bold mb-2 text-cyan-100 font-mono">Orientación</h4>
            <p className="text-cyan-300 text-sm">Conversa con nuestro asistente vocacional con IA híbrida (AWS Bedrock + fallbacks)</p>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-500/30 hover:shadow-xl hover:border-green-400 transition-all hover:scale-105">
            <BookOpen className="text-green-400 mb-4" size={32} />
            <h4 className="text-xl font-bold mb-2 text-cyan-100 font-mono">Inspiración </h4>
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

// Página de Intereses
const InterestsPage = () => {
  const [selectedInterests, setSelectedInterests] = useState(() => {
    const saved = localStorage.getItem('stemInterests');
    return saved ? JSON.parse(saved) : [];
  });

  const interests = [
    { id: 'ai', name: 'Inteligencia Artificial', icon: '🤖', color: 'from-purple-500 to-pink-500', description: 'Machine Learning, Deep Learning, NLP' },
    { id: 'bio', name: 'Biología', icon: '🧬', color: 'from-green-500 to-emerald-500', description: 'Genética, Biotecnología, Ecología' },
    { id: 'physics', name: 'Física', icon: '⚛️', color: 'from-blue-500 to-cyan-500', description: 'Mecánica Cuántica, Astrofísica' },
    { id: 'chem', name: 'Química', icon: '🧪', color: 'from-orange-500 to-red-500', description: 'Química Orgánica, Nanotecnología' },
    { id: 'math', name: 'Matemáticas', icon: '📐', color: 'from-indigo-500 to-purple-500', description: 'Análisis, Álgebra, Estadística' },
    { id: 'cs', name: 'Ciencias de la Computación', icon: '💻', color: 'from-cyan-500 to-blue-500', description: 'Algoritmos, Sistemas, Redes' },
    { id: 'med', name: 'Medicina', icon: '🏥', color: 'from-red-500 to-pink-500', description: 'Investigación Clínica, Salud Pública' },
    { id: 'eng', name: 'Ingeniería', icon: '⚙️', color: 'from-gray-600 to-gray-800', description: 'Civil, Mecánica, Eléctrica' },
    { id: 'astro', name: 'Astronomía', icon: '🔭', color: 'from-purple-600 to-indigo-900', description: 'Cosmología, Planetas, Estrellas' },
    { id: 'env', name: 'Ciencias Ambientales', icon: '🌍', color: 'from-green-600 to-teal-500', description: 'Cambio Climático, Sostenibilidad' },
    { id: 'neuro', name: 'Neurociencia', icon: '🧠', color: 'from-pink-500 to-rose-500', description: 'Cognición, Comportamiento' },
    { id: 'data', name: 'Data Science', icon: '📊', color: 'from-yellow-500 to-orange-500', description: 'Big Data, Análisis, Visualización' },
  ];

  const toggleInterest = (id) => {
    setSelectedInterests(prev => {
      const newInterests = prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id];
      localStorage.setItem('stemInterests', JSON.stringify(newInterests));
      return newInterests;
    });
  };

  const clearAll = () => {
    setSelectedInterests([]);
    localStorage.removeItem('stemInterests');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">Explora tus Intereses</h2>
            <p className="text-cyan-300 font-mono">>>> Selecciona las áreas de STEM que te apasionan</p>
          </div>
          {selectedInterests.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-900/50 text-red-400 rounded-lg border border-red-500/50 hover:bg-red-800/50 transition-colors font-mono"
            >
              [CLEAR_ALL]
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map(interest => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`
                  relative p-6 rounded-xl text-left transition-all duration-300
                  ${isSelected 
                    ? 'ring-4 ring-purple-400 shadow-2xl scale-105' 
                    : 'shadow-md hover:shadow-xl hover:scale-102'
                  }
                `}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${interest.color} opacity-90`}></div>
                <div className="relative text-white">
                  <div className="text-4xl mb-3">{interest.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{interest.name}</h3>
                  <p className="text-sm opacity-90">{interest.description}</p>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-white text-green-600 rounded-full p-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedInterests.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400 font-mono">Tu Perfil STEM</h3>
          <p className="mb-4 text-cyan-300 font-mono">>>> {selectedInterests.length} área(s) seleccionada(s):</p>
          <div className="flex flex-wrap gap-3">
            {selectedInterests.map(id => {
              const interest = interests.find(i => i.id === id);
              return (
                <div key={id} className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/50 flex items-center gap-2">
                  <span>{interest.icon}</span>
                  <span className="font-mono text-cyan-300">{interest.name}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-black/30 rounded-lg border border-cyan-500/30">
            <p className="text-sm font-mono text-cyan-300">
              💡 <strong className="text-cyan-400">[INFO]:</strong> Datos guardados para personalizar experiencia y mostrar científicos relevantes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Página de Chatbot
const ChatbotPage = () => {
  const [messages, setMessages] = useState(() => loadChatHistory());
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

  const quickQuestions = [
    '¿Qué carreras STEM me recomiendas?',
    '¿Cómo saber si la IA es para mí?',
    '¿Qué estudian los científicos latinoamericanos?',
    '¿Cuáles son las áreas STEM más demandadas?',
    '¿Cómo elegir mi carrera ideal?',
    'Cuéntame sobre biotecnología'
  ];

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
      const finalMessages = [...newMessages, botMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, type: 'bot', text: generateFallbackResponse(text) };
      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
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
            {quickQuestions.map((question, index) => (
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
              onClick={() => {
                clearChatHistory();
                setMessages(loadChatHistory());
              }}
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

// Página de Dashboard
const DashboardPage = () => {
  const [selectedArea, setSelectedArea] = useState('all');
  const [viewType, setViewType] = useState('country');
  const [realPapers, setRealPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRealData = async () => {
      setLoading(true);
      try {
        const papers = await fetchPapers();
        setRealPapers(papers);
      } catch (error) {
        console.error('Error loading papers:', error);
      }
      setLoading(false);
    };
    loadRealData();
  }, []);

  const countryData = [
    { country: 'México', count: 145, percentage: 29, flag: '🇲🇽', growth: '+12%' },
    { country: 'Brasil', count: 128, percentage: 26, flag: '🇧🇷', growth: '+8%' },
    { country: 'Argentina', count: 89, percentage: 18, flag: '🇦🇷', growth: '+15%' },
    { country: 'Chile', count: 67, percentage: 13, flag: '🇨🇱', growth: '+22%' },
    { country: 'Colombia', count: 43, percentage: 9, flag: '🇨🇴', growth: '+18%' },
    { country: 'Perú', count: 28, percentage: 6, flag: '🇵🇪', growth: '+25%' },
  ];

  const genderData = [
    { name: 'Mujeres', value: 210, percentage: 42, color: '#ec4899' },
    { name: 'Hombres', value: 290, percentage: 58, color: '#6366f1' },
  ];

  const areaData = [
    { area: 'IA & ML', count: 156, color: '#8b5cf6', trend: 'up' },
    { area: 'Biotecnología', count: 134, color: '#10b981', trend: 'up' },
    { area: 'Física Cuántica', count: 89, color: '#3b82f6', trend: 'stable' },
    { area: 'Neurociencia', count: 67, color: '#f59e0b', trend: 'up' },
    { area: 'Nanotecnología', count: 54, color: '#ef4444', trend: 'down' },
  ];

  const collaborationData = [
    { countries: 'México-Brasil', projects: 45, impact: 'Alto' },
    { countries: 'Argentina-Chile', projects: 32, impact: 'Medio' },
    { countries: 'Colombia-Perú', projects: 28, impact: 'Alto' },
    { countries: 'Brasil-Argentina', projects: 41, impact: 'Alto' },
  ];

  const featuredPapers = [
    {
      id: 1,
      title: "Deep Learning aplicado a la detección de enfermedades tropicales",
      authors: "Dr. Carlos Mendoza, Dra. Ana Silva",
      country: "Perú",
      year: 2024,
      area: "IA & Medicina",
      citations: 87,
      source: "Nature Machine Intelligence",
      link: "https://doi.org/10.1038/example"
    },
    {
      id: 2,
      title: "Conservación de biodiversidad amazónica mediante IA",
      authors: "Dra. María Rodríguez, Dr. Luis Torres",
      country: "Ecuador",
      year: 2024,
      area: "IA & Ambiente",
      citations: 65,
      source: "Science Advances",
      link: "https://doi.org/10.1126/example"
    },
    {
      id: 3,
      title: "Modelos predictivos para agricultura sostenible en Latinoamérica",
      authors: "Dr. Roberto Guzmán",
      country: "México",
      year: 2023,
      area: "IA & Agricultura",
      citations: 123,
      source: "PNAS",
      link: "https://doi.org/10.1073/example"
    },
    {
      id: 4,
      title: "NLP para lenguas indígenas: Quechua y Aymara",
      authors: "Dra. Patricia Quispe, Dr. Juan Mamani",
      country: "Perú",
      year: 2024,
      area: "NLP",
      citations: 52,
      source: "ACL Anthology",
      link: "https://aclanthology.org/example"
    },
  ];

  const areas = ['all', 'IA & Medicina', 'IA & Ambiente', 'IA & Agricultura', 'NLP'];

  const allPapers = realPapers.length > 0 ? realPapers : featuredPapers;
  const filteredPapers = selectedArea === 'all' 
    ? allPapers 
    : allPapers.filter(p => p.area.toLowerCase().includes(selectedArea.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">Visualización de Datos</h2>
            <p className="text-cyan-300 font-mono">>>> Explora estadísticas sobre científicos e investigación en América Latina</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors text-sm font-mono"
          >
            [REFRESH]
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex justify-between items-start mb-2">
            <div className="text-4xl font-bold">500+</div>
            <div className="text-green-300 text-sm font-bold">↗ +15%</div>
          </div>
          <div className="text-sm opacity-90">Científicos registrados</div>
          <div className="text-xs opacity-75 mt-1">vs. año anterior</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex justify-between items-start mb-2">
            <div className="text-4xl font-bold">1,200+</div>
            <div className="text-green-300 text-sm font-bold">↗ +23%</div>
          </div>
          <div className="text-sm opacity-90">Papers publicados</div>
          <div className="text-xs opacity-75 mt-1">últimos 12 meses</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex justify-between items-start mb-2">
            <div className="text-4xl font-bold">8</div>
            <div className="text-yellow-300 text-sm font-bold">→ 0%</div>
          </div>
          <div className="text-sm opacity-90">Países representados</div>
          <div className="text-xs opacity-75 mt-1">cobertura completa</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105">
          <div className="flex justify-between items-start mb-2">
            <div className="text-4xl font-bold">42%</div>
            <div className="text-green-300 text-sm font-bold">↗ +8%</div>
          </div>
          <div className="text-sm opacity-90">Mujeres en STEM</div>
          <div className="text-xs opacity-75 mt-1">crecimiento sostenido</div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-cyan-500/30">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setViewType('country')}
            className={`px-6 py-3 rounded-lg font-medium transition-all font-mono ${
              viewType === 'country'
                ? 'bg-cyan-600 text-black shadow-lg'
                : 'bg-black/40 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900/50'
            }`}
          >
            🌎 Por País
          </button>
          <button
            onClick={() => setViewType('gender')}
            className={`px-6 py-3 rounded-lg font-medium transition-all font-mono ${
              viewType === 'gender'
                ? 'bg-cyan-600 text-black shadow-lg'
                : 'bg-black/40 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900/50'
            }`}
          >
            👥 Por Género
          </button>
          <button
            onClick={() => setViewType('areas')}
            className={`px-6 py-3 rounded-lg font-medium transition-all font-mono ${
              viewType === 'areas'
                ? 'bg-cyan-600 text-black shadow-lg'
                : 'bg-black/40 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900/50'
            }`}
          >
            🔬 Por Área
          </button>
          <button
            onClick={() => setViewType('collaboration')}
            className={`px-6 py-3 rounded-lg font-medium transition-all font-mono ${
              viewType === 'collaboration'
                ? 'bg-cyan-600 text-black shadow-lg'
                : 'bg-black/40 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900/50'
            }`}
          >
            🤝 Colaboraciones
          </button>
        </div>

        {viewType === 'country' && (
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">Científicos por País</h3>
            <div className="space-y-4">
              {countryData.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 w-40">
                    <span className="text-2xl">{item.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{item.country}</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-10 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000 shadow-inner"
                      style={{ width: `${Math.max(item.percentage * 2.5, 15)}%` }}
                    >
                      <span className="text-white font-bold text-sm">{item.count}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-bold text-gray-800">{item.percentage}%</div>
                    <div className="text-xs text-green-600 font-medium">{item.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewType === 'gender' && (
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6 font-mono">Distribución por Género</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#ec4899" 
                    strokeWidth="20"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 0.42)}
                    className="transition-all duration-1000"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="20"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * 0.42}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">500</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {genderData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.value} ({item.percentage}%)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700">
                📊 <strong>Dato importante:</strong> América Latina ha aumentado la participación femenina en investigación STEM en un 15% en los últimos 5 años.
              </p>
            </div>
          </div>
        )}

        {viewType === 'areas' && (
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6 font-mono">Investigación por Área STEM</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {areaData.map((area, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-2xl font-bold" style={{ color: area.color }}>{area.count}</div>
                    <div className={`text-sm font-bold ${
                      area.trend === 'up' ? 'text-green-600' : 
                      area.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {area.trend === 'up' ? '↗' : area.trend === 'down' ? '↘' : '→'}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{area.area}</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: area.color, 
                        width: `${(area.count / 156) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Investigadores activos</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewType === 'collaboration' && (
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6 font-mono">Colaboraciones Internacionales</h3>
            <div className="space-y-4">
              {collaborationData.map((collab, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{collab.countries}</h4>
                      <p className="text-gray-600">{collab.projects} proyectos colaborativos</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                      collab.impact === 'Alto' ? 'bg-green-100 text-green-700' :
                      collab.impact === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      Impacto {collab.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                🤝 <strong>Red LATAM-STEM:</strong> Las colaboraciones entre países han aumentado un 40% desde 2020, fortaleciendo la investigación regional.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-cyan-400 font-mono">Papers Destacados</h3>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-2 bg-black/50 border border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-cyan-100 font-mono"
          >
            {areas.map(area => (
              <option key={area} value={area} className="bg-gray-800">
                {area === 'all' ? 'Todas las áreas' : area}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando papers reales...</p>
          </div>
        )}
        
        <div className="space-y-4">
          {filteredPapers.map(paper => (
            <div key={paper.id} className="bg-black/40 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold text-cyan-100 flex-1 font-mono">{paper.title}</h4>
                <span className="ml-4 px-3 py-1 bg-purple-900/50 text-purple-300 rounded-lg text-sm font-medium border border-purple-500/50">
                  {paper.area}
                </span>
              </div>
              
              <p className="text-cyan-300 mb-3 font-mono">
                <strong className="text-cyan-400">Autores:</strong> {paper.authors}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-cyan-300 mb-3">
                <div className="flex items-center gap-1">
                  <span>🌎</span>
                  <span>{paper.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>{paper.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📖</span>
                  <span>{paper.citations} citas</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-cyan-500/30">
                <p className="text-sm text-cyan-300 font-mono">
                  <strong className="text-cyan-400">Fuente:</strong> {paper.source}
                </p>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors text-sm font-mono font-bold"
                >
                  [VER_PAPER]
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12 text-cyan-400 font-mono">
            [NO_DATA] - No hay papers en esta categoría
          </div>
        )}
      </div>

      <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
        <p className="text-sm font-mono text-cyan-300">
          📚 <strong className="text-cyan-400">[DATA_SOURCE]:</strong> Datos de Google Scholar, OpenAlex, Scopus y repositorios institucionales latinoamericanos.
        </p>
      </div>
    </div>
  );
};

// Página de Recursos
const RecursosPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [contentType, setContentType] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [comicPanels, setComicPanels] = useState([]);
  const [selectedInterests] = useState(() => {
    const saved = localStorage.getItem('stemInterests');
    return saved ? JSON.parse(saved) : [];
  });

  const generateContent = async (type) => {
    if (!userPrompt.trim()) {
      alert('Por favor, describe qué tipo de contenido quieres generar');
      return;
    }

    setIsGenerating(true);
    setContentType(type);
    
    try {
      const interestsText = selectedInterests.length > 0 
        ? `Mis intereses STEM: ${selectedInterests.join(', ')}. ` 
        : '';
      
      if (type === 'historia') {
        const prompt = `${interestsText}Crea una historia corta inspiradora sobre STEM: ${userPrompt}. Incluye personajes latinoamericanos y situaciones reales de ciencia.`;
        const response = 'Historia generada: Una joven científica latinoamericana descubre su pasión por la biotecnología...';
        setGeneratedContent(response);
      } else {
        // Generar cómic gráfico
        const storyPanels = await generateComicStory(userPrompt, selectedInterests);
        const panelsWithImages = [];
        
        for (const panel of storyPanels) {
          const imageUrl = await generateComicPanel(panel.description, panel.id);
          panelsWithImages.push({
            ...panel,
            imageUrl: imageUrl || '/api/placeholder/300/300'
          });
        }
        
        setComicPanels(panelsWithImages);
        setGeneratedContent('comic_generated');
      }
    } catch (error) {
      console.error('Error generando contenido:', error);
      setGeneratedContent('Error al generar contenido. Por favor, intenta de nuevo.');
    }
    
    setIsGenerating(false);
  };

  const getRecommendedContent = (interests) => {
    const contentMap = {
      'ai': {
        title: 'IA y Machine Learning',
        items: [
          { type: 'video', title: 'Redes Neuronales Explicadas', description: 'Introducción visual a deep learning', thumbnail: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=IA+Video' },
          { type: 'comic', title: 'Las Aventuras de Data', description: 'Cómic sobre algoritmos de ML', thumbnail: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=IA+Comic' }
        ]
      },
      'bio': {
        title: 'Biología y Biotecnología', 
        items: [
          { type: 'video', title: 'CRISPR en Acción', description: 'Edición genética explicada', thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Bio+Video' },
          { type: 'comic', title: 'Micro Adventures', description: 'Viaje al mundo celular', thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Bio+Comic' }
        ]
      },
      'physics': {
        title: 'Física Cuántica',
        items: [
          { type: 'video', title: 'Mecánica Cuántica Visual', description: 'Conceptos cuánticos simplificados', thumbnail: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Fisica+Video' },
          { type: 'comic', title: 'Quantum Quest', description: 'Aventuras en el mundo cuántico', thumbnail: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Fisica+Comic' }
        ]
      }
    };

    const userContent = [];
    interests.forEach(interest => {
      if (contentMap[interest]) {
        userContent.push(contentMap[interest]);
      }
    });

    if (userContent.length === 0) {
      userContent.push({
        title: 'Contenido General STEM',
        items: [
          { type: 'video', title: 'Introducción a STEM', description: 'Panorama general de ciencias', thumbnail: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=STEM+Video' },
          { type: 'comic', title: 'Científicos Latinos', description: 'Historias inspiradoras', thumbnail: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=STEM+Comic' }
        ]
      });
    }

    return userContent;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">Recursos STEM</h2>
        <p className="text-cyan-300 font-mono">>>> Contenido educativo y entretenido para tu vocación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 rounded-lg p-6 border border-purple-500/50 hover:border-purple-400 transition-all">
          <div className="text-4xl mb-4">📚</div>
          <h4 className="text-lg font-bold text-cyan-100 mb-2 font-mono">Libros & Novelas</h4>
          <p className="text-cyan-300 text-sm mb-4">Historias inspiradoras sobre carreras STEM</p>
          <div className="space-y-3">
            <div className="bg-purple-900/30 p-3 rounded border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer">
              <p className="text-sm text-purple-300 font-mono font-bold">"El Viaje de Ana"</p>
              <p className="text-xs text-cyan-400">De estudiante a científica en biotecnología</p>
              <p className="text-xs text-gray-400 mt-1">🤖 Generado con IA</p>
            </div>
            <div className="bg-purple-900/30 p-3 rounded border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer">
              <p className="text-sm text-purple-300 font-mono font-bold">"Código del Futuro"</p>
              <p className="text-xs text-cyan-400">Guía sobre programación y robótica</p>
              <p className="text-xs text-gray-400 mt-1">🤖 Generado con IA</p>
            </div>
            <div className="bg-purple-900/30 p-3 rounded border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer">
              <p className="text-sm text-purple-300 font-mono font-bold">"Mujeres en la Ciencia"</p>
              <p className="text-xs text-cyan-400">Biografías de científicas latinoamericanas</p>
              <p className="text-xs text-green-400 mt-1">✓ Disponible</p>
            </div>
          </div>
        </div>

        <div className="bg-black/40 rounded-lg p-6 border border-blue-500/50 hover:border-blue-400 transition-all">
          <div className="text-4xl mb-4">🎥</div>
          <h4 className="text-lg font-bold text-cyan-100 mb-2 font-mono">Videos & Series</h4>
          <p className="text-cyan-300 text-sm mb-4">Contenido visual educativo y entretenido</p>
          <div className="space-y-3">
            <div className="bg-blue-900/30 p-3 rounded border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer">
              <p className="text-sm text-blue-300 font-mono font-bold">"Un Día en el Lab"</p>
              <p className="text-xs text-cyan-400">Serie animada sobre química cuántica</p>
              <p className="text-xs text-gray-400 mt-1">🤖 Generado con IA</p>
            </div>
            <div className="bg-blue-900/30 p-3 rounded border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer">
              <p className="text-sm text-blue-300 font-mono font-bold">"Cosmos Latino"</p>
              <p className="text-xs text-cyan-400">Documental sobre astrofísica</p>
              <p className="text-xs text-gray-400 mt-1">🤖 Generado con IA</p>
            </div>
            <div className="bg-blue-900/30 p-3 rounded border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer">
              <p className="text-sm text-blue-300 font-mono font-bold">"TED Talks STEM"</p>
              <p className="text-xs text-cyan-400">Charlas de científicos latinoamericanos</p>
              <p className="text-xs text-green-400 mt-1">✓ Disponible</p>
            </div>
          </div>
        </div>

        <div className="bg-black/40 rounded-lg p-6 border border-green-500/50 hover:border-green-400 transition-all">
          <div className="text-4xl mb-4">📜</div>
          <h4 className="text-lg font-bold text-cyan-100 mb-2 font-mono">Comics & Manga</h4>
          <p className="text-cyan-300 text-sm mb-4">Historias visuales estilo "Nano Banana"</p>
          <div className="space-y-3">
            <div className="bg-green-900/30 p-3 rounded border border-green-500/30 hover:border-green-400 transition-all cursor-pointer">
              <p className="text-sm text-green-300 font-mono font-bold">"Micro Max Adventures"</p>
              <p className="text-xs text-cyan-400">Cómic sobre nanotecnología</p>
              <p className="text-xs text-gray-400 mt-1">🤖 Estilo Nano Banana</p>
            </div>
            <div className="bg-green-900/30 p-3 rounded border border-green-500/30 hover:border-green-400 transition-all cursor-pointer">
              <p className="text-sm text-green-300 font-mono font-bold">"Data & Algoritmos"</p>
              <p className="text-xs text-cyan-400">Aventuras en ciencia de datos</p>
              <p className="text-xs text-gray-400 mt-1">🤖 Generado con IA</p>
            </div>
            <div className="bg-green-900/30 p-3 rounded border border-green-500/30 hover:border-green-400 transition-all cursor-pointer">
              <p className="text-sm text-green-300 font-mono font-bold">"Nano Banana"</p>
              <p className="text-xs text-cyan-400">El cómic original de ciencia</p>
              <p className="text-xs text-green-400 mt-1">✓ Disponible</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">Crear Contenido con IA</h3>
        <div className="mb-6">
          <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/30 mb-4">
            <label className="block text-sm font-medium text-cyan-300 mb-2 font-mono">Describe tu idea:</label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Ej: Una historia sobre una joven que descubre la biotecnología marina..."
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-cyan-100 font-mono placeholder-cyan-500/70 resize-none"
              rows={3}
            />
            {selectedInterests.length > 0 && (
              <p className="text-xs text-cyan-400 mt-2 font-mono">
                💡 Se usarán tus intereses: {selectedInterests.join(', ')}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-lg border border-purple-500/30">
              <h4 className="text-lg font-bold text-purple-400 mb-2 font-mono">Generador de Historias</h4>
              <p className="text-cyan-300 text-sm mb-3">Crea tu propia novela STEM personalizada</p>
              <button 
                onClick={() => generateContent('historia')}
                disabled={isGenerating || !userPrompt.trim()}
                className="px-4 py-2 bg-purple-600 text-black rounded-lg hover:bg-purple-500 transition-colors font-mono font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating && contentType === 'historia' ? '[GENERANDO...]' : '[CREAR_HISTORIA]'}
              </button>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-blue-500/30">
              <h4 className="text-lg font-bold text-blue-400 mb-2 font-mono">Contenido Recomendado</h4>
              <p className="text-cyan-300 text-sm mb-3">Videos y cómics basados en tus intereses</p>
              <button 
                onClick={() => generateContent('recomendado')}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-500 transition-colors font-mono font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating && contentType === 'recomendado' ? '[CARGANDO...]' : '[VER_CONTENIDO]'}
              </button>
            </div>
          </div>
        </div>

        {generatedContent && generatedContent !== 'comic_generated' && (
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-cyan-500/30">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-cyan-400 font-mono">📚 Tu Historia Generada</h4>
              <button
                onClick={() => setGeneratedContent(null)}
                className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg border border-red-500/50 hover:bg-red-800/50 transition-colors text-sm font-mono"
              >
                [CERRAR]
              </button>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-cyan-500/30 max-h-96 overflow-y-auto">
              <pre className="text-cyan-100 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {generatedContent}
              </pre>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(generatedContent)}
                className="px-4 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors font-mono font-bold text-sm"
              >
                [COPIAR]
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([generatedContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `historia_stem_${Date.now()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-green-600 text-black rounded-lg hover:bg-green-500 transition-colors font-mono font-bold text-sm"
              >
                [DESCARGAR]
              </button>
            </div>
          </div>
        )}

        {comicPanels.length > 0 && (
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-cyan-500/30">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-cyan-400 font-mono">🎯 Contenido Recomendado</h4>
              <button
                onClick={() => {
                  setComicPanels([]);
                  setGeneratedContent(null);
                }}
                className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg border border-red-500/50 hover:bg-red-800/50 transition-colors text-sm font-mono"
              >
                [CERRAR]
              </button>
            </div>
            
            <div className="space-y-6">
              {comicPanels.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-black/40 rounded-lg border border-cyan-500/30 p-6">
                  <h5 className="text-lg font-bold text-cyan-400 mb-4 font-mono">{category.title}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-gray-800 rounded-lg overflow-hidden border border-cyan-500/30 hover:border-cyan-400 transition-all">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-cyan-600 text-black rounded font-mono font-bold">
                              {item.type.toUpperCase()}
                            </span>
                            <h6 className="font-bold text-cyan-100 font-mono text-sm">{item.title}</h6>
                          </div>
                          <p className="text-cyan-300 text-xs font-mono mb-3">{item.description}</p>
                          <button className="px-3 py-1 bg-purple-600 text-black rounded text-xs font-mono font-bold hover:bg-purple-500 transition-colors">
                            [VER_{item.type.toUpperCase()}]
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
        <p className="text-sm font-mono text-cyan-300">
          🤖 <strong className="text-cyan-400">[INFO]:</strong> Historias generadas con AWS Bedrock, cómics gráficos con Stable Diffusion.
        </p>
      </div>
    </div>
  );
};

// Página de Inspiración
const StoriesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [realScientistsData, setRealScientistsData] = useState([]);
  const [loadingScientists, setLoadingScientists] = useState(false);

  useEffect(() => {
    const loadRealScientists = async () => {
      setLoadingScientists(true);
      try {
        const scientists = await fetchLatinScientists();
        setRealScientistsData(scientists);
      } catch (error) {
        console.error('Error loading scientists:', error);
      }
      setLoadingScientists(false);
    };
    loadRealScientists();
  }, []);

  const allScientists = realScientistsData.length > 0 ? realScientistsData : realScientists;
  const countries = ['all', ...new Set(allScientists.map(s => s.country))];
  const areas = ['all', ...new Set(allScientists.map(s => s.area))];
  const filteredScientists = allScientists.filter(scientist => {
    const matchesCountry = selectedCountry === 'all' || scientist.country === selectedCountry;
    const matchesArea = selectedArea === 'all' || scientist.area.toLowerCase().includes(selectedArea.toLowerCase());
    return matchesCountry && matchesArea;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-2 font-mono">Inspiración STEM</h2>
            <p className="text-cyan-300 font-mono">>>> Científicos y recursos creados con IA para tu vocación</p>
          </div>
          <div className="flex gap-2">
            <div className={`px-3 py-1 rounded-lg text-xs font-medium border font-mono ${
              realScientistsData.length > 0 
                ? 'bg-green-900/50 text-green-400 border-green-500/50' 
                : 'bg-yellow-900/50 text-yellow-400 border-yellow-500/50'
            }`}>
              {realScientistsData.length > 0 ? '✓ Datos reales' : 'Datos demo'}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors text-sm font-mono"
            >
              [REFRESH]
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-cyan-500/30">
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2 font-mono">Filtrar por país:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 bg-black/50 border border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-cyan-100 font-mono"
            >
              {countries.map(country => (
                <option key={country} value={country} className="bg-gray-800">
                  {country === 'all' ? 'Todos los países' : country}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2 font-mono">Filtrar por área:</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="px-4 py-2 bg-black/50 border border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-400 text-cyan-100 font-mono"
            >
              {areas.map(area => (
                <option key={area} value={area} className="bg-gray-800">
                  {area === 'all' ? 'Todas las áreas' : area}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>



      {loadingScientists && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-cyan-300">Cargando científicos reales...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScientists.map(scientist => (
          <div key={scientist.id} className="bg-black/40 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border border-cyan-500/30 hover:border-cyan-400">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={scientist.avatar} 
                  alt={scientist.name}
                  className="w-20 h-20 rounded-full border-4 border-purple-200"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-cyan-100 font-mono">{scientist.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-purple-400 font-medium font-mono">{scientist.area}</span>
                    <span className="text-cyan-400">•</span>
                    <span className="text-sm text-cyan-300 font-mono">{scientist.country}</span>
                  </div>
                </div>
              </div>

              <p className="text-cyan-300 mb-4 leading-relaxed font-mono text-sm">{scientist.bio}</p>

              <div className="mb-4">
                <h4 className="font-bold text-cyan-400 mb-2 font-mono">🏆 Logros destacados:</h4>
                <ul className="space-y-1">
                  {scientist.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-cyan-300 flex items-start gap-2 font-mono">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-lg mb-4 border border-cyan-500/30">
                <p className="text-sm italic text-cyan-300 font-mono">{scientist.quote}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-cyan-400 font-mono">
                  📚 H-index: {scientist.hIndex || 'N/A'}
                </div>
                <a
                  href={scientist.realLink || scientist.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-600 text-black rounded-lg hover:bg-cyan-500 transition-colors text-sm font-mono font-bold"
                >
                  [VER_PERFIL]
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredScientists.length === 0 && (
        <div className="bg-black/40 rounded-xl p-12 shadow-lg text-center border border-cyan-500/30">
          <BookOpen className="mx-auto mb-4 text-cyan-400" size={48} />
          <p className="text-cyan-400 text-lg font-mono">[NO_DATA] - No se encontraron científicos</p>
        </div>
      )}

      <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-cyan-500/30">
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 font-mono">🌟 ¿Te inspiran estas historias?</h3>
        <p className="mb-6 text-cyan-300 font-mono">
          Estos científicos latinoamericanos demuestran que desde nuestra región podemos contribuir 
          significativamente al conocimiento mundial. ¡Tú también puedes ser parte de esta historia!
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/50">
            <div className="text-2xl font-bold text-cyan-400 font-mono">[{allScientists.length}]</div>
            <div className="text-sm text-cyan-300 font-mono">Científicos destacados</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/50">
            <div className="text-2xl font-bold text-cyan-400 font-mono">[{areas.length - 1}]</div>
            <div className="text-sm text-cyan-300 font-mono">Áreas de investigación</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/50">
            <div className="text-2xl font-bold text-cyan-400 font-mono">[{countries.length - 1}]</div>
            <div className="text-sm text-cyan-300 font-mono">Países representados</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// App Principal
function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname;
    return path === '/' ? 'inicio' : path.substring(1);
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch(currentPage) {
      case 'inicio': return <HomePage />;
      case 'intereses': return <InterestsPage />;
      case 'orientacion': return <ChatbotPage />;
      case 'visualizacion': return <DashboardPage />;
      case 'inspiracion': return <StoriesPage />;
      case 'recursos': return <RecursosPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 relative">
      <StarField />
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
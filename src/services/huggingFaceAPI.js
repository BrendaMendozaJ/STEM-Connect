// Hugging Face API - Chatbot inteligente
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

export const generateChatResponse = async (userMessage, conversationHistory = []) => {
  // Usar directamente el sistema de respuestas mejorado
  return generateFallbackResponse(userMessage);
};

const generateFallbackResponse = (userMessage) => {
  const msg = userMessage.toLowerCase().trim();
  
  // Respuestas exactas por pregunta
  const responses = {
    // Preguntas sobre carreras
    'qué carreras stem me recomiendas': '🎯 Te recomiendo estas carreras con alta demanda: Inteligencia Artificial, Biotecnología, Ciencia de Datos, Ingeniería Ambiental y Ciberseguridad.',
    'qué carrera me recomiendas': '🎯 Te recomiendo estas carreras con alta demanda: Inteligencia Artificial, Biotecnología, Ciencia de Datos, Ingeniería Ambiental y Ciberseguridad.',
    
    // Preguntas sobre IA
    'cómo saber si la ia es para mí': '🤖 La IA es para ti si te gusta: programar, resolver problemas complejos, trabajar con datos y crear soluciones tecnológicas. ¿Te interesa alguna de estas actividades?',
    'qué es la inteligencia artificial': '🤖 La IA es una rama de la informática que crea sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como reconocer imágenes o entender lenguaje.',
    
    // Preguntas sobre científicos
    'qué estudian los científicos latinoamericanos': '🌟 Los científicos latinoamericanos investigan: conservación amazónica, medicina tropical, astronomía, neurociencia y biotecnología.',
    
    // Preguntas sobre demanda
    'cuáles son las áreas stem más demandadas': '📈 Las áreas más demandadas son: Data Science, Ciberseguridad, Inteligencia Artificial, Biotecnología y Energías Renovables.',
    
    // Preguntas sobre elección
    'cómo elegir mi carrera ideal': '🤔 Para elegir: 1) Identifica qué te gusta hacer, 2) Explora las áreas STEM, 3) Conoce a científicos inspiradores, 4) Considera el impacto que quieres generar.',
    
    // Preguntas sobre biotecnología
    'cuéntame sobre biotecnología': '🧬 La biotecnología combina biología y tecnología para crear vacunas, terapias génicas, alimentos mejorados y soluciones ambientales.'
  };
  
  // Buscar respuesta exacta
  if (responses[msg]) {
    return responses[msg];
  }
  
  // Respuestas por palabras clave simples
  if (msg.includes('carrera')) return '🎯 Te recomiendo: Inteligencia Artificial, Biotecnología, Ciencia de Datos e Ingeniería Ambiental.';
  if (msg.includes('ia') || msg.includes('inteligencia')) return '🤖 La IA es perfecta si te gusta programar y resolver problemas con tecnología.';
  if (msg.includes('matemática')) return '📐 Las matemáticas son la base de la IA, criptografía y finanzas. ¿Qué aplicación te interesa?';
  if (msg.includes('biología')) return '🧬 La biología moderna incluye biotecnología, genética y medicina personalizada.';
  if (msg.includes('física')) return '⚛️ La física abarca desde partículas hasta cosmología. ¿Te interesan experimentos o teoría?';
  if (msg.includes('química')) return '🧪 La química moderna incluye nanotecnología y materiales avanzados.';
  if (msg.includes('ingeniería')) return '⚙️ La ingeniería combina ciencia y creatividad: software, ambiental, biomédica.';
  if (msg.includes('trabajo') || msg.includes('empleo')) return '📈 Las áreas con más trabajo son: Data Science, IA, Ciberseguridad y Biotecnología.';
  
  return '🤔 Puedes preguntarme sobre carreras STEM, áreas de estudio, o qué te recomienda según tus intereses. ¿Qué te gustaría saber?';
};
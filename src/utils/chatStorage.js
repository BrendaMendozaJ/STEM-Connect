// Utilidades para persistencia del chat
export const saveChatHistory = (messages) => {
  try {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const loadChatHistory = () => {
  try {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'bot', text: '¡Hola! 👋 Soy tu asistente vocacional de AI-PathFinder. Estoy aquí para ayudarte a descubrir tu camino en STEM. ¿Qué te gustaría saber sobre carreras científicas?' }
    ];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [
      { id: 1, type: 'bot', text: '¡Hola! 👋 Soy tu asistente vocacional de AI-PathFinder. Estoy aquí para ayudarte a descubrir tu camino en STEM. ¿Qué te gustaría saber sobre carreras científicas?' }
    ];
  }
};

export const clearChatHistory = () => {
  try {
    localStorage.removeItem('chatHistory');
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};
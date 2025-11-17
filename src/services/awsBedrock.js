// AWS Bedrock Service para AI-PathFinder
// Integración con Claude para orientación vocacional STEM

const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL || 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod';

class BedrockService {
  constructor() {
    this.modelId = 'amazon.titan-text-express-v1';
    this.fallbackResponses = [
      "Como orientador vocacional STEM, te recomiendo explorar áreas como biotecnología o ingeniería de datos, que tienen gran demanda en Latinoamérica.",
      "Las carreras STEM más prometedoras incluyen ciencias de la computación, bioingeniería y ciencias ambientales. ¿Cuál te interesa más?",
      "Basándome en científicos latinoamericanos exitosos, te sugiero considerar física aplicada o química farmacéutica.",
      "Para estudiantes latinoamericanos, recomiendo matemáticas aplicadas o ingeniería biomédica por su impacto social."
    ];
  }

  async generateResponse(userMessage, conversationHistory = []) {
    try {
      // Intentar AWS Bedrock primero
      const response = await this.callBedrock(userMessage, conversationHistory);
      return response;
    } catch (error) {
      console.warn('AWS Bedrock no disponible, usando respuesta inteligente:', error);
      return this.generateIntelligentFallback(userMessage);
    }
  }

  async callBedrock(userMessage, conversationHistory) {
    // Llamada segura via API Gateway + Lambda
    const response = await fetch(`${API_GATEWAY_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory
      })
    });

    if (!response.ok) {
      throw new Error('API Gateway error');
    }

    const data = await response.json();
    return data.response;
  }

  buildSTEMPrompt(userMessage, conversationHistory) {
    const context = `Eres un orientador vocacional especializado en carreras STEM para estudiantes latinoamericanos. 
Tu objetivo es conectar estudiantes con científicos y carreras STEM inspiradoras.

Contexto del proyecto AI-PathFinder:
- Conectar estudiantes latinoamericanos con científicos STEM
- Promover diversidad en ciencia y tecnología
- Ofrecer orientación vocacional personalizada
- Inspirar con ejemplos de científicos latinoamericanos exitosos

Historial de conversación:
${conversationHistory.map(msg => `${msg.sender}: ${msg.text}`).join('\n')}

Pregunta del estudiante: ${userMessage}

Responde de manera inspiradora, práctica y enfocada en oportunidades STEM en Latinoamérica:`;

    return context;
  }

  generateIntelligentFallback(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Respuestas específicas por área STEM
    if (message.includes('biolog') || message.includes('bio')) {
      return "La biotecnología es fascinante! Científicos como la mexicana Eva Ramón Gallegos han revolucionado el tratamiento del cáncer. Te recomiendo explorar bioingeniería o bioinformática.";
    }
    
    if (message.includes('matemática') || message.includes('mat')) {
      return "Las matemáticas son el lenguaje universal de la ciencia. Como la argentina Alicia Dickenstein, puedes aplicarlas en biología computacional o criptografía.";
    }
    
    if (message.includes('física') || message.includes('fis')) {
      return "La física abre infinitas posibilidades! Desde astrofísica como el chileno José Maza hasta física cuántica. ¿Te interesa más la investigación teórica o aplicada?";
    }
    
    if (message.includes('química') || message.includes('quim')) {
      return "La química transforma el mundo! Como la colombiana Ángela Restrepo en micología médica. Considera química farmacéutica o nanotecnología.";
    }
    
    if (message.includes('computación') || message.includes('programación') || message.includes('software')) {
      return "La computación es el futuro! Desde IA hasta ciberseguridad. Científicos como el peruano Ernesto Cuadros han destacado en tecnología educativa.";
    }
    
    if (message.includes('ingeniería') || message.includes('ing')) {
      return "La ingeniería resuelve problemas reales! Desde ingeniería biomédica hasta ambiental. ¿Qué tipo de problemas te gustaría resolver?";
    }
    
    // Respuesta general aleatoria
    return this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
  }

  async generateSTEMStory(topic, targetAudience = 'estudiantes') {
    try {
      const prompt = `Genera una historia inspiradora sobre ${topic} dirigida a ${targetAudience} latinoamericanos. 
      Incluye un científico latinoamericano real como protagonista y hazla educativa pero entretenida.
      Máximo 200 palabras.`;
      
      return await this.generateResponse(prompt);
    } catch (error) {
      return `Historia sobre ${topic}: Un joven estudiante descubre su pasión por la ciencia cuando conoce el trabajo de científicos latinoamericanos que han cambiado el mundo...`;
    }
  }

  async generateCareerRecommendation(interests, skills) {
    const prompt = `Basándote en estos intereses: ${interests.join(', ')} y habilidades: ${skills.join(', ')}, 
    recomienda 3 carreras STEM específicas con oportunidades en Latinoamérica. 
    Incluye ejemplos de científicos latinoamericanos en cada área.`;
    
    return await this.generateResponse(prompt);
  }
}

export default new BedrockService();
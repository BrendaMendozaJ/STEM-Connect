// Servicio de IA híbrido para AI-PathFinder
// Integra AWS Bedrock con fallbacks inteligentes

const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL;
const HUGGINGFACE_API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;

class AIService {
  constructor() {
    this.bedrockAvailable = false;
    this.modelId = 'anthropic.claude-3-sonnet-20240229-v1:0';
    this.checkBedrockStatus();
  }

  async checkBedrockStatus() {
    try {
      if (!API_GATEWAY_URL) {
        console.warn('API Gateway URL no configurada');
        return;
      }

      // Probar con una petición simple
      const response = await fetch(`${API_GATEWAY_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'test',
          conversationHistory: []
        })
      });

      const data = await response.json();
      this.bedrockAvailable = response.ok && data.status === 'success';
      console.log(`AWS Bedrock status: ${this.bedrockAvailable ? 'Disponible' : 'No disponible'}`);
    } catch (error) {
      console.warn('Bedrock no disponible:', error.message);
      this.bedrockAvailable = false;
    }
  }

  async generateResponse(userMessage, conversationHistory = []) {
    // 1. Intentar AWS Bedrock primero
    if (this.bedrockAvailable && API_GATEWAY_URL) {
      try {
        const response = await this.callBedrock(userMessage, conversationHistory);
        if (response) return response;
      } catch (error) {
        console.warn('Bedrock falló, usando fallback:', error);
      }
    }

    // 2. Fallback a Hugging Face
    if (HUGGINGFACE_API_KEY) {
      try {
        const response = await this.callHuggingFace(userMessage, conversationHistory);
        if (response) return response;
      } catch (error) {
        console.warn('Hugging Face falló:', error);
      }
    }

    // 3. Fallback inteligente local
    return this.generateIntelligentFallback(userMessage);
  }

  async callBedrock(userMessage, conversationHistory) {
    const response = await fetch(`${API_GATEWAY_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.buildSTEMPrompt(userMessage, conversationHistory),
        conversationHistory: conversationHistory
      })
    });

    if (!response.ok) throw new Error('Bedrock API error');
    
    const data = await response.json();
    return data.response;
  }

  async callHuggingFace(userMessage, conversationHistory) {
    const prompt = this.buildSTEMPrompt(userMessage, conversationHistory);
    
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 200,
          temperature: 0.7,
          do_sample: true
        }
      })
    });

    if (!response.ok) throw new Error('Hugging Face API error');
    
    const data = await response.json();
    return data[0]?.generated_text || null;
  }

  buildSTEMPrompt(userMessage, conversationHistory) {
    const context = `Eres un orientador vocacional especializado en carreras STEM para estudiantes latinoamericanos.

Tu misión:
- Conectar estudiantes con científicos y carreras STEM inspiradoras
- Promover diversidad en ciencia y tecnología
- Ofrecer orientación vocacional personalizada
- Inspirar con ejemplos de científicos latinoamericanos exitosos

Contexto del proyecto AI-PathFinder:
- Sistema de orientación vocacional STEM
- Enfoque en estudiantes latinoamericanos
- Conexión con científicos reales de la región
- Uso de IA para personalización

Historial reciente:
${conversationHistory.slice(-3).map(msg => `${msg.type}: ${msg.text}`).join('\n')}

Pregunta del estudiante: ${userMessage}

Responde de manera inspiradora, práctica y enfocada en oportunidades STEM en Latinoamérica:`;

    return context;
  }

  generateIntelligentFallback(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Respuestas específicas por área STEM
    const responses = {
      biologia: "¡La biotecnología es fascinante! Científicos como la mexicana Eva Ramón Gallegos han revolucionado el tratamiento del cáncer con terapia fotodinámica. Te recomiendo explorar bioingeniería, bioinformática o biotecnología marina. ¿Qué aspecto de la biología te interesa más?",
      
      matematicas: "Las matemáticas son el lenguaje universal de la ciencia. Como la argentina Alicia Dickenstein en biología algebraica, puedes aplicarlas en criptografía, inteligencia artificial o modelado climático. ¿Te atrae más la matemática pura o aplicada?",
      
      fisica: "¡La física abre infinitas posibilidades! Desde astrofísica como el chileno José Maza hasta física cuántica. El peruano Carlos Kenig es reconocido mundialmente en ecuaciones diferenciales. ¿Te interesa más la investigación teórica o aplicada?",
      
      quimica: "La química transforma el mundo. Como la colombiana Ángela Restrepo en micología médica o el mexicano Mario Molina (Premio Nobel). Considera química farmacéutica, nanotecnología o química verde. ¿Qué aplicaciones te emocionan más?",
      
      computacion: "¡La computación es el futuro! Desde IA hasta ciberseguridad. El peruano Ernesto Cuadros ha destacado en tecnología educativa. Considera ciencias de la computación, ingeniería de software o data science. ¿Qué área tecnológica te apasiona?",
      
      ingenieria: "La ingeniería resuelve problemas reales. Desde ingeniería biomédica hasta ambiental. La mexicana Silvia Torres-Peimbert es pionera en astrofísica. ¿Qué tipo de problemas te gustaría resolver para mejorar el mundo?",
      
      medicina: "La medicina combina ciencia y humanidad. Como el argentino César Milstein (Premio Nobel) en inmunología. Considera medicina, bioingeniería médica o salud pública. ¿Te interesa más la investigación o la práctica clínica?",
      
      inteligencia_artificial: "¡La IA está transformando todo! Desde machine learning hasta robótica. Científicos latinoamericanos lideran investigación en NLP y visión computacional. ¿Te interesa más el desarrollo de algoritmos o sus aplicaciones?",
      
      astronomia: "¡El cosmos nos llama! Como la chilena María Teresa Ruiz, primera mujer en recibir el Premio Nacional de Ciencias Exactas de Chile. La astronomía combina física, matemáticas y tecnología. ¿Te fascina más la observación o la teoría?",
      
      ambiente: "Las ciencias ambientales son cruciales para nuestro futuro. Desde cambio climático hasta conservación. Considera ingeniería ambiental, ecología o sostenibilidad. ¿Qué aspecto ambiental te preocupa más?"
    };

    // Buscar coincidencias en el mensaje
    for (const [key, response] of Object.entries(responses)) {
      if (message.includes(key) || message.includes(key.slice(0, -1))) {
        return response;
      }
    }

    // Respuestas generales por tipo de pregunta
    if (message.includes('carrera') || message.includes('estudiar')) {
      return "Para elegir tu carrera STEM ideal, considera: 1) Tus intereses naturales, 2) Habilidades que ya tienes, 3) Impacto que quieres generar. En Latinoamérica hay grandes oportunidades en biotecnología, IA, ingeniería ambiental y ciencias de datos. ¿Qué área te llama más la atención?";
    }

    if (message.includes('futuro') || message.includes('oportunidad')) {
      return "El futuro STEM en Latinoamérica es prometedor. Áreas con mayor crecimiento: inteligencia artificial, biotecnología, energías renovables, y ciencias de datos. Países como Chile, México y Brasil lideran en investigación. ¿En qué país te gustaría desarrollarte?";
    }

    if (message.includes('mujer') || message.includes('género')) {
      return "¡Las mujeres están transformando STEM en Latinoamérica! Ejemplos inspiradores: Eva Ramón (México, biotecnología), Alicia Dickenstein (Argentina, matemáticas), Silvia Torres-Peimbert (México, astrofísica). La participación femenina crece 15% anualmente. ¿Qué área STEM te inspira más?";
    }

    // Respuesta general inspiradora
    const generalResponses = [
      "Como orientador STEM, te animo a explorar áreas como biotecnología, ciencias de datos o ingeniería ambiental. Estas tienen gran demanda en Latinoamérica y permiten generar impacto social. ¿Qué problemas del mundo te gustaría ayudar a resolver?",
      
      "Las carreras STEM más prometedoras incluyen inteligencia artificial, bioingeniería y ciencias ambientales. Científicos latinoamericanos lideran investigación mundial en estas áreas. ¿Cuál resuena más contigo?",
      
      "Basándome en científicos latinoamericanos exitosos, te sugiero considerar física aplicada, química farmacéutica o ciencias de la computación. Todas tienen excelentes perspectivas. ¿Qué te motiva más: descubrir, crear o resolver?",
      
      "Para estudiantes latinoamericanos, recomiendo matemáticas aplicadas, ingeniería biomédica o ciencias ambientales por su impacto social y oportunidades de investigación. ¿Qué tipo de legado quieres dejar en el mundo?"
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  // Métodos especializados
  async generateCareerRecommendation(interests, skills) {
    const prompt = `Basándote en estos intereses: ${interests.join(', ')} y habilidades: ${skills.join(', ')}, 
    recomienda 3 carreras STEM específicas con oportunidades en Latinoamérica. 
    Incluye ejemplos de científicos latinoamericanos en cada área y perspectivas laborales.`;
    
    return await this.generateResponse(prompt);
  }

  async generateSTEMStory(topic, targetAudience = 'estudiantes') {
    const prompt = `Genera una historia inspiradora sobre ${topic} dirigida a ${targetAudience} latinoamericanos. 
    Incluye un científico latinoamericano real como protagonista y hazla educativa pero entretenida.
    Máximo 200 palabras.`;
    
    return await this.generateResponse(prompt);
  }

  // Status del servicio
  getServiceStatus() {
    return {
      bedrock: this.bedrockAvailable,
      huggingface: !!HUGGINGFACE_API_KEY,
      fallback: true
    };
  }
}

export default new AIService();
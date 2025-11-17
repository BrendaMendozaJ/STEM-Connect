// AWS Bedrock Service simplificado para AI-PathFinder
// Versión que no rompe la aplicación

class BedrockService {
  constructor() {
    this.fallbackResponses = [
      "Como orientador vocacional STEM, te recomiendo explorar áreas como biotecnología o ingeniería de datos, que tienen gran demanda en Latinoamérica.",
      "Las carreras STEM más prometedoras incluyen ciencias de la computación, bioingeniería y ciencias ambientales. ¿Cuál te interesa más?",
      "Basándome en científicos latinoamericanos exitosos, te sugiero considerar física aplicada o química farmacéutica.",
      "Para estudiantes latinoamericanos, recomiendo matemáticas aplicadas o ingeniería biomédica por su impacto social."
    ];
  }

  async generateResponse(userMessage, conversationHistory = []) {
    // Por ahora usar solo fallback hasta que AWS esté configurado
    return this.generateIntelligentFallback(userMessage);
  }

  generateIntelligentFallback(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Respuestas sobre carreras específicas
    if (message.includes('biolog') || message.includes('bio')) {
      return "CARRERAS EN BIOLOGÍA/BIOTECNOLOGÍA:\n\n🧬 BIOTECNOLOGÍA: Crea soluciones innovadoras como la mexicana Eva Ramón Gallegos, quien desarrolló terapia fotodimámica contra el cáncer.\n\n🦠 BIOINFORMÁTICA: Combina biología y computación. Ideal si te gusta programar y entender la vida a nivel molecular.\n\n🌱 BIOLOGÍA MARINA: Estudia ecosistemas acuáticos. Latinoamérica tiene una biodiversidad única por explorar.\n\nOPORTUNIDADES: Industria farmacéutica, investigación médica, conservación ambiental. ¿Qué aspecto te interesa más?";
    }
    
    if (message.includes('matemática') || message.includes('mat')) {
      return "CARRERAS EN MATEMÁTICAS:\n\n📊 MATEMÁTICAS APLICADAS: Como Alicia Dickenstein (Argentina), puedes resolver problemas reales en biología computacional.\n\n🔐 CRIPTOGRAFÍA: Protege información digital. Muy demandado en banca y ciberseguridad.\n\n📈 CIENCIA DE DATOS: Analiza big data para empresas. Combina estadística con programación.\n\nVENTAJAS: Base sólida para IA, física, economía. Las matemáticas abren todas las puertas STEM. ¿Te gusta resolver problemas complejos?";
    }
    
    if (message.includes('física') || message.includes('fis')) {
      return "CARRERAS EN FÍSICA:\n\n🌌 ASTROFÍSICA: Como José Maza (Chile), estudia el universo. Chile tiene los mejores observatorios del mundo.\n\n⚛️ FÍSICA CUÁNTICA: Tecnologías del futuro como computación cuántica y telecomunicaciones.\n\n⚡ FÍSICA MÉDICA: Aplica física en medicina (radioterapia, imágenes médicas).\n\nOPORTUNIDADES: Investigación, industria tecnológica, energías renovables. ¿Te atrae más la investigación teórica o aplicada?";
    }
    
    if (message.includes('computación') || message.includes('programación') || message.includes('software')) {
      return "CARRERAS EN COMPUTACIÓN:\n\n🤖 INTELIGENCIA ARTIFICIAL: Crea sistemas inteligentes. Muy demandado en todos los sectores.\n\n🔒 CIBERSEGURIDAD: Protege sistemas digitales. Crecimiento exponencial en Latinoamérica.\n\n📱 DESARROLLO DE SOFTWARE: Desde apps móviles hasta sistemas empresariales.\n\n🎮 REALIDAD VIRTUAL/AUMENTADA: Tecnologías inmersivas para educación, medicina, entretenimiento.\n\nVENTAJA: Puedes trabajar remotamente para empresas globales. ¿Qué tipo de problemas te gusta resolver?";
    }
    
    if (message.includes('química') || message.includes('quim')) {
      return "**Carreras en Química:**\n\n💊 **Química Farmacéutica**: Desarrolla medicamentos. Industria farmacéutica muy fuerte en México y Brasil.\n\n🔬 **Nanotecnología**: Manipula materia a escala atómica. Aplicaciones en medicina, electrónica, materiales.\n\n🌱 **Química Verde**: Procesos sustentables y amigables con el ambiente.\n\n**Oportunidades**: Industria petroquímica, cosméticos, alimentos, investigación. ¿Te interesa más la síntesis o el análisis?";
    }
    
    if (message.includes('ingeniería') || message.includes('ing')) {
      return "**Carreras en Ingeniería:**\n\n🩺 **Ingeniería Biomédica**: Combina ingeniería y medicina. Desarrolla prótesis, equipos médicos, biosensores.\n\n🌍 **Ingeniería Ambiental**: Soluciona problemas de contaminación y sostenibilidad.\n\n⚙️ **Ingeniería de Sistemas**: Optimiza procesos complejos en empresas y organizaciones.\n\n🚀 **Ingeniería Aeroespacial**: México y Brasil tienen programas espaciales en crecimiento.\n\n**Impacto**: Resuelves problemas reales que afectan a millones de personas. ¿Qué tipo de problemas te motiva resolver?";
    }
    
    if (message.includes('recomend') || message.includes('suger') || message.includes('carrera')) {
      return "**🎯 Recomendaciones personalizadas:**\n\nPara darte la mejor recomendación, cuéntame:\n\n• ¿Qué materias te gustan más en el colegio?\n• ¿Prefieres trabajar con personas, datos, o experimentos?\n• ¿Te gusta más resolver problemas teóricos o prácticos?\n• ¿Qué problemas del mundo te gustaría ayudar a resolver?\n\n**🌟 Carreras más demandadas en LATAM:**\n1. Ciencia de Datos e IA\n2. Ciberseguridad\n3. Biotecnología\n4. Ingeniería Ambiental\n5. Desarrollo de Software";
    }
    
    // Respuesta general mejorada
    const responses = [
      "Como orientador STEM, te sugiero explorar áreas donde Latinoamérica está liderando: BIOTECNOLOGÍA, CIENCIA DE DATOS, ENERGÍAS RENOVABLES e INGENIERÍA AMBIENTAL. ¿Cuál te llama más la atención?",
      "Las carreras STEM más prometedoras combinan TECNOLOGÍA con IMPACTO SOCIAL: bioinformática, IA para salud, ingeniería biomédica. Científicos latinoamericanos están revolucionando estos campos. ¿Qué problemas te gustaría resolver?",
      "Basándome en científicos exitosos como MARIO MOLINA (Nobel Química) y SILVIA TORRES-PEIMBERT (Astrofísica), te recomiendo considerar áreas donde puedas generar IMPACTO GLOBAL desde Latinoamérica. ¿Te interesa más la investigación o la aplicación práctica?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async generateSTEMStory(topic, targetAudience = 'estudiantes') {
    return `Historia sobre ${topic}: Un joven estudiante descubre su pasión por la ciencia cuando conoce el trabajo de científicos latinoamericanos que han cambiado el mundo...`;
  }
}

export default new BedrockService();
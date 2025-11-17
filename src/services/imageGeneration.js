// Servicio para generar imágenes de cómics con placeholders
export const generateComicPanel = async (prompt, panelNumber = 1) => {
  const placeholders = [
    'https://via.placeholder.com/400x300/1f2937/06b6d4?text=Panel+1%3A+Protagonista',
    'https://via.placeholder.com/400x300/1f2937/8b5cf6?text=Panel+2%3A+Problema', 
    'https://via.placeholder.com/400x300/1f2937/10b981?text=Panel+3%3A+Solucion',
    'https://via.placeholder.com/400x300/1f2937/f59e0b?text=Panel+4%3A+Exito'
  ];
  
  return placeholders[panelNumber - 1] || placeholders[0];
};

export const generateComicStory = async (userPrompt, interests = []) => {
  const area = interests[0] || 'ciencia';
  
  const panels = [
    {
      id: 1,
      description: `Protagonista joven latinoamericano interesado en ${userPrompt}`,
      dialogue: `¡Hola! Soy Ana y me fascina ${area}. Quiero explorar ${userPrompt}...`
    },
    {
      id: 2, 
      description: `Descubrimiento de un desafío científico en ${userPrompt}`,
      dialogue: `Hmm, hay un problema con ${userPrompt}. ¿Cómo lo resolvemos?`
    },
    {
      id: 3,
      description: `Aplicando conocimientos de ${area} para la solución`,
      dialogue: `¡Eureka! Usando ${area}, podemos crear una solución innovadora.`
    },
    {
      id: 4,
      description: `Éxito e inspiración para continuar en STEM`,
      dialogue: `¡Increíble! ${area} realmente puede cambiar el mundo. ¡Sigamos investigando!`
    }
  ];

  return panels;
};
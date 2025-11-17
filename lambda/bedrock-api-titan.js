// AWS Lambda Function para Bedrock API con Amazon Titan
// Mantiene las credenciales seguras en el servidor

const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({ 
  region: "us-east-1",
  // Credenciales automáticas via IAM Role
});

exports.handler = async (event) => {
  try {
    const { message, conversationHistory } = JSON.parse(event.body);
    
    const prompt = buildSTEMPrompt(message, conversationHistory);
    
    const command = new InvokeModelCommand({
      modelId: "amazon.titan-text-express-v1",
      body: JSON.stringify({
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 300,
          temperature: 0.7,
          topP: 0.9
        }
      })
    });

    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ response: result.results[0].outputText })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generating response" })
    };
  }
};

function buildSTEMPrompt(message, history) {
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
${history.slice(-3).map(msg => `Usuario: ${msg.text || msg.message || message}`).join('\n')}

Pregunta del estudiante: ${message}

Responde de manera inspiradora, práctica y enfocada en oportunidades STEM en Latinoamérica (máximo 200 palabras):`;
  
  return context;
}
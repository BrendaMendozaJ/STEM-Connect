// Configuración AWS para AI-PathFinder
// Variables de entorno para producción

export const AWS_CONFIG = {
  region: 'us-east-1', // Región donde está disponible Bedrock
  credentials: {
    // Para desarrollo local - usar AWS CLI o variables de entorno
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
  bedrock: {
    endpoint: 'https://bedrock-runtime.us-east-1.amazonaws.com',
    models: {
      claude: 'anthropic.claude-3-sonnet-20240229-v1:0',
      llama: 'meta.llama2-70b-chat-v1',
    }
  }
};

// Para producción - usar IAM roles en Lambda
export const LAMBDA_CONFIG = {
  apiGatewayUrl: process.env.REACT_APP_API_GATEWAY_URL || 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod',
  endpoints: {
    chat: '/chat',
    generateContent: '/generate-content',
    scientists: '/scientists'
  }
};
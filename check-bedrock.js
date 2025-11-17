#!/usr/bin/env node

// Script para verificar configuración de AWS Bedrock
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

async function checkBedrockAccess() {
  console.log('🔍 Verificando acceso a AWS Bedrock...\n');

  try {
    // Verificar credenciales AWS
    const client = new BedrockRuntimeClient({ 
      region: "us-east-1"
    });

    console.log('✅ Cliente Bedrock creado correctamente');

    // Probar invocación de modelo
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 100,
        messages: [{ 
          role: "user", 
          content: "Responde brevemente: ¿Qué es STEM?" 
        }]
      })
    });

    console.log('🚀 Enviando petición de prueba a Claude...');
    
    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    
    console.log('✅ AWS Bedrock funciona correctamente!');
    console.log('📝 Respuesta de prueba:', result.content[0].text);
    
    return true;

  } catch (error) {
    console.log('❌ Error con AWS Bedrock:');
    
    if (error.name === 'AccessDeniedException') {
      console.log('🔐 Problema de permisos. Necesitas:');
      console.log('   - Acceso a AWS Bedrock en tu cuenta');
      console.log('   - Permisos bedrock:InvokeModel');
      console.log('   - Modelo Claude habilitado en la región us-east-1');
    } else if (error.name === 'ValidationException') {
      console.log('⚠️  Modelo no disponible o región incorrecta');
      console.log('   - Verifica que Claude esté habilitado en us-east-1');
    } else if (error.name === 'CredentialsProviderError') {
      console.log('🔑 Credenciales AWS no configuradas');
      console.log('   - Ejecuta: aws configure');
      console.log('   - O configura variables de entorno AWS');
    } else {
      console.log('❓ Error desconocido:', error.message);
    }
    
    return false;
  }
}

async function checkAPIGateway() {
  console.log('\n🌐 Verificando API Gateway...');
  
  const apiUrl = process.env.REACT_APP_API_GATEWAY_URL || 'https://ebs7w97sj7.execute-api.us-east-1.amazonaws.com/prod';
  
  try {
    const response = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "Test",
        conversationHistory: []
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Gateway funciona correctamente');
      console.log('📝 Respuesta:', data.response);
      return true;
    } else {
      console.log('❌ API Gateway error:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Error conectando a API Gateway:', error.message);
    return false;
  }
}

async function main() {
  console.log('🤖 AI-PathFinder - Verificación de AWS Bedrock\n');
  
  const bedrockOk = await checkBedrockAccess();
  const apiOk = await checkAPIGateway();
  
  console.log('\n📊 RESUMEN:');
  console.log(`AWS Bedrock directo: ${bedrockOk ? '✅' : '❌'}`);
  console.log(`API Gateway + Lambda: ${apiOk ? '✅' : '❌'}`);
  
  if (!bedrockOk && !apiOk) {
    console.log('\n⚠️  RECOMENDACIÓN:');
    console.log('La aplicación usará fallbacks inteligentes.');
    console.log('Para habilitar Bedrock:');
    console.log('1. Configura credenciales AWS: aws configure');
    console.log('2. Solicita acceso a Bedrock en AWS Console');
    console.log('3. Habilita modelo Claude en us-east-1');
    console.log('4. Verifica permisos IAM para bedrock:InvokeModel');
  } else {
    console.log('\n🎉 ¡Configuración exitosa!');
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkBedrockAccess, checkAPIGateway };
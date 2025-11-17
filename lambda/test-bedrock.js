// Función Lambda simplificada para probar Bedrock
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({ 
  region: "us-east-1"
});

exports.handler = async (event) => {
  console.log('Event received:', JSON.stringify(event));
  
  try {
    let body;
    if (event.body) {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } else {
      body = event;
    }
    
    const { message = "Hello", conversationHistory = [] } = body;
    
    console.log('Processing message:', message);
    
    const prompt = `You are a STEM career counselor for Latin American students. 
Question: ${message}
Respond in a helpful and inspiring way (max 150 words):`;
    
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }]
      })
    });

    console.log('Calling Bedrock...');
    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    
    console.log('Bedrock response received');
    
    return {
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        response: result.content[0].text,
        model: "claude-3.5-sonnet-v2",
        status: "success"
      })
    };
    
  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        error: "Error generating response",
        details: error.message,
        type: error.name
      })
    };
  }
};
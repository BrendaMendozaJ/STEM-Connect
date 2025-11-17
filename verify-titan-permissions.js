// Script para verificar permisos de Amazon Titan
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { IAMClient, GetRoleCommand, ListAttachedRolePoliciesCommand } = require("@aws-sdk/client-iam");

async function verifyTitanPermissions() {
  console.log("🔍 Verificando permisos para Amazon Titan...\n");

  try {
    // 1. Verificar conexión a Bedrock
    const bedrockClient = new BedrockRuntimeClient({ region: "us-east-1" });
    
    console.log("✅ Cliente Bedrock creado correctamente");

    // 2. Probar invocación de Titan
    const testCommand = new InvokeModelCommand({
      modelId: "amazon.titan-text-express-v1",
      body: JSON.stringify({
        inputText: "Test message for STEM guidance",
        textGenerationConfig: {
          maxTokenCount: 50,
          temperature: 0.7,
          topP: 0.9
        }
      })
    });

    console.log("🧪 Probando invocación de Amazon Titan...");
    
    const response = await bedrockClient.send(testCommand);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    
    console.log("✅ Amazon Titan responde correctamente:");
    console.log("📝 Respuesta:", result.results[0].outputText.substring(0, 100) + "...");
    
    return true;

  } catch (error) {
    console.error("❌ Error verificando permisos:");
    console.error("Código:", error.name);
    console.error("Mensaje:", error.message);
    
    if (error.name === "AccessDeniedException") {
      console.log("\n🔧 SOLUCIÓN REQUERIDA:");
      console.log("1. Tu función Lambda necesita permisos para bedrock:InvokeModel");
      console.log("2. Ejecuta: aws iam attach-role-policy --role-name tu-lambda-role --policy-arn arn:aws:iam::aws:policy/AmazonBedrockFullAccess");
      console.log("3. O usa el script fix-titan-permissions.js");
    }
    
    return false;
  }
}

// Ejecutar verificación
verifyTitanPermissions()
  .then(success => {
    if (success) {
      console.log("\n🎉 ¡Permisos configurados correctamente para Amazon Titan!");
    } else {
      console.log("\n⚠️  Se requiere configuración adicional de permisos");
    }
  })
  .catch(console.error);
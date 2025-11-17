// Script para configurar permisos de Amazon Titan automáticamente
const { IAMClient, AttachRolePolicyCommand, CreateRoleCommand, CreatePolicyCommand } = require("@aws-sdk/client-iam");
const { LambdaClient, GetFunctionCommand, UpdateFunctionConfigurationCommand } = require("@aws-sdk/client-lambda");

const LAMBDA_FUNCTION_NAME = "ai-pathfinder-chat";
const ROLE_NAME = "ai-pathfinder-lambda-role";

async function fixTitanPermissions() {
  console.log("🔧 Configurando permisos para Amazon Titan...\n");

  const iamClient = new IAMClient({ region: "us-east-1" });
  const lambdaClient = new LambdaClient({ region: "us-east-1" });

  try {
    // 1. Obtener información de la función Lambda
    console.log("📋 Obteniendo información de la función Lambda...");
    const lambdaInfo = await lambdaClient.send(new GetFunctionCommand({
      FunctionName: LAMBDA_FUNCTION_NAME
    }));

    const roleArn = lambdaInfo.Configuration.Role;
    const roleName = roleArn.split('/').pop();
    
    console.log("✅ Función Lambda encontrada:", LAMBDA_FUNCTION_NAME);
    console.log("✅ Role actual:", roleName);

    // 2. Adjuntar política de Bedrock
    console.log("\n🔐 Adjuntando permisos de Bedrock...");
    
    await iamClient.send(new AttachRolePolicyCommand({
      RoleName: roleName,
      PolicyArn: "arn:aws:iam::aws:policy/AmazonBedrockFullAccess"
    }));

    console.log("✅ Política AmazonBedrockFullAccess adjuntada");

    // 3. Crear política específica para Titan (más restrictiva)
    const titanPolicyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: [
            "bedrock:InvokeModel"
          ],
          Resource: [
            "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-text-express-v1",
            "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-text-lite-v1"
          ]
        }
      ]
    };

    try {
      await iamClient.send(new CreatePolicyCommand({
        PolicyName: "TitanSpecificAccess",
        PolicyDocument: JSON.stringify(titanPolicyDocument),
        Description: "Acceso específico a modelos Amazon Titan para AI-PathFinder"
      }));
      console.log("✅ Política específica de Titan creada");
    } catch (error) {
      if (error.name === "EntityAlreadyExistsException") {
        console.log("ℹ️  Política específica de Titan ya existe");
      } else {
        console.warn("⚠️  No se pudo crear política específica:", error.message);
      }
    }

    console.log("\n🎉 ¡Permisos configurados correctamente!");
    console.log("⏳ Espera 1-2 minutos para que los cambios se propaguen");
    console.log("🧪 Luego ejecuta: node verify-titan-permissions.js");

  } catch (error) {
    console.error("❌ Error configurando permisos:");
    console.error("Código:", error.name);
    console.error("Mensaje:", error.message);
    
    if (error.name === "NoSuchEntityException") {
      console.log("\n🔧 SOLUCIÓN MANUAL:");
      console.log("1. Ve a AWS IAM Console");
      console.log("2. Busca el role de tu función Lambda");
      console.log("3. Adjunta la política 'AmazonBedrockFullAccess'");
    }
  }
}

// Ejecutar configuración
fixTitanPermissions();
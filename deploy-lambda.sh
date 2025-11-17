#!/bin/bash

echo "🚀 Deploy Lambda Function para AI-PathFinder"
echo "============================================"

# Crear package.json para Lambda
cd lambda
cat > package.json << EOF
{
  "name": "ai-pathfinder-lambda",
  "version": "1.0.0",
  "dependencies": {
    "@aws-sdk/client-bedrock-runtime": "^3.0.0"
  }
}
EOF

# Instalar dependencias
npm install

# Crear ZIP para deployment
zip -r bedrock-api.zip . -x "*.sh" "*.md"

echo "📦 Lambda package creado: bedrock-api.zip"
echo ""
echo "🔧 Próximos pasos:"
echo "1. Ve a AWS Lambda Console"
echo "2. Crea función 'ai-pathfinder-chat'"
echo "3. Sube bedrock-api.zip"
echo "4. Configura API Gateway"
echo ""
echo "💡 O usa AWS SAM para deploy automático:"
echo "sam deploy --guided"
#!/bin/bash

echo "🔑 Configuración de AWS Credentials para AI-PathFinder"
echo "=================================================="

# Verificar si AWS CLI está instalado
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI no está instalado"
    echo "📥 Instalando AWS CLI..."
    
    # Descargar e instalar AWS CLI
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    echo "🔐 Se requiere contraseña de administrador para instalar AWS CLI:"
    sudo installer -pkg AWSCLIV2.pkg -target /
    rm AWSCLIV2.pkg
    
    # Agregar al PATH
    echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
    source ~/.zshrc
fi

echo "✅ AWS CLI instalado"

# Configurar credenciales
echo ""
echo "🔧 Configurando credenciales AWS..."
echo "Ve a: https://console.aws.amazon.com/iam/home#/users"
echo "1. Crea un usuario IAM"
echo "2. Adjunta política: AmazonBedrockFullAccess"
echo "3. Crea Access Keys"
echo ""

read -p "Ingresa tu AWS Access Key ID: " access_key
read -p "Ingresa tu AWS Secret Access Key: " secret_key

# Configurar AWS CLI
aws configure set aws_access_key_id "$access_key"
aws configure set aws_secret_access_key "$secret_key"
aws configure set default.region us-east-1
aws configure set default.output json

# Actualizar archivo .env
cat > .env << EOF
# AWS Credentials para AI-PathFinder
REACT_APP_AWS_ACCESS_KEY_ID=$access_key
REACT_APP_AWS_SECRET_ACCESS_KEY=$secret_key
REACT_APP_AWS_REGION=us-east-1

# API Gateway (para producción)
REACT_APP_API_GATEWAY_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod

# Hugging Face (fallback)
REACT_APP_HUGGINGFACE_API_KEY=hf_...
EOF

echo "✅ Credenciales configuradas"

# Verificar configuración
echo ""
echo "🧪 Verificando configuración..."
aws sts get-caller-identity

# Verificar acceso a Bedrock
echo ""
echo "🤖 Verificando acceso a Bedrock..."
aws bedrock list-foundation-models --region us-east-1 --query 'modelSummaries[?contains(modelId, `claude`)].modelId' --output table

echo ""
echo "🎉 ¡Configuración completada!"
echo "Ahora puedes usar AWS Bedrock en tu aplicación"
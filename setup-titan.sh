#!/bin/bash

# Script para configurar Amazon Titan completamente
echo "🚀 Configurando Amazon Titan para AI-PathFinder..."
echo "================================================"

# Variables
FUNCTION_NAME="ai-pathfinder-chat"
REGION="us-east-1"

echo "📋 Verificando AWS CLI..."
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI no está instalado"
    echo "Instala con: brew install awscli"
    exit 1
fi

echo "✅ AWS CLI encontrado"

echo "🔍 Obteniendo información de la función Lambda..."
ROLE_ARN=$(aws lambda get-function --function-name $FUNCTION_NAME --region $REGION --query 'Configuration.Role' --output text 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "❌ No se pudo encontrar la función Lambda '$FUNCTION_NAME'"
    echo "Verifica que existe en la región $REGION"
    exit 1
fi

ROLE_NAME=$(echo $ROLE_ARN | cut -d'/' -f2)
echo "✅ Función encontrada con role: $ROLE_NAME"

echo "🔐 Adjuntando permisos de Bedrock..."
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn arn:aws:iam::aws:policy/AmazonBedrockFullAccess \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Permisos de Bedrock adjuntados correctamente"
else
    echo "⚠️  Error adjuntando permisos (puede que ya existan)"
fi

echo "📦 Actualizando función Lambda con código de Titan..."
if [ -f "lambda/bedrock-api-titan.zip" ]; then
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://lambda/bedrock-api-titan.zip \
        --region $REGION
    
    if [ $? -eq 0 ]; then
        echo "✅ Código de función actualizado"
    else
        echo "❌ Error actualizando código de función"
    fi
else
    echo "⚠️  Archivo lambda/bedrock-api-titan.zip no encontrado"
    echo "Ejecuta primero: cd lambda && zip -r bedrock-api-titan.zip bedrock-api-titan.js"
fi

echo "⏳ Esperando propagación de permisos (30 segundos)..."
sleep 30

echo "🧪 Probando configuración..."
curl -X POST "https://ebs7w97sj7.execute-api.us-east-1.amazonaws.com/prod/chat" \
    -H "Content-Type: application/json" \
    -d '{"message": "Test Amazon Titan", "conversationHistory": []}' \
    --max-time 30

echo -e "\n\n🎉 ¡Configuración completada!"
echo "📝 Próximos pasos:"
echo "1. Verifica que la respuesta anterior sea exitosa"
echo "2. Si hay errores, ejecuta: node verify-titan-permissions.js"
echo "3. Prueba la aplicación en la sección 'Orientación'"
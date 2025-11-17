echo "🧪 Verificando si tienes AWS CLI configurado..."
if aws sts get-caller-identity 2>/dev/null; then
    echo "✅ AWS CLI configurado correctamente"
    echo "🤖 Verificando acceso a Bedrock..."
    aws bedrock list-foundation-models --region us-east-1 --query "modelSummaries[?contains(modelId, \`claude\`)].modelId" --output table 2>/dev/null || echo "❌ Bedrock no accesible - necesitas habilitar modelos"
else
    echo "❌ AWS CLI no configurado"
    echo "Ejecuta: ./setup-credentials.sh"
fi

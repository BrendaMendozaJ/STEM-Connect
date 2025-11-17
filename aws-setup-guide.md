# 🚀 Guía de Configuración AWS para AI-PathFinder

## 1. Configurar AWS CLI (Recomendado)

```bash
# Instalar AWS CLI
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Configurar credenciales
aws configure
# AWS Access Key ID: tu_access_key
# AWS Secret Access Key: tu_secret_key  
# Default region: us-east-1
# Default output format: json
```

## 2. Habilitar AWS Bedrock

### En AWS Console:
1. Ve a **AWS Bedrock** → **Model access**
2. Habilita **Claude 3 Sonnet** (anthropic.claude-3-sonnet-20240229-v1:0)
3. Espera aprobación (~5 minutos)

### Regiones disponibles:
- `us-east-1` (Virginia) ✅ Recomendado
- `us-west-2` (Oregon)
- `eu-west-3` (París)

## 3. Configurar Variables de Entorno

```bash
# Crear archivo .env
cp .env.example .env

# Editar con tus credenciales
nano .env
```

## 4. Costos Estimados (con tus AWS Credits)

### AWS Bedrock Claude 3 Sonnet:
- **Input**: $3/1M tokens
- **Output**: $15/1M tokens
- **Tu app**: ~$0.01-0.05 por conversación
- **1000 usuarios/mes**: ~$20-50

### Servicios adicionales:
- **Lambda**: Gratis (1M requests/mes)
- **API Gateway**: $3.50/1M requests
- **S3**: $0.023/GB/mes

## 5. Arquitectura Recomendada

```
Frontend (Amplify) → API Gateway → Lambda → Bedrock
                                      ↓
                                   S3 (storage)
```

## 6. Comandos Útiles

```bash
# Verificar configuración
aws sts get-caller-identity

# Listar modelos Bedrock disponibles
aws bedrock list-foundation-models --region us-east-1

# Test Bedrock
aws bedrock-runtime invoke-model \
  --model-id anthropic.claude-3-sonnet-20240229-v1:0 \
  --body '{"anthropic_version":"bedrock-2023-05-31","max_tokens":100,"messages":[{"role":"user","content":"Hola"}]}' \
  --region us-east-1 \
  output.json
```

## 7. Seguridad

- ✅ Usar IAM roles en producción
- ✅ No hardcodear credenciales
- ✅ Rotar keys regularmente
- ✅ Usar least privilege principle

## 8. Deploy a Producción

1. **Lambda Functions** para APIs
2. **API Gateway** para endpoints
3. **Amplify** para frontend
4. **CloudFormation** para infraestructura

¿Necesitas ayuda con algún paso específico?
# 🛡️ Protección de Costos AWS Bedrock

## 1. Configurar Billing Alerts
```bash
# Crear alerta de facturación
aws budgets create-budget --account-id YOUR_ACCOUNT_ID --budget '{
  "BudgetName": "Bedrock-Budget",
  "BudgetLimit": {
    "Amount": "10.0",
    "Unit": "USD"
  },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST"
}'
```

## 2. Monitorear uso en tiempo real
- AWS Console > Billing > Cost Explorer
- Filtrar por servicio: "Amazon Bedrock"
- Ver costos diarios/mensuales

## 3. Configurar límites en Lambda
```javascript
// En tu función Lambda, agregar límite de requests
let requestCount = 0;
const MAX_REQUESTS_PER_DAY = 100;

exports.handler = async (event) => {
  if (requestCount > MAX_REQUESTS_PER_DAY) {
    return {
      statusCode: 429,
      body: JSON.stringify({ error: "Daily limit exceeded" })
    };
  }
  requestCount++;
  // ... resto del código
};
```

## 4. Usar modelos más económicos
- Claude 3 Haiku: ~70% más barato que Sonnet
- Claude Instant: ~90% más barato que Sonnet

## 5. Implementar cache
```javascript
// Cache responses para evitar llamadas repetidas
const responseCache = new Map();

const getCachedResponse = (message) => {
  const key = message.toLowerCase().trim();
  return responseCache.get(key);
};

const setCachedResponse = (message, response) => {
  const key = message.toLowerCase().trim();
  responseCache.set(key, response);
};
```

## 📊 Estimación de costos para tu proyecto:
- **Desarrollo (100 requests/mes)**: $0.50 - $2
- **Demo/Presentación (500 requests)**: $2 - $8  
- **Uso intensivo (1000 requests/mes)**: $5 - $15

## ⚠️ Recomendaciones:
1. **Configura alertas** de $5 y $10
2. **Usa Claude Haiku** para desarrollo (más barato)
3. **Implementa cache** para preguntas comunes
4. **Monitorea semanalmente** el uso en AWS Console
PRUEBA DE CARGA - SERVICIO DE LOGIN

Versiones requeridas:
- K6 v0.45.0 o superior
- Node.js v16.x o superior (solo para desarrollo)

Instrucciones de ejecución:

1. Instalar K6:
   - Windows: choco install k6
   - MacOS: brew install k6
   - Linux:
        sudo apt-get update
        sudo apt-get install k6

2. Clonar repositorio:
   git clone https://github.com/tu-usuario/k6-load-test.git
   cd k6-load-test

3. Ejecutar prueba:
   k6 run load_test.js

4. (Opcional) Generar reporte HTML:
   k6 run --out html=report.html load_test.js

Configuración de la prueba:
- Objetivo: 20 TPS (transacciones por segundo)
- Duración: 1 minuto
- Umbrales:
  - 95% de respuestas < 1500ms
  - Tasa de error < 3%

Los resultados se mostrarán en consola al finalizar la prueba.

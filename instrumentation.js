const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource, ResourceAttributes } = require('@opentelemetry/resources');

const sdk = new NodeSDK({
  resource: new Resource({
    [ResourceAttributes.SERVICE_NAME]: 'bowling-lanes-api',
    [ResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  instrumentations: [getAutoInstrumentations()],
});

sdk.start();

console.log('OpenTelemetry instrumentation running...');

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry terminated'))
    .catch((error) => console.log('Error terminating OpenTelemetry', error))
    .finally(() => process.exit(0));
});
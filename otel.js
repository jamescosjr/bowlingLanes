import { logs } from "@opentelemetry/api-logs";
import { LoggerProvider, SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";

const logExporter = new OTLPLogExporter({
  url: "http://otel-collector:4318/v1/logs",
});

const loggerProvider = new LoggerProvider();
loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(logExporter));

const logger = loggerProvider.getLogger("bowling-lanes-api");

logs.setGlobalLoggerProvider(loggerProvider);

export default logger;

import { Logger } from '@nestjs/common';

// Opciones configurables para el decorador
interface MeasureOptions {
  logger?: Logger; // Logger opcional
  logLevel?: 'log' | 'debug' | 'warn'; // Nivel de log
  timerName?: string; // Nombre personalizado del temporizador
}

export const MeasureExecutionTime = (options: MeasureOptions = {}) => {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    propertyDescriptor =
      propertyDescriptor ||
      Object.getOwnPropertyDescriptor(target, propertyKey);

    // Usar logger proporcionado o crear uno por defecto
    const logger = options.logger || new Logger('MeasureExecutionTime');
    const logLevel = options.logLevel || 'log';

    // Determinar el nombre del temporizador
    const defaultTimerName =
      target instanceof Function
        ? `static ${target.name}`
        : target.constructor.name;
    const timerName = options.timerName || defaultTimerName;

    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      const start = process.hrtime.bigint();

      const result = originalMethod.apply(this, args);

      // Función para registrar el tiempo
      const logTime = (end: bigint, error?: any) => {
        const timeMs = Number(end - start) / 1_000_000;
        const message = error
          ? `[${timerName}]: failed after ${timeMs}ms - ${error.message}`
          : `[${timerName}]: completed in ${timeMs}ms`;
        logger[logLevel](message);
      };

      // Si es una promesa, manejarla
      if (result instanceof Promise) {
        return result
          .then((value) => {
            logTime(process.hrtime.bigint());
            return value;
          })
          .catch((err) => {
            logTime(process.hrtime.bigint(), err);
            throw err;
          });
      }

      // Si es síncrono, registrar y devolver directamente
      logTime(process.hrtime.bigint());
      return result;
    };

    return propertyDescriptor;
  };
};

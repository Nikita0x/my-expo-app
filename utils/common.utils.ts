// Define an interface for the debounced function
interface DebouncedFunction {
  (...args: any[]): void;
}

// Define an interface for the debounce function
interface Debounce {
  (func: (...args: any[]) => void, delay: number): DebouncedFunction;
}

// Implement the debounce function with the defined interface
export const debounce: Debounce = (func, delay) => {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Asserts that a value is neither `null` nor `undefined`.
 *
 * This function serves as a type guard to inform the TypeScript compiler that
 * the provided value is defined, meaning it is neither `null` nor `undefined`.
 * If the value is `null` or `undefined`, an error is thrown.
 *
 * @template T - The type of the value being asserted.
 * @param {T | null | undefined} value - The value to assert.
 * @throws {Error} Throws an error if the value is `null` or `undefined`.
 */

export function assert<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) throw Error('value is not defined');
}

/**
 * Функция для задержки выполнения на указанный интервал времени.
 *
 * @param {number} ms - Время задержки в миллисекундах.
 * @returns {Promise<void>} Промис, который разрешается после указанного времени.
 *
 * @example
 * // Задержка на 1 секунду
 * await delay(1000);
 */

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        if (!Array.isArray(target[key])) {
          target[key] = [];
        }
        target[key] = target[key].concat(source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function isObject(obj: any): boolean {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

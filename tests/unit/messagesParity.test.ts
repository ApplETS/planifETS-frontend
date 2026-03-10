import { describe, expect, it } from 'vitest';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
type JsonObject = {
  [key: string]: JsonValue;
};
type JsonArray = {} & Array<JsonValue>;

function flattenKeys(value: JsonValue, prefix = ''): Map<string, string> {
  const keys = new Map<string, string>();

  if (Array.isArray(value)) {
    keys.set(prefix, 'array');
    return keys;
  }

  if (value !== null && typeof value === 'object') {
    keys.set(prefix, 'object');
    for (const [key, child] of Object.entries(value)) {
      const path = prefix ? `${prefix}.${key}` : key;
      for (const [childPath, childType] of flattenKeys(child, path)) {
        keys.set(childPath, childType);
      }
    }
    return keys;
  }

  keys.set(prefix, typeof value);
  return keys;
}

describe('i18n parity', () => {
  it('contains all English keys in French with matching value types', () => {
    const enKeyTypes = flattenKeys(enMessages as JsonValue);
    const frKeyTypes = flattenKeys(frMessages as JsonValue);

    const missingInFrench: string[] = [];
    const typeMismatches: string[] = [];

    for (const [key, enType] of enKeyTypes) {
      const frType = frKeyTypes.get(key);

      if (!frType) {
        missingInFrench.push(key);
        continue;
      }

      if (frType !== enType) {
        typeMismatches.push(`${key} (en: ${enType}, fr: ${frType})`);
      }
    }

    expect(missingInFrench, `Missing keys in fr.json:\n${missingInFrench.join('\n')}`).toEqual([]);
    expect(typeMismatches, `Type mismatches between en.json and fr.json:\n${typeMismatches.join('\n')}`).toEqual([]);
  });

  it('does not contain orphan French keys (not present in English)', () => {
    const enKeys = new Set(flattenKeys(enMessages as JsonValue).keys());
    const frKeys = new Set(flattenKeys(frMessages as JsonValue).keys());

    const onlyInFrench = [...frKeys].filter((key) => !enKeys.has(key));

    expect(onlyInFrench, `Keys only in fr.json:\n${onlyInFrench.join('\n')}`).toEqual([]);
  });
});

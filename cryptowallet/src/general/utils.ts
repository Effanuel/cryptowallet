export function roundTo(value: number, stepSize: number): number {
  const inverse = 1.0 / stepSize;
  return parseFloat((Math.floor(value * inverse) / inverse).toFixed(8));
}

const MatchStartingNumber = /^\d*[\.,]?\d{0,2}/;

export function numberTransformer(initial: string): string {
  const result = MatchStartingNumber.exec(initial.trim())?.[0] || '';
  return result.replace(/,/g, '.');
}

export function numberPrettier(value: number): string {
  if (value >= 1e6) {
    return `${roundTo(value / 1e6, 0.001)}M`;
  }
  if (value >= 1e4) {
    return `${roundTo(value / 1e3, 0.001)}k`;
  }
  return String(value);
}

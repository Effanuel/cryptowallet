export function roundTo(value: number, stepSize: number): number {
  const inverse = 1.0 / stepSize;
  return parseFloat((Math.floor(value * inverse) / inverse).toFixed(8));
}

const MatchStartingNumber = /^\d*[\.,]?\d{0,}/;

export function numberTransformer(initial: string): string {
  const result = MatchStartingNumber.exec(initial.trim())?.[0] || '';
  return result.replace(/,/g, '.');
}

const StandardFormatter: Formatter = {decimal: {len: 3, delim: '.'}, whole: {len: 3, delim: ','}};

export function numberPrettier(value: number): string {
  if (value >= 1e6) {
    return `${roundTo(value / 1e6, 0.001)}M`;
  }
  if (value >= 1e4) {
    return `${roundTo(value / 1e3, 0.001)}k`;
  }
  return String(numberFormatter(value));
}

interface Formatter {
  decimal: {len: number; delim?: string};
  whole: {len: number; delim: string};
}

export function numberFormatter(value: number, {decimal, whole}: Formatter = StandardFormatter): string {
  const regex = '\\d(?=(\\d{' + (whole.len || 3) + '})+' + (decimal.len > 0 ? '\\D' : '$') + ')';
  const num = value.toFixed(Math.max(0, ~~decimal.len + 1)).slice(0, -1);

  return (decimal.delim ? num.replace('.', decimal.delim) : num).replace(
    new RegExp(regex, 'g'),
    '$&' + (whole.delim || ','),
  );
}

import * as uut from './utils';

describe('General', () => {
  describe('roundTo()', () => {
    const {roundTo} = uut;

    it('should not round whole number', () => {
      expect(roundTo(100, 5)).toEqual(100);
      expect(roundTo(6, 2)).toEqual(6);
      expect(roundTo(9, 3)).toEqual(9);
      expect(roundTo(-9, 3)).toEqual(-9);
    });

    it('should round for 100', () => {
      const r = 100;
      expect(roundTo(100, r)).toEqual(100);
      expect(roundTo(125, r)).toEqual(100);
      expect(roundTo(199, r)).toEqual(100);
      expect(roundTo(6.12, r)).toEqual(0);
      expect(roundTo(9.55, r)).toEqual(0);
      expect(roundTo(-9.55, r)).toEqual(-100);
    });

    it('should round for 0.5', () => {
      const r = 0.5;
      expect(roundTo(100, r)).toEqual(100);
      expect(roundTo(6.12, r)).toEqual(6);
      expect(roundTo(9.55, r)).toEqual(9.5);
      expect(roundTo(-9.55, r)).toEqual(-10);
    });

    it('should round for 0.05', () => {
      const r = 0.05;
      expect(roundTo(100, r)).toEqual(100);
      expect(roundTo(6.12, r)).toEqual(6.1);
      expect(roundTo(9.568, r)).toEqual(9.55);
      expect(roundTo(-9.1222, r)).toEqual(-9.15);
    });

    it('should round for 0.0001', () => {
      const r = 0.0001;
      expect(roundTo(100, r)).toEqual(100);
      expect(roundTo(6.12, r)).toEqual(6.12);
      expect(roundTo(9.568555, r)).toEqual(9.5685);
      expect(roundTo(-9.1222, r)).toEqual(-9.1222);
    });

    it('should remove precision leftover', () => {
      expect(roundTo(0.00033792, 0.00001)).toEqual(0.00033);
      expect(roundTo(0.0003409, 0.00001)).toEqual(0.00034);
    });
  });
});

describe('numberPrettier', () => {
  const {numberPrettier} = uut;

  it('should not change formatting of numbers below 10k', () => {
    expect(numberPrettier(2.5)).toEqual('2.500');
    expect(numberPrettier(123)).toEqual('123.000');
    expect(numberPrettier(9999.999)).toEqual('9,999.999');
    expect(numberPrettier(500.0005)).toEqual('500.000');
    expect(numberPrettier(0)).toEqual('0.000');
    expect(numberPrettier(5)).toEqual('5.000');
  });

  it('should format numbers above 10k', () => {
    expect(numberPrettier(10_000)).toEqual('10k');
    expect(numberPrettier(15_300)).toEqual('15.3k');
    expect(numberPrettier(99_123)).toEqual('99.123k');
    expect(numberPrettier(77777.888)).toEqual('77.777k');
  });

  it('should format numbers above 100k', () => {
    expect(numberPrettier(100_000)).toEqual('100k');
    expect(numberPrettier(150_300)).toEqual('150.3k');
    expect(numberPrettier(990_123)).toEqual('990.123k');
    expect(numberPrettier(777_888)).toEqual('777.888k');
  });

  it('should format numbers above 1m', () => {
    expect(numberPrettier(1_000_000)).toEqual('1M');
    expect(numberPrettier(1_500_300)).toEqual('1.5M');
    expect(numberPrettier(9_910_123)).toEqual('9.91M');
    expect(numberPrettier(456_910_123)).toEqual('456.91M');
  });
});

describe('format()', () => {
  const {numberFormatter: format} = uut;

  it('should format numbers above 1000', () => {
    expect(format(1234.123, {decimal: {len: 3, delim: '.'}, whole: {len: 3, delim: ','}})).toEqual('1,234.123');
    expect(format(9234, {decimal: {len: 3, delim: '.'}, whole: {len: 3, delim: ','}})).toEqual('9,234.000');
  });

  it('should format numbers above 10k', () => {
    expect(format(12345.123, {decimal: {len: 3, delim: '.'}, whole: {len: 3, delim: ','}})).toEqual('12,345.123');
    expect(format(92345, {decimal: {len: 3, delim: '.'}, whole: {len: 3, delim: ','}})).toEqual('92,345.000');
  });
});

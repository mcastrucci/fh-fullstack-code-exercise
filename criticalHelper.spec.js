// import the module
const { isCriticalResult } = require('./criticalHelper')

describe('criticalCalculationsHelper', () => {
  describe('calculate critical values with mixed operators', () => {
    it('should return true  since 20 is included in the max side of the minimum range and has a ] operator', () => {
      expect(isCriticalResult('[0,20][80,110]', '20')).toBe(true);
    });
    it('should return false since 20 is included in the min side of the minimum range but has a ) operator', () => {
      expect(isCriticalResult('[0,20)[80,110]', '20')).toBe(false);
    });
    it('should return true  since 80 is included in the max side of the minimum range and has a [ operator', () => {
      expect(isCriticalResult('[0,20][80,110]', '80')).toBe(true);
    });
    it('should return false since 80 is included in the min side of the minimum range but has a ( operator', () => {
      expect(isCriticalResult('[0,20)(80,110]', '80')).toBe(false);
    });
    it('should return true  since 110 is included in the max side of the minimum range and has a ] operator', () => {
      expect(isCriticalResult('[0,20][80,110]', '110')).toBe(true);
    });
    it('should return false since 110 is included in the min side of the minimum range but has a ) operator', () => {
      expect(isCriticalResult('[0,20)[80,110)', '110')).toBe(false);
    });
    it('should return true  since 0.5 is included in the max side of the minimum range and has a ] operator', () => {
      expect(isCriticalResult('[0,0.5][0.8,1.1]', '0.5')).toBe(true);
    });
    it('should return false since 0.5 is included in the min side of the minimum range but has a ) operator', () => {
      expect(isCriticalResult('[0,0.5)[0.8,1.1]', '0.5')).toBe(false);
    });
    it('should return true  since 0.8 is included in the max side of the minimum range and has a [ operator', () => {
      expect(isCriticalResult('[0,0.5][0.8,1.1]', '0.8')).toBe(true);
    });
    it('should return false since 0.8 is included in the min side of the minimum range but has a ( operator', () => {
      expect(isCriticalResult('[0,0.5)(0.8,1.1]', '0.8')).toBe(false);
    });
    it('should return true  since 1.1 is included in the max side of the minimum range and has a ] operator', () => {
      expect(isCriticalResult('[0,0.5][0.8,1.1]', '1.1')).toBe(true);
    });
    it('should return false since 1.1 is included in the min side of the minimum range but has a ) operator', () => {
      expect(isCriticalResult('[0,0.5)[0.8,1.1)', '1.1')).toBe(false);
    });
    it('should return false since 0.6 falls between the two ranges', () => {
      expect(isCriticalResult('[0,0.5)[0.8,1.1)', '0.6')).toBe(false);
    });
  });
  describe('calculates p-1 or p-2', () => {
    it('should be p-2 since 10 is included in the p-2 with a [ operator and 10 is with a ) operator in p-1', () => {
      const isP1 = isCriticalResult('[1,10)', '10');
      const isP2 = isCriticalResult('[10,30)', '10');
      expect(isP1).toBe(false);
      expect(isP2).toBe(true);
    });
    it('should be p-2 since 10 is included in the p-2 with a [ operator and 10 is with a ) operator in p-1', () => {
      const isP1 = isCriticalResult('[1,10)', '10');
      const isP2 = isCriticalResult('[10,30)', '10');
      expect(isP1).toBe(false);
      expect(isP2).toBe(true);
    });

    it('should be p-1 since 5 is included in the p-1 with a [ operator and 5 is not in p-2 range', () => {
      const isP1 = isCriticalResult('[1,15]', '5');
      const isP2 = isCriticalResult('[10,30)', '5');
      expect(isP1).toBe(true);
      expect(isP2).toBe(false);
    });

    it('should be outside both ranges since 100 is outside both ranges', () => {
      const isP1 = isCriticalResult('[1,15]', '100');
      const isP2 = isCriticalResult('[10,30)', '100');
      expect(isP1).toBe(false);
      expect(isP2).toBe(false);
    });

    it('should be outside both ranges since -10 is outside both ranges', () => {
      const isP1 = isCriticalResult('[1,15]', '-10');
      const isP2 = isCriticalResult('[10,30)', '-10');
      expect(isP1).toBe(false);
      expect(isP2).toBe(false);
    });

    it('should be p-2 since 25 is included in the p-2 with a [ operator and 20 is with a ) operator in p-1', () => {
      const isP1 = isCriticalResult('[5,20)', '20');
      const isP2 = isCriticalResult('[20,40]', '20');
      expect(isP1).toBe(false);
      expect(isP2).toBe(true);
    });

    it('should be p-1 since 5 is included in the p-1 with a [ operator and 20 is with a ] operator in p-2', () => {
      const isP1 = isCriticalResult('[5,20]', '5');
      const isP2 = isCriticalResult('[20,40)', '5');
      expect(isP1).toBe(true);
      expect(isP2).toBe(false);
    });

    it('should be outside both ranges since 50 is outside both ranges', () => {
      const isP1 = isCriticalResult('[5,20]', '50');
      const isP2 = isCriticalResult('[20,40)', '50');
      expect(isP1).toBe(false);
      expect(isP2).toBe(false);
    });

    it('should be outside both ranges since -5 is outside both ranges', () => {
      const isP1 = isCriticalResult('[5,20]', '-5');
      const isP2 = isCriticalResult('[20,40)', '-5');
      expect(isP1).toBe(false);
      expect(isP2).toBe(false);
    });
  });
  describe('isCriticalResult', () => {
    test.each([
      ['[1,10]', '2', true],
      ['(1,10]', '2', true],
      ['(1,10)', '2', true],
      ['[5,20]', '5', true],
      ['[5,20]', '20', true],
      ['(5,20)', '6', true],
      ['(5,20)', '19', true],
      ['[1,1]', '1', true],
      ['[0,10)', '9', true],
      ['(0,10)', '9', true],
      ['[0,10]', '10', true],
      ['(0,10]', '10', true],
      ['[10,10]', '10', true],
      ['(10,20]', '11', true],
      ['[10,20)', '19', true],
      ['[20,30)', '25', true],
      ['(20,30)', '22', true],
      ['(15,25)', '16', true],
      ['(30,40]', '40', true],
      ['[30,40)', '30', true],
      ['[0,0]', '0', true],
      // Range is (0,10], result is 0 (outside the range)
      ['(0,10]', '0', false],
      // Range is [10,20), result is 20 (outside the range)
      ['[10,20)', '20', false],
      // Range is [10,10], result is 9 (outside the range)
      ['[10,10]', '9', false],
      // Range is (0,0], result is 0 (outside the range)
      ['(0,0]', '0', false],
      ['(20,30]', '30', true],
      // Range is [0,20) or [80,110], result is 25 (outside both ranges)
      ['[0,20)[80,110]', '25', false],
      // Range is [0,20) or [80,110], result is 10 (inside first range)
      ['[0,20)[80,110]', '10', true],
      // Range is [0,20) or [80,110], result is 85 (inside second range)
      ['[0,20)[80,110]', '85', true],
      // Range is [0,20) or [80,110], result is 0 (on the lower boundary of first range)
      ['[0,20)[80,110]', '0', true],
      // Range is [0,20) or [80,110], result is 20
      // (on the upper boundary of first range but note include since it has a ) operator
      ['[0,20)[80,110]', '20', false],
      // Range is [0,20) or [80,110], result is 80 (on the lower boundary of second range)
      ['[0,20)[80,110]', '80', true],
      // Range is [0,20) or [80,110], result is 110 (on the upper boundary of second range)
      ['[0,20)[80,110]', '110', true],
      // Range is [0,20) or [80,110], result is 50 (between the two ranges)
      ['[0,20)[80,110]', '50', false],
    ])('range %s, result %s should return %p', (range, result, expected) => {
      expect(isCriticalResult(range, result)).toBe(expected);
    });
  });
});

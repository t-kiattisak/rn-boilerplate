const collectTestIdValues = (value: unknown): string[] => {
  if (typeof value === 'string') {
    return [value];
  }

  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectTestIdValues);
  }

  return [];
};

describe('device.constant', () => {
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('derives platform flags from Platform.OS on ios', () => {
    jest.doMock('react-native', () => ({
      Dimensions: {
        get: jest.fn(() => ({ height: 844, width: 390 })),
      },
      Platform: { OS: 'ios' },
    }));

    const device = require('@/shared/constants/device.constant');

    expect(device.platformOS).toBe('ios');
    expect(device.isIos).toBe(true);
    expect(device.isAndroid).toBe(false);
    expect(device.screenWidth).toBe(390);
    expect(device.screenHeight).toBe(844);
    expect(typeof device.isDev).toBe('boolean');
  });

  it('derives platform flags from Platform.OS on android', () => {
    jest.doMock('react-native', () => ({
      Dimensions: {
        get: jest.fn(() => ({ height: 800, width: 360 })),
      },
      Platform: { OS: 'android' },
    }));

    const device = require('@/shared/constants/device.constant');

    expect(device.platformOS).toBe('android');
    expect(device.isIos).toBe(false);
    expect(device.isAndroid).toBe(true);
    expect(device.screenWidth).toBe(360);
    expect(device.screenHeight).toBe(800);
  });
});

describe('testIdsConstant', () => {
  it('uses unique kebab-case test id values', () => {
    const { testIdsConstant } = require('@/shared/constants/testIds.constant');
    const values = collectTestIdValues(testIdsConstant);
    const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    expect(values.length).toBeGreaterThan(0);
    expect(new Set(values).size).toBe(values.length);

    const legacyIds = new Set(['fastImage']);

    for (const testId of values) {
      if (legacyIds.has(testId)) {
        continue;
      }

      expect(testId).toMatch(kebabCasePattern);
    }
  });

  it('keeps known component test ids stable', () => {
    const { testIdsConstant } = require('@/shared/constants/testIds.constant');

    expect(testIdsConstant.button).toBe('base-button');
    expect(testIdsConstant.alertDialog.content).toBe('alert-dialog-content');
    expect(testIdsConstant.form.inputField).toBe('form-input-field');
  });
});

import engineer from '.';

describe('engineer', () => {
  test('should contain build', () => {
    expect(engineer).toHaveProperty('build');
  });
});

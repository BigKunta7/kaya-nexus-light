import { hashPassword, encryptData, checkPermission } from './index';

describe('Security module', () => {
  it('hashPassword retourne un hash', () => {
    const hash = hashPassword('motdepasse');
    expect(typeof hash).toBe('string');
    expect(hash).not.toBe('motdepasse');
  });
  it('encryptData retourne une string chiffrée', () => {
    const encrypted = encryptData('secret');
    expect(typeof encrypted).toBe('string');
    expect(encrypted).not.toBe('secret');
  });
  it('checkPermission admin', () => {
    expect(checkPermission({ role: 'admin' }, 'delete')).toBe(true);
    expect(checkPermission({ role: 'user' }, 'delete')).toBe(false);
  });
});

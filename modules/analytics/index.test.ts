import { trackEvent, generateReport } from './index';

describe('Analytics module', () => {
  it('trackEvent renvoie un objet tracké', () => {
    const result = trackEvent('login', { user: 'user1' });
    expect(result).toHaveProperty('event', 'login');
    expect(result).toHaveProperty('user', 'user1');
  });
  it('generateReport renvoie un rapport', () => {
    const result = generateReport('usage', { month: 'avril' });
    expect(result).toHaveProperty('type', 'usage');
    expect(result.params).toHaveProperty('month', 'avril');
  });
});

import { Session } from 'next-auth';
import { getIfUserIsAuthenticated } from './auth';

describe('Auth Utils', () => {
  describe('getIfUserIsAuthenticated', () => {
    it('Should return false if has no session', () => {
      expect(getIfUserIsAuthenticated(null)).toBe(false);
    });
    it('Should return true if user exist in session', () => {
      const mockedUser = {
        id: '0001',
        name: 'Mocked User Name',
      };
      const mockedSession = {
        user: mockedUser,
        expires: '',
      };
      expect(getIfUserIsAuthenticated(mockedSession)).toBe(true);
    });
    it('Should return false if session is an empty object', () => {
      const mockedSession = {};
      expect(getIfUserIsAuthenticated(mockedSession as Session)).toBe(false);
    });
  });
});

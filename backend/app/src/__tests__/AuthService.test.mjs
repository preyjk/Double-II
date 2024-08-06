import AuthService from '../service/AuthService.mjs';
import User from '../dal/User.mjs';

jest.mock('../dal/User.mjs');

describe('AuthService', () => {
  const mockUser = {
    username: 'testuser',
    password: 'testpassword',
  };

  describe('signup', () => {
    it('should return success message when user is created', async () => {
      User.create.mockResolvedValue();
      const result = await AuthService.signup(mockUser);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Signup successful');
    });

    it('should return error message when user already exists', async () => {
      User.create.mockRejectedValue({ name: 'ConditionalCheckFailedException' });
      const result = await AuthService.signup(mockUser);
      expect(result.success).toBe(false);
      expect(result.message).toBe('User already exists');
    });

    it('should throw an error on other exceptions', async () => {
      User.create.mockRejectedValue(new Error('Some error'));
      await expect(AuthService.signup(mockUser)).rejects.toThrow('Some error');
    });
  });

  describe('login', () => {
    it('should return a token when login is successful', async () => {
      const hashedPassword = AuthService.hashPassword(mockUser.password);
      User.findByUsername.mockResolvedValue({ Item: { username: mockUser.username, password: hashedPassword } });
      const result = await AuthService.login(mockUser);
      expect(result.success).toBe(true);
      expect(result).toHaveProperty('token');
    });

    it('should return unauthorized message when login fails', async () => {
      User.findByUsername.mockResolvedValue({ Item: { username: mockUser.username, password: 'wrongpassword' } });
      const result = await AuthService.login(mockUser);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });

    it('should throw an error on other exceptions', async () => {
      User.findByUsername.mockRejectedValue(new Error('Some error'));
      await expect(AuthService.login(mockUser)).rejects.toThrow('Some error');
    });
  });
});

import { User } from './user';

describe('User', () => {
  it('should create an instance with parameters', () => {
    expect(new User('shoppingUserId', 'Shopping User', 'shopping@gorilla.com', '50688776655', 'TBD')).toBeTruthy();
  });

  it('should create an instance with no parameters', () => {
    expect(new User('shoppingUserId', null, null)).toBeTruthy();
  });
});

export interface UserInterface {
  createUser(user: User): void;
  deleteUser(userId: number): void;
  updateUser(user: User): void;
  getUser(userId: number): User | undefined;
}

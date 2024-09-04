export class User {
  id: number;
  email: string;
  name?: string;

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name || '';
  }

  updateProfile(data: { name?: string, email?: string }) {
    if (data.name) {
      this.name = data.name;
    }
    if (data.email) {
      this.email = data.email;
    }
  }
}

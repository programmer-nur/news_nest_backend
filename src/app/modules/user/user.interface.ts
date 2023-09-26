export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'user' | 'admin';
  bookmarks?: [];
  notes?: [];
}

export interface ILogin {
  email: string;
  password: string;
}

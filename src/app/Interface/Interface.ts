export interface signupDto {
    userName: string;
    email: string;
    password: string;
    role?: string;
}
export interface LoginDto {
  userNameOrEmail: string;
  password: string;
  
}
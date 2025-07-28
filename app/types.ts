// User types
export type User = {
  id: string;
  name: string;
  xp: number;
  rewards: number;
  token: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  addXP: (amount: number) => void;
  addReward: (amount: number) => void;
};

// API types
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = User; // If login returns the full user object

export type ExampleResponse = {
  message: string;
  data: any;
}; 
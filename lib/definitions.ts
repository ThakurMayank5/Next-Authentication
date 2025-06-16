export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  team?: string;
};

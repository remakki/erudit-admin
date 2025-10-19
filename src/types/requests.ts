export type StatusRequest = 'new' | 'viewed' | 'processed';
export type TypeRequest = 'consultation' | 'partnership' | 'event_game_order';

export interface Request {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  type: TypeRequest | null;
  status: StatusRequest;
  created_at: string;
}

export interface RequestPartialUpdate {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  type?: TypeRequest | null;
  status?: StatusRequest | null;
}

export interface RequestList {
  requests: Request[];
}

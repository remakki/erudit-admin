export interface Application {
  id: number;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  team_name: string;
  team_participants_number: number;
  created_at: string;
  updated_at: string;
  event_id: number;
}

export interface ApplicationCreate {
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  team_name: string;
  team_participants_number: number;
  event_id: number;
}

export interface ApplicationList {
  applications: Application[];
}

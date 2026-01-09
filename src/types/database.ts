// Supabase Database Types
// This file should be generated using: npx supabase gen types typescript --project-id YOUR_PROJECT_ID

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      games: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          date: string;
          location: string;
          max_players: number;
          price_per_player: number;
          organizer_id: string;
          status: 'active' | 'cancelled' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          date: string;
          location: string;
          max_players: number;
          price_per_player: number;
          organizer_id: string;
          status?: 'active' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          date?: string;
          location?: string;
          max_players?: number;
          price_per_player?: number;
          organizer_id?: string;
          status?: 'active' | 'cancelled' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
      };
      game_participants: {
        Row: {
          id: string;
          game_id: string;
          user_id: string;
          status: 'confirmed' | 'pending' | 'cancelled';
          payment_status: 'pending' | 'paid' | 'refunded';
          joined_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          user_id: string;
          status?: 'confirmed' | 'pending' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'refunded';
          joined_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          user_id?: string;
          status?: 'confirmed' | 'pending' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'refunded';
          joined_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
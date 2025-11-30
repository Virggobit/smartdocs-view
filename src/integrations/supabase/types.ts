export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cooperative_terms: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          signature_hash: string | null
          signature_metadata: Json | null
          signed_at: string | null
          status: string
          term_content: string
          term_version: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          signature_hash?: string | null
          signature_metadata?: Json | null
          signed_at?: string | null
          status?: string
          term_content: string
          term_version?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          signature_hash?: string | null
          signature_metadata?: Json | null
          signed_at?: string | null
          status?: string
          term_content?: string
          term_version?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_analysis: {
        Row: {
          analysis_data: Json | null
          approved_amount: number | null
          created_at: string | null
          id: string
          interest_rate: number | null
          score: number | null
          status: Database["public"]["Enums"]["credit_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_data?: Json | null
          approved_amount?: number | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          score?: number | null
          status?: Database["public"]["Enums"]["credit_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_data?: Json | null
          approved_amount?: number | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          score?: number | null
          status?: Database["public"]["Enums"]["credit_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      energy_bills: {
        Row: {
          average_consumption: number | null
          average_payment: number | null
          created_at: string | null
          extracted_data: Json | null
          file_url: string | null
          id: string
          on_time_payments: number | null
          payment_history_months: number | null
          status: Database["public"]["Enums"]["bill_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          average_consumption?: number | null
          average_payment?: number | null
          created_at?: string | null
          extracted_data?: Json | null
          file_url?: string | null
          id?: string
          on_time_payments?: number | null
          payment_history_months?: number | null
          status?: Database["public"]["Enums"]["bill_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          average_consumption?: number | null
          average_payment?: number | null
          created_at?: string | null
          extracted_data?: Json | null
          file_url?: string | null
          id?: string
          on_time_payments?: number | null
          payment_history_months?: number | null
          status?: Database["public"]["Enums"]["bill_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      energy_tokens: {
        Row: {
          amount_kwh: number
          created_at: string
          created_by: string
          farm_id: string
          farm_name: string
          id: string
          metadata: Json | null
          price_per_kwh: number
          status: string
          token_id: string
          total_value: number | null
        }
        Insert: {
          amount_kwh: number
          created_at?: string
          created_by: string
          farm_id: string
          farm_name: string
          id?: string
          metadata?: Json | null
          price_per_kwh: number
          status?: string
          token_id: string
          total_value?: number | null
        }
        Update: {
          amount_kwh?: number
          created_at?: string
          created_by?: string
          farm_id?: string
          farm_name?: string
          id?: string
          metadata?: Json | null
          price_per_kwh?: number
          status?: string
          token_id?: string
          total_value?: number | null
        }
        Relationships: []
      }
      open_finance_connections: {
        Row: {
          bank_code: string
          connected_at: string | null
          connection_status: string | null
          consent_id: string | null
          created_at: string | null
          expires_at: string | null
          financial_data: Json | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bank_code: string
          connected_at?: string | null
          connection_status?: string | null
          consent_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          financial_data?: Json | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bank_code?: string
          connected_at?: string | null
          connection_status?: string | null
          consent_id?: string | null
          created_at?: string | null
          expires_at?: string | null
          financial_data?: Json | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          metadata: Json | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          metadata?: Json | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          metadata?: Json | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      token_transactions: {
        Row: {
          amount_kwh: number
          block_timestamp: string
          from_user_id: string | null
          id: string
          metadata: Json | null
          status: string
          to_user_id: string
          token_id: string
          transaction_hash: string
          transaction_type: string
        }
        Insert: {
          amount_kwh: number
          block_timestamp?: string
          from_user_id?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          to_user_id: string
          token_id: string
          transaction_hash: string
          transaction_type: string
        }
        Update: {
          amount_kwh?: number
          block_timestamp?: string
          from_user_id?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          to_user_id?: string
          token_id?: string
          transaction_hash?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "energy_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_transaction_hash: { Args: never; Returns: string }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "cliente_gero"
        | "cliente_assino"
        | "instalador"
        | "admin_banco"
        | "gestor_cooperativa"
        | "parceiro_financeiro"
        | "gestor_distribuicao"
      bill_status: "pending_upload" | "processing" | "validated" | "invalid"
      credit_status:
        | "pending"
        | "analyzing"
        | "approved"
        | "rejected"
        | "requires_more_info"
      trilha_type:
        | "eu_gero"
        | "eu_assino"
        | "eu_instalo"
        | "eu_financio"
        | "eu_distribuo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "cliente_gero",
        "cliente_assino",
        "instalador",
        "admin_banco",
        "gestor_cooperativa",
        "parceiro_financeiro",
        "gestor_distribuicao",
      ],
      bill_status: ["pending_upload", "processing", "validated", "invalid"],
      credit_status: [
        "pending",
        "analyzing",
        "approved",
        "rejected",
        "requires_more_info",
      ],
      trilha_type: [
        "eu_gero",
        "eu_assino",
        "eu_instalo",
        "eu_financio",
        "eu_distribuo",
      ],
    },
  },
} as const

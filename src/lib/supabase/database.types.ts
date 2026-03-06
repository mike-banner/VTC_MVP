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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      booking_shares: {
        Row: {
          accepted_at: string | null
          accepted_by_tenant_id: string | null
          booking_id: string
          id: string
          shared_at: string | null
          shared_by_tenant_id: string
          status: Database["public"]["Enums"]["share_status"]
        }
        Insert: {
          accepted_at?: string | null
          accepted_by_tenant_id?: string | null
          booking_id: string
          id?: string
          shared_at?: string | null
          shared_by_tenant_id: string
          status?: Database["public"]["Enums"]["share_status"]
        }
        Update: {
          accepted_at?: string | null
          accepted_by_tenant_id?: string | null
          booking_id?: string
          id?: string
          shared_at?: string | null
          shared_by_tenant_id?: string
          status?: Database["public"]["Enums"]["share_status"]
        }
        Relationships: [
          {
            foreignKeyName: "booking_shares_accepted_by_tenant_id_fkey"
            columns: ["accepted_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_accepted_by_tenant_id_fkey"
            columns: ["accepted_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_accepted_by_tenant_id_fkey"
            columns: ["accepted_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_accepted_by_tenant_id_fkey"
            columns: ["accepted_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_shares_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "booking_shares_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_shares_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings_stuck_pending_refund"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_shares_shared_by_tenant_id_fkey"
            columns: ["shared_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_shared_by_tenant_id_fkey"
            columns: ["shared_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_shared_by_tenant_id_fkey"
            columns: ["shared_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "booking_shares_shared_by_tenant_id_fkey"
            columns: ["shared_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_status_transitions: {
        Row: {
          from_status: Database["public"]["Enums"]["booking_status"]
          to_status: Database["public"]["Enums"]["booking_status"]
        }
        Insert: {
          from_status: Database["public"]["Enums"]["booking_status"]
          to_status: Database["public"]["Enums"]["booking_status"]
        }
        Update: {
          from_status?: Database["public"]["Enums"]["booking_status"]
          to_status?: Database["public"]["Enums"]["booking_status"]
        }
        Relationships: []
      }
      bookings: {
        Row: {
          cancellation_initiator: string | null
          cancellation_policy_id: string | null
          cancellation_reason:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at: string | null
          created_at: string
          current_tenant_id: string
          customer_id: string
          distance_km: number | null
          driver_id: string | null
          dropoff_address: string
          id: string
          original_tenant_id: string
          passenger_count: number
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          pickup_address: string
          pickup_time: string
          status: Database["public"]["Enums"]["booking_status"]
          stripe_payment_intent_id: string | null
          subtotal_amount: number
          total_amount: number
          vat_amount: number
        }
        Insert: {
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string
          current_tenant_id: string
          customer_id: string
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address: string
          id?: string
          original_tenant_id: string
          passenger_count?: number
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          pickup_address: string
          pickup_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          stripe_payment_intent_id?: string | null
          subtotal_amount: number
          total_amount: number
          vat_amount?: number
        }
        Update: {
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string
          current_tenant_id?: string
          customer_id?: string
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address?: string
          id?: string
          original_tenant_id?: string
          passenger_count?: number
          payment_mode?: Database["public"]["Enums"]["payment_mode"]
          pickup_address?: string
          pickup_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          stripe_payment_intent_id?: string | null
          subtotal_amount?: number
          total_amount?: number
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cancellation_policies: {
        Row: {
          active: boolean
          created_at: string
          driver_fault_refund_rate: number
          hours_before_full_refund: number
          hours_before_partial_refund: number
          id: string
          no_show_refund_rate: number
          partial_refund_rate: number
          platform_fee_non_refundable: boolean
          tenant_id: string | null
          version: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          driver_fault_refund_rate: number
          hours_before_full_refund: number
          hours_before_partial_refund: number
          id?: string
          no_show_refund_rate: number
          partial_refund_rate: number
          platform_fee_non_refundable?: boolean
          tenant_id?: string | null
          version: number
        }
        Update: {
          active?: boolean
          created_at?: string
          driver_fault_refund_rate?: number
          hours_before_full_refund?: number
          hours_before_partial_refund?: number
          id?: string
          no_show_refund_rate?: number
          partial_refund_rate?: number
          platform_fee_non_refundable?: boolean
          tenant_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "cancellation_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "cancellation_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "cancellation_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "cancellation_policies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      circle_memberships: {
        Row: {
          circle_id: string
          id: string
          joined_at: string | null
          role: string
          status: string
          tenant_id: string
        }
        Insert: {
          circle_id: string
          id?: string
          joined_at?: string | null
          role: string
          status: string
          tenant_id: string
        }
        Update: {
          circle_id?: string
          id?: string
          joined_at?: string | null
          role?: string
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circle_memberships_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "circle_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "circle_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "circle_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "circle_memberships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      circles: {
        Row: {
          created_at: string | null
          created_by_tenant_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by_tenant_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          created_by_tenant_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "circles_created_by_tenant_id_fkey"
            columns: ["created_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "circles_created_by_tenant_id_fkey"
            columns: ["created_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "circles_created_by_tenant_id_fkey"
            columns: ["created_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "circles_created_by_tenant_id_fkey"
            columns: ["created_by_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string | null
          phone: string | null
          postal_code: string | null
          tenant_id: string
          type: Database["public"]["Enums"]["customer_type_enum"]
          vat_number: string | null
        }
        Insert: {
          billing_address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          tenant_id: string
          type?: Database["public"]["Enums"]["customer_type_enum"]
          vat_number?: string | null
        }
        Update: {
          billing_address?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string | null
          phone?: string | null
          postal_code?: string | null
          tenant_id?: string
          type?: Database["public"]["Enums"]["customer_type_enum"]
          vat_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          license_number: string
          phone: string
          tenant_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          license_number: string
          phone: string
          tenant_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          license_number?: string
          phone?: string
          tenant_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drivers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "drivers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "drivers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "drivers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drivers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_movements: {
        Row: {
          booking_id: string
          created_at: string
          created_by_event: string | null
          direction: Database["public"]["Enums"]["movement_direction_enum"]
          driver_commission_amount: number | null
          driver_commission_rate_snapshot: number | null
          gross_amount: number
          id: string
          movement_type: Database["public"]["Enums"]["movement_type_enum"]
          net_amount: number
          platform_commission_amount: number | null
          platform_commission_rate_snapshot: number | null
          refund_ratio: number | null
          stripe_payment_intent_id: string | null
          stripe_refund_id: string | null
          tenant_id: string
          vat_amount: number | null
        }
        Insert: {
          booking_id: string
          created_at?: string
          created_by_event?: string | null
          direction: Database["public"]["Enums"]["movement_direction_enum"]
          driver_commission_amount?: number | null
          driver_commission_rate_snapshot?: number | null
          gross_amount: number
          id?: string
          movement_type: Database["public"]["Enums"]["movement_type_enum"]
          net_amount: number
          platform_commission_amount?: number | null
          platform_commission_rate_snapshot?: number | null
          refund_ratio?: number | null
          stripe_payment_intent_id?: string | null
          stripe_refund_id?: string | null
          tenant_id: string
          vat_amount?: number | null
        }
        Update: {
          booking_id?: string
          created_at?: string
          created_by_event?: string | null
          direction?: Database["public"]["Enums"]["movement_direction_enum"]
          driver_commission_amount?: number | null
          driver_commission_rate_snapshot?: number | null
          gross_amount?: number
          id?: string
          movement_type?: Database["public"]["Enums"]["movement_type_enum"]
          net_amount?: number
          platform_commission_amount?: number | null
          platform_commission_rate_snapshot?: number | null
          refund_ratio?: number | null
          stripe_payment_intent_id?: string | null
          stripe_refund_id?: string | null
          tenant_id?: string
          vat_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_movements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "financial_movements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_movements_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings_stuck_pending_refund"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding: {
        Row: {
          capacity: number
          company_name: string
          created_at: string | null
          default_base_price: number
          default_minimum_fare: number
          default_price_per_km: number
          first_name: string
          id: string
          last_name: string
          phone: string
          plate_number: string | null
          primary_domain: string
          profile_id: string
          service_categories: string[]
          status: Database["public"]["Enums"]["onboarding_status"]
          validated_at: string | null
          vehicle_brand: string | null
          vehicle_model: string | null
          vtc_license_number: string
        }
        Insert: {
          capacity: number
          company_name: string
          created_at?: string | null
          default_base_price: number
          default_minimum_fare: number
          default_price_per_km: number
          first_name: string
          id?: string
          last_name: string
          phone: string
          plate_number?: string | null
          primary_domain: string
          profile_id: string
          service_categories: string[]
          status?: Database["public"]["Enums"]["onboarding_status"]
          validated_at?: string | null
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vtc_license_number: string
        }
        Update: {
          capacity?: number
          company_name?: string
          created_at?: string | null
          default_base_price?: number
          default_minimum_fare?: number
          default_price_per_km?: number
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          plate_number?: string | null
          primary_domain?: string
          profile_id?: string
          service_categories?: string[]
          status?: Database["public"]["Enums"]["onboarding_status"]
          validated_at?: string | null
          vehicle_brand?: string | null
          vehicle_model?: string | null
          vtc_license_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      passengers: {
        Row: {
          booking_id: string
          created_at: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
        }
        Insert: {
          booking_id: string
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
        }
        Update: {
          booking_id?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings_stuck_pending_refund"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_rules: {
        Row: {
          active: boolean | null
          base_price: number
          created_at: string
          id: string
          minimum_fare: number
          price_per_km: number
          service_category: string
          tenant_id: string
        }
        Insert: {
          active?: boolean | null
          base_price: number
          created_at?: string
          id?: string
          minimum_fare: number
          price_per_km: number
          service_category: string
          tenant_id: string
        }
        Update: {
          active?: boolean | null
          base_price?: number
          created_at?: string
          id?: string
          minimum_fare?: number
          price_per_km?: number
          service_category?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "pricing_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "pricing_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "pricing_rules_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          platform_role: Database["public"]["Enums"]["platform_role"] | null
          tenant_id: string | null
          tenant_role: Database["public"]["Enums"]["tenant_role"] | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          platform_role?: Database["public"]["Enums"]["platform_role"] | null
          tenant_id?: string | null
          tenant_role?: Database["public"]["Enums"]["tenant_role"] | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          platform_role?: Database["public"]["Enums"]["platform_role"] | null
          tenant_id?: string | null
          tenant_role?: Database["public"]["Enums"]["tenant_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_events: {
        Row: {
          event_type: string
          id: string
          received_at: string | null
          stripe_event_id: string
        }
        Insert: {
          event_type: string
          id?: string
          received_at?: string | null
          stripe_event_id: string
        }
        Update: {
          event_type?: string
          id?: string
          received_at?: string | null
          stripe_event_id?: string
        }
        Relationships: []
      }
      stripe_webhook_logs: {
        Row: {
          error_message: string | null
          event_type: string
          id: string
          payload: Json
          processed_at: string | null
          received_at: string
          status: string
          stripe_event_id: string
        }
        Insert: {
          error_message?: string | null
          event_type: string
          id?: string
          payload: Json
          processed_at?: string | null
          received_at?: string
          status?: string
          stripe_event_id: string
        }
        Update: {
          error_message?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          received_at?: string
          status?: string
          stripe_event_id?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          created_at: string | null
          id: string
          name: string
          platform_fee_rate: number | null
          primary_domain: string
          share_fee_rate: number | null
          stripe_account_id: string | null
          vat_rate: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          platform_fee_rate?: number | null
          primary_domain: string
          share_fee_rate?: number | null
          stripe_account_id?: string | null
          vat_rate?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          platform_fee_rate?: number | null
          primary_domain?: string
          share_fee_rate?: number | null
          stripe_account_id?: string | null
          vat_rate?: number | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string
          capacity: number | null
          category: string | null
          created_at: string | null
          driver_id: string | null
          id: string
          model: string
          plate_number: string
          tenant_id: string
        }
        Insert: {
          brand: string
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          driver_id?: string | null
          id?: string
          model: string
          plate_number: string
          tenant_id: string
        }
        Update: {
          brand?: string
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          driver_id?: string | null
          id?: string
          model?: string
          plate_number?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "vehicles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "vehicles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "vehicles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      admin_bookings_full_view: {
        Row: {
          booking_id: string | null
          created_at: string | null
          current_tenant_domain: string | null
          current_tenant_id: string | null
          current_tenant_name: string | null
          customer_email: string | null
          customer_first_name: string | null
          customer_full_name: string | null
          customer_id: string | null
          customer_last_name: string | null
          customer_phone: string | null
          driver_first_name: string | null
          driver_id: string | null
          driver_last_name: string | null
          driver_phone: string | null
          dropoff_address: string | null
          original_tenant_domain: string | null
          original_tenant_id: string | null
          original_tenant_name: string | null
          payment_mode: Database["public"]["Enums"]["payment_mode"] | null
          pickup_address: string | null
          pickup_time: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number | null
          total_collected: number | null
        }
        Relationships: []
      }
      admin_monthly_summary: {
        Row: {
          month: string | null
          net_revenue: number | null
        }
        Relationships: []
      }
      admin_tenants_overview: {
        Row: {
          avg_commission_rate: number | null
          joined_at: string | null
          primary_domain: string | null
          tenant_id: string | null
          tenant_name: string | null
          total_bookings: number | null
          total_gross_revenue: number | null
          total_net_revenue: number | null
        }
        Relationships: []
      }
      bookings_stuck_pending_refund: {
        Row: {
          cancellation_initiator: string | null
          cancellation_policy_id: string | null
          cancellation_reason:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at: string | null
          created_at: string | null
          current_tenant_id: string | null
          customer_id: string | null
          distance_km: number | null
          driver_id: string | null
          dropoff_address: string | null
          id: string | null
          original_tenant_id: string | null
          passenger_count: number | null
          payment_mode: Database["public"]["Enums"]["payment_mode"] | null
          pickup_address: string | null
          pickup_time: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id: string | null
          subtotal_amount: number | null
          total_amount: number | null
          vat_amount: number | null
        }
        Insert: {
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string | null
          current_tenant_id?: string | null
          customer_id?: string | null
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address?: string | null
          id?: string | null
          original_tenant_id?: string | null
          passenger_count?: number | null
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          pickup_address?: string | null
          pickup_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id?: string | null
          subtotal_amount?: number | null
          total_amount?: number | null
          vat_amount?: number | null
        }
        Update: {
          cancellation_initiator?: string | null
          cancellation_policy_id?: string | null
          cancellation_reason?:
            | Database["public"]["Enums"]["cancellation_reason_enum"]
            | null
          cancelled_at?: string | null
          created_at?: string | null
          current_tenant_id?: string | null
          customer_id?: string | null
          distance_km?: number | null
          driver_id?: string | null
          dropoff_address?: string | null
          id?: string | null
          original_tenant_id?: string | null
          passenger_count?: number | null
          payment_mode?: Database["public"]["Enums"]["payment_mode"] | null
          pickup_address?: string | null
          pickup_time?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          stripe_payment_intent_id?: string | null
          subtotal_amount?: number | null
          total_amount?: number | null
          vat_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "cancellation_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_current_tenant_id_fkey"
            columns: ["current_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["driver_id"]
          },
          {
            foreignKeyName: "bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "bookings_original_tenant_id_fkey"
            columns: ["original_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_webhook_errors: {
        Row: {
          error_message: string | null
          event_type: string | null
          id: string | null
          payload: Json | null
          processed_at: string | null
          received_at: string | null
          status: string | null
          stripe_event_id: string | null
        }
        Insert: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Update: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Relationships: []
      }
      stripe_webhook_pending: {
        Row: {
          error_message: string | null
          event_type: string | null
          id: string | null
          payload: Json | null
          processed_at: string | null
          received_at: string | null
          status: string | null
          stripe_event_id: string | null
        }
        Insert: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Update: {
          error_message?: string | null
          event_type?: string | null
          id?: string | null
          payload?: Json | null
          processed_at?: string | null
          received_at?: string | null
          status?: string | null
          stripe_event_id?: string | null
        }
        Relationships: []
      }
      tenant_dashboard_kpi: {
        Row: {
          monthly_net_revenue: number | null
          tenant_id: string | null
          total_bookings: number | null
          total_gross_revenue: number | null
          total_net_revenue: number | null
          total_refunded_gross: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["current_tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_bookings_full_view"
            referencedColumns: ["original_tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "admin_tenants_overview"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "financial_movements_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      approve_onboarding_tx: {
        Args: { onboarding_uuid: string }
        Returns: undefined
      }
      compute_booking_balance: {
        Args: { p_booking_id: string }
        Returns: number
      }
      current_tenant_id: { Args: never; Returns: string }
      expire_unpaid_bookings: { Args: never; Returns: undefined }
      initiate_refund: {
        Args: { p_booking_id: string; p_reason: string }
        Returns: {
          payment_intent_id: string
          refund_allowed: boolean
        }[]
      }
    }
    Enums: {
      booking_status:
        | "pending"
        | "accepted"
        | "completed"
        | "cancelled"
        | "accepted_pending_payment"
        | "paid"
        | "deprecated_refunded"
        | "cancelled_pending_refund"
        | "cancelled_no_refund"
        | "cancelled_refunded"
        | "no_show"
        | "expired_payment"
        | "refund_failed"
      cancellation_reason_enum:
        | "client"
        | "no_show"
        | "driver_fault"
        | "platform_issue"
      customer_type_enum: "individual" | "company"
      movement_direction_enum: "credit" | "debit"
      movement_type_enum:
        | "payment"
        | "commission"
        | "refund"
        | "commission_reversal"
      onboarding_status: "pending" | "approved" | "rejected" | "processed"
      payment_mode: "card" | "cash"
      platform_role: "super_admin" | "platform_staff"
      share_status: "pending" | "accepted" | "rejected"
      tenant_role: "owner" | "manager" | "driver"
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
      booking_status: [
        "pending",
        "accepted",
        "completed",
        "cancelled",
        "accepted_pending_payment",
        "paid",
        "deprecated_refunded",
        "cancelled_pending_refund",
        "cancelled_no_refund",
        "cancelled_refunded",
        "no_show",
        "expired_payment",
        "refund_failed",
      ],
      cancellation_reason_enum: [
        "client",
        "no_show",
        "driver_fault",
        "platform_issue",
      ],
      customer_type_enum: ["individual", "company"],
      movement_direction_enum: ["credit", "debit"],
      movement_type_enum: [
        "payment",
        "commission",
        "refund",
        "commission_reversal",
      ],
      onboarding_status: ["pending", "approved", "rejected", "processed"],
      payment_mode: ["card", "cash"],
      platform_role: ["super_admin", "platform_staff"],
      share_status: ["pending", "accepted", "rejected"],
      tenant_role: ["owner", "manager", "driver"],
    },
  },
} as const

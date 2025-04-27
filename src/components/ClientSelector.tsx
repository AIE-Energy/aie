
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ClientSelectorProps {
  onClientSelect: (clientId: string, clientEmail: string) => void;
  selectedClientId?: string;
}

interface Client {
  id: string;
  email: string;
}

// Define the User type that matches Supabase auth user structure
interface User {
  id: string;
  email: string | null;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  aud: string;
  created_at: string;
}

// Define the AdminUsers response structure
interface AdminUsersResponse {
  users: User[];
  total: number;
  next_page_token?: string;
}

const ClientSelector = ({ onClientSelect, selectedClientId }: ClientSelectorProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // First get user IDs with 'client' role
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'client');

        if (rolesError) throw rolesError;
        if (!userRoles?.length) {
          setClients([]);
          setLoading(false);
          return;
        }

        // Get user details for each client
        const userIds = userRoles.map(role => role.user_id);
        
        // Instead of using admin.listUsers which requires admin privileges,
        // let's fetch from user_roles and get emails from a profiles table
        // This is a workaround since we can't access auth.users directly from client
        const { data: userProfiles, error: profilesError } = await supabase
          .from('user_roles')
          .select('user_id, users:user_id(email)')
          .in('user_id', userIds)
          .eq('role', 'client');

        if (profilesError) {
          console.error("Error fetching client profiles:", profilesError);
          toast.error("Failed to fetch client profiles");
          setLoading(false);
          return;
        }

        // Map the user profiles to Client objects
        const clientUsers = userProfiles.map(profile => ({
          id: profile.user_id,
          email: profile.users?.email || 'Unknown email'
        }));

        setClients(clientUsers);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find(client => client.id === clientId);
    if (selectedClient) {
      onClientSelect(clientId, selectedClient.email);
    }
  };

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (clients.length === 0) {
    return <div>No clients found</div>;
  }

  return (
    <div className="flex w-full gap-2 items-center">
      <div className="flex-1">
        <Select
          value={selectedClientId}
          onValueChange={handleClientChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ClientSelector;

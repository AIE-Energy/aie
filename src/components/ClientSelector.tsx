
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
        
        // Since we can't access auth.users directly from client-side,
        // we need to fetch user emails separately through auth session or API
        // For now, we'll use a simplified approach by fetching the auth data via service
        const clientList: Client[] = [];
        
        // Process each client ID separately to get their email
        for (const userId of userIds) {
          try {
            const { data: userData, error: authError } = await supabase.auth.admin.getUserById(userId);
            
            if (!authError && userData?.user?.email) {
              clientList.push({
                id: userId,
                email: userData.user.email
              });
            }
          } catch (error) {
            console.error(`Error fetching details for user ${userId}:`, error);
          }
        }

        setClients(clientList);
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

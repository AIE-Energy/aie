
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

        const clientsList: Client[] = [];
        
        // For each user ID, we need to fetch their email
        for (const roleData of userRoles) {
          try {
            const { data: userData, error: userError } = await supabase
              .from('profiles')
              .select('email')
              .eq('id', roleData.user_id)
              .single();
            
            if (!userError && userData && userData.email) {
              clientsList.push({
                id: roleData.user_id,
                email: userData.email
              });
            } else {
              console.log(`No profile found for user ID: ${roleData.user_id}`);
            }
          } catch (error) {
            console.error(`Error fetching profile for user ${roleData.user_id}:`, error);
          }
        }

        setClients(clientsList);
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

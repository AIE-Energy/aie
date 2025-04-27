
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
        
        const { data: userData, error: userError } = await supabase.auth.admin.listUsers({
          perPage: 100
        });

        if (userError) {
          console.error("Error fetching user details:", userError);
          toast.error("Failed to fetch client details");
          setLoading(false);
          return;
        }

        // Filter and map the users that have client role
        const clientUsers = userData.users
          .filter(user => userIds.includes(user.id))
          .map(user => ({
            id: user.id,
            email: user.email || 'Unknown email'
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

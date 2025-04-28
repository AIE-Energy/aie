
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ClientSelectorProps {
  onClientSelect: (clientId: string, clientEmail: string) => void;
  selectedClientId?: string;
}

interface Client {
  id: string;
  email: string;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({ onClientSelect, selectedClientId }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('role', 'client');

      if (error) {
        toast.error('Failed to fetch clients');
        console.error('Error fetching clients:', error);
        return;
      }

      setClients(data || []);
    } catch (error) {
      console.error('Error in fetchClients:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = e.target.value;
    if (clientId) {
      const selectedClient = clients.find(client => client.id === clientId);
      if (selectedClient) {
        onClientSelect(selectedClient.id, selectedClient.email);
      }
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="client-select" className="block text-sm font-medium mb-1">
        Select Client
      </label>
      <select
        id="client-select"
        value={selectedClientId || ''}
        onChange={handleClientChange}
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        disabled={loading}
      >
        <option value="">All Clients</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.email}
          </option>
        ))}
      </select>
      {loading && <p className="text-sm text-gray-500 mt-1">Loading clients...</p>}
      {!loading && clients.length === 0 && (
        <p className="text-sm text-gray-500 mt-1">No clients found</p>
      )}
    </div>
  );
};

export default ClientSelector;

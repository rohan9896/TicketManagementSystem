import axios from "axios";
import { useEffect, useState } from "react";
import { TicketList } from "../components/TicketList";
import Layout from "./Layout";

const TicketListView = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const response = await axios.get("http://localhost:3000/tickets");
    setTickets(response.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Layout>
      <TicketList
        ticketList={tickets}
        onTicketCreated={fetchTickets}
        onTicketUpdated={fetchTickets}
      />
    </Layout>
  );
};

export { TicketListView };

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Avatar,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
  Badge,
  Select,
  Button,
} from "@chakra-ui/react";
import { CommentsList } from "./CommentsList";

interface ITicket {
  id: string;
  title: string;
  ticketId: string;
  assignedUserImage: string;
  status: string;
  assignedUserId: string;
  assignedUserName: string;
  ticket_desc: string;
  due_date: string;
}

interface IUser {
  userId: string;
  username: string;
  userImage: string;
}

interface ITicketDetails {
  id: string;
}

const TicketDetails = (props: ITicketDetails) => {
  const { id } = props;
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingAssignee, setUpdatingAssignee] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketResponse, usersResponse] = await Promise.all([
          axios.get(`http://localhost:3000/tickets/${id}`),
          axios.get("http://localhost:3000/users"),
        ]);

        setTicket(ticketResponse.data);
        setUsers(usersResponse.data);
        setSelectedStatus(ticketResponse.data.status);
        setSelectedAssignee(ticketResponse.data.assignedUserId);
      } catch (err) {
        setError("Failed to fetch ticket details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!ticket || selectedStatus === ticket.status) return;

    setUpdatingStatus(true);
    try {
      await axios.patch(`http://localhost:3000/tickets/${id}`, {
        status: selectedStatus,
      });

      setTicket((prev) => (prev ? { ...prev, status: selectedStatus } : null));
    } catch (err) {
      setError("Failed to update ticket status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAssigneeUpdate = async () => {
    if (!ticket || selectedAssignee === ticket.assignedUserId) return;

    setUpdatingAssignee(true);
    try {
      const selectedUser = users.find(
        (user) => user.userId === selectedAssignee
      );
      if (!selectedUser) return;

      await axios.patch(`http://localhost:3000/tickets/${id}`, {
        assignedUserId: selectedAssignee,
        assignedUserName: selectedUser.username,
        assignedUserImage: selectedUser.userImage,
      });

      setTicket((prev) =>
        prev
          ? {
              ...prev,
              assignedUserId: selectedAssignee,
              assignedUserName: selectedUser.username,
              assignedUserImage: selectedUser.userImage,
            }
          : null
      );
    } catch (err) {
      setError("Failed to update ticket assignee");
    } finally {
      setUpdatingAssignee(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch" h="100%">
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
        >
          <Spinner size="lg" />
        </Box>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {!ticket && !loading && !error && (
        <Alert status="warning">
          <AlertIcon />
          Ticket not found
        </Alert>
      )}
      {ticket && (
        <>
          <VStack spacing={4} align="start" width="100%">
            <VStack spacing={3} align="start" width="100%">
              <HStack justify="space-between" width="100%">
                <Heading size="md">{ticket.title}</Heading>
                <Badge
                  colorScheme={
                    ticket.status === "Open"
                      ? "blue"
                      : ticket.status === "In Progress"
                      ? "orange"
                      : "green"
                  }
                  px={3}
                  py={1}
                >
                  {ticket.status}
                </Badge>
              </HStack>
              <Text fontSize="xs" color="gray.500" fontWeight="600">
                {ticket.ticketId}
              </Text>
            </VStack>

            <Divider />

            <VStack spacing={2} align="start" width="100%">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Description
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                {ticket.ticket_desc}
              </Text>
            </VStack>

            <VStack spacing={3} align="start" width="100%">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Assigned To
              </Text>
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  name={ticket.assignedUserName}
                  src={ticket.assignedUserImage}
                />
                <Text fontSize="sm">{ticket.assignedUserName}</Text>
              </HStack>
            </VStack>

            <VStack spacing={2} align="start" width="100%">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Due Date
              </Text>
              <Text fontSize="sm">{ticket.due_date}</Text>
            </VStack>

            <Divider />

            <VStack spacing={3} align="start" width="100%">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Change Status
              </Text>
              <HStack spacing={3} width="100%">
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  maxW="200px"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </Select>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleStatusUpdate}
                  isLoading={updatingStatus}
                  isDisabled={selectedStatus === ticket.status}
                >
                  Update Status
                </Button>
              </HStack>
            </VStack>

            <VStack spacing={3} align="start" width="100%">
              <Text fontSize="sm" fontWeight="600" color="gray.600">
                Change Assignee
              </Text>
              <HStack spacing={3} width="100%">
                <Select
                  value={selectedAssignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  maxW="200px"
                >
                  {users.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.username}
                    </option>
                  ))}
                </Select>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleAssigneeUpdate}
                  isLoading={updatingAssignee}
                  isDisabled={selectedAssignee === ticket.assignedUserId}
                >
                  Update Assignee
                </Button>
              </HStack>
            </VStack>

            <Divider />

            <Box width="100%">
              <CommentsList ticketId={ticket.ticketId} />
            </Box>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export { TicketDetails };

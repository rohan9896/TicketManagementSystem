import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";

interface IUser {
  userId: string;
  username: string;
  userImage: string;
}

interface ICreateTicketForm {
  title: string;
  ticket_desc: string;
  assignedUserId: string;
  due_date: string;
  status: string;
  assignedUserImage: string;
}

interface ICreateTicketProps {
  onClose?: () => void;
  onTicketCreated?: () => void;
}

const CreateTicket = (props: ICreateTicketProps) => {
  const { onClose, onTicketCreated } = props;
  const [formData, setFormData] = useState<ICreateTicketForm>({
    title: "",
    ticket_desc: "",
    assignedUserId: "",
    due_date: "",
    status: "Open",
    assignedUserImage: "",
  });

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "assignedUserId") {
      const selectedUser = users.find((user) => user.userId === value);
      setFormData((prev) => ({
        ...prev,
        assignedUserId: value,
        assignedUserImage: selectedUser ? selectedUser.userImage : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const ticketId = `TICK-${Date.now()}`;
      const newTicket = {
        ...formData,
        id: ticketId,
        ticketId: ticketId,
      };

      await axios.post("http://localhost:3000/tickets", newTicket);
      setSuccess(true);
      setFormData({
        title: "",
        ticket_desc: "",
        assignedUserId: "",
        due_date: "",
        status: "Open",
        assignedUserImage: "",
      });

      onClose?.();
      onTicketCreated?.();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={6}>
      {success && (
        <Alert status="success" mb={4} borderRadius="md">
          <AlertIcon />
          Ticket created successfully!
        </Alert>
      )}

      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              placeholder="Enter ticket title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="ticket_desc"
              placeholder="Enter ticket description"
              value={formData.ticket_desc}
              onChange={handleChange}
              rows={4}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Assigned User</FormLabel>
            <Select
              name="assignedUserId"
              placeholder="Select a user"
              value={formData.assignedUserId}
              onChange={handleChange}
            >
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.username}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Due Date</FormLabel>
            <Input
              name="due_date"
              type="date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              {/* <option value="Closed">Closed</option> */}
            </Select>
          </FormControl>

          <HStack spacing={4} width="100%" pt={4}>
            <Button colorScheme="blue" type="submit" isLoading={loading}>
              Create Ticket
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setFormData({
                  title: "",
                  ticket_desc: "",
                  assignedUserId: "",
                  due_date: "",
                  status: "Open",
                  assignedUserImage: "",
                })
              }
            >
              Clear
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export { CreateTicket };

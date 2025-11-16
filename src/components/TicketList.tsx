import {
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { TicketCard, type ITicketCardProps } from "./TicketCard";
import { CreateTicket } from "./CreateTicket";

interface ITicketList {
  ticketList: ITicketCardProps[];
  onTicketCreated?: () => void;
  onTicketUpdated?: () => void;
}

const TicketList = (props: ITicketList) => {
  const { ticketList, onTicketCreated, onTicketUpdated } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex mb={4} align="center" justify="space-between">
        <Text fontSize="20px" fontWeight="medium">
          List of Tickets
        </Text>
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          Add Ticket
        </Button>
      </Flex>
      <Table variant="simple" width="100%">
        <Tbody>
          {ticketList.map((ticket) => (
            <Tr key={ticket.ticketId}>
              <Td p={0}>
                <TicketCard
                  assignedUserImage={ticket.assignedUserImage}
                  assignedUserName={ticket.assignedUserName}
                  ticketId={ticket.ticketId}
                  title={ticket.title}
                  status={ticket.status}
                  onTicketUpdated={onTicketUpdated}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateTicket onClose={onClose} onTicketCreated={onTicketCreated} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { TicketList };

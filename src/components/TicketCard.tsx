import {
  Avatar,
  Box,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { TicketDetails } from "./TicketDetails";

export interface ITicketCardProps {
  title: string;
  ticketId: string;
  assignedUserImage: string;
  assignedUserName: string;
  status: string;
  onTicketUpdated?: () => void;
}

const TicketCard = (props: ITicketCardProps) => {
  const {
    title,
    ticketId,
    assignedUserImage,
    assignedUserName,
    status,
    onTicketUpdated,
  } = props;
  const [selectedCardId, setSelectedCardId] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
    onTicketUpdated?.();
  };

  const handleCardClick = (id: string) => {
    setSelectedCardId(id);
    onOpen();
  };

  return (
    <>
      <Card
        cursor="pointer"
        onClick={() => handleCardClick(ticketId)}
        boxShadow="md"
        _hover={{ boxShadow: "lg" }}
        width="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        <CardBody>
          <Flex align="center" justify="space-between">
            <Box flex="1">
              <Text fontSize="sm" color="gray.500">
                {ticketId}
              </Text>
            </Box>
            <Box flex="1" textAlign="center">
              <Avatar
                size="sm"
                src={assignedUserImage}
                name={assignedUserName}
              />
            </Box>
            <Box flex="2">
              <Text fontWeight="bold">{title}</Text>
            </Box>
            <Box flex="1" textAlign="right">
              <Text fontSize="sm">{status}</Text>
            </Box>
          </Flex>
        </CardBody>
      </Card>
      <Drawer
        size="xl"
        placement={"right"}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent padding={0}>
          <DrawerCloseButton
            color="white"
            zIndex="overlay"
            aria-label="Close ticket drawer"
          />
          <DrawerHeader bg="blue.500" color="white" borderBottomWidth="1px">
            Ticket Details
          </DrawerHeader>
          <DrawerBody>
            <TicketDetails id={selectedCardId} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { TicketCard };

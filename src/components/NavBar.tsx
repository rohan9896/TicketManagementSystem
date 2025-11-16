import { Avatar, Flex, Text, HStack, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.500"
      color="white"
      boxShadow="md"
      position="sticky"
      top="0"
      width="100%"
      zIndex="10"
    >
      <Flex align="center" mr={5}>
        <Text fontSize="xl" fontWeight="bold">
          TMS
        </Text>
      </Flex>

      <HStack spacing={8} display={{ base: "none", md: "flex" }}>
        <Link
          as={RouterLink}
          to="/"
          _hover={{ textDecoration: "none", color: "blue.200" }}
        >
          Home
        </Link>
      </HStack>

      <Spacer />

      <Flex align="center">
        <Text mr={3}>Name</Text>
        <Avatar size="sm" src="" name="" />
      </Flex>
    </Flex>
  );
};

export { NavBar };

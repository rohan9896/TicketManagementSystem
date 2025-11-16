import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ICommentCard {
  userName: string;
  userId: string;
  commentMessage: string;
}

const CommentCard = (props: ICommentCard) => {
  const { commentMessage, userId, userName } = props;

  return (
    <Box
      p={3}
      border="1px solid"
      borderColor="gray.300"
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      _hover={{ boxShadow: "md", borderColor: "gray.400" }}
      transition="all 0.2s"
    >
      <Flex align="center" mb={2} gap={2}>
        <Avatar size="xs" name={userName} />
        <Flex direction="column" flex={1}>
          <Text fontWeight="600" fontSize="sm">
            {userName}
          </Text>
          <Text fontSize="xs" color="gray.500">
            ID: {userId}
          </Text>
        </Flex>
      </Flex>
      <Text fontSize="sm" lineHeight="1.5" color="gray.800">
        {commentMessage}
      </Text>
    </Box>
  );
};

export { CommentCard };

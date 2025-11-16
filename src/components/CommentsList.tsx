import {
  Box,
  Divider,
  Text,
  VStack,
  Heading,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { CommentCard } from "./CommentCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface ICommentsList {
  ticketId: string;
}

interface IComment {
  ticketId: string;
  assigneduserId: string;
  assignedUserImage: string;
  username: string;
  comment: string;
}

const CommentsList = ({ ticketId }: ICommentsList) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:3000/comments?ticketId=${ticketId}`
    );
    setComments(response.data);
  };

  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // assuming the loggedin user has following details
      const currentUser = {
        userId: "user1",
        username: "User 1",
        userImage: "https://via.placeholder.com/150/0000FF/FFFFFF?text=User1",
      };

      const commentData = {
        ticketId,
        assigneduserId: currentUser.userId,
        assignedUserImage: currentUser.userImage,
        username: currentUser.username,
        comment: newComment.trim(),
      };

      await axios.post("http://localhost:3000/comments", commentData);

      setNewComment("");
      await fetchComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      overflowY="auto"
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
      boxShadow="sm"
    >
      <Heading size="md" mb={4}>
        Comments
      </Heading>
      <Divider mb={4} />

      <VStack spacing={3} mb={6}>
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          resize="none"
        />
        <Button
          colorScheme="blue"
          onClick={handleAddComment}
          isLoading={isSubmitting}
          loadingText="Adding..."
          alignSelf="flex-end"
          isDisabled={!newComment.trim()}
        >
          Add Comment
        </Button>
      </VStack>

      <Divider mb={4} />

      {/* Comments List */}
      <VStack spacing={3} align="stretch">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentCard
              key={index}
              userName={comment.username}
              userId={comment.assigneduserId}
              commentMessage={comment.comment}
            />
          ))
        ) : (
          <Text color="gray.500" textAlign="center" py={8}>
            No comments yet
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export { CommentsList };

import { Container, VStack } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

interface ILayout {
  children: React.ReactNode;
}

const Layout = (props: ILayout) => {
  return (
    <VStack spacing={0} minH="100vh">
      <NavBar />
      <Container maxW="container.xl" flex={1} py={4}>
        {props.children}
      </Container>
    </VStack>
  );
};

export default Layout;

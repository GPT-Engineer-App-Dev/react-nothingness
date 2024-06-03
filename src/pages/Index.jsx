import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">My React App</Text>
        <Box>
          <Link to="/" style={{ margin: "0 10px", color: "white" }}>Home</Link>
          <Link to="/about" style={{ margin: "0 10px", color: "white" }}>About</Link>
        </Box>
      </Flex>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh">
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome to My React App</Text>
          <Text>This is a basic structure with a responsive navigation bar.</Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
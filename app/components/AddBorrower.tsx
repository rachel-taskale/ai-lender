import {
  Box,
  Button,
  Icon,
  Input,
  VStack,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";
import { useState } from "react";
import { toaster } from "./ui/toaster";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";

export const AddBorrower = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleCreate = async () => {
    console.log(email, ", ", name);
    try {
      await axios.post("/api/users", {
        email,
        name,
      });

      toaster.create({
        title: "Borrower created",
        type: "success",
        duration: 3000,
      });

      setEmail("");
      setName("");
      setFormVisible(false);
    } catch (error: any) {
      toaster.create({
        title: "Error creating borrower",
        description: error?.response?.data?.error || error.message,
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={2}>
        New Borrower
      </Heading>
      <Text fontSize="sm" color="gray.400" mb={4}>
        Create a new borrower or upload documents to an existing one.
      </Text>

      {!formVisible && (
        <Button
          size="sm"
          colorScheme="teal"
          shadow="md"
          onClick={() => setFormVisible(true)}
          aria-label="Add Borrower"
        >
          <Icon as={PiPlus} boxSize={5} mr={1} />
          New Borrower
        </Button>
      )}

      {formVisible && (
        <Box
          mt={6}
          p={6}
          border="1px solid #2d2d2d"
          borderRadius="lg"
          bg="#1a1a1a"
          color="white"
          maxW="sm"
        >
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg="#2a2a2a"
              borderColor="#3a3a3a"
              _hover={{ borderColor: "#666" }}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px #3182ce",
              }}
            />
            <Input
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="#2a2a2a"
              borderColor="#3a3a3a"
              _hover={{ borderColor: "#666" }}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px #3182ce",
              }}
            />
            <HStack justify="flex-end">
              <Button variant="ghost" onClick={() => setFormVisible(false)}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleCreate}>
                Create
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}
      <Toaster />
    </Box>
  );
};

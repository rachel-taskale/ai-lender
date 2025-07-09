import { toaster, Toaster } from "@/components/ui/toaster";
import { Fieldset, HStack, Input, Button, Box } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

type UserAccountSearchProps = {
  setEmail: (email: string) => void;
  searchUser: () => void;
};
export const UserAccountSearch = ({
  setEmail,
  searchUser,
}: UserAccountSearchProps) => {
  return (
    <Box>
      <HStack>
        <Input
          type="email"
          placeholder="borrower@example.com"
          onChange={(e) => setEmail(e.target.value)}
          bg="#2a2a2a"
          borderColor="#3a3a3a"
          _hover={{ borderColor: "#666" }}
          _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
        />
        <Button width="fit-content" onClick={searchUser}>
          <BsArrowRight />
        </Button>
      </HStack>
      <Toaster />
    </Box>
  );
};

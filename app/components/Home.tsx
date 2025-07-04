// Home.tsx
"use client";

import { Box, Text, Heading } from "@chakra-ui/react";
import { useState } from "react";
import FileUploader from "./FileUploader";
import { AddBorrower } from "./AddBorrower";

export const Home = () => {
  const [results, setResults] = useState();

  return (
    <Box p={8}>
      <Heading size="md" mb={4}>
        Upload Borrower’s Documents
      </Heading>

      <FileUploader />

      <Box position="fixed" bottom={6} right={6}>
        <AddBorrower />
      </Box>
    </Box>
  );
};

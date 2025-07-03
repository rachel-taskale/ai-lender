"use client";

import { Box, Button, FileUpload } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiUpload } from "react-icons/hi";
import FileUploader from "./FileUploader";
import { AddBorrower } from "./AddBorrower";

export const Home = () => {
  const [results, setResults] = useState();

  return (
    <div>
      <Box justifyItems="center" pt="20px">
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Upload Borrower's Documents
        </div>
        <FileUploader />
        <Box position="absolute" bottom={5} right={5}>
          <AddBorrower />
        </Box>
      </Box>
    </div>
  );
};

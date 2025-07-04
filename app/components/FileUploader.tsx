import { useEffect, useState } from "react";
import {
  VStack,
  Button,
  Text,
  HStack,
  Box,
  Input,
  Stack,
  Fieldset,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";

export default function FileUploadForm() {
  const [documents, setDocuments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [email, setEmail] = useState("");

  const handleUpload = async () => {
    if (!documents.length) return;
    const formData = new FormData();
    documents.forEach((file) => formData.append("files", file));
    formData.append("email", email);

    setIsUploading(true);
    const toastId = toaster.create({
      title: "Uploading...",
      description: `Uploading ${documents[0].name}`,
      type: "loading",
      duration: 4000,
    });

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toaster.dismiss(toastId);
      toaster.create({
        title: "Upload successful",
        description: `File uploaded as ${res.data.filename}`,
        type: "success",
        duration: 4000,
      });
      setDocuments([]);
    } catch (err: any) {
      toaster.dismiss(toastId);
      toaster.create({
        title: "Upload failed",
        description: err.message,
        type: "error",
        duration: 4000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <VStack
      align="stretch"
      spacing={6}
      p={6}
      border="1px solid #2d2d2d"
      borderRadius="lg"
      bg="#1a1a1a"
      color="white"
    >
      {/* Updated to fieldset format */}
      <Fieldset.Root>
        <label>Borrower Email</label>
        <Input
          type="email"
          placeholder="borrower@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg="#2a2a2a"
          borderColor="#3a3a3a"
          _hover={{ borderColor: "#666" }}
          _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
        />
      </Fieldset.Root>

      <Stack direction="row" spacing={4}>
        <input
          id="file-upload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files) {
              setDocuments(Array.from(e.target.files));
            }
          }}
        />
        <label htmlFor="file-upload">
          <Button as="span" variant="outline" leftIcon={<HiUpload />}>
            Choose File(s)
          </Button>
        </label>

        <Button
          colorScheme="blue"
          onClick={handleUpload}
          isDisabled={documents.length === 0 || isUploading}
          isLoading={isUploading}
          leftIcon={<BsCheck />}
        >
          Submit
        </Button>
      </Stack>

      <VStack align="start" spacing={2}>
        {documents.map((item) => (
          <Box
            key={item.name}
            px={3}
            py={2}
            borderRadius="md"
            bg="#333"
            fontSize="sm"
          >
            {item.name}
          </Box>
        ))}
      </VStack>

      <Toaster />
    </VStack>
  );
}

import { VStack, Button, Box, Stack } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";

type FileUploadFormProps = {
  email: string;
  setDocuments: (documents: File[]) => void;
  setIsUploading: (isUploading: boolean) => void;
  isUploading: boolean;
  documents: File[];
  handleUpload: () => Promise<void>;
};

export const FileUploadForm = ({
  email,
  setDocuments,
  documents,
  setIsUploading,
  isUploading,
  handleUpload,
}: FileUploadFormProps) => {
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
          <Button as="span" variant="outline">
            <HiUpload />
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
};

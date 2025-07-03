"use client";
import { useState } from "react";
import { VStack, Button, Text, HStack } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { Toaster, toaster } from "@/components/ui/toaster";

export default function FileUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!files.length) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    setIsUploading(true);

    const toastId = toaster.create({
      title: "Uploading...",
      description: `Uploading ${files[0].name}`,
      type: "loading",
      duration: 4000,
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      toaster.dismiss(toastId); // remove loading toast

      toaster.create({
        title: "Upload successful",
        description: `File uploaded as ${data.filename}`,
        type: "success",
        duration: 4000,
      });

      setFiles([]);
    } catch (err: any) {
      toaster.dismiss(toastId); // remove loading toast

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
    <HStack align="flex-start" spacing={4}>
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="outline" size="sm" as="span" leftIcon={<HiUpload />}>
          Upload file
        </Button>
      </label>

      {files.length > 0 && (
        <Text fontSize="sm" color="gray.500">
          {files[0].name}
        </Text>
      )}

      <Button
        size="xs"
        colorScheme="blue"
        onClick={handleUpload}
        isDisabled={files.length === 0 || isUploading}
        isLoading={isUploading}
        leftIcon={<BsCheck />}
      >
        Submit
      </Button>

      <Toaster />
    </HStack>
  );
}

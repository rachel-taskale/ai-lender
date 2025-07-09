"use client";

import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Tag,
  Heading,
  Separator,
} from "@chakra-ui/react";

type UserProfileCardProps = {
  fullName: string;
  email: string;
  documents: string[]; // list of document names
};

export function UserProfileCard({
  fullName,
  email,
  documents,
}: UserProfileCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="sm"
      p={6}
      w="100%"
      maxW="400px"
      bg="white"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <VStack spacing={4} align="start">
        <HStack spacing={4}>
          <Avatar.Root>
            <Avatar.Fallback name={fullName} />
          </Avatar.Root>
          <VStack spacing={0} align="start">
            <Heading size="md">{fullName}</Heading>
            <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
              {email}
            </Text>
          </VStack>
        </HStack>

        <Separator />

        <Box>
          <Text fontWeight="medium" mb={2}>
            Uploaded Documents
          </Text>
          {documents.length > 0 ? (
            <VStack align="start" spacing={1}>
              {documents.map((doc, i) => (
                <Tag.Root key={i} size="sm" variant="subtle" colorScheme="teal">
                  <Tag.Label>{doc}</Tag.Label>
                </Tag.Root>
              ))}
            </VStack>
          ) : (
            <Text fontSize="sm" color="gray.500">
              No documents uploaded
            </Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

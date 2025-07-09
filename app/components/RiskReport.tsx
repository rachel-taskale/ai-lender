"use client";

import {
  Box,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Badge,
  VStack,
  HStack,
  Tag,
  Divider,
  Separator,
  List,
  ListItem,
} from "@chakra-ui/react";

type RiskReportProps = {
  userId?: string;
  totalIncome?: number;
  totalSpending?: number;
  riskScore?: number;
  suspiciousFlags?: string[];
  approvedForLoan?: boolean;
  summary?: string;
  lastUpdated?: Date;
  documentCount?: number;
};

export function RiskReport({
  userId,
  totalIncome,
  totalSpending,
  riskScore,
  suspiciousFlags,
  approvedForLoan,
  summary,
  lastUpdated,
  documentCount,
}: RiskReportProps) {
  return (
    <Box
      p={6}
      maxW="600px"
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="md"
      bg="white"
      _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">Loan Risk Profile</Heading>
        {lastUpdated && (
          <Text fontSize="sm" color="gray.500">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </Text>
        )}
        <Separator />

        <Stat.Root>
          <Stat.Label>Total Income</Stat.Label>
          <Stat.ValueText>${totalIncome?.toLocaleString()}</Stat.ValueText>
        </Stat.Root>
        <Stat.Root>
          <Stat.Label>Total Spending</Stat.Label>
          <Stat.ValueText>${totalSpending?.toLocaleString()}</Stat.ValueText>
        </Stat.Root>

        <Stat.Root>
          <Stat.Label>Risk Score</Stat.Label>
          <Stat.ValueText>{riskScore?.toFixed(2)}</Stat.ValueText>
        </Stat.Root>
        <Stat.Root>
          <Stat.Label>Documents Analyzed</Stat.Label>
          <Stat.ValueText>{documentCount}</Stat.ValueText>
        </Stat.Root>

        <HStack>
          <Text fontWeight="medium">Loan Status:</Text>
          <Badge
            colorScheme={approvedForLoan ? "green" : "red"}
            variant="subtle"
            px={2}
            py={1}
            borderRadius="md"
          >
            {approvedForLoan ? "Approved" : "Not Approved"}
          </Badge>
        </HStack>

        {suspiciousFlags && suspiciousFlags.length > 0 && (
          <>
            <Text fontWeight="medium" mt={4}>
              Suspicious Flags:
            </Text>

            <List.Root spacing={2} styleType="disc" pl={6}>
              {suspiciousFlags?.map((flag, idx) => (
                <List.Item key={idx}>{flag}</List.Item>
              ))}
            </List.Root>
          </>
        )}

        <Separator />

        <Box>
          <Text fontWeight="medium" mb={1}>
            Summary
          </Text>
          <Text fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
            {summary}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}

"use client";

import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Separator,
} from "@chakra-ui/react";
import { useState } from "react";
import { FileUploadForm } from "./FileUploader";
import { AddBorrower } from "./AddBorrower";
import { UserAccountSearch } from "./UserAccountSearch";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import { UserProfileCard } from "./UserProfileCard";
import { UserDocuments } from "../lib/interfaces";
import { RiskReport } from "./RiskReport";

export const Home = () => {
  const [email, setEmail] = useState("");
  const [userProfile, setUserProfile] = useState<any>();
  const [userDocuments, setUserDocuments] = useState<string[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<any>();
  const handleReportGeneration = async () => {
    const toastId = toaster.create({
      title: "Generating report...",
      type: "loading",
      duration: Infinity, // persist until manually dismissed
    });

    try {
      const result = await axios.post("/api/report", { email });
      console.log(result);

      toaster.dismiss(toastId); // ✅ dismiss loading

      setReport(result.data);

      toaster.create({
        title: "Report created",
        type: "success",
        duration: 3000,
      });
    } catch (error: any) {
      toaster.dismiss(toastId); // ✅ dismiss loading on error

      toaster.create({
        title: "Error creating report",
        description: error?.response?.data?.error || error.message,
        type: "error",
        duration: 3000,
      });
    }
  };

  const searchUser = async () => {
    try {
      console.log("here");
      const user = await axios.get("/api/users/" + email);
      toaster.create({
        title: "Borrower found",
        type: "success",
        duration: 3000,
      });

      setUserProfile(user.data.userAccount.rows[0]);
      setUserDocuments(
        (user.data.userDocuments?.rows || []).map(
          (doc: UserDocuments) => doc.filename
        )
      );
    } catch (error: any) {
      toaster.create({
        title: "An error occurred",
        description: error?.response?.data?.error || error.message,
        type: "error",
        duration: 3000,
      });
    }
  };
  const handleUpload = async () => {
    if (!documents.length) return;

    const formData = new FormData();
    documents.forEach((file) => formData.append("files", file));
    formData.append("email", email);

    console.log("handling upload");

    setIsUploading(true);

    const toastId = toaster.create({
      title: "Uploading...",
      description: `Uploading ${documents[0].name}`,
      type: "loading",
      duration: Infinity, // stays open until manually dismissed
    });

    try {
      const result = await axios.post("/api/upload", formData);

      toaster.dismiss(toastId); // ✅ dismiss loading

      toaster.create({
        title: "Upload successful",
        type: "success",
        duration: 3000,
      });

      // optionally refresh user state here
      // await searchUser();
    } catch (err: any) {
      toaster.dismiss(toastId); // ✅ dismiss loading on error too

      toaster.create({
        title: "Upload failed",
        description: err?.response?.data?.error || err.message,
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box p={10} maxW="4xl" mx="auto">
      <Heading
        fontSize="2xl"
        display="flex"
        mb={10}
        fontWeight="bold"
        justifyContent="center"
      >
        Lender Dashboard
      </Heading>

      <HStack
        align="start"
        spacing={8}
        divider={<Separator orientation="vertical" borderColor="#333" />}
        mb={16}
      >
        <Box flex={1}>
          <AddBorrower />
        </Box>

        <Box flex={1}>
          <Heading size="lg" mb={2}>
            Find Existing Borrower
          </Heading>
          <Text fontSize="sm" color="gray.400" mb={4}>
            Enter email to find an existing borrower
          </Text>
          <UserAccountSearch setEmail={setEmail} searchUser={searchUser} />
        </Box>
      </HStack>

      <VStack align="stretch" mt={20}>
        {userProfile && (
          <UserProfileCard
            fullName={userProfile.full_name ?? "Unknown User"}
            email={userProfile.email}
            documents={userDocuments}
          />
        )}

        <Heading size="lg" mt={10} mb={2}>
          Upload Documents
        </Heading>
        <FileUploadForm
          email={email}
          documents={documents}
          setDocuments={setDocuments}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          handleUpload={handleUpload}
        />
        <Button mt={10} onClick={handleReportGeneration}>
          Generate Report
        </Button>
        {report && (
          <RiskReport
            userId={report?.userId}
            totalIncome={report?.totalIncome}
            totalSpending={report?.totalSpending}
            riskScore={report?.riskScore}
            suspiciousFlags={report?.suspiciousFlags}
            approvedForLoan={report?.approvedForLoan}
            summary={report?.summary}
            lastUpdated={report?.lastUpdated}
            documentCount={report?.documentCount}
          />
        )}
      </VStack>
    </Box>
  );
};

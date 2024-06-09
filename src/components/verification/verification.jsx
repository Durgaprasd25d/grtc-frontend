import React from "react";
import VerificationCard from "./verificationCard";
import { Container, Box } from "@mui/material";
import "./Verification.css";
import Back from "../common/back/Back";

const Verification = () => {
  return (
    <>
      <Back title="Verification" />
      <Box className="verification-section" py={6}>
        <Container maxWidth="lg">
          <VerificationCard />
        </Container>
      </Box>
    </>
  );
};

export default Verification;

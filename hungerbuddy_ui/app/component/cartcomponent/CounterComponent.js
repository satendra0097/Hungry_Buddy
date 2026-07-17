"use client";

import { Stepper, Step, StepLabel, useMediaQuery } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material/styles";
import styles from "./CounterComponent.module.css";

const steps = ["Your Cart", "Order Review", "Payment"];

function CustomStepIcon({ active, completed, icon }) {
  return (
    <div
      className={`${styles.stepIcon} ${
        active || completed ? styles.stepIconActive : styles.stepIconInactive
      }`}
    >
      {completed ? <CheckIcon sx={{ fontSize: 16 }} /> : icon}
    </div>
  );
}

export default function CounterComponent({
  showStepper = true,
  currentStep = 0,
}) {
  // Stepper component
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (showStepper && !isMobile) {
    return (
      <div className={styles.stepperCard}>
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": {
              fontSize: "14px",
              color: "#666",
              fontWeight: 700,
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "#333",
              fontWeight: 700,
            },
            "& .MuiStepConnector-root": {
              marginTop: "5px",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                slots={{ stepIcon: CustomStepIcon }}
                slotProps={{ stepIcon: { icon: index + 1 } }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

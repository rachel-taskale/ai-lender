// AddBorrower.tsx
import { Button, Icon } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

import { PiPlus } from "react-icons/pi";

export const AddBorrower = () => {
  return (
    <Tooltip content="Add new borrower">
      <Button
        size="lg"
        colorScheme="teal"
        borderRadius="full"
        shadow="lg"
        aria-label="Add Borrower"
      >
        <Icon as={PiPlus} boxSize={6} />
      </Button>
    </Tooltip>
  );
};

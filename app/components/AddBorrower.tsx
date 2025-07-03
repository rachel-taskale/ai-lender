import { Button, Text } from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";
import { Tooltip } from "@/components/ui/tooltip";

export const AddBorrower = () => {
  return (
    <div
      style={{
        justifyItems: "center",
      }}
    >
      <Tooltip content="Add new borrower">
        <Button>
          <PiPlus />
        </Button>
      </Tooltip>
    </div>
  );
};

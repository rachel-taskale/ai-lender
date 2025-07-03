// app/head.tsx
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/lib/theme";

export default function Head() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    </>
  );
}

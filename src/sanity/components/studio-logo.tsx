import { Box, Flex, Text } from "@sanity/ui";

/** Wordmark shown in the studio navbar. */
export function StudioLogo() {
  return (
    <Flex align="center" gap={3} paddingX={1}>
      <Box
        style={{
          background: "#2877D4",
          color: "#fff",
          width: 28,
          height: 28,
          display: "grid",
          placeItems: "center",
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: "-0.04em",
        }}
      >
        SF
      </Box>
      <Text
        weight="semibold"
        size={1}
        style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
      >
        SkyFactor
      </Text>
    </Flex>
  );
}

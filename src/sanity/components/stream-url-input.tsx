import { Badge, Box, Card, Flex, Text } from "@sanity/ui";
import type { UrlInputProps } from "sanity";
import {
  PLATFORM_LABELS,
  getPlatform,
  getYouTubeThumbnail,
} from "../../lib/media";

/** URL input that shows the detected platform and, for YouTube, a thumbnail preview. */
export function StreamUrlInput(props: UrlInputProps) {
  const url = props.value;
  const platform = getPlatform(url);
  const thumb = getYouTubeThumbnail(url);

  return (
    <Flex direction="column" gap={3}>
      {props.renderDefault(props)}
      {url && (
        <Card padding={3} radius={0} border tone="primary">
          <Flex gap={3} align="center">
            {thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                style={{ width: 128, aspectRatio: "16 / 9", objectFit: "cover" }}
              />
            )}
            <Box>
              <Flex direction="column" gap={2}>
                <Text size={1} muted>
                  Detected platform
                </Text>
                <Badge tone="primary" radius={0}>
                  {PLATFORM_LABELS[platform]}
                </Badge>
              </Flex>
            </Box>
          </Flex>
        </Card>
      )}
    </Flex>
  );
}

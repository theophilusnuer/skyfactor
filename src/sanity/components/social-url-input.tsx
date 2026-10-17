import { Flex, Text, TextInput } from "@sanity/ui";
import { set, unset, useFormValue, type StringInputProps } from "sanity";
import { platformInfo } from "../../lib/social";

export function SocialUrlInput(props: StringInputProps) {
  const { value, onChange, path } = props;
  const parent = useFormValue(path.slice(0, -1)) as
    | { platform?: string }
    | undefined;
  const info = platformInfo(parent?.platform);

  if (!info) {
    return (
      <Text size={1} muted>
        Choose a platform first.
      </Text>
    );
  }

  const handle =
    value && value.startsWith(info.base) ? value.slice(info.base.length) : (value ?? "");

  return (
    <Flex direction="column" gap={2}>
      <Text size={1} muted>
        {info.base}
        <strong>{handle || "username"}</strong>
      </Text>
      <TextInput
        value={handle}
        placeholder={info.value === "website" ? "example.com" : "username"}
        onChange={(e) => {
          const v = e.currentTarget.value.trim().replace(/^@/, "");
          onChange(v ? set(/^https?:\/\//.test(v) ? v : info.base + v) : unset());
        }}
      />
    </Flex>
  );
}

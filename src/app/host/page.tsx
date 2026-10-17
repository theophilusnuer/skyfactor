import { getHost } from "@/sanity/lib/host";
import HostPageClient from "@/components/host/host-page-client";

// export const dynamic = "force-dynamic";

export default async function HostPage() {
  const host = await getHost();

  return <HostPageClient host={host} />;
}

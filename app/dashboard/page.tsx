import AgentBlocks from "@/components/AgentBlocks";
import { requireUser } from "../utils/requireUser";

export default async function DashboardPage() {
  const user = await requireUser();
  return (
    <AgentBlocks
      imageUrl={user.picture || `https://avatar.vercel.sh/${user.given_name}`}
    ></AgentBlocks>
  );
}

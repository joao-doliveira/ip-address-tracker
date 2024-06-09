import { getUserIp } from "@/app/utils";

export default async function IPDataTracker() {
  const userIp = getUserIp();
  return <p>{userIp}</p>;
}

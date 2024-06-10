import IPDataTracker from "@/components/IPDataTracker";
import { getData } from "@/lib/data";

export default async function Home() {
  const initialData = await getData();
  return (
    <main className="flex justify-center w-full">
      <IPDataTracker userIpData={initialData} />
    </main>
  );
}

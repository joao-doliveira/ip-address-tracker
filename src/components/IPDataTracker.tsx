"use client";

interface IPDataTrackerProps {
  userIpData: IPAddressData;
}

import { IPAddressData } from "@/lib/data";
import { useState } from "react";

export default function IPDataTracker({ userIpData }: IPDataTrackerProps) {
  const [inputValue, setInputValue] = useState("");
  const [ipData, setIpData] = useState(userIpData);

  const { data, error } = ipData;

  async function fetchIPData() {
    const newData = await fetch(`/ipData?ipAddress=${inputValue}`).then((res) =>
      res.json()
    );
    setIpData(newData.response);
  }
  return (
    <section>
      <h1>IP Address Tracker</h1>
      <div>
        <form action={fetchIPData}>
          <input
            type="text"
            name="ipAddress"
            id="ipAddress"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit"> search for ip data</button>
        </form>
      </div>

      {data && (
        <dl>
          <div>
            <dt>IP Address</dt>
            <dd>{data.ip}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{data.country}</dd>
          </div>
          <div>
            <dt>Timezone</dt>
            <dd>{data.timezone}</dd>
          </div>
          <div>
            <dt>ISP</dt>
            <dd>{data.isp}</dd>
          </div>
        </dl>
      )}

      {error && <p>{error.messages}</p>}
    </section>
  );
}

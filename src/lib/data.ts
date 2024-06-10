import "server-only";

export interface IPAddressData {
  data:
    | {
        ip: string;
        country: string;
        timezone: string;
        isp: string;
      }
    | undefined;
  error:
    | {
        code: number;
        messages: string;
      }
    | undefined;
}

export async function getData(ipAddress?: string): Promise<IPAddressData> {
  let ipAddressData;
  let response: IPAddressData;

  try {
    if (ipAddress) {
      ipAddressData = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=${process.env.IPIFY_AKP_KEY}&ipAddress=${ipAddress}`
      ).then((res) => res.json());
    } else {
      ipAddressData = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=${process.env.IPIFY_AKP_KEY}`
      ).then((res) => res.json());
    }
  } catch (e) {
    throw e;
  }

  if (ipAddressData.ip) {
    response = {
      data: {
        ip: ipAddressData.ip,
        country: ipAddressData.location.country,
        timezone: ipAddressData.location.timezone,
        isp: ipAddressData.isp,
      },
      error: undefined,
    };
  } else {
    response = {
      data: undefined,
      error: ipAddressData,
    };
  }

  return response;
}

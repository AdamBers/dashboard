export interface ITest {
  id: number;
  name: string;
  type: "CLASSIC" | "MVT" | "SERVER_SIDE";
  status: "ONLINE" | "PAUSED" | "STOPPED" | "DRAFT";
  siteId: number;
  siteUrl?: string;
}

export interface ISite {
  id: number;
  url: string;
}

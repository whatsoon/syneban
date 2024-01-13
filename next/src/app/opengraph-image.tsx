import { SiteName } from "@/utils/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Syneban";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#0f766e",
          color: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {SiteName}
      </div>
    ),
    {
      ...size,
    },
  );
}

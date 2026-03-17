import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(180deg, #0f1720 0%, #121d27 100%)",
          color: "#f5efe3",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: 28,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "0.12em",
          width: "100%",
        }}
      >
        MC
      </div>
    ),
    size,
  );
}

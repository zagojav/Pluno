import { ImageResponse } from "next/og";

// Ícone usado no manifest.ts (instalação como app na tela inicial).
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b120c",
          color: "#c6ff4d",
          fontSize: 320,
          fontWeight: 700,
        }}
      >
        P
      </div>
    ),
    { width: 512, height: 512 },
  );
}

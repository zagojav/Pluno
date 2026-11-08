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
          background: "#15130f",
          color: "#ffde59",
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

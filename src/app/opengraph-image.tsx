import { ImageResponse } from "next/og";

export const alt = "Pluno — mural da turma, aviso na hora";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ImagemOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: "80px 90px",
          background: "#0b120c",
          color: "#f1f7ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#c6ff4d",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#c6ff4d",
            }}
          />
          Pluno
        </div>
        <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.15 }}>
          A prova que o professor avisou em sala, no seu celular na hora.
        </div>
        <div style={{ fontSize: 28, color: "#a3b39b" }}>
          Mural da turma · feito por aluno, pra aluno
        </div>
      </div>
    ),
    { ...size },
  );
}

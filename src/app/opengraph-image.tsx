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
          background: "#15130f",
          color: "#f5f1e6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#1c1a14",
            background: "#ffde59",
            alignSelf: "flex-start",
            padding: "6px 14px",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Pluno
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
          A prova que o professor avisou em sala, no seu celular na hora.
        </div>
        <div style={{ fontSize: 28, color: "#b3ac98" }}>
          Mural da turma · feito por aluno, pra aluno
        </div>
      </div>
    ),
    { ...size },
  );
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pluno — mural da turma",
    short_name: "Pluno",
    description:
      "Mural da turma, prazos do Moodle sem senha, faltas e cálculo de nota.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b120c",
    theme_color: "#0b120c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

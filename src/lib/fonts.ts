import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

export const archivo = Archivo({
  variable: "--ff-display",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const inter = Inter({
  variable: "--ff-sans",
  subsets: ["latin"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontClassNames = [
  archivo.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");

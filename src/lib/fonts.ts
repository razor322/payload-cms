import { DM_Sans, JetBrains_Mono, Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const dmSans = DM_Sans({
  variable: "--ff-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontClassNames = [
  montserrat.variable,
  dmSans.variable,
  jetbrainsMono.variable,
].join(" ");

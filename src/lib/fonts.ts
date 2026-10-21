import { DM_Sans, JetBrains_Mono } from "next/font/google";

// The kyos admin runs on one family, DM Sans. The mono is held back for
// the ids and the slugs, which the content admin needs and the kyos app
// does not.
export const dmSans = DM_Sans({
  variable: "--ff-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontClassNames = [dmSans.variable, jetbrainsMono.variable].join(
  " ",
);

import "server-only";
import { makeRepo } from "@/lib/repositories/crud";

export const skillsRepo = makeRepo("skills");
export const capabilitiesRepo = makeRepo("capabilities");
export const testimonialsRepo = makeRepo("testimonials");
export const awardsRepo = makeRepo("awards");
export const headersRepo = makeRepo("section_headers", "section");
export const terminalRepo = makeRepo("terminal_lines");

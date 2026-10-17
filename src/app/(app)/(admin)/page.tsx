import Link from "next/link";
import { Card } from "@/components/brut/card";
import { listProjects } from "@/lib/repositories/projects";
import { experiencesRepo } from "@/lib/repositories/experiences";
import { skillsRepo, capabilitiesRepo, testimonialsRepo, awardsRepo } from "@/lib/repositories/index";

export default async function DashboardPage() {
  const [projects, experiences, skills, capabilities, testimonials, awards] =
    await Promise.all([
      listProjects(),
      experiencesRepo.list(),
      skillsRepo.list(),
      capabilitiesRepo.list(),
      testimonialsRepo.list(),
      awardsRepo.list(),
    ]);

  const cards: [string, string, number][] = [
    ["Projects", "/projects", projects.length],
    ["Experiences", "/experiences", experiences.length],
    ["Skills", "/skills", skills.length],
    ["Capabilities", "/capabilities", capabilities.length],
    ["Testimonials", "/testimonials", testimonials.length],
    ["Awards", "/awards", awards.length],
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-black uppercase">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {cards.map(([label, href, count]) => (
          <Link key={href} href={href}>
            <Card>
              <p className="text-4xl font-black">{count}</p>
              <p className="mt-1 text-xs font-bold uppercase">{label}</p>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-sm font-bold uppercase underline">
        <Link href="/headers">Section headers</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </div>
  );
}

import { siteContent } from "@/lib/siteContent";

export type ExperienceRole = (typeof siteContent.experience)[number];

export function getExperienceRoles(): readonly ExperienceRole[] {
  return siteContent.experience;
}

export function getExperienceById(id: string): ExperienceRole | undefined {
  return siteContent.experience.find((item) => item.id === id);
}

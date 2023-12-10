import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "글자가 짧아요").max(255),
  description: z.string().min(1),
});

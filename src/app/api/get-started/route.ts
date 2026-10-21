import { handleForm } from "@/lib/form-handler";

export function POST(req: Request) {
  return handleForm(req, "signup", {
    plan: { required: true, oneOf: ["starter", "growth", "enterprise"] },
    billing: { required: true, oneOf: ["monthly", "annual"] },
    name: { required: true, max: 120 },
    email: { required: true, email: true, max: 200 },
    company: { required: true, max: 160 },
    country: { required: true, max: 80 },
    volume: { max: 40 },
  });
}

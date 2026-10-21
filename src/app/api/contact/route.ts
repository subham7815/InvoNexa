import { handleForm } from "@/lib/form-handler";

export function POST(req: Request) {
  return handleForm(req, "contact", {
    name: { required: true, max: 120 },
    email: { required: true, email: true, max: 200 },
    company: { required: true, max: 160 },
    message: { max: 2000 },
  });
}

import { handleForm } from "@/lib/form-handler";

export function POST(req: Request) {
  return handleForm(req, "subscribe", {
    email: { required: true, email: true, max: 200 },
    topic: { oneOf: ["status", "blog"] },
  });
}

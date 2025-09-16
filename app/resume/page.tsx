import { redirect } from "next/navigation";
import { APP_CONFIG } from "@/lib/app.config";

export default function ResumePage() {
  redirect(APP_CONFIG.resumeLink);
}

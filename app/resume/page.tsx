import { redirect } from "next/navigation";
import { APP_CONFIG } from "@/app.config";

export default function ResumePage() {
  redirect(APP_CONFIG.resumeLink);
}

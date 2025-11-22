import { getPageData } from "./pages";
import { MentionsPageType } from "../types/data/mentions";

export async function getMentions(): Promise<MentionsPageType> {
  return await getPageData("mentions");
}

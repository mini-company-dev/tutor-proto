import { SGrammarTest } from "@/type/server/serverGrammerTestAnswer";
import { createServerApiHandler } from "../serverApiFactory";

export const GET = createServerApiHandler<SGrammarTest>(
  "GET",
  "/api/tests",
  true
);

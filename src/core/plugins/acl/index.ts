import type { App } from "vue";
import { abilitiesPlugin } from "@casl/vue";
import ability from "./ability";

export function initAcl(app: App<Element>) {
  app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  });
}

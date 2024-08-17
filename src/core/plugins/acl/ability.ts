import { defineAbility } from "@casl/ability";

export default defineAbility((can, cannot) => {
  const permission = JSON.parse(localStorage.getItem("permissions"));
  if (permission) {
    permission.forEach(({ action, subject }) => {
      can(action, subject);
    });
  } else {
    cannot("manage", "all");
  }
});

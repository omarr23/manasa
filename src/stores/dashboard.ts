import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export const useDashboardStore = defineStore("dashboard", () => {
  const dashboard = ref(null);

  async function getDashboard() {
    try {
      const { data } = await ApiService.query("dashboard",{});
      dashboard.value = data;
    } catch (error) {
      console.error(error);
    }
  }

  // Return the properties and functions to be used in the component
  return {
    getDashboard,
    dashboard,
  };
});

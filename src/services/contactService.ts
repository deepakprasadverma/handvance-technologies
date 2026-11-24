import { api } from "./api";
import { ContactInquiry, ApiResponse } from "@/types";

export const contactService = {
  /**
   * Submit client inquiry
   */
  async submitInquiry(inquiry: Omit<ContactInquiry, "createdAt">): Promise<ApiResponse<{ id: string }>> {
    // In Phase 1, placeholder returning mock success
    return api.post<{ id: string }>("/api/contact", {
      ...inquiry,
      createdAt: new Date().toISOString(),
    });
  },
};

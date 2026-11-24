"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Building,
  Mail,
  Share2,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Layers,
} from "lucide-react";

interface SettingsData {
  company_profile: {
    companyName: string;
    tagline: string;
    logoText: string;
    logoUrl?: string;
    foundedYear: string;
  };
  contact_info: {
    email: string;
    supportEmail: string;
    phone: string;
    address: string;
    businessHours: string;
  };
  social_links: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
  };
  footer_info: {
    copyrightText: string;
    tagline: string;
    complianceText: string;
  };
}

export default function SettingsManagementPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "contact" | "social" | "footer">("profile");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/settings");
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load settings");
      }

      setSettings(data.settings);
    } catch (err: unknown) {
      console.error("Fetch settings error:", err);
      const msg = err instanceof Error ? err.message : "Failed to load settings from database.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save settings");
      }

      showNotice("Website settings updated successfully.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save settings.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3 max-w-7xl mx-auto">
        <RefreshCw className="w-8 h-8 animate-spin text-[#13CDEB] mx-auto" />
        <p className="text-xs text-gray-500 font-medium">Loading corporate settings from database...</p>
      </div>
    );
  }

  if (error || !settings) {
    return (
      <div className="py-20 text-center space-y-3 max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
        <p className="text-sm text-gray-900 font-bold">{error || "Settings not available."}</p>
        <button
          onClick={fetchSettings}
          className="text-xs text-[#13CDEB] underline font-semibold"
        >
          Try Reloading
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#101D36] text-white shadow-2xl border border-[#13CDEB]/40 flex items-center space-x-3 text-xs animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#13CDEB]" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            <Settings className="w-3.5 h-3.5 text-[#13CDEB]" />
            <span>Global Configuration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            System Settings & Identity
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage company brand details, corporate contact channels, social networks, and footer disclosures.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#101D36] text-[#13CDEB] text-xs font-bold hover:bg-navy/90 transition-all shadow-md shadow-[#13CDEB]/10 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "profile"
              ? "bg-[#101D36] text-[#13CDEB] shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Company Profile</span>
        </button>

        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "contact"
              ? "bg-[#101D36] text-[#13CDEB] shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Information</span>
        </button>

        <button
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "social"
              ? "bg-[#101D36] text-[#13CDEB] shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Media Links</span>
        </button>

        <button
          onClick={() => setActiveTab("footer")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "footer"
              ? "bg-[#101D36] text-[#13CDEB] shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Footer & Legal</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* =========================================================================
            1. COMPANY PROFILE
            ========================================================================= */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#13CDEB]" />
                Company Branding & Identity
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Primary organization branding displayed across public headers, metadata, and logos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.company_profile.companyName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company_profile: { ...settings.company_profile, companyName: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Brand Logo Text
                </label>
                <input
                  type="text"
                  value={settings.company_profile.logoText}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company_profile: { ...settings.company_profile, logoText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Corporate Tagline / Mission
                </label>
                <input
                  type="text"
                  value={settings.company_profile.tagline}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company_profile: { ...settings.company_profile, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Company Logo URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://... logo image url"
                  value={settings.company_profile.logoUrl || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company_profile: { ...settings.company_profile, logoUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Founded Year
                </label>
                <input
                  type="text"
                  value={settings.company_profile.foundedYear}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      company_profile: { ...settings.company_profile, foundedYear: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            2. CONTACT INFORMATION
            ========================================================================= */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#13CDEB]" />
                Official Corporate Channels
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Contact information surfaced across the website contact page, navigation, and consultation CTAs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Primary Inquiries Email
                </label>
                <input
                  type="email"
                  value={settings.contact_info.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact_info: { ...settings.contact_info, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Technical Support Email
                </label>
                <input
                  type="email"
                  value={settings.contact_info.supportEmail}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact_info: { ...settings.contact_info, supportEmail: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Corporate Phone Number
                </label>
                <input
                  type="text"
                  value={settings.contact_info.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact_info: { ...settings.contact_info, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Business Operating Hours
                </label>
                <input
                  type="text"
                  value={settings.contact_info.businessHours}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact_info: { ...settings.contact_info, businessHours: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Headquarters Physical Address
                </label>
                <input
                  type="text"
                  value={settings.contact_info.address}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact_info: { ...settings.contact_info, address: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. SOCIAL MEDIA LINKS
            ========================================================================= */}
        {activeTab === "social" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#13CDEB]" />
                Official Social Media Profiles
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Target URLs for social media icons displayed in website footer and team profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  LinkedIn Company Page
                </label>
                <input
                  type="url"
                  value={settings.social_links.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social_links: { ...settings.social_links, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  GitHub Organization
                </label>
                <input
                  type="url"
                  value={settings.social_links.github}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social_links: { ...settings.social_links, github: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Twitter / X Profile
                </label>
                <input
                  type="url"
                  value={settings.social_links.twitter}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social_links: { ...settings.social_links, twitter: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Instagram Profile
                </label>
                <input
                  type="url"
                  value={settings.social_links.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      social_links: { ...settings.social_links, instagram: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            4. FOOTER & COMPLIANCE
            ========================================================================= */}
        {activeTab === "footer" && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#13CDEB]" />
                Footer Content & Disclaimers
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Copyright notices, compliance certifications, and security claims.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Copyright Notice Line
                </label>
                <input
                  type="text"
                  value={settings.footer_info.copyrightText}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      footer_info: { ...settings.footer_info, copyrightText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Footer Summary Tagline
                </label>
                <input
                  type="text"
                  value={settings.footer_info.tagline}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      footer_info: { ...settings.footer_info, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                  Compliance & Security Badges Text
                </label>
                <input
                  type="text"
                  value={settings.footer_info.complianceText}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      footer_info: { ...settings.footer_info, complianceText: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#101D36] text-[#13CDEB] text-xs font-bold hover:bg-navy/90 transition-all shadow-md shadow-[#13CDEB]/10 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving All Configuration..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Save,
  FileText,
  ExternalLink,
  Users,
  Clock,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";

interface Career {
  id: string;
  slug: string;
  title: string;
  department: "LEADERSHIP" | "ENGINEERING" | "AI_CLOUD" | "PRODUCT_DESIGN" | "DEVOPS_CLOUD";
  location: string;
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  experience: "JUNIOR" | "MID_LEVEL" | "SENIOR" | "LEAD_STAFF" | "EXECUTIVE";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isActive: boolean;
  createdAt: string;
  _count?: {
    applications: number;
  };
}

interface JobApplication {
  id: string;
  careerId?: string | null;
  positionTitle?: string | null;
  applicantName: string;
  email: string;
  phone?: string | null;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  resumeUrl: string;
  coverNotes?: string | null;
  status: "NEW" | "REVIEWING" | "SCREENING" | "TECHNICAL_INTERVIEW" | "OFFER_EXTENDED" | "HIRED" | "REJECTED" | "WITHDRAWN";
  internalNotes?: string | null;
  createdAt: string;
  career?: {
    id: string;
    title: string;
    department: string;
  } | null;
}

const DEPARTMENTS = [
  { value: "ALL", label: "All Departments" },
  { value: "LEADERSHIP", label: "Executive Leadership" },
  { value: "ENGINEERING", label: "Software Engineering" },
  { value: "AI_CLOUD", label: "AI & Cloud Systems" },
  { value: "PRODUCT_DESIGN", label: "UI/UX & Product Design" },
  { value: "DEVOPS_CLOUD", label: "DevOps & Cloud Infra" },
];

const APPLICATION_STATUSES = [
  { value: "ALL", label: "All Application Stages" },
  { value: "NEW", label: "New Application" },
  { value: "REVIEWING", label: "Under Review" },
  { value: "SCREENING", label: "Initial Screening" },
  { value: "TECHNICAL_INTERVIEW", label: "Technical Interview" },
  { value: "OFFER_EXTENDED", label: "Offer Extended" },
  { value: "HIRED", label: "Hired" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WITHDRAWN", label: "Withdrawn" },
];

export default function CareersManagementPage() {
  const [activeTab, setActiveTab] = useState<"openings" | "applications">("openings");

  // Openings state
  const [careers, setCareers] = useState<Career[]>([]);
  const [loadingCareers, setLoadingCareers] = useState(true);
  const [careerError, setCareerError] = useState<string | null>(null);
  const [careerSearch, setCareerSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Openings modal state
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [savingCareer, setSavingCareer] = useState(false);
  const [careerFormSuccess, setCareerFormSuccess] = useState<string | null>(null);
  const [careerFormError, setCareerFormError] = useState<string | null>(null);

  const [careerForm, setCareerForm] = useState({
    title: "",
    department: "ENGINEERING",
    location: "Remote / Hyderabad, India",
    type: "FULL_TIME",
    experience: "SENIOR",
    summary: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    isActive: true,
  });

  // Delete career state
  const [deleteCareerId, setDeleteCareerId] = useState<string | null>(null);
  const [deletingCareer, setDeletingCareer] = useState(false);

  // Applications state
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [appError, setAppError] = useState<string | null>(null);
  const [appSearch, setAppSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Application details modal
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [updatingAppStatus, setUpdatingAppStatus] = useState(false);
  const [internalNotesInput, setInternalNotesInput] = useState("");

  // Delete application state
  const [deleteAppId, setDeleteAppId] = useState<string | null>(null);
  const [deletingApp, setDeletingApp] = useState(false);

  // Fetch Careers
  const fetchCareers = useCallback(async () => {
    try {
      setLoadingCareers(true);
      setCareerError(null);
      const params = new URLSearchParams();
      if (careerSearch) params.append("search", careerSearch);
      if (deptFilter !== "ALL") params.append("department", deptFilter);
      if (activeFilter === "true") params.append("active", "true");
      if (activeFilter === "false") params.append("active", "false");

      const res = await fetch(`/api/admin/careers?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load careers");
      }

      setCareers(data.data || []);
    } catch (err: unknown) {
      setCareerError(err instanceof Error ? err.message : "Error fetching careers");
    } finally {
      setLoadingCareers(false);
    }
  }, [careerSearch, deptFilter, activeFilter]);

  // Fetch Applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoadingApps(true);
      setAppError(null);
      const params = new URLSearchParams();
      if (appSearch) params.append("search", appSearch);
      if (statusFilter !== "ALL") params.append("status", statusFilter);

      const res = await fetch(`/api/admin/careers/applications?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load job applications");
      }

      setApplications(data.data || []);
    } catch (err: unknown) {
      setAppError(err instanceof Error ? err.message : "Error fetching applications");
    } finally {
      setLoadingApps(false);
    }
  }, [appSearch, statusFilter]);

  useEffect(() => {
    if (activeTab === "openings") {
      fetchCareers();
    } else {
      fetchApplications();
    }
  }, [activeTab, fetchCareers, fetchApplications]);

  // Career Form Handlers
  const openCreateCareer = () => {
    setEditingCareer(null);
    setCareerForm({
      title: "",
      department: "ENGINEERING",
      location: "Remote / Hyderabad, India",
      type: "FULL_TIME",
      experience: "SENIOR",
      summary: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
      isActive: true,
    });
    setCareerFormError(null);
    setCareerFormSuccess(null);
    setIsCareerModalOpen(true);
  };

  const openEditCareer = (career: Career) => {
    setEditingCareer(career);
    setCareerForm({
      title: career.title,
      department: career.department,
      location: career.location,
      type: career.type,
      experience: career.experience,
      summary: career.summary,
      responsibilities: career.responsibilities.join("\n"),
      requirements: career.requirements.join("\n"),
      benefits: career.benefits.join("\n"),
      isActive: career.isActive,
    });
    setCareerFormError(null);
    setCareerFormSuccess(null);
    setIsCareerModalOpen(true);
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCareer(true);
    setCareerFormError(null);

    const payload = {
      title: careerForm.title,
      department: careerForm.department,
      location: careerForm.location,
      type: careerForm.type,
      experience: careerForm.experience,
      summary: careerForm.summary,
      responsibilities: careerForm.responsibilities.split("\n").map((r) => r.trim()).filter(Boolean),
      requirements: careerForm.requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      benefits: careerForm.benefits.split("\n").map((b) => b.trim()).filter(Boolean),
      isActive: careerForm.isActive,
    };

    try {
      const url = editingCareer ? `/api/admin/careers/${editingCareer.id}` : "/api/admin/careers";
      const method = editingCareer ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save career opening");
      }

      setCareerFormSuccess(editingCareer ? "Vacancy updated successfully!" : "Vacancy created successfully!");
      setTimeout(() => {
        setIsCareerModalOpen(false);
        fetchCareers();
      }, 700);
    } catch (err: unknown) {
      setCareerFormError(err instanceof Error ? err.message : "Error saving vacancy");
    } finally {
      setSavingCareer(false);
    }
  };

  const toggleCareerStatus = async (career: Career) => {
    try {
      const res = await fetch(`/api/admin/careers/${career.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !career.isActive }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to toggle status");
      }

      setCareers((prev) =>
        prev.map((c) => (c.id === career.id ? { ...c, isActive: !c.isActive } : c))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to toggle status");
    }
  };

  const handleDeleteCareer = async (id: string) => {
    setDeletingCareer(true);
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete");
      setDeleteCareerId(null);
      fetchCareers();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error deleting opening");
    } finally {
      setDeletingCareer(false);
    }
  };

  // Application Handlers
  const handleUpdateAppStatus = async (appId: string, newStatus: string) => {
    setUpdatingAppStatus(true);
    try {
      const res = await fetch(`/api/admin/careers/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          internalNotes: internalNotesInput,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update status");

      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus as JobApplication["status"], internalNotes: internalNotesInput } : a))
      );

      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp({ ...selectedApp, status: newStatus as JobApplication["status"], internalNotes: internalNotesInput });
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating application");
    } finally {
      setUpdatingAppStatus(false);
    }
  };

  const handleDeleteApp = async (id: string) => {
    setDeletingApp(true);
    try {
      const res = await fetch(`/api/admin/careers/applications/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete application");

      setDeleteAppId(null);
      if (selectedApp?.id === id) setSelectedApp(null);
      fetchApplications();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error deleting application");
    } finally {
      setDeletingApp(false);
    }
  };

  const getStatusBadge = (status: JobApplication["status"]) => {
    switch (status) {
      case "NEW":
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800">New</span>;
      case "REVIEWING":
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Reviewing</span>;
      case "SCREENING":
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Screening</span>;
      case "TECHNICAL_INTERVIEW":
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Tech Interview</span>;
      case "OFFER_EXTENDED":
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Offer Extended</span>;
      case "HIRED":
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">Hired</span>;
      case "REJECTED":
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-800">Rejected</span>;
      default:
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101D36] tracking-tight flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#13CDEB]" />
            Careers & Talent Pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage engineering vacancies, candidate submissions, resumes, and hiring stages.
          </p>
        </div>

        {activeTab === "openings" && (
          <button
            onClick={openCreateCareer}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#101D36] to-[#1a2d52] hover:to-[#13CDEB] text-white font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Create Vacancy
          </button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("openings")}
          className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "openings"
              ? "border-[#13CDEB] text-[#101D36]"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Job Openings ({careers.length})
        </button>

        <button
          onClick={() => setActiveTab("applications")}
          className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "applications"
              ? "border-[#13CDEB] text-[#101D36]"
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          <Users className="w-4 h-4" />
          Job Applications ({applications.length})
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: JOB OPENINGS                                                  */}
      {/* ==================================================================== */}
      {activeTab === "openings" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search job title, location..."
                value={careerSearch}
                onChange={(e) => setCareerSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>

              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30"
              >
                <option value="ALL">All Status</option>
                <option value="true">Active Vacancies</option>
                <option value="false">Closed / Inactive</option>
              </select>

              <button
                onClick={() => fetchCareers()}
                title="Refresh"
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {careerError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{careerError}</span>
            </div>
          )}

          {/* Careers Grid */}
          {loadingCareers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-700">No vacancies found</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Create new job postings to attract senior engineers and technical architects.
              </p>
              <button
                onClick={openCreateCareer}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#101D36] text-white rounded-xl font-medium hover:bg-[#13CDEB] hover:text-[#101D36] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Post First Vacancy
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((career) => (
                <div
                  key={career.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${
                    career.isActive ? "border-slate-200/80" : "border-slate-200 opacity-60 bg-slate-50/50"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="inline-block text-[10px] font-semibold text-[#13CDEB] uppercase tracking-wider bg-cyan-50 px-2 py-0.5 rounded mb-1">
                          {career.department.replace("_", " ")}
                        </span>
                        <h3 className="font-bold text-[#101D36] text-lg leading-tight">{career.title}</h3>
                      </div>

                      <button
                        onClick={() => toggleCareerStatus(career)}
                        title={career.isActive ? "Active Opening (Click to close)" : "Closed Opening (Click to open)"}
                        className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                          career.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {career.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{career.summary}</p>

                    <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{career.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{career.type.replace("_", " ")} &bull; {career.experience.replace("_", " ")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-600 font-semibold">
                        <Users className="w-3.5 h-3.5" />
                        <span>{career._count?.applications || 0} candidate applications</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card Actions */}
                  <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {career.isActive ? (
                        <span className="text-emerald-600 font-semibold">Open Vacancy</span>
                      ) : (
                        <span className="text-slate-400">Closed / Hidden</span>
                      )}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditCareer(career)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#101D36] hover:bg-slate-200 transition-colors"
                        title="Edit Vacancy"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteCareerId(career.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete Vacancy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: CANDIDATE APPLICATIONS                                        */}
      {/* ==================================================================== */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          {/* Applications Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search applicant name, email, or role..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30"
              >
                {APPLICATION_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => fetchApplications()}
                title="Refresh"
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {appError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{appError}</span>
            </div>
          )}

          {/* Applications Table */}
          {loadingApps ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-700">No applications found</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Candidate submissions from the public careers page will appear here.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs font-semibold text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Position</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Applied Date</th>
                      <th className="px-6 py-4">Resume</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          <div>{app.applicantName}</div>
                          <div className="text-xs text-slate-400 font-normal">{app.email}</div>
                          {app.phone && <div className="text-xs text-slate-400 font-normal">{app.phone}</div>}
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#101D36]">
                          {app.positionTitle || app.career?.title || "General Application"}
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {new Date(app.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#13CDEB] hover:text-[#101D36] transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Resume
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setInternalNotesInput(app.internalNotes || "");
                              }}
                              className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-[#101D36] hover:text-white rounded-lg font-semibold transition-colors"
                            >
                              Review
                            </button>
                            <button
                              onClick={() => setDeleteAppId(app.id)}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* APPLICATION REVIEW MODAL                                             */}
      {/* ==================================================================== */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#101D36]">Candidate Application Review</h3>
                <p className="text-xs text-slate-500">
                  {selectedApp.applicantName} &bull; {selectedApp.positionTitle || "General Opening"}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Full Name</span>
                  <span className="font-semibold text-slate-800">{selectedApp.applicantName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Email Address</span>
                  <a href={`mailto:${selectedApp.email}`} className="text-[#13CDEB] font-semibold hover:underline">
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Phone Number</span>
                  <span className="text-slate-800">{selectedApp.phone || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Applied Position</span>
                  <span className="font-semibold text-[#101D36]">{selectedApp.positionTitle || "General Opening"}</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 text-xs font-semibold">
                {selectedApp.linkedinUrl && (
                  <a
                    href={selectedApp.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> LinkedIn Profile
                  </a>
                )}
                {selectedApp.portfolioUrl && (
                  <a
                    href={selectedApp.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Portfolio Website
                  </a>
                )}
                <a
                  href={selectedApp.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#13CDEB] font-bold hover:underline ml-auto"
                >
                  <FileText className="w-4 h-4" /> Download / View Resume
                </a>
              </div>

              {/* Cover Letter */}
              {selectedApp.coverNotes && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Cover Letter / Notes:
                  </h4>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 whitespace-pre-wrap leading-relaxed text-xs">
                    {selectedApp.coverNotes}
                  </div>
                </div>
              )}

              {/* Update Status Section */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Application Stage:
                  </label>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleUpdateAppStatus(selectedApp.id, e.target.value)}
                    disabled={updatingAppStatus}
                    className="w-full text-sm font-semibold border border-slate-300 rounded-xl px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30"
                  >
                    {APPLICATION_STATUSES.filter((s) => s.value !== "ALL").map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Internal Hiring Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={internalNotesInput}
                    onChange={(e) => setInternalNotesInput(e.target.value)}
                    placeholder="Enter interview feedback, compensation notes, or architect assessment..."
                    className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleUpdateAppStatus(selectedApp.id, selectedApp.status)}
                      disabled={updatingAppStatus}
                      className="px-4 py-2 text-xs font-semibold bg-[#101D36] text-white rounded-xl hover:bg-[#13CDEB] hover:text-[#101D36] transition-colors disabled:opacity-50"
                    >
                      {updatingAppStatus ? "Saving..." : "Save Internal Notes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* VACANCY CREATE / EDIT MODAL                                          */}
      {/* ==================================================================== */}
      {isCareerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#101D36]">
                  {editingCareer ? "Edit Job Vacancy" : "Create New Job Opening"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish openings on the public Handvance Careers page.
                </p>
              </div>
              <button
                onClick={() => setIsCareerModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCareerSubmit} className="p-6 overflow-y-auto space-y-4">
              {careerFormError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{careerFormError}</span>
                </div>
              )}

              {careerFormSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{careerFormSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={careerForm.title}
                    onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                    placeholder="e.g. Senior Full-Stack Cloud Engineer"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={careerForm.department}
                    onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value as Career["department"] })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none bg-white"
                  >
                    <option value="ENGINEERING">Software Engineering</option>
                    <option value="AI_CLOUD">AI & Cloud Systems</option>
                    <option value="PRODUCT_DESIGN">UI/UX & Product Design</option>
                    <option value="DEVOPS_CLOUD">Cloud & DevOps</option>
                    <option value="LEADERSHIP">Executive Leadership</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={careerForm.location}
                    onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                    placeholder="Remote / Hyderabad, India"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={careerForm.type}
                    onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value as Career["type"] })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none bg-white"
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                  <select
                    value={careerForm.experience}
                    onChange={(e) => setCareerForm({ ...careerForm, experience: e.target.value as Career["experience"] })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none bg-white"
                  >
                    <option value="SENIOR">Senior (5+ yrs)</option>
                    <option value="LEAD_STAFF">Lead / Staff Architect</option>
                    <option value="MID_LEVEL">Mid-Level (3-5 yrs)</option>
                    <option value="JUNIOR">Junior (1-2 yrs)</option>
                    <option value="EXECUTIVE">Executive / Director</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role Summary</label>
                <textarea
                  rows={2}
                  value={careerForm.summary}
                  onChange={(e) => setCareerForm({ ...careerForm, summary: e.target.value })}
                  placeholder="Overview of the mission, core technologies, and engineering objectives..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={3}
                  value={careerForm.responsibilities}
                  onChange={(e) => setCareerForm({ ...careerForm, responsibilities: e.target.value })}
                  placeholder="Architect scalable microservices in TypeScript & Node.js&#10;Lead sprint design reviews and technical mentoring"
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Requirements (one per line)
                </label>
                <textarea
                  rows={3}
                  value={careerForm.requirements}
                  onChange={(e) => setCareerForm({ ...careerForm, requirements: e.target.value })}
                  placeholder="Strong knowledge of Next.js App Router, Prisma ORM, and PostgreSQL&#10;Experience deploying high-availability services on AWS or Vercel"
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="careerActiveCheck"
                  checked={careerForm.isActive}
                  onChange={(e) => setCareerForm({ ...careerForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-[#13CDEB] focus:ring-[#13CDEB]"
                />
                <label htmlFor="careerActiveCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Publish vacancy on live careers portal
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCareerModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCareer}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm bg-[#101D36] text-white rounded-xl font-semibold hover:bg-[#13CDEB] hover:text-[#101D36] transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {savingCareer ? "Saving..." : editingCareer ? "Save Changes" : "Create Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Career Modal */}
      {deleteCareerId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Delete Job Opening?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              This will remove the job opening and any associated applicant submissions.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteCareerId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCareer(deleteCareerId)}
                disabled={deletingCareer}
                className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {deletingCareer ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete App Modal */}
      {deleteAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Delete Job Application?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              This candidate application will be permanently removed from the database.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteAppId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteApp(deleteAppId)}
                disabled={deletingApp}
                className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {deletingApp ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

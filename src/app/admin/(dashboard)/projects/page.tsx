"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Save,
  Globe,
  Code2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

interface Project {
  id: string;
  slug: string;
  title: string;
  clientIndustry: string;
  category: "WEB_SAAS" | "MOBILE_APPS" | "AI_SYSTEMS" | "ECOMMERCE" | "CUSTOM_SOFTWARE";
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  results: string[];
  technologies: string[];
  featured: boolean;
  liveDemoUrl?: string | null;
  githubUrl?: string | null;
  coverImageUrl?: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
}

const projectCategories = [
  { value: "ALL", label: "All Categories" },
  { value: "WEB_SAAS", label: "Web & SaaS" },
  { value: "AI_SYSTEMS", label: "AI & Systems" },
  { value: "MOBILE_APPS", label: "Mobile Apps" },
  { value: "ECOMMERCE", label: "E-Commerce" },
  { value: "CUSTOM_SOFTWARE", label: "Custom Software" },
];

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modals & Action States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "WEB_SAAS",
    clientIndustry: "",
    tagline: "",
    summary: "",
    challenge: "",
    solution: "",
    technologies: "",
    keyFeatures: "",
    results: "",
    coverImageUrl: "",
    liveDemoUrl: "",
    githubUrl: "",
    featured: false,
    status: "PUBLISHED",
  });

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (categoryFilter !== "ALL") params.set("category", categoryFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "12");

      const res = await fetch(`/api/admin/projects?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load projects");
      }

      setProjects(data.projects || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || 0);
    } catch (err: unknown) {
      console.error("Fetch projects error:", err);
      const msg = err instanceof Error ? err.message : "Failed to load projects.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, statusFilter, page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Open Form for Create
  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "WEB_SAAS",
      clientIndustry: "Financial Technology",
      tagline: "",
      summary: "",
      challenge: "",
      solution: "",
      technologies: "Next.js, TypeScript, PostgreSQL, Tailwind CSS",
      keyFeatures: "Sub-100ms real-time event processing\nRole-based multi-tenant security architecture\nInteractive analytics dashboard",
      results: "40% reduction in cloud infrastructure expenses\n10x increase in concurrent transaction volume",
      coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      liveDemoUrl: "https://handvance-technologies.vercel.app",
      githubUrl: "",
      featured: false,
      status: "PUBLISHED",
    });
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      clientIndustry: project.clientIndustry,
      tagline: project.tagline,
      summary: project.summary,
      challenge: project.challenge,
      solution: project.solution,
      technologies: project.technologies.join(", "),
      keyFeatures: project.keyFeatures.join("\n"),
      results: project.results.join("\n"),
      coverImageUrl: project.coverImageUrl || "",
      liveDemoUrl: project.liveDemoUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
      status: project.status,
    });
    setIsFormOpen(true);
  };

  // Submit Create or Edit Form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) {
      alert("Please fill in the project title and description summary.");
      return;
    }

    try {
      setIsSubmitting(true);
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : "/api/admin/projects";
      const method = editingProject ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save project");
      }

      setIsFormOpen(false);
      fetchProjects();
      showNotice(
        editingProject
          ? `Project "${data.project.title}" updated successfully.`
          : `Project "${data.project.title}" created and published.`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit project.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Featured Status
  const handleToggleFeatured = async (project: Project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      const data = await res.json();

      if (data.success && data.project) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, featured: data.project.featured } : p))
        );
        showNotice(
          data.project.featured
            ? `Marked "${project.title}" as Featured on Home & Portfolio.`
            : `Unfeatured "${project.title}".`
        );
      }
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  // Toggle Published Status
  const handleToggleStatus = async (project: Project) => {
    const newStatus = project.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success && data.project) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, status: data.project.status } : p))
        );
        showNotice(
          newStatus === "PUBLISHED"
            ? `"${project.title}" is now LIVE on public portfolio!`
            : `"${project.title}" changed to DRAFT (hidden from public).`
        );
      }
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  // Handle Project Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/projects/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setTotalCount((prev) => Math.max(0, prev - 1));
        setDeleteTarget(null);
        showNotice("Project deleted successfully from portfolio.");
      }
    } catch (err) {
      console.error("Delete project error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
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
            <Layers className="w-3.5 h-3.5 text-[#13CDEB]" />
            <span>Deliverables & Case Studies</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Portfolio Management
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
              {totalCount} Total
            </span>
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => fetchProjects()}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#101D36] text-[#13CDEB] text-xs font-bold hover:bg-navy/90 transition-all shadow-md shadow-[#13CDEB]/10 hover:shadow-cyan-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, industry, summary, tech..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#13CDEB] focus:bg-white transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {projectCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setCategoryFilter(cat.value);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  categoryFilter === cat.value
                    ? "bg-[#101D36] text-[#13CDEB] shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>

            <button
              onClick={() => {
                setStatusFilter(statusFilter === "PUBLISHED" ? "ALL" : "PUBLISHED");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "PUBLISHED"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Published Only
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-gray-200/80">
          <RefreshCw className="w-6 h-6 animate-spin text-[#13CDEB] mx-auto mb-2" />
          <p className="text-xs text-gray-500 font-medium">Loading portfolio projects from database...</p>
        </div>
      ) : error ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-gray-200/80">
          <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
          <p className="text-sm text-gray-800 font-bold">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-gray-200/80 space-y-4">
          <Layers className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-800">No Projects Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {search || categoryFilter !== "ALL"
              ? "No portfolio deliverables match your search and filter parameters."
              : "No projects have been published to the portfolio yet. Click below to add your first flagship case study."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-[#101D36] text-[#13CDEB] text-xs font-bold shadow-md"
          >
            Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
            >
              {/* Image Preview & Badges */}
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                {project.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.coverImageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#101D36] to-[#1B2A4A] text-white/40">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#101D36] shadow-xs">
                    {project.category.replace("_", " ")}
                  </span>
                  <span
                    onClick={() => handleToggleStatus(project)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full cursor-pointer shadow-xs transition-colors ${
                      project.status === "PUBLISHED"
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                    }`}
                    title="Click to toggle Published / Draft"
                  >
                    {project.status}
                  </span>
                </div>

                {/* Featured Star Toggle */}
                <button
                  onClick={() => handleToggleFeatured(project)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-all ${
                    project.featured
                      ? "bg-amber-400 text-white shadow-md shadow-amber-400/30"
                      : "bg-white/80 text-gray-400 hover:text-amber-500 hover:bg-white"
                  }`}
                  title={project.featured ? "Featured Project" : "Click to mark Featured"}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {project.clientIndustry}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mt-0.5 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors"
                        title="View Live Link"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors"
                        title="View Repository"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={`/portfolio/${project.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Preview Case Study Page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(project)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && projects.length > 0 && totalPages > 1 && (
        <div className="py-3 px-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between text-xs text-gray-500">
          <div>
            Showing Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
            <span className="font-semibold text-gray-800">{totalPages}</span> ({totalCount} total projects)
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT PROJECT MODAL
          ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFormOpen(false)}
          />

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingProject ? "Edit Portfolio Project" : "Add Flagship Project"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Published projects immediately synchronize with the public portfolio and case study pages.
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitForm} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ApexFlow Financial Engine"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white font-semibold focus:outline-none focus:border-[#13CDEB]"
                  >
                    <option value="WEB_SAAS">Web & SaaS</option>
                    <option value="AI_SYSTEMS">AI & Systems</option>
                    <option value="MOBILE_APPS">Mobile Apps</option>
                    <option value="ECOMMERCE">E-Commerce</option>
                    <option value="CUSTOM_SOFTWARE">Custom Software</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Industry */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Client Industry
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Financial Technology & Banking"
                    value={formData.clientIndustry}
                    onChange={(e) => setFormData({ ...formData, clientIndustry: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Tagline / One-Liner
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. High-throughput cloud ledger and automated payment engine"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Executive Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Overview of the client problem, solution delivered, and measurable outcomes..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Challenge */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    The Technical Challenge
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specific architectural hurdles, performance bottlenecks, or constraints..."
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>

                {/* Solution */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Engineering Solution Delivered
                  </label>
                  <textarea
                    rows={2}
                    placeholder="How Handvance Technologies engineered the architecture and resolved it..."
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, TypeScript, Go, Kafka, PostgreSQL, Tailwind CSS"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                />
              </div>

              {/* Key Features & Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Key Features (one per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Sub-100ms clearing&#10;PCI-DSS Level 1 compliance&#10;Real-time WebSocket dashboard"
                    value={formData.keyFeatures}
                    onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 font-mono text-[11px] focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Verified Results (one per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="40% lower cloud compute costs&#10;10x higher concurrent transaction throughput"
                    value={formData.results}
                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 font-mono text-[11px] focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>
              </div>

              {/* Cover Image URL & Preview */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or Supabase storage public URL"
                    value={formData.coverImageUrl}
                    onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>
                {formData.coverImageUrl && (
                  <div className="mt-2 h-24 w-44 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.coverImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* URLs: Live Demo & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Live Demo / Project URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    GitHub Repository URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>
              </div>

              {/* Featured & Published Controls */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#13CDEB] focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-gray-800">Featured Project</span>
                    <p className="text-[10px] text-gray-400">Display prominently on Home & Portfolio top showcase</p>
                  </div>
                </label>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold text-gray-600">Publication State:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-3 py-1.5 rounded-lg border bg-white font-bold text-xs"
                  >
                    <option value="PUBLISHED">Published (Live)</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#101D36] text-[#13CDEB] font-bold hover:bg-navy/90 transition-all flex items-center space-x-2 shadow-md disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? "Saving Project..." : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && projects.length > 0 && totalPages > 1 && (
        <div className="py-3 px-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between text-xs text-gray-500">
          <div>
            Showing Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
            <span className="font-semibold text-gray-800">{totalPages}</span> ({totalCount} total projects)
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONFIRM DELETE DIALOG
          ========================================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDeleteTarget(null)}
          />

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md z-10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-bold text-gray-900">Delete Project?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to permanently delete{" "}
                <span className="font-bold text-gray-800">{deleteTarget.title}</span> from the
                portfolio? This case study will be removed immediately.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Deleting..." : "Confirm Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && projects.length > 0 && totalPages > 1 && (
        <div className="py-3 px-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between text-xs text-gray-500">
          <div>
            Showing Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
            <span className="font-semibold text-gray-800">{totalPages}</span> ({totalCount} total projects)
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

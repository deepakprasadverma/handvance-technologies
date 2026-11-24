"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  MessageSquare,
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
  Eye,
  EyeOff,
  Building,
} from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string | null;
  projectScope: string;
  rating: number;
  featured: boolean;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [featuredFilter, setFeaturedFilter] = useState("ALL");

  // Create / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    author: "",
    role: "",
    company: "",
    quote: "",
    avatarUrl: "",
    projectScope: "Enterprise Cloud Modernization",
    rating: 5,
    featured: true,
    sortOrder: 0,
    status: "PUBLISHED" as Testimonial["status"],
  });

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (featuredFilter === "true") params.append("featured", "true");
      if (featuredFilter === "false") params.append("featured", "false");

      const res = await fetch(`/api/admin/testimonials?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch testimonials");
      }

      setTestimonials(data.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching testimonials");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, featuredFilter]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      author: "",
      role: "",
      company: "",
      quote: "",
      avatarUrl: "",
      projectScope: "Enterprise Cloud Modernization",
      rating: 5,
      featured: true,
      sortOrder: testimonials.length,
      status: "PUBLISHED",
    });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setForm({
      author: item.author,
      role: item.role,
      company: item.company,
      quote: item.quote,
      avatarUrl: item.avatarUrl || "",
      projectScope: item.projectScope,
      rating: item.rating,
      featured: item.featured,
      sortOrder: item.sortOrder,
      status: item.status,
    });
    setFormError(null);
    setFormSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    const payload = {
      author: form.author,
      role: form.role,
      company: form.company,
      quote: form.quote,
      avatarUrl: form.avatarUrl || null,
      projectScope: form.projectScope,
      rating: Number(form.rating) || 5,
      featured: form.featured,
      sortOrder: Number(form.sortOrder) || 0,
      status: form.status,
    };

    try {
      const url = editingItem ? `/api/admin/testimonials/${editingItem.id}` : "/api/admin/testimonials";
      const method = editingItem ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save testimonial");
      }

      setFormSuccess(editingItem ? "Testimonial updated!" : "Testimonial published!");
      setTimeout(() => {
        setIsModalOpen(false);
        fetchTestimonials();
      }, 700);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Error saving testimonial");
    } finally {
      setSaving(false);
    }
  };

  const togglePublishStatus = async (item: Testimonial) => {
    const nextStatus = item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to toggle status");

      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, status: nextStatus } : t))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to toggle status");
    }
  };

  const toggleFeatured = async (item: Testimonial) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !item.featured }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to toggle featured");

      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, featured: !t.featured } : t))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to toggle featured");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete");

      setDeleteConfirmId(null);
      fetchTestimonials();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error deleting testimonial");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101D36] tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-[#13CDEB]" />
            Testimonials & Client Endorsements
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Approve, publish, and manage verified executive testimonials displayed across Handvance Technologies.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#101D36] to-[#1a2d52] hover:to-[#13CDEB] text-white font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search author, company, or quote..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Draft / Under Review</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#13CDEB]/30"
          >
            <option value="ALL">All Items</option>
            <option value="true">Featured On Homepage</option>
            <option value="false">Standard</option>
          </select>

          <button
            onClick={() => fetchTestimonials()}
            title="Refresh"
            className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Testimonials Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No testimonials found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Add client endorsements, case study quotes, and partner recommendations.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#101D36] text-white rounded-xl font-medium hover:bg-[#13CDEB] hover:text-[#101D36] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${
                item.status === "PUBLISHED"
                  ? "border-slate-200/80"
                  : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-[#101D36] to-[#13CDEB] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-inner">
                      {item.avatarUrl ? (
                        <Image
                          src={item.avatarUrl}
                          alt={item.author}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        item.author
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#101D36] text-base leading-snug">{item.author}</h3>
                      <p className="text-xs text-slate-500 font-medium">{item.role}</p>
                      <div className="flex items-center gap-1 text-xs text-[#13CDEB] font-semibold mt-0.5">
                        <Building className="w-3 h-3" />
                        <span>{item.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFeatured(item)}
                      title={item.featured ? "Featured on Home (Click to remove)" : "Click to feature"}
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        item.featured
                          ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                          : "bg-slate-100 text-slate-400 hover:text-amber-500 hover:bg-slate-200"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${item.featured ? "fill-current" : ""}`} />
                    </button>

                    <button
                      onClick={() => togglePublishStatus(item)}
                      title={item.status === "PUBLISHED" ? "Published (Click to draft)" : "Draft (Click to publish)"}
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        item.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {item.status === "PUBLISHED" ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        idx < item.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-semibold text-slate-400 ml-1.5">
                    ({item.rating}.0)
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-xs text-slate-600 italic line-clamp-4 leading-relaxed mb-4">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md">
                  Project: <span className="text-[#101D36]">{item.projectScope}</span>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold">
                  {item.status === "PUBLISHED" ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Published
                    </span>
                  ) : (
                    <span className="text-slate-400">Draft / Review</span>
                  )}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-[#101D36] hover:bg-slate-200 transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#101D36]">
                  {editingItem ? "Edit Client Testimonial" : "Add Client Testimonial"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified customer reviews and executive testimonials.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Chief Technology Officer"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. FinTech Innovations Ltd"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Scope / Solution</label>
                  <input
                    type="text"
                    value={form.projectScope}
                    onChange={(e) => setForm({ ...form, projectScope: e.target.value })}
                    placeholder="e.g. Cloud Architecture & Microservices"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Avatar / Headshot URL</label>
                <input
                  type="text"
                  value={form.avatarUrl}
                  onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Handvance delivered our enterprise migration on-time and with zero downtime. Exceptional architectural mastery..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none bg-white font-semibold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5.0 (Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ 4.0 (Great)</option>
                    <option value={3}>⭐⭐⭐ 3.0 (Satisfactory)</option>
                    <option value={2}>⭐⭐ 2.0 (Needs Improvement)</option>
                    <option value={1}>⭐ 1.0 (Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as Testimonial["status"] })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#13CDEB]/30 focus:border-[#13CDEB] outline-none bg-white font-semibold"
                  >
                    <option value="PUBLISHED">Published (Visible Publicly)</option>
                    <option value="DRAFT">Draft / Review</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredReviewCheck"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#13CDEB] focus:ring-[#13CDEB]"
                />
                <label htmlFor="featuredReviewCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Feature prominently on Home page and landing screens
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm bg-[#101D36] text-white rounded-xl font-semibold hover:bg-[#13CDEB] hover:text-[#101D36] transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : editingItem ? "Save Changes" : "Publish Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Delete Testimonial?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              This review will be permanently deleted from the database.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

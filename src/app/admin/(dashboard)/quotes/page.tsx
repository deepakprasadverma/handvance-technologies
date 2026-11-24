"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Search,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  Mail,
  Building,
  DollarSign,
  Calendar,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  MessageSquare,
} from "lucide-react";

interface QuoteRequest {
  id: string;
  contactName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  projectType: string;
  estimatedBudget?: string | null;
  targetTimeline?: string | null;
  projectDetails: string;
  additionalRequirements?: string | null;
  status: "PENDING" | "UNDER_REVIEW" | "ESTIMATE_PREPARED" | "PROPOSAL_SENT" | "ACCEPTED" | "DECLINED";
  estimatedAmount?: string | number | null;
  assignedArchitect?: string | null;
  internalNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

const quoteStatusOptions = [
  { value: "ALL", label: "All Quotes" },
  { value: "PENDING", label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "UNDER_REVIEW", label: "Under Review", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "ESTIMATE_PREPARED", label: "Estimate Prepared", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "ACCEPTED", label: "Accepted", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "DECLINED", label: "Declined", color: "bg-rose-100 text-rose-700 border-rose-200" },
];

export default function QuotesManagementPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modals & Action States
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [architectInput, setArchitectInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<QuoteRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "10");

      const res = await fetch(`/api/admin/quotes?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load quotes");
      }

      setQuotes(data.quotes || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || 0);
    } catch (err: unknown) {
      console.error("Fetch quotes error:", err);
      const msg = err instanceof Error ? err.message : "Failed to load quote requests.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  // Handle Quick Status Update
  const handleUpdateStatus = async (quoteId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success && data.quote) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === quoteId ? { ...q, status: data.quote.status } : q))
        );
        if (selectedQuote && selectedQuote.id === quoteId) {
          setSelectedQuote(data.quote);
        }
        showNotice(`Quote status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  // Handle Save Scoping & Notes
  const handleSaveDetails = async () => {
    if (!selectedQuote) return;
    try {
      setIsSaving(true);
      const res = await fetch(`/api/admin/quotes/${selectedQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          internalNotes: notesInput,
          assignedArchitect: architectInput || null,
          estimatedAmount: amountInput ? parseFloat(amountInput) : null,
        }),
      });
      const data = await res.json();

      if (data.success && data.quote) {
        setSelectedQuote(data.quote);
        setQuotes((prev) =>
          prev.map((q) => (q.id === selectedQuote.id ? data.quote : q))
        );
        showNotice("Quote details and notes saved successfully.");
      }
    } catch (err) {
      console.error("Save quote details error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Quote Delete
  const handleDeleteQuote = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/quotes/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setQuotes((prev) => prev.filter((q) => q.id !== deleteTarget.id));
        setTotalCount((prev) => Math.max(0, prev - 1));
        if (selectedQuote?.id === deleteTarget.id) {
          setSelectedQuote(null);
        }
        setDeleteTarget(null);
        showNotice("Quote request deleted successfully.");
      }
    } catch (err) {
      console.error("Delete quote error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const openDetailsModal = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setNotesInput(quote.internalNotes || "");
    setArchitectInput(quote.assignedArchitect || "");
    setAmountInput(quote.estimatedAmount ? String(quote.estimatedAmount) : "");
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            <FileText className="w-3.5 h-3.5 text-[#13CDEB]" />
            <span>Commercial Quotations</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Quote Request Management
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {totalCount} Total
            </span>
          </h1>
        </div>

        <button
          onClick={() => fetchQuotes()}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by contact, email, company, project type..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#13CDEB] focus:bg-white transition-colors"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {quoteStatusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setStatusFilter(opt.value);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === opt.value
                    ? "bg-[#101D36] text-[#13CDEB] shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#13CDEB] mx-auto" />
            <p className="text-xs text-gray-500 font-medium">Loading quote requests from database...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
            <p className="text-sm text-gray-800 font-bold">{error}</p>
            <button
              onClick={() => fetchQuotes()}
              className="text-xs text-[#13CDEB] underline font-semibold"
            >
              Try again
            </button>
          </div>
        ) : quotes.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <FileText className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="text-sm font-bold text-gray-800">No Quote Requests Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {search || statusFilter !== "ALL"
                ? "No quote requests match your active search and status filters."
                : "No customer quote requests exist in the database yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-500 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Customer & Company</th>
                  <th className="py-3.5 px-6">Project Scope</th>
                  <th className="py-3.5 px-6">Budget & Timeline</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Submitted</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((quote) => {
                  const statusConfig =
                    quoteStatusOptions.find((o) => o.value === quote.status) || quoteStatusOptions[1];

                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
                      onClick={() => openDetailsModal(quote)}
                    >
                      {/* Customer */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900">{quote.contactName}</div>
                        <div className="text-gray-500 text-[11px] font-mono">{quote.email}</div>
                        {quote.company && (
                          <div className="text-gray-400 text-[10px] mt-0.5">{quote.company}</div>
                        )}
                      </td>

                      {/* Project Scope */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{quote.projectType}</div>
                        <div className="text-gray-500 text-[11px] truncate max-w-xs mt-0.5">
                          {quote.projectDetails}
                        </div>
                      </td>

                      {/* Budget & Timeline */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-semibold text-gray-900 flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-emerald-600" />
                          <span>{quote.estimatedBudget || "Not specified"}</span>
                        </div>
                        <div className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-blue-500" />
                          <span>{quote.targetTimeline || "Flexible"}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={quote.status}
                          onChange={(e) => handleUpdateStatus(quote.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${statusConfig.color}`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="UNDER_REVIEW">Under Review</option>
                          <option value="ESTIMATE_PREPARED">Estimate Prepared</option>
                          <option value="PROPOSAL_SENT">Proposal Sent</option>
                          <option value="ACCEPTED">Accepted</option>
                          <option value="DECLINED">Declined</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-gray-500 text-[11px] whitespace-nowrap">
                        <div>{new Date(quote.createdAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-gray-400">
                          {new Date(quote.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openDetailsModal(quote)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors"
                            title="View Full Scope & Quotation"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(quote)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Quote Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && quotes.length > 0 && (
          <div className="py-3 px-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div>
              Showing Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
              <span className="font-semibold text-gray-800">{totalPages}</span> ({totalCount} total quote requests)
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          QUOTE DETAILS & ARCHITECTURAL SCOPING MODAL
          ========================================================================= */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedQuote(null)}
          />

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#13CDEB] bg-[#101D36] px-2 py-0.5 rounded">
                  Quote Scoping
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-2">
                  {selectedQuote.projectType}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Requested by {selectedQuote.contactName} on {new Date(selectedQuote.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {/* Customer Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                  <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-500" /> Contact Name
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{selectedQuote.contactName}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                  <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-blue-500" /> Email
                  </span>
                  <a
                    href={`mailto:${selectedQuote.email}`}
                    className="font-mono font-bold text-blue-600 hover:underline block truncate"
                  >
                    {selectedQuote.email}
                  </a>
                </div>

                {selectedQuote.phone && (
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                    <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-blue-500" /> Phone
                    </span>
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="font-mono font-bold text-gray-800 hover:underline"
                    >
                      {selectedQuote.phone}
                    </a>
                  </div>
                )}

                {selectedQuote.company && (
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                    <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-blue-500" /> Company Organization
                    </span>
                    <p className="font-bold text-gray-900">{selectedQuote.company}</p>
                  </div>
                )}
              </div>

              {/* Scoping Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-[11px] text-blue-700 font-semibold uppercase">
                    Service / Solution
                  </span>
                  <p className="font-bold text-navy text-sm mt-0.5">{selectedQuote.projectType}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[11px] text-emerald-700 font-semibold uppercase">
                    Client Target Budget
                  </span>
                  <p className="font-bold text-emerald-800 text-sm mt-0.5">
                    {selectedQuote.estimatedBudget || "Not specified"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100">
                  <span className="text-[11px] text-purple-700 font-semibold uppercase">
                    Expected Timeline
                  </span>
                  <p className="font-bold text-purple-900 text-sm mt-0.5">
                    {selectedQuote.targetTimeline || "Flexible"}
                  </p>
                </div>
              </div>

              {/* Project Details Description */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Client Project Description & Scope
                </label>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-800 text-xs leading-relaxed whitespace-pre-wrap select-text">
                  {selectedQuote.projectDetails}
                </div>
              </div>

              {/* Additional Requirements */}
              {selectedQuote.additionalRequirements && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Additional Requirements / Constraints
                  </label>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-700 text-xs whitespace-pre-wrap select-text">
                    {selectedQuote.additionalRequirements}
                  </div>
                </div>
              )}

              {/* Architectural Scoping Form */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    Internal Scoping & Commercials
                  </h4>

                  {/* Status Dropdown */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-gray-500 font-medium">Status:</span>
                    <select
                      value={selectedQuote.status}
                      onChange={(e) => handleUpdateStatus(selectedQuote.id, e.target.value)}
                      className="px-2.5 py-1 rounded-lg border bg-white text-xs font-bold shadow-xs focus:outline-none"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="ESTIMATE_PREPARED">Estimate Prepared</option>
                      <option value="PROPOSAL_SENT">Proposal Sent</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="DECLINED">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Assigned Principal Architect
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lead Enterprise Architect"
                      value={architectInput}
                      onChange={(e) => setArchitectInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#13CDEB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Estimated Commercial Value ($ USD)
                    </label>
                    <input
                      type="number"
                      step="100"
                      placeholder="e.g. 25000"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#13CDEB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                    Internal Private Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter private scoping estimates, milestone breakdown, or client discount notes..."
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#13CDEB]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveDetails}
                    disabled={isSaving}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#101D36] text-[#13CDEB] text-xs font-bold hover:bg-navy/90 transition-colors shadow-xs disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? "Saving..." : "Save Scoping & Notes"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <button
                onClick={() => setDeleteTarget(selectedQuote)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Quote Request</span>
              </button>

              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors text-xs"
              >
                Close
              </button>
            </div>
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
              <h3 className="text-base font-bold text-gray-900">Delete Quote Request?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to permanently delete the quote request for{" "}
                <span className="font-bold text-gray-800">{deleteTarget.projectType}</span> from{" "}
                <span className="font-bold text-gray-800">{deleteTarget.contactName}</span>?
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
                onClick={handleDeleteQuote}
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
    </div>
  );
}

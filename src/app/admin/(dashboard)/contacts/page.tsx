"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Search,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  Building,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceInterest?: string | null;
  subject?: string | null;
  budgetRange?: string | null;
  message: string;
  status: "NEW" | "IN_REVIEW" | "CONTACTED" | "CONVERTED" | "ARCHIVED";
  internalNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  { value: "ALL", label: "All Inquiries" },
  { value: "NEW", label: "New", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "IN_REVIEW", label: "In Review", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "CONTACTED", label: "Contacted", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "CONVERTED", label: "Converted", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "ARCHIVED", label: "Archived", color: "bg-gray-100 text-gray-700 border-gray-200" },
];

export default function ContactsManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modals & Action States
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [notesInput, setNotesInput] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "10");

      const res = await fetch(`/api/admin/contacts?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load inquiries");
      }

      setContacts(data.contacts || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || 0);
    } catch (err: unknown) {
      console.error("Fetch contacts error:", err);
      const msg = err instanceof Error ? err.message : "Failed to load inquiries from database.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Handle Status Update
  const handleUpdateStatus = async (contactId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success && data.contact) {
        setContacts((prev) =>
          prev.map((c) => (c.id === contactId ? { ...c, status: data.contact.status } : c))
        );
        if (selectedContact && selectedContact.id === contactId) {
          setSelectedContact(data.contact);
        }
        showNotice(`Inquiry status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  // Handle Internal Notes Save
  const handleSaveNotes = async () => {
    if (!selectedContact) return;
    try {
      setIsSavingNotes(true);
      const res = await fetch(`/api/admin/contacts/${selectedContact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internalNotes: notesInput }),
      });
      const data = await res.json();

      if (data.success && data.contact) {
        setSelectedContact(data.contact);
        setContacts((prev) =>
          prev.map((c) => (c.id === selectedContact.id ? { ...c, internalNotes: notesInput } : c))
        );
        showNotice("Internal notes saved successfully.");
      }
    } catch (err) {
      console.error("Save notes error:", err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Handle Contact Delete
  const handleDeleteContact = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/contacts/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setContacts((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        setTotalCount((prev) => Math.max(0, prev - 1));
        if (selectedContact?.id === deleteTarget.id) {
          setSelectedContact(null);
        }
        setDeleteTarget(null);
        showNotice("Inquiry deleted permanently.");
      }
    } catch (err) {
      console.error("Delete contact error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const openDetailsModal = (contact: Contact) => {
    setSelectedContact(contact);
    setNotesInput(contact.internalNotes || "");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Action Notification Toast */}
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
            <Mail className="w-3.5 h-3.5 text-[#13CDEB]" />
            <span>Customer Inquiries</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Inquiry Management
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {totalCount} Total
            </span>
          </h1>
        </div>

        <button
          onClick={() => fetchContacts()}
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
              placeholder="Search by name, email, company, subject..."
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
            {statusOptions.map((opt) => (
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

      {/* Contacts Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#13CDEB] mx-auto" />
            <p className="text-xs text-gray-500 font-medium">Loading inquiries from database...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
            <p className="text-sm text-gray-800 font-bold">{error}</p>
            <button
              onClick={() => fetchContacts()}
              className="text-xs text-[#13CDEB] underline font-semibold"
            >
              Try again
            </button>
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Mail className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="text-sm font-bold text-gray-800">No Inquiries Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {search || statusFilter !== "ALL"
                ? "No customer inquiries matched your active search or status filters."
                : "No customer contact form submissions exist in the database yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-gray-500 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Sender & Email</th>
                  <th className="py-3.5 px-6">Service Interest</th>
                  <th className="py-3.5 px-6">Subject / Preview</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Received</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contacts.map((contact) => {
                  const statusConfig =
                    statusOptions.find((o) => o.value === contact.status) || statusOptions[1];

                  return (
                    <tr
                      key={contact.id}
                      className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
                      onClick={() => openDetailsModal(contact)}
                    >
                      {/* Name & Email */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900">{contact.name}</div>
                        <div className="text-gray-500 text-[11px] font-mono">{contact.email}</div>
                        {contact.company && (
                          <div className="text-gray-400 text-[10px] mt-0.5">
                            {contact.company}
                          </div>
                        )}
                      </td>

                      {/* Service Interest */}
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        {contact.serviceInterest || "General Inquiry"}
                      </td>

                      {/* Subject */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="font-semibold text-gray-800 truncate">
                          {contact.subject || "No subject"}
                        </div>
                        <div className="text-gray-500 text-[11px] truncate mt-0.5">
                          {contact.message}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td
                        className="py-4 px-6"
                        onClick={(e) => e.stopPropagation()} // Prevent opening details modal on status click
                      >
                        <select
                          value={contact.status}
                          onChange={(e) => handleUpdateStatus(contact.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${statusConfig.color}`}
                        >
                          <option value="NEW">New</option>
                          <option value="IN_REVIEW">In Review</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="CONVERTED">Converted</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
                      </td>

                      {/* Received Date */}
                      <td className="py-4 px-6 text-gray-500 text-[11px] whitespace-nowrap">
                        <div>{new Date(contact.createdAt).toLocaleDateString()}</div>
                        <div className="text-[10px] text-gray-400">
                          {new Date(contact.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td
                        className="py-4 px-6 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openDetailsModal(contact)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(contact)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Inquiry"
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
        {!loading && contacts.length > 0 && (
          <div className="py-3 px-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div>
              Showing Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
              <span className="font-semibold text-gray-800">{totalPages}</span> ({totalCount} total inquiries)
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
          COMPLETE INQUIRY DETAILS MODAL
          ========================================================================= */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedContact(null)}
          />

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#13CDEB] bg-[#101D36] px-2 py-0.5 rounded">
                  Inquiry Details
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-2">
                  {selectedContact.subject || "Customer Consultation"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Submitted on {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedContact(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {/* Sender Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                  <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-500" /> Full Name
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{selectedContact.name}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                  <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-blue-500" /> Email Address
                  </span>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="font-mono font-bold text-blue-600 hover:underline block truncate"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                {selectedContact.phone && (
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                    <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-blue-500" /> Phone
                    </span>
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="font-mono font-bold text-gray-800 hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                )}

                {selectedContact.company && (
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 space-y-1">
                    <span className="text-[11px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-blue-500" /> Company
                    </span>
                    <p className="font-bold text-gray-900">{selectedContact.company}</p>
                  </div>
                )}
              </div>

              {/* Service Required */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-blue-700 font-semibold uppercase">
                    Service Required
                  </span>
                  <p className="font-bold text-navy text-sm mt-0.5">
                    {selectedContact.serviceInterest || "General Inquiry"}
                  </p>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-gray-500">Status:</span>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => handleUpdateStatus(selectedContact.id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border bg-white text-xs font-bold shadow-xs focus:outline-none"
                  >
                    <option value="NEW">New</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Message Content
                </label>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-800 text-xs leading-relaxed whitespace-pre-wrap select-text">
                  {selectedContact.message}
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                  Internal Administrator Notes (Private)
                </label>
                <textarea
                  rows={3}
                  placeholder="Record internal consultation notes, follow-up dates, call logs, or client specifics..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#13CDEB]"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#101D36] text-[#13CDEB] text-xs font-bold hover:bg-navy/90 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingNotes ? "Saving Notes..." : "Save Internal Notes"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <button
                onClick={() => setDeleteTarget(selectedContact)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <button
                onClick={() => setSelectedContact(null)}
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
              <h3 className="text-base font-bold text-gray-900">Delete Inquiry?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to delete the inquiry from{" "}
                <span className="font-bold text-gray-800">{deleteTarget.name}</span> (
                {deleteTarget.email})? This action cannot be undone.
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
                onClick={handleDeleteContact}
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

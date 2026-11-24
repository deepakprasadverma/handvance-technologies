"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  UserX,
  UserCheck,
  Calendar,
} from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  source?: string | null;
  status: "ACTIVE" | "UNSUBSCRIBED" | "BOUNCED";
  confirmedAt?: string | null;
  unsubscribedAt?: string | null;
  createdAt: string;
}

export default function SubscribersManagementPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "ALL") params.append("status", statusFilter);

      const res = await fetch(`/api/admin/subscribers?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load newsletter subscribers");
      }

      setSubscribers(data.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching subscribers");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const toggleStatus = async (subscriber: Subscriber) => {
    const nextStatus = subscriber.status === "ACTIVE" ? "UNSUBSCRIBED" : "ACTIVE";
    try {
      const res = await fetch(`/api/admin/subscribers/${subscriber.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to update status");

      setSubscribers((prev) =>
        prev.map((s) => (s.id === subscriber.id ? { ...s, status: nextStatus } : s))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating subscriber status");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to remove subscriber");

      setDeleteConfirmId(null);
      fetchSubscribers();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error removing subscriber");
    } finally {
      setDeleting(false);
    }
  };

  const exportCSV = () => {
    window.open("/api/admin/subscribers?format=csv", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101D36] tracking-tight flex items-center gap-3">
            <Mail className="w-8 h-8 text-[#13CDEB]" />
            Newsletter Subscribers
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage inbound email subscribers, lead magnets, and export subscriber lists for campaigns.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#101D36] to-[#1a2d52] hover:to-[#13CDEB] text-white font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all text-sm"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by subscriber email..."
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
            <option value="ACTIVE">Active Subscribers</option>
            <option value="UNSUBSCRIBED">Unsubscribed</option>
            <option value="BOUNCED">Bounced</option>
          </select>

          <button
            onClick={() => fetchSubscribers()}
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

      {/* Subscribers Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
          <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No subscribers found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            {search || statusFilter !== "ALL"
              ? "Try adjusting your search criteria."
              : "Subscribers who sign up via the website footer newsletter will appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Source Channel</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Subscribed Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#101D36] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#13CDEB]" />
                      <a href={`mailto:${sub.email}`} className="hover:underline">
                        {sub.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">
                      {sub.source || "website_footer"}
                    </td>
                    <td className="px-6 py-4">
                      {sub.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : sub.status === "UNSUBSCRIBED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                          <UserX className="w-3 h-3" /> Unsubscribed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                          Bounced
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(sub.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleStatus(sub)}
                          className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            sub.status === "ACTIVE"
                              ? "text-amber-600 hover:bg-amber-50"
                              : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                          title={sub.status === "ACTIVE" ? "Mark Unsubscribed" : "Mark Active"}
                        >
                          {sub.status === "ACTIVE" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(sub.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Subscriber"
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Remove Subscriber?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              This will remove this subscriber from the newsletter database.
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
                {deleting ? "Deleting..." : "Confirm Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

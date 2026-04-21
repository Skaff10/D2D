import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

const statusOptions = [
  "Completed",
  "Cancelled",
  "Contacted",
  "Not Contacted",
  "Booked",
  "Coming for Inspection",
  "No Answer",
  "Manual Follow Up",
  "Wrong Info",
  "Dead Leads",
  "Price Shoppers",
];

const statusColors = {
  Completed: "bg-green-500/10 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
  Contacted: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Not Contacted": "bg-slate-500/10 text-slate-400 border-slate-500/30",
  Booked: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Coming for Inspection": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  "No Answer": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Manual Follow Up": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  "Wrong Info": "bg-pink-500/10 text-pink-400 border-pink-500/30",
  "Dead Leads": "bg-zinc-800 text-zinc-500 border-zinc-700",
  "Price Shoppers": "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeNote, setActiveNote] = useState(null);
  const [editingAdminNote, setEditingAdminNote] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const snapshot = await getDocs(collection(db, "bookings"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
      setBookings(data);
    } catch (err) {
      console.error("Fetch bookings error:", err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: newStatus });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        )
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleSaveAdminNote = async (bookingId, noteText) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { adminNotes: noteText });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, adminNotes: noteText } : b
        )
      );
      toast.success("Admin notes saved successfully");
      setActiveNote(null);
    } catch (err) {
      console.error("Save note error:", err);
      toast.error("Failed to save admin note");
    }
  };

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.customerName?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q) ||
      b.serviceName?.toLowerCase().includes(q) ||
      b.selectedPackage?.toLowerCase().includes(q) ||
      b.vehicleModel?.toLowerCase().includes(q);

    const matchStatus =
      filterStatus === "All" || b.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white mb-6">
        Bookings
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border-warm rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder-text-muted focus:border-primary transition-all"
          />
        </div>

        <div className="relative">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-card border border-border-warm rounded-lg pl-10 pr-8 py-2.5 text-white text-sm focus:border-primary transition-all appearance-none"
          >
            <option value="All">All Statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border-warm/50 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-text-muted">
            Loading bookings...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-text-muted">
            No bookings found
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="admin-table w-full whitespace-nowrap min-w-max">
              <thead>
                <tr>
                  <th className="min-w-[150px]">Customer</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th className="min-w-[150px]">Service / Package</th>
                  <th>Vehicle</th>
                  <th>Model</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th className="min-w-[120px]">Status</th>
                  <th className="max-w-[150px]">Customer Notes</th>
                  <th className="max-w-[150px]">Admin Notes</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div>
                        <p className="text-white font-medium">
                          {b.customerName}
                        </p>
                        <p className="text-text-muted text-xs">
                          {b.email}
                        </p>
                      </div>
                    </td>

                    <td className="text-text-secondary">
                      <a
                        href={`tel:${b.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {b.phone}
                      </a>
                    </td>

                    <td>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${
                          b.bookingType === "package"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {b.bookingType || "service"}
                      </span>
                    </td>

                    <td className="text-text-secondary w-[200px] truncate">
                      {b.bookingType === "package"
                        ? b.selectedPackage || "—"
                        : b.serviceName || "—"}
                    </td>

                    <td className="text-text-secondary">
                      {b.vehicleType || "—"}
                    </td>

                    <td className="text-text-secondary w-[150px] truncate">
                      {b.vehicleModel || "—"}
                    </td>

                    <td className="text-text-secondary">{b.date}</td>
                    <td className="text-text-secondary">{b.time}</td>

                    <td>
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleStatusChange(b.id, e.target.value)
                        }
                        className={`text-xs font-medium px-2 py-1 rounded-full border appearance-none cursor-pointer ${
                          statusColors[b.status] || ""
                        } bg-transparent outline-none`}
                      >
                        {statusOptions.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-card text-white"
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* CUSTOMER NOTES */}
                    <td className="text-text-muted text-xs max-w-[150px]">
                      {b.notes ? (
                        <button
                          onClick={() => setActiveNote({ type: 'customer', text: b.notes })}
                          className="text-left truncate w-full hover:text-primary transition-colors"
                          title="Click to view full note"
                        >
                          {b.notes}
                        </button>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* ADMIN NOTES */}
                    <td className="text-text-muted text-xs max-w-[150px]">
                      <button
                        onClick={() => {
                          setActiveNote({ type: 'admin', text: b.adminNotes || "", bookingId: b.id });
                          setEditingAdminNote(b.adminNotes || "");
                        }}
                        className={`text-left truncate w-full hover:text-primary transition-colors ${!b.adminNotes ? 'text-primary/50 italic font-medium' : ''}`}
                        title="Click to view/edit admin note"
                      >
                        {b.adminNotes || "+ Add Note"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {activeNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setActiveNote(null)}
        >
          <div
            className="w-full max-w-2xl rounded-xl border border-border-warm bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">
                {activeNote.type === 'customer' ? "Customer Note" : "Admin Additional Notes"}
              </h3>
              <button
                onClick={() => setActiveNote(null)}
                className="text-text-muted hover:text-white"
              >
                ✕
              </button>
            </div>

            {activeNote.type === 'customer' ? (
              <div className="max-h-[70vh] overflow-y-auto rounded-lg bg-black/20 p-4 text-sm text-white whitespace-pre-wrap leading-relaxed">
                {activeNote.text}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <textarea
                  value={editingAdminNote}
                  onChange={(e) => setEditingAdminNote(e.target.value)}
                  placeholder="Type additional notes here that are only visible to admins..."
                  className="w-full h-40 bg-black/20 border border-border-warm rounded-lg p-4 text-sm text-white placeholder-text-muted focus:border-primary outline-none resize-none transition-colors"
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button 
                    onClick={() => setActiveNote(null)}
                    className="px-4 py-2 bg-transparent text-text-muted hover:text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleSaveAdminNote(activeNote.bookingId, editingAdminNote)}
                    className="px-4 py-2 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}

      <p className="text-text-muted text-xs mt-4">
        {filtered.length} booking{filtered.length !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}
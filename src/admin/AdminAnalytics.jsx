import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

export default function AdminAnalytics() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      // First try with orderBy, which may fail if no index exists
      const q = query(collection(db, "bookings_v2"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBookings(data);
    } catch (err) {
      console.error("Fetch analytics error:", err);
      // Fallback to fetch all and sort client-side if index doesn't exist
      try {
        const fallbackSnapshot = await getDocs(collection(db, "bookings_v2"));
        const data = fallbackSnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setBookings(data);
      } catch (fallbackErr) {
        toast.error("Failed to load analytics");
      }
    } finally {
      setLoading(false);
    }
  }

  // Calculate stats
  const totalBookings = bookings.length;
  let adsCount = 0;
  let organicCount = 0;
  const campaignCounts = {};

  bookings.forEach(b => {
    const source = b.lead_source?.utm_source?.toLowerCase() || "";
    const campaign = b.lead_source?.utm_campaign || "Unknown";

    if (source === "facebook" || source === "meta" || source === "instagram") {
      adsCount++;
      campaignCounts[campaign] = (campaignCounts[campaign] || 0) + 1;
    } else {
      organicCount++;
    }
  });

  const campaignsArray = Object.entries(campaignCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const topCampaignCount = campaignsArray.length > 0 ? campaignsArray[0].count : 0;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-white mb-6">Lead Analytics</h2>
      
      {loading ? (
        <div className="p-12 text-center text-text-muted">Loading analytics...</div>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border-warm rounded-xl p-6 flex flex-col justify-center">
              <p className="text-text-muted text-sm font-medium mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-white">{totalBookings}</p>
            </div>
            <div className="bg-card border border-border-warm rounded-xl p-6 flex flex-col justify-center">
              <p className="text-text-muted text-sm font-medium mb-1">From Meta Ads</p>
              <p className="text-3xl font-bold text-blue-400">{adsCount}</p>
            </div>
            <div className="bg-card border border-border-warm rounded-xl p-6 flex flex-col justify-center">
              <p className="text-text-muted text-sm font-medium mb-1">Organic / Direct</p>
              <p className="text-3xl font-bold text-green-400">{organicCount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Breakdown Table */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border-warm/50 overflow-hidden">
              <div className="p-4 border-b border-border-warm/50">
                <h3 className="text-white font-medium">Recent Leads Breakdown</h3>
              </div>
              <div className="overflow-x-auto w-full max-h-[500px]">
                <table className="admin-table w-full whitespace-nowrap min-w-max text-sm">
                  <thead className="sticky top-0 bg-card z-10">
                    <tr>
                      <th className="text-left py-3 px-4 text-text-muted font-medium border-b border-border-warm/50">Customer</th>
                      <th className="text-left py-3 px-4 text-text-muted font-medium border-b border-border-warm/50">Service</th>
                      <th className="text-left py-3 px-4 text-text-muted font-medium border-b border-border-warm/50">Date</th>
                      <th className="text-left py-3 px-4 text-text-muted font-medium border-b border-border-warm/50">Lead Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => {
                      const source = b.lead_source?.utm_source?.toLowerCase() || "";
                      const isAd = source === "facebook" || source === "meta" || source === "instagram";
                      
                      return (
                        <tr key={b.id} className="border-b border-border-warm/30 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <p className="text-white font-medium">{b.customerName || "—"}</p>
                          </td>
                          <td className="py-3 px-4 text-text-secondary">
                            {b.bookingType === "package" ? b.selectedPackage : b.serviceName || "—"}
                          </td>
                          <td className="py-3 px-4 text-text-secondary">{b.date || "—"}</td>
                          <td className="py-3 px-4">
                            {isAd ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30">
                                Meta Ad
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30">
                                Organic
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-text-muted">No leads found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Campaign Performance Bar Chart */}
            <div className="bg-card rounded-xl border border-border-warm/50 flex flex-col">
              <div className="p-4 border-b border-border-warm/50">
                <h3 className="text-white font-medium">Top Ad Campaigns</h3>
              </div>
              <div className="p-4 flex-1 overflow-y-auto max-h-[500px]">
                {campaignsArray.length > 0 ? (
                  <div className="space-y-5">
                    {campaignsArray.map(c => {
                      const widthPercent = topCampaignCount > 0 ? (c.count / topCampaignCount) * 100 : 0;
                      return (
                        <div key={c.name} className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-text-secondary truncate pr-2 max-w-[200px]" title={c.name}>
                              {c.name === "Unknown" ? "No Campaign Tag" : c.name}
                            </span>
                            <span className="text-white font-medium">{c.count} leads</span>
                          </div>
                          <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${widthPercent}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-text-muted text-sm py-12">
                    No campaign data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ui/ScrollToTop";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBookings from "./admin/AdminBookings";
import AdminServices from "./admin/AdminServices";

function PublicLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Layer 1: Ambient glow left side */}
      <div className="pointer-events-none fixed top-[20%] -left-32 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px] z-0" />

      {/* Layer 2: Ambient glow right side */}
      <div className="pointer-events-none fixed top-[50%] -right-32 w-[500px] h-[500px] rounded-full bg-amber-800/10 blur-[120px] z-0" />

      {/* Layer 3: Subtle noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* Layer 4: Faint diagonal lines on far sides only */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #b45309 0px, #b45309 1px, transparent 0px, transparent 50%)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* All existing page content sits above */}
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #2a1800",
                },
                success: {
                  iconTheme: { primary: "#f97316", secondary: "#000" },
                },
                error: {
                  iconTheme: { primary: "#ef4444", secondary: "#000" },
                },
              }}
            />
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route
                path="/services"
                element={
                  <PublicLayout>
                    <Services />
                  </PublicLayout>
                }
              />
              <Route
                path="/services/:serviceSlug"
                element={
                  <PublicLayout>
                    <ServiceDetailPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/gallery"
                element={
                  <PublicLayout>
                    <Gallery />
                  </PublicLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PublicLayout>
                    <Contact />
                  </PublicLayout>
                }
              />
              <Route
                path="/booking"
                element={
                  <PublicLayout>
                    <Booking />
                  </PublicLayout>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="services" element={<AdminServices />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </HelmetProvider>
      <WhatsAppButton />
    </>
  );
}

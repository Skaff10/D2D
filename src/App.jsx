import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ui/ScrollToTop";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import RimBackground from "./components/RimBackground";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Packages from "./pages/Packages";
import NotFound from "./pages/NotFound";

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBookings from "./admin/AdminBookings";
import AdminServices from "./admin/AdminServices";

function PublicLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <RimBackground />
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
              <Route
                path="/packages"
                element={
                  <PublicLayout>
                    <Packages />
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

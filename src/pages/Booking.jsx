import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Car,
  AlertCircle,
  Package,
} from "lucide-react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import emailjs from "@emailjs/browser";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";
import SectionHeading from "../components/ui/SectionHeading";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const vehicleTypes = ["Sedan", "SUV", "Truck", "Van"];

const timeSlots = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

const fallbackServices = [
  { id: "1", name: "Exterior Detailing" },
  { id: "2", name: "Engine Bay Detailing" },
  { id: "3", name: "Headlight Restoration" },
  { id: "4", name: "Headlight & Taillight Tint" },
  { id: "5", name: "Interior Detailing" },
  { id: "6", name: "Leather Seat Treatment" },
  { id: "7", name: "Gloss Enhancer" },
  { id: "8", name: "One-Step Polish" },
  { id: "9", name: "Two-Step Polish" },
  { id: "10", name: "Three-Step Polish" },
  { id: "11", name: "Ceramic Coating" },
];

const defaultPackageMap = {
  detail: "Essential ",
  paint: "Silver",
  monthly: "Monthly Refresh ",
};

export default function Booking() {
  const { lang } = useLang();
  const t = translations[lang].booking;

  const [searchParams] = useSearchParams();
  const [services, setServices] = useState(fallbackServices);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const preselectedService = searchParams.get("service") || "";
  const categoryParam = searchParams.get("category") || "";
  const preselectedPackage = defaultPackageMap[categoryParam] || "";

  // Default to "package" mode if a category query param is present
  const [bookingType, setBookingType] = useState(
    categoryParam ? "package" : "service",
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedPackage: preselectedPackage,
      customerName: "",
      phone: "",
      email: "",
      vehicleType: "",
      vehicleModel: "",
      serviceName: categoryParam ? "" : preselectedService,
      date: "",
      time: "",
      notes: "",
    },
  });

  const selectedService = watch("serviceName");
  const showPricingNote =
    selectedService === "Gloss Enhancer" ||
    selectedService === "One-Step Polish" ||
    selectedService === "Two-Step Polish" ||
    selectedService === "Three-Step Polish";

  // Clear the opposite field when toggling booking type
  const handleToggle = (type) => {
    if (type === bookingType) return;
    setBookingType(type);
    if (type === "service") {
      setValue("selectedPackage", "");
    } else {
      setValue("serviceName", "");
    }
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const q = query(
          collection(db, "services"),
          where("isActive", "==", true),
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setServices(
            snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name })),
          );
        }
      } catch (err) {
        console.log("Using fallback services for dropdown");
      }
    }
    fetchServices();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        vehicleType: data.vehicleType,
        vehicleModel: data.vehicleModel,
        bookingType,
        serviceName: bookingType === "service" ? data.serviceName : "",
        date: data.date,
        time: data.time,
        notes: data.notes || "",
        selectedPackage: bookingType === "package" ? data.selectedPackage : "",
        status: "Pending",
        createdAt: Timestamp.now(),
      });

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            customer_name: data.customerName,
            customer_phone: data.phone,
            customer_email: data.email,
            vehicle_type: data.vehicleType,
            vehicle_model: data.vehicleModel,
            booking_type: bookingType,
            service_name: bookingType === "service" ? data.serviceName : "None",
            booking_date: data.date,
            booking_time: data.time,
            notes: data.notes || "None",
            selected_package:
              bookingType === "package" ? data.selectedPackage : "None",
          },
          EMAILJS_PUBLIC_KEY,
        );
      } catch (emailErr) {
        console.log("EmailJS notification skipped:", emailErr.message);
      }

      toast.success(t.thankYou);
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(
        "Something went wrong. Please try calling us at 438-483-8175.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const inputClasses =
    "w-full bg-[#161616] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/15";
  const labelClasses =
    "flex items-center gap-2 text-xs font-medium text-text-secondary mb-2";

  const pillBase =
    "flex-1 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer text-center";
  const pillActive =
    "bg-[#C9A84C] text-[#1a1a1a] shadow-[0_0_20px_rgba(201,168,76,0.25)]";
  const pillInactive =
    "bg-[#161616] text-white/40 border border-white/[0.06] hover:text-white/60 hover:border-white/10";

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Booking Confirmed | Down2Detail</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="shield-badge w-20 h-20 rounded-2xl mx-auto mb-6">
              <CalendarDays size={32} className="text-primary/60" />
            </div>
            <h1 className="serif-heading text-3xl text-white mb-4">
              {t.bookingReceived}
            </h1>
            <p className="text-text-secondary mb-8">{t.thankYou}</p>
            <button onClick={() => setSubmitted(false)} className="btn-filled">
              {t.bookAnother}
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Book Auto Detailing in Montreal & Saint-Hubert | Down2Detail
        </title>
        <meta
          name="description"
          content="Book your professional auto detailing appointment with Down2Detail. Serving Montreal, Saint-Hubert & the Greater Montreal Area. Easy online booking."
        />
      </Helmet>

      <section className="pt-32 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.bookAppointment}
            title={t.scheduleDetailing}
            description={t.bookingDescription}
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="dark-card p-6 md:p-8 space-y-6"
          >
            {/* Booking Type Toggle */}
            <div className="flex gap-3">
              <button
                type="button"
                className={`${pillBase} ${bookingType === "service" ? pillActive : pillInactive}`}
                onClick={() => handleToggle("service")}
              >
                {lang === "en" ? "Book a Service" : "Réserver un service"}
              </button>
              <button
                type="button"
                className={`${pillBase} ${bookingType === "package" ? pillActive : pillInactive}`}
                onClick={() => handleToggle("package")}
              >
                {lang === "en" ? "Book a Package" : "Réserver un forfait"}
              </button>
            </div>

            {/* Name & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <User size={12} /> {t.fullName} *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={inputClasses}
                  {...register("customerName", {
                    required: "Name is required",
                  })}
                />
                {errors.customerName && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.customerName.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  <Phone size={12} /> {t.phoneNumber} *
                </label>
                <input
                  type="tel"
                  placeholder="(438) 000-0000"
                  className={inputClasses}
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Vehicle Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <Mail size={12} /> {t.email} *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={inputClasses}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  <Car size={12} /> {t.vehicleType} *
                </label>
                <select
                  className={inputClasses}
                  {...register("vehicleType", {
                    required: "Vehicle type is required",
                  })}
                >
                  <option value="">{t.selectVehicle}</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.vehicleType && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.vehicleType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Vehicle Model & Year */}
            <div>
              <label className={labelClasses}>
                <Car size={12} /> {t.vehicleModel} *
              </label>
              <input
                type="text"
                placeholder={t.placeholders.vehicleModel}
                className={inputClasses}
                {...register("vehicleModel", {
                  required: t.validation.vehicleModelRequired,
                })}
              />
              {errors.vehicleModel && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.vehicleModel.message}
                </p>
              )}
            </div>

            {/* Service / Package — conditional */}
            <AnimatePresence mode="wait">
              {bookingType === "service" && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className={labelClasses}>
                    <FileText size={12} /> {t.service} *
                  </label>
                  <select
                    className={inputClasses}
                    {...register("serviceName", {
                      validate: (v) =>
                        bookingType !== "service" ||
                        !!v ||
                        "Please select a service",
                    })}
                  >
                    <option value="">{t.selectService}</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.serviceName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.serviceName.message}
                    </p>
                  )}
                  {showPricingNote && (
                    <div className="flex items-start gap-2 mt-2 dark-card p-3 bg-primary/[0.04] border-primary/10">
                      <AlertCircle
                        size={14}
                        className="text-primary/60 shrink-0 mt-0.5"
                      />
                      <p className="text-primary/70 text-xs">{t.pricingNote}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {bookingType === "package" && (
                <motion.div
                  key="package"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className={labelClasses}>
                    <Package size={12} />{" "}
                    {lang === "en" ? "Package" : "Forfait"} *
                  </label>
                  <select
                    className={inputClasses}
                    {...register("selectedPackage", {
                      validate: (v) =>
                        bookingType !== "package" ||
                        !!v ||
                        (lang === "en"
                          ? "Please select a package"
                          : "Veuillez sélectionner un forfait"),
                    })}
                  >
                    <option value="">
                      {lang === "en"
                        ? "Select a package"
                        : "Sélectionnez un forfait"}
                    </option>
                    <optgroup
                      label={
                        lang === "en"
                          ? "Exterior & Interior Detail"
                          : "Détail Extérieur & Intérieur"
                      }
                    >
                      <option value="Essential ">
                        {lang === "en" ? "Essential" : "Essentiel"}
                      </option>
                      <option value="Signature ">
                        {lang === "en" ? "Signature" : "Signature"}
                      </option>
                      <option value="Elite ">
                        {lang === "en" ? "Elite" : "Élite"}
                      </option>
                    </optgroup>
                    <optgroup
                      label={
                        lang === "en"
                          ? "Paint Polish & Protection"
                          : "Polissage & Protection de Peinture"
                      }
                    >
                      <option value="Silver">
                        {lang === "en" ? "Silver" : "Argent"}
                      </option>
                      <option value="Gold ">
                        {lang === "en" ? "Gold" : "Or"}
                      </option>
                      <option value="Platinum ">
                        {lang === "en" ? "Platinum" : "Platine"}
                      </option>
                      <option value="Diamond ">
                        {lang === "en" ? "Diamond" : "Diamant"}
                      </option>
                    </optgroup>
                    <optgroup
                      label={lang === "en" ? "Monthly Plans" : "Plans Mensuels"}
                    >
                      <option value="Monthly Refresh ">
                        {lang === "en"
                          ? "Monthly Refresh"
                          : "Actualisation Mensuelle"}
                      </option>
                      <option value="Ceramic Refresh ">
                        {lang === "en"
                          ? "Ceramic Refresh"
                          : "Actualisation Céramique"}
                      </option>
                    </optgroup>
                  </select>
                  {errors.selectedPackage && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.selectedPackage.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  <CalendarDays size={12} /> {t.preferredDate} *
                </label>
                <input
                  type="date"
                  min={today}
                  className={inputClasses}
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  <Clock size={12} /> {t.preferredTime} *
                </label>
                <select
                  className={inputClasses}
                  {...register("time", { required: "Time is required" })}
                >
                  <option value="">{t.selectTime}</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className={labelClasses}>
                <FileText size={12} /> {t.additionalNotes}
              </label>
              <textarea
                rows={4}
                placeholder="Any special requests or details about your vehicle..."
                className={`${inputClasses} resize-none`}
                {...register("notes")}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-filled py-4 justify-center text-base cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <CalendarDays size={16} />
                  {t.submitBooking}
                </>
              )}
            </button>

            <p className="text-text-muted text-xs text-center font-mono">
              {t.confirmationNote}
            </p>
          </motion.form>
        </div>
      </section>
    </>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  CreditCard, 
  Truck, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  CircleDollarSign,
  Gift,
  QrCode,
  ShieldCheck,
  Check,
  PhoneCall,
  MapPin,
  Mail
} from "lucide-react";
import { CartItem } from "../types";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

type PaymentMethodType = "CREDIT_CARD" | "UPI" | "COD";

export default function Checkout({
  isOpen,
  onClose,
  cartItems,
  onClearCart
}: CheckoutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // Step 1: Shipping, Step 2: Payment, Step 3: Confirmation Receipt
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("CREDIT_CARD");

  // Coupon configuration
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // as subtraction factor percentage
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Shipping Addresses Form
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});

  // Credit Card gateway configuration
  const [cardForm, setCardForm] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [cardType, setCardType] = useState<"VISA" | "MASTERCARD" | "AMEX" | "SECURE">("SECURE");

  // UPI configuration
  const [upiId, setUpiId] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState<"gpay" | "phonepe" | "paytm" | "bhim">("gpay");
  const [upiError, setUpiError] = useState("");
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // COD configuration
  const [codConfirmed, setCodConfirmed] = useState(false);
  const [codError, setCodError] = useState("");

  const [simulatedInvNumber, setSimulatedInvNumber] = useState("");

  // Core calculations
  const subtotal = cartItems.reduce((total, i) => total + i.product.price * i.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const deliveryCost = subtotal >= 250 || subtotal === 0 ? 0 : 15.0;
  const estimatedTax = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const total = subtotal - discountAmount + deliveryCost + estimatedTax;

  // Coupon validation
  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");
    const normalized = couponCode.trim().toUpperCase();

    if (normalized === "FUTURE26") {
      setAppliedDiscount(0.15); // 15% discount
      setCouponSuccess("Promo code FUTURE26 applied! You saved 15% off!");
    } else if (normalized === "CAMPUS10") {
      setAppliedDiscount(0.10); // 10% discount
      setCouponSuccess("Promo code CAMPUS10 applied! You saved 10% off!");
    } else {
      setCouponError("Invalid promotional coupon code.");
    }
  };

  // Shipping Validation
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!shippingForm.name.trim()) errs.name = "Full name is required";
    if (!shippingForm.email.includes("@")) errs.email = "Valid email is required";
    if (!shippingForm.phone.trim() || shippingForm.phone.length < 8) errs.phone = "Valid contact number is required";
    if (!shippingForm.address.trim()) errs.address = "Address is required";
    if (!shippingForm.city.trim()) errs.city = "City is required";
    if (!shippingForm.zipCode.trim()) errs.zipCode = "Zip/Postal is required";

    setShippingErrors(errs);

    if (Object.keys(errs).length === 0) {
      setStep(2);
    }
  };

  // Card formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    // Detect Brand Card
    if (value.startsWith("4")) {
      setCardType("VISA");
    } else if (value.startsWith("5")) {
      setCardType("MASTERCARD");
    } else if (value.startsWith("3")) {
      setCardType("AMEX");
    } else {
      setCardType("SECURE");
    }

    // Limit to 16 digits
    value = value.substring(0, 16);
    // Add spaces in groups of 4
    const matches = value.match(/\d{1,4}/g);
    const formatted = matches ? matches.join(" ") : "";
    setCardForm({ ...cardForm, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    setCardForm({ ...cardForm, expiryDate: value });
  };

  // Handle UPI Verification simulation
  const handleVerifyUpi = () => {
    if (!upiId.trim() || !upiId.includes("@")) {
      setUpiError("Please enter a valid UPI address (e.g., wallet@okaxis)");
      return;
    }
    setUpiError("");
    setIsVerifyingUpi(true);
    setTimeout(() => {
      setIsVerifyingUpi(false);
      setIsUpiVerified(true);
    }, 1500);
  };

  // Payment Validation & Processing
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "CREDIT_CARD") {
      const errs: Record<string, string> = {};
      if (!cardForm.cardName.trim()) errs.cardName = "Cardholder name is required";
      if (cardForm.cardNumber.replace(/\s/g, "").length < 15) errs.cardNumber = "Valid card number is required";
      if (cardForm.expiryDate.length < 5) errs.expiryDate = "Valid expiration code (MM/YY) is required";
      if (cardForm.cvv.length < 3) errs.cvv = "CVV code required";

      setCardErrors(errs);
      if (Object.keys(errs).length > 0) return;
    } else if (paymentMethod === "UPI") {
      if (!isUpiVerified && (!upiId.trim() || !upiId.includes("@"))) {
        setUpiError("Verify your UPI address coordinates first to authorize");
        return;
      }
    } else if (paymentMethod === "COD") {
      if (!codConfirmed) {
        setCodError("You must verify and agree to the COD terminal conditions");
        return;
      }
    }

    // Simulate confirmation code and submit order
    const randomInvoice = "INV-C-" + Math.floor(Math.random() * 89999 + 10000);
    setSimulatedInvNumber(randomInvoice);
    setStep(3);
  };

  const handleAllClosed = () => {
    // If completed checkout successfully, wipe cart
    if (step === 3) {
      onClearCart();
    }
    setStep(1);
    setPaymentMethod("CREDIT_CARD");
    setCardForm({ cardName: "", cardNumber: "", expiryDate: "", cvv: "" });
    setShippingForm({ name: "", email: "", phone: "", address: "", city: "", zipCode: "" });
    setCouponCode("");
    setAppliedDiscount(0);
    setCouponSuccess("");
    setUpiId("");
    setIsUpiVerified(false);
    setCodConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-55 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-md"
        >
          {/* Modal layout box */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="w-full max-w-5xl bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl border border-neutral-200/50 dark:border-neutral-800/40 grid grid-cols-1 md:grid-cols-12 overflow-hidden max-h-[92vh] sm:max-h-[88vh] overflow-y-auto"
          >
            {/* Close Toggle */}
            <button
              onClick={handleAllClosed}
              className="absolute top-4 right-4 p-2 z-20 bg-neutral-150 dark:bg-neutral-900 text-neutral-500 hover:text-rose-500 dark:text-neutral-400 dark:hover:text-rose-500 rounded-full transition-colors"
              aria-label="Dismiss checkout"
            >
              <X size={18} />
            </button>

            {/* Left Side: Step Content Area (Grid 1-7) */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-100 dark:border-neutral-900 text-left">
              
              {/* Wizard Nav Trackers */}
              <div className="flex items-center space-x-4 mb-6 text-xs font-mono uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-900 pb-4">
                <span className={`pb-1 ${step >= 1 ? "text-cyan-500 font-extrabold border-b-2 border-cyan-500" : "text-neutral-400"}`}>
                  1. Shipping
                </span>
                <span className="text-neutral-300">/</span>
                <span className={`pb-1 ${step >= 2 ? "text-cyan-500 font-extrabold border-b-2 border-cyan-500" : "text-neutral-400"}`}>
                  2. Payment Method
                </span>
                <span className="text-neutral-300">/</span>
                <span className={`pb-1 ${step === 3 ? "text-cyan-500 font-extrabold border-b-2 border-cyan-500" : "text-neutral-400"}`}>
                  3. Receipt
                </span>
              </div>

              {/* Wizard Content Cards */}
              <div className="flex-1">
                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-neutral-900 dark:text-white uppercase mb-4 tracking-tight flex items-center space-x-2">
                      <Truck size={18} className="text-cyan-500" />
                      <span>Shipping Address specs</span>
                    </h3>

                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.name}
                            onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500"
                            placeholder="John Doe"
                          />
                          {shippingErrors.name && <span className="text-[10px] text-rose-500 font-mono">{shippingErrors.name}</span>}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Email Coordinates</label>
                          <input
                            type="email"
                            required
                            value={shippingForm.email}
                            onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                            className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500"
                            placeholder="johndoe@cybermesh.com"
                          />
                          {shippingErrors.email && <span className="text-[10px] text-rose-500 font-mono">{shippingErrors.email}</span>}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Mobile Hotline</label>
                          <input
                            type="tel"
                            required
                            value={shippingForm.phone}
                            onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value.replace(/[^\d+ ]/g, "") })}
                            className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500"
                            placeholder="+91 80711 78267"
                          />
                          {shippingErrors.phone && <span className="text-[10px] text-rose-500 font-mono">{shippingErrors.phone}</span>}
                        </div>

                        <div className="col-span-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Delivery Address</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.address}
                            onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                            className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500"
                            placeholder="Street, Building No, Unit"
                          />
                          {shippingErrors.address && <span className="text-[10px] text-rose-500 font-mono">{shippingErrors.address}</span>}
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">City Grid</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.city}
                            onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                            className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500"
                            placeholder="Pune, Mumbai, New Delhi"
                          />
                          {shippingErrors.city && <span className="text-[10px] text-rose-500 font-mono">{shippingErrors.city}</span>}
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Postal Code (PIN)</label>
                          <input
                            type="text"
                            required
                            value={shippingForm.zipCode}
                            onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                            className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                            placeholder="411014"
                          />
                          {shippingErrors.zipCode && <span className="text-[10px] text-rose-500 font-mono">{shippingErrors.zipCode}</span>}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-6 w-full py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition duration-200 cursor-pointer"
                      >
                        <span>CONTINUE TO SECURE PAYMENT</span>
                        <ArrowRight size={13} />
                      </button>
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-neutral-900 dark:text-white uppercase mb-4 tracking-tight flex items-center space-x-2">
                      <CreditCard size={18} className="text-cyan-500" />
                      <span>Configure payment Terminal</span>
                    </h3>

                    {/* PAYMENT METHOD SELECTOR TABS */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("CREDIT_CARD")}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === "CREDIT_CARD"
                            ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow"
                            : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                        }`}
                      >
                        <CreditCard size={16} className="mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold tracking-wider uppercase block">Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("UPI")}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === "UPI"
                            ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow"
                            : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                        }`}
                      >
                        <QrCode size={16} className="mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold tracking-wider uppercase block">UPI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("COD")}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === "COD"
                            ? "bg-black dark:bg-white text-white dark:text-black border-transparent shadow"
                            : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                        }`}
                      >
                        <CircleDollarSign size={16} className="mx-auto mb-1.5" />
                        <span className="text-[10px] font-bold tracking-wider uppercase block">COD</span>
                      </button>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      {/* CARD METHOD: DISPLAY INTERACTIVE CARD MOCKUP & INPUT FIELDS */}
                      {paymentMethod === "CREDIT_CARD" && (
                        <div className="space-y-4">
                          {/* DYNAMIC CARD MOCKUP PREVIEW */}
                          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-cyan-950 text-white p-6 flex flex-col justify-between overflow-hidden shadow-xl border border-white/10 group">
                            {/* Accent lighting reflections */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-xl rounded-full group-hover:bg-cyan-500/20 transition-all duration-500" />
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-fuchsia-500/10 blur-lg rounded-full" />

                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono opacity-60 tracking-widest uppercase block">CAMPUS SECURE TERMINAL</span>
                                <div className="h-4 flex items-center space-x-1.5">
                                  <Lock size={10} className="text-cyan-500" />
                                  <span className="text-[10px] font-mono text-cyan-400 font-extrabold">SSL 256-BIT ENCRYPTION</span>
                                </div>
                              </div>
                              <span className="font-display font-extrabold text-sm text-cyan-400">
                                {cardType === "VISA" ? "VISA" : cardType === "MASTERCARD" ? "MASTERCARD" : cardType === "AMEX" ? "AMERICAN EXPRESS" : "SECURE PASS"}
                              </span>
                            </div>

                            {/* Simulated Chip and Wireless Pay Icon */}
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-6 bg-amber-400/20 rounded-md border border-amber-400/40" />
                              <div className="w-5 h-5 flex flex-col justify-between opacity-50">
                                <div className="h-[2px] w-full bg-white rounded" />
                                <div className="h-[2px] w-3/4 bg-white rounded" />
                                <div className="h-[2px] w-1/2 bg-white rounded" />
                              </div>
                            </div>

                            {/* Card numbers with reactive spaces */}
                            <div className="font-mono text-base tracking-widest text-neutral-100 font-bold">
                              {cardForm.cardNumber || "•••• •••• •••• ••••"}
                            </div>

                            <div className="flex justify-between items-end text-xs font-mono">
                              <div>
                                <span className="text-[8px] opacity-40 block">CARDHOLDER</span>
                                <span className="uppercase text-[11px] font-bold tracking-tight block">
                                  {cardForm.cardName || "YOUR FULL NAME"}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[8px] opacity-40 block">EXPIRES</span>
                                <span className="text-[11px] font-bold block">{cardForm.expiryDate || "MM/YY"}</span>
                              </div>
                            </div>
                          </div>

                          {/* FORMS */}
                          <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Cardholder Full Name</label>
                            <input
                              type="text"
                              required
                              value={cardForm.cardName}
                              onChange={(e) => setCardForm({ ...cardForm, cardName: e.target.value })}
                              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500"
                              placeholder="CARDHOLDER FULL NAME"
                            />
                            {cardErrors.cardName && <span className="text-[10px] text-rose-500 font-mono">{cardErrors.cardName}</span>}
                          </div>

                          <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Credit Card Number</label>
                            <input
                              type="text"
                              required
                              value={cardForm.cardNumber}
                              onChange={handleCardNumberChange}
                              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm tracking-widest text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                              placeholder="4000 1234 5678 9010"
                            />
                            {cardErrors.cardNumber && <span className="text-[10px] text-rose-500 font-mono">{cardErrors.cardNumber}</span>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Expiration MM/YY</label>
                              <input
                                type="text"
                                required
                                value={cardForm.expiryDate}
                                onChange={handleExpiryChange}
                                maxLength={5}
                                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                                placeholder="09/28"
                              />
                              {cardErrors.expiryDate && <span className="text-[10px] text-rose-500 font-mono">{cardErrors.expiryDate}</span>}
                            </div>

                            <div>
                              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">CVV Code</label>
                              <input
                                type="password"
                                required
                                value={cardForm.cvv}
                                maxLength={3}
                                onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "") })}
                                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                                placeholder="***"
                              />
                              {cardErrors.cvv && <span className="text-[10px] text-rose-500 font-mono">{cardErrors.cvv}</span>}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* UPI METHOD: INSTANT ID ADDRESSING & DYNAMIC QR CODES */}
                      {paymentMethod === "UPI" && (
                        <div className="space-y-4">
                          <div className="p-4 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl flex flex-col sm:flex-row items-center gap-6">
                            
                            {/* Simulated Interactive Vector Scan QR Coordinate Container */}
                            <div className="w-28 h-28 bg-white p-2 rounded-lg flex-shrink-0 flex items-center justify-center border border-neutral-200 relative group">
                              <QrCode size={96} className="text-neutral-900" />
                              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-cyan-500 animate-pulse" />
                            </div>

                            <div className="text-left space-y-1.5 flex-1">
                              <span className="text-lime-500 text-[9px] font-mono font-bold uppercase py-0.5 px-2 bg-lime-500/10 rounded">NPCI PAY SECURE</span>
                              <h4 className="font-display font-extrabold text-sm uppercase text-neutral-900 dark:text-white">Scan simulated UPI QR Code</h4>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                                Scan the QR Code using any certified payment client (Google Pay, BHIM, PhonePe, Paytm, or Amazon Pay) to settle the total of <strong className="text-neutral-950 dark:text-white font-mono">${total.toFixed(2)}</strong>.
                              </p>
                            </div>
                          </div>

                          {/* App shortcuts */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Select UPI App Shortcut</label>
                            <div className="grid grid-cols-4 gap-2">
                              {["gpay", "phonepe", "paytm", "bhim"].map((app) => (
                                <button
                                  key={app}
                                  type="button"
                                  onClick={() => setSelectedUpiApp(app as any)}
                                  className={`py-2 px-1 rounded-lg text-center text-[10px] font-mono font-bold capitalize border cursor-pointer ${
                                    selectedUpiApp === app
                                      ? "bg-cyan-500 text-white border-transparent"
                                      : "border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:hover:bg-neutral-900"
                                  }`}
                                >
                                  {app === "gpay" ? "Google Pay" : app}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* UPI ID Address */}
                          <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Or Enter Custom UPI ID</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="flex-1 px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                                placeholder="e.g. mobile@okaxis"
                              />
                              <button
                                type="button"
                                onClick={handleVerifyUpi}
                                disabled={isVerifyingUpi}
                                className="px-5 bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white text-xs font-mono font-bold uppercase rounded-lg transition"
                              >
                                {isVerifyingUpi ? "VERIFYING..." : isUpiVerified ? "VERIFIED ✓" : "VERIFY"}
                              </button>
                            </div>
                            {upiError && <p className="text-[10px] text-rose-500 font-mono mt-1">{upiError}</p>}
                            {isUpiVerified && (
                              <p className="text-[10px] text-emerald-500 font-mono mt-1 flex items-center space-x-1">
                                <Check size={11} />
                                <span>UPI Terminal linked successfully to customer record! Ready to pay.</span>
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* COD METHOD: TERMS & DECLARATION */}
                      {paymentMethod === "COD" && (
                        <div className="space-y-4">
                          <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl space-y-3">
                            <span className="text-amber-500 text-[10px] font-mono font-bold uppercase tracking-widest block">COD SYSTEM TERMS</span>
                            <h4 className="font-display font-extrabold text-sm uppercase text-neutral-900 dark:text-white mb-1">
                              Cash Collection on-site
                            </h4>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                              Your high-cushion footwear will be shipped securely to <strong className="text-neutral-850 dark:text-neutral-100">{shippingForm.address}, {shippingForm.city}</strong>.
                              Our shipping partner will collect the final sum of <strong className="text-neutral-950 dark:text-white font-mono">${total.toFixed(2)}</strong> in cash upon delivery. 
                              Please guarantee that you will be present inside your delivery window.
                            </p>
                          </div>

                          <div className="flex items-start space-x-2.5 pt-1">
                            <input
                              type="checkbox"
                              id="cod-terms"
                              checked={codConfirmed}
                              onChange={(e) => {
                                setCodConfirmed(e.target.checked);
                                setCodError("");
                              }}
                              className="mt-0.5 rounded text-cyan-500 focus:ring-cyan-500"
                            />
                            <label htmlFor="cod-terms" className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans leading-tight">
                              I authorize the shipment of my shoes and commit to pay the logistics representative inside my city grid upon parcel handover.
                            </label>
                          </div>
                          {codError && <p className="text-[10px] text-rose-500 font-mono">{codError}</p>}
                        </div>
                      )}

                      {/* SUBMIT BUTTON CONTROL */}
                      <div className="flex gap-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-4 border border-neutral-200/50 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl text-xs font-bold uppercase tracking-widest font-mono text-neutral-500 cursor-pointer"
                        >
                          EDIT SHIPPING
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-4 bg-cyan-500 text-white hover:bg-cyan-650 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                        >
                          <Lock size={12} />
                          <span>
                            {paymentMethod === "COD" ? "CONFIRM COD ORDER" : "AUTHORIZE PAYROLL"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center py-6 space-y-5">
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 mx-auto rounded-full flex items-center justify-center">
                      <CheckCircle size={36} className="animate-bounce" />
                    </div>
                    
                    <div>
                      <h4 className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">TRANSACTION SECURED</h4>
                      <h3 className="text-2xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight mt-1">
                        SHIPMENT IS ROUTED!
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-sans leading-relaxed">
                        Hey <strong className="text-neutral-900 dark:text-white capitalize">{shippingForm.name}</strong>, your purchase has initialized successfully! An executive package was allocated under tracking hash <strong>{simulatedInvNumber}</strong>. We shipped confirmation coordinates directly to your terminal.
                      </p>
                    </div>

                    <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl text-left text-xs space-y-2 border border-neutral-200/30 dark:border-neutral-800/30 font-sans">
                      <div className="flex justify-between text-neutral-400 font-mono">
                        <span>Invoice Reference</span>
                        <span className="text-neutral-900 dark:text-white font-bold">{simulatedInvNumber}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 font-mono">
                        <span>Delivery Hub Channel</span>
                        <span className="text-neutral-900 dark:text-white font-bold">
                          {paymentMethod === "COD" ? "EXPRESS COD POSTAL VEHICLE" : "EXPRESS COURIER DROPSHIP"}
                        </span>
                      </div>
                      <div className="flex justify-between text-neutral-400 font-mono">
                        <span>Recipient Email</span>
                        <span className="text-neutral-900 dark:text-white font-bold">{shippingForm.email}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 font-mono">
                        <span>Terminal Contact</span>
                        <span className="text-neutral-900 dark:text-white font-bold">{shippingForm.phone}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleAllClosed}
                      className="w-full py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                    >
                      RETURN TO SNEAKER LAB
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Order Receipt Breakdowns (Grid 8-12) */}
            <div className="md:col-span-12 lg:col-span-5 bg-neutral-50 dark:bg-neutral-950/70 p-6 flex flex-col justify-between text-left border-t md:border-t-0 md:border-l border-neutral-150 dark:border-neutral-900">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center space-x-1">
                  <FileText size={13} className="text-cyan-500" />
                  <span>Order Receipt Invoice</span>
                </h4>

                {/* Items loop summary */}
                <div className="divide-y divide-neutral-200/40 dark:divide-neutral-800/40 max-h-[160px] overflow-y-auto mb-6 pr-2 space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-1.5 text-xs">
                      <div>
                        <span className="font-bold text-neutral-850 dark:text-neutral-200 line-clamp-1">{item.product.name}</span>
                        <div className="flex space-x-1.5 text-[9.5px] text-neutral-400 font-mono mt-0.5">
                          <span>US {item.selectedSize}</span>
                          <span>•</span>
                          <span>{item.selectedColor.name}</span>
                          <span>•</span>
                          <span>Qty {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono text-neutral-900 dark:text-white font-bold flex-shrink-0 ml-4">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {cartItems.length === 0 && (
                    <span className="text-neutral-400 text-xs italic font-mono">Catalog allocation void. Load sneakers to checkout.</span>
                  )}
                </div>

                {/* Promotional Coupon Trigger Frame */}
                {step < 3 && (
                  <div className="mb-6 pt-5 border-t border-neutral-200/50 dark:border-neutral-800 pb-2">
                    <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase block mb-2 flex items-center space-x-1">
                      <Gift size={12} className="text-cyan-500" />
                      <span>COUPON REDEMPTION CODE</span>
                    </span>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Try: FUTURE26"
                        className="flex-1 px-3 py-1.5 bg-white dark:bg-neutral-900 text-xs font-mono rounded border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white text-[11px] font-mono font-bold uppercase rounded tracking-wider cursor-pointer"
                      >
                        REDEEM
                      </button>
                    </div>

                    {/* Status notifications of coupon */}
                    {couponError && <p className="text-[10px] text-rose-500 font-mono mt-1">{couponError}</p>}
                    {couponSuccess && <p className="text-[10px] text-emerald-500 font-mono mt-1">{couponSuccess}</p>}
                    <p className="text-[9px] text-neutral-400/80 font-mono mt-1.5">Note: FUTURE26 offers 15% discount. CAMPUS10 offers 10%.</p>
                  </div>
                )}
              </div>

              {/* Subtotals receipt table */}
              <div className="space-y-2 border-t border-neutral-200/50 dark:border-neutral-800/40 pt-5 text-xs font-mono uppercase tracking-wider text-neutral-400">
                <div className="flex justify-between">
                  <span>Gross Subtotal</span>
                  <span className="text-neutral-900 dark:text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Loyalty reduction ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipment &amp; Freight</span>
                  {deliveryCost === 0 ? (
                    <span className="text-emerald-500 font-bold">FREE DELIVERY</span>
                  ) : (
                    <span className="text-neutral-900 dark:text-white font-bold">${deliveryCost.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>Estimated TAX (8%)</span>
                  <span className="text-neutral-900 dark:text-white font-bold">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-900 dark:text-white font-display font-black uppercase tracking-tight border-t border-dashed border-neutral-120 dark:border-neutral-800 pt-3">
                  <span>Receipt Total</span>
                  <span className="font-mono text-lg font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Verified return node details */}
              <div className="mt-4 pt-4 border-t border-neutral-200/40 dark:border-neutral-800/40 text-[10px] text-neutral-450 dark:text-neutral-500 space-y-2">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck size={12} className="text-cyan-500" />
                  <span className="font-bold uppercase text-neutral-700 dark:text-neutral-300">Authorized Support Node</span>
                </div>
                <p className="font-sans leading-relaxed text-neutral-400 dark:text-neutral-400">
                  Return Center: Survey No.207, Phoenix Mall pune, Store No GP-06A, Viman Nagar Rd, Pune, MH 411014<br />
                  Support Telephone: 08071 178 267<br />
                  Support Mail: customercare@campusshoes.com
                </p>
              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
};

export default function FranchiseForm() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!/^[0-9+\-()\s]{6,}$/.test(form.phone))
      e.phone = "Enter a valid phone number.";
    if (!form.city.trim()) e.city = "City is required.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/franchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess("Your details were submitted successfully.");
      setForm({ fullName: "", email: "", phone: "", city: "" });
    } catch {
      setSuccess("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="">
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Franchise Enquiry</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="text-sm font-medium">Full Name *</label>
          <input
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className={`mt-1 w-full border rounded-md px-3 py-2 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter full name"
          />
          {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`mt-1 w-full border rounded-md px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone Number *</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`mt-1 w-full border rounded-md px-3 py-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>

        {/* City */}
        <div>
          <label className="text-sm font-medium">City *</label>
          <input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={`mt-1 w-full border rounded-md px-3 py-2 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="City"
          />
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {success && <p className="text-green-600 mt-3">{success}</p>}
      </form>
    </div>
    </section>
  );
}

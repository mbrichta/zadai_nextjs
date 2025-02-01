"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { services } from "./large-contact-form";

interface dict {
  [key: string]: any;
}
interface ContactFormProps {
  dictionary: dict;
}

export default function ContactFormSmall({ dictionary }: ContactFormProps) {
  const {
    nameLabel,
    emailLabel,
    companyNameLabel,
    servicesLabel,
    recaptchaLabel,
    recaptchaMessage,
    noServicesMessage,
    submitButton,
    submittingButton,
    successMessage,
    errorMessage,
  } = dictionary.contactForm;

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    nombreEmpresa: "",
    servicios: services.length > 0 ? services[0].value : "",
    recaptchaConfirmado: false,
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaFakeToggle = () => {
    setFormData((prev) => ({
      ...prev,
      recaptchaConfirmado: !prev.recaptchaConfirmado,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.recaptchaConfirmado) {
      setError(recaptchaMessage);
      return;
    }

    setSubmitting(true);

    try {
      // Convert the selected service to English.
      // Since the option values are already set to the English value,
      // we verify by finding the matching entry.
      const englishService =
        services.find((service) => service.value === formData.servicios)
          ?.value || formData.servicios;

      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.nombre,
          email: formData.correo,
          company: formData.nombreEmpresa,
          interested_service: englishService,
        },
      ]);

      if (error) {
        // Log the raw error for debugging.
        console.error("Error submitting form:", error.message);
        throw new Error();
      }

      setSuccess(successMessage);
      setFormData({
        nombre: "",
        correo: "",
        nombreEmpresa: "",
        servicios: services.length > 0 ? services[0].value : "",
        recaptchaConfirmado: false,
      });
    } catch (err: any) {
      setError(errorMessage);
      console.error("Error submitting form:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {/* Contact Form */}
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
            {/* Nombre */}
            <div className="w-full">
              <label htmlFor="nombre" className="block font-semibold">
                {nameLabel}
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                placeholder={nameLabel}
                required
              />
            </div>

            {/* Correo */}
            <div className="w-full">
              <label htmlFor="correo" className="block font-semibold">
                {emailLabel}
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                placeholder={emailLabel}
                required
              />
            </div>
          </div>

          {/* Nombre de la Empresa */}
          <div>
            <label htmlFor="nombreEmpresa" className="block mb-1 font-semibold">
              {companyNameLabel}
            </label>
            <input
              type="text"
              id="nombreEmpresa"
              name="nombreEmpresa"
              value={formData.nombreEmpresa}
              onChange={handleChange}
              className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
              placeholder={companyNameLabel}
              required
            />
          </div>

          {/* Servicios de Interés */}
          <div>
            <label htmlFor="servicios" className="block mb-1 font-semibold">
              {servicesLabel}
            </label>
            {services.length > 0 ? (
              <select
                id="servicios"
                name="servicios"
                value={formData.servicios}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                required
              >
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {dictionary.contactPage.servicesOptions[service.labelKey]}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">
                {dictionary.contactForm.noServicesMessage}
              </p>
            )}
          </div>

          {/* reCAPTCHA (Simulado) */}
          <div>
            <label className="block mb-1 font-semibold">{recaptchaLabel}</label>
            <div
              className="border border-gray-400 rounded-md p-2 flex items-center justify-between cursor-pointer select-none focus:outline-none focus:border-gray-600"
              onClick={handleRecaptchaFakeToggle}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.recaptchaConfirmado}
                  onChange={handleRecaptchaFakeToggle}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{recaptchaLabel}</span>
              </div>
              <span className="text-gray-400 text-sm">reCAPTCHA</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" disabled={submitting}>
              {submitting ? submittingButton : submitButton}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

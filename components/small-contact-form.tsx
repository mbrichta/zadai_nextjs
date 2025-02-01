"use client";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { services } from "./large-contact-form";
import ReCAPTCHA from "react-google-recaptcha";

interface Dict {
  [key: string]: any;
}
interface ContactFormProps {
  dictionary: Dict;
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
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!recaptchaToken) {
      setError(recaptchaMessage);
      return;
    }

    setSubmitting(true);

    try {
      const recaptchaResponse = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recaptchaToken }),
      });
      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.success) {
        setError(recaptchaMessage);
        setSubmitting(false);
        return;
      }

      const englishService =
        services.find((service) => service.value === formData.servicios)
          ?.value || formData.servicios;

      const { error: supabaseError } = await supabase.from("contacts").insert([
        {
          name: formData.nombre,
          email: formData.correo,
          company: formData.nombreEmpresa,
          interested_service: englishService,
        },
      ]);

      if (supabaseError) {
        setError(errorMessage);
        console.error("Error submitting form:", supabaseError.message);
      } else {
        setSuccess(successMessage);
        setFormData({
          nombre: "",
          correo: "",
          nombreEmpresa: "",
          servicios: services.length > 0 ? services[0].value : "",
        });
      }
    } catch (err: any) {
      setError(errorMessage);
      console.error("Error submitting form:", err.message);
    } finally {
      setSubmitting(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
    }
  };

  return (
    <>
      {success && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
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
              <p className="text-red-500">{noServicesMessage}</p>
            )}
          </div>

          <div>
            <ReCAPTCHA
              sitekey={
                process.env.NEXT_PUBLIC_WEBSITE_SECRET_KEY ||
                "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              }
              onChange={handleRecaptchaChange}
              ref={recaptchaRef}
            />
          </div>

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

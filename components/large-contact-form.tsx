// app/[lang]/ContactForm.tsx

"use client";

import { dict } from "@/app/[lang]/page";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const services = [
  { value: "workflow-automation", labelKey: "workflowAutomation" },
  { value: "ai-agent-development", labelKey: "aiAgentDevelopment" },
  { value: "internal-custom-tools", labelKey: "internalCustomTools" },
];

// These maps ensure that the values stored in the database are in English,
// regardless of the current language of the UI.
const translateCompanySize: Record<string, string> = {
  "menos-20": "Less than 20",
  "20-200": "20 to 200",
  "201-500": "201 to 500",
  "500-mas": "More than 500",
};

const translateAnnualRevenue: Record<string, string> = {
  "menos-100k": "Less than 100k",
  "100k-500k": "100k to 500k",
  "500k-1m": "500k to 1m",
  "1m-mas": "More than 1m",
};

export default function ContactForm({ dict }: dict) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: "",
    nombreEmpresa: "",
    tamanoEmpresa: "menos-20",
    ingresosAnuales: "menos-100k",
    servicios: "",
    recaptchaConfirmado: false,
  });

  // Friendly messages – you can also define these in your translation file.
  const recaptchaMessage = dict.contactPage.recaptchaMessage;
  const requiredFieldsError = dict.contactPage.requiredFieldsError; // e.g., "Name, Email, and Interested Services are required."
  const successMessage = dict.contactPage.successMessage;
  const errorMessage = dict.contactPage.errorMessage;

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
    console.log({ formData });
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Check recaptcha
    if (!formData.recaptchaConfirmado) {
      setError(recaptchaMessage);
      return;
    }

    // Ensure required fields are not empty.
    if (!formData.nombre || !formData.correo || !formData.servicios) {
      setError(requiredFieldsError);
      return;
    }

    setSubmitting(true);

    try {
      // Convert the selected service to its English value.
      const englishService =
        services.find((service) => service.value === formData.servicios)
          ?.value || formData.servicios;

      // Insert all properties into the "contacts" table.
      // The company size and annual revenue are translated to English.
      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.nombre,
          email: formData.correo,
          role: formData.rol,
          company: formData.nombreEmpresa,
          company_size: translateCompanySize[formData.tamanoEmpresa],
          annual_income: translateAnnualRevenue[formData.ingresosAnuales],
          interested_service: englishService,
        },
      ]);

      if (error) {
        console.error("Error submitting form:", error.message);
        throw new Error();
      }

      setSuccess(successMessage);
      setFormData({
        nombre: "",
        correo: "",
        rol: "",
        nombreEmpresa: "",
        tamanoEmpresa: "menos-20",
        ingresosAnuales: "menos-100k",
        servicios: "",
        recaptchaConfirmado: false,
      });
    } catch {
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-sm uppercase text-gray-500 block mb-2">
          {dict.contactPage.workingTogether}
        </span>
        <h2 className="text-3xl font-bold mb-2">
          {dict.contactPage.contactUs}
        </h2>
        <p className="text-gray-600 mb-8">
          {dict.contactPage.contactDescription}
        </p>

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

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
              {/* Nombre */}
              <div className="w-full">
                <label htmlFor="nombre" className="block font-semibold">
                  {dict.contactPage.name}
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                  placeholder={dict.contactPage.placeholders.name}
                  required
                />
              </div>

              {/* Correo */}
              <div className="w-full">
                <label htmlFor="correo" className="block font-semibold">
                  {dict.contactPage.email}
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                  placeholder={dict.contactPage.placeholders.email}
                  required
                />
              </div>
            </div>

            {/* Rol */}
            <div>
              <label htmlFor="rol" className="block mb-1 font-semibold">
                {dict.contactPage.role}
              </label>
              <input
                type="text"
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                placeholder={dict.contactPage.placeholders.role}
              />
            </div>

            {/* Nombre de la Empresa */}
            <div>
              <label
                htmlFor="nombreEmpresa"
                className="block mb-1 font-semibold"
              >
                {dict.contactPage.companyName}
              </label>
              <input
                type="text"
                id="nombreEmpresa"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                placeholder={dict.contactPage.placeholders.companyName}
              />
            </div>

            {/* Tamaño de la Empresa */}
            <div>
              <label
                htmlFor="tamanoEmpresa"
                className="block mb-1 font-semibold"
              >
                {dict.contactPage.companySize}
              </label>
              <select
                id="tamanoEmpresa"
                name="tamanoEmpresa"
                value={formData.tamanoEmpresa}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                required
              >
                {dict.contactPage.companySizeOptions.map(
                  (option: string, index: number) => (
                    <option
                      key={index}
                      value={
                        index === 0
                          ? "menos-20"
                          : index === 1
                          ? "20-200"
                          : index === 2
                          ? "201-500"
                          : "500-mas"
                      }
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Ingresos Anuales */}
            <div>
              <label
                htmlFor="ingresosAnuales"
                className="block mb-1 font-semibold"
              >
                {dict.contactPage.annualRevenue}
              </label>
              <select
                id="ingresosAnuales"
                name="ingresosAnuales"
                value={formData.ingresosAnuales}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                required
              >
                {dict.contactPage.annualRevenueOptions.map(
                  (option: string, index: number) => (
                    <option
                      key={index}
                      value={
                        index === 0
                          ? "menos-100k"
                          : index === 1
                          ? "100k-500k"
                          : index === 2
                          ? "500k-1m"
                          : "1m-mas"
                      }
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Servicios Interesados */}
            <div>
              <label htmlFor="servicios" className="block mb-1 font-semibold">
                {dict.contactPage.interestedServices}
              </label>
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
                    {dict.contactPage.servicesOptions[service.labelKey]}
                  </option>
                ))}
              </select>
            </div>

            {/* reCAPTCHA (Simulado) */}
            <div>
              <label className="block mb-1 font-semibold">
                {dict.contactPage.recaptcha}
              </label>
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
                  <span className="text-sm text-gray-700">
                    {dict.contactPage.notARobot}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {dict.contactPage.recaptcha}
                </span>
              </div>
            </div>

            {/* Botón de Envío */}
            <div className="text-center">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : dict.contactPage.submit}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

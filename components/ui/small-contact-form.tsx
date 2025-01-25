// app/contact/ContactFormSmall.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  name: string;
  value: string;
}

interface ContactFormProps {
  services: Service[];
}

export default function ContactFormSmall({ services }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    nombreEmpresa: "",
    servicios: services.length > 0 ? services[0].id : "",
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
      setError("Por favor, confirma reCAPTCHA antes de enviar.");
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.from("contacts").insert([
        {
          name: formData.nombre,
          email: formData.correo,
          company: formData.nombreEmpresa,
          interested_service_id: formData.servicios, // Assuming 'service_id' is the correct column name
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setSuccess("¡Formulario enviado con éxito!");
      // Reset form
      setFormData({
        nombre: "",
        correo: "",
        nombreEmpresa: "",
        servicios: services.length > 0 ? services[0].id : "",
        recaptchaConfirmado: false,
      });
    } catch (err: any) {
      setError(
        err.message ||
          "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo."
      );
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
          Algo salió mal al enviar el formulario. Por favor, inténtalo de nuevo.
        </div>
      )}

      {/* Contact Form */}
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="flex md:flex-row flex-col justify-center items-center gap-6 w-full">
            {/* Nombre */}
            <div className="w-full">
              <label htmlFor="nombre" className="block font-semibold">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 
                        focus:outline-none focus:border-gray-600"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            {/* Correo */}
            <div className="w-full">
              <label htmlFor="correo" className="block font-semibold">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 
                        focus:outline-none focus:border-gray-600"
                placeholder="Ingresa tu correo"
                required
              />
            </div>
          </div>

          {/* Nombre de la Empresa */}
          <div>
            <label htmlFor="nombreEmpresa" className="block mb-1 font-semibold">
              ¿Cuál es el nombre de tu empresa?
            </label>
            <input
              type="text"
              id="nombreEmpresa"
              name="nombreEmpresa"
              value={formData.nombreEmpresa}
              onChange={handleChange}
              className="block w-full border border-gray-400 rounded-md p-2 
                        focus:outline-none focus:border-gray-600"
              placeholder="Ingresa el nombre de tu empresa"
              required
            />
          </div>

          {/* Servicios de Interés */}
          <div>
            <label htmlFor="servicios" className="block mb-1 font-semibold">
              ¿Qué servicios te interesan?
            </label>
            {services.length > 0 ? (
              <select
                id="servicios"
                name="servicios"
                value={formData.servicios}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 
                          focus:outline-none focus:border-gray-600"
                required
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">
                No se encontraron servicios disponibles.
              </p>
            )}
          </div>

          {/* reCAPTCHA (Simulado) */}
          <div>
            <label className="block mb-1 font-semibold">reCAPTCHA</label>
            <div
              className="border border-gray-400 rounded-md p-2 flex items-center 
                        justify-between cursor-pointer select-none 
                        focus:outline-none focus:border-gray-600"
              onClick={handleRecaptchaFakeToggle}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.recaptchaConfirmado}
                  onChange={handleRecaptchaFakeToggle}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">No soy un robot</span>
              </div>
              <span className="text-gray-400 text-sm">reCAPTCHA</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

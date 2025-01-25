"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: "",
    nombreEmpresa: "",
    tamanoEmpresa: "menos-20",
    ingresosAnuales: "menos-100k",
    servicios: "ia-personalizada",
    recaptchaConfirmado: false,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recaptchaConfirmado) {
      alert("Por favor, confirma reCAPTCHA antes de enviar.");
      return;
    }
    alert("¡Formulario enviado!");
  };

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-sm uppercase text-gray-500 block mb-2">
          Vamos a trabajar juntos
        </span>
        <h2 className="text-3xl font-bold mb-2">Contáctanos</h2>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

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

          <div>
            <label htmlFor="rol" className="block mb-1 font-semibold">
              ¿Cuál es tu rol dentro de la organización?
            </label>
            <input
              type="text"
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="block w-full border border-gray-400 rounded-md p-2 
                         focus:outline-none focus:border-gray-600"
              placeholder="Ingresa tu rol"
              required
            />
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

          <div>
            <label htmlFor="tamanoEmpresa" className="block mb-1 font-semibold">
              ¿Cuál es el tamaño de tu empresa en términos de empleados?
            </label>
            <select
              id="tamanoEmpresa"
              name="tamanoEmpresa"
              value={formData.tamanoEmpresa}
              onChange={handleChange}
              className="block w-full border border-gray-400 rounded-md p-2 
                         focus:outline-none focus:border-gray-600"
              required
            >
              <option value="menos-20">Menos de 20 personas</option>
              <option value="20-200">20 - 200 personas</option>
              <option value="201-500">201 - 500 personas</option>
              <option value="500-mas">Más de 500 personas</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="ingresosAnuales"
              className="block mb-1 font-semibold"
            >
              ¿Cuál es el ingreso anual de tu empresa?
            </label>
            <select
              id="ingresosAnuales"
              name="ingresosAnuales"
              value={formData.ingresosAnuales}
              onChange={handleChange}
              className="block w-full border border-gray-400 rounded-md p-2 
                         focus:outline-none focus:border-gray-600"
              required
            >
              <option value="menos-100k">Menos de $100K/mes</option>
              <option value="100k-500k">$100K - $500K/mes</option>
              <option value="500k-1m">$500K - $1M/mes</option>
              <option value="1m-mas">$1M+/mes</option>
            </select>
          </div>

          <div>
            <label htmlFor="servicios" className="block mb-1 font-semibold">
              ¿Qué servicios te interesan?
            </label>
            <select
              id="servicios"
              name="servicios"
              value={formData.servicios}
              onChange={handleChange}
              className="block w-full border border-gray-400 rounded-md p-2 
                         focus:outline-none focus:border-gray-600"
              required
            >
              <option value="ia-personalizada">
                Desarrollar una solución de IA personalizada
              </option>
              <option value="consultoria-ia">
                Consultoría / estrategia de IA
              </option>
              <option value="integracion">Servicios de integración</option>
              <option value="otro">Otro</option>
            </select>
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

          {/* Botón de Envío */}
          <div className="text-center">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

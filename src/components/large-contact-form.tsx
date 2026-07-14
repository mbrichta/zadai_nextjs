import { Button } from '@/components/ui/button'
import type { dict } from '@/types/dictionary'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export const services = [
  { value: 'workflow-automation', labelKey: 'workflowAutomation' },
  { value: 'ai-agent-development', labelKey: 'aiAgentDevelopment' },
  { value: 'internal-custom-tools', labelKey: 'internalCustomTools' },
]

export default function ContactForm({ dict }: { dict: dict }) {
  const contactPage = dict.contactPage as {
    recaptchaMessage: string
    requiredFieldsError: string
    successMessage: string
    errorMessage: string
    workingTogether: string
    contactUs: string
    contactDescription: string
    name: string
    email: string
    role: string
    companyName: string
    companySize: string
    annualRevenue: string
    interestedServices: string
    submit: string
    placeholders: Record<string, string>
    companySizeOptions: string[]
    annualRevenueOptions: string[]
    servicesOptions: Record<string, string>
  }
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: '',
    nombreEmpresa: '',
    tamanoEmpresa: 'menos-20',
    ingresosAnuales: 'menos-100k',
    servicios: '',
    recaptchaConfirmado: false,
  })

  const recaptchaMessage = contactPage.recaptchaMessage as string
  const requiredFieldsError = contactPage.requiredFieldsError as string
  const successMessage = contactPage.successMessage as string
  const errorMessage = contactPage.errorMessage as string

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!recaptchaToken) {
      setError(recaptchaMessage)
      return
    }

    if (!formData.nombre || !formData.correo || !formData.servicios) {
      setError(requiredFieldsError)
      return
    }

    setSubmitting(true)

    try {
      const recaptchaResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      })
      const recaptchaResult = await recaptchaResponse.json()

      if (!recaptchaResult.success) {
        setError(recaptchaMessage)
        setSubmitting(false)
        return
      }

      setSuccess(successMessage)
      setFormData({
        nombre: '',
        correo: '',
        rol: '',
        nombreEmpresa: '',
        tamanoEmpresa: 'menos-20',
        ingresosAnuales: 'menos-100k',
        servicios: '',
        recaptchaConfirmado: false,
      })
    } catch {
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-sm uppercase text-gray-500 block mb-2">
          {contactPage.workingTogether}
        </span>
        <h2 className="text-3xl font-bold mb-2">{contactPage.contactUs}</h2>
        <p className="text-gray-600 mb-8">{contactPage.contactDescription}</p>

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
                  {contactPage.name}
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                  placeholder={contactPage.placeholders.name}
                  required
                />
              </div>

              <div className="w-full">
                <label htmlFor="correo" className="block font-semibold">
                  {contactPage.email}
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                  placeholder={contactPage.placeholders.email}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="rol" className="block mb-1 font-semibold">
                {contactPage.role}
              </label>
              <input
                type="text"
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                placeholder={contactPage.placeholders.role}
              />
            </div>

            <div>
              <label
                htmlFor="nombreEmpresa"
                className="block mb-1 font-semibold"
              >
                {contactPage.companyName}
              </label>
              <input
                type="text"
                id="nombreEmpresa"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                placeholder={contactPage.placeholders.companyName}
              />
            </div>

            <div>
              <label
                htmlFor="tamanoEmpresa"
                className="block mb-1 font-semibold"
              >
                {contactPage.companySize}
              </label>
              <select
                id="tamanoEmpresa"
                name="tamanoEmpresa"
                value={formData.tamanoEmpresa}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                required
              >
                {contactPage.companySizeOptions.map(
                  (option: string, index: number) => (
                    <option
                      key={index}
                      value={
                        index === 0
                          ? 'menos-20'
                          : index === 1
                            ? '20-200'
                            : index === 2
                              ? '201-500'
                              : '500-mas'
                      }
                    >
                      {option}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="ingresosAnuales"
                className="block mb-1 font-semibold"
              >
                {contactPage.annualRevenue}
              </label>
              <select
                id="ingresosAnuales"
                name="ingresosAnuales"
                value={formData.ingresosAnuales}
                onChange={handleChange}
                className="block w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:border-gray-600"
                required
              >
                {contactPage.annualRevenueOptions.map(
                  (option: string, index: number) => (
                    <option
                      key={index}
                      value={
                        index === 0
                          ? 'menos-100k'
                          : index === 1
                            ? '100k-500k'
                            : index === 2
                              ? '500k-1m'
                              : '1m-mas'
                      }
                    >
                      {option}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label htmlFor="servicios" className="block mb-1 font-semibold">
                {contactPage.interestedServices}
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
                    {contactPage.servicesOptions[service.labelKey]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <ReCAPTCHA
                sitekey={
                  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                  '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                }
                onChange={handleRecaptchaChange}
                ref={recaptchaRef}
              />
            </div>

            <div className="text-center">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : contactPage.submit}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

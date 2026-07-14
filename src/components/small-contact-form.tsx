import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import type ReCAPTCHA from 'react-google-recaptcha'
import { services } from './large-contact-form'

interface Dict {
  [key: string]: unknown
}
interface ContactFormProps {
  dictionary: Dict
}

export default function ContactFormSmall({ dictionary }: ContactFormProps) {
  const {
    nameLabel,
    emailLabel,
    companyNameLabel,
    servicesLabel,
    recaptchaLabel: _recaptchaLabel,
    recaptchaMessage: _recaptchaMessage,
    noServicesMessage,
    submitButton,
    submittingButton,
    successMessage,
    errorMessage,
  } = dictionary.contactForm as Record<string, string>

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    nombreEmpresa: '',
    servicios: services.length > 0 ? services[0].value : '',
  })
  const [_recaptchaToken, _setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)

    try {
      setSuccess(successMessage)
      setFormData({
        nombre: '',
        correo: '',
        nombreEmpresa: '',
        servicios: services.length > 0 ? services[0].value : '',
      })
    } catch (err: unknown) {
      setError(errorMessage)
      console.error(
        'Error submitting form:',
        err instanceof Error ? err.message : err,
      )
    } finally {
      setSubmitting(false)
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
      _setRecaptchaToken(null)
    }
  }

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
                    {
                      (
                        dictionary.contactPage as Record<
                          string,
                          Record<string, string>
                        >
                      ).servicesOptions[service.labelKey]
                    }
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">{noServicesMessage}</p>
            )}
          </div>

          <div>
            {/* <ReCAPTCHA
              sitekey={
                process.env.NEXT_PUBLIC_WEBSITE_SECRET_KEY ||
                "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              }
              onChange={handleRecaptchaChange}
              ref={recaptchaRef}
            /> */}
          </div>

          <div className="text-center">
            <Button type="submit" disabled={submitting}>
              {submitting ? submittingButton : submitButton}
            </Button>
          </div>
        </form>
      )}
    </>
  )
}

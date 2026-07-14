import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import { Container } from '@/components/marketing/container'
import { SectionHeader } from '@/components/marketing/section-header'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { dict } from '@/types/dictionary'

export const services = [
  { value: 'workflow-automation', labelKey: 'workflowAutomation' },
  { value: 'ai-agent-development', labelKey: 'aiAgentDevelopment' },
  { value: 'internal-custom-tools', labelKey: 'internalCustomTools' },
]

const COMPANY_SIZE_VALUES = ['menos-20', '20-200', '201-500', '500-mas']
const REVENUE_VALUES = ['menos-100k', '100k-500k', '500k-1m', '1m-mas']

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
    tamanoEmpresa: COMPANY_SIZE_VALUES[0],
    ingresosAnuales: REVENUE_VALUES[0],
    servicios: services[0]?.value ?? '',
  })

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!recaptchaToken) {
      setError(contactPage.recaptchaMessage)
      return
    }

    if (!formData.nombre || !formData.correo || !formData.servicios) {
      setError(contactPage.requiredFieldsError)
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
        setError(contactPage.recaptchaMessage)
        setSubmitting(false)
        return
      }

      setSuccess(contactPage.successMessage)
      setFormData({
        nombre: '',
        correo: '',
        rol: '',
        nombreEmpresa: '',
        tamanoEmpresa: COMPANY_SIZE_VALUES[0],
        ingresosAnuales: REVENUE_VALUES[0],
        servicios: services[0]?.value ?? '',
      })
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()
    } catch {
      setError(contactPage.errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="border-b border-border py-16 md:py-24">
      <Container>
        <div className="grid gap-8 border border-border bg-card p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
          <SectionHeader
            eyebrow={contactPage.workingTogether}
            title={contactPage.contactUs}
            description={contactPage.contactDescription}
            align="left"
            className="mb-0"
          />

          <div className="border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            {success ? (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">{contactPage.name}</Label>
                    <Input
                      type="text"
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      placeholder={contactPage.placeholders.name}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correo">{contactPage.email}</Label>
                    <Input
                      type="email"
                      id="correo"
                      value={formData.correo}
                      onChange={(e) =>
                        setFormData({ ...formData, correo: e.target.value })
                      }
                      placeholder={contactPage.placeholders.email}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rol">{contactPage.role}</Label>
                  <Input
                    type="text"
                    id="rol"
                    value={formData.rol}
                    onChange={(e) =>
                      setFormData({ ...formData, rol: e.target.value })
                    }
                    placeholder={contactPage.placeholders.role}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombreEmpresa">
                    {contactPage.companyName}
                  </Label>
                  <Input
                    type="text"
                    id="nombreEmpresa"
                    value={formData.nombreEmpresa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nombreEmpresa: e.target.value,
                      })
                    }
                    placeholder={contactPage.placeholders.companyName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tamanoEmpresa">
                    {contactPage.companySize}
                  </Label>
                  <Select
                    value={formData.tamanoEmpresa}
                    onValueChange={(value) =>
                      setFormData({ ...formData, tamanoEmpresa: value })
                    }
                  >
                    <SelectTrigger id="tamanoEmpresa" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contactPage.companySizeOptions.map((option, index) => (
                        <SelectItem
                          key={option}
                          value={COMPANY_SIZE_VALUES[index] ?? option}
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ingresosAnuales">
                    {contactPage.annualRevenue}
                  </Label>
                  <Select
                    value={formData.ingresosAnuales}
                    onValueChange={(value) =>
                      setFormData({ ...formData, ingresosAnuales: value })
                    }
                  >
                    <SelectTrigger id="ingresosAnuales" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contactPage.annualRevenueOptions.map((option, index) => (
                        <SelectItem
                          key={option}
                          value={REVENUE_VALUES[index] ?? option}
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servicios">
                    {contactPage.interestedServices}
                  </Label>
                  <Select
                    value={formData.servicios}
                    onValueChange={(value) =>
                      setFormData({ ...formData, servicios: value })
                    }
                  >
                    <SelectTrigger id="servicios" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {contactPage.servicesOptions[service.labelKey]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

                <div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="min-w-[140px]"
                  >
                    {submitting
                      ? `${contactPage.submit}...`
                      : contactPage.submit}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

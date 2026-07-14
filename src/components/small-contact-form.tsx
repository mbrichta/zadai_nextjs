import { useRef, useState } from 'react'
import type ReCAPTCHA from 'react-google-recaptcha'

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
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const servicesOptions = (
    dictionary.contactPage as Record<string, Record<string, string>>
  ).servicesOptions

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
      recaptchaRef.current?.reset()
    }
  }

  if (success) {
    return (
      <Alert>
        <AlertDescription>{success}</AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">{nameLabel}</Label>
          <Input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            placeholder={nameLabel}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="correo">{emailLabel}</Label>
          <Input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={(e) =>
              setFormData({ ...formData, correo: e.target.value })
            }
            placeholder={emailLabel}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nombreEmpresa">{companyNameLabel}</Label>
        <Input
          type="text"
          id="nombreEmpresa"
          name="nombreEmpresa"
          value={formData.nombreEmpresa}
          onChange={(e) =>
            setFormData({ ...formData, nombreEmpresa: e.target.value })
          }
          placeholder={companyNameLabel}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="servicios">{servicesLabel}</Label>
        {services.length > 0 ? (
          <Select
            value={formData.servicios}
            onValueChange={(value) =>
              setFormData({ ...formData, servicios: value })
            }
          >
            <SelectTrigger id="servicios" className="w-full">
              <SelectValue placeholder={servicesLabel} />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {servicesOptions[service.labelKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-destructive">{noServicesMessage}</p>
        )}
      </div>

      <div>
        <Button type="submit" disabled={submitting} className="min-w-[140px]">
          {submitting ? submittingButton : submitButton}
        </Button>
      </div>
    </form>
  )
}

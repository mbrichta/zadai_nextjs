import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/tanstack-form')({
  component: TanStackFormDemo,
})

function TanStackFormDemo() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      alert(`Submitted: ${value.name} <${value.email}>`)
    },
  })

  return (
    <main className="page-wrap px-4 pb-8 pt-20 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">TanStack Form Demo</h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Example form using @tanstack/react-form. Contact forms in this app still
        use the legacy controlled-input pattern from the Next.js migration.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <form.Field name="name">
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm mb-1">
                Name
              </label>
              <input
                id={field.name}
                className="w-full border rounded-md px-3 py-2"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm mb-1">
                Email
              </label>
              <input
                id={field.name}
                type="email"
                className="w-full border rounded-md px-3 py-2"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </main>
  )
}

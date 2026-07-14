import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en-US/')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})

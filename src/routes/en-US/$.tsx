import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en-US/$')({
  beforeLoad: ({ location }) => {
    const stripped = location.pathname.replace(/^\/en-US/, '') || '/'
    throw redirect({ to: stripped })
  },
})

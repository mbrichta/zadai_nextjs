import axios from 'axios'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/verify-recaptcha')({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify({ message: 'Hello World' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      POST: async ({ request }) => {
        try {
          const { token } = (await request.json()) as { token: string }
          const secretKey = process.env.CAPTCHA_SECRET_KEY

          const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
              params: {
                secret: secretKey,
                response: token,
              },
            },
          )

          const { success } = response.data as { success: boolean }

          return new Response(JSON.stringify({ success }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Unknown error'
          console.error('Error verifying reCAPTCHA', error)
          return new Response(JSON.stringify({ success: false, error: message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      },
    },
  },
})

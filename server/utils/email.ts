import process from 'node:process'
import { Resend } from 'resend'

interface EmailProps {
  to: string | string[]
  subject: string
  text: string
}

export async function sendEmail({
  to,
  subject,
  text,
}: EmailProps) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const data = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    subject,
    text,
  })

  return data
}

import { useForm } from '@inertiajs/react'
import AuthLayout from '@/layouts/auth'

export default function AuthVerifyEmail(props) {
  const { data, setData, post, processing, errors } = useForm({
    emailVerificationCode: '',
  })

  function submit(e) {
    e.preventDefault()
    post('/verify-email')
  }

  return (
    <>
      <p className="text-center text-gray-600">
        Enter the email verification code sent to your email address.
      </p>
      <form method="POST" onSubmit={submit} className="mt-5 space-y-3">
        {errors.verifyEmail ? (
          <p className="text-sm text-red-500">{errors.verifyEmail}</p>
        ) : null}
        <input
          className="w-full rounded border px-2 py-2 focus:outline-teal-300"
          placeholder="123456"
          value={data.emailVerificationCode}
          onChange={(e) => setData('emailVerificationCode', e.target.value)}
        />
         {errors.emailVerificationCode ? (
          <p className="text-sm text-red-500">{errors.emailVerificationCode}</p>
        ) : null}

        <button
          disabled={processing}
          className="w-full rounded-md bg-teal-300 px-3 py-2 transition-colors hover:bg-teal-400 disabled:cursor-not-allowed disabled:bg-teal-100"
        >
          {processing ? 'Verifying email...' : 'Verify email'}
        </button>
      </form>
    </>
  )
}

AuthVerifyEmail.layout = (page) => (
  <AuthLayout children={page} title="Verify email" />
)

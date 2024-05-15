import { Head, Link, useForm, usePage } from '@inertiajs/react'
import AuthLayout from '@/layouts/auth'

export default function AuthLogin(props) {
  const { data, setData, post, processing, errors } = useForm({
    emailAddress: '',
    password: '',
    rememberMe: false
  })

  function submit(e) {
    e.preventDefault()
    post('/login')
  }
  return (
    <>
      <p className="text-center text-gray-600">
        Welcome back, now let's partydown.
      </p>
      <form method="POST" onSubmit={submit} className="mt-5 space-y-3">
        {errors.login ? (
          <p className="text-sm text-red-500">{errors.login}</p>
        ) : null}

        <input
          type="email"
          required
          className="w-full rounded border px-2 py-2 focus:outline-teal-300"
          placeholder="mike@sailsconf.com"
          value={data.emailAddress}
          onChange={(e) => setData('emailAddress', e.target.value)}
        />
        {errors.emailAddress ? (
          <p className="text-sm text-red-500">{errors.emailAddress}</p>
        ) : null}

        <input
          type="password"
          required
          className="w-full rounded border px-2 py-2 focus:outline-teal-300"
          placeholder="Super secret password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
        />
        {errors.password ? (
          <p className="text-sm text-red-500">{errors.password}</p>
        ) : null}

        <label htmlFor="rememberMe" className="text-gray-500 flex items-center space-x-2">
          <input id="rememberMe" type="checkbox" checked={data.rememberMe} onChange={(e) => setData('rememberMe', e.target.checked)} />
          <span>Remember me</span>

        </label>
        <button
          disabled={processing}
          className="w-full rounded-md bg-teal-300 px-3 py-2 transition-colors hover:bg-teal-400 disabled:cursor-not-allowed disabled:bg-teal-100"
        >
          {processing ? 'Login you in...' : 'Login'}
        </button>
        <p className="text-center text-gray-600">
        Don't have a Partydown account? <Link className="underline text-teal-400" href="/signup">Sign up</Link>
      </p>
      </form>
    </>
  )
}

AuthLogin.layout = (page) => <AuthLayout children={page} title="Login" />

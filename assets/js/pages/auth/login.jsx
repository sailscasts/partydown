
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import AuthLayout from '@/layouts/auth'

export default function AuthLogin(props) {
  const { data, setData, post, processing, errors } = useForm({
    emailAddress: '',
    password: ''
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

        { errors.login ? <p className="text-red-500 text-sm">{ errors.login }</p> : null}

          <input
            type="email"
            required
            className="w-full rounded border px-2 py-2 focus:outline-teal-300"
            placeholder="mike@sailsconf.com"
            value={data.emailAddress} onChange={e => setData('emailAddress', e.target.value)}
          />
         { errors.emailAddress ? <p className="text-red-500 text-sm">{ errors.emailAddress }</p> : null}

            <input
            type="password"
            required
            className="w-full rounded border px-2 py-2 focus:outline-teal-300"
            placeholder="Super secret password"
            value={data.password} onChange={e => setData('password', e.target.value)}
          />
          { errors.password ? <p className="text-red-500 text-sm">{ errors.password }</p> : null}

          <button disabled={processing} className='disabled:bg-teal-100 disabled:cursor-not-allowed bg-teal-300 w-full rounded-md px-3 py-2 hover:bg-teal-400 transition-colors'>{ processing ? 'Login you in...' : 'Login'}</button>
      </form>
    </>
  )
}

AuthLogin.layout = (page) => <AuthLayout children={page} title='Login' />

import { Link, useForm } from '@inertiajs/react'
import AuthLayout from '@/layouts/auth'

export default function AuthSignup(props) {
  const { data, setData, post, processing, errors } = useForm({
    fullName: '',
    emailAddress: '',
    password: ''
  })

  function submit(e) {
    e.preventDefault()
    post('/signup')
  }
  return (
    <>
      <p className="text-center text-gray-600">
        Signup to enjoy the best markdown note taking experience
      </p>
      <form method="POST" onSubmit={submit} className="mt-5 space-y-3">

        { errors.signup ? <p className="text-red-500 text-sm">{ errors.signup }</p> : null}
          <input
            required
            className="w-full rounded border px-2 py-2 focus:outline-teal-300"
            placeholder="Mike McNeil"
            value={data.fullName} onChange={e => setData('fullName', e.target.value)}
          />
         { errors.fullName ? <p className="text-red-500 text-sm">{ errors.fullName }</p> : null}
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

          <p className='text-gray-500 text-sm'>By signing up you accept our terms and conditions.</p>
          <button disabled={processing} className='disabled:bg-teal-100 disabled:cursor-not-allowed bg-teal-300 w-full rounded-md px-3 py-2 hover:bg-teal-400 transition-colors'>{ processing ? 'Signing you up...' : 'Sign up'}</button>
      </form>
    </>
  )
}

AuthSignup.layout = (page) => <AuthLayout children={page} title='Signup' />

import { Head } from '@inertiajs/react'
export default function AuthLayout({ children, title }) {
  return (
    <>
      <Head title={`${title} · Partydown`} />
      <main className="mx-auto w-3/12 mt-28">{children}</main>
    </>
  )
}

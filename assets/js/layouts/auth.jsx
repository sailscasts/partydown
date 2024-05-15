import { Head } from '@inertiajs/react'
export default function AuthLayout({ children, title }) {
  return (
    <>
      <Head title={`${title} · Partydown`} />
      <main className="mx-auto mt-28 w-3/12">
        <h1 className="mb-3 text-center font-serif text-4xl">Partydown</h1>
        {children}
      </main>
    </>
  )
}

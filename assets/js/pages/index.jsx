import {
  headingsPlugin,
  linkPlugin,
  imagePlugin,
  codeBlockPlugin,
  quotePlugin,
  listsPlugin,
  MDXEditor,
  markdownShortcutPlugin,
} from '@mdxeditor/editor'
import { useState, useRef } from 'react'
import '@mdxeditor/editor/style.css'
import { Head, Link, usePage, useForm } from '@inertiajs/react'
import debounce from 'lodash.debounce'

export default function Index({ partydown, message }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const editorRef = useRef(null)

  const loggedInUser = usePage().props.loggedInUser
  const createPartydownForm = useForm({})

  const updatePartydownForm = useForm({
    publicId: partydown?.publicId,
    content: '',
  })

  function onEditorChange(markdown) {
    debouncedUpdatePartydown(markdown)
  }

  const debouncedUpdatePartydown = debounce((markdown) => {
    updatePartydownForm.data.content = markdown
    updatePartydownForm.put(`/partydowns/${partydown?.publicId}`, {
      preserveScroll: true,
    })
  }, 4_000)

  function createPartydown() {
    createPartydownForm.post('/partydowns')
  }

  return (
    <>
      <Head
        title={partydown ? `${partydown.title} · Partydown` : 'Partydown'}
      />
      <nav className="flex justify-between px-4 py-2">
        <ul>
          <li>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-md bg-slate-50 px-3 py-2 transition-colors hover:bg-slate-100"
            >
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              )}
            </button>
          </li>
        </ul>
        <ul className="flex space-x-2 items-center">
        <li className="text-gray-400 text-sm">
            <p>
              {updatePartydownForm.processing ? 'Saving...' : null}
              {updatePartydownForm.recentlySuccessful ? 'Saved!' : null}
            </p>
          </li>
          <li>
            <button className="rounded-md bg-teal-50 px-3 py-2 text-teal-800 transition-colors hover:bg-teal-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
      <aside
        aria-label="sidebar"
        className={`top-13 fixed z-10 min-h-[90%] w-72 rounded-br-lg rounded-tr-lg border border-slate-200 bg-white px-3 py-2 drop-shadow-xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <section className="flex justify-between px-2 py-4">
          <p className="truncate">{loggedInUser.fullName}</p>
          <Link
            href="/partydowns"
            method="post"
            as="button"
            title="New partydown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Link>
        </section>
        <p className="pl-2 text-sm text-gray-400">Your Partydowns</p>
        <ul className="space-y-2">
          {loggedInUser.partydowns.map((partydown) => (
            <li key={partydown?.publicId}>
              <Link
                className="block truncate rounded-sm px-2 py-1 transition-colors hover:bg-gray-100 active:bg-gray-100"
                href={`/${partydown?.publicId}`}
              >
                {partydown.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="px-3 lg:mx-auto lg:w-6/12">
        {partydown ? (
          <MDXEditor
            markdown={partydown?.content}
            autoFocus
            contentEditableClassName="prose lg:prose-xl"
            onChange={onEditorChange}
            ref={editorRef}
            plugins={[
              headingsPlugin(),
              linkPlugin(),
              imagePlugin(),
              codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
              quotePlugin(),
              listsPlugin(),
              markdownShortcutPlugin(),
            ]}
          />
        ) : (
          <section className="flex min-h-screen flex-col items-center justify-center space-y-3">
            <p className="text-lg text-gray-500">{message}</p>
            <Link
              href="/partydowns"
              as="button"
              method="post"
              className="w-3/12 rounded-md bg-teal-300 px-3 py-2 transition-colors hover:bg-teal-400 disabled:cursor-not-allowed disabled:bg-teal-100"
              disabled={createPartydownForm.processing}
              onClick={createPartydown}
            >
              Create a partydown
            </Link>
          </section>
        )}
      </main>
    </>
  )
}

import {
  headingsPlugin,
  linkPlugin,
  imagePlugin,
  codeBlockPlugin,
  quotePlugin,
  listsPlugin,
  MDXEditor,
  type MDXEditorMethods,
} from '@mdxeditor/editor'
import { useRef } from 'react'
import '@mdxeditor/editor/style.css'
import { Head } from '@inertiajs/react'

export default function Index({ partydown, message }) {
  const editorRef = useRef<MDXEditorMethods>(null)
  function onEditorChange(markdown) {
    editorRef.current?.setMarkdown(markdown)
  }
  return (
    <>
      <Head
        title={partydown ? `${partydown.title} · Partydown` : 'Partydown'}
      />
      <nav className="flex justify-between px-4 py-2">
        <ul>
          <button className="rounded-md px-3 py-2 transition-colors hover:bg-slate-50">
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
          </button>
        </ul>
        <ul>
          <button
            onClick={() =>
              editorRef.current?.insertMarkdown('new markdown to insert')
            }
            className="rounded-md bg-teal-50 px-3 py-2 text-teal-800 transition-colors hover:bg-teal-100"
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
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </button>
        </ul>
      </nav>
      <main className="px-3 lg:mx-auto lg:w-6/12">
        {partydown ? (
          <MDXEditor
            ref={editorRef}
            markdown={partydown.content}
            autoFocus
            contentEditableClassName="prose lg:prose-xl"
            onChange={onEditorChange}
            plugins={[
              headingsPlugin(),
              linkPlugin(),
              imagePlugin(),
              codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
              quotePlugin(),
              listsPlugin(),
            ]}
          />
        ) : (
          <p>{message}</p>
        )}
      </main>
    </>
  )
}


import { Head, Link, useForm, usePage } from '@inertiajs/react'
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

export default function SharedPartydown({ sharedPartydown }) {
  return <>
    <Head
        title={`${sharedPartydown.title} · Partydown`}
      />
      <main>
      <MDXEditor
            markdown={sharedPartydown.content}
            contentEditableClassName="prose lg:prose-xl"
            readOnly
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
      </main>
  </>
}

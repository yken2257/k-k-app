'use client'

import { createNote } from '@/app/actions/notes'
import { useState } from 'react'

export default function NoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const title = formData.get('title') as string
      const content = formData.get('content') as string

      if (!title.trim()) {
        throw new Error('Title is required')
      }

      await createNote({
        title: title.trim(),
        content: content.trim() || undefined,
      })

      // Reset form
      const form = document.getElementById('note-form') as HTMLFormElement
      form?.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Create New Note</h2>
      
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <form id="note-form" action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50"
            placeholder="Enter note title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50"
            placeholder="Enter note content (optional)"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  )
}
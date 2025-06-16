import { createClient } from '@/lib/supabase-server'
import { getNotes } from '@/app/actions/notes'
import { redirect } from 'next/navigation'
import NoteForm from './note-form'
import NoteList from './note-list'

export default async function NotesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let notes = []
  let error = null

  try {
    notes = await getNotes()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load notes'
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Notes (CRUD Test)</h1>
          <p className="text-muted-foreground mt-2">
            Testing database connection and Row-Level Security
          </p>
          <p className="text-sm text-muted-foreground">
            User: {user.email}
          </p>
        </div>

        <div className="space-y-8">
          <NoteForm />
          
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-red-800">
              Error: {error}
            </div>
          )}
          
          <NoteList notes={notes} />
        </div>

        <div className="mt-8 pt-8 border-t">
          <a
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
'use client'

import { deleteNote } from '@/app/actions/notes'
import type { Note } from '@/types/database'
import { useState } from 'react'

interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this note?')) {
      return
    }

    setDeletingIds(prev => new Set(prev).add(id))

    try {
      await deleteNote(id)
    } catch (err) {
      console.error('Failed to delete note:', err)
      alert('Failed to delete note')
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No notes yet. Create your first note above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Notes ({notes.length})</h2>
      
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-1 truncate">
                  {note.title}
                </h3>
                {note.content && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Created: {new Date(note.created_at).toLocaleString()}
                  {note.updated_at !== note.created_at && (
                    <span className="ml-2">
                      • Updated: {new Date(note.updated_at).toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                disabled={deletingIds.has(note.id)}
                className="flex-shrink-0 px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {deletingIds.has(note.id) ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
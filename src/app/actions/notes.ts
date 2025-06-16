'use server'

import { createClient } from '@/lib/supabase-server'
import type { CreateNoteData, UpdateNoteData } from '@/types/database'
import { revalidatePath } from 'next/cache'

export async function createNote(data: CreateNoteData) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data: note, error } = await supabase
    .from('notes')
    .insert({
      title: data.title,
      content: data.content || null,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create note: ${error.message}`)
  }

  revalidatePath('/notes')
  return note
}

export async function getNotes() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch notes: ${error.message}`)
  }

  return notes
}

export async function updateNote(id: string, data: UpdateNoteData) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data: note, error } = await supabase
    .from('notes')
    .update(data)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update note: ${error.message}`)
  }

  revalidatePath('/notes')
  return note
}

export async function deleteNote(id: string) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(`Failed to delete note: ${error.message}`)
  }

  revalidatePath('/notes')
}
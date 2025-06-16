export interface Note {
  id: string
  user_id: string
  title: string
  content: string | null
  created_at: string
  updated_at: string
}

export interface CreateNoteData {
  title: string
  content?: string
}

export interface UpdateNoteData {
  title?: string
  content?: string
}
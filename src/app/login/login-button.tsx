'use client'

import { createClient } from '@/lib/supabase'

export default function LoginButton() {
  const supabase = createClient()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Error logging in:', error.message)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      Googleでログイン
    </button>
  )
}

import { createClient } from '@/lib/supabase-server'
import LogoutButton from './logout-button'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">K-K App</h1>
        <p className="text-center text-lg mb-8">
          Private couple's web application for expense tracking, to-dos, and
          calendar
        </p>

        {user && (
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              ログイン中: {user.email}
            </p>
            <LogoutButton />
          </div>
        )}
      </div>
    </main>
  )
}

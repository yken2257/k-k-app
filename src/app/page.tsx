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
            <div className="flex gap-4 justify-center">
              <a
                href="/notes"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Test Notes (CRUD)
              </a>
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

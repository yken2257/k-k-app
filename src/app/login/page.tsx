import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import LoginButton from './login-button'

export default async function LoginPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">K&K App</h1>
          <p className="text-sm text-muted-foreground">
            プライベートアプリです
          </p>
        </div>
        <LoginButton />
      </div>
    </div>
  )
}

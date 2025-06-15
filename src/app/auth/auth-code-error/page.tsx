export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-red-600">
            認証エラー
          </h1>
          <p className="text-sm text-muted-foreground">
            ログイン中にエラーが発生しました。もう一度お試しください。
          </p>
        </div>
        <a
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          ログインページに戻る
        </a>
      </div>
    </div>
  )
}

'use client'

import { UserProvider } from "./context/user-context"
import { useUser } from "./context/user-context"
import { Header } from "@/components/header"
import { LoginForm } from "@/components/login-form"
import { TypingTest } from "@/components/typing-text"

function Content() {
  const { user } = useUser()

  return (
    <>
      <Header />
      <main className="container py-8">
        {!user ? (
          <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
            <LoginForm />
          </div>
        ) : (
          <TypingTest />
        )}
      </main>
    </>
  )
}

export default function Page() {
  return (
    <UserProvider>
      <Content />
    </UserProvider>
  )
}


'use client'

import { useUser } from "@/app/context/user-context"
import { Button } from "@/components/ui/button"

export function Header() {
  const { user, logout } = useUser()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-2xl font-bold">Typing Test</h1>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {user}</span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        )}
      </div>
    </header>
  )
}


"use client"

import * as React from "react"
import Link from "next/link"
import { PaperclipIcon as Paper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { inter } from "@/lib/fonts"
import { useRouter } from 'next/navigation';

// Define a type for navigation items
interface NavItem {
  title: string;
  href: string;
  onClick?: () => void; // onClick is optional
}

const baseNavItems: NavItem[] = [
  {
    title: "Templates",
    href: "/templates/preview",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "InterviewGPT",
    href: "https://resume-improviser.vercel.app/",
  },
  {
    title: "Reviews",
    href: "/blog",
  },
  // Login/Logout item will be added dynamically
]

export function MainNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const router = useRouter();

  React.useEffect(() => {
    const storedCredentials = localStorage.getItem("userCredentials")
    setIsLoggedIn(!!storedCredentials)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userCredentials")
    localStorage.removeItem("userData")
    localStorage.removeItem("resumeData")
    setIsLoggedIn(false)
    setIsOpen(false)
    router.push('/');
  }

  const navItems: NavItem[] = [
    ...baseNavItems,
    isLoggedIn
      ? { title: "Logout", href: "#", onClick: handleLogout } // Use # as href for button-like item
      : { title: "Login", href: "/login" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors">
            <Paper className="h-6 w-6" />
            <span className={cn(inter.className, "font-semibold hidden sm:inline-block")}>ResumeBuilder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item: NavItem) => (
              item.onClick ? (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className={cn(inter.className, "text-sm text-gray-600 hover:text-gray-900 transition-colors")}
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(inter.className, "text-sm text-gray-600 hover:text-gray-900 transition-colors")}
                >
                  {item.title}
                </Link>
              )
            ))}
            <Button asChild>
              <Link href="/builder">Create Resume</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <nav className="flex flex-col gap-4">
                {navItems.map((item: NavItem) => (
                  item.onClick ? (
                    <button
                      key={item.title}
                      onClick={item.onClick}
                      className={cn(
                        inter.className,
                        "block px-2 py-1 text-lg text-left text-gray-600 hover:text-gray-900 transition-colors",
                      )}
                    >
                      {item.title}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        inter.className,
                        "block px-2 py-1 text-lg text-gray-600 hover:text-gray-900 transition-colors",
                      )}
                    >
                      {item.title}
                    </Link>
                  )
                ))}
                <Button asChild className="mt-4 border border-black">
                  <Link href="/builder" onClick={() => setIsOpen(false)}>
                    Create Resume
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}


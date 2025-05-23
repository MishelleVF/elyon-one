import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"
import { AuthProvider } from "@/context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Elyon One - Sistema de Tracking",
  description: "Sistema de tracking de procesos de facturación y aduanas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Elyon One. Todos los derechos reservados.
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

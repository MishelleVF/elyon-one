import LoginForm from "@/components/LoginForm"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-4xl p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tighter">Bienvenido a Elyon One</h1>
            <p className="text-gray-500">Sistema de tracking de procesos de facturación y aduanas</p>
          </div>
          <LoginForm />
        </div>
        <div className="hidden md:flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="relative w-full h-full max-h-80">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Elyon One"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

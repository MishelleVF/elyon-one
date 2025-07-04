import LoginForm from "@/components/LoginForm"
import Image from "next/image"
import bg from "@/app/login/loginfondo.png"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt="Fondo de login"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Opcional: overlay semi-transparente si quieres atenuar la imagen */}
      <div className="absolute inset-0 bg-black/30 -z-5"></div>

      {/* Contenedor del form, alineado a la derecha */}
      <div className="relative z-10 flex items-center justify-end min-h-screen p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Bienvenido a Elyon One</h1>
            <p className="text-gray-500">
              Sistema de tracking de procesos de facturación y aduanas
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

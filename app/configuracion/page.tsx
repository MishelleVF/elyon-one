"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import { Bell, Moon, Sun, Globe, Lock, Shield } from "lucide-react"

export default function ConfiguracionPage() {
  const { user, isLoading } = useAuth()
  const [settings, setSettings] = useState({
    theme: "light",
    language: "es",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
  })

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }

    // Simulación de carga de datos
    const fetchData = async () => {
      try {
        // Aquí se conectaría con la API real
        // const response = await fetch('/api/settings')
        // const data = await response.json()
        // Por ahora usamos los datos por defecto
      } catch (error) {
        console.error("Error al cargar la configuración:", error)
      }
    }

    if (!isLoading && user) {
      fetchData()
    }
  }, [isLoading, user])

  const handleToggleChange = (category, setting) => {
    if (category) {
      setSettings({
        ...settings,
        [category]: {
          ...settings[category],
          [setting]: !settings[category][setting],
        },
      })
    } else {
      setSettings({
        ...settings,
        [setting]: settings[setting] === "light" ? "dark" : "light",
      })
    }
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  const handleSaveSettings = () => {
    // Aquí se implementaría la lógica para guardar la configuración en el servidor
    console.log("Configuración guardada:", settings)

    // Simulación de guardado exitoso
    alert("Configuración guardada correctamente")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-gray-500">Ajustes de la aplicación</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Apariencia */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-500 text-white px-6 py-3">
            <h2 className="text-lg font-semibold">Apariencia</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {settings.theme === "light" ? (
                  <Sun className="mr-3 text-yellow-500" size={20} />
                ) : (
                  <Moon className="mr-3 text-blue-500" size={20} />
                )}
                <div>
                  <p className="font-medium">Tema</p>
                  <p className="text-sm text-gray-500">Cambiar entre tema claro y oscuro</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.theme === "dark"}
                  onChange={() => handleToggleChange(null, "theme")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="mr-3 text-green-500" size={20} />
                <div>
                  <p className="font-medium">Idioma</p>
                  <p className="text-sm text-gray-500">Seleccionar el idioma de la aplicación</p>
                </div>
              </div>
              <select
                name="language"
                value={settings.language}
                onChange={handleSelectChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-500 text-white px-6 py-3">
            <h2 className="text-lg font-semibold">Notificaciones</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-3 text-orange-500" size={20} />
                <div>
                  <p className="font-medium">Notificaciones por email</p>
                  <p className="text-sm text-gray-500">Recibir actualizaciones por correo electrónico</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.email}
                  onChange={() => handleToggleChange("notifications", "email")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-3 text-purple-500" size={20} />
                <div>
                  <p className="font-medium">Notificaciones push</p>
                  <p className="text-sm text-gray-500">Recibir notificaciones en el navegador</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.push}
                  onChange={() => handleToggleChange("notifications", "push")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-3 text-red-500" size={20} />
                <div>
                  <p className="font-medium">Notificaciones SMS</p>
                  <p className="text-sm text-gray-500">Recibir notificaciones por mensaje de texto</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.sms}
                  onChange={() => handleToggleChange("notifications", "sms")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-500 text-white px-6 py-3">
            <h2 className="text-lg font-semibold">Seguridad</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="mr-3 text-green-500" size={20} />
                <div>
                  <p className="font-medium">Autenticación de dos factores</p>
                  <p className="text-sm text-gray-500">Aumentar la seguridad de tu cuenta</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.security.twoFactor}
                  onChange={() => handleToggleChange("security", "twoFactor")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="mr-3 text-red-500" size={20} />
                <div>
                  <p className="font-medium">Tiempo de sesión</p>
                  <p className="text-sm text-gray-500">Minutos antes de cerrar sesión por inactividad</p>
                </div>
              </div>
              <select
                name="sessionTimeout"
                value={settings.security.sessionTimeout}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      sessionTimeout: Number.parseInt(e.target.value),
                    },
                  })
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
              >
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="60">1 hora</option>
                <option value="120">2 horas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  )
}

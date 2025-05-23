"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import { Clock, FileText } from "lucide-react"

export default function RankingPage() {
  const { user, isLoading } = useAuth()
  const [rankings, setRankings] = useState({ tiempoAhorrado: [], documentosProcesados: [] })
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }

    // Simulación de carga de datos
    const fetchData = async () => {
      try {
        // Aquí se conectaría con la API real
        // const response = await fetch('/api/rankings')
        // const data = await response.json()

        // Datos de ejemplo
        const mockData = {
          tiempoAhorrado: [
            {
              id: 1,
              nombre: "Juan Pérez",
              departamento: "Carga",
              tiempoAhorrado: "15 días",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 2,
              nombre: "María López",
              departamento: "Aduanas",
              tiempoAhorrado: "12 días",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 3,
              nombre: "Carlos Rodríguez",
              departamento: "Carga",
              tiempoAhorrado: "10 días",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 4,
              nombre: "Ana Martínez",
              departamento: "Aduanas",
              tiempoAhorrado: "8 días",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 5,
              nombre: "Pedro Sánchez",
              departamento: "Carga",
              tiempoAhorrado: "7 días",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
          documentosProcesados: [
            {
              id: 2,
              nombre: "María López",
              departamento: "Aduanas",
              documentos: 45,
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 1,
              nombre: "Juan Pérez",
              departamento: "Carga",
              documentos: 42,
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 4,
              nombre: "Ana Martínez",
              departamento: "Aduanas",
              documentos: 38,
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 3,
              nombre: "Carlos Rodríguez",
              departamento: "Carga",
              documentos: 35,
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 5,
              nombre: "Pedro Sánchez",
              departamento: "Carga",
              documentos: 30,
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        }

        setRankings(mockData)
        setIsLoadingData(false)
      } catch (error) {
        console.error("Error al cargar los rankings:", error)
        setIsLoadingData(false)
      }
    }

    if (!isLoading && user) {
      fetchData()
    }
  }, [isLoading, user])

  if (isLoading || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Ranking de Usuarios</h1>
        <p className="text-gray-500">Top usuarios con tiempo ahorrado y cantidad de documentos procesados</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ranking por tiempo ahorrado */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-500 text-white px-6 py-4 flex items-center">
            <Clock className="mr-2" size={20} />
            <h2 className="text-lg font-semibold">Top Tiempo Ahorrado</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {rankings.tiempoAhorrado.map((user, index) => (
                <li key={user.id} className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0
                          ? "bg-yellow-400"
                          : index === 1
                            ? "bg-gray-400"
                            : index === 2
                              ? "bg-amber-600"
                              : "bg-blue-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-shrink-0 mr-4">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.nombre} className="w-10 h-10 rounded-full" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{user.nombre}</p>
                    <p className="text-sm text-gray-500">{user.departamento}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-bold text-blue-500">{user.tiempoAhorrado}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ranking por documentos procesados */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-green-500 text-white px-6 py-4 flex items-center">
            <FileText className="mr-2" size={20} />
            <h2 className="text-lg font-semibold">Top Documentos Procesados</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {rankings.documentosProcesados.map((user, index) => (
                <li key={user.id} className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0
                          ? "bg-yellow-400"
                          : index === 1
                            ? "bg-gray-400"
                            : index === 2
                              ? "bg-amber-600"
                              : "bg-green-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-shrink-0 mr-4">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.nombre} className="w-10 h-10 rounded-full" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{user.nombre}</p>
                    <p className="text-sm text-gray-500">{user.departamento}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-bold text-green-500">{user.documentos}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

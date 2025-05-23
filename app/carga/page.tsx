"use client"

import { useEffect, useState } from "react"
import ProcessTable from "@/components/ProcessTable"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"

export default function CargaPage() {
  const { user, isLoading } = useAuth()
  const [processes, setProcesses] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }

    // Simulación de carga de datos
    const fetchData = async () => {
      try {
        // Aquí se conectaría con la API real
        // const response = await fetch('/api/processes/carga')
        // const data = await response.json()

        // Datos de ejemplo
        const mockData = [
          {
            id: "P001",
            clientId: "C123",
            paso1: "Completado",
            paso2: "En proceso",
            paso3: "Pendiente",
            paso4: "Pendiente",
          },
          {
            id: "P002",
            clientId: "C456",
            paso1: "Completado",
            paso2: "Completado",
            paso3: "En proceso",
            paso4: "Pendiente",
          },
          {
            id: "P003",
            clientId: "C789",
            paso1: "Completado",
            paso2: "Completado",
            paso3: "Completado",
            paso4: "En proceso",
          },
        ]

        setProcesses(mockData)
        setIsLoadingData(false)
      } catch (error) {
        console.error("Error al cargar los procesos:", error)
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

  const columns = [
    { key: "id", label: "ID Proceso" },
    { key: "clientId", label: "ID Cliente" },
    { key: "paso1", label: "Paso 1" },
    { key: "paso2", label: "Paso 2" },
    { key: "paso3", label: "Paso 3" },
    { key: "paso4", label: "Paso 4" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Procesos de Carga</h1>
        <p className="text-gray-500">Gestión de procesos en fase de agente de carga</p>
      </div>

      <ProcessTable data={processes} columns={columns} baseUrl="/procesos" />
    </div>
  )
}

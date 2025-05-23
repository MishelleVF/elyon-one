"use client"

import { useEffect, useState } from "react"
import DataTable from "@/components/DataTable"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"

export default function HistorialPage() {
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
        // const response = await fetch('/api/processes/history')
        // const data = await response.json()

        // Datos de ejemplo
        const mockData = [
          {
            id: "P001",
            clientId: "C123",
            estado: "Completado",
            fechaInicio: "2023-01-15",
            fechaFin: "2023-01-25",
            tiempoAhorrado: "2 días",
          },
          {
            id: "P002",
            clientId: "C456",
            estado: "En proceso",
            fechaInicio: "2023-02-10",
            fechaFin: "-",
            tiempoAhorrado: "1 día",
          },
          {
            id: "P003",
            clientId: "C789",
            estado: "Completado",
            fechaInicio: "2023-03-05",
            fechaFin: "2023-03-12",
            tiempoAhorrado: "3 días",
          },
          {
            id: "P004",
            clientId: "C123",
            estado: "En proceso",
            fechaInicio: "2023-04-20",
            fechaFin: "-",
            tiempoAhorrado: "0 días",
          },
          {
            id: "P005",
            clientId: "C456",
            estado: "Completado",
            fechaInicio: "2023-05-01",
            fechaFin: "2023-05-10",
            tiempoAhorrado: "2 días",
          },
        ]

        setProcesses(mockData)
        setIsLoadingData(false)
      } catch (error) {
        console.error("Error al cargar el historial:", error)
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
    { key: "estado", label: "Estado" },
    { key: "fechaInicio", label: "Fecha Inicio" },
    { key: "fechaFin", label: "Fecha Fin" },
    { key: "tiempoAhorrado", label: "Tiempo Ahorrado" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Historial de Procesos</h1>
        <p className="text-gray-500">Histórico completo de todos los procesos</p>
      </div>

      <DataTable
        data={processes}
        columns={columns}
        onRowClick={(row) => (window.location.href = `/procesos/${row.id}`)}
      />
    </div>
  )
}

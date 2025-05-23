"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import Link from "next/link"
import FileUploader from "@/components/FileUploader"
import { File, Download, Eye, Clock, ArrowLeft } from "lucide-react"

export default function DocumentosPage() {
  const { id } = useParams()
  const { user, isLoading } = useAuth()
  const [documents, setDocuments] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }

    // Simulación de carga de datos
    const fetchData = async () => {
      try {
        // Aquí se conectaría con la API real
        // const response = await fetch(`/api/processes/${id}/documents`)
        // const data = await response.json()

        // Datos de ejemplo
        const mockData = [
          {
            id: "D001",
            nombre: "Factura comercial",
            tipo: "PDF",
            fechaSubida: "2023-05-02",
            version: "1.0",
            subidoPor: "Juan Pérez",
          },
          {
            id: "D002",
            nombre: "Packing list",
            tipo: "PDF",
            fechaSubida: "2023-05-03",
            version: "1.0",
            subidoPor: "María López",
          },
          {
            id: "D003",
            nombre: "Certificado de origen",
            tipo: "PDF",
            fechaSubida: "2023-05-04",
            version: "2.0",
            subidoPor: "Carlos Rodríguez",
          },
          {
            id: "D004",
            nombre: "Guía de embarque",
            tipo: "PDF",
            fechaSubida: "2023-05-05",
            version: "1.0",
            subidoPor: "Ana Martínez",
          },
        ]

        setDocuments(mockData)
        setIsLoadingData(false)
      } catch (error) {
        console.error(`Error al cargar los documentos del proceso ${id}:`, error)
        setIsLoadingData(false)
      }
    }

    if (!isLoading && user) {
      fetchData()
    }
  }, [id, isLoading, user])

  const handleFileUpload = (file) => {
    // Aquí se implementaría la lógica para subir el archivo al servidor
    console.log("Archivo a subir:", file)

    // Simulación de subida exitosa
    const newDocument = {
      id: `D00${documents.length + 1}`,
      nombre: file.name,
      tipo: file.name.split(".").pop().toUpperCase(),
      fechaSubida: new Date().toISOString().split("T")[0],
      version: "1.0",
      subidoPor: user?.name || "Usuario actual",
    }

    setDocuments([...documents, newDocument])
  }

  if (isLoading || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/procesos/${id}`} className="text-blue-500 hover:text-blue-700">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Documentos del Proceso {id}</h1>
          <p className="text-gray-500">Gestión de documentos: listado, subida y versiones</p>
        </div>
      </div>

      <FileUploader onFileUpload={handleFileUpload} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Versión
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subido por
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <File size={18} className="mr-2 text-gray-400" />
                      <span className="font-medium">{doc.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.fechaSubida}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{doc.subidoPor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700" title="Ver">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-500 hover:text-green-700" title="Descargar">
                        <Download size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700" title="Historial de versiones">
                        <Clock size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

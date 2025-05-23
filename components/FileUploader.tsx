"use client"

import { useState, useRef } from "react"
import { Upload, X, FileText } from "lucide-react"

export default function FileUploader({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    try {
      // Aquí se implementaría la lógica real para subir el archivo
      // Por ejemplo, usando FormData y fetch

      // Simulación de carga
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Llamar a la función de callback con el archivo
      onFileUpload(selectedFile)

      // Limpiar el estado
      setSelectedFile(null)
    } catch (error) {
      console.error("Error al subir el archivo:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload size={40} className="text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-1">Arrastra y suelta un archivo aquí</p>
            <p className="text-sm text-gray-500 mb-4">o haz clic para seleccionar un archivo</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Seleccionar archivo
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </div>
        ) : (
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FileText size={24} className="text-blue-500 mr-3" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
                disabled={isUploading}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isUploading}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>Subiendo...</span>
                  </div>
                ) : (
                  "Subir archivo"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

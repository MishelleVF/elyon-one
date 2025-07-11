import React from 'react'

export default function ProcessDetail({ process }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">PASO</th>
            <th className="px-4 py-2">DEPARTAMENTO</th>
            <th className="px-4 py-2">TRABAJADOR</th>
            <th className="px-4 py-2">DESCRIPCIÓN</th>
            <th className="px-4 py-2">TAREA</th>
            <th className="px-4 py-2">INICIO</th>
            <th className="px-4 py-2">FIN</th>
            <th className="px-4 py-2">TIEMPO AHORRADO</th>
          </tr>
        </thead>
        <tbody>
          {process.etapas.map((etapa, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2">Paso {etapa.paso}</td>
              <td className="px-4 py-2">{etapa.departamento}</td>
              <td className="px-4 py-2">{etapa.trabajador}</td>
              <td className="px-4 py-2">{etapa.descripcion}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    etapa.tarea === 'Completado'
                      ? 'bg-green-100 text-green-700'
                      : etapa.tarea === 'Atrasado'
                      ? 'bg-red-100 text-red-700'
                      : etapa.tarea === 'En proceso'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {etapa.tarea}
                </span>
              </td>
              <td className="px-4 py-2">{etapa.inicioTarea}</td>
              <td className="px-4 py-2">{etapa.finTarea}</td>
              <td className="px-4 py-2">{etapa.tiempoAhorrado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default function ProcessDetail({ process }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trabajador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarea</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiempo Ahorrado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {process.etapas.map((etapa, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{etapa.departamento}</td>
                <td className="px-6 py-4 whitespace-nowrap">{etapa.trabajador}</td>
                <td className="px-6 py-4 whitespace-nowrap">{etapa.descripcion}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      etapa.tarea === "Completado"
                        ? "bg-green-100 text-green-800"
                        : etapa.tarea === "En proceso"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {etapa.tarea}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{etapa.tiempoAhorrado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

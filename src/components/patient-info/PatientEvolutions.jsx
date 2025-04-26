import React, { useState } from 'react';

const PatientEvolutions = ({ patientData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAddingEvolution, setIsAddingEvolution] = useState(false);

  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'consultas', label: 'Consultas' },
    { id: 'tratamientos', label: 'Tratamientos' },
    { id: 'procedimientos', label: 'Procedimientos' },
  ];

  // Datos de ejemplo para las evoluciones
  const evolutions = [
    {
      id: 1,
      type: 'consulta',
      date: '2024-03-15',
      title: 'Consulta de Control',
      description: 'Paciente presenta buena evolución post-tratamiento. Se observa mejora en la higiene dental.',
      doctor: 'Dr. García',
      attachments: ['radiografia.jpg', 'foto_clinica.jpg'],
      status: 'completado'
    },
    {
      id: 2,
      type: 'tratamiento',
      date: '2024-03-10',
      title: 'Inicio de Ortodoncia',
      description: 'Se colocaron brackets superiores. El paciente toleró bien el procedimiento.',
      doctor: 'Dra. Martínez',
      attachments: ['foto_brackets.jpg'],
      status: 'en_progreso'
    },
    // ... más evoluciones
  ];

  const renderEvolutionCard = (evolution) => {
    const statusColors = {
      completado: 'bg-green-100 text-green-800',
      en_progreso: 'bg-blue-100 text-blue-800',
      pendiente: 'bg-yellow-100 text-yellow-800',
      cancelado: 'bg-red-100 text-red-800'
    };

    return (
      <div key={evolution.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{evolution.title}</h4>
            <p className="text-xs text-gray-500">{evolution.doctor}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[evolution.status]}`}>
              {evolution.status.replace('_', ' ')}
            </span>
            <span className="text-xs text-gray-500">{evolution.date}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{evolution.description}</p>
        
        {evolution.attachments && evolution.attachments.length > 0 && (
          <div className="flex space-x-2 mb-4">
            {evolution.attachments.map((attachment, index) => (
              <button
                key={index}
                className="flex items-center space-x-1 px-2 py-1 bg-gray-50 rounded-lg text-xs text-gray-600 hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span>{attachment}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Ver Detalles
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-700">
            Editar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-blue-600">Evoluciones del Paciente</h3>
          <button 
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsAddingEvolution(true)}
          >
            Nueva Evolución
          </button>
        </div>

        {/* Filtros */}
        <div className="flex space-x-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Lista de Evoluciones */}
        <div className="space-y-4">
          {evolutions
            .filter(evolution => activeFilter === 'all' || evolution.type === activeFilter)
            .map(evolution => renderEvolutionCard(evolution))
          }
        </div>
      </div>

      {/* Modal para agregar nueva evolución */}
      {isAddingEvolution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-blue-600">Nueva Evolución</h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsAddingEvolution(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Evolución
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="consulta">Consulta</option>
                  <option value="tratamiento">Tratamiento</option>
                  <option value="procedimiento">Procedimiento</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingrese el título de la evolución"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Describa la evolución del paciente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivos Adjuntos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Arrastre y suelte archivos aquí, o haga clic para seleccionar
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="btn bg-white border-gray-200 hover:border-gray-300 text-gray-600"
                  onClick={() => setIsAddingEvolution(false)}
                >
                  Cancelar
                </button>
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
                  Guardar Evolución
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientEvolutions; 
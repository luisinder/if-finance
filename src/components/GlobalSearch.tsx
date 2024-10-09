import React, { useState } from 'react'
import { Search } from 'lucide-react'

interface GlobalSearchProps {
  onSearch: (term: string, entities: string[]) => void
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEntities, setSelectedEntities] = useState<string[]>(['all'])

  const handleSearch = () => {
    onSearch(searchTerm, selectedEntities)
  }

  const toggleEntity = (entity: string) => {
    setSelectedEntities(prev => {
      if (entity === 'all') {
        return ['all']
      }
      const newSelection = prev.includes(entity)
        ? prev.filter(e => e !== entity)
        : [...prev.filter(e => e !== 'all'), entity]
      return newSelection.length === 0 ? ['all'] : newSelection
    })
  }

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <Search size={20} className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Búsqueda global..."
          className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
      </div>
      <div className="flex space-x-4">
        {['all', 'facturas', 'proveedores', 'pagos'].map(entity => (
          <label key={entity} className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedEntities.includes(entity)}
              onChange={() => toggleEntity(entity)}
            />
            <span className="ml-2 text-gray-700 capitalize">{entity === 'all' ? 'Todos' : entity}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default GlobalSearch
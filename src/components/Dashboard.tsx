import React from 'react'
import { DollarSign, FileText, Users, CreditCard } from 'lucide-react'

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Facturas" value="$125,000" icon={<FileText size={24} />} color="bg-blue-500" />
        <DashboardCard title="Proveedores" value="24" icon={<Users size={24} />} color="bg-green-500" />
        <DashboardCard title="Pagos Pendientes" value="$45,000" icon={<CreditCard size={24} />} color="bg-yellow-500" />
        <DashboardCard title="Presupuesto Restante" value="$80,000" icon={<DollarSign size={24} />} color="bg-purple-500" />
      </div>
    </div>
  )
}

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} text-white rounded-lg shadow-md p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-white bg-opacity-30 rounded-full p-3">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
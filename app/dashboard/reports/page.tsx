import { DashboardHeader } from "@/components/dashboard-header"
import { UtilizationReport } from "@/components/utilization-report"

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader
        heading="Reports & Analytics"
        text="View detailed reports on timetable utilization and efficiency"
      />
      <div>
        <UtilizationReport />
      </div>
    </div>
  )
}


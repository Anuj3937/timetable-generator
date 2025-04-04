import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { ClassroomTable } from "@/components/classroom-table"

export default function ClassroomsPage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader heading="Classroom Management" text="Add, edit, and manage classrooms">
        <Button asChild>
          <Link href="/dashboard/classrooms/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Classroom
          </Link>
        </Button>
      </DashboardHeader>
      <div>
        <ClassroomTable />
      </div>
    </div>
  )
}


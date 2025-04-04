import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { FacultyTable } from "@/components/faculty-table"

export default function FacultyPage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader heading="Faculty Management" text="Add, edit, and manage faculty members">
        <Button asChild>
          <Link href="/dashboard/faculty/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Faculty
          </Link>
        </Button>
      </DashboardHeader>
      <div>
        <FacultyTable />
      </div>
    </div>
  )
}


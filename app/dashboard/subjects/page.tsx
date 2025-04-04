import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { SubjectsTable } from "@/components/subjects-table"

export default function SubjectsPage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader heading="Subject Management" text="Add, edit, and manage subjects">
        <Button asChild>
          <Link href="/dashboard/subjects/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Subject
          </Link>
        </Button>
      </DashboardHeader>
      <div>
        <SubjectsTable />
      </div>
    </div>
  )
}


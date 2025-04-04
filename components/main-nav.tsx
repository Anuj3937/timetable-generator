import Link from "next/link"
import { Clock } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Clock className="h-6 w-6" />
        <span className="hidden md:inline-block">University Timetable</span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link
          href="/dashboard/faculty"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Faculty
        </Link>
        <Link
          href="/dashboard/subjects"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Subjects
        </Link>
        <Link
          href="/dashboard/classrooms"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Classrooms
        </Link>
        <Link
          href="/dashboard/timetable"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Timetable
        </Link>
      </nav>
    </div>
  )
}


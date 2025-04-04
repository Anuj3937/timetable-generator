import Link from "next/link"
import { Clock, GraduationCap, LayoutGrid, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
          <Clock className="w-6 h-6" />
          <span>University Timetable</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/dashboard/faculty" className="text-muted-foreground hover:text-foreground">
            Faculty
          </Link>
          <Link href="/dashboard/subjects" className="text-muted-foreground hover:text-foreground">
            Subjects
          </Link>
          <Link href="/dashboard/classrooms" className="text-muted-foreground hover:text-foreground">
            Classrooms
          </Link>
          <Link href="/dashboard/timetable" className="text-muted-foreground hover:text-foreground">
            Timetable
          </Link>
        </nav>
        <div className="ml-auto">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  University Timetable Generator
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Efficiently manage and generate timetables for your university departments, faculty, and classrooms.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-center">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Departments</CardTitle>
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Computer Science, Electrical, Mechanical, Civil, Electronics
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">120</div>
                  <p className="text-xs text-muted-foreground">Across all departments and specializations</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85</div>
                  <p className="text-xs text-muted-foreground">Theory and practical courses for all years</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Classrooms</CardTitle>
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">20</div>
                  <p className="text-xs text-muted-foreground">Theory rooms and specialized labs</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter">Key Features</h2>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <li className="rounded-lg border p-4">
                  <h3 className="font-semibold">Smart Faculty Allocation</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically assign faculty based on expertise and availability
                  </p>
                </li>
                <li className="rounded-lg border p-4">
                  <h3 className="font-semibold">Classroom Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Efficiently allocate classrooms based on type and capacity
                  </p>
                </li>
                <li className="rounded-lg border p-4">
                  <h3 className="font-semibold">Conflict Detection</h3>
                  <p className="text-sm text-muted-foreground">Automatically detect and resolve scheduling conflicts</p>
                </li>
                <li className="rounded-lg border p-4">
                  <h3 className="font-semibold">Department Management</h3>
                  <p className="text-sm text-muted-foreground">Organize faculty and subjects by department</p>
                </li>
                <li className="rounded-lg border p-4">
                  <h3 className="font-semibold">Theory & Lab Balance</h3>
                  <p className="text-sm text-muted-foreground">Manage both theory and lab hours effectively</p>
                </li>
                <li className="rounded-lg border p-4">
                  <h3 className="font-semibold">Admin Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive overview with management tools</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2024 University Timetable Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


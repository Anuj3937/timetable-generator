import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { TimetableView } from "@/components/timetable-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TimetablePage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader heading="Timetable Management" text="View and manage university timetables">
        <Button asChild>
          <Link href="/dashboard/timetable/generate">
            <PlusCircle className="mr-2 h-4 w-4" />
            Generate Timetable
          </Link>
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="view" className="space-y-4">
        <TabsList>
          <TabsTrigger value="view">View Timetables</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Schedule</TabsTrigger>
          <TabsTrigger value="classroom">Classroom Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Computer Science Department</CardTitle>
              <CardDescription>Fall Semester 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <TimetableView department="Computer Science" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Schedule</CardTitle>
              <CardDescription>View timetable by faculty member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3">
                    <label className="text-sm font-medium">Select Faculty</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                      <option value="">Select a faculty member</option>
                      <option value="1">Dr. Johnson (Computer Science)</option>
                      <option value="2">Dr. Smith (Mathematics)</option>
                      <option value="3">Prof. Williams (Physics)</option>
                      <option value="4">Dr. Brown (Chemistry)</option>
                      <option value="5">Prof. Davis (Electrical Engineering)</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label className="text-sm font-medium">Department</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                      <option value="">All Departments</option>
                      <option value="cs">Computer Science</option>
                      <option value="math">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="chem">Chemistry</option>
                      <option value="ee">Electrical Engineering</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label className="text-sm font-medium">Semester</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                      <option value="fall2024">Fall 2024</option>
                      <option value="spring2024">Spring 2024</option>
                      <option value="fall2023">Fall 2023</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Dr. Johnson's Schedule - Fall 2024</h3>
                  <div className="rounded-md border overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Day
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Room
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9:00 - 10:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Database Systems</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">003</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Theory</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11:00 - 12:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Data Structures</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">005</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Theory</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tuesday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2:00 - 3:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Database Systems Lab</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">008</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lab</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wednesday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9:00 - 10:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Database Systems</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">003</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Theory</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Thursday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11:00 - 12:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Data Structures</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">005</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Theory</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classroom">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Schedule</CardTitle>
              <CardDescription>View timetable by classroom</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3">
                    <label className="text-sm font-medium">Select Classroom</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                      <option value="">Select a classroom</option>
                      <option value="001">001 (Theory)</option>
                      <option value="003">003 (Theory)</option>
                      <option value="008">008 (Lab)</option>
                      <option value="013">013 (Lab)</option>
                      <option value="101">101 (Theory)</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label className="text-sm font-medium">Room Type</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                      <option value="">All Types</option>
                      <option value="theory">Theory</option>
                      <option value="lab">Lab</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label className="text-sm font-medium">Floor</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                      <option value="">All Floors</option>
                      <option value="0">Ground Floor</option>
                      <option value="1">First Floor</option>
                      <option value="2">Second Floor</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Room 008 (Lab) Schedule - Fall 2024</h3>
                  <div className="rounded-md border overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Day
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Faculty
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2:00 - 3:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Programming Lab</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Prof. Williams</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Science</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tuesday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2:00 - 3:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Database Systems Lab</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Johnson</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Science</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wednesday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11:00 - 12:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics Lab</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Prof. Davis</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electrical Engineering</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Thursday</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9:00 - 10:30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Networks Lab</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Smith</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Science</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


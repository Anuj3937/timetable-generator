"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DivisionSelector } from "@/components/division-selector"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function UtilizationReport() {
  const [selectedDivision, setSelectedDivision] = useState("main")

  // Sample data - in a real app, this would come from the backend
  const classroomUtilizationData = [
    { name: "Main Building", utilization: 78 },
    { name: "Science Block", utilization: 65 },
    { name: "Engineering Block", utilization: 82 },
    { name: "Computer Block", utilization: 90 },
  ]

  const facultyWorkloadData = [
    { name: "Computer Science", theory: 12, practical: 8 },
    { name: "Electrical Engineering", theory: 14, practical: 6 },
    { name: "Mechanical Engineering", theory: 10, practical: 10 },
    { name: "Civil Engineering", theory: 16, practical: 4 },
    { name: "Electronics", theory: 13, practical: 7 },
  ]

  const roomTypeData = [
    { name: "Lecture Halls", value: 45 },
    { name: "Labs", value: 30 },
    { name: "Seminar Rooms", value: 25 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Utilization Reports</h2>
        <DivisionSelector onSelect={setSelectedDivision} />
      </div>

      <Tabs defaultValue="classroom">
        <TabsList>
          <TabsTrigger value="classroom">Classroom Utilization</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Workload</TabsTrigger>
          <TabsTrigger value="division">Division Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="classroom">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Classroom Utilization by Building</CardTitle>
                <CardDescription>Percentage of available time slots used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classroomUtilizationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="utilization" name="Utilization %" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Type Distribution</CardTitle>
                <CardDescription>Breakdown by room type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roomTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {roomTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Underutilized Classrooms</CardTitle>
              <CardDescription>Rooms with less than 50% utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Building
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilization
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recommendation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SR-301</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Engineering Block</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Seminar Room</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Consider for additional elective courses
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LH-401</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Engineering Block</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lecture Hall</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Reassign to high-demand departments
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Workload by Department</CardTitle>
              <CardDescription>Theory vs. practical hours distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={facultyWorkloadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="theory" name="Theory Hours" fill="#8884d8" />
                    <Bar dataKey="practical" name="Practical Hours" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Faculty with High Workload</CardTitle>
                <CardDescription>Faculty members with more than 18 hours per week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dr. Kumar</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Science</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dr. Verma</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Civil Engineering</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faculty with Low Workload</CardTitle>
                <CardDescription>Faculty members with less than 12 hours per week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Prof. Singh</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electrical Engineering</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Prof. Joshi</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Electronics & Communication
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="division">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Division Comparison</CardTitle>
                <CardDescription>Resource utilization across divisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Main Campus", classrooms: 85, faculty: 78 },
                        { name: "North Campus", classrooms: 72, faculty: 65 },
                        { name: "South Campus", classrooms: 68, faculty: 70 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="classrooms" name="Classroom Utilization %" fill="#8884d8" />
                      <Bar dataKey="faculty" name="Faculty Utilization %" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Division Efficiency</CardTitle>
                <CardDescription>Overall efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Main Campus</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "82%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">North Campus</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "68%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">South Campus</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">East Wing</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "60%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">West Wing</span>
                      <span className="text-sm font-medium">55%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "55%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Division Optimization Recommendations</CardTitle>
              <CardDescription>Suggestions to improve resource allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Redistribute Faculty Resources</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Main Campus has 15% more faculty than needed, while North Campus is understaffed by 10%. Consider
                    reassigning 5-7 faculty members.
                  </p>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Optimize Classroom Usage in West Wing</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    West Wing classrooms are only at 55% capacity. Consider moving some departments from Main Campus to
                    utilize these resources.
                  </p>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Balance Lab Resources</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    South Campus has excess lab capacity while East Wing is overbooked. Reschedule practical sessions to
                    balance usage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


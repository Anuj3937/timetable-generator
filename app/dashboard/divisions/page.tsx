import { DashboardHeader } from "@/components/dashboard-header"
import { DivisionComparison } from "@/components/division-comparison"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DivisionsPage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader
        heading="Division Management"
        text="Compare and manage student divisions across departments and years"
      />

      <Tabs defaultValue="compare">
        <TabsList>
          <TabsTrigger value="compare">Compare Divisions</TabsTrigger>
          <TabsTrigger value="manage">Manage Divisions</TabsTrigger>
        </TabsList>

        <TabsContent value="compare">
          <Card>
            <CardHeader>
              <CardTitle>Division Comparison</CardTitle>
              <CardDescription>Compare timetables across divisions to identify and resolve conflicts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select defaultValue="cs">
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                      <SelectItem value="ec">Electronics & Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">First Year</SelectItem>
                      <SelectItem value="2">Second Year</SelectItem>
                      <SelectItem value="3">Third Year</SelectItem>
                      <SelectItem value="4">Fourth Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DivisionComparison department="cs" year="3" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Division Management</CardTitle>
              <CardDescription>Manage student divisions and their assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Division
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class Advisor
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Computer Science
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Third Year</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">A</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Sharma</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Computer Science
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Third Year</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">B</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Gupta</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Computer Science
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Third Year</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">C</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Kumar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


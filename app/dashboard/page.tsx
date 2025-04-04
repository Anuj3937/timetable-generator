import Link from "next/link"
import { Bell, Calendar, GraduationCap, LayoutGrid, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationsList } from "@/components/notifications-list"
import { RecentTimetables } from "@/components/recent-timetables"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader heading="Dashboard" text="Manage your university timetable system">
        <Button asChild>
          <Link href="/dashboard/timetable/generate">Generate New Timetable</Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/faculty" className="text-primary underline-offset-4 hover:underline">
                Manage faculty
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/subjects" className="text-primary underline-offset-4 hover:underline">
                Manage subjects
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classrooms</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/classrooms" className="text-primary underline-offset-4 hover:underline">
                Manage classrooms
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Timetables</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/dashboard/timetable" className="text-primary underline-offset-4 hover:underline">
                View all timetables
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">5</span>
          </TabsTrigger>
          <TabsTrigger value="recent">Recent Timetables</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Resource utilization chart will appear here
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Faculty Workload</CardTitle>
                <CardDescription>Average hours per department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm">Computer Science</div>
                    <div className="w-2/3 flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary w-[75%]" />
                      </div>
                      <span className="text-sm">30h</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm">Electrical</div>
                    <div className="w-2/3 flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary w-[85%]" />
                      </div>
                      <span className="text-sm">34h</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm">Mechanical</div>
                    <div className="w-2/3 flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary w-[65%]" />
                      </div>
                      <span className="text-sm">26h</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm">Civil</div>
                    <div className="w-2/3 flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary w-[70%]" />
                      </div>
                      <span className="text-sm">28h</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm">Electronics</div>
                    <div className="w-2/3 flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary w-[80%]" />
                      </div>
                      <span className="text-sm">32h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/dashboard/faculty/add">
                      <Users className="mr-2 h-4 w-4" />
                      Add New Faculty
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/dashboard/subjects/add">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Add New Subject
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/dashboard/classrooms/add">
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      Add New Classroom
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/dashboard/timetable/generate">
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Timetable
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Resource Optimization Suggestions</CardTitle>
                <CardDescription>Recommendations to improve resource allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-start gap-4">
                      <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <h4 className="text-sm font-medium">Classroom Utilization Alert</h4>
                        <p className="text-sm text-muted-foreground">
                          Room 008 (Lab) is underutilized. Consider scheduling more lab sessions in this room.
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                          <Button size="sm" variant="ghost">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-start gap-4">
                      <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <h4 className="text-sm font-medium">Faculty Workload Imbalance</h4>
                        <p className="text-sm text-muted-foreground">
                          3 faculty members have less than 4 teaching hours while 2 have more than 12 hours each.
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                          <Button size="sm" variant="ghost">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsList />
        </TabsContent>
        <TabsContent value="recent">
          <RecentTimetables />
        </TabsContent>
      </Tabs>
    </div>
  )
}


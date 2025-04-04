import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader heading="Notifications" text="View and manage system notifications and alerts">
        <Button variant="outline">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">5</span>
          </TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Classroom Utilization Alert</h4>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
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
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Faculty Workload Imbalance</h4>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
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
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Timetable Conflict Detected</h4>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Dr. Johnson is scheduled to teach two different classes at the same time on Monday at 10:00 AM.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Room Allocation Conflict</h4>
                    <p className="text-sm text-muted-foreground">
                      Two classes are scheduled in Room 013 (Lab) at the same time on Wednesdays.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Faculty Availability Update</h4>
                    <p className="text-sm text-muted-foreground">
                      Dr. Smith has updated their availability and can now take additional theory hours.
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
                  <div className="text-xs text-muted-foreground">5 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>View notifications you haven't read yet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Classroom Utilization Alert</h4>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
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
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Faculty Workload Imbalance</h4>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
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
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>View important system alerts that require attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Timetable Conflict Detected</h4>
                      <Badge variant="outline" className="text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Dr. Johnson is scheduled to teach two different classes at the same time on Monday at 10:00 AM.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Room Allocation Conflict</h4>
                    <p className="text-sm text-muted-foreground">
                      Two classes are scheduled in Room 013 (Lab) at the same time on Wednesdays.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>System Updates</CardTitle>
              <CardDescription>View updates about the system and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">Faculty Availability Update</h4>
                    <p className="text-sm text-muted-foreground">
                      Dr. Smith has updated their availability and can now take additional theory hours.
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
                  <div className="text-xs text-muted-foreground">5 days ago</div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-start gap-4">
                  <Bell className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">System Update Available</h4>
                    <p className="text-sm text-muted-foreground">
                      A new version of the timetable generator is available with improved conflict detection.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        Update Now
                      </Button>
                      <Button size="sm" variant="ghost">
                        Later
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">1 week ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


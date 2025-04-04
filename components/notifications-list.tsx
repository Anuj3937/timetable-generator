import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotificationsList() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        <div className="flex items-start gap-4">
          <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
          <div className="flex-1">
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
          <div className="text-xs text-muted-foreground">2 hours ago</div>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <div className="flex items-start gap-4">
          <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
          <div className="flex-1">
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
          <div className="text-xs text-muted-foreground">1 day ago</div>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <div className="flex items-start gap-4">
          <Bell className="mt-0.5 h-5 w-5 text-amber-500" />
          <div className="flex-1">
            <h4 className="text-sm font-medium">Timetable Conflict Detected</h4>
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
    </div>
  )
}


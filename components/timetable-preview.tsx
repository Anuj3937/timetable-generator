import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TimetablePreviewProps {
  year: string
  department: string
}

export function TimetablePreview({ year, department }: TimetablePreviewProps) {
  // This would normally be fetched from an API based on the year and department
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "2:00 - 3:00",
    "3:00 - 4:00",
    "4:00 - 5:00",
  ]

  // Sample data for CS 3rd year
  const timetableData = {
    Monday: {
      "9:00 - 10:00": { subject: "Database Systems", faculty: "Dr. Sharma", type: "Theory" },
      "10:00 - 11:00": { subject: "Computer Networks", faculty: "Dr. Gupta", type: "Theory" },
      "11:00 - 12:00": { subject: "Operating Systems", faculty: "Dr. Kumar", type: "Theory" },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "" },
      "2:00 - 3:00": { subject: "Database Systems", faculty: "Dr. Patel", type: "Practical" },
      "3:00 - 4:00": { subject: "Database Systems", faculty: "Dr. Patel", type: "Practical" },
      "4:00 - 5:00": { subject: "", faculty: "", type: "" },
    },
    Tuesday: {
      "9:00 - 10:00": { subject: "Operating Systems", faculty: "Dr. Kumar", type: "Theory" },
      "10:00 - 11:00": { subject: "Computer Networks", faculty: "Dr. Gupta", type: "Theory" },
      "11:00 - 12:00": { subject: "Database Systems", faculty: "Dr. Sharma", type: "Theory" },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "" },
      "2:00 - 3:00": { subject: "Computer Networks", faculty: "Prof. Singh", type: "Practical" },
      "3:00 - 4:00": { subject: "Computer Networks", faculty: "Prof. Singh", type: "Practical" },
      "4:00 - 5:00": { subject: "", faculty: "", type: "" },
    },
    Wednesday: {
      "9:00 - 10:00": { subject: "Database Systems", faculty: "Dr. Sharma", type: "Theory" },
      "10:00 - 11:00": { subject: "Operating Systems", faculty: "Dr. Kumar", type: "Theory" },
      "11:00 - 12:00": { subject: "Computer Networks", faculty: "Dr. Gupta", type: "Theory" },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "" },
      "2:00 - 3:00": { subject: "Operating Systems", faculty: "Dr. Kumar", type: "Practical" },
      "3:00 - 4:00": { subject: "Operating Systems", faculty: "Dr. Kumar", type: "Practical" },
      "4:00 - 5:00": { subject: "", faculty: "", type: "" },
    },
    Thursday: {
      "9:00 - 10:00": { subject: "Computer Networks", faculty: "Dr. Gupta", type: "Theory" },
      "10:00 - 11:00": { subject: "Database Systems", faculty: "Dr. Sharma", type: "Theory" },
      "11:00 - 12:00": { subject: "Operating Systems", faculty: "Dr. Kumar", type: "Theory" },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "" },
      "2:00 - 3:00": { subject: "", faculty: "", type: "" },
      "3:00 - 4:00": { subject: "", faculty: "", type: "" },
      "4:00 - 5:00": { subject: "", faculty: "", type: "" },
    },
    Friday: {
      "9:00 - 10:00": { subject: "Operating Systems", faculty: "Dr. Kumar", type: "Theory" },
      "10:00 - 11:00": { subject: "Database Systems", faculty: "Dr. Sharma", type: "Theory" },
      "11:00 - 12:00": { subject: "Computer Networks", faculty: "Dr. Gupta", type: "Theory" },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "" },
      "2:00 - 3:00": { subject: "", faculty: "", type: "" },
      "3:00 - 4:00": { subject: "", faculty: "", type: "" },
      "4:00 - 5:00": { subject: "", faculty: "", type: "" },
    },
  }

  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time / Day</TableHead>
            {days.map((day) => (
              <TableHead key={day}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((timeSlot) => (
            <TableRow key={timeSlot}>
              <TableCell className="font-medium">{timeSlot}</TableCell>
              {days.map((day) => {
                const cell = timetableData[day]?.[timeSlot] || { subject: "", faculty: "", type: "" }
                return (
                  <TableCell
                    key={`${day}-${timeSlot}`}
                    className={cell.type === "Practical" ? "bg-blue-50 dark:bg-blue-950" : ""}
                  >
                    {cell.subject && (
                      <>
                        <div className="font-medium">{cell.subject}</div>
                        {cell.faculty && (
                          <div className="text-xs text-muted-foreground">
                            {cell.faculty} {cell.type ? `(${cell.type})` : ""}
                          </div>
                        )}
                      </>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


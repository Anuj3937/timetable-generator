"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DivisionComparisonProps {
  department: string
  year: string
}

export function DivisionComparison({ department, year }: DivisionComparisonProps) {
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [selectedTime, setSelectedTime] = useState("9:00 - 10:00")

  // Sample data for different divisions
  const divisionData = {
    A: {
      Monday: {
        "9:00 - 10:00": { subject: "Database Systems", faculty: "Dr. Sharma", room: "LH-101" },
        "10:00 - 11:00": { subject: "Computer Networks", faculty: "Dr. Gupta", room: "LH-101" },
        "11:00 - 12:00": { subject: "Operating Systems", faculty: "Dr. Kumar", room: "LH-102" },
      },
    },
    B: {
      Monday: {
        "9:00 - 10:00": { subject: "Operating Systems", faculty: "Dr. Verma", room: "LH-102" },
        "10:00 - 11:00": { subject: "Database Systems", faculty: "Dr. Patel", room: "LH-103" },
        "11:00 - 12:00": { subject: "Computer Networks", faculty: "Dr. Singh", room: "LH-103" },
      },
    },
    C: {
      Monday: {
        "9:00 - 10:00": { subject: "Computer Networks", faculty: "Dr. Gupta", room: "LH-103" },
        "10:00 - 11:00": { subject: "Operating Systems", faculty: "Dr. Kumar", room: "LH-102" },
        "11:00 - 12:00": { subject: "Database Systems", faculty: "Dr. Sharma", room: "LH-101" },
      },
    },
  }

  // Check for conflicts
  const conflicts = []

  // Check for room conflicts
  const roomUsage = {}
  for (const division in divisionData) {
    for (const day in divisionData[division]) {
      for (const time in divisionData[division][day]) {
        const room = divisionData[division][day][time].room
        if (!roomUsage[day]) roomUsage[day] = {}
        if (!roomUsage[day][time]) roomUsage[day][time] = {}

        if (roomUsage[day][time][room]) {
          // Conflict found
          conflicts.push({
            type: "room",
            day,
            time,
            room,
            divisions: [roomUsage[day][time][room], division],
          })
        } else {
          roomUsage[day][time][room] = division
        }
      }
    }
  }

  // Check for faculty conflicts
  const facultyUsage = {}
  for (const division in divisionData) {
    for (const day in divisionData[division]) {
      for (const time in divisionData[division][day]) {
        const faculty = divisionData[division][day][time].faculty
        if (!facultyUsage[day]) facultyUsage[day] = {}
        if (!facultyUsage[day][time]) facultyUsage[day][time] = {}

        if (facultyUsage[day][time][faculty]) {
          // Conflict found
          conflicts.push({
            type: "faculty",
            day,
            time,
            faculty,
            divisions: [facultyUsage[day][time][faculty], division],
          })
        } else {
          facultyUsage[day][time][faculty] = division
        }
      }
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Division Comparison</CardTitle>
          <CardDescription>Compare timetables across divisions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="side-by-side">
            <TabsList>
              <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
            </TabsList>

            <TabsContent value="side-by-side">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Day</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Slot</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value="9:00 - 10:00">9:00 - 10:00</option>
                      <option value="10:00 - 11:00">10:00 - 11:00</option>
                      <option value="11:00 - 12:00">11:00 - 12:00</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Division</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Room</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {["A", "B", "C"].map((division) => {
                        const data = divisionData[division]?.[selectedDay]?.[selectedTime] || {
                          subject: "No class",
                          faculty: "-",
                          room: "-",
                        }

                        // Check if this cell has a conflict
                        const hasRoomConflict = conflicts.some(
                          (c) =>
                            c.type === "room" &&
                            c.day === selectedDay &&
                            c.time === selectedTime &&
                            c.divisions.includes(division),
                        )

                        const hasFacultyConflict = conflicts.some(
                          (c) =>
                            c.type === "faculty" &&
                            c.day === selectedDay &&
                            c.time === selectedTime &&
                            c.divisions.includes(division),
                        )

                        return (
                          <TableRow key={division}>
                            <TableCell>
                              <Badge>{division}</Badge>
                            </TableCell>
                            <TableCell>{data.subject}</TableCell>
                            <TableCell className={hasFacultyConflict ? "text-destructive font-bold" : ""}>
                              {data.faculty}
                              {hasFacultyConflict && " ⚠️"}
                            </TableCell>
                            <TableCell className={hasRoomConflict ? "text-destructive font-bold" : ""}>
                              {data.room}
                              {hasRoomConflict && " ⚠️"}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conflicts">
              {conflicts.length === 0 ? (
                <div className="rounded-md bg-green-50 p-4 dark:bg-green-900">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200">No conflicts detected</h3>
                      <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                        <p>All divisions have non-conflicting schedules for rooms and faculty.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {conflicts.map((conflict, index) => (
                    <Alert key={index} variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>
                        {conflict.type === "room"
                          ? `Room Conflict: ${conflict.room}`
                          : `Faculty Conflict: ${conflict.faculty}`}
                      </AlertTitle>
                      <AlertDescription>
                        {conflict.type === "room"
                          ? `Room ${conflict.room} is assigned to both Division ${conflict.divisions[0]} and Division ${conflict.divisions[1]} on ${conflict.day} at ${conflict.time}`
                          : `${conflict.faculty} is assigned to teach both Division ${conflict.divisions[0]} and Division ${conflict.divisions[1]} on ${conflict.day} at ${conflict.time}`}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


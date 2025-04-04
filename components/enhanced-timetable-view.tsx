"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DivisionSelector } from "@/components/division-selector"
import { ConflictDetector } from "@/components/conflict-detector"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, Trash } from "lucide-react"

interface EnhancedTimetableViewProps {
  year: string
  department: string
}

export function EnhancedTimetableView({ year, department }: EnhancedTimetableViewProps) {
  const [selectedDivision, setSelectedDivision] = useState("A")
  const [editMode, setEditMode] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{ day: string; time: string } | null>(null)

  // This would normally be fetched from an API based on the year, department, and division
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

  // Sample data for CS 3rd year, Division A
  const timetableData = {
    Monday: {
      "9:00 - 10:00": {
        subject: "Database Systems",
        faculty: "Dr. Sharma",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "10:00 - 11:00": {
        subject: "Computer Networks",
        faculty: "Dr. Gupta",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "11:00 - 12:00": {
        subject: "Operating Systems",
        faculty: "Dr. Kumar",
        type: "Theory",
        room: "LH-102",
        division: "A",
      },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "", room: "", division: "" },
      "2:00 - 3:00": {
        subject: "Database Systems",
        faculty: "Dr. Patel",
        type: "Practical",
        room: "Lab-201",
        division: "A",
      },
      "3:00 - 4:00": {
        subject: "Database Systems",
        faculty: "Dr. Patel",
        type: "Practical",
        room: "Lab-201",
        division: "A",
      },
      "4:00 - 5:00": { subject: "", faculty: "", type: "", room: "", division: "" },
    },
    Tuesday: {
      "9:00 - 10:00": {
        subject: "Operating Systems",
        faculty: "Dr. Kumar",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "10:00 - 11:00": {
        subject: "Computer Networks",
        faculty: "Dr. Gupta",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "11:00 - 12:00": {
        subject: "Database Systems",
        faculty: "Dr. Sharma",
        type: "Theory",
        room: "LH-102",
        division: "A",
      },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "", room: "", division: "" },
      "2:00 - 3:00": {
        subject: "Computer Networks",
        faculty: "Prof. Singh",
        type: "Practical",
        room: "Lab-201",
        division: "A",
      },
      "3:00 - 4:00": {
        subject: "Computer Networks",
        faculty: "Prof. Singh",
        type: "Practical",
        room: "Lab-201",
        division: "A",
      },
      "4:00 - 5:00": { subject: "", faculty: "", type: "", room: "", division: "" },
    },
    Wednesday: {
      "9:00 - 10:00": {
        subject: "Database Systems",
        faculty: "Dr. Sharma",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "10:00 - 11:00": {
        subject: "Operating Systems",
        faculty: "Dr. Kumar",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "11:00 - 12:00": {
        subject: "Computer Networks",
        faculty: "Dr. Gupta",
        type: "Theory",
        room: "LH-102",
        division: "A",
      },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "", room: "", division: "" },
      "2:00 - 3:00": {
        subject: "Operating Systems",
        faculty: "Dr. Kumar",
        type: "Practical",
        room: "Lab-202",
        division: "A",
      },
      "3:00 - 4:00": {
        subject: "Operating Systems",
        faculty: "Dr. Kumar",
        type: "Practical",
        room: "Lab-202",
        division: "A",
      },
      "4:00 - 5:00": { subject: "", faculty: "", type: "", room: "", division: "" },
    },
    Thursday: {
      "9:00 - 10:00": {
        subject: "Computer Networks",
        faculty: "Dr. Gupta",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "10:00 - 11:00": {
        subject: "Database Systems",
        faculty: "Dr. Sharma",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "11:00 - 12:00": {
        subject: "Operating Systems",
        faculty: "Dr. Kumar",
        type: "Theory",
        room: "LH-102",
        division: "A",
      },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "", room: "", division: "" },
      "2:00 - 3:00": { subject: "", faculty: "", type: "", room: "", division: "" },
      "3:00 - 4:00": { subject: "", faculty: "", type: "", room: "", division: "" },
      "4:00 - 5:00": { subject: "", faculty: "", type: "", room: "", division: "" },
    },
    Friday: {
      "9:00 - 10:00": {
        subject: "Operating Systems",
        faculty: "Dr. Kumar",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "10:00 - 11:00": {
        subject: "Database Systems",
        faculty: "Dr. Sharma",
        type: "Theory",
        room: "LH-101",
        division: "A",
      },
      "11:00 - 12:00": {
        subject: "Computer Networks",
        faculty: "Dr. Gupta",
        type: "Theory",
        room: "LH-102",
        division: "A",
      },
      "12:00 - 1:00": { subject: "Lunch Break", faculty: "", type: "", room: "", division: "" },
      "2:00 - 3:00": { subject: "", faculty: "", type: "", room: "", division: "" },
      "3:00 - 4:00": { subject: "", faculty: "", type: "", room: "", division: "" },
      "4:00 - 5:00": { subject: "", faculty: "", type: "", room: "", division: "" },
    },
  }

  const handleCellClick = (day: string, timeSlot: string) => {
    if (editMode) {
      setSelectedCell({ day, time: timeSlot })
    }
  }

  const handleSaveChanges = () => {
    // In a real app, this would save the changes to the backend
    setEditMode(false)
    setSelectedCell(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium">Division</label>
            <DivisionSelector onSelect={setSelectedDivision} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select defaultValue={department}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
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
            <Select defaultValue={year}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Year" />
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
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Timetable
            </Button>
          )}
        </div>
      </div>

      <ConflictDetector timetableData={timetableData} division={selectedDivision} department={department} year={year} />

      <Tabs defaultValue="timetable">
        <TabsList>
          <TabsTrigger value="timetable">Timetable View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="room">Room Utilization</TabsTrigger>
        </TabsList>

        <TabsContent value="timetable">
          <Card>
            <CardHeader>
              <CardTitle>
                Timetable for {year === "1" ? "First" : year === "2" ? "Second" : year === "3" ? "Third" : "Fourth"}{" "}
                Year{" "}
                {department === "cs"
                  ? "Computer Science"
                  : department === "ee"
                    ? "Electrical Engineering"
                    : department === "me"
                      ? "Mechanical Engineering"
                      : department === "ce"
                        ? "Civil Engineering"
                        : "Electronics & Communication"}
              </CardTitle>
              <CardDescription>Division {selectedDivision}</CardDescription>
            </CardHeader>
            <CardContent>
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
                          const cell = timetableData[day]?.[timeSlot] || {
                            subject: "",
                            faculty: "",
                            type: "",
                            room: "",
                            division: "",
                          }
                          const isSelected = selectedCell?.day === day && selectedCell?.time === timeSlot

                          return (
                            <TableCell
                              key={`${day}-${timeSlot}`}
                              className={`${cell.type === "Practical" ? "bg-blue-50 dark:bg-blue-950" : ""} 
                                ${isSelected ? "ring-2 ring-primary" : ""} 
                                ${editMode ? "cursor-pointer hover:bg-muted/50" : ""}`}
                              onClick={() => handleCellClick(day, timeSlot)}
                            >
                              {cell.subject && (
                                <>
                                  <div className="font-medium">{cell.subject}</div>
                                  {cell.faculty && (
                                    <div className="text-xs text-muted-foreground">
                                      {cell.faculty} {cell.type ? `(${cell.type})` : ""}
                                    </div>
                                  )}
                                  {cell.room && (
                                    <div className="text-xs text-muted-foreground mt-1">Room: {cell.room}</div>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>List View</CardTitle>
              <CardDescription>All scheduled classes for Division {selectedDivision}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day} className="space-y-2">
                    <h3 className="font-semibold text-lg">{day}</h3>
                    <div className="rounded-md border divide-y">
                      {timeSlots.map((timeSlot) => {
                        const cell = timetableData[day]?.[timeSlot]
                        if (!cell?.subject || cell.subject === "Lunch Break") return null

                        return (
                          <div
                            key={`${day}-${timeSlot}`}
                            className="p-3 flex flex-col md:flex-row md:items-center md:justify-between"
                          >
                            <div>
                              <div className="font-medium">{cell.subject}</div>
                              <div className="text-sm text-muted-foreground">{timeSlot}</div>
                            </div>
                            <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                              <div className="text-sm">{cell.faculty}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={cell.type === "Theory" ? "default" : "secondary"}>{cell.type}</Badge>
                                <span className="text-xs text-muted-foreground">Room: {cell.room}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="room">
          <Card>
            <CardHeader>
              <CardTitle>Room Utilization</CardTitle>
              <CardDescription>Classroom usage throughout the week for Division {selectedDivision}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Group by room */}
                {["LH-101", "LH-102", "Lab-201", "Lab-202"].map((room) => {
                  // Calculate utilization percentage (in a real app, this would be more sophisticated)
                  const totalSlots = days.length * (timeSlots.length - 1) // Excluding lunch
                  let usedSlots = 0

                  days.forEach((day) => {
                    timeSlots.forEach((time) => {
                      if (timetableData[day]?.[time]?.room === room) {
                        usedSlots++
                      }
                    })
                  })

                  const utilizationPercentage = Math.round((usedSlots / totalSlots) * 100)

                  return (
                    <div key={room} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{room}</h3>
                        <span className="text-sm text-muted-foreground">{utilizationPercentage}% utilized</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${utilizationPercentage}%` }} />
                      </div>
                      <div className="rounded-md border mt-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Day</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Faculty</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {days.flatMap((day) =>
                              timeSlots
                                .map((time) => {
                                  const cell = timetableData[day]?.[time]
                                  if (cell?.room !== room) return null

                                  return (
                                    <TableRow key={`${day}-${time}`}>
                                      <TableCell>{day}</TableCell>
                                      <TableCell>{time}</TableCell>
                                      <TableCell>{cell.subject}</TableCell>
                                      <TableCell>{cell.faculty}</TableCell>
                                    </TableRow>
                                  )
                                })
                                .filter(Boolean),
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedCell && (
        <Card className="mt-4 border-primary">
          <CardHeader>
            <CardTitle>
              Edit Cell: {selectedCell.day} at {selectedCell.time}
            </CardTitle>
            <CardDescription>Update the details for this time slot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Select defaultValue={timetableData[selectedCell.day]?.[selectedCell.time]?.subject || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Database Systems">Database Systems</SelectItem>
                    <SelectItem value="Computer Networks">Computer Networks</SelectItem>
                    <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                    <SelectItem value="no-class">No Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Faculty</label>
                <Select defaultValue={timetableData[selectedCell.day]?.[selectedCell.time]?.faculty || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Sharma">Dr. Sharma</SelectItem>
                    <SelectItem value="Dr. Gupta">Dr. Gupta</SelectItem>
                    <SelectItem value="Dr. Kumar">Dr. Kumar</SelectItem>
                    <SelectItem value="Dr. Patel">Dr. Patel</SelectItem>
                    <SelectItem value="Prof. Singh">Prof. Singh</SelectItem>
                    <SelectItem value="no-faculty">No Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select defaultValue={timetableData[selectedCell.day]?.[selectedCell.time]?.type || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Theory">Theory</SelectItem>
                    <SelectItem value="Practical">Practical</SelectItem>
                    <SelectItem value="no-type">No Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Room</label>
                <Select defaultValue={timetableData[selectedCell.day]?.[selectedCell.time]?.room || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LH-101">LH-101</SelectItem>
                    <SelectItem value="LH-102">LH-102</SelectItem>
                    <SelectItem value="Lab-201">Lab-201</SelectItem>
                    <SelectItem value="Lab-202">Lab-202</SelectItem>
                    <SelectItem value="no-room">No Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setSelectedCell(null)}>
                Cancel
              </Button>
              <div className="space-x-2">
                <Button variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Clear Slot
                </Button>
                <Button>Apply Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


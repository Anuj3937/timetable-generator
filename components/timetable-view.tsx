"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Save, Trash, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface TimetableCell {
  subject: string
  faculty: string
  room: string
  type: "Theory" | "Lab" | ""
}

interface TimetableData {
  [day: string]: {
    [timeSlot: string]: TimetableCell
  }
}

interface TimetableViewProps {
  department: string
  timetableData?: TimetableData | null
}

export function TimetableView({ department, timetableData: propsTimetableData }: TimetableViewProps) {
  const [selectedYear, setSelectedYear] = useState("1")
  const [selectedSemester, setSelectedSemester] = useState("fall")
  const [selectedView, setSelectedView] = useState("weekly")
  const [editMode, setEditMode] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{ day: string; time: string } | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editedCell, setEditedCell] = useState<TimetableCell>({ subject: "", faculty: "", room: "", type: "" })
  const [conflicts, setConflicts] = useState<string[]>([])

  // This would normally be fetched from an API based on the department, year, and semester
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = ["9:00 - 10:30", "10:30 - 12:00", "12:00 - 1:30", "1:30 - 3:00", "3:00 - 4:30"]

  // Use provided timetable data or fallback to sample data
  const [timetableData, setTimetableData] = useState<TimetableData>(
    propsTimetableData || {
      Monday: {
        "9:00 - 10:30": { subject: "Database Systems", faculty: "Dr. Johnson", room: "003", type: "Theory" },
        "10:30 - 12:00": { subject: "Computer Networks", faculty: "Dr. Smith", room: "005", type: "Theory" },
        "12:00 - 1:30": { subject: "Lunch Break", faculty: "", room: "", type: "" },
        "1:30 - 3:00": { subject: "Programming Lab", faculty: "Prof. Williams", room: "008", type: "Lab" },
        "3:00 - 4:30": { subject: "Data Structures", faculty: "Dr. Brown", room: "004", type: "Theory" },
      },
      Tuesday: {
        "9:00 - 10:30": { subject: "Operating Systems", faculty: "Dr. Davis", room: "003", type: "Theory" },
        "10:30 - 12:00": { subject: "Computer Architecture", faculty: "Prof. Miller", room: "002", type: "Theory" },
        "12:00 - 1:30": { subject: "Lunch Break", faculty: "", room: "", type: "" },
        "1:30 - 3:00": { subject: "Database Systems Lab", faculty: "Dr. Johnson", room: "008", type: "Lab" },
        "3:00 - 4:30": { subject: "", faculty: "", room: "", type: "" },
      },
      Wednesday: {
        "9:00 - 10:30": { subject: "Database Systems", faculty: "Dr. Johnson", room: "003", type: "Theory" },
        "10:30 - 12:00": { subject: "Computer Networks", faculty: "Dr. Smith", room: "005", type: "Theory" },
        "12:00 - 1:30": { subject: "Lunch Break", faculty: "", room: "", type: "" },
        "1:30 - 3:00": { subject: "Computer Networks Lab", faculty: "Dr. Smith", room: "013", type: "Lab" },
        "3:00 - 4:30": { subject: "Data Structures", faculty: "Dr. Brown", room: "004", type: "Theory" },
      },
      Thursday: {
        "9:00 - 10:30": { subject: "Operating Systems", faculty: "Dr. Davis", room: "003", type: "Theory" },
        "10:30 - 12:00": { subject: "Computer Architecture", faculty: "Prof. Miller", room: "002", type: "Theory" },
        "12:00 - 1:30": { subject: "Lunch Break", faculty: "", room: "", type: "" },
        "1:30 - 3:00": { subject: "Operating Systems Lab", faculty: "Dr. Davis", room: "018", type: "Lab" },
        "3:00 - 4:30": { subject: "", faculty: "", room: "", type: "" },
      },
      Friday: {
        "9:00 - 10:30": { subject: "Database Systems", faculty: "Dr. Johnson", room: "003", type: "Theory" },
        "10:30 - 12:00": { subject: "Computer Networks", faculty: "Dr. Smith", room: "005", type: "Theory" },
        "12:00 - 1:30": { subject: "Lunch Break", faculty: "", room: "", type: "" },
        "1:30 - 3:00": { subject: "", faculty: "", room: "", type: "" },
        "3:00 - 4:30": { subject: "", faculty: "", room: "", type: "" },
      },
    },
  )

  // Update timetable data when props change
  if (propsTimetableData && propsTimetableData !== timetableData) {
    setTimetableData(propsTimetableData)
  }

  const handleCellClick = (day: string, timeSlot: string) => {
    if (editMode) {
      setSelectedCell({ day, time: timeSlot })
      setEditedCell({ ...timetableData[day][timeSlot] })
      setEditDialogOpen(true)
    }
  }

  const handleSaveCell = () => {
    if (!selectedCell) return

    const { day, time } = selectedCell

    // Check for conflicts
    const newConflicts: string[] = []

    // Check for faculty conflicts
    if (editedCell.faculty) {
      for (const [checkDay, daySchedule] of Object.entries(timetableData)) {
        for (const [checkTime, cell] of Object.entries(daySchedule)) {
          if (checkDay === day && checkTime === time) continue
          if (checkDay === day && checkTime === time) continue

          if (cell.faculty === editedCell.faculty && checkDay === day && checkTime === time) {
            newConflicts.push(`Faculty ${editedCell.faculty} is already assigned to another class at this time`)
          }
        }
      }
    }

    // Check for room conflicts
    if (editedCell.room) {
      for (const [checkDay, daySchedule] of Object.entries(timetableData)) {
        for (const [checkTime, cell] of Object.entries(daySchedule)) {
          if (checkDay === day && checkTime === time) continue

          if (cell.room === editedCell.room && checkDay === day && checkTime === time) {
            newConflicts.push(`Room ${editedCell.room} is already assigned to another class at this time`)
          }
        }
      }
    }

    // If there are conflicts, show them but don't save
    if (newConflicts.length > 0) {
      setConflicts(newConflicts)
      return
    }

    // Update the timetable
    const updatedTimetable = { ...timetableData }
    updatedTimetable[day][time] = { ...editedCell }
    setTimetableData(updatedTimetable)
    setEditDialogOpen(false)
    setSelectedCell(null)
    setConflicts([])
  }

  const handleClearCell = () => {
    if (!selectedCell) return

    const { day, time } = selectedCell

    // Update the timetable
    const updatedTimetable = { ...timetableData }
    updatedTimetable[day][time] = { subject: "", faculty: "", room: "", type: "" }
    setTimetableData(updatedTimetable)
    setEditDialogOpen(false)
    setSelectedCell(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/4">
          <label className="text-sm font-medium">Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
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
        <div className="w-full sm:w-1/4">
          <label className="text-sm font-medium">Semester</label>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fall">Fall</SelectItem>
              <SelectItem value="spring">Spring</SelectItem>
              <SelectItem value="summer">Summer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/4">
          <label className="text-sm font-medium">View</label>
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger>
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="faculty">By Faculty</SelectItem>
              <SelectItem value="room">By Room</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/4 flex items-end">
          <Button variant={editMode ? "default" : "outline"} className="w-full" onClick={() => setEditMode(!editMode)}>
            {editMode ? (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Mode
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit Mode
              </>
            )}
          </Button>
        </div>
      </div>

      {selectedView === "weekly" && (
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
                    const cell = timetableData[day]?.[timeSlot] || { subject: "", faculty: "", room: "", type: "" }
                    const isSelected = selectedCell?.day === day && selectedCell?.time === timeSlot

                    return (
                      <TableCell
                        key={`${day}-${timeSlot}`}
                        className={`
                          ${cell.type === "Lab" ? "bg-blue-50 dark:bg-blue-950" : ""}
                          ${isSelected ? "ring-2 ring-primary" : ""} 
                          ${editMode ? "cursor-pointer hover:bg-muted/50" : ""}
                        `}
                        onClick={() => handleCellClick(day, timeSlot)}
                      >
                        {cell.subject && (
                          <>
                            <div className="font-medium">{cell.subject}</div>
                            {cell.faculty && <div className="text-xs text-muted-foreground">{cell.faculty}</div>}
                            {cell.room && (
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={cell.type === "Theory" ? "default" : "secondary"}>{cell.type}</Badge>
                                <span className="text-xs text-muted-foreground">Room: {cell.room}</span>
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
      )}

      {selectedView === "daily" && (
        <div className="space-y-4">
          <div className="w-full">
            <label className="text-sm font-medium">Day</label>
            <Select defaultValue="Monday">
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((timeSlot) => {
                  const cell = timetableData["Monday"]?.[timeSlot] || { subject: "", faculty: "", room: "", type: "" }

                  return (
                    <TableRow key={timeSlot}>
                      <TableCell className="font-medium">{timeSlot}</TableCell>
                      <TableCell>{cell.subject}</TableCell>
                      <TableCell>{cell.faculty}</TableCell>
                      <TableCell>{cell.room}</TableCell>
                      <TableCell>
                        {cell.type && (
                          <Badge variant={cell.type === "Theory" ? "default" : "secondary"}>{cell.type}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {selectedView === "faculty" && (
        <div className="space-y-4">
          <div className="w-full">
            <label className="text-sm font-medium">Faculty</label>
            <Select defaultValue="Dr.Johnson">
              <SelectTrigger>
                <SelectValue placeholder="Select faculty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr.Johnson">Dr. Johnson</SelectItem>
                <SelectItem value="Dr.Smith">Dr. Smith</SelectItem>
                <SelectItem value="Prof. Williams">Prof. Williams</SelectItem>
                <SelectItem value="Dr.Brown">Dr. Brown</SelectItem>
                <SelectItem value="Prof. Davis">Prof. Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {days.flatMap((day) =>
                  timeSlots
                    .map((timeSlot) => {
                      const cell = timetableData[day]?.[timeSlot]

                      // Only show classes for the selected faculty
                      if (!cell || cell.faculty !== "Dr. Johnson") return null

                      return (
                        <TableRow key={`${day}-${timeSlot}`}>
                          <TableCell>{day}</TableCell>
                          <TableCell>{timeSlot}</TableCell>
                          <TableCell>{cell.subject}</TableCell>
                          <TableCell>{cell.room}</TableCell>
                          <TableCell>
                            {cell.type && (
                              <Badge variant={cell.type === "Theory" ? "default" : "secondary"}>{cell.type}</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })
                    .filter(Boolean),
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {selectedView === "room" && (
        <div className="space-y-4">
          <div className="w-full">
            <label className="text-sm font-medium">Room</label>
            <Select defaultValue="003">
              <SelectTrigger>
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="003">003 (Theory)</SelectItem>
                <SelectItem value="005">005 (Theory)</SelectItem>
                <SelectItem value="008">008 (Lab)</SelectItem>
                <SelectItem value="013">013 (Lab)</SelectItem>
                <SelectItem value="018">018 (Lab)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {days.flatMap((day) =>
                  timeSlots
                    .map((timeSlot) => {
                      const cell = timetableData[day]?.[timeSlot]

                      // Only show classes for the selected room
                      if (!cell || cell.room !== "003") return null

                      return (
                        <TableRow key={`${day}-${timeSlot}`}>
                          <TableCell>{day}</TableCell>
                          <TableCell>{timeSlot}</TableCell>
                          <TableCell>{cell.subject}</TableCell>
                          <TableCell>{cell.faculty}</TableCell>
                          <TableCell>
                            {cell.type && (
                              <Badge variant={cell.type === "Theory" ? "default" : "secondary"}>{cell.type}</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })
                    .filter(Boolean),
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Edit Cell: {selectedCell?.day} at {selectedCell?.time}
            </DialogTitle>
            <DialogDescription>Update the details for this time slot</DialogDescription>
          </DialogHeader>

          {conflicts.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Conflicts Detected</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 text-sm">
                  {conflicts.map((conflict, index) => (
                    <li key={index}>{conflict}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={editedCell.subject}
                onChange={(e) => setEditedCell({ ...editedCell, subject: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty" className="text-right">
                Faculty
              </Label>
              <Input
                id="faculty"
                value={editedCell.faculty}
                onChange={(e) => setEditedCell({ ...editedCell, faculty: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">
                Room
              </Label>
              <Input
                id="room"
                value={editedCell.room}
                onChange={(e) => setEditedCell({ ...editedCell, room: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={editedCell.type}
                onValueChange={(value) => setEditedCell({ ...editedCell, type: value as "Theory" | "Lab" | "" })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Theory">Theory</SelectItem>
                  <SelectItem value="Lab">Lab</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClearCell}>
              <Trash className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button type="submit" onClick={handleSaveCell}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


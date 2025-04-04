"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Wand2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAvailableFaculty } from "@/lib/faculty-service"
import { getAvailableClassrooms } from "@/lib/classroom-service"

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

interface Conflict {
  type: "faculty" | "classroom"
  day: string
  timeSlot: string
  conflictingCells: {
    day: string
    timeSlot: string
    cell: TimetableCell
  }[]
}

interface ConflictResolverProps {
  timetableData: TimetableData
  onTimetableUpdate: (updatedTimetable: TimetableData) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConflictResolver({ timetableData, onTimetableUpdate, open, onOpenChange }: ConflictResolverProps) {
  const [conflicts, setConflicts] = useState<Conflict[]>([])
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null)
  const [selectedResolutionTab, setSelectedResolutionTab] = useState("manual")
  const [availableFaculty, setAvailableFaculty] = useState<string[]>([])
  const [availableRooms, setAvailableRooms] = useState<{ id: string; roomNumber: string; type: string }[]>([])
  const [selectedFaculty, setSelectedFaculty] = useState<string>("")
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [isResolving, setIsResolving] = useState(false)
  const [resolutionMessage, setResolutionMessage] = useState("")

  // Detect conflicts whenever timetable data changes
  useEffect(() => {
    const detectedConflicts = detectConflicts(timetableData)
    setConflicts(detectedConflicts)

    // If there are conflicts and none is selected, select the first one
    if (detectedConflicts.length > 0 && !selectedConflict) {
      setSelectedConflict(detectedConflicts[0])
    }
  }, [timetableData, selectedConflict])

  // Load available faculty and rooms when a conflict is selected
  useEffect(() => {
    if (selectedConflict) {
      const loadResources = async () => {
        try {
          // Get available faculty for this time slot
          const faculty = await getAvailableFaculty(selectedConflict.day, selectedConflict.timeSlot, timetableData)
          setAvailableFaculty(faculty.map((f) => f.name))

          // Get available rooms for this time slot
          const requiredType = selectedConflict.conflictingCells[0].cell.type
          const rooms = await getAvailableClassrooms(
            selectedConflict.day,
            selectedConflict.timeSlot,
            requiredType,
            timetableData,
          )
          setAvailableRooms(rooms)

          // Reset selections
          setSelectedFaculty("")
          setSelectedRoom("")
        } catch (error) {
          console.error("Error loading resources:", error)
        }
      }

      loadResources()
    }
  }, [selectedConflict, timetableData])

  // Function to detect conflicts in the timetable
  function detectConflicts(timetable: TimetableData): Conflict[] {
    const conflicts: Conflict[] = []
    const days = Object.keys(timetable)

    // Check for faculty conflicts
    const facultyAssignments: Record<string, { day: string; timeSlot: string; cell: TimetableCell }[]> = {}

    // Check for classroom conflicts
    const roomAssignments: Record<string, { day: string; timeSlot: string; cell: TimetableCell }[]> = {}

    // Collect all assignments
    for (const day of days) {
      const timeSlots = Object.keys(timetable[day])

      for (const timeSlot of timeSlots) {
        const cell = timetable[day][timeSlot]

        // Skip empty cells or lunch breaks
        if (!cell.subject || cell.subject === "Lunch Break") continue

        // Track faculty assignments
        if (cell.faculty) {
          if (!facultyAssignments[cell.faculty]) {
            facultyAssignments[cell.faculty] = []
          }
          facultyAssignments[cell.faculty].push({ day, timeSlot, cell })
        }

        // Track room assignments
        if (cell.room) {
          if (!roomAssignments[cell.room]) {
            roomAssignments[cell.room] = []
          }
          roomAssignments[cell.room].push({ day, timeSlot, cell })
        }
      }
    }

    // Check for faculty conflicts (same faculty assigned to different classes at the same time)
    for (const faculty in facultyAssignments) {
      const assignments = facultyAssignments[faculty]

      for (let i = 0; i < assignments.length; i++) {
        for (let j = i + 1; j < assignments.length; j++) {
          if (assignments[i].day === assignments[j].day && assignments[i].timeSlot === assignments[j].timeSlot) {
            conflicts.push({
              type: "faculty",
              day: assignments[i].day,
              timeSlot: assignments[i].timeSlot,
              conflictingCells: [assignments[i], assignments[j]],
            })
          }
        }
      }
    }

    // Check for classroom conflicts (same room assigned to different classes at the same time)
    for (const room in roomAssignments) {
      const assignments = roomAssignments[room]

      for (let i = 0; i < assignments.length; i++) {
        for (let j = i + 1; j < assignments.length; j++) {
          if (assignments[i].day === assignments[j].day && assignments[i].timeSlot === assignments[j].timeSlot) {
            conflicts.push({
              type: "classroom",
              day: assignments[i].day,
              timeSlot: assignments[i].timeSlot,
              conflictingCells: [assignments[i], assignments[j]],
            })
          }
        }
      }
    }

    return conflicts
  }

  // Function to manually resolve a conflict
  const resolveConflictManually = () => {
    if (!selectedConflict) return

    setIsResolving(true)
    setResolutionMessage("")

    try {
      const updatedTimetable = { ...timetableData }
      const { type, conflictingCells } = selectedConflict

      // For faculty conflicts, update the faculty of the second cell
      if (type === "faculty" && selectedFaculty) {
        const cellToUpdate = conflictingCells[1]
        updatedTimetable[cellToUpdate.day][cellToUpdate.timeSlot] = {
          ...cellToUpdate.cell,
          faculty: selectedFaculty,
        }

        setResolutionMessage(
          `Faculty conflict resolved by assigning ${selectedFaculty} to ${cellToUpdate.cell.subject}`,
        )
      }

      // For classroom conflicts, update the room of the second cell
      if (type === "classroom" && selectedRoom) {
        const cellToUpdate = conflictingCells[1]
        updatedTimetable[cellToUpdate.day][cellToUpdate.timeSlot] = {
          ...cellToUpdate.cell,
          room: selectedRoom,
        }

        setResolutionMessage(
          `Classroom conflict resolved by moving ${cellToUpdate.cell.subject} to room ${selectedRoom}`,
        )
      }

      // Update the timetable
      onTimetableUpdate(updatedTimetable)

      // If there are more conflicts, select the next one
      setTimeout(() => {
        const remainingConflicts = detectConflicts(updatedTimetable)
        if (remainingConflicts.length > 0) {
          setSelectedConflict(remainingConflicts[0])
        } else {
          setSelectedConflict(null)
        }
        setIsResolving(false)
      }, 1000)
    } catch (error) {
      console.error("Error resolving conflict:", error)
      setResolutionMessage("Error resolving conflict. Please try again.")
      setIsResolving(false)
    }
  }

  // Function to automatically resolve all conflicts
  const resolveAllConflictsAutomatically = async () => {
    setIsResolving(true)
    setResolutionMessage("")

    try {
      let currentTimetable = { ...timetableData }
      let currentConflicts = detectConflicts(currentTimetable)
      let resolutionCount = 0

      while (currentConflicts.length > 0) {
        const conflict = currentConflicts[0]

        // For faculty conflicts
        if (conflict.type === "faculty") {
          // Get available faculty
          const faculty = await getAvailableFaculty(conflict.day, conflict.timeSlot, currentTimetable)

          if (faculty.length > 0) {
            const cellToUpdate = conflict.conflictingCells[1]
            currentTimetable[cellToUpdate.day][cellToUpdate.timeSlot] = {
              ...cellToUpdate.cell,
              faculty: faculty[0].name,
            }
            resolutionCount++
          } else {
            // If no faculty available, try to reschedule the class
            const cellToUpdate = conflict.conflictingCells[1]
            const result = await findAlternativeTimeSlot(
              currentTimetable,
              cellToUpdate.day,
              cellToUpdate.timeSlot,
              cellToUpdate.cell,
            )

            if (result.success) {
              currentTimetable = result.timetable
              resolutionCount++
            } else {
              setResolutionMessage(`Could not resolve all conflicts automatically. Please resolve manually.`)
              break
            }
          }
        }

        // For classroom conflicts
        if (conflict.type === "classroom") {
          // Get available rooms
          const requiredType = conflict.conflictingCells[1].cell.type
          const rooms = await getAvailableClassrooms(conflict.day, conflict.timeSlot, requiredType, currentTimetable)

          if (rooms.length > 0) {
            const cellToUpdate = conflict.conflictingCells[1]
            currentTimetable[cellToUpdate.day][cellToUpdate.timeSlot] = {
              ...cellToUpdate.cell,
              room: rooms[0].roomNumber,
            }
            resolutionCount++
          } else {
            // If no rooms available, try to reschedule the class
            const cellToUpdate = conflict.conflictingCells[1]
            const result = await findAlternativeTimeSlot(
              currentTimetable,
              cellToUpdate.day,
              cellToUpdate.timeSlot,
              cellToUpdate.cell,
            )

            if (result.success) {
              currentTimetable = result.timetable
              resolutionCount++
            } else {
              setResolutionMessage(`Could not resolve all conflicts automatically. Please resolve manually.`)
              break
            }
          }
        }

        // Check for remaining conflicts
        currentConflicts = detectConflicts(currentTimetable)
      }

      // Update the timetable
      onTimetableUpdate(currentTimetable)

      if (currentConflicts.length === 0) {
        setResolutionMessage(`Successfully resolved ${resolutionCount} conflicts automatically.`)
        setSelectedConflict(null)
      }
    } catch (error) {
      console.error("Error resolving conflicts:", error)
      setResolutionMessage("Error resolving conflicts. Please try again.")
    } finally {
      setIsResolving(false)
    }
  }

  // Helper function to find an alternative time slot for a class
  async function findAlternativeTimeSlot(
    timetable: TimetableData,
    currentDay: string,
    currentTimeSlot: string,
    cell: TimetableCell,
  ): Promise<{ success: boolean; timetable: TimetableData }> {
    const days = Object.keys(timetable)
    const timeSlots = Object.keys(timetable[days[0]])

    // Create a copy of the timetable
    const updatedTimetable = { ...timetable }

    // Remove the class from its current slot
    updatedTimetable[currentDay][currentTimeSlot] = {
      subject: "",
      faculty: "",
      room: "",
      type: "",
    }

    // Try to find a new slot
    for (const day of days) {
      for (const timeSlot of timeSlots) {
        // Skip lunch break
        if (timeSlot === "12:00 - 1:30") continue

        // Skip if slot is already occupied
        if (updatedTimetable[day][timeSlot].subject) continue

        // Check if faculty is available at this time
        const facultyAvailable = await isFacultyAvailable(cell.faculty, day, timeSlot, updatedTimetable)

        if (!facultyAvailable) continue

        // Check if a suitable room is available
        const roomsAvailable = await getAvailableClassrooms(day, timeSlot, cell.type, updatedTimetable)

        if (roomsAvailable.length === 0) continue

        // Found a suitable slot, assign the class
        updatedTimetable[day][timeSlot] = {
          ...cell,
          room: roomsAvailable[0].roomNumber,
        }

        return { success: true, timetable: updatedTimetable }
      }
    }

    // Could not find a suitable slot, put the class back
    updatedTimetable[currentDay][currentTimeSlot] = cell
    return { success: false, timetable: updatedTimetable }
  }

  // Helper function to check if a faculty is available at a given time
  async function isFacultyAvailable(
    faculty: string,
    day: string,
    timeSlot: string,
    timetable: TimetableData,
  ): Promise<boolean> {
    // Check if the faculty is already assigned to another class at this time
    for (const [existingDay, daySchedule] of Object.entries(timetable)) {
      if (existingDay === day) {
        for (const [existingSlot, cell] of Object.entries(daySchedule)) {
          if (existingSlot === timeSlot && cell.faculty === faculty) {
            return false
          }
        }
      }
    }

    return true
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Conflict Resolution</DialogTitle>
          <DialogDescription>
            {conflicts.length === 0
              ? "No conflicts detected in the timetable."
              : `${conflicts.length} conflict(s) detected. Please resolve them to finalize the timetable.`}
          </DialogDescription>
        </DialogHeader>

        {conflicts.length > 0 && selectedConflict && (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{selectedConflict.type === "faculty" ? "Faculty Conflict" : "Classroom Conflict"}</AlertTitle>
              <AlertDescription>
                {selectedConflict.type === "faculty"
                  ? `Faculty ${selectedConflict.conflictingCells[0].cell.faculty} is assigned to multiple classes on ${selectedConflict.day} at ${selectedConflict.timeSlot}.`
                  : `Room ${selectedConflict.conflictingCells[0].cell.room} is assigned to multiple classes on ${selectedConflict.day} at ${selectedConflict.timeSlot}.`}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              {selectedConflict.conflictingCells.map((conflictCell, index) => (
                <div key={index} className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Class {index + 1}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Subject:</span> {conflictCell.cell.subject}
                    </div>
                    <div>
                      <span className="font-medium">Faculty:</span> {conflictCell.cell.faculty}
                    </div>
                    <div>
                      <span className="font-medium">Room:</span> {conflictCell.cell.room}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <Badge variant={conflictCell.cell.type === "Theory" ? "default" : "secondary"} className="ml-2">
                        {conflictCell.cell.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Tabs value={selectedResolutionTab} onValueChange={setSelectedResolutionTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual Resolution</TabsTrigger>
                <TabsTrigger value="automatic">Automatic Resolution</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-4 mt-4">
                  {selectedConflict.type === "faculty" && (
                    <div className="space-y-2">
                      <Label>Assign a different faculty to the second class:</Label>
                      <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFaculty.map((faculty) => (
                            <SelectItem key={faculty} value={faculty}>
                              {faculty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedConflict.type === "classroom" && (
                    <div className="space-y-2">
                      <Label>Assign a different room to the second class:</Label>
                      <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRooms.map((room) => (
                            <SelectItem key={room.id} value={room.roomNumber}>
                              {room.roomNumber} ({room.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    onClick={resolveConflictManually}
                    disabled={
                      isResolving ||
                      (selectedConflict.type === "faculty" && !selectedFaculty) ||
                      (selectedConflict.type === "classroom" && !selectedRoom)
                    }
                    className="w-full"
                  >
                    {isResolving ? "Resolving..." : "Resolve Conflict"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="automatic" className="space-y-4">
                <div className="space-y-4 mt-4">
                  <Alert>
                    <AlertTitle>Automatic Resolution</AlertTitle>
                    <AlertDescription>
                      The system will attempt to resolve all conflicts automatically by:
                      <ul className="list-disc pl-5 mt-2">
                        <li>Assigning alternative faculty to conflicting classes</li>
                        <li>Finding alternative rooms for conflicting classes</li>
                        <li>Rescheduling classes to different time slots if necessary</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <Button onClick={resolveAllConflictsAutomatically} disabled={isResolving} className="w-full">
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isResolving ? "Resolving..." : "Resolve All Conflicts Automatically"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {resolutionMessage && (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                <AlertTitle className="text-green-800 dark:text-green-300">Resolution Status</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">{resolutionMessage}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isResolving}>
            {conflicts.length === 0 ? "Close" : "Cancel"}
          </Button>

          {conflicts.length > 0 && (
            <Button
              onClick={() => {
                const nextIndex =
                  conflicts.findIndex(
                    (c) =>
                      c.day === selectedConflict?.day &&
                      c.timeSlot === selectedConflict?.timeSlot &&
                      c.type === selectedConflict?.type,
                  ) + 1

                if (nextIndex < conflicts.length) {
                  setSelectedConflict(conflicts[nextIndex])
                } else if (conflicts.length > 0) {
                  setSelectedConflict(conflicts[0])
                }
              }}
              disabled={conflicts.length <= 1 || isResolving}
            >
              Next Conflict
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


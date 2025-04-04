"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ConflictDetectorProps {
  timetableData: any
  division?: string
  department?: string
  year?: string
}

export function ConflictDetector({
  timetableData,
  division = "A",
  department = "cs",
  year = "1",
}: ConflictDetectorProps) {
  const [conflicts, setConflicts] = useState<
    {
      type: string
      description: string
      details: string
    }[]
  >([])

  useEffect(() => {
    // This would be a more complex algorithm in a real application
    // Here we're just simulating conflict detection

    // For demo purposes, let's create some sample conflicts
    const sampleConflicts = [
      {
        type: "classroom",
        description: "Classroom double booking detected",
        details: "LH-101 is assigned to both CS301 (Division A) and EE201 (Division B) on Monday at 10:00 AM",
      },
      {
        type: "faculty",
        description: "Faculty scheduling conflict",
        details: "Dr. Sharma is assigned to teach Division A and Division C at the same time on Wednesday at 2:00 PM",
      },
    ]

    // In a real app, we would analyze the timetableData to find actual conflicts
    // For now, we'll just show these sample conflicts if certain conditions are met

    if (division === "A" || division === "B") {
      setConflicts(sampleConflicts)
    } else {
      setConflicts([])
    }
  }, [timetableData, division, department, year])

  if (conflicts.length === 0) {
    return (
      <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-800 dark:text-green-300">No conflicts detected</AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-400">
          The current timetable has no classroom or faculty conflicts between divisions.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-3">
      {conflicts.map((conflict, index) => (
        <Alert key={index} variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{conflict.description}</AlertTitle>
          <AlertDescription>{conflict.details}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}


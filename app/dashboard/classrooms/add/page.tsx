"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddClassroomPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [roomNumber, setRoomNumber] = useState("")
  const [floor, setFloor] = useState("0")
  const [roomType, setRoomType] = useState("Theory")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/classrooms")
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4">
      <DashboardHeader heading="Add Classroom" text="Add a new classroom to the system" />

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Classroom Information</CardTitle>
            <CardDescription>Enter the details of the new classroom</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  placeholder="001"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Format: 3 digits (e.g., 001 for ground floor, 101 for first floor)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Select value={floor} onValueChange={setFloor} required>
                  <SelectTrigger id="floor">
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Ground Floor</SelectItem>
                    <SelectItem value="1">First Floor</SelectItem>
                    <SelectItem value="2">Second Floor</SelectItem>
                    <SelectItem value="3">Third Floor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select value={roomType} onValueChange={setRoomType} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Theory">Theory</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Seating Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  max="200"
                  placeholder={roomType === "Lab" ? "30" : "60"}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Facilities</Label>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasProjector" defaultChecked={true} />
                  <label
                    htmlFor="hasProjector"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Projector
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasComputers" defaultChecked={roomType === "Lab"} />
                  <label
                    htmlFor="hasComputers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Computers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasAC" defaultChecked={true} />
                  <label
                    htmlFor="hasAC"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Air Conditioning
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Any special features or restrictions" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Add Classroom"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


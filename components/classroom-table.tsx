"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
type Classroom = {
  id: string
  roomNumber: string
  floor: number
  capacity: number
  type: "Theory" | "Lab"
  hasProjector: boolean
  hasComputers: boolean
  isAvailable: boolean
}

// Generate classrooms based on requirements
const generateClassrooms = (): Classroom[] => {
  const classrooms: Classroom[] = []

  // Generate rooms 001 to 020
  for (let i = 1; i <= 20; i++) {
    const roomNumber = i.toString().padStart(3, "0")
    const floor = Math.floor(i / 100)

    // Determine if it's a lab (008, 013, 018-020)
    const isLab = [8, 13, 18, 19, 20].includes(i)

    classrooms.push({
      id: `room-${roomNumber}`,
      roomNumber,
      floor,
      capacity: isLab ? 30 : 60,
      type: isLab ? "Lab" : "Theory",
      hasProjector: true,
      hasComputers: isLab,
      isAvailable: true,
    })
  }

  // Add rooms for other floors (101, 102, etc.)
  for (let floor = 1; floor <= 2; floor++) {
    for (let i = 1; i <= 10; i++) {
      const roomNumber = `${floor}${i.toString().padStart(2, "0")}`
      const isLab = [8, 10].includes(i)

      classrooms.push({
        id: `room-${roomNumber}`,
        roomNumber,
        floor,
        capacity: isLab ? 30 : 60,
        type: isLab ? "Lab" : "Theory",
        hasProjector: true,
        hasComputers: isLab,
        isAvailable: true,
      })
    }
  }

  return classrooms
}

const data = generateClassrooms()

export function ClassroomTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Classroom>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "roomNumber",
      header: "Room Number",
      cell: ({ row }) => <div className="font-medium">{row.getValue("roomNumber")}</div>,
    },
    {
      accessorKey: "floor",
      header: "Floor",
      cell: ({ row }) => <div>{row.getValue("floor")}</div>,
    },
    {
      accessorKey: "capacity",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Capacity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("capacity")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return <Badge variant={type === "Theory" ? "default" : "secondary"}>{type}</Badge>
      },
    },
    {
      accessorKey: "hasProjector",
      header: "Projector",
      cell: ({ row }) => <div className="text-center">{row.getValue("hasProjector") ? "Yes" : "No"}</div>,
    },
    {
      accessorKey: "hasComputers",
      header: "Computers",
      cell: ({ row }) => <div className="text-center">{row.getValue("hasComputers") ? "Yes" : "No"}</div>,
    },
    {
      accessorKey: "isAvailable",
      header: "Status",
      cell: ({ row }) => {
        const isAvailable = row.getValue("isAvailable") as boolean
        return (
          <Badge variant={isAvailable ? "outline" : "destructive"}>{isAvailable ? "Available" : "Unavailable"}</Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const classroom = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(classroom.id)}>
                Copy classroom ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit classroom
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete classroom
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter classrooms..."
          value={(table.getColumn("roomNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("roomNumber")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Floor <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("floor")?.setFilterValue("")}>
                All Floors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("floor")?.setFilterValue(0)}>
                Ground Floor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("floor")?.setFilterValue(1)}>
                First Floor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("floor")?.setFilterValue(2)}>
                Second Floor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Type <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("type")?.setFilterValue("")}>All Types</DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("type")?.setFilterValue("Theory")}>
                Theory
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("type")?.setFilterValue("Lab")}>Lab</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


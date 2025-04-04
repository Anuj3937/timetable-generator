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
type Subject = {
  id: string
  name: string
  code: string
  department: string
  year: "1" | "2" | "3" | "4"
  semester: "Fall" | "Spring" | "Summer"
  credits: number
  theoryHours: number
  labHours: number
  type: "Theory" | "Lab" | "Both"
}

const data: Subject[] = [
  {
    id: "s1",
    name: "Database Systems",
    code: "CS301",
    department: "Computer Science",
    year: "3",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s2",
    name: "Computer Networks",
    code: "CS302",
    department: "Computer Science",
    year: "3",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s3",
    name: "Operating Systems",
    code: "CS303",
    department: "Computer Science",
    year: "3",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s4",
    name: "Calculus I",
    code: "MATH101",
    department: "Mathematics",
    year: "1",
    semester: "Fall",
    credits: 3,
    theoryHours: 3,
    labHours: 0,
    type: "Theory",
  },
  {
    id: "s5",
    name: "Physics I",
    code: "PHY101",
    department: "Physics",
    year: "1",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s6",
    name: "Digital Electronics",
    code: "EE201",
    department: "Electrical Engineering",
    year: "2",
    semester: "Fall",
    credits: 4,
    theoryHours: 3,
    labHours: 2,
    type: "Both",
  },
  {
    id: "s7",
    name: "Thermodynamics",
    code: "ME301",
    department: "Mechanical Engineering",
    year: "3",
    semester: "Fall",
    credits: 3,
    theoryHours: 3,
    labHours: 0,
    type: "Theory",
  },
]

export function SubjectsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Subject>[] = [
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
      accessorKey: "name",
      header: "Subject Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <div className="font-mono">{row.getValue("code")}</div>,
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => <div>{row.getValue("department")}</div>,
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => <Badge variant="outline">Year {row.getValue("year")}</Badge>,
    },
    {
      accessorKey: "semester",
      header: "Semester",
      cell: ({ row }) => <div>{row.getValue("semester")}</div>,
    },
    {
      accessorKey: "credits",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Credits
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("credits")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return <Badge variant={type === "Theory" ? "default" : type === "Lab" ? "secondary" : "outline"}>{type}</Badge>
      },
    },
    {
      accessorKey: "theoryHours",
      header: "Theory Hours",
      cell: ({ row }) => <div className="text-center">{row.getValue("theoryHours")}</div>,
    },
    {
      accessorKey: "labHours",
      header: "Lab Hours",
      cell: ({ row }) => <div className="text-center">{row.getValue("labHours")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const subject = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(subject.id)}>
                Copy subject ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit subject
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete subject
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
          placeholder="Filter subjects..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Department <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("")}>
                All Departments
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Computer Science")}>
                Computer Science
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Mathematics")}>
                Mathematics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Physics")}>
                Physics
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Electrical Engineering")}>
                Electrical Engineering
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("department")?.setFilterValue("Mechanical Engineering")}>
                Mechanical Engineering
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Year <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("year")?.setFilterValue("")}>All Years</DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("year")?.setFilterValue("1")}>
                First Year
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("year")?.setFilterValue("2")}>
                Second Year
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("year")?.setFilterValue("3")}>
                Third Year
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("year")?.setFilterValue("4")}>
                Fourth Year
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
              <DropdownMenuItem onClick={() => table.getColumn("type")?.setFilterValue("Both")}>Both</DropdownMenuItem>
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


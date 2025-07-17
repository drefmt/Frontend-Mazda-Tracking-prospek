import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Filter, MoveDown, MoveRight, MoveUp } from "lucide-react";

export function DataTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null); // State kategori


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // Function untuk mengubah filter kategori
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    table.getColumn("category")?.setFilterValue(category || undefined);
  };

  return (
    <>
    
      <div className="flex gap-4 pb-4 justify-between">
        <Link to="add">
          <Button className="bg-black hover:bg-black/90">Add Prospek</Button>
        </Link>

        <div className="pr-10 flex gap-4">
          {/* 🔽 Dropdown Filter Kategori */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>              
              <Button variant="outline"> <Filter width={18} />{selectedCategory || "Filter by Category"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleCategoryChange(null)}>All Categories</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange("Low")} className="flex items-center cursor-pointer">

                <MoveDown size={16} absoluteStrokeWidth className="pr-1" />
                Low

              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange("Medium")} className="flex items-center cursor-pointer">
                <MoveRight size={16} absoluteStrokeWidth className="pr-1" />
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange("Hot")} className="flex items-center cursor-pointer">
                <MoveUp size={16} absoluteStrokeWidth className="pr-1" />
                Hot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto" >
                <Filter width={18} />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Filter status */}
          <div className="items-center">
            <Input
              placeholder="Search By Name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />

          </div>
        </div>

      </div>
      {/* Looping Header from  column*/}
      <div className="rounded-md border-gray-300 dark:border-gray-800 border">
        <div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-b-gray-300 dark:border-b-gray-800 dark:bg-gray-900"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {/* Get All Data from API */}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="border-b border-gray-300 dark:border-b-gray-800"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="flex items-center justify-end space-x-2 py-4 px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </>
  );
}

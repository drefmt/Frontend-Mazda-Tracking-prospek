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
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Filter, MoveDown, MoveRight, MoveUp } from "lucide-react";
import { Prospek } from "@/interface/prospek.interface";
import { handleExportPDF } from "@/helpers/prospek/handleExportPdf";
import { handleExportExcel } from "@/helpers/prospek/handleReportExcel";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

import { Input } from "@/components/ui/input";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export function DataTable<TData extends Prospek, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  ); // State kategori

  const [selectedSales, setSelectedSales] = React.useState<string | null>(null);

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

  // Handle Filter Category
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    table.getColumn("category")?.setFilterValue(category || undefined);
  };
  // Handle Filter Sales
  const handleSalesChange = (salesName: string | null) => {
    setSelectedSales(salesName);
    table.getColumn("salesName")?.setFilterValue(salesName || undefined);
  };

  return (
    <>
  
      <div className="flex gap-4 pb-4 justify-end mx-auto">

        {/* Report pdf and excel */}
        <div className="flex gap-2 ">
            <Button variant="outline" onClick={() => handleExportPDF(data)}>
              Export PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportExcel(data)}
            >
              Export Excel
            </Button>
          </div>
        {/* Dropdown Filter Sales */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter width={18} />
              {selectedSales || "Filter by Sales"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleSalesChange(null)}
              className="cursor-pointer p-1"
            >
              All Sales
            </DropdownMenuItem>
            {Array.from(
              new Set(
                data.map((row) => row.salesId?.username).filter(Boolean) // hilangkan undefined/null
              )
            ).map((salesName) => (
              <DropdownMenuItem
                key={salesName}
                onClick={() => handleSalesChange(salesName ?? null)}
                className="cursor-pointer p-1"
              >
                {salesName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/*Dropdown Filter Kategori */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter width={18} />

              {selectedCategory || "Filter by Category"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleCategoryChange(null)}
              className="cursor-pointer"
            >
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCategoryChange("Low")}
              className="flex items-center cursor-pointer"
            >
              <MoveDown size={16} absoluteStrokeWidth className="pr-1" />
              Low
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCategoryChange("Medium")}
              className="flex items-center cursor-pointer"
            >
              <MoveRight size={16} absoluteStrokeWidth className="pr-1" />
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCategoryChange("Hot")}
              className="flex items-center cursor-pointer"
            >
              <MoveUp size={16} absoluteStrokeWidth className="pr-1" />
              Hot
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Input */}
        <div className="items-center">
          <Input
            placeholder="Search By name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      {/* Looping Header from  column*/}
      <div className="rounded-md border-gray-300 border p-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-b-gray-300"
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
                  className="border-b border-gray-300 text-center"
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
        <div className="flex items-center justify-end space-x-2 py-4">
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
    </>
  );
}

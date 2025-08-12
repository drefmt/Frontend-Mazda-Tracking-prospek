import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Activity } from "@/interface/activity.interface";

export const columns: ColumnDef<Activity>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    id: "salesName",
    header: "Sales Name",
    cell: ({ row }) => row.original.salesId?.username,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.date).toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
      );
      return <span>{formattedDate}</span>;
    },
  },

  {
    accessorKey: "activityType",
    header: "Activity Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isDone",
    header: "is Completed",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "notes",
    header: "notes",
  },
];

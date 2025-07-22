import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FeedbackReportItem } from "@/interface/feedback.interface";

export const columns: ColumnDef<FeedbackReportItem>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    header: "Sales Name",
    cell: ({ row }) => row.original.retailId.salesId.username,
  },
  {
    header: "Customer",
    cell: ({ row }) => row.original.retailId.spkId.prospekId.name,
  },

  {
    accessorKey: "expiredAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expired
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.expiredAt).toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );
      return <span>{formattedDate}</span>;
    },
  },
  {
    header: "Status",
    cell: ({ row }) => (row.original.used ? "Used" : "Unused"),
  },
  {
    header: "Rating",
    cell: ({ row }) => row.original.feedbackId.rating,
  },
  {
    header: "Message",
    cell: ({ row }) => row.original.feedbackId.message,
  },
];

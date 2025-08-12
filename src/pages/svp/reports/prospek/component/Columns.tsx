import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoveDown, MoveRight, MoveUp } from "lucide-react";

import { Prospek } from "@/interface/prospek.interface";
import { JSX } from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long", // pakai "short" atau "2-digit" juga bisa
    year: "numeric",
  });

export const columns: ColumnDef<Prospek>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorFn: (row) => row.salesId?.username ?? "-",
    id: "salesName",
    header: "Sales Name",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{formatDate(row.original.date)}</span>,
  },
  {
    accessorKey: "whatsappNum",
    header: "WhatsApp",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {
        Prospek: "border-cyan-600 text-cyan-600",
        TestDrive: "border-green-600 text-green-600",
        Retail: "border-yellow-600 text-yellow-600",
      };

      return (
        <span
          className={`px-1 rounded-sm border ${
            statusColors[status] || "border-gray-400 text-gray-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "carType",
    header: "Car Type",
  },
  {
    accessorKey: "scoreCategory",
    header: "Scor Category",
    cell: ({ row }) => {
      const category = row.original.scoreCategory;

      const statusIcon: Record<string, JSX.Element> = {
        Low: <MoveDown size={16} className="mr-2" />,
        Medium: <MoveRight size={16} className="mr-2" />,
        Hot: <MoveUp size={16} className="mr-2" />,
      };

      return (
        <span className="flex items-center">
          {statusIcon[category]}
          {category}
        </span>
      );
    },
  },
  {
    header: "Predicted Score",
    cell: ({ row }) => {
      const score = row.original.score;
      const category = row.original.scoreCategory;

      if (score === undefined || category === undefined) {
        return <span className="text-gray-400 italic">Belum diisi</span>;
      }

      const categoryColors: Record<string, string> = {
        Low: "bg-red-600",
        Medium: "bg-yellow-500",
        Hot: "bg-blue-600",
      };

      const barColor = categoryColors[category] || "bg-gray-300";

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-start gap-1">
                <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${barColor}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  Score: {score} / 100 ({category})
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Predicted Score: {score}</p>
              <p>Kategori: {category}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },

  {
    accessorKey: "followUpCount",
    header: "Follow-Ups",
    cell: ({ row }) => {
      const followUpCount = row.original.followUpCount;
      return <span>{followUpCount}</span>;
    },
  },
];

import { ColumnDef } from "@tanstack/react-table";
import { SalesPerformance } from "@/interface/salesPerformance.interface";

export const columns: ColumnDef<SalesPerformance>[] = [
  {
    accessorKey: "salesName",
    header: "Sales Name",
  },
  {
    accessorKey: "totalProspek",
    header: "Total Prospek",
  },
  {
    accessorKey: "totalTestDrive",
    header: "Total Test Drive",
  },
  {
    accessorKey: "totalSpk",
    header: "Total SPK",
  },
  {
    accessorKey: "totalRetail",
    header: "Total Retail",
  },
  {
    accessorKey: "konversiTestDrive",
    header: "Konversi Test Drive",
  },
  {
    accessorKey: "konversiSpk",
    header: "Konversi SPK",
  },
  {
    accessorKey: "konversiRetail",
    header: "Konversi Retail",
  },
];

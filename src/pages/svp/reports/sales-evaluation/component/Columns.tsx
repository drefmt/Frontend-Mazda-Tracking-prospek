import { ColumnDef } from "@tanstack/react-table";
import { Evaluation } from "@/interface/evaluation.interface";

export const columns: ColumnDef<Evaluation>[] = [
  {
    accessorKey: "month",
    header: "Bulan",
  },
  {
    accessorKey: "totalProspects",
    header: "Total Prospek",
  },
  {
    accessorKey: "totalTestDrives",
    header: "Total Test Drive",
  },
  {
    accessorKey: "totalSpks",
    header: "Total SPK",
  },
  {
    accessorKey: "totalRetails",
    header: "Total Retail",
  },
  {
    accessorKey: "testDriveConversion",
    header: "Konversi Test Drive",
  },
  {
    accessorKey: "spkConversion",
    header: "Konversi SPK",
  },
  {
    accessorKey: "retailConversion",
    header: "Konversi Retail",
  },
];

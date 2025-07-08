import { useState, useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchSalesPerformance } from "@/hooks/reports/useFetchSalesPerformance";
import { monthNames } from "@/lib/constant/monthName";

import { Select, SelectValue } from "@radix-ui/react-select";
import { Label } from "recharts";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SalesPerformance = () => {
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");

  const { data, isLoading, isError, refetch } = useFetchSalesPerformance(
    Number(month),
    Number(year)
  );

  const report = data;
  const monthNum = report?.month ?? "-";
  const yearNum = report?.year ?? "-";
  const salesPerformance = report?.data ?? [];

  const handleFetch = () => {
    if (!month || !year) return;
    refetch();
  };

  const columns = useMemo(() => defaultColumns, []);

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card className="px-4">
        <div className="space-y-1">
          <h1 className="text-2xl text-slate-800 tracking-tight">
            Laporan Sales Performance
          </h1>
          <p className="text-muted-foreground text-sm text-slate-600">
            Menampilkan daftar Performa Sales yang masuk dan status tindak lanjut
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          {/* Filter Bulan */}
          <div className="flex flex-col space-y-1">
            <Label>Bulan</Label>
            <Select
              value={month?.toString() || ""}
              onValueChange={(value) => {
                setMonth(Number(value));
              }}
            >
              <SelectTrigger id="bulan" className="w-[150px]">
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <SelectItem key={m} value={m.toString()}>
                    {monthNames[m - 1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Input Tahun */}
          <div className="flex flex-col space-y-1">
            <Label>Tahun</Label>
            <Input
              id="tahun"
              type="number"
              placeholder="misal: 2025"
              className="w-[150px]"
              value={year}
              onChange={(e) => {
                const inputValue = e.target.value;
                setYear(inputValue === "" ? "" : Number(inputValue));
              }}
            />
          </div>

          {/* Tombol Tampilkan */}
          <div className="mt-4">
            <Button onClick={handleFetch}>Tampilkan</Button>
          </div>
        </div>
      </Card>
      {monthNum && (
        <h1 className="text-xl font-semibold text-slate-700">
          Periode: {monthNum}
        </h1>
      )}
      {yearNum && (
        <h1 className="text-xl font-semibold text-slate-700">
          Tahun: {yearNum}
        </h1>
      )}

      {/* Status */}
      {isLoading && <p>Memuat data...</p>}
      {SalesPerformance?.length === 0 && (
        <p className="text-muted-foreground">
          Tidak ada data untuk bulan dan tahun ini.
        </p>
      )}
      {isError && (
        <p className="text-red-500">Terjadi kesalahan saat mengambil data</p>
      )}
      {salesPerformance.length > 0 && (
        <DataTable columns={columns} data={salesPerformance} />
      )}
    </div>
  );
};

export default SalesPerformance;

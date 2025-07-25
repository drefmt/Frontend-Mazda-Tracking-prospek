import { useState, useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchProspekReport } from "@/hooks/reports/useFetchProspekReport";
import { monthNames } from "@/lib/constant/monthName";
import { handleExportPDF } from "@/helpers/prospek/handleExportPdf";
import { handleExportExcel } from "@/helpers/prospek/handleReportExcel";

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

const SalesProspekReport = () => {
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [triggerFetch, setTriggerFetch] = useState(false);

  const isReady = !!month && !!year && triggerFetch;

  const { data, isLoading, isError } = useFetchProspekReport(
    Number(month),
    Number(year),
    isReady
  );

  const report = data;
  const prospekData = report?.data;

  const handleFetch = () => {
    if (!month || !year) return;
    setTriggerFetch(true);
  };

  const columns = useMemo(() => defaultColumns, []);

  const safeData = (prospekData || []).map((prospek) => ({
    ...prospek,
    salesId: prospek.salesId ?? { id: "unknown", username: "-" },
  }));

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card className="px-4">
        <div className="space-y-1">
          <h1 className="text-2xl text-slate-800 tracking-tight">
            Laporan Prospek
          </h1>
          <p className="text-muted-foreground text-sm text-slate-600">
            Menampilkan daftar prospek yang masuk dan status tindak lanjut
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
                setTriggerFetch(false);
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
                setYear(Number(e.target.value));
                setTriggerFetch(false);
              }}
            />
          </div>

          {/* Tombol Tampilkan */}
          <div className="mt-4">
            <Button onClick={handleFetch}>Tampilkan</Button>
          </div>
        <Button variant="outline"  onClick={() => report && handleExportPDF(report)}disabled={!report}>
          Export PDF
        </Button>
        <Button variant="outline" onClick={() => report && handleExportExcel(report)}disabled={!report}>
          Export Excel
        </Button>
        </div>
      </Card>

      {/* Status */}
      {isLoading && <p>Memuat data...</p>}
      {prospekData && prospekData.length === 0 && (
        <p className="text-muted-foreground">
          Tidak ada data untuk bulan dan tahun ini.
        </p>
      )}

      {isError && (
        <p className="text-red-500">Terjadi kesalahan saat mengambil data</p>
      )}
      {prospekData && prospekData.length > 0 && (
        <DataTable columns={columns} data={safeData} />
      )}
    </div>
  );
};

export default SalesProspekReport;

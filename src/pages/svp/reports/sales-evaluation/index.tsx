import { useState, useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchSalesEvaluation } from "@/hooks/reports/useFetchEvaluationReport";

import { Label } from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SalesEvaluation = () => {
  const [year, setYear] = useState<number | "">("");
  

  const { data, isLoading, isError, refetch } = useFetchSalesEvaluation(Number(year));

  const report = data;
  const heading = report?.period ?? "-";
  const evaluations = report?.data ?? [];

  const handleFetch = () => {
    if (!year) return;  
      console.log("handleFetch triggered");
      refetch()
  };

  const columns = useMemo(() => defaultColumns, []);


  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card className="px-4">
        <div className="space-y-1">
          <h1 className="text-2xl text-slate-800 tracking-tight">
            Laporan Retail
          </h1>
          <p className="text-muted-foreground text-sm text-slate-600">
            Menampilkan daftar prospek yang masuk dan status tindak lanjut
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-4">
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
                setYear(inputValue === "" ? "" : Number(inputValue));}}
            />
          </div>

          {/* Tombol Tampilkan */}
          <div className="mt-4">
            <Button onClick={handleFetch}>Tampilkan</Button>
          </div>
        </div>
      </Card>

      {heading && (
        <h1 className="text-xl font-semibold text-slate-700">
          Periode: {heading}
        </h1>
      )}
      {/* Status */}
      {isLoading && <p>Memuat data...</p>}
      {evaluations?.length === 0 && (
        <p className="text-muted-foreground">
          Tidak ada data untuk  tahun ini.
        </p>
      )}
      {isError && (
        <p className="text-red-500">Terjadi kesalahan saat mengambil data</p>
      )}
      {evaluations.length > 0 && (
        <DataTable columns={columns} data={evaluations} />
      )}
    </div>
  );
};

export default SalesEvaluation;

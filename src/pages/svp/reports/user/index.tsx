import {  useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchUserListReport } from "@/hooks/reports/useFetchUserReport"


import { Card } from "@/components/ui/card";

const UserListReport = () => {

  const { data, isLoading, isError } = useFetchUserListReport();

  const columns = useMemo(() => defaultColumns, []);


  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card className="px-4">
        <div className="space-y-1">
          <h1 className="text-2xl text-slate-800 tracking-tight">
            Report User
          </h1>
          <p className="text-muted-foreground text-sm text-slate-600">
            Menampilkan daftar User
          </p>
        </div>
        </Card>
      {/* Status */}
      {isLoading && <p>Memuat data...</p>}
      {data && data.length === 0 && (
        <p className="text-muted-foreground">
          Tidak ada data untuk bulan dan tahun ini.
        </p>
      )}
      {isError && (
        <p className="text-red-500">Terjadi kesalahan saat mengambil data</p>
      )}
      {data && data.length > 0 && (
        <DataTable columns={columns} data={data} />
      )}
    </div>
    // </div>
    // </div>
  );

  
};
export default UserListReport;


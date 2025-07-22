import {  useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchUserListReport } from "@/hooks/reports/useFetchUserReport"


import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleExportPDF } from "@/helpers/user/handleExportPdf";
import { Link } from "react-router-dom";

const UserListReport = () => {

  const { data, isLoading, isError } = useFetchUserListReport();

  const columns = useMemo(() => defaultColumns, []);

  const report = data;
  const dataUsers = report?.data;
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
          <Button
            variant="outline"
            onClick={() => report && handleExportPDF(report)}
            disabled={!report}
            className="mr-4"
          >
            Export PDF
          </Button>
          <Link to="add">
          <Button
            variant="default"
            
            >
            Add User
          </Button>
            </Link>
        </div>
        </Card>
      {/* Status */}
      {isLoading && <p>Memuat data...</p>}
      {dataUsers && dataUsers.length === 0 && (
        <p className="text-muted-foreground">
          Tidak ada data untuk bulan dan tahun ini.
        </p>
      )}
      {isError && (
        <p className="text-red-500">Terjadi kesalahan saat mengambil data</p>
      )}
      {dataUsers && dataUsers.length > 0 && (
        <DataTable columns={columns} data={dataUsers} />
      )}
    </div>
    // </div>
    // </div>
  );

  
};
export default UserListReport;


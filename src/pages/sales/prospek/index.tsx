
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useDeleteProspek } from "@/hooks/prospek/useDeleteProspek";
import { useCallback, useMemo } from "react";

const SalesProspek = () => {
  const { data: dataProspek, isLoading, isError } = useFetchProspek();
  const { mutate: deleteProspek } = useDeleteProspek();

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus prospek ini?")) {
        deleteProspek(id);
      }
    },
    [deleteProspek] 
  );

  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

  if (isLoading) {
    return <p>Loading data...</p>;
  }
  
  if (isError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dataProspek || []} />
    </div>
  );
};

export default SalesProspek;

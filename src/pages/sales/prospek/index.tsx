import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useDeleteProspek } from "@/hooks/prospek/useDeleteProspek";
import { useCallback, useMemo } from "react";
import { confirmDelete } from "@/components/ConfirmDelete";
import { Skeletons } from "@/components/Skeletons";


const SalesProspek = () => {
  const { data: dataProspek, isLoading, isError } = useFetchProspek();
  const { mutate: deleteProspek } = useDeleteProspek();

  const handleDelete = useCallback(
    (id: string) => {
   
      confirmDelete(() => {
        deleteProspek(id)
      })
    },
    [deleteProspek],
  );


  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

 if (isLoading) {
    return <Skeletons.Prospek/>
  }

  if (isError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10 dark:text-white">
      <DataTable columns={columns} data={dataProspek || []} />
    </div>
  );
};

export default SalesProspek;

import { useCallback, useMemo } from "react";
import { useDeleteRetail } from "@/hooks/retail/useDeleteRetail";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchRetail } from "@/hooks/retail/useFetchRetail";
import { Skeletons } from "@/components/Skeletons";
import { confirmDelete } from"@/components/ConfirmDelete"


const SalesRetail = () => {
  const {
    data: dataRetail,
    isLoading: retailIsLoading,
    isError: retailIsError,
  } = useFetchRetail();
  const { mutate: deleteRetail } = useDeleteRetail();

  const handleDelete = useCallback(
    (id: string) => {
      confirmDelete(() => {
        deleteRetail(id);
      })
    },
    [deleteRetail],
  );

  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

  if (retailIsLoading) {
    return <Skeletons.Spk/>;
  }

  if (retailIsError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10 dark:text-white">
      <DataTable columns={columns} data={dataRetail || []} />
    </div>
  );
};
export default SalesRetail;

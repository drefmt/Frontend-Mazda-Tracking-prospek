import { useCallback, useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { useFetchTestDrive } from "@/hooks/testDrive/useFetchTestDrive";
import { DataTable } from "./component/Data-table";
import { useDeleteTestDrive } from "@/hooks/testDrive/useDeleteTestDrive";

const SalesTestDrive = () => {
  const { data: dataTestDrive, isLoading: testDriveIsLoading, isError: testDriveIsError } = useFetchTestDrive();
  const { mutate: deleteTestDrive } = useDeleteTestDrive();

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus prospek ini?")) {
        deleteTestDrive(id);
      }
    },
    [deleteTestDrive]
  );

  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

  if (testDriveIsLoading) {
    return <p>Loading Data</p>;
  }

  if (testDriveIsError) {
    return <p>Terjadi kesalahan saat mengambil data...</p>;
  }

  return (
    <div className="container py-10">
      <DataTable columns={columns} data={dataTestDrive || []} />
    </div>
  );
};

export default SalesTestDrive;

import { useCallback, useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { useFetchTestDrive } from "@/hooks/testDrive/useFetchTestDrive";
import { DataTable } from "./component/Data-table";
import { useDeleteTestDrive } from "@/hooks/testDrive/useDeleteTestDrive";
import { confirmDelete } from "@/components/ConfirmDelete";
import { Skeletons } from "@/components/Skeletons";


const SalesTestDrive = () => {
  const {
    data: dataTestDrive,
    isLoading: testDriveIsLoading,
    isError: testDriveIsError,
  } = useFetchTestDrive();
  const { mutate: deleteTestDrive } = useDeleteTestDrive();

  const handleDelete = useCallback(
    (id: string) => {
      confirmDelete(() => {
        deleteTestDrive(id);
      })
    },
    [deleteTestDrive],
  );
  

  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

  if (testDriveIsLoading) {
    return <Skeletons.TestDrive/>
  }

  if (testDriveIsError) {
    return <p>Terjadi kesalahan saat mengambil data...</p>;
  }

  return (
    <div className="container py-10 dark:text-white">
      <DataTable columns={columns} data={dataTestDrive || []} />
    </div>
  );
};

export default SalesTestDrive;

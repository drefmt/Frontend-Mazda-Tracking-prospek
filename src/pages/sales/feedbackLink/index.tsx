// import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useDeleteFeedbackLink } from "@/hooks/feedbackLink/useDeleteFeedbackLink";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchFeedbackLink } from "@/hooks/feedbackLink/useFetchFeedbackLink";
import { useCallback, useMemo } from "react";
import { Skeletons } from "@/components/Skeletons";
import { confirmDelete } from "@/components/ConfirmDelete";




const FeedbackLink = () => {
  const { data: feedbackLinkData, isLoading, isError } = useFetchFeedbackLink();
  const { mutate: deleteFeedbackLink } = useDeleteFeedbackLink();

  const handleDelete = useCallback(
    (id: string) => {
      confirmDelete(() => {
        deleteFeedbackLink(id);
      })
    },
    [deleteFeedbackLink],
  );

  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

  if (isLoading) {
    return <Skeletons.Feedback/>;
  }

  if (isError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10 dark:text-white">
      <DataTable columns={columns} data={feedbackLinkData || []} />
    </div>
  );
};

export default FeedbackLink;

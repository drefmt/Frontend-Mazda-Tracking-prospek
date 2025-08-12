import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useFetchAvailableForSpk } from "@/hooks/prospek/useAvailableForSpk";

export const useProspekForSpk = (isEditMode: boolean) => {
  // Panggil dua hook ini SELALU, supaya tidak melanggar aturan hooks
  const allProspek = useFetchProspek();
  const availableProspek = useFetchAvailableForSpk();

  // Pilih data & loading sesuai mode
  return {
    prospekData: isEditMode ? allProspek.data : availableProspek.data,
    loadingProspek: isEditMode
      ? allProspek.isLoading
      : availableProspek.isLoading,
  };
};

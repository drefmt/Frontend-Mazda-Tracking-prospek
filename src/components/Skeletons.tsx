import { Skeleton } from "@/components/ui/skeleton";

export const Skeletons = {
  Prospek: () => (
    <div className="container mx-auto py-10">
      {/* Tombol dan filter */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-32" /> {/* Tombol Add Prospek */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-40" /> {/* Filter by Category */}
          <Skeleton className="h-10 w-28" /> {/* Columns */}
          <Skeleton className="h-10 w-56" /> {/* Search */}
        </div>
      </div>

      {/* Header tabel */}
      <Skeleton className="h-12 w-full mb-2" />

      {/* Body tabel */}
      <Skeleton className="h-[400px] w-full" />
    </div>
  ),

  TestDrive: () => (
    <div className="container mx-auto py-10">
      {/* Tombol dan filter */}
      <div className="flex items-center mb-4 gp-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Header tabel */}
      <Skeleton className="h-12 w-full mb-2" />

      {/* Body tabel */}
      <Skeleton className="h-[400px] w-full" />
    </div>
  ),

  Spk: () => (
    <div className="container mx-auto py-10">
      {/* Tombol dan filter */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-32" /> {/* Tombol Add Prospek */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28" /> {/* Columns */}
          <Skeleton className="h-10 w-56" /> {/* Search */}
        </div>
      </div>

      {/* Header tabel */}
      <Skeleton className="h-12 w-full mb-2" />

      {/* Body tabel */}
      <Skeleton className="h-[400px] w-full" />
    </div>
  ),

  Activity: () => (
    <div className="container mx-auto py-10">
      {/* Tombol dan filter */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-28" /> {/* Tombol Add Prospek */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 mr-12" /> {/* Columns */}
        </div>
      </div>

      {/* Header tabel */}
      <Skeleton className="h-12 w-full mb-2" />

      {/* Body tabel */}
      <Skeleton className="h-[400px] w-full" />
    </div>
  ),

  Dashboard: () => (
    <div className="container mx-auto py-10">
      {/* Card*/}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-[123px] w-[393px]" /> {/* Tombol Add Prospek */}
        <Skeleton className="h-[123px] w-[393px]" /> {/* Columns */}
        <Skeleton className="h-[123px] w-[393px]" /> {/* Columns */}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-[123px] w-[393px]" /> {/* Tombol Add Prospek */}
        <Skeleton className="h-[123px] w-[393px]" /> {/* Columns */}
        <Skeleton className="h-[123px] w-[393px]" /> {/* Columns */}
      </div>
      {/* Body tabel */}
      <Skeleton className="h-[400px] w-full" />
    </div>
  ),
  Feedback: () => (
    <div className="container mx-auto py-10">
      {/* Tombol dan filter */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-32" /> {/* Tombol Add Prospek */}
        <div className="flex gap-2 mr-10">
          <Skeleton className="h-10 w-28" /> {/* Columns */}
          <Skeleton className="h-10 w-28" /> {/* Columns */}
        </div>
      </div>

      {/* Header tabel */}
      <Skeleton className="h-12 w-full mb-2" />

      {/* Body tabel */}
      <Skeleton className="h-[400px] w-full" />
    </div>
  ),
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/feedback/GenerateFeedbackLinkForm.tsx
import { useFormik } from "formik";
import { useGenerateFeedbackLink } from "@/hooks/feedbackLink/useGenerateFeedbackLink";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useFetchRetail } from "@/hooks/retail/useFetchRetail";
import { Card } from "@/components/ui/card";

const GenerateFeedbackLinkForm = () => {
  const { mutateAsync, isPending } = useGenerateFeedbackLink();
  const { data: retailOptions, isLoading } = useFetchRetail();
  const [link, setLink] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      retailId: "",
    },
    onSubmit: async (values) => {
      try {
        // ✅ kirim object, bukan string
        const res = await mutateAsync({ retailId: values.retailId });
        const generatedLink = `${window.location.origin}/feedback/${res.token}`;
        setLink(generatedLink);
      } catch (error) {
        console.error("Gagal generate link:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md">
      <Card className="p-4 mt-10">
        <div>
          <Label htmlFor="retailId">Pilih Retail</Label>
          <select
            id="retailId"
            name="retailId"
            value={formik.values.retailId}
            onChange={formik.handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="" disabled>
              {isLoading ? "Memuat..." : "Pilih pelanggan atau mobil..."}
            </option>
            {retailOptions?.map((retail: any) => (
              <option key={retail.id} value={retail.id}>
                {retail.spkId?.prospekId?.name ?? "Tanpa Nama"} -{" "}
                {retail.carType}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" disabled={isPending || !formik.values.retailId}>
          {isPending ? "Membuat..." : "Buat Link Feedback"}
        </Button>

        {link && (
          <div className="mt-4 space-y-2">
            <Label>Link Feedback:</Label>
            <div className="flex items-center gap-2">
              <Input value={link} readOnly className="flex-1" />
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(link)}
              >
                Salin
              </Button>
            </div>
          </div>
        )}
      </Card>
    </form>
  );
};

export default GenerateFeedbackLinkForm;

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
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const GenerateFeedbackLinkForm = () => {
  const { mutateAsync } = useGenerateFeedbackLink();
  const { data: retailOptions, isLoading } = useFetchRetail();
  const [link, setLink] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      retailId: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await mutateAsync({ retailId: values.retailId });
        const generatedLink = `${window.location.origin}/feedback/${res.token}`;
        setLink(generatedLink);
        toast.success("Berhasil membuat link feedback");
      } catch (error) {
        console.error("Gagal generate link:", error);
        toast.error("Gagal membuat link feedback");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md w-ful">
      <Card className="p-4 mt-10 w-full">
        <Link to="/sales/feedback-link">
        <Button variant="outline" className="w-20">Back</Button>
        </Link>
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

        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Membuat..." : "Buat Link Feedback"}
        </Button>

        {link && (
          <div className="mt-4 space-y-2">
            <Label>Link Feedback:</Label>
            <div className="flex items-center gap-2">
              <Input value={link} readOnly className="flex-1" />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  navigator.clipboard
                    .writeText(link)
                    .then(() => {
                      toast.success("Link berhasil disalin!");
                    })
                    .catch(() => {
                      toast.error("Gagal menyalin link.");
                    });
                }}
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

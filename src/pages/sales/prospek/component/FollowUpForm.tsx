/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCreateFollowUp } from "@/hooks/follow-up/useCreateFollowUp";
import { useEditFollowUp } from "@/hooks/follow-up/useEditFollowUp";
import { useFetchFollowUpById } from "@/hooks/follow-up/useFetchFollowUpById";
import { Interaction } from "@/types/interaction.type";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FollowUpFormValues {
  followUpDate: string;
  salesProces: string;
  interaction: Interaction;
  note: string;
  customerResponse: string;
  recommendation: string;
}

const FollowUpSchema = Yup.object().shape({
  followUpDate: Yup.string().required("Tanggal wajib diisi"),
  salesProces: Yup.string().required("Sales Proses wajib diisi"),
  interaction: Yup.string().required("interaksi wajib di isi"),
  note: Yup.string(),
  customerResponse: Yup.string().required("Respon customer wajib diisi"),
});

const FollowUpForm = () => {
  const { id, followUpId } = useParams<{ id: string; followUpId: string }>();
  const prospekId = id || "";
  const { data: followUpData } = useFetchFollowUpById(prospekId, followUpId);

  const isEditMode = Boolean(followUpId);

  const createMutation = useCreateFollowUp();
  const updateMutation = useEditFollowUp();

  const formik = useFormik<FollowUpFormValues>({
    initialValues: {
      followUpDate: "",
      salesProces: "",
      interaction: "Telepon",
      note: "",
      customerResponse: "",
      recommendation: "",
    },
    validationSchema: FollowUpSchema,
    onSubmit: async (values) => {
      if (!prospekId) {
        console.error("ID SPK tidak ditemukan");
        toast.error("Prospect ID is missing");
        return;
      }
      try {
        if (followUpId) {
          await updateMutation.mutateAsync({
            prospekId,
            followUpId,
            followUp: values,
          });
        } else {
          await createMutation.mutateAsync({ id: prospekId, followUp: values });
        }
        formik.resetForm();
        toast.success(followUpId ? "Follow-up Updated successfully!" : "Follow-up Created Succesfully");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message || "Failed to submit follow-up.";

          // Tampilkan pesan custom jika error spesifik
          if (
            error.response?.data?.error?.includes("Retail") &&
            errorMessage.includes("validation failed")
          ) {
            toast.error(
              "This prospect has already been marked as Retail. No more follow-ups needed."
            );
          } else {
            toast.error("Failed to submit follow-up. Please try again.");
          }

          console.error("Follow-up error:", errorMessage);
        } else {
          toast.error("Unexpected error occurred.");
        }

      }
    },
  });

  useEffect(() => {
    if (followUpId && followUpData) {
      formik.setValues({
        followUpDate: followUpData.followUpDate
          ? followUpData.followUpDate.split("T")[0]
          : "",
        salesProces: followUpData.salesProces || "",
        interaction: followUpData.interaction || "",
        note: followUpData.note || "",
        customerResponse: followUpData.customerResponse || "",
        recommendation: followUpData.recommendation || "",
      });
    }
  }, [followUpData, followUpId]);

  return (
    <form
      className="space-y-4 p-4 dark:text-white"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <h1 className="text-lg font-semibold">
          {isEditMode ? "Edit" : "Tambah"} Follow-Up
        </h1>
        <p className="text-gray-500 pb-4">Isi form berikut sesuai kebutuhan.</p>
        <Link to={`/sales/prospek/detail/${prospekId}`}>
          <button
            type="button"
            className="py-1 px-4 border border-black text-black rounded-md"
          >
            Kembali
          </button>
        </Link>
      </div>

      <hr className="border-gray-300" />

      <label className="text-lg">Tanggal Follow-Up</label>
      <Input
        type="date"
        name="followUpDate"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.followUpDate}
      />
      {formik.touched.followUpDate && formik.errors.followUpDate && (
        <p className="text-red-500">{formik.errors.followUpDate}</p>
      )}

      <label className="text-lg">Sales Proses</label>
      <Input
        type="text"
        name="salesProces"
        placeholder="Masukkan Sales Proses"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.salesProces}
      />
      {formik.touched.salesProces && formik.errors.salesProces && (
        <p className="text-red-500">{formik.errors.salesProces}</p>
      )}

      <label className="text-lg" htmlFor="interaction">
        Interaksi
      </label>
      <select
        name="interaction"
        id="interaction"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.interaction}
        defaultValue={formik.values.interaction}
        className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
      >
        <option value="Telepon">Telepon</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Email">Email</option>
        <option value="Kunjungan">Kunjungan</option>
        <option value="Lainnya">Lainnya</option>
      </select>

      <label htmlFor="note">Catatan</label>
      <Textarea
        name="note"
        id="note"
        placeholder="Catatan..."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.note}
      />
      <label className="text-lg">Respon Customer</label>
      <Textarea
        name="customerResponse"
        placeholder="Masukkan respon customer"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.customerResponse}
      />
      {formik.touched.customerResponse && formik.errors.customerResponse && (
        <p className="text-red-500">{formik.errors.customerResponse}</p>
      )}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="py-1 w-full border-2 bg-black border-black text-white rounded-md hover:bg-black/90 transition duration-150"
      >
        {formik.isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default FollowUpForm;

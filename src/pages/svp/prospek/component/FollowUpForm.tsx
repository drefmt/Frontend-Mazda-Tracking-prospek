/* eslint-disable react-hooks/exhaustive-deps */
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCreateFollowUp } from "@/hooks/follow-up/useCreateFollowUp";
import { useEditFollowUp } from "@/hooks/follow-up/useEditFollowUp";
import { useFetchFollowUpById } from "@/hooks/follow-up/useFetchFollowUpById";
import { Interaction } from "@/types/interaction.type";
import toast from "react-hot-toast";



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
  recommendation: Yup.string().required("Rekomendasi Prospek wajib diisi"),
});

const FollowUpForm = () => {
  const { id, followUpId } = useParams<{ id: string; followUpId: string }>();
  const prospekId = id || ""; 
  const { data: followUpData } = useFetchFollowUpById(prospekId, followUpId);


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
        return;
      }
      try {
        if (followUpId) {
          await updateMutation.mutateAsync({ prospekId, followUpId, followUp: values });
        } else {
          await createMutation.mutateAsync({ id: prospekId, followUp: values });
        }
        toast.success('Berhasil Memberi Rekomendasi Kepada Sales')
      } catch (error) {
        console.error("Failed to submit follow-up:", error);
        toast.success('Failed to submit follow-up')
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
    <form className="space-y-4 p-4" onSubmit={formik.handleSubmit}>
      <div>
        <h1 className="text-lg font-semibold">Rekomendation Follow-Up</h1>
        <p className="text-gray-500 pb-4">Isi form berikut sesuai kebutuhan.</p>
        <Link to={`/svp/prospek/detail/${prospekId}`}>
          <button type="button" className="py-1 px-4 border border-black text-black rounded-md">
            Kembali
          </button>
        </Link>
      </div>
      <hr className="border-gray-300" />
      <label className="text-lg">Rekomendasi Dari Manager/SPV</label>
      <Textarea
        name="recommendation"
        placeholder="Masukkan rekomendasi"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.recommendation}
      />
      {formik.touched.recommendation && formik.errors.recommendation && (
        <p className="text-red-500">{formik.errors.recommendation}</p>
      )}

      <button
        type="submit"
        className="py-1 w-full bg-black text-white rounded-md disabled:opacity-50"
       
      >
        Submit
      </button>
    </form>
  );
};

export default FollowUpForm;

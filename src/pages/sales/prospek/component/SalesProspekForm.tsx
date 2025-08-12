import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { X } from "lucide-react";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";

// ********** Hook **********
import { useFormik } from "formik";
import { useCreateProspek } from "@/hooks/prospek/useCreateProspek";
import { useEditProspek } from "@/hooks/prospek/useEditProspek";
import { useFetchProspekById } from "@/hooks/prospek/useFetchProspekById";
import React, { useState } from "react";

import { Card } from "@/components/ui/card";
import { ProspekFormValue } from "@/interface/prospek.interface";
import { NumericFormat } from "react-number-format";
import toast from "react-hot-toast";

// ********** Validation Schema **********
const prospekValidationSchema = yup.object({
  name: yup.string().required("Nama Prospek Wajib di isi").min(3),
  date: yup.string().required("Tanggal Wajib Di isi"),
  whatsappNum: yup.string().required("Whatshapp Wajib Di isi"),
  address: yup.string().required("Alamat wajib di isi").min(5),
  source: yup.string(),
  status: yup.string().required("Status wajib di isi"),
  carType: yup.string().required("Tipe Mobil Wajib Di Isi"),
});

const SalesProspekForm = () => {
  // ********** Hook Data Fetching **********
  const { id } = useParams<{ id: string }>();
  const [minatInput, setMinatInput] = useState("");
  const { data: prospekData } = useFetchProspekById(id);
  const createProspek = useCreateProspek();
  const editProspek = useEditProspek();
  const isEditMode = Boolean(id);

  // ********** Initial Value **********
  const prospekInitialValues = React.useMemo(() => {
    if (isEditMode && prospekData) {
      return {
        name: prospekData?.name ?? "",
        date: prospekData?.date
          ? format(new Date(prospekData?.date), "yyyy-MM-dd")
          : "",
        whatsappNum: prospekData?.whatsappNum ?? "",
        address: prospekData?.address ?? "",
        source: prospekData?.source ?? "",
        status: prospekData?.status ?? "Prospek",
        carType: prospekData?.carType ?? "",

        demografi: {
          usia: prospekData?.demografi?.usia ?? 0,
          pekerjaan: prospekData?.demografi?.pekerjaan ?? "",
          penghasilan: prospekData?.demografi?.penghasilan ?? 0,
        },
        psikografis: {
          minat: Array.isArray(prospekData?.psikografis?.minat)
            ? prospekData?.psikografis.minat
            : [],
          gayaHidup: prospekData?.psikografis?.gayaHidup ?? "",
          motivasi: prospekData?.psikografis?.motivasi ?? "",
        },
        perilaku: {
          frekuensiKontak: prospekData?.perilaku?.frekuensiKontak || 0,
          responAwal: prospekData?.perilaku?.responAwal ?? "",
          interaksiFavorit: prospekData?.perilaku?.interaksiFavorit ?? "",
        },
        lingkungan: {
          sumber: prospekData?.lingkungan?.sumber ?? "",
        },
      };
    }

    return {
      name: "",
      date: "",
      whatsappNum: "",
      address: "",
      source: "",
      status: "Prospek",
      carType: "",

      demografi: {
        usia: 0,
        pekerjaan: "",
        penghasilan: 0,
      },
      psikografis: {
        minat: [],
        gayaHidup: "",
        motivasi: "",
      },
      perilaku: {
        frekuensiKontak: 0,
        responAwal: "Biasa",
        interaksiFavorit: "",
      },
      lingkungan: {
        sumber: "",
      },
    };
  }, [isEditMode, prospekData]);

  // ********** Use Formik **********
  const formik = useFormik<ProspekFormValue>({
    initialValues: prospekInitialValues,
    validationSchema: prospekValidationSchema,
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await editProspek.mutateAsync({ id, prospekData: values });
        } else {
          await createProspek.mutateAsync(values);
        }
        resetForm();
        toast.success(
          id ? "Prospek berhasil diperbarui." : "Prospek berhasil ditambahkan"
        );
      } catch (error) {
        console.error("Failed to submit prospek:", error);
        toast.error("Terjadi kesalahan saat mengirim prospek.");
      }
    },
  });

  // ********** Add interest Function **********
  const addMinat = () => {
    if (
      minatInput.trim() &&
      !formik.values.psikografis.minat.includes(minatInput.trim())
    ) {
      formik.setFieldValue("psikografis.minat", [
        ...formik.values.psikografis.minat,
        minatInput.trim(),
      ]);
      setMinatInput("");
    }
  };

  // ********** Remove interest funtion **********
  const removeMinat = (index: number) => {
    const newMinat = [...formik.values.psikografis.minat];
    newMinat.splice(index, 1);
    formik.setFieldValue("psikografis.minat", newMinat);
  };

  return (
    <div>
      <form className="h-full justify-between" onSubmit={formik.handleSubmit}>
        <Card className="p-5 my-4">
          <h1 className="text-3xl">
            {id ? "Edit Prospek" : "Add New Prospek"}
          </h1>
          <div className="flex justify-between">
            <Link to="/sales/prospek">
              <Button variant="ghost" className="border border-gray-300">
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-black hover:bg-black/90"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </div>
          <div className="flex-grow">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="flex-col">
            <Label htmlFor="date">Date</Label>
            <div className="w-full">
              <Input
                type="date"
                id="date"
                value={formik.values.date}
                onChange={formik.handleChange}
              />
              {formik.touched.date && formik.errors.date && (
                <p className="text-red-500">{formik.errors.date}</p>
              )}
            </div>
          </div>
          <div className="flex-grow">
            <Label htmlFor="whatsappNum">WhatsApp Number</Label>
            <Input
              type="text"
              id="whatsappNum"
              placeholder="WhatsApp Number"
              className="w-full"
              value={formik.values.whatsappNum}
              onChange={formik.handleChange}
            />
            {formik.touched.whatsappNum && formik.errors.whatsappNum && (
              <p className="text-red-500">{formik.errors.whatsappNum}</p>
            )}
          </div>
          <div className="flex-grow">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              placeholder="Address"
              className="w-full"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500">{formik.errors.address}</p>
            )}
          </div>
          <div className="flex-grow">
            <Label htmlFor="source">Source</Label>
            <Input
              type="text"
              id="source"
              placeholder="Source"
              className="w-full"
              value={formik.values.source}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex-grow">
            <Label htmlFor="status">Status</Label>
            <select
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              defaultValue={formik.values.status}
              className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
            >
              <option value="Prospek">Prospek</option>
              <option value="Test-Drive">Test Drive</option>
              <option value="SPK">SPK</option>
              <option value="Retail">Retail</option>
              {formik.touched.status && formik.errors.status && (
                <p className="text-red-500">{formik.errors.status}</p>
              )}
            </select>
          </div>
          <div className="flex-grow">
            <Label htmlFor="carType">Car Type</Label>
            <Input
              type="text"
              id="carType"
              placeholder="Car Type"
              className="w-full"
              value={formik.values.carType}
              onChange={formik.handleChange}
            />
            {formik.touched.carType && formik.errors.carType && (
              <p className="text-red-500">{formik.errors.carType}</p>
            )}
          </div>
        </Card>
        {/* ********** PREDICT SCORE ********** */}
        <Card className="p-4">
          <h1 className="text-2xl">Predict Score</h1>
          <div>
            {/* === Input Usia === */}
            <div className="space-y-2">
              <label htmlFor="demografi.usia" className="text-sm font-medium">
                Usia
              </label>
              <Input
                type="number"
                id="demografi.usia"
                name="demografi.usia"
                value={formik.values.demografi.usia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div>
            <div className="py-2">
              <label htmlFor="demografi.usia" className="text-sm font-medium">
                Usia
              </label>
              <Input
                type="number"
                id="demografi.usia"
                name="demografi.usia"
                value={formik.values.demografi.usia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="py-2">
              <label
                htmlFor="demografi.pekerjaan"
                className="text-sm font-medium"
              />
              Pekerjaan
              <select
                className="w-full py-1 border border-gray-300 dark:border-gray-800 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
                name="demografi.pekerjaan"
                id="demografi.pekerjaan"
                onChange={formik.handleChange}
                value={formik.values.demografi.pekerjaan}
                defaultValue={formik.values.demografi.pekerjaan}
              >
                <option value="">Pekerjaan</option>
                <option value="pengusaha">Pengusaha</option>
                <option value="PNS">PNS</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="py-2">
              <label
                htmlFor="demografi.penghasilan"
                className="text-sm font-medium"
              >
                Penghasilan
              </label>
              <NumericFormat
                id="demografi.penghasilan"
                name="demografi.penghasilan"
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
                allowNegative={false}
                customInput={Input} // dari ShadCN
                value={formik.values.demografi.penghasilan}
                onValueChange={(values) => {
                  formik.setFieldValue(
                    "demografi.penghasilan",
                    values.floatValue || 0
                  );
                }}
              />
            </div>
          </div>
          <div>
            <div className="py-2">
              <label
                htmlFor="psikografis.gayaHidup"
                className="text-sm font-medium"
              >
                Gaya Hidup
              </label>
              <select
                name="psikografis.gayaHidup"
                id="psikografis.gayaHidup"
                className="w-full py-1 border border-gray-300 dark:border-gray-800 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
                onChange={formik.handleChange}
                value={formik.values.psikografis.gayaHidup}
                defaultValue={formik.values.psikografis.gayaHidup}
              >
                <option value="">Gaya Hidup</option>
                <option value="Modern">Modern</option>
                <option value="Aktif">Aktif</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Karier">Karier</option>
                <option value="Minimalis">Minimalis</option>
                <option value="Trendi">trendi</option>
                <option value="Pencari Keamanan">Pencari Keamanan</option>
                <option value="Pencinta Teknologi">Pecinta Teknologi</option>
                <option value="Hobi Outdoor">Hobi Outdoor</option>
                <option value="Mobilitas Tinggi">Mobilitas Tinggi</option>
              </select>
            </div>
            <div className="py-2">
              <label
                htmlFor="psikografis.motivasi"
                className="text-sm font-medium"
              >
                Motivasi
              </label>
              <Select
                name="psikografis.motivasi"
                value={formik.values.psikografis.motivasi}
                onValueChange={(value) =>
                  formik.setFieldValue("psikografis.motivasi", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih motivasi utama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gengsi">Gengsi</SelectItem>
                  <SelectItem value="Kebutuhan Keluarga">
                    Kebutuhan Keluarga
                  </SelectItem>
                  <SelectItem value="Efisiensi BBM">Efisiensi BBM</SelectItem>
                  <SelectItem value="Keamanan">Keamanan</SelectItem>
                  <SelectItem value="Promo">Promo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Minat</label>
              <div className="flex flex-wrap gap-2">
                {formik.values.psikografis.minat.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeMinat(index)}
                      className="ml-2 text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={minatInput}
                onChange={(e) => setMinatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMinat();
                  }
                }}
                placeholder="Tambah minat lalu tekan Enter"
              />
              <Button type="button" onClick={addMinat}>
                Tambah
              </Button>
            </div>
          </div>
          <div>
            <div className="py-2">
              <label htmlFor="demografi.usia" className="text-sm font-medium">
                Usia
              </label>
              <Input
                type="number"
                id="demografi.usia"
                name="demografi.usia"
                value={formik.values.demografi.usia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="py-2">
              <label
                htmlFor="demografi.pekerjaan"
                className="text-sm font-medium"
              />
              Pekerjaan
              <select
                className="w-full py-1 border border-gray-300 dark:border-gray-800 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
                name="demografi.pekerjaan"
                id="demografi.pekerjaan"
                onChange={formik.handleChange}
                value={formik.values.demografi.pekerjaan}
                defaultValue={formik.values.demografi.pekerjaan}
              >
                <option value="">Pekerjaan</option>
                <option value="pengusaha">Pengusaha</option>
                <option value="PNS">PNS</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="py-2">
              <label
                htmlFor="demografi.penghasilan"
                className="text-sm font-medium"
              >
                Penghasilan
              </label>
              <NumericFormat
                id="demografi.penghasilan"
                name="demografi.penghasilan"
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
                allowNegative={false}
                customInput={Input} // dari ShadCN
                value={formik.values.demografi.penghasilan}
                onValueChange={(values) => {
                  formik.setFieldValue(
                    "demografi.penghasilan",
                    values.floatValue || 0
                  );
                }}
              />
            </div>
          </div>
          <div>
            <div className="py-2">
              <label
                htmlFor="psikografis.gayaHidup"
                className="text-sm font-medium"
              >
                Gaya Hidup
              </label>

              <select
                name="psikografis.gayaHidup"
                id="psikografis.gayaHidup"
                className="w-full py-1 border border-gray-300 dark:border-gray-800 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
                onChange={formik.handleChange}
                value={formik.values.psikografis.gayaHidup}
                defaultValue={formik.values.psikografis.gayaHidup}
              >
                <option value="">Gaya Hidup</option>
                <option value="Modern">Modern</option>
                <option value="Aktif">Aktif</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Karier">Karier</option>
                <option value="Minimalis">Minimalis</option>
                <option value="Trendi">trendi</option>
                <option value="Pencari Keamanan">Pencari Keamanan</option>
                <option value="Pencinta Teknologi">Pecinta Teknologi</option>
                <option value="Hobi Outdoor">Hobi Outdoor</option>
                <option value="Mobilitas Tinggi">Mobilitas Tinggi</option>
              </select>
            </div>
            <div className="py-2">
              <label
                htmlFor="psikografis.motivasi"
                className="text-sm font-medium"
              >
                Motivasi
              </label>
              <Select
                name="psikografis.motivasi"
                value={formik.values.psikografis.motivasi}
                onValueChange={(value) =>
                  formik.setFieldValue("psikografis.motivasi", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih motivasi utama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gengsi">Gengsi</SelectItem>
                  <SelectItem value="Kebutuhan Keluarga">
                    Kebutuhan Keluarga
                  </SelectItem>
                  <SelectItem value="Efisiensi BBM">Efisiensi BBM</SelectItem>
                  <SelectItem value="Keamanan">Keamanan</SelectItem>
                  <SelectItem value="Promo">Promo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Minat</label>
              <div className="flex flex-wrap gap-2">
                {formik.values.psikografis.minat.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-slate-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeMinat(index)}
                      className="ml-2 text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={minatInput}
                  onChange={(e) => setMinatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addMinat();
                    }
                  }}
                  placeholder="Tambah minat lalu tekan Enter"
                />
                <Button type="button" onClick={addMinat}>
                  Tambah
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="grid gap-4">
              <div>
                <label>Frekuensi Kontak</label>
                <Input
                  type="number"
                  name="perilaku.frekuensiKontak"
                  value={formik.values.perilaku.frekuensiKontak}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="py-2">
                <label htmlFor="responAwal">Respon Awal</label>
                <select
                  name="perilaku.responAwal"
                  id="perilaku.responAwal"
                  className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
                  onChange={formik.handleChange}
                  value={formik.values.perilaku.responAwal}
                  defaultValue={formik.values.perilaku.responAwal}
                >
                  <option value="">Pilih Respon Awal</option>
                  <option value="Cepat">Cepat</option>
                  <option value="Biasa">Biasa</option>
                  <option value="Lambat">Lambat</option>
                </select>
              </div>
              <div className="py-2">
                <label htmlFor="interaksi favorit">Interaksi Favorit</label>
                <select
                  name="perilaku.interaksiFavorit"
                  id="perilaku.interaksiFavorit"
                  className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
                  onChange={formik.handleChange}
                  value={formik.values.perilaku.interaksiFavorit}
                  defaultValue={formik.values.perilaku.interaksiFavorit}
                >
                  <option value="">Pilih Interaksi Favorit</option>
                  <option value="Whatsapp">Whatsap</option>
                  <option value="Kunjungan">Kunjungan</option>
                </select>
              </div>

              <div className="py-2">
                <label htmlFor="sumber">Sumber</label>
                <select
                  name="lingkungan.sumber"
                  id="lingkungan.sumber"
                  className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
                  onChange={formik.handleChange}
                  value={formik.values.lingkungan.sumber}
                  defaultValue={formik.values.lingkungan.sumber}
                >
                  <option value="">Sumber</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Teman">Teman</option>
                  <option value="Media Sosial">Media Sosial</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SalesProspekForm;

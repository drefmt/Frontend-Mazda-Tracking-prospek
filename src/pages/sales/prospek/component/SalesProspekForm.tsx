import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useCreateProspek } from "@/hooks/prospek/useCreateProspek";
import { useEditProspek } from "@/hooks/prospek/useEditProspek";
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ProspekFormValue } from "@/interface/prospek.interface";

const SalesProspekForm = () => {
  const { id } = useParams();
  const [minatInput, setMinatInput] = useState("");
  const { data: prospekData } = useFetchProspek();
  const createProspek = useCreateProspek();
  const editProspek = useEditProspek();

  const formik = useFormik<ProspekFormValue>({
    initialValues: {
      name: "",
      date: "",
      whatsappNum: "",
      address: "",
      source: "",
      status: "Prospek",
      carType: "",
      // category: "Low",
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
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await editProspek.mutateAsync({ id, prospekData: values });
        } else {
          await createProspek.mutateAsync(values);
        }
        resetForm();
      } catch (error) {
        console.error("Failed to submit prospek:", error);
      }
    },
  });

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

  const removeMinat = (index: number) => {
    const newMinat = [...formik.values.psikografis.minat];
    newMinat.splice(index, 1);
    formik.setFieldValue("psikografis.minat", newMinat);
  };

  useEffect(() => {
    if (id && prospekData) {
      const prospek = prospekData.find((p) => p.id === id);
      if (prospek) {
        formik.setValues({
          name: prospek.name ?? "",
          date: prospek.date
            ? format(new Date(prospek.date), "yyyy-MM-dd")
            : "",
          whatsappNum: prospek.whatsappNum ?? "",
          address: prospek.address ?? "",
          source: prospek.source ?? "",
          status: prospek.status ?? "Prospek",
          carType: prospek.carType ?? "",
          // category: prospek.category ?? "Low",

          demografi: {
            usia: prospek.demografi?.usia ?? 0,
            pekerjaan: prospek.demografi?.pekerjaan ?? "",
            penghasilan: prospek.demografi?.penghasilan ?? 0,
          },
          psikografis: {
            minat: Array.isArray(prospek.psikografis?.minat)
              ? prospek.psikografis.minat
              : [],
            gayaHidup: prospek.psikografis?.gayaHidup ?? "",
            motivasi: prospek.psikografis?.motivasi ?? "",
          },
          perilaku: {
            frekuensiKontak: prospek.perilaku?.frekuensiKontak ?? 0,
            responAwal: prospek.perilaku?.responAwal ?? "",
            interaksiFavorit: prospek.perilaku?.interaksiFavorit ?? "",
          },
          lingkungan: {
            sumber: prospek.lingkungan?.sumber ?? "",
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, prospekData]);

  return (
    <div>
      <div className="overflow-hidden mt-4 p-4 rounded-md border border-gray-300 dark:border-gray-800 dark:text-white shadow-sm h-full mb-10">
        <h1 className="text-3xl">{id ? "Edit Prospek" : "Add New Prospek"}</h1>
        <p className="pb-4">
          {id ? "Halaman Edit Prospek" : "Halaman Tambah Prospek"}.
        </p>
        <form className="h-full justify-between" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between pb-4">
            <Link to="/sales/prospek">
              <Button variant="ghost" className="border border-gray-300">
                Back
              </Button>
            </Link>
            <Button type="submit" className="bg-black hover:bg-black/90">
              Submit
            </Button>
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex-col pb-4">
            <Label htmlFor="date">Date</Label>
            <div className="w-full">
              <Input
                type="date"
                id="date"
                value={formik.values.date}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="whatsappNum">WhatsApp Number</Label>
            <Input
              type="text"
              id="whatsappNum"
              placeholder="WhatsApp Number"
              className="w-full"
              value={formik.values.whatsappNum}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              placeholder="Address"
              className="w-full"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
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

          <div className="flex-grow pb-4">
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
              <option value="TestDrive">Test Drive</option>
              <option value="Retail">Retail</option>
            </select>
          </div>

          <div className="flex-grow pb-4">
            <Label htmlFor="carType">Car Type</Label>
            <Input
              type="text"
              id="carType"
              placeholder="Car Type"
              className="w-full"
              value={formik.values.carType}
              onChange={formik.handleChange}
            />
          </div>

          {/* <div className="flex-grow pb-4">
            <Label htmlFor="category">Category</Label>
            <select
              name="category"
              id="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              defaultValue={formik.values.category}
              className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Hot">Hot</option>
            </select>
          </div> */}
          <Card className="p-4">
            <div>
              <h1>Demografis</h1>
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

              {/* === Input Pekerjaan === */}
              <div className="space-y-2">
                <label
                  htmlFor="demografi.pekerjaan"
                  className="text-sm font-medium"
                >
                  Pekerjaan
                </label>
                <Select
                  name="demografi.pekerjaan"
                  value={formik.values.demografi.pekerjaan}
                  onValueChange={(value) =>
                    formik.setFieldValue("demografi.pekerjaan", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pekerjaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pengusaha">Pengusaha</SelectItem>
                    <SelectItem value="PNS">PNS</SelectItem>
                    <SelectItem value="Karyawan Swasta">
                      Karyawan Swasta
                    </SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                    <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* === Input Penghasilan === */}
              <div className="space-y-2">
                <label
                  htmlFor="demografi.penghasilan"
                  className="text-sm font-medium"
                >
                  Penghasilan
                </label>
                <Input
                  type="number"
                  id="demografi.penghasilan"
                  name="demografi.penghasilan"
                  value={formik.values.demografi.penghasilan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <div>
              <h1>Psikografis</h1>
              {/* === Gaya Hidup ===*/}
              <div className="space-y-2">
                <label
                  htmlFor="psikografis.gayaHidup"
                  className="text-sm font-medium"
                >
                  Gaya Hidup
                </label>
                <Select
                  name="psikografis.gayaHidup"
                  value={formik.values.psikografis.gayaHidup}
                  onValueChange={(value) =>
                    formik.setFieldValue("psikografis.gayaHidup", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih gaya hidup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Modern">Modern</SelectItem>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Keluarga">Keluarga</SelectItem>
                    <SelectItem value="Karier">Karier</SelectItem>
                    <SelectItem value="Minimalis">Minimalis</SelectItem>
                    <SelectItem value="Trendi">Trendi</SelectItem>
                    <SelectItem value="Pencari Keamanan">
                      Pencari Keamanan
                    </SelectItem>
                    <SelectItem value="Pecinta Teknologi">
                      Pecinta Teknologi
                    </SelectItem>
                    <SelectItem value="Hobi Outdoor">Hobi Outdoor</SelectItem>
                    <SelectItem value="Hobi Indoor">Hobi Indoor</SelectItem>
                    <SelectItem value="Mobilitas Tinggi">
                      Mobilitas Tinggi
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* === Motivasi === */}
              <div className="space-y-2">
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
              {/* Minat */}
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
            {/* === Perilaku === */}
            <div>
              <div className="grid gap-4">
                <h1>Perilaku</h1>
                {/* Frekuensi Kontak (number) */}
                <div>
                  <label>Frekuensi Kontak</label>
                  <Input
                    type="number"
                    name="perilaku.frekuensiKontak"
                    value={formik.values.perilaku.frekuensiKontak}
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Respon Awal */}
                <div>
                  <label>Respon Awal</label>
                  <Select
                    value={formik.values.perilaku.responAwal}
                    onValueChange={(value) =>
                      formik.setFieldValue("perilaku.responAwal", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Respon Awal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cepat">Cepat</SelectItem>
                      <SelectItem value="Biasa">Biasa</SelectItem>
                      <SelectItem value="Lambat">Lambat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interaksi Favorit */}
                <div>
                  <label>Interaksi Favorit</label>
                  <Select
                    value={formik.values.perilaku.interaksiFavorit}
                    onValueChange={(value) =>
                      formik.setFieldValue("perilaku.interaksiFavorit", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Interaksi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Kunjungan">Kunjungan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label>Sumber</label>
                    <Select
                      value={formik.values.lingkungan.sumber}
                      onValueChange={(value) =>
                        formik.setFieldValue("lingkungan.sumber", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Sumber" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Keluarga">Keluarga</SelectItem>
                        <SelectItem value="Teman">Teman</SelectItem>
                        <SelectItem value="Media Sosial">
                          Media Sosial
                        </SelectItem>
                        <SelectItem value="Iklan">Iklan</SelectItem>
                        <SelectItem value="Komunitas">Komunitas</SelectItem>
                        <SelectItem value="Marketplace Mobil">
                          Marketplace Mobil
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default SalesProspekForm;

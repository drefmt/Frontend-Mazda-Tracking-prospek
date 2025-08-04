/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Star } from "lucide-react";
import logo from "@/assets/Logo.png";
import { useCreateFeedback } from "@/hooks/feedback/useCreateFeedback"; // pastikan path sesuai

interface FeedbackForm {
  customerName: string;
  rating: number;
  message: string;
}

export default function FeedbackPage() {
  const { token } = useParams(); // Ambil token dari URL
  const createFeedback = useCreateFeedback();

  const [form, setForm] = useState<FeedbackForm>({
    customerName: "",
    rating: 0,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRatingClick = (rate: number) => {
    setForm((prev) => ({ ...prev, rating: rate }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!token) {
      setErrorMessage("Token tidak ditemukan di URL");
      setStatus("error");
      return;
    }

    createFeedback.mutate(
      {
        token,
        feedbackData: form,
      },
      {
        onSuccess: () => {
          setStatus("success");
        },
        onError: (error: any) => {
          setErrorMessage(
            error?.response?.data?.message ||
              "Terjadi kesalahan saat mengirim feedback"
          );
          setStatus("error");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-xl bg-white shadow-2xl rounded-2xl">
        <div className="flex justify-center">
          <img src={logo} alt="Mazda Banjarbaru" width={200} />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-center font-light pt-4">
            Beri Penilaian Anda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4"> 
          {status === "success" && (
            <Alert
              variant="default"
              className="bg-green-100 border-green-300 text-green-900"
            >
              <AlertTitle>Terima kasih!</AlertTitle>
              <AlertDescription>
                Feedback Anda telah kami terima.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertTitle>Gagal</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {status === "idle" && (
            <>
              <Input
                name="customerName"
                placeholder="Nama Anda"
                value={form.customerName}
                onChange={handleChange}
              />
              <div>
                <p className="mb-2 text-sm font-medium">Rating Anda</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      className={`w-6 h-6 cursor-pointer ${
                        form.rating >= num
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingClick(num)}
                    />
                  ))}
                </div>
              </div>
              <Textarea
                name="message"
                placeholder="Tulis pendapat Anda di sini..."
                value={form.message}
                onChange={handleChange}
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              >
                Kirim Feedback
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

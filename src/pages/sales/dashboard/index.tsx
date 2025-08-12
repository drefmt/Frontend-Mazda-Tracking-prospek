import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { YearlyActivityChart } from "./component/Chart";
import {
  UserPlus,
  ClipboardList,
  Car,
  Handshake,
  Repeat,
  PercentCircle,
} from "lucide-react";

import { useFetchSummary } from "@/hooks/dashboard/useFetchSummary";
import { Summary } from "@/interface/summary.interface";

type SummaryKey = keyof Summary;

interface CardItem {
  key: SummaryKey;
  title: string;
  description: string;
  icon: LucideIcon;
}

const carditems: CardItem[] = [
  {
    key: "totalProspek",
    title: "Total Prospek",
    description: "Total Prospek Perbulan",
    icon: UserPlus,
  },
  {
    key: "totalTestDrive",
    title: "Total Test Drive",
    description: "Total Test Drive Perbulan",
    icon: Car,
  },
  {
    key: "totalSPK",
    title: "Total SPK",
    description: "Total SPK Perbulan",
    icon: ClipboardList,
  },
  {
    key: "totalRetail",
    title: "Total Retail",
    description: "Total Retail Perbulan",
    icon: Handshake,
  },
  {
    key: "followUpCount",
    title: "Total Follow Up",
    description: "Total Follow Up Perbulan",
    icon: Repeat,
  },
  {
    key: "conversionRate",
    title: "Rate Konversi",
    description: "Konversi Prospek ke Retail",
    icon: PercentCircle,
  },
];

const Dashboard = () => {
  const { data, isLoading, isError } = useFetchSummary();

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4 py-10">
        {isLoading && <p>Memuat data...</p>}
        {isError && (
          <p className="text-red-500">Gagal mengambil data summary</p>
        )}
        {data &&
          carditems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.key}
                className="rounded-xl border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-semibold">
                        {item.title}
                      </CardTitle>
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-800">
                      {data[item.key]}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <CardDescription className="text-xs text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
      </div>
      <YearlyActivityChart />
    </div>
  );
};

export default Dashboard;

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, ClipboardList, CarFront, WalletCards } from "lucide-react";
import { Chart } from "./component/Chart"; 
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useFetchRetail } from "@/hooks/retail/useFetchRetail";
import { useFetchSpk } from "@/hooks/spk/useFetchSpk";
import { useFetchTestDrive } from "@/hooks/testDrive/useFetchTestDrive";

const useTotals = () => {
  const { data: prospekData = [] } = useFetchProspek();
  const { data: retailData = [] } = useFetchRetail();
  const { data: spkData = [] } = useFetchSpk();  
  const { data: testDriveData = [] } = useFetchTestDrive();

  return {
    totalProspek: prospekData.length,
    totalRetail: retailData.length,
    totalSpk: spkData.length,
    totalTestDrive: testDriveData.length,
  };
};

const Dashboard = () => {
  const totals = useTotals();

  interface AllData {
    title: string;
    total: number;
    description: string;
    icon: React.ReactNode;
  }

  const carditems: AllData[] = [
    {
      title: "Total Prospek",
      total: totals.totalProspek,
      description: "Total Prospek Perbulan",
      icon: <ClipboardList />,
    },
    {
      title: "Total SPK",
      total: totals.totalSpk,
      description: "Total SPK Perbulan",
      icon: <User />,
    },
    {
      title: "Total Test Drive",
      total: totals.totalTestDrive,
      description: "Total Drive Perbulan",
      icon: <CarFront />,
    },
    {
      title: "Total Retail",
      total: totals.totalRetail,
      description: "Total Retail Perbulan",
      icon: <WalletCards />,
    },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {carditems.map((item) => (
          <Card key={item.title} className="border-l border-l-blue-500 rounded-lg border-3">
            <div>
              <CardHeader>
                <span className="flex justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <span>
                    {item.icon}                    
                  </span>
                </span>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold">{item.total}</span>
              </CardContent>
              <CardFooter>
                <CardDescription>{item.description}</CardDescription>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;

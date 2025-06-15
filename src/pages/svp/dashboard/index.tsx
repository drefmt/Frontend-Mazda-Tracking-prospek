import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
// import { Chart } from "./component/Chart"  

interface AllData {
  title: string;
  total: number;
  description: string;
}

const carditems: AllData[] = [
  {
    title: "Total Prospek",
    total: 170,
    description: "Total Prospek Perbulan",
  },
  {
    title: "Total SPK",
    total: 200,
    description: "Total SPK Perbulan",
  },
  {
    title: "Total Test Drive",
    total: 200,
    description: "Total Drive Perbulan",
  },
  {
    title: "Total Retail",
    total: 200,
    description: "Total Retail Perbulan",
  },
];
// className="border-l border-l-sky-600 rounded-lg  "
const Dashboard = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {carditems.map((item) => (
          <Card key={item.total + 1} className="border-l border-l-slate-600 rounded-lg border-3">
            <div>
              <CardHeader>
                <span className="flex justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <User className="mr-2" />
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
      {/* <Chart/> */}
    </div>
  );
};

export default Dashboard;

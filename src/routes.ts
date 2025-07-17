import { lazy } from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  CarFront,
  Users,
  FileText,
  PhoneCall,
  UserCog,
  BarChart3,
  LineChart,
  ClipboardList,
} from "lucide-react";

// Halaman Sales
const SalesDashboard = lazy(() => import("@/pages/sales/dashboard"));

const SalesProspek = lazy(() => import("@/pages/sales/prospek"));
const SalesProspekForm = lazy(
  () => import("@/pages/sales/prospek/component/SalesProspekForm")
);
const SalesProspekDetails = lazy(
  () => import("@/pages/sales/prospek/component/ViewDetails")
);
const SalesProspekFollowUp = lazy(
  () => import("@/pages/sales/prospek/component/FollowUpForm")
);

const SalesSpk = lazy(() => import("@/pages/sales/spk"));
const SalesSpkForm = lazy(() => import("@/pages/sales/spk/component/SpkForm"));
const SalesSpkDetails = lazy(() => import("@/pages/sales/spk/component/ViewDetails"));

const SalesTestDrive = lazy(() => import("@/pages/sales/testDrive"));
const SalesTestDriveFrom = lazy(() => import("@/pages/sales/testDrive/component/Test-drive-form"));

const Activity = lazy(() => import("@/pages/sales/activity"));
const ActivityForm = lazy(() => import("@/pages/sales/activity/component/ActivityForm"));

const SalesRetail = lazy(() => import("@/pages/sales/retail"));
const SalesRetailForm = lazy(() => import("@/pages/sales/retail/component/RetailForm"));

// HALAMAN SPV
const SvpProspek = lazy(() => import("@/pages/svp/prospek/"));
const SvpSpk = lazy(() => import("@/pages/svp/spk"));
const SvpTestDrive = lazy(() => import("@/pages/svp/testDrive"));
const SvpDashboard = lazy(() => import("@/pages/svp/dashboard"));
const SvpViewDetailSpk = lazy(() => import("@/pages/svp/spk/component/SpvViewDetails"));
const SvpViewDetailProspek = lazy(() => import("@/pages/svp/prospek/component/ViewDetails"));
const SpvFollowUpForm = lazy(() => import("@/pages/svp/prospek/component/FollowUpForm"));
const SvpRetail = lazy(() => import("@/pages/svp/retail"));

// REPORT
const svpReportProspek = lazy(() => import("@/pages/svp/reports/prospek"));
const RetailReport = lazy(() => import('@/pages/svp/reports/retail'));
const testDriveReport = lazy(() => import('@/pages/svp/reports/testDrive'));
const spkReport = lazy(() => import("@/pages/svp/reports/spk"))
const followUpReport = lazy(() => import("@/pages/svp/reports/follow-up"))
const salesEvaluation = lazy(() => import("@/pages/svp/reports/sales-evaluation"))
const salesPerformance = lazy(() => import("@/pages/svp/reports/sales-performance"))
const userListReport = lazy(() => import("@/pages/svp/reports/user"))
//! Tipe untuk route
interface RouteType {
  name: string;
  path: string;
  component: React.ComponentType;
}

//! Tipe untuk menu sidebar
interface MenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

// * Daftar routes (hanya untuk routing, tidak digunakan di sidebar)
export const salesRoute: RouteType[] = [
  //* Sales Routes
  {
    name: "Dashboard",
    path: "dashboard",
    component: SalesDashboard,
  },
  {
    name: "Prospek add",
    path: "prospek",
    component: SalesProspek,
  },
  {
    name: "Prospek Add",
    path: "prospek/add",
    component: SalesProspekForm,
  },
  {
    name: "Prospek Edit",
    path: "prospek/edit/:id",
    component: SalesProspekForm,
  },
  {
    name: "Prospek Details",
    path: "prospek/detail/:id",
    component: SalesProspekDetails,
  },
  {
    name: "Follow-up",
    path: "prospek/:id/follow-up",
    component: SalesProspekFollowUp,
  },
  {
    name: "Follow-up edit",
    path: "prospek/detail/:id/follow-up/:followUpId",
    component: SalesProspekFollowUp,
  },
  {
    name: "SPK",
    path: "spk",
    component: SalesSpk,
  },
  {
    name: "SPK Add",
    path: "spk/add",
    component: SalesSpkForm,
  },
  {
    name: "SPK edit",
    path: "spk/edit/:id",
    component: SalesSpkForm,
  },
  {
    name: "SPK Details",
    path: "spk/detail/:id",
    component: SalesSpkDetails,
  },

  {
    name: "Test Drive",
    path: "test-drive",
    component: SalesTestDrive,
  },
  {
    name: "Test add",
    path: "test-drive/add",
    component: SalesTestDriveFrom,
  },
  {
    name: "Test edit",
    path: "test-drive/edit/:id",
    component: SalesTestDriveFrom,
  },

  {
    name: "Retail",
    path: "retail",
    component: SalesRetail,
  },
  {
    name: "Retail add",
    path: "retail/add",
    component: SalesRetailForm,
  },
  {
    name: "Retail edit",
    path: "retail/edit/:id",
    component: SalesRetailForm,
  },
  {
    name: "Activity",
    path: "activity",
    component: Activity,
  },
  {
    name: "Activity Add",
    path: "activity/add",
    component: ActivityForm,
  },
  {
    name: "Activity edit",
    path: "activity/edit/:id",
    component: ActivityForm,
  },
];

//* SVP Routes
export const svpRoute: RouteType[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    component: SvpDashboard,
  },
  {
    name: "Prospek",
    path: "prospek",
    component: SvpProspek,
  },
  {
    name: "Prospek Detail",
    path: "prospek/detail/:id",
    component: SvpViewDetailProspek,
  },
  {
    name: "SPK",
    path: "spk",
    component: SvpSpk,
  },
  {
    name: "Test Drive",
    path: "test-drive",
    component: SvpTestDrive,
  },
  {
    name: "SPK Detail",
    path: "spk/detail/:id",
    component: SvpViewDetailSpk,
  },
  {
    name: "Follow-Up Update",
    path: "prospek/detail/:id/follow-up/:followUpId",
    component: SpvFollowUpForm,
  },
  {
    name: "Follow Up Add",
    path: "prospek/:id/follow-up/:id",
    component: SpvFollowUpForm,
  },
  {
    name: "Retail",
    path: "retail",
    component: SvpRetail,
  },
  {
    name: "Retail",
    path: "retail",
    component: SvpRetail,
  },
  {
    name: "Customer Complain",
    path: "/customer-complain",
    component: SvpRetail,
  },
  {
    name: "prospek Report",
    path: 'report/prospect',
    component: svpReportProspek,
  },
  {
    name: "Test-Drive Report",
    path: 'report/test-drive',
    component: testDriveReport,
  },
  {
    name: "retail Report",
    path: 'report/retail',
    component: RetailReport,
  },  
  {
    name: "spk Report",
    path: 'report/spk',
    component: spkReport,
  },
  {
    name: "Follow-up Report",
    path: 'report/follow-up',
    component: followUpReport,
  },
  {
    name: "Sales Evaluation",
    path: 'report/sales-evaluation',
    component: salesEvaluation,
  },
  {
    name: "Sales Performance",
    path: 'report/sales-performance',
    component: salesPerformance,
  },
  {
    name: "Users Report",
    path: 'report/users',
    component: userListReport,
  }
];

//* Daftar menu sidebar berdasarkan level user
export const sidebarMenus: Record<"sales" | "svp", MenuItem[]> = {
  sales: [
    {
      title: "Dashboard",
      path: "/sales/dashboard",
      icon: Home,
    },
    {
      title: "Prospek",
      path: "/sales/prospek",
      icon: Inbox,
    },
    {
      title: "Test Drive",
      path: "/sales/test-drive",
      icon: Search,
    },
    {
      title: "SPK",
      path: "/sales/spk",
      icon: Calendar,
    },
    {
      title: "Retail",
      path: "/sales/retail",
      icon: CarFront,
    },
    {
      title: "Daily Activity",
      path: "/sales/activity",
      icon: ClipboardList,
    },
  ],
  svp: [
    {
      title: "Dashboard",
      path: "/svp/dashboard",
      icon: Home,
    },
    {
      title: "Prospek",
      path: "/svp/prospek",
      icon: Inbox,
    },
    {
      title: "Test Drive",
      path: "/svp/test-drive",
      icon: Search,
    },
    {
      title: "SPK",
      path: "/svp/spk",
      icon: Calendar,
    },
    {
      title: "Retail",
      path: "/svp/retail",
      icon: CarFront,
    },
    {
      title: "Customer Complain",
      path: "/svp/customer-complain",
      icon: CarFront,
    },
    {
      title: "Sales Activity",
      path: "/svp/Activity",
      icon: ClipboardList,
    },
  ],
};

export const reportSidebarMenu: Record<"sales" | "svp", MenuItem[]> = {
  sales: [],
  svp: [
    {
      title: "Prospect",
      path: "/svp/report/prospect",
      icon: FileText,
    },
    {
      title: "Test-Drive",
      path: "/svp/report/test-drive",
      icon: CarFront,
    },
    {
      title: "Spk",
      path: "/svp/report/spk",
      icon: ClipboardList,
    },
    {
      title: "Retail",
      path: "/svp/report/retail",
      icon: LineChart,
    },
    {
      title: "Follow-Up",
      path: "/svp/report/follow-up",
      icon: PhoneCall,
    },
    {
      title: "Users",
      path: "/svp/report/users",
      icon: Users,
    },
    {
      title: "sales evaluation",
      path: "/svp/report/sales-evaluation",
      icon: UserCog,
    },
    {
      title: "Sales Performance",
      path: "/svp/report/sales-performance",
      icon: BarChart3,
    },
  ],
};

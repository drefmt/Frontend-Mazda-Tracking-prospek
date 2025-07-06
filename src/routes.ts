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
const SalesSpkDetails = lazy(
  () => import("@/pages/sales/spk/component/ViewDetails")
);

const SalesTestDrive = lazy(() => import("@/pages/sales/testDrive"));
const SalesTestDriveFrom = lazy(
  () => import("@/pages/sales/testDrive/component/Test-drive-form")
);

const SalesRetail = lazy(() => import("@/pages/sales/retail"));
const SalesRetailForm = lazy(
  () => import("@/pages/sales/retail/component/RetailForm")
);

// Halaman SVP
const SvpProspek = lazy(() => import("@/pages/svp/prospek/"));
const SvpSpk = lazy(() => import("@/pages/svp/spk"));
const SvpTestDrive = lazy(() => import("@/pages/svp/testDrive"));
const SvpDashboard = lazy(() => import("@/pages/svp/dashboard"));
const SvpViewDetailSpk = lazy(() => import("@/pages/svp/spk/component/SpvViewDetails"));
const SvpViewDetailProspek = lazy(() => import("@/pages/svp/prospek/component/ViewDetails"));
const SpvFollowUpForm = lazy(() => import("@/pages/svp/prospek/component/FollowUpForm"));
const SvpRetail = lazy(() => import("@/pages/svp/retail"));
const svpReportProspek = lazy(() => import("@/pages/svp/reports/prospek"));

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
    name: "prospek Report",
    path: 'report/prospect',
    component: svpReportProspek,
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
      path: "/svp/report/prospect",
      icon: ClipboardList,
    },
    {
      title: "Retail",
      path: "/svp/report/retail",
      icon: LineChart,
    },
    {
      title: "Follow-Up",
      path: "/svp/report/retail",
      icon: PhoneCall,
    },
    {
      title: "Users",
      path: "/svp/report/users",
      icon: Users,
    },
    {
      title: "Lead Convertion",
      path: "/svp/report/lead-convertion",
      icon: UserCog,
    },
    {
      title: "Sales Performance",
      path: "/svp/report/sales-performance",
      icon: BarChart3,
    },
  ],
};

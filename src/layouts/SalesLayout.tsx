import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/sidebar/Layout";
import { salesRoute } from "@/routes";
// import { AppHeader } from "@/components/header/Header";

function SalesLayout() {
  return (
    <div className="dark:bg-gray-950">
      <div className="flex-grow">
        {/* <AppHeader />         */}
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {salesRoute.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Suspense>
        </Layout>
      </div>
    </div>
  );
}

export default SalesLayout;

import { Suspense } from "react";
import Layout from "@/components/sidebar/Layout";
import { Routes, Route } from "react-router-dom";
import { svpRoute } from "@/routes";

const SvpLayout = () => {
  return (
    <div className="h-screen">
      <div className="flex-grow">
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {svpRoute.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Suspense>
        </Layout>
      </div>
    </div>
  );
};

export default SvpLayout;

import { useLocation } from "react-router-dom";

export const useBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return pathnames.map((value, index) => {
    const href = "/" + pathnames.slice(0, index + 1).join("/");
    const name = value.charAt(0).toUpperCase() + value.slice(1);
    return { name, href, isLast: index === pathnames.length - 1 };
  });
};

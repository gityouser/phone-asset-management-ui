import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import StorageIcon from "@material-ui/icons/Storage";

import DataTable from "../../DataTable/";

export function computeRoutesData() {
  console.log({ DataTable });
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => null,
      main: () => (
        <div className="home_main_content">
          <h1>Welcome!</h1>
          <br />
          Navigate to the available views by using the navbar to the left
        </div>
      ),
      title: "Home",
      toolbar: () => null,
      icon: <HomeIcon />,
    },
    {
      path: "/mobile-assets",
      exact: true,
      sidebar: () => null,
      main: () => <DataTable />,
      title: "Assets Manager",
      toolbar: () => null,
      icon: <StorageIcon />,
    },
  ];

  return routes;
}

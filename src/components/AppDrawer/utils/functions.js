import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import StorageIcon from "@material-ui/icons/Storage";

import DataTable from "../../DataTable/";

export function computeRoutesData() {
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

export function createMockData() {
  function createData(type, serial, color, metaData) {
    return { type, serial, color, metaData };
  }

  return [
    createData("asdfasdf", "ISADFN", 1324171354, 3287263),
    createData("Chisadfasdfna", "CASDFN", 1403500365, 9596961),
    createData("Itasdfasdfgasfgaly", "SADFIT", 60483973, 301340),
    createData("Unisadfted Stasfgasgates", "UASADFS", 327167434, 9833520),
    createData("Canasfgasfgada", "CFASDA", 37602103, 9984670),
    createData("Ausasfgasftralia", "ASFAU", 25475400, 7692024),
    createData("Geasfgrmany", "FGFDE", 83019200, 357578),
    createData("Irasfgasfgeland", "ASIE", 4857000, 70273),
    createData("Mesafgasfxico", "MGFAX", 126577691, 1972550),
    createData("Jaadsfgsfgpan", "SADFJP", 126317000, 377973),
    createData("Fraasfgsfnce", "SADFFR", 67022000, 640679),
    createData("Unidsfgsdfted Kdsfgingfsdgsdfgdom", "SFGGB", 67545757, 242495),
    createData("Ruasfdgassia", "GARUASF", 146793744, 17098246),
    createData("Nasfgigefsaria", "NASFGG", 200962417, 923768),
    createData("Brasfgaasfgzil", "ASFGDBR", 210147125, 8515767),
  ];
}

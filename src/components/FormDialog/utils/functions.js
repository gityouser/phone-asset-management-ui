import { actionScenarios } from "./";

export function handleActionScenario({
  scenario,
  assetsURL,
  rowData,
  fetchAllDataAndSetRows,
  setFormOpen,
}) {
  const scenarios = {
    [actionScenarios.create]: {
      handleSubmit: async (data) => {
        try {
          const response = await fetch(assetsURL, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
          });

          response.ok ? fetchAllDataAndSetRows() : alert("Invalid request");
        } catch (err) {
          alert(err.message);
        } finally {
          setFormOpen(false);
        }
      },
      handleClose: () => setFormOpen(false),
    },
    [actionScenarios.edit]: {
      handleClose: () => setFormOpen(false),
      handleSubmit: async (data) => {
        try {
          const response = await fetch(`${assetsURL}/${rowData.row._id}`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
          });

          response.ok ? fetchAllDataAndSetRows() : alert("Invalid request");
        } catch (err) {
          alert(err.message);
        } finally {
          setFormOpen(false);
        }
      },
      handleDelete: async () => {
        try {
          const response = await fetch(`${assetsURL}/${rowData.row._id}`, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          });

          response.ok ? fetchAllDataAndSetRows() : alert("Invalid request");
        } catch (err) {
          alert(err.message);
        } finally {
          setFormOpen(false);
        }
      },
    },
    default: {
      handleSubmit: () => null,
      handleClose: () => null,
      handleDelete: () => null,
    },
  };

  return scenarios[scenario] || scenarios.default;
}

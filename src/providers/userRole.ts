  /* Thats the tableHeader for the table in index file */
  export const tableHeader = [
    {
      columnName: "Code",
      columnLabel: "code",
    },
    {
      columnName: "Name",
      columnLabel: "parentRoleCode",
    },
    {
      columnName: "Description",
      columnLabel: "roleTranslations[0].description",
    },
    {
      columnName: "Status",
      columnLabel: "status",
    },
    /* It's gonna be static, so you can use it as a constant for all table so we can use the dropdown actions */
    {
      columnName: "Actions",
      columnLabel: "actions",
    },
  ];
  
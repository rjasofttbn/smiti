import React, { useEffect, useState } from "react";
import ShareholdersTable from "../../components/tables/ShareholdersTable";
import { getShareholders } from "../../api/shareholderApi";

export default function ShareholdersPage() {
  const [shareholders, setShareholders] = useState([]);

  useEffect(() => {
    getShareholders()
      .then(res => setShareholders(res.data))
      .catch(err => console.error(err));
  }, []);

  return <ShareholdersTable shareholders={shareholders} />;
}
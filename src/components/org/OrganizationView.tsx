import CreateElection from "@pages/CreateElection"
import OrganizationOverview from "@pages/OrganizationOverview"
import { useState } from "react";

export enum OrgForms {
   OVERVIEW,
   CREATE_ELECTION
}

export default function OrganizationView() {
   const [form, setForm] = useState<OrgForms>(OrgForms.OVERVIEW);

   if (form === OrgForms.OVERVIEW) {
      return <OrganizationOverview setForm={setForm} />
   }

   return <CreateElection setForm={setForm} />

}
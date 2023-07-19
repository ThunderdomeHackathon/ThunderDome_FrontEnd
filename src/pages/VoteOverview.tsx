import { useEffect, useState } from "react";
import VoterOverview from "./VoterOverview";
import OrganizationOverview from "./OrganizationOverview";
import { getUser } from "@api/UserApi";
import { IUser } from "types/IUser";
import VoterView from "@components/voter/VoterView";
import OrganizationView from "@components/org/OrganizationView";
import { useNavigate } from "react-router-dom";

export default function VoteOverview() {
  return <VoterOverview />;
}

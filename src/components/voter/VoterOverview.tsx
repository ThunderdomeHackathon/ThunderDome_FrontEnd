import { IVoter } from "../../types/IVoter"

type Props = {
   profile: IVoter; 
}

export default function VoterOverview({profile}: Props) {
   return <div>Voter overview {profile.name}</div>
}
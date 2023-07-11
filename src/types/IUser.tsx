import { IOrganization } from "./IOrganization";
import { IVoter } from "./IVoter";

export interface IUser {
  id: string;
  email: string;
  isVoter: boolean;
}

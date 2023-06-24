import { CircularProgress } from "@mui/material";
export default function Loading() {
  return (
    <div>
      <CircularProgress />
      <span>Loading...</span>
    </div>
  );
}

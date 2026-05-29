import { useSelector } from "react-redux";

import type { RootState } from "../app/store";

export const useAuth = () => {
  const auth = useSelector(
    (state: RootState) => state.auth
  );

  return auth;
};
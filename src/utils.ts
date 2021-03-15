import { Secrets } from "./storage";

export const isAuthorized = async () => {
  const [atk, ats] = await Secrets.getTokens();
  return atk && ats ? true : false;
};

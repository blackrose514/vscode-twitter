import { window } from "vscode";
import { toggleStatusBarItem } from "../statusBar";
import { GlobalState, Secrets } from "../storage";

export default async () => {
  await Secrets.deleteTokens();
  await GlobalState.setScreenName("");
  await toggleStatusBarItem();

  window.showInformationMessage("You are now logged out");
};

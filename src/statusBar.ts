import { StatusBarAlignment, window } from "vscode";
import { GlobalState } from "./storage";
import { PREFIX } from "./const";
import { isAuthorized } from "./utils";

const loginSBI = window.createStatusBarItem(StatusBarAlignment.Right, 1000);
const logoutSBI = window.createStatusBarItem(StatusBarAlignment.Right, 999);
const tweetSBI = window.createStatusBarItem(StatusBarAlignment.Right, 1000);

loginSBI.command = `${PREFIX}.auth`;
logoutSBI.command = `${PREFIX}.logout`;
tweetSBI.command = `${PREFIX}.tweet`;

async function toggleStatusBarItem() {
  if (await isAuthorized()) {
    logoutSBI.text = `$(twitter) Logout`;
    tweetSBI.text = `$(twitter) Tweet (@${GlobalState.getScreenName()})`;
    loginSBI.hide();
    logoutSBI.show();
    tweetSBI.show();
  } else {
    loginSBI.text = "$(twitter) Login";
    loginSBI.show();
    logoutSBI.hide();
    tweetSBI.hide();
  }
}

export { loginSBI, logoutSBI, tweetSBI, toggleStatusBarItem };

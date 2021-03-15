import { ExtensionContext, commands } from "vscode";
import { auth, tweet, logout } from "./commands";
import { initStorage } from "./storage";
import { PREFIX } from "./const";
import {
  loginSBI,
  logoutSBI,
  tweetSBI,
  toggleStatusBarItem,
} from "./statusBar";

export function activate({
  subscriptions,
  secrets,
  globalState,
}: ExtensionContext) {
  initStorage({ secrets, globalState });
  subscriptions.push(commands.registerCommand(`${PREFIX}.auth`, auth));
  subscriptions.push(commands.registerCommand(`${PREFIX}.tweet`, tweet));
  subscriptions.push(commands.registerCommand(`${PREFIX}.logout`, logout));
  subscriptions.push(loginSBI, logoutSBI, tweetSBI);
  toggleStatusBarItem();
}

export function deactivate() {}

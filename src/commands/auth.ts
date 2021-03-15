import axios from "axios";
import express from "express";
import { Server } from "http";
import { commands, Uri, window } from "vscode";
import { API_BASE_URL, SERVER_PORT } from "../const";
import { toggleStatusBarItem } from "../statusBar";
import { GlobalState, Secrets } from "../storage";
import { isAuthorized } from "../utils";

const oauthURL = `${API_BASE_URL}/oauth`;
const verifyURL = `${API_BASE_URL}/api/verify`;

export default async () => {
  if (await isAuthorized()) {
    return window.showWarningMessage("You are already logged in.");
  }

  const app = express();
  let server: Server;

  app.use(express.json());

  app.get("/authorize/:accessToken/:accessTokenSecret", async (req, res) => {
    const { accessToken, accessTokenSecret } = req.params;

    if (!accessToken || !accessTokenSecret) {
      return res.send("ERROR: Authorization failed.");
    }

    const screenName = await verify(accessToken, accessTokenSecret);

    await Secrets.setTokens(accessToken, accessTokenSecret);
    await GlobalState.setScreenName(screenName);
    await toggleStatusBarItem();

    res.end("Success! You can close the browser now.");
    server.close();
  });

  server = app.listen(SERVER_PORT, () => {
    commands.executeCommand("vscode.open", Uri.parse(oauthURL));
  });
};

async function verify(accessToken: string, accessTokenSecret: string) {
  try {
    const {
      data: { screenName },
    } = await axios.post(verifyURL, {
      accessToken,
      accessTokenSecret,
    });
    return screenName;
  } catch (err) {
    window.showErrorMessage("ERROR: Verification failed.");
  }
}

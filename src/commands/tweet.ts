import axios, { AxiosError } from "axios";
import { window } from "vscode";
import { API_BASE_URL } from "../const";
import { Secrets } from "../storage";
import { isAuthorized } from "../utils";

const url = `${API_BASE_URL}/api/tweet`;

export default async () => {
  if (!(await isAuthorized())) {
    return window.showWarningMessage("Login is required to post tweets.");
  }

  const input = await window.showInputBox({
    placeHolder: "What's happening?",
    prompt: "Max characters: 280",
    validateInput: (val) => {
      return val.length > 280 ? `${280 - val.length}` : null;
    },
  });

  const status = input?.trim();

  if (!status) {
    return window.showWarningMessage("Empty tweet");
  }

  const [accessToken, accessTokenSecret] = await Secrets.getTokens();

  try {
    await axios.post(url, {
      status,
      accessToken,
      accessTokenSecret,
    });

    window.showInformationMessage(`Tweet posted!`);
  } catch (err) {
    const { response } = err as AxiosError;
    if (response) {
      const { status } = response;
      if (status === 429) {
        window.showErrorMessage(
          "ERR: Too many requests. Please try again later."
        );
      } else {
        window.showErrorMessage("ERR: Failed to post.");
      }
    } else {
      window.showErrorMessage("ERR: Something went wrong");
    }
  }
};

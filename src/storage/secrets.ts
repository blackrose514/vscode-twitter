import { SecretStorage } from "vscode";
import { PREFIX } from "../const";

const ATK_KEY = `${PREFIX}-access-token`;
const ATS_KEY = `${PREFIX}-access-token-secret`;

export default class Secrets {
  static storage: SecretStorage;

  static async setTokens(accessToken: string, accessTokenSecret: string) {
    await this.storage.store(ATK_KEY, accessToken);
    await this.storage.store(ATS_KEY, accessTokenSecret);
  }

  static async getTokens() {
    const accessToken = this.storage.get(ATK_KEY);
    const accessTokenSecret = this.storage.get(ATS_KEY);

    return Promise.all([accessToken, accessTokenSecret]);
  }

  static async deleteTokens() {
    await this.storage.delete(ATK_KEY);
    await this.storage.delete(ATS_KEY);
  }
}

import { Memento } from "vscode";
import { PREFIX } from "../const";

const SN_KEY = `${PREFIX}-screen-name`;

export default class GlobalState {
  static state: Memento;

  static async setScreenName(name: string) {
    await this.state.update(SN_KEY, name);
  }

  static getScreenName() {
    return this.state.get<string>(SN_KEY);
  }
}

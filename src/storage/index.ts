import { Memento, SecretStorage } from "vscode";
import GlobalState from "./globalState";
import Secrets from "./secrets";

interface Context {
  globalState: Memento;
  secrets: SecretStorage;
}

const initStorage = ({ globalState, secrets }: Context) => {
  Secrets.storage = secrets;
  GlobalState.state = globalState;
};

export { initStorage, Secrets, GlobalState };

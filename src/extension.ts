import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vstodo" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  // refresh command on vscode to refresh webview and open dev tools
  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.refresh", () => {
      // refresh
      HelloWorldPanel.kill();
      HelloWorldPanel.createOrShow(context.extensionUri);
      // opens dev tools
      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 500);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.askQuestion", async () => {
      const answer = await vscode.window.showInformationMessage(
        "How was your day?",
        "good",
        "bad"
      );
      if (answer === "bad") {
        vscode.window.showInformationMessage("That Sucks!");
      } else {
        console.log(answer);
      }
    })
  );
}

export function deactivate() {}

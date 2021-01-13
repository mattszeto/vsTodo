import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vstodo-sidebar", sidebarProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  // refresh command on vscode to refresh webview and open dev tools
  // currently set to alt + r (on vscode)
  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.refresh", async () => {
      // refresh panel
      // HelloWorldPanel.kill();
      // HelloWorldPanel.createOrShow(context.extensionUri);
      // refresh sidebar
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.vstodo-sidebar-view"
      );
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

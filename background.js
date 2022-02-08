/**
 * Returns all of the registered extension commands for this extension
 * and their shortcut (if active).
 *
 */
let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (let command of commands) {
    // Note that this logs to the Add-on Debugger's console: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Debugging
    // not the regular Web console.
    console.log(command);
  }
});

/**
 * Fired when a registered command is activated using a keyboard shortcut.
 *
 * Commands of type "Ctrl+Shift+1" will automatically be converted to 
 * "Command+Shift+U" on Mac;
 */
browser.commands.onCommand.addListener((command) => {
  // console.log("Got a command", command);
  // `command` will be "play-soldier", "play-spear", etc. as in manifest

  browser.tabs.query({currentWindow: true, active: true})
    .then((tabArray) => {
      let tabId = tabArray[0].id;

      browser.tabs.sendMessage(tabId, {
        command: "play-card",
        rank: command.substring(5)
      });
    });
});

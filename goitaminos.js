(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const ranks = {
    "none": "soldier",
    "-100": "horse",
    "-200": "spear",
    "-300": "silver_dragon",
    "-400": "gold_dragon",
    "-500": "madman",
    "-600": "tower",
    "-700": "empress",
  };


  /**
   * Listen for messages from the background script.
   * Search for the requested card and, if found, click it.
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "play-card") {
      console.log("Find requested card to play", message.rank);

      for (const node of document.querySelectorAll("#myhand .kami_outlinedCard").values()) {
        const bgPos = node.style["background-position"]
        const cardType = bgPos ? ranks[bgPos.substring(0, 4)] : "soldier";
        if (cardType == message.rank) {
          console.log("Play this card", node);
          node.click();
          break;
        }
      }
    }
  });

})();
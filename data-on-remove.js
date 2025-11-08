import { attribute, beginBatch, endBatch } from "datastar";

let onRemovalEntries = [];

let observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (!m.removedNodes.length) {
      return;
    }

    const removedNodes = Array.from(m.removedNodes ?? []);

    onRemovalEntries.forEach((e) => {
      if (removedNodes.includes(e.node) && !document.body.contains(e.node)) {
        e.callback(m.target);
      }
    });
  });

  // Clean up any entries that were marked as removed once we have executed their callback
  onRemovalEntries = onRemovalEntries.filter((e) => !e.isRemoved);
});

observer.observe(document.body, { childList: true, subtree: true });

attribute({
  name: "on-remove",
  requirement: {
    key: "denied",
    value: "must",
  },
  argNames: ["parent"],
  apply: ({ rx, el }) => {
    let callback = (parent) => {
      beginBatch();
      rx(parent);
      endBatch();
    };

    onRemovalEntries.push({ node: el, callback, isRemoved: false });

    return () => {
      onRemovalEntries = onRemovalEntries.map((e) => {
        if (e.node === el) {
          e.isRemoved = true;
        }
        return e;
      });
    };
  },
});

# data-on-remove

A custom [Datastar](https://data-star.dev) attribute plugin that runs an expression when the element is removed from the DOM.

```html
<button
  data-on:click="el.remove()"
  data-on-remove="console.log('I removed myself', el)"
>
  Click to remove
</button>
```

[Live demo](https://threadgold.nz/demos/data-on-remove)

## Get started

The plugin expects you to provide an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) that specifies the location of the `datastar` module. For example:

```html
<script type="importmap">
  {
    "imports": {
      "datastar": "https://cdn.jsdelivr.net/gh/starfederation/datastar@1.0.0-RC.6/bundles/datastar.js"
    }
  }
</script>
<script type="module" src="https://cdn.jsdelivr.net/gh/regaez/data-on-remove@1.0.0/data-on-remove.min.js"></script>
```

# Why?

There are various reasons, some better than others, why you might want to be able to run an expression when an element is removed from the DOM. For example:

1. **Performance telemetry;** measure client-side performance, e.g. the time between when a user interaction starts and when the server responds with a `PatchElements` event that removes some HTML.
1. **Security/monitoring;** perhaps you are displaying some sensitive information, such as access tokens, payment information, etc., and want the client to confirm with the server that the content is no longer shown, instead of blindly trusting that a `PatchElements` event was successful.
1. **Signal cleanup;** you may need the client to delete signals when the only component they are associated with no longer exists on the page (**Disclaimer:** _if you care about following an idiomatic Datastar approach, this is likely not necessary, or may be better accomplished by your server via a `PatchSignals` event_).

## Documentation

Within a `data-on-remove` expression, you have access to the following special variables:

- `el`; the element that the `data-on-remove` attribute was attached to. 
- `parent`; the element that was the parent of the removed node.

For example:

```html
<section>
  <button
    data-on:click="el.remove()"
    data-on-remove="console.log({ el, parent })"
  >
    Click to remove
  </button>
<section>
```
When the button is clicked, this will log `{ el: button, parent: section }` to the console. Since the expression is executed _after_ the element has already been removed from the DOM, you cannot access the parent via `el.parentElement`, so it is provided for you by the plugin.

You can view live examples here: https://threadgold.nz/demos/data-on-remove 

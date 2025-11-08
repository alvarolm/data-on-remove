# data-on-remove

A custom Datastar attribute plugin that runs an expression when the element is removed from the DOM.

## Get started

The plugin expects you to define an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) that specifies the location of the `datastar` module. For example:

```html
<script type="importmap">
  {
    "imports": {
      "datastar": "https://cdn.jsdelivr.net/gh/starfederation/datastar@1.0.0-RC.6/bundles/datastar.js"
    }
  }
</script>
<script type="module" src="https://cdn.jsdelivr.net/gh/regaez/data-on-removal@1.0.0/data-on-remove.min.js"></script>
```

## Documentation

You can view documentation and a live demo of the plugin, with some example uses, here: https://threadgold.nz/demos/data-on-remove

# Shortcodes to know

Overwriting image tag attributes with `[markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs). Work on anything else too.

```
This is a paragraph with a class name. {.class}

![alt](./images/image.png){#id}
```

Load images before fold for example if the `loading:lazy` or `decoding:async` options are set in `eleventyImageTransformPlugin`

`![alt](./images/image.png){loading="eager"}`

`![alt](./images/image.png){eleventy:formats="auto,avif" eleventy:widths="900,1200"}`

# Clipmaster 9000

---

## Follow Along Notes

### Getting the Renderer Process Set Up

We're using Jade really just to see `electron-compile` in action.

```jade
doctype html
html
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width,initial-scale=1')
    meta(http-equiv='Content-Security-Policy', content="default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src *;")
    title Clipmaster 9000
    link(rel='stylesheet', href='style.css')
  body
    #application
    script.
      require('./renderer');
```


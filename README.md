The latest version of [`cssnano`](https://github.com/cssnano/cssnano/) (`5.0.1`) 's default preset breaks border related styles by `cssDeclarationSorter`.

This repo is self-contained example to reproduce the issue.
First please run `npm ci` to install the relevant packages in this directory.

## Input (`testcase.css` in this repo)

This should show purple top border.

```css
.border-top-test {
  border-color: purple;
  border-top-width: 1px;
  border-top-style: solid;
}
```

## Output (NG)

This output can be obtained by running `./node_modules/.bin/postcss testcase.css`

With `cssnano@5.0.1`'s `default` preset, The output will be the following and this will show a top border with `currentColor`, not purple. This is because `border-top` shorthand will override the color with the initial value, `currentColor`.

```css
.border-top-test {
  border-color: purple;
  border-top: 1px solid;
}
```

## Output with `cssDeclarationSorter: false` (OK)

This output can be obtained by running `CSSNANO_DISABLE_CSS_DECLARATION_SORTER=1 ./node_modules/.bin/postcss testcase.css`

When we disable `cssDeclarationSorter`, `border-color` will be put after `border-top` and the color will be purple, which is the correct behavior.

```css
.border-top-test {
  border-top: 1px solid;
  border-color: purple;
}
```

module.exports = {
  plugins: [
    require("cssnano")({
      preset: [
        "default",
        process.env.CSSNANO_DISABLE_CSS_DECLARATION_SORTER
          ? {
              cssDeclarationSorter: false,
            }
          : {},
      ],
    }),
  ],
};

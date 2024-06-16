import * as themes from '../dist/index.js';
import fs from 'fs';

const toCssString = (str) => {
  return str
    .replace(/([a-z])(\d)/, '$1-$2')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();
};

const generateThemeCssVariables = () => {
  const cssString = [];

  Object.entries(themes.vars).forEach(([key, value]) => {
    if (key === 'colors') {
      Object.entries(value.$static).forEach(([theme, themeColor]) => {
        if (theme === 'light') {
          const selector = ':root';

          const cssVariables = Object.entries(themeColor)
            .map(([color, scales]) =>
              Object.entries(scales)
                .map(
                  ([scale, value]) =>
                    `  --${toCssString(color)}-${scale}: ${value};`
                )
                .join('\n')
            )
            .join('\n\n');

          cssString.push(`${selector} {\n${cssVariables}\n}\n`);

          return;
        }

        if (theme === 'dark') {
          const selector = ':root .theme-dark';

          const cssVariables = Object.entries(themeColor)
            .map(([color, scales]) =>
              Object.entries(scales)
                .map(
                  ([scale, value]) =>
                    `  --${toCssString(color)}-${scale}: ${value};`
                )
                .join('\n')
            )
            .join('\n\n');

          cssString.push(`${selector} {\n${cssVariables}\n}\n`);

          return;
        }
      });

      return;
    }

    const selector = ':root';

    const cssVariables = Object.entries(value)
      .map(([property, scales]) =>
        Object.entries(scales)
          .map(
            ([scale, value]) =>
              `  --${toCssString(property)}-${scale}: ${value};`
          )
          .join('\n')
      )
      .join('\n\n');

    cssString.push(`${selector} {\n${cssVariables}\n}\n`);

    return;
  });

  return cssString.join('\n');
};

const generateThemeCssClasses = () => {
  const cssString = [];

  Object.entries(themes.classes).forEach(([_, value]) => {
    const cssClasses = Object.entries(value)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(([subKey, subValue]) => {
            const className = `.${toCssString(mainKey)}-${toCssString(subKey)}`;
            const styleProperties = Object.entries(subValue)
              .map(
                ([property, value]) => `  ${toCssString(property)}: ${value};`
              )
              .join('\n');

            return `${className} {\n${styleProperties}\n}\n`;
          })
          .join('\n')
      )
      .join('\n');

    cssString.push(cssClasses);
  });

  return cssString.join('\n');
};

const generateThemeCss = () => {
  const variables = generateThemeCssVariables();
  const classes = generateThemeCssClasses();

  fs.writeFileSync('dist/themes.css', [variables, classes].join('\n'));
};

generateThemeCss();

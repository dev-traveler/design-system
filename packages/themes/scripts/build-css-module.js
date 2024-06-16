import * as themes from '../dist/index.js';
import fs from 'fs';

const toCssString = (str) => {
  return str
    .replace(/([a-z])(\d)/, '$1-$2')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();
};

const generateThemeCSSVariables = () => {
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

          cssString.push(`${selector} {\n${cssVariables}\n}`);
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
        }
      });
    }
  });

  return cssString.join('\n');
};

const generateThemeCSS = () => {
  const variables = generateThemeCSSVariables();
  fs.writeFileSync('dist/themes.css', variables);
};

generateThemeCSS();

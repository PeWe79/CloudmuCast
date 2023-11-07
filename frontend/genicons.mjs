/*
 * Originally based on bootstrap-icons-vue:
 * https://github.com/tommyip/bootstrap-icons-vue/blob/master/src/codegen.js
 */

import fs from 'fs';
import path from 'path';
import * as url from 'url';
import {JSDOM} from "jsdom";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const outputPath = path.resolve(__dirname, './vue/components/Common/icons.ts');
const iconsPath = path.resolve(__dirname, './icons');

const materialIconsViewBox = '0 -960 960 960';
const bootstrapIconsViewBox = '0 0 16 16';

const templateHeader = `\
// This file is generated by genicons.mjs. Do not modify directly.
export interface Icon {
  viewBox: string,
  contents: string
}
const materialIconsViewBox: string = '${materialIconsViewBox}';
const bootstrapIconsViewBox: string = '${bootstrapIconsViewBox}';
`;

const iconComponentTemplate = `export const Icon{{componentName}}: Icon = {
  viewBox: {{svgViewBox}},
  contents: '{{svgContents}}'
};`;

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function kebab2pascal(kebab) {
    return kebab.split('_').map(capitalize).join('');
}

function genIconComponents() {
    const filenames = fs.readdirSync(iconsPath);
    const iconComponentExports = [];

    for (const filename of filenames) {
        const componentName = kebab2pascal(filename.substring(0, filename.length - 4));

        const content = fs.readFileSync(path.join(iconsPath, filename), {encoding: 'utf-8'});
        const svgDom = new JSDOM(content, {
            contentType: "image/svg+xml"
        });

        const svgInner = svgDom.window.document.getElementsByTagName('svg')[0];

        let svgViewBox = svgInner.getAttribute('viewBox');
        if (svgViewBox === materialIconsViewBox) {
            svgViewBox = 'materialIconsViewBox';
        } else if (svgViewBox === bootstrapIconsViewBox) {
            svgViewBox = 'bootstrapIconsViewBox';
        } else {
            svgViewBox = `'${svgViewBox}'`;
        }

        const svgContents = svgInner.innerHTML.trim().replace(
            ' xmlns="http://www.w3.org/2000/svg"',
            ''
        );

        const iconComponentExport = iconComponentTemplate
                .replace('{{componentName}}', componentName)
                .replace('{{svgViewBox}}', svgViewBox)
                .replace('{{svgContents}}', svgContents);

        iconComponentExports.push(iconComponentExport);
    }

    fs.writeFileSync(
            outputPath,
            templateHeader + iconComponentExports.join('\n')
    );
}

genIconComponents();

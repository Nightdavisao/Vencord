/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "GreenText",
    description: "Makes all the text that preceeds the greater than symbol green",
    authors: [Devs.Nightdavisao],
    css: `
    .greentext-chan {
        color: #789922;
    }
    `,
    patches: [
        // Webpack Module 62741
        // replaces the block quote with green text
        {
            find: "l.renderElement=function(e){",
            replacement: {
                match: /case"blockQuote":(.{0,244})\)\);/,
                replace: "case\"blockQuote\":return (0,r.jsxs)(\"div\",Kc(Wc({}, o), {className:\"greentext-chan\",children:[i]}));"
            }
        },
        {
            find: "var ie={blockQuote:{react:function(e,t,n){",
            replacement: {
                match: /return\(0,r\.jsxs\)(.{0,162})\)/,
                replace: "return(0,r.jsxs)(\"span\", {className:\"greentext-chan\", children: t(e.content, n)})"
            }
        }
    ],
    start() {
        // adds the style
        const style = this.style = document.createElement("style");
        style.textContent = this.css;
        style.id = "greentext-css";
        document.head.appendChild(style);
    },
    stop() {
        this.style?.remove();
    }
});

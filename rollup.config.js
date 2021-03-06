import resolve from "rollup-plugin-node-resolve";

/**
 * Create a bundle configuration for a given input/output
 * @param {Path of the root JavaScript document} input 
 * @param {Path of the output JavaScript bundle} output 
 */
function bundleFor(input, output) {
    return {
        input,
        output: {
            file: output,
            format: "cjs"
        },
        plugins: [
            // resolve dependencies from node_modules
            resolve({
                customResolveOptions: {
                    moduleDirectory: "node_modules"
                }
            })
        ]
    }
}

// Provide multiple bundles
// one for each interactive sheet
export default [
    bundleFor("7.rxjs_realtime.js", "7/bundle.js"),
    bundleFor("8.rxjs_combining_observables.js", "8/bundle.js"),
    bundleFor("9.rxjs_websockets.js", "9/bundle.js")
];
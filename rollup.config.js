import resolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";

function bundleFor(input, output) {
    return {
        input,
        output: {
            file: output,
            format: "cjs"
        },
        sourceMap: true,
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: "node_modules"
                }
            }),
            sourcemaps()
        ]
    }
}

export default [
    bundleFor("7.rxjs_realtime.js", "7/bundle.js"),
    bundleFor("8.rxjs_combining_observables.js", "8/bundle.js")
];
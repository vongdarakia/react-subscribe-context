const esbuild = require("esbuild");

esbuild
    .build({
        entryPoints: ["react-subscribe-context/index.ts"],
        bundle: true,
        outfile: "dist/index.js",
    })
    .catch(() => process.exit(1));

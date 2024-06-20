import run from "@dev-traveler/esbuild-config";
import pkg from "./package.json" assert { type: "json" };

run({ pkg });

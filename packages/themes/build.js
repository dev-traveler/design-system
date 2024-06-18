import run from "@dev-traveler/esbuild-config";
import pkg from "./package.json" assert { type: "json" }; // #4

run({ pkg });

// #4.
// 이 구문은 Node.js에서 JSON 모듈을 가져오는 새로운 방식입니다. assert는 가져오는 모듈의 타입을 명시적으로 지정하는 데 사용됩니다.
// 이 코드는 ./package.json 파일을 가져와서 pkg 변수에 할당합니다.
//
// 이전 버전의 Node.js에서는 require를 사용하여 JSON 파일을 가져왔습니다:
//
// const pkg = require('./package.json');

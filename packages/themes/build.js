import esbuild from 'esbuild';
import pkg from './package.json' assert { type: 'json' }; // #4

const dev = process.argv.includes('--dev'); // #3
const minify = !dev;

const watch = process.argv.includes('--watch');

// #5
const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

const baseConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true, // #1
  outdir: 'dist',
  minify,
  watch,
  external,
};

// #2
Promise.all([
  esbuild.build({
    ...baseConfig,
    format: 'esm',
  }),
  esbuild.build({
    ...baseConfig,
    format: 'cjs',
    outExtension: {
      '.js': '.cjs',
    },
  }),
]).catch(() => {
  console.error('Build failed');
  process.exit(1);
});

// #1.
// 소스 맵(Source Map)은 빌드 과정에서 변환된 코드와 원본 코드 사이의 매핑을 제공하는 파일입니다. 이는 주로 디버깅에 사용됩니다.
// 변환된 코드에서 오류가 발생하면, 디버거는 변환된 코드의 위치를 보여줍니다. 이는 원본 코드의 어느 부분이 문제인지 파악하기 어렵습니다.
// 이때 소스 맵을 사용하면, 디버거는 원본 코드의 위치를 보여줄 수 있습니다. 소스 맵은 변환된 코드와 원본 코드 사이의 위치 매핑 정보를 가지고 있기 때문입니다.
// 예를 들어, original.min.js 파일에서 오류가 발생했을 때, 소스 맵을 사용하면 디버거는 original.js 파일의 해당 위치를 가리킬 수 있습니다. 이렇게 하면 원본 코드에서 문제를 더 쉽게 찾을 수 있습니다.

// #2.
// esbuild.build 함수는 Promise를 반환합니다. 따라서 Promise.all 함수를 사용하여 병렬로 빌드할 수 있습니다.

// #3.
// process.argv는 Node.js에서 제공하는 전역 객체로, 현재 실행 중인 프로세스의 명령줄 인수를 배열로 제공합니다.
// 예를 들어, 다음과 같이 실행하면:
//
// node myScript.js arg1 arg2
//
// process.argv 배열은 다음과 같이 됩니다:
//
// [
//   '/path/to/node', // Node.js 실행 파일의 경로
//   '/path/to/myScript.js', // 현재 실행 중인 JavaScript 파일의 경로
//   'arg1', // 첫 번째 인수
//   'arg2' // 두 번째 인수
// ]
//
// 이를 통해 스크립트는 사용자가 제공한 명령줄 인수를 읽을 수 있습니다. 이는 스크립트의 동작을 사용자가 커스터마이즈할 수 있게 해줍니다.

// #4.
// 이 구문은 Node.js에서 JSON 모듈을 가져오는 새로운 방식입니다. assert는 가져오는 모듈의 타입을 명시적으로 지정하는 데 사용됩니다.
// 이 코드는 ./package.json 파일을 가져와서 pkg 변수에 할당합니다.
//
// 이전 버전의 Node.js에서는 require를 사용하여 JSON 파일을 가져왔습니다:
//
// const pkg = require('./package.json');

// #5.
// dependencies와 peerDependencies는 패키지가 의존하는 다른 패키지들을 나타냅니다.
// 이를 통해 패키지가 의존하는 다른 패키지들을 알 수 있습니다.
// 이 코드는 dependencies와 peerDependencies를 합쳐서 external 배열에 넣습니다.
// 이 배열은 외부 모듈로 처리되어 번들링되지 않습니다.
// 번들링 대상이 아니라는 것을 esbuild에 알려줍니다.
//
// dependencies: 이는 프로젝트가 필요로 하는 외부 패키지를 나타냅니다.
// npm install을 실행하면 dependencies에 나열된 모든 패키지가 설치됩니다.
// 이 패키지들은 프로젝트의 node_modules 디렉토리에 설치되며, 프로젝트가 이 패키지들을 직접적으로 사용합니다.
//
// peerDependencies: 이는 프로젝트가 호환되어야 하는 외부 패키지를 나타냅니다.
// peerDependencies에 나열된 패키지는 자동으로 설치되지 않습니다.
// 대신, 이 패키지들은 프로젝트를 사용하는 사용자에 의해 설치되어야 합니다.
// 이는 주로 플러그인이나 라이브러리와 같이 호스트 프로젝트의 환경에 통합되어야 하는 패키지에서 사용됩니다.
// peerDependencies를 사용하면, 패키지가 호환되는 버전의 호스트 패키지와 함께 사용되도록 할 수 있습니다.
//
// 예를 들어, React 컴포넌트 라이브러리를 만들고 있다면, react와 react-dom을 peerDependencies로 지정할 수 있습니다.
// 이렇게 하면 라이브러리를 사용하는 프로젝트는 자신의 React 버전을 사용하게 됩니다.
// 이는 여러 버전의 React가 동시에 로드되는 것을 방지하고, 라이브러리가 호스트 프로젝트의 React 환경에 잘 통합되도록 합니다.

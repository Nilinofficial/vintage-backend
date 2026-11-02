npm install express
npm install -D typescript tsx @types/node @types/express

express — HTTP server framework.
typescript — Type checking and compilation.
tsx — Runs TypeScript directly with watch mode.
@types/node — Type definitions for Node.js.
@types/express — Type definitions for Express.

npx tsc --init

Replace the relevant settings in tsconfig.json:

{
"compilerOptions": {
"target": "ES2022",
"module": "node16",
"moduleResolution": "node16",
"rootDir": "./src",
"outDir": "./dist",
"strict": true,
"esModuleInterop": true,
"skipLibCheck": true
},
"include": ["src"]
}

Configure package.json

Add these scripts:

"scripts": {
"dev": "tsx watch src/index.ts",
"build": "tsc",
"start": "node dist/index.js",
"typecheck": "tsc --noEmit"
}

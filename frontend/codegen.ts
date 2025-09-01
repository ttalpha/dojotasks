import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5000/graphql",
  documents: "src/schema/*.ts",
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        useTypeImports: true, // remember to add this to avoid error, see https://github.com/dotansimha/graphql-typed-document-node/issues/152#issuecomment-1687191387
      },
    },
  },
};

export default config;

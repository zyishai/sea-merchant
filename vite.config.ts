import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import stylin from '@stylin/vite-plugin';
import tsStylin from '@stylin/vite-plugin/ts';

installGlobals();

export default defineConfig({
  server: {
    port: 3000
  },
  ssr: {
    noExternal: ['@holycow/state']
  },
  plugins: [remix(), tsconfigPaths(), stylin(), tsStylin()],
});

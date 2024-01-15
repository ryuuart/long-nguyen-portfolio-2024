# Emergence Web

My starter for creating client-side, browser libraries. There's more work to be done, but it's usable.

## Getting Started

1. Change `default.env` to `.env` with the environment variables you'd like.

2. Update the `LICENSE` you find appropriate. Right now, it's the [MIT License](https://opensource.org/license/mit/).

3. Configure or customize the provided `example` package in `packages/example`.

4. Customize the `.github/workflow` actions.

## Features

I use a whole mix of tech to get all this running.

1. If you use a system that [Nix](https://nixos.org/) supports, then there's a [flake](https://nixos.wiki/wiki/Flakes) that will set the correct [NodeJS](https://nodejs.org/) and [pnpm](https://pnpm.io/) version for you.

2. Nix [direnv](https://direnv.net/) will also automatically load environment variables and the Nix development shell.

3. [pnpm workspaces](https://pnpm.io/workspaces) and [Nx](https://nx.dev/) are used to manage this monorepo.

4. A basic `.eslintrc.js` is provided for basic linting.

5. A basic `.prettierrc` is provided for standard formatting.

6. Nx is configured to always build package dependencies before the package itself.

7. The example package is preconfigured with [vite](https://vitejs.dev/) and [vitest](https://vitest.dev/) to build a basic library.

8. A basic publishing Github Actions workflow is provided configured with [changesets](https://github.com/changesets/changesets).

9. A `web` packages configuration for anything that might be published online

## License

All of this work is under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1"></a>

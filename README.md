# Ensy

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## How this project has been setup

- `npx create-nx-workspace@latest ensy --preset=ts --packageManager=pnpm && cd ensy`
- `pnpm install -D @nx/react @nx/nest @commitlint/cli @commitlint/config-conventional husky`
- `nx g @nx/react:app client`
- `nx g @nx/react:setup-tailwind --project=client`
- `nx g @nx/nest:app api `

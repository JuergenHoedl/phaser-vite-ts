# Phaser Vite TypeScript Template

This is a Phaser 3 project  that uses Vite for bundling. It supports hot-reloading for quick development workflow, includes TypeScript support and scripts to generate production-ready builds.

### Versions

- [Phaser 3.87.0](https://github.com/phaserjs/phaser)
- [Vite 5.3.1](https://github.com/vitejs/vite)
- [TypeScript 5.4.5](https://github.com/microsoft/TypeScript)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `dist` folder |

## Run the game locally

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm run dev`.

The local development server runs on `http://localhost:8080` by default.

## Contribute

Once the server is running you can edit any of the files in the `src` folder. Vite will automatically recompile your code and then reload the browser.

## Project Structure

We have provided a default project structure to get you started. This is as follows:

- `index.html` - A basic HTML page to contain the game.
- `src` - Contains the game source code.
- `public/assets` - Contains the static assets used by the game.
- `src/main.ts` - The main **entry** point. This contains the game configuration and starts the game.
- `src/vite-env.d.ts` - Global TypeScript declarations, provide types information.
- `src/scenes/` - The Phaser Scenes are in this folder.
- `src/data/` - Contains data classes like global game information.
- `src/ui/` - Contains ui objects like a healthbar
- `src/objects/` - Contains game objects like player, NPCs or other objects


## Deploying to Production

After you run the `npm run build` command, your code will be built into a single bundle and saved to the `dist` folder, along with any other assets your project imported, or stored in the public assets folder.

In order to deploy your game, you will need to upload *all* of the contents of the `dist` folder to a public facing web server.

# Interactive Blockchain Security Lab - User Guide

## What this website is

The Interactive Blockchain Security Lab is an educational website for exploring blockchain security as a layered trust problem. It connects protocol, network, and application concepts with diagrams, real incident summaries, an interactive lab, and thesis-based data views.

The website is designed for classroom and research use. It does not connect to wallets or live blockchains and does not run exploit code.

## Start the website

### Automated setup

Requirements:

- Node.js 20, 21, 22, 23, or 24
- npm
- Git Bash, WSL, macOS, or Linux for the Bash launcher

From the project directory, run:

```bash
bash ./run.sh
```

The script installs the exact dependencies from `package-lock.json` and starts the development server. Open the URL printed by Next.js, normally:

```text
http://localhost:3000
```

Press `Ctrl+C` in the terminal to stop the server.

For a production build, run:

```bash
bash ./run.sh --production
```

If the dependencies are already installed, setup can be skipped:

```bash
bash ./run.sh --skip-install
```

Show every launcher option with:

```bash
bash ./run.sh --help
```

### Manual setup

The same development setup can be run without Bash:

```bash
npm ci
npm run dev
```

This is the simplest option when using Windows PowerShell or Command Prompt.

## Homepage controls and UX

### Explore the 3D blockchain network

The large network at the top of the homepage is a real-time 3D model. Its blocks represent parts of the security lab, while the connections show how those areas relate.

- Drag in any direction to rotate the network.
- Release after dragging to let the model continue with gentle momentum.
- Use the `+` and `-` buttons to zoom.
- Use the reset button to restore the original camera position.
- Use the arrow keys while the 3D view is focused to rotate without a pointer.
- Hover over a destination block to preview its name and highlight its path through the network.

The model slowly rotates while idle so that blocks behind the network remain discoverable.

### Open a page from a 3D block

Normal clicks and drags are reserved for exploring the model. To follow a block without accidentally rotating it:

1. Hold the `Ctrl` key. The scene enters portal mode and the destination blocks glow.
2. Keep holding `Ctrl` and hover over a block to preview where it leads.
3. Click the block.
4. The selected block zooms forward and a full-screen portal transition opens its page.
5. Release `Ctrl` to return to normal rotation mode if no destination was selected.

The interactive blocks lead to these areas:

| Destination | What it opens |
| --- | --- |
| Framework | Layer-by-CIA security matrix |
| Diagrams | Step-through security diagrams |
| Cases | Documented blockchain incident studies |
| Lab | Interactive state visualizer |
| Insights | Detection and ML-related observations |
| Data | Thesis-based charts and summaries |
| About | Thesis context, scope, and links |
| Feedback | Local feedback notes form |

The header navigation remains available as a direct alternative to the 3D controls.

### Read the crystal information panel

The panel below the model introduces the security idea behind the lab. Hovering or focusing the panel increases its clarity and produces a crystal-like shine. This effect is visual only; the text remains readable without hovering.

### Browse the module card deck

The portrait cards near the bottom of the homepage provide another way to open each module.

- Drag the front card left or right to move it behind the stack.
- Click the left or right arrow beside the deck.
- Focus the deck and use the keyboard `Left Arrow` or `Right Arrow` key.
- Select the link on the front card to open that module.

The deck loops continuously. After the final card, the first card appears again. The slight rotations and offsets are intentional: they make the cards behind the active card visible.

## Website sections

| Page | How to use it |
| --- | --- |
| Home | Rotate the network, select a portal block, or browse the module deck. |
| Framework | Explore security layers, CIA properties, threats, assumptions, and defenses. |
| Diagrams | Select a scenario and use its Play, Next step, and Reset controls. |
| Cases | Open an incident card to study its failure, layer, impact, and lesson. |
| Lab | Change the scenario state and observe how re-entrancy and bridge assumptions affect the result. |
| Insights | Review the limits and possible roles of ML-assisted detection across the cases. |
| Data | Read charts derived from the thesis data and compare the represented incidents. |
| About | Review the academic context, artefact scope, and project references. |
| Feedback | Enter local notes about the application experience. |

## Keyboard and accessibility

- Press `Tab` and `Shift+Tab` to move through interactive controls.
- Press `Enter` or `Space` to activate focused buttons and links.
- Use the skip link at the beginning of the page to move directly to the main content.
- Visible focus indicators show the currently selected control.
- Reduced-motion operating system preferences limit nonessential animation.
- The main navigation can always be used if 3D input is inconvenient.

## Development checks

Run these commands from the project directory:

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

The end-to-end test command uses the installed Google Chrome browser.

## Troubleshooting

### The page does not open on port 3000

Check the terminal output. If port 3000 is already occupied, Next.js may choose another local port. Open the exact URL shown in the terminal.

### The 3D scene is blank or slow

Use a current Chrome, Edge, Firefox, or Safari browser and enable hardware acceleration. The scene requires WebGL. The navigation and the rest of the website can still be used if WebGL is unavailable.

### Clicking a block rotates the scene instead of opening a page

Hold `Ctrl` before clicking. Portal mode disables rotation and zoom so the click can select a destination safely.

### Dragging a card opens its link

Start the drag from the body of the front card and move it horizontally. Use the side arrows if a touchpad or touchscreen makes the gesture difficult.

### Dependency installation fails

Verify the installed versions:

```bash
node --version
npm --version
```

Node.js must be version 20 through 24. Then run `npm ci` again from the directory containing `package.json`.

## Safety and academic scope

The application is an explanatory educational artefact. It contains no private keys, wallet connection, RPC calls, contract deployment, live-chain actions, or executable attack tooling. The selected incidents are a purposive educational sample and are not a statistical representation of all blockchain security failures.

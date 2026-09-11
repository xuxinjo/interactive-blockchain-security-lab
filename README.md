# Interactive Blockchain Security Lab

The educational artefact accompanying the Bachelor's thesis **AI Security: Security in Blockchain Systems**.

The lab organises blockchain security concepts across the protocol, network, and application layers. It supports learning through a layered framework, diagrams, selected incident summaries, a small state visualiser, and descriptive charts.

## Thesis context

Subtitle: **A layered security framework and an educational artefact**

Author: Rrezon Halilabazi  
University: WSB University  
Supervisor: Dr. inż. Adrian Kapczyński

The six case studies are:

1. The DAO (2016)
2. Parity multi-signature wallet (2017)
3. Bitcoin Gold (2018/2020)
4. Poly Network (2021)
5. Wormhole (2022)
6. Ronin (2022)

## Status

This repository contains the final version of the Interactive Blockchain Security Lab, the completed educational artefact of the thesis. Release: v1.0.0.

- Live deployment: https://interactive-blockchain-security-lab.vercel.app
- Repository: https://github.com/xuxinjo/interactive-blockchain-security-lab

## Safety

The lab is intended for classroom explanation. It contains no exploit code, wallet connection, RPC call, private key, contract deployment, or live-chain action.

## Run locally

Requirements: Node.js 20-24 and npm.

Automated setup and launch from Git Bash, WSL, macOS, or Linux:

```bash
bash ./run.sh
```

Or run the setup manually:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

See [USER_GUIDE.md](USER_GUIDE.md) for the complete setup instructions, 3D controls, module UX, accessibility, and troubleshooting.

## Build and test

```bash
npm run lint
npm run build
npm run test
npm run test:e2e
```

## Repository structure

- `app/` - Next.js routes and shared layout
- `components/` - reusable interface components
- `content/` - case studies, framework data, diagrams, chart data, and thesis metadata
- `lib/` - shared types, thesis mapping, and lab state
- `public/` - static public assets
- `tests/` - unit and browser tests

## Academic note

The website summarises selected material from the thesis. The six-case sample is purposive and should not be treated as a statistical representation of all blockchain incidents.

## License

MIT

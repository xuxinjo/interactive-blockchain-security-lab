# Interactive Blockchain Security Lab

A concept-stage educational artefact accompanying the Bachelor's thesis **AI Security: Security in Blockchain Systems**.

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

This repository contains the concept-stage prototype of the Interactive Blockchain Security Lab. The deployment is provisional, and independent user evaluation has not yet been completed.

- Provisional deployment: https://interactive-blockchain-security-lab.vercel.app
- Repository: https://github.com/xuxinjo/interactive-blockchain-security-lab

## Safety

The lab is intended for classroom explanation. It contains no exploit code, wallet connection, RPC call, private key, contract deployment, or live-chain action.

## Run locally

Requirements: Node.js 20-24 and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

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

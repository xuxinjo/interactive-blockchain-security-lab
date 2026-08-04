#!/usr/bin/env bash

set -Eeuo pipefail

usage() {
  cat <<'EOF'
Usage: bash ./run.sh [option]

Install the project dependencies and start the Interactive Blockchain Security Lab.

Options:
  --development   Start the Next.js development server (default).
  --production    Create a production build and start it.
  --skip-install  Do not run npm ci before starting.
  -h, --help      Show this help message.

Examples:
  bash ./run.sh
  bash ./run.sh --skip-install
  bash ./run.sh --production
EOF
}

mode="development"
install_dependencies=true

while (($# > 0)); do
  case "$1" in
    --development)
      mode="development"
      ;;
    --production)
      mode="production"
      ;;
    --skip-install)
      install_dependencies=false
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      printf 'Unknown option: %s\n\n' "$1" >&2
      usage >&2
      exit 2
      ;;
  esac
  shift
done

project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$project_dir"

if ! command -v node >/dev/null 2>&1; then
  printf 'Error: Node.js is not installed or is not available in PATH.\n' >&2
  printf 'Install Node.js version 20 through 24, then run this script again.\n' >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  printf 'Error: npm is not installed or is not available in PATH.\n' >&2
  exit 1
fi

if [[ ! -f package.json || ! -f package-lock.json ]]; then
  printf 'Error: package.json or package-lock.json is missing from %s.\n' "$project_dir" >&2
  exit 1
fi

node_version="$(node --version)"
node_major="$(node -p "process.versions.node.split('.')[0]")"

if [[ ! "$node_major" =~ ^[0-9]+$ ]] || ((node_major < 20 || node_major > 24)); then
  printf 'Error: Node.js %s is not supported. Use Node.js version 20 through 24.\n' "$node_version" >&2
  exit 1
fi

printf 'Project: %s\n' "$project_dir"
printf 'Node.js: %s\n' "$node_version"
printf 'npm: %s\n' "$(npm --version)"

if [[ "$install_dependencies" == true ]]; then
  printf '\nInstalling dependencies from package-lock.json...\n'
  npm ci
else
  printf '\nSkipping dependency installation.\n'
fi

if [[ "$mode" == "production" ]]; then
  printf '\nCreating the production build...\n'
  npm run build
  printf '\nStarting the production server. Open the URL printed below.\n'
  exec npm run start
fi

printf '\nStarting the development server. Open the URL printed below.\n'
exec npm run dev

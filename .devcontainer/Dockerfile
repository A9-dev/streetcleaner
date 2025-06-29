FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN curl -LsSf https://astral.sh/uv/install.sh | sh
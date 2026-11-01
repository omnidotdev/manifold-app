<div align="center">

# Manifold App

Dashboard for Manifold

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE.md)

</div>

## Overview

Manifold App is the web dashboard for [Manifold](https://manifold.omni.dev), built with [TanStack Start](https://tanstack.com/start) and React.

## Prerequisites

- [Bun](https://bun.sh) 1.3+

## Development

```bash
bun i
bun dev
```

## Diagnostics

```bash
bun test          # Run the test suite
bun test:coverage # Run tests with coverage
bun test:e2e      # Run Playwright end-to-end tests
bunx tsc --noEmit # Type-check
bun check         # Lint and format check with Biome
bun knip          # Check for unused code/deps
```

## Building

```bash
bun build
bun start
```

## License

The code in this repository is licensed under Apache 2.0, &copy; [Omni LLC](https://omni.dev). See [LICENSE.md](LICENSE.md) for more information.

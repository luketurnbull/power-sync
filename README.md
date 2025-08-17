# Power Sync

Code test for Fusion Sync. Requirements found [here](/requirements/REQUIREMENTS.md).

## Tech Stack

- [Tanstack Start](https://tanstack.com/start) - Meta framework for building web applications.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [Shadcn UI](https://ui.shadcn.com/) - Component library for building consistent UI.
- [oRPC](https://www.orpc.dev/) - RPC framework for building web applications.
- [Lucide](https://lucide.dev/) - Icon library for building consistent UI.
- [Biome](https://biomejs.dev/) - Linting and formatting for JavaScript and TypeScript.
- [Vitest](https://vitest.dev/) - Testing framework for JavaScript and TypeScript.

## Description

This application is a web application that allows users to sync their power cycles.

[Luke's requirements](/requirements/LUKES_REQUIREMENTS.md)

## Design

[Figma Design](https://www.figma.com/design/OUiOpcqthbqh32ONmmGbsz/Power-cycles?node-id=0-1&t=hUVUxnMCgc3GY9gK-1)

### Mobile

![Mobile Design](/requirements/designs/mobile.png)

### Desktop

![Desktop Design](/requirements/designs/desktop.png)

## Running the Application

To run this application:

```bash
bun install
bunx --bun run start
```

## Building the Application

To build this application for production:

```bash
bunx --bun run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
bunx --bun run test
```

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:

```bash
bunx --bun run lint
bunx --bun run format
bunx --bun run check
```

# TODO

- [x] Bomb initial code
- [x] Add requirements and designs to repository
- [x] Add the Tailwind/Shadcn styles
- [x] Create zod schemas for the data
- [x] Create oRPC call to get power cycles
- [x] Create oRPC call to update power cycles
- [ ] Add all shadcn/ui components needed

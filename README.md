# Power Sync

Code test for Fusion Sync. Requirements found [here](/requirements/REQUIREMENTS.md).

## Notes from Luke to Fusion Sync

Hello Fusion Sync,

I spent longer than 2 hours this task, closer to 4-5 hours.

In retrospect; I shouldn't have mocked the design up in Figma and shouldn't have focused on creating a separate usage for mobile users (Accordion vs Table).

I could have concentrated more on the functionality. Particularly the loading and errors states from the API. Since I didn't get that far, I didn't get to the point of adding the "sonner/toast notifications" for success and error messages as outlined in the TODOs.

If I had more time I would create a loading state that showed updated text and icons to show the user what is happening and give more feedback.

I also realised during the implementation that due to the slider, you can't start time before the end time, which goes against the requirements.

Anyway, I've got everything here in the README to checkout. Enjoy!

## Presumptions

- Adding a new timer defaults to 9:00AM - 5:00PM, enabled, and Monday - Friday
- Has to be mobile friendly UI
- Has to be able to add and delete timers
- Can't edit disabled timers
- Show errors on change

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
- [x] Add all shadcn/ui components needed
- [x] Create initial component for power timers
- [x] Create Accordion for mobile version
- [x] Create Table for desktop version
- [x] Add buttons to add and save power timers
- [x] Wrap the Accordion and Table in a Form component
- [x] Implement the logic to add and save power timers using the Form component
- [x] Create the Timer Slider component
- [x] Create the Day Selector component
- [x] Create the Enabled Toggle component
- [x] Add disabled state to the power timers
- [x] Create the Drop Down menu component with delete option
- [ ] Add saving state (Outline in the requirements this could take 20 - 30 seconds)
- [ ] Add sonner for success and error messages?
- [x] Add testing around validation using Vitest

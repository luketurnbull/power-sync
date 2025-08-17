# Luke's Additional Requirements

## Power Cycles Form Layout

### Mobile Design
- Power cycles form is displayed as an **accordion** layout
- Each timer is an accordion item with a collapsible trigger
- **Disabled timer behavior**: 
  - The toggle switch is OUTSIDE the accordion trigger so it can always be used to enable/disable timers
  - If a timer is disabled, the accordion item should be closed and the trigger should be disabled/non-interactive
  - The user cannot expand disabled timer accordions but can still toggle the timer on/off
- Include time range slider in mobile view
- Break components into reusable parts (TimerControls, etc.)

### Desktop Design  
- Power cycles form is displayed as a **table** layout using shadcn/ui Table component
- NO table headers - keep it clean and simple
- Each timer is a row in the table with all controls visible
- **Disabled timer behavior**: If a timer is disabled, all form fields within that timer row are disabled:
  - Time input fields (power off/on times)  
  - Time range slider
  - Day of week toggle buttons (use ToggleGroup component)
  - All interactive elements become non-interactive and visually disabled
- Include time range slider in each table row

## Component Structure
- Break into reusable components:
  - `TimerControls` - shared time inputs and slider
  - `DaySelector` - day of week selection using ToggleGroup
  - `TimerRow` - desktop table row
  - `TimerAccordionItem` - mobile accordion item

## UI Components
- Use shadcn/ui Table component for desktop layout (no headers)
- Use shadcn/ui ToggleGroup for day of week selection
- Use shadcn/ui component variants instead of custom style overrides
- Ensure colors match the design theme from styles.css
- Time range sliders should be visible on both mobile and desktop

## Slider Functionality
- Slider should be positioned between the power off and power on time inputs on desktop
- Slider should be functional and connected to the time inputs:
  - Left handle controls power off time
  - Right handle controls power on time
  - Moving slider handles should update the corresponding time inputs
  - Changing time inputs should update the slider position
- Slider represents 24-hour timeline (0-1440 minutes)
- Both slider and inputs should be disabled when timer is disabled

## Responsive Behavior
- The form should automatically switch between accordion (mobile) and table (desktop) layouts based on screen size
- Ensure smooth transitions and consistent functionality across both layouts
- Maintain the same validation rules and form submission logic regardless of layout
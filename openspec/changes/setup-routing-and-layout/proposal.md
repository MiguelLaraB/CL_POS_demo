# Proposal: Setup Routing and Layout

## Goal
Configure the application to use a global layout (sidebar + navbar) and define the main routes for `sales` and `inventory`.

## Context
The user wants `sales` as the main screen and needs the `layout` components to be present on all pages. Current structure has layouts and page components but no routing defined.

## What Changes
- `app.routes.ts`: Root route added with `LayoutComponent` as wrapper. `sales` and `inventory` added as child routes.
- `app.component.html`: Placeholder content removed, replaced with `<router-outlet>`.

## Capabilities

### New Capabilities
- `global-navigation`: Ability to navigate between sales and inventory within a consistent layout.

## Impact
- `app.component`: Major change to the root component's template.
- `app.routes`: Primary configuration for application navigation.

## Context
The application had multiple components (sales, inventory) but no central navigation or routing. The layout was defined but not utilized as a global application wrapper.

## Goals / Non-Goals

**Goals:**
- Implement a global layout wrapper using `LayoutComponent`.
- Configure lazy loading for page components.
- Set `sales` as the default landing page.

**Non-Goals:**
- Implementing actual content for sales/inventory.
- Adding complex authentication or guards.

## Decisions
- **Decision:** Use a parent route with children for the layout.
  - **Rationale:** This ensures that the `LayoutComponent` (with its sidebar and navbar) is always present when navigating between different functional pages.
- **Decision:** Lazy load components.
  - **Rationale:** Improves initial load time and follows Angular best practices.

## Risks / Trade-offs
- **Risk:** Existing styles in `app.component.html` were removed.
  - **Trade-off:** Simplifies the entry point but might require re-incorporating some global styles into `styles.css` if they were essential and not defined elsewhere.

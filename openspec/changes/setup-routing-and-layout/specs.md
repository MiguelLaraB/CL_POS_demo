## ADDED Requirements

### Requirement: Global Layout Consistency
The system SHALL use the `LayoutComponent` as a wrapper for all application views.

#### Scenario: Navigating to Sales
- **WHEN** user navigates to the root URL `/`
- **THEN** system redirects to `/sales` and displays the `SalesComponent` within the `LayoutComponent` frame (sidebar and navbar visible).

### Requirement: Default Route
The system SHALL redirect empty paths to the `/sales` route.

#### Scenario: Redirect to Sales
- **WHEN** user enters the application without a specific path
- **THEN** system SHALL show the sales interface.

### Requirement: Lazy Loading
The system SHALL load the `SalesComponent` and `InventoryComponent` only when their respective routes are accessed.

#### Scenario: Lazy Loading Verification
- **WHEN** user navigates to `/sales`
- **THEN** only the sales module assets are loaded.

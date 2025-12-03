# Planning Guide

A comprehensive guild roster management system for Ragnarok Online that enables guild leaders to organize WOE (War of Emperium) and WOE TE (Trans Edition) participants into tactical groups through intuitive drag-and-drop interactions.

**Experience Qualities**:
1. **Tactical** - The interface should feel like a command center where every placement decision matters, with clear visual hierarchy showing group compositions and member availability.
2. **Responsive** - Drag-and-drop interactions must feel fluid and immediate, with visual feedback at every stage to make roster management feel natural and effortless.
3. **Organized** - Information density is high but should never feel cluttered, with clear visual separation between confirmed members, group assignments, and class distributions.

**Complexity Level**: Light Application (multiple features with basic state)
  - The app handles roster data, drag-and-drop state management, filtering, and persistence, but doesn't require authentication or complex backend operations beyond local storage.

## Essential Features

### Feature 1: Presence List Display
- **Functionality**: Display all confirmed WOE and WOE TE participants with their character details (name, class, level, avatar)
- **Purpose**: Provides guild leaders visibility into who has confirmed attendance for strategic planning
- **Trigger**: On app load, fetch and display stored presence data
- **Progression**: App loads → Fetch presence data from storage → Parse and categorize by WOE/TE → Render sidebar list with class icons → Enable filtering
- **Success criteria**: All confirmed members visible with correct class icons, searchable and filterable by event type

### Feature 2: Drag & Drop Group Assignment
- **Functionality**: Drag members from the presence list into one of 12 tactical groups with visual feedback and validation
- **Purpose**: Enables intuitive roster organization without complex forms or manual input
- **Trigger**: User clicks and drags a member card from the sidebar
- **Progression**: User grabs member → Visual feedback shows drag state → Hover over group shows drop zone → Drop validates capacity (max 12) → Updates group state → Persists configuration
- **Success criteria**: Smooth drag interactions, clear visual feedback, capacity enforcement, immediate state updates, no dropped drags

### Feature 3: Group Management
- **Functionality**: View group compositions, track member counts, reset individual groups, and export configurations
- **Purpose**: Allows guild leaders to manage and share finalized roster assignments
- **Trigger**: After dragging members into groups
- **Progression**: Groups display members → Counter shows X/12 capacity → Individual reset buttons clear groups → Export button generates formatted output → Configuration persists to storage
- **Success criteria**: Accurate member counts, functional reset buttons, exportable roster data in readable format

### Feature 4: Data Persistence & Loading
- **Functionality**: Save group configurations and presence data to local storage, restore on reload
- **Purpose**: Prevents loss of work and enables iterative planning sessions
- **Trigger**: Automatic save after any group modification
- **Progression**: User modifies groups → Debounced save to KV storage → Page reload → Fetch stored data → Restore previous state → Continue editing
- **Success criteria**: No data loss on refresh, configurations persist between sessions

### Feature 5: Filtering & Search
- **Functionality**: Toggle between WOE/TE participants, search by character or player name, sort by level or class
- **Purpose**: Quick access to specific members in large rosters
- **Trigger**: User types in search box or toggles event filter
- **Progression**: User inputs filter criteria → List updates in real-time → Matching members highlighted → Non-matching hidden → Drag operations still functional
- **Success criteria**: Instant filtering, maintains drag functionality, clear visual feedback for active filters

## Edge Case Handling
- **Empty Presence Data**: Show helpful onboarding message with instructions to import presence data
- **Group Capacity Exceeded**: Visual warning (red border) and prevent drop if group would exceed 12 members
- **Invalid Drag Target**: Show visual feedback that drop is not allowed, smoothly return member to original position
- **Duplicate Assignments**: Allow same member in multiple groups (some guilds split rosters across time slots)
- **Missing Class Icons**: Fallback to colored class name badge if image asset missing
- **Mobile Touch**: Full support for touch drag-and-drop on tablets and phones
- **Data Corruption**: Validate stored data on load, reset to defaults if corrupted

## Design Direction
The design should evoke the feeling of a tactical war room interface—serious and functional with subtle gaming aesthetics. It needs to balance information density (showing many members and groups simultaneously) with clarity and ease of use. The interface should feel professional enough for guild leadership tools while incorporating visual elements that connect to Ragnarok Online's fantasy aesthetic. A minimal interface serves best here, avoiding distracting animations while maintaining responsive feedback for interactions.

## Color Selection
Custom palette inspired by guild war strategy and medieval fantasy themes.

- **Primary Color**: Deep royal purple `oklch(0.35 0.15 290)` - Represents guild authority and strategy, used for primary actions and header elements
- **Secondary Colors**: 
  - Slate blue `oklch(0.45 0.08 250)` for secondary UI elements and cards
  - Dark gray `oklch(0.25 0.02 260)` for sidebar and panels
- **Accent Color**: Vibrant gold `oklch(0.75 0.15 85)` - Highlights active groups, drag targets, and call-to-action buttons, evoking medieval guild crests
- **Foreground/Background Pairings**:
  - Background (Dark slate #0f0f1a / `oklch(0.12 0.02 260)`): White text `oklch(0.98 0 0)` - Ratio 16.2:1 ✓
  - Card (Dark gray #1a1a2e / `oklch(0.18 0.03 265)`): Light gray text `oklch(0.95 0 0)` - Ratio 13.8:1 ✓
  - Primary (Royal purple): White text `oklch(0.98 0 0)` - Ratio 8.1:1 ✓
  - Secondary (Slate blue): White text `oklch(0.98 0 0)` - Ratio 5.2:1 ✓
  - Accent (Gold #d4a445): Dark text `oklch(0.15 0 0)` - Ratio 8.7:1 ✓
  - Muted (Dark panel #16162a): Gray text `oklch(0.65 0.01 260)` - Ratio 4.9:1 ✓

## Font Selection
Typography should convey clarity and precision befitting a strategic planning tool, while maintaining readability at various sizes for dense information display. Using Inter for its excellent readability and professional appearance, with bold weights for hierarchy.

- **Typographic Hierarchy**:
  - H1 (App Header): Inter Bold / 24px / -0.02em letter spacing
  - H2 (Group Titles): Inter Semibold / 16px / -0.01em letter spacing
  - H3 (Member Names): Inter Medium / 14px / normal spacing
  - Body (Details): Inter Regular / 13px / 0.01em letter spacing
  - Caption (Metadata): Inter Regular / 11px / 0.02em letter spacing / muted color

## Animations
Animations should enhance the tactile feeling of arranging physical roster cards, with smooth physics-based motion that reinforces the drag-and-drop metaphor. Keep animations subtle and functional—every movement should communicate state changes clearly without drawing attention away from the task.

- **Purposeful Meaning**: Drag operations use spring physics to feel natural and responsive; group highlights pulse gently when valid drop targets; member cards scale slightly when grabbed to show elevation
- **Hierarchy of Movement**: 
  - Critical: Drag state changes (200ms) - immediate feedback
  - Important: Drop animations (300ms) - confirm placement
  - Subtle: Hover states (150ms) - guide interactions
  - Background: Filter transitions (200ms) - smooth list updates

## Component Selection
- **Components**: 
  - `Card` - For member entries and group containers with subtle shadows
  - `ScrollArea` - For presence list sidebar with many members
  - `Input` - Search field with clear visual focus state
  - `Button` - Group actions (reset, export) with primary/secondary variants
  - `Badge` - Class names, level indicators, member counts
  - `Separator` - Visual breaks between sections
  - `Tooltip` - Hover info for member details and group stats
  - `Tabs` - Toggle between WOE/TE modes
  - Custom drag overlay component for dragging state
  
- **Customizations**: 
  - Custom drag-and-drop system using native browser APIs or framer-motion drag
  - Member card component with class icon, name, level, and visual grab affordance
  - Group grid component with drop zones and capacity indicators
  - Export dialog with formatted roster output
  
- **States**: 
  - Member cards: default, hover (subtle lift), grabbed (elevated shadow + scale), disabled (when filtered out)
  - Drop zones: inactive, hover-valid (gold border glow), hover-invalid (red border), full (subtle red tint)
  - Buttons: default, hover (brightness increase), active (pressed), disabled (reduced opacity)
  
- **Icon Selection**: 
  - `@phosphor-icons/react` - MagnifyingGlass (search), X (clear/reset), ArrowsOut (drag indicator), Export, Users, Sword (WOE), Shield (TE), Upload (import data)
  
- **Spacing**: 
  - Page padding: `p-6`
  - Card gaps: `gap-3`
  - Group grid: `gap-4`
  - Internal card padding: `p-3`
  - Sidebar width: `w-80`
  - Group card min height: `min-h-[400px]`
  
- **Mobile**: 
  - Sidebar collapses to drawer/sheet on mobile (<768px)
  - Groups stack vertically in single column
  - Touch-friendly drag targets with larger hit areas
  - Reduced padding and text sizes for smaller screens
  - Simplified group cards showing only essentials
  - Floating action button for common actions

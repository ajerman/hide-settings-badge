# v1.0.1 — Fix for Home Assistant 2026.6

Home Assistant 2026.6 renamed the Settings sidebar element from
`ha-md-list-item` to `ha-list-item-button`, which caused the v1.0.0 selector to
stop matching and the badge to reappear. This release fixes that and makes the
selector resilient to future renames.

### Fixed

- Badge reappeared on HA **2026.6.x** because the sidebar element was renamed.

### Changed

- Selector now targets the stable `configuration` class / `sidebar-config` id
  instead of the element tag. These identifiers have stayed constant across HA's
  element renames (`paper-icon-item` → `ha-md-list-item` → `ha-list-item-button`),
  so the badge stays hidden through frontend updates.
- Confirmed scope is unchanged: only the **Settings** badge is hidden; the
  **Notifications** indicator is never touched (it uses a different class).

### Upgrade

Update via HACS, then restart Home Assistant and hard-refresh your browser
(Ctrl/Cmd + Shift + R).

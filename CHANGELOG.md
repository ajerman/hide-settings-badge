# Changelog

## v1.0.1

Home Assistant 2026.6 renamed the Settings sidebar element from
`ha-md-list-item` to `ha-list-item-button`, which caused the v1.0.0 selector to
stop matching and the badge to reappear.

- **Fixed:** badge reappeared on HA 2026.6.x due to the renamed sidebar element.
- **Changed:** selector now targets the stable `configuration` class /
  `sidebar-config` id instead of the element tag, so it survives HA's element
  renames (`paper-icon-item` → `ha-md-list-item` → `ha-list-item-button`).
- Scope unchanged: only the **Settings** badge is hidden; the **Notifications**
  indicator is never touched.

## v1.0.0

- Initial release. Hides the update/notification badge on the Settings item in
  the Home Assistant sidebar, loaded as a frontend module via `extra_module_url`.

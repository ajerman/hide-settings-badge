# Hide Settings Badge

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

Hides the **update / notification badge** on the **Settings** item in the Home
Assistant sidebar - the little number that appears when updates are available.

Updates are **not** dismissed or hidden anywhere else: they still show normally
when you open **Settings**. This only removes the badge from the sidebar.

Are you triggered by notification badges that you can't dismiss? Do you have
plugins that get updates on an hourly basis? Do you prefer to update your HA
installation on your own schedule without having a dot on your page all the time?
This small frontend module is for you.

## Before / After

| Before | After |
| ------ | ----- |
| ![Before – Settings with a badge](docs/before.png) | ![After – Settings with no badge](docs/after.png) |

## Install

### Via HACS (custom repository)

1. In HACS, open the **⋮** menu (top right) → **Custom repositories**.
2. Repository: `https://github.com/ajerman/hide-settings-badge`
   Category/Type: **Dashboard**.
3. Click **Add**, then find **Hide Settings Badge** in HACS and **Download** it.
4. Add the module to your `configuration.yaml` (see below), restart Home
   Assistant, and hard-refresh your browser (Ctrl/Cmd + Shift + R).

> **Important:** this is a *frontend module*, not a Lovelace dashboard resource.
> Do **not** add it under Settings → Dashboards → Resources. Add it under
> `frontend:` as shown below.

### Manual

1. Copy `hide-settings-badge.js` to `<config>/www/hide-settings-badge.js`.
   (The `www` folder is served at `/local/`.)
2. Continue with the configuration step below.

## Configuration

Add the module to `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    # HACS install:
    - /hacsfiles/hide-settings-badge/hide-settings-badge.js
    # OR manual install:
    # - /local/hide-settings-badge.js
```

Restart Home Assistant, then hard-refresh the browser.

## How it works

The Settings sidebar item renders (in current Home Assistant) as:

```html
<ha-md-list-item class="configuration" id="sidebar-config" href="/config">
  ...
  <span class="badge">12</span>
</ha-md-list-item>
```

The module injects a small stylesheet into the `ha-sidebar` shadow root:

```css
.configuration .badge,
#sidebar-config .badge { display: none !important; }
```

The selector targets the stable `configuration` class / `sidebar-config` id
rather than the element tag, which HA has renamed across versions
(`paper-icon-item` → `ha-md-list-item` → `ha-list-item-button`).

It re-applies on navigation and tab focus so it survives sidebar
collapse/expand. It is independent of your active theme, switching themes will
not break it.

## Compatibility

Verified on **2026.7.x**. The selector targets the `configuration` class /
`sidebar-config` id, which have stayed stable even as HA renamed the underlying
element (`paper-icon-item` → `ha-md-list-item` → `ha-list-item-button`), so it
should survive most frontend updates. If a future release changes those
identifiers, it could require a one-line selector update. Issues/PRs welcome.

## License

[MIT](LICENSE)

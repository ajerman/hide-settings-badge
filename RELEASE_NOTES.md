# v1.0.0 - Initial release

Hides the update / notification badge on the **Settings** item in the Home
Assistant sidebar. Updates remain fully visible inside Settings, only the
sidebar badge is suppressed.

### Install (custom repository)

1. HACS → ⋮ → **Custom repositories** → `https://github.com/ajerman/hide-settings-badge`, type **Dashboard** → **Add** → **Download**.
2. Add to `configuration.yaml`:
   ```yaml
   frontend:
     extra_module_url:
       - /hacsfiles/hide-settings-badge/hide-settings-badge.js
   ```
3. Restart Home Assistant and hard-refresh your browser.

> This loads as a **frontend module**, not a Lovelace dashboard resource.

### Notes

- Works on Home Assistant 2025.5+; verified on 2026.5.x.
- Independent of your active theme.
- Targets frontend markup, so a future HA release could require a one-line
  selector update. Issues and PRs welcome.
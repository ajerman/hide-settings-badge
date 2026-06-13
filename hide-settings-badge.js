/**
 * hide-settings-badge
 *
 * Hides the update / notification badge on the "Settings" (config) item in the
 * Home Assistant sidebar, the little number that appears when updates are
 * available. Updates remain fully visible inside Settings itself; only the
 * sidebar badge is suppressed.
 *
 * This is loaded as a FRONTEND MODULE (frontend: extra_module_url), not as a
 * Lovelace dashboard resource, because it styles the app sidebar rather than a
 * dashboard card.
 *
 * Verified against Home Assistant 2026.6.x. The config item renders with a
 * stable class/id across versions:
 *   <ha-list-item-button class="configuration" id="sidebar-config" href="/config">
 * (the element tag has changed over time, hence the tag-agnostic selector)
 * with a <span class="badge"> in slot="start" (collapsed sidebar) and another
 * in slot="end" (expanded sidebar). Both are hidden.
 *
 * Project: https://github.com/ajerman/hide-settings-badge
 * License: MIT
 */
(function () {
  "use strict";

  const STYLE_ID = "hide-settings-badge-style";
  // Target by the stable class/id of the Settings (config) sidebar item rather
  // than its element tag. HA has renamed this element across versions
  // (paper-icon-item -> ha-md-list-item -> ha-list-item-button), but the
  // `configuration` class and `sidebar-config` id have stayed constant, so a
  // tag-agnostic selector survives those renames.
  const CSS = `
    .configuration .badge,
    #sidebar-config .badge {
      display: none !important;
    }
  `;

  function getSidebar() {
    return document
      .querySelector("home-assistant")?.shadowRoot
      ?.querySelector("home-assistant-main")?.shadowRoot
      ?.querySelector("ha-sidebar");
  }

  function apply() {
    const root = getSidebar()?.shadowRoot;
    if (!root) return false;
    if (!root.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = CSS;
      root.appendChild(style);
    }
    return true;
  }

  // The sidebar shadow root loads asynchronously after the app boots; retry
  // until it exists. Capped so we don't poll forever on an unexpected layout.
  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (apply() || tries > 100) clearInterval(timer);
  }, 200);

  // Re-apply on single-page-app navigation and when the tab regains focus,
  // in case Home Assistant rebuilds the sidebar.
  window.addEventListener("location-changed", apply);
  document.addEventListener("visibilitychange", apply);

  console.info(
    "%c hide-settings-badge %c loaded ",
    "background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px",
    "background:#555;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px"
  );
})();

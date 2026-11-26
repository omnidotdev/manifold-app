# @omnidotdev/manifold-app

## 0.1.0

### Minor Changes

- [#99](https://github.com/omnidotdev/manifold-app/pull/99) [`7419efc`](https://github.com/omnidotdev/manifold-app/commit/7419efc95731b32159f64d0801a6696d7badaa1d) Thanks [@coopbri](https://github.com/coopbri)! - Signing in or out of Omni in another app now carries over here

- [#98](https://github.com/omnidotdev/manifold-app/pull/98) [`8ec2de2`](https://github.com/omnidotdev/manifold-app/commit/8ec2de2cf157ff448bf7f5465a8f1c7106a80c79) Thanks [@coopbri](https://github.com/coopbri)! - Links to your Omni account now open it as the same account you use in Manifold, even when another account is signed in on the browser

### Patch Changes

- [#86](https://github.com/omnidotdev/manifold-app/pull/86) [`eac7bb4`](https://github.com/omnidotdev/manifold-app/commit/eac7bb40bf03ac4e09cf832f47fbc5a2eed2d56e) Thanks [@coopbri](https://github.com/coopbri)! - Show a workspace's real plan on its billing page. Plan reads now reach the billing service with Manifold's service key, so a paid or comped plan no longer falls back to Free, and a workspace's plan can only be read by its own members.

- [#83](https://github.com/omnidotdev/manifold-app/pull/83) [`743431e`](https://github.com/omnidotdev/manifold-app/commit/743431ece2adff7b1e2cd11beb28e08913ecd93b) Thanks [@coopbri](https://github.com/coopbri)! - Buy and manage plans on the Omni account hub. Picking a workspace on a pricing card now opens the hub's confirm step for that plan and workspace, and a new workspace is created on the hub's workspaces console. Manage subscription on a workspace's billing page and Manage subscriptions on the profile page open plan management on the account hub, where plans are changed, canceled, or reactivated; all of them come back to Manifold. The in-app checkout, billing portal, and Cancel Plan / Reactivate Plan buttons are removed.

- [#88](https://github.com/omnidotdev/manifold-app/pull/88) [`dad07ef`](https://github.com/omnidotdev/manifold-app/commit/dad07ef31029a0364823c4c2d8050a0497f47b49) Thanks [@coopbri](https://github.com/coopbri)! - Stop writing users' email addresses to the logs: a failed sign-in token check logs only the error message, not the user's email and name, by moving to `@omnidotdev/providers` v0.2.0.

- [#87](https://github.com/omnidotdev/manifold-app/pull/87) [`89294f0`](https://github.com/omnidotdev/manifold-app/commit/89294f0eb538590ac3edce64538ad96b7c44478c) Thanks [@coopbri](https://github.com/coopbri)! - Keep you signed in after your session refreshes in the background

- [#96](https://github.com/omnidotdev/manifold-app/pull/96) [`c6728e4`](https://github.com/omnidotdev/manifold-app/commit/c6728e4a64eb0dfc1de210a977c9c6898443def1) Thanks [@coopbri](https://github.com/coopbri)! - Sign-in session data sent to the browser no longer includes the session token

- [#93](https://github.com/omnidotdev/manifold-app/pull/93) [`ba020e6`](https://github.com/omnidotdev/manifold-app/commit/ba020e6a4969367f8126fb16a6f754896642e9b4) Thanks [@coopbri](https://github.com/coopbri)! - Fonts are now served from Manifold itself instead of Google Fonts, so loading the app no longer sends your IP address to Google.

- [#97](https://github.com/omnidotdev/manifold-app/pull/97) [`c40ebec`](https://github.com/omnidotdev/manifold-app/commit/c40ebec1237f80a36fc5fe757941d7146dba156c) Thanks [@coopbri](https://github.com/coopbri)! - Sign-in tokens stay out of reach of scripts running on the page: the session token is no longer returned to the browser

- [#89](https://github.com/omnidotdev/manifold-app/pull/89) [`6df090f`](https://github.com/omnidotdev/manifold-app/commit/6df090fbf342b1786627939e2c582d327e38c5e1) Thanks [@coopbri](https://github.com/coopbri)! - The workspace menu now scrolls when you belong to many workspaces, shows each workspace's handle, links to managing your workspaces on your Omni account, and matches the rest of Omni

# CamNexo website

Static website for CamNexo (plain HTML, CSS and a little JavaScript, no build step).

- Pages: `index.html`, `support.html`, `safety.html`, `privacy.html`, `terms.html`, `404.html`
- Download links, version and contact email: `assets/config.js`
- Preview locally: `node serve.js` then open http://localhost:5180

## Deploy with Coolify

1. New resource, Public or Private repository, this repository, branch `main`.
2. Build pack: **Dockerfile**. Port: **80**.
3. Set the domain and enable HTTPS.

Each push to `main` can redeploy automatically via the Coolify webhook.

# Padduck Coming Soon Site

Static coming-soon site for **Padduck IPAM**, ready for Cloudflare Pages.

## Deploy on Cloudflare Pages

1. Push this repo to GitHub/GitLab.
2. In Cloudflare Pages, create a new project from the repo.
3. Use these build settings:
   - Framework preset: None
   - Build command: leave blank
   - Build output directory: `/`
4. Add the custom domain `padduck.net` in Pages.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

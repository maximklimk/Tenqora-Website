# RackOps product website

Standalone static product and documentation site for RackOps.

Author and product owner: **Максим Климко**.

## Local preview

```bash
python3 -m http.server 8080 --directory website
```

Open `http://localhost:8080`.

## Deployment

The site contains no secrets, application database or customer runtime data. It can be deployed directly to GitHub Pages, Cloudflare Pages, Netlify or any static host. The dedicated GitHub repository is generated from this `website/` subtree so the RackOps application source and runtime database remain separate.

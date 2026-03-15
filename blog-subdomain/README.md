# Blog Subdomain

This folder is a standalone Next.js app for `blog.manulacooray.com`.

## Deploy in Vercel

1. In Vercel, click `Add New...` -> `Project`.
2. Import the same Git repository.
3. Set the **Root Directory** to `blog-subdomain`.
4. Keep the framework as `Next.js`.
5. Deploy.

## Attach the subdomain

1. Open the new Vercel project.
2. Go to `Settings` -> `Domains`.
3. Remove `blog.manulacooray.com` from the main portfolio project if it is still attached there.
4. Add `blog.manulacooray.com` to this new project.
5. In Cloudflare DNS, point the `blog` record to the value Vercel shows for this project.
6. Wait for Vercel to verify the domain.

## Result

- `https://manulacooray.com` -> main portfolio
- `https://blog.manulacooray.com` -> standalone journal homepage

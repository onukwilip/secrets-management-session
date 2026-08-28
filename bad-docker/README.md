# bad-docker

This Dockerfile has no `.dockerignore`, so the `.env` file gets copied into the image alongside the application code.

## Why this is dangerous

- **The image itself becomes a secret store.** Anyone who pulls the image from the registry — intentionally or accidentally — gets the credentials with it. No source code access needed.

- **`docker inspect` exposes everything.** Even without pulling the filesystem, running `docker inspect <image>` on a running container reveals environment variables and baked-in files in plain text.

- **Registry access = credential access.** If your container registry is breached, misconfigured, or accidentally made public, every secret in every image is immediately readable.

- **Secrets survive image sharing.** Sharing the image for debugging or handing it to a contractor means handing them the credentials too, with no audit trail.

- **You cannot rotate without a rebuild.** Changing a credential means rebuilding and republishing the entire image — there is no separation between the app artifact and the secret.

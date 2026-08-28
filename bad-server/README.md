# bad-server

This server has secrets hardcoded directly in `server.js`.

## Why this is dangerous

- **Developer's machine gets compromised.** Anyone who gains access to the codebase (stolen laptop, malware, leaked SSH key) instantly has every credential in plain text — no extra step needed.

- **Every person with repo access owns the secrets.** Contractors, new joiners, open-source contributors — whoever can read the code can read the credentials, whether that was intended or not.

- **Git history never forgets.** Even if you delete the secret in a later commit, it still lives in `git log`. Tools like `git log -S "s3cur3P@ssw0rd123"` or `trufflehog` will find it forever.

- **No way to rotate without a code change.** Changing a credential means editing source code, opening a PR, and redeploying — a process that itself may expose the new secret to reviewers.

- **One breach, everything compromised.** All secrets live in one place. A single leak gives an attacker access to every system the app talks to simultaneously.

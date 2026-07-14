## Hetzner VPS: `sandbox.deckyard.eu` deployment (Docker + Caddy)

This runs the **same app** in **sandbox mode**:

- No login (per-visitor guest cookie)
- 24h TTL auto-deletion for private decks
- Workspace decks are visible but read-only (curated seed decks)
- Uploads disabled
- AI enabled, **Mistral only**
- Exports + publish + embeds are watermarked

---

## 1) DNS

Create an **A record**:

- `sandbox.deckyard.eu` → `<your Hetzner VPS public IPv4>`

(If you also have IPv6: add an AAAA record too.)

---

## 2) VPS prerequisites

On the VPS:

- Ensure ports **80** and **443** are open (Hetzner firewall + OS firewall).
- Install Docker + Compose plugin.

Example (Ubuntu):

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## 3) Deploy directory

Pick a directory on the VPS (example):

```bash
sudo mkdir -p /opt/deckyard-sandbox
sudo chown -R $USER:$USER /opt/deckyard-sandbox
cd /opt/deckyard-sandbox
```

Clone your repo (or upload it):

```bash
git clone <YOUR_REPO_GIT_URL> .
```

---

## 4) Create `.env` (secrets + domain)

Create `/opt/deckyard-sandbox/.env`:

```bash
cat > .env <<'EOF'
DOMAIN=sandbox.deckyard.eu
LETSENCRYPT_EMAIL=you@deckyard.eu

# Sandbox settings
SANDBOX_TTL_HOURS=24
SANDBOX_DEFAULT_THEME=sandbox-minimal
SANDBOX_WATERMARK=Sandbox export • Created by an anonymous user on sandbox.deckyard.eu

# AI (required for sandbox AI features)
MISTRAL_API=REPLACE_ME
MISTRAL_MODEL=mistral-small-latest
EOF
```

---

## 5) Start the sandbox stack

```bash
docker compose -f docker-compose.sandbox.yml up -d --build
```

Check logs:

```bash
docker compose -f docker-compose.sandbox.yml logs -f --tail=200
```

---

## 6) Verify

- Visit `https://sandbox.deckyard.eu/`
- Create a deck → refresh → it should persist (cookie-based guest identity)
- Export / publish → watermark should be visible
- AI wizard → vendor list should show **mistral only**

---

## Updates

Pull + rebuild:

```bash
cd /opt/deckyard-sandbox
git pull
docker compose -f docker-compose.sandbox.yml up -d --build
```









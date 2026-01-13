const TARGET = "https://thebetterfox.vercel.app/start";
const loader = document.getElementById("loader");

function goOnline() {
  location.replace(TARGET);
}

function goOffline() {
  loader.innerHTML = `
        <div class="offline">offline</div>
        <div class="msg" style="margin-top:8px;">Check your network settings and try again. If the issue still persists, thebetterfox might not be available right now. Try again later.</div>
      `;
}

fetch(TARGET, { method: "HEAD", mode: "no-cors" })
  .then(() => goOnline())
  .catch(() => goOffline());

// 포트폴리오 스크린샷용 목 백엔드. NEXT_PUBLIC_SERVER_URL=http://localhost:4010
import http from "node:http";
import { routes } from "./routes.mjs";

const PORT = 4010;

const ok = (data) => ({ resultCode: "200", resultMessage: "성공", data });

const base64url = (obj) =>
  Buffer.from(JSON.stringify(obj)).toString("base64url");

const fakeJwt = (role) =>
  `${base64url({ alg: "HS256" })}.${base64url({ sub: "demo", role })}.mock`;

const match = (pattern, path) => {
  const re = new RegExp(
    "^" + pattern.replace(/:[^/]+/g, "([^/]+)") + "/?$"
  );
  return re.exec(path);
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname.replace(/^\/api\/v1\//, "v1/").replace(/^\//, "");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  if (req.method === "OPTIONS") return res.end();

  res.setHeader("Content-Type", "application/json");

  if (path === "api/login") {
    const role = process.env.MOCK_ROLE ?? "ROLE_EXECUTIVE";
    res.setHeader("Authorization", fakeJwt(role));
    return res.end(JSON.stringify(ok(null)));
  }

  for (const [pattern, handler] of Object.entries(routes)) {
    const m = match(pattern, path);
    if (!m) continue;
    const data =
      typeof handler === "function"
        ? handler({ params: m.slice(1), query: url.searchParams, method: req.method })
        : handler;
    console.log(`✓ ${req.method} ${path}`);
    return res.end(JSON.stringify(ok(data)));
  }

  console.log(`✗ ${req.method} ${path}${url.search}`);
  res.end(JSON.stringify(ok(null)));
});

server.listen(PORT, () => console.log(`mock api on http://localhost:${PORT}`));

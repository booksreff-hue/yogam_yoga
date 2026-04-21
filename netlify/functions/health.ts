import type { Handler, HandlerResponse } from "@netlify/functions"

const handler: Handler = async function () {
  return { statusCode: 200, body: JSON.stringify({ ok: true }) }
}

export { handler }
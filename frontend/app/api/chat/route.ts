import { NextRequest } from "next/server";
import { buildGroundedPrompt } from "@/lib/portfolio-data";

function json(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  let message: string;
  let model: string | undefined;
  let openRouterApiKey: string | undefined;

  try {
    const body = await req.json();
    ({ message, model, openRouterApiKey } = body);
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  if (!message?.trim()) {
    return json({ error: "Message is required." }, 400);
  }

  const apiKey = openRouterApiKey?.trim() || process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return json(
      {
        error:
          "OpenRouter API key not configured. Add one in the chat settings or set OPENROUTER_API_KEY on the server.",
      },
      503
    );
  }

  const modelId = model?.trim() || process.env.OPENROUTER_MODEL || "openrouter/auto";
  const groundedPrompt = buildGroundedPrompt(message);
  const encoder = new TextEncoder();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || req.nextUrl.origin;

  const stream = new ReadableStream({
    async start(controller) {
      let upstreamRes: Response;

      try {
        upstreamRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": siteUrl,
            "X-Title": "Van Anh Portfolio Assistant",
          },
          body: JSON.stringify({
            model: modelId,
            messages: [{ role: "user", content: groundedPrompt }],
            max_tokens: 800,
            temperature: 0.4,
            stream: true,
          }),
        });
      } catch (error) {
        console.error("Upstream fetch error:", error);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: "Failed to reach OpenRouter." })}\n\n`)
        );
        controller.close();
        return;
      }

      if (!upstreamRes.ok) {
        const detail = await upstreamRes.text();
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              error: "AI request failed.",
              detail: detail.slice(0, 800),
            })}\n\n`
          )
        );
        controller.close();
        return;
      }

      if (!upstreamRes.body) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: "Empty response from AI." })}\n\n`)
        );
        controller.close();
        return;
      }

      const reader = upstreamRes.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) {
              continue;
            }

            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const chunk = parsed.choices?.[0]?.delta?.content ?? "";

              if (chunk) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`));
              }
            } catch {
              // Ignore malformed SSE lines from the upstream provider.
            }
          }
        }
      } catch (error) {
        console.error("Stream read error:", error);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: "Stream interrupted." })}\n\n`)
        );
      }

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

import { createAnthropic } from '@ai-sdk/anthropic'
import { streamText, convertToModelMessages } from 'ai'
import resume from '../../lib/resume'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are a helpful assistant representing Adams Wonderboy on his personal homepage.
Answer questions about Adams based on his resume below. Be friendly, concise, and professional.
If a question is unrelated to Adams or his work, politely redirect the conversation.

${resume}`

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { messages: allMessages } = await req.json()
  const messages = allMessages.slice(-10) // keep the last 10 messages to control token cost

  const baseURL = process.env.CLOUDFLARE_AI_GATEWAY_URL || undefined

  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    ...(baseURL && { baseURL }),
    headers: {
      // Helicone observability — logs requests, tracks cost/latency
      ...(process.env.HELICONE_API_KEY && {
        'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`,
        'Helicone-Target-URL': 'https://api.anthropic.com',
      }),
    },
  })

  const result = streamText({
    model: anthropic('claude-3-5-haiku-20241022'),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    maxTokens: 1024,
  })

  return result.toUIMessageStreamResponse()
}

import { NextRequest, NextResponse } from 'next/server'
import { buildPortfolioContext } from '@/lib/portfolio-knowledge'

const OPENAI_API_URL = 'https://api.openai.com/v1/responses'
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-5'

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'OpenAI is not configured yet. Add OPENAI_API_KEY in your Vercel or local environment settings.',
      },
      { status: 500 },
    )
  }

  try {
    const body = await request.json()
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'input_text',
                text: buildPortfolioContext(),
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: message,
              },
            ],
          },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage =
        data?.error?.message || 'OpenAI request failed. Please try again in a moment.'

      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    const text =
      typeof data?.output_text === 'string' && data.output_text.trim()
        ? data.output_text.trim()
        : ''

    if (!text) {
      return NextResponse.json(
        { error: 'The assistant returned an empty response. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ text })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error.'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}

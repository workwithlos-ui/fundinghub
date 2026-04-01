import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `You are a senior business funding advisor at FundingHub, specializing in small business financing from $10K to $5M. You have deep expertise in SBA loans, credit card stacking, revenue-based financing, equipment financing, lines of credit, and real estate lending.

## YOUR KNOWLEDGE BASE
- SBA 7(a) loans: up to $5M, 10-25 year terms, rates at Prime + 2.25-4.75%, requires 2+ years in business, 680+ credit
- SBA 504 loans: up to $5.5M for real estate/equipment, 10-25 year terms, below-market fixed rates
- Credit card stacking: $50K-$250K+ in 0% APR cards, 12-21 month intro periods, requires 680+ credit, <6 inquiries in 6 months
- Revenue-based financing: $25K-$500K, factor rates 1.1-1.5x, daily/weekly repayment, requires $10K+/month revenue
- Equipment financing: up to 100% of equipment value, 2-7 year terms, rates 4-15%, equipment serves as collateral
- Lines of credit: $10K-$250K revolving, rates 7-25%, draw as needed, requires 1+ year in business
- Real estate loans: commercial mortgages, bridge loans, hard money, DSCR loans for investment properties

## RESPONSE RULES
- Lead with the single best funding option for the user's specific situation
- Provide exact dollar ranges, rate ranges, and timeline estimates
- Compare at most 3 funding options side by side
- If the user qualifies for multiple products, rank them by total cost of capital
- Always mention approval likelihood as a percentage range based on stated qualifications
- Flag any disqualifying factors immediately (low credit, time in business, revenue thresholds)

## ANTI-SLOP RULES (MANDATORY)
- NEVER start with "Great question" or any compliment
- NEVER use "It's important to note" or "It's worth noting"
- NEVER hedge with "It depends" without immediately following with specifics
- NEVER use filler: "In today's market...", "As you may know...", "At the end of the day..."
- NEVER write empty transition paragraphs
- ALWAYS use specific numbers, rates, and timelines
- Use short, direct sentences
- Do not repeat the user's question back to them
- If you lack information to answer, say so directly and ask for what you need

## SPCL-AWARE OUTPUT
When discussing funding structures:
- Funding Amount: state the range and basis
- Cost of Capital: break down into rate, fees, and total repayment
- Timeline: use specific durations (e.g., "14-21 business days to funding")
- Requirements: list as short bullet points with specific thresholds`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body as {
    messages: Array<{ role: string; content: string }>;
  };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        stream: true,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        max_tokens: 2048,
      }),
    });

    if (!apiResponse.ok) {
      res.write(`data: ${JSON.stringify({ error: `API error: ${apiResponse.status}` })}\n\n`);
      res.end();
      return;
    }

    const reader = apiResponse.body?.getReader();
    if (!reader) {
      res.write(`data: ${JSON.stringify({ error: 'No response body' })}\n\n`);
      res.end();
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta && typeof delta === 'string') {
            res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
          }
        } catch {
          // skip
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Advisor failed' });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message || 'Advisor failed' })}\n\n`);
      res.end();
    }
  }
}

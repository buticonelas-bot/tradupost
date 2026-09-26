export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { text, source, target } = req.body || {};
  if (!text || !target) {
    return res.status(400).json({ error: 'Faltam os campos text ou target' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada nas variáveis de ambiente do Vercel' });
  }

  const sourceInstruction = source && source !== 'Detetar idioma' ? source : 'detected automatically';
  const prompt = `Translate the following text into ${target} (source language: ${sourceInstruction}). Return ONLY the translation, with no explanation, no notes, and no quotation marks.\n\nText:\n${text}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      return res.status(response.status).json({ error: errBody });
    }

    const data = await response.json();
    const block = (data.content || []).find(b => b.type === 'text');
    return res.status(200).json({ translation: block ? block.text.trim() : '' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

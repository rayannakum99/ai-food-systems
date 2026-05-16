export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, mimeType, diet } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const dietNote = diet
    ? `The user has the following dietary restrictions: ${diet}. Only suggest recipes that respect these restrictions.`
    : 'The user has no dietary restrictions.';

  const prompt = `You are a helpful chef assistant. Analyse this photo of a fridge or food storage area.

${dietNote}

Do the following:
1. Identify every visible ingredient, food item, condiment, and drink.
2. Suggest exactly 3 recipes that can be made primarily from those ingredients.
3. For each recipe, provide detailed step-by-step cooking instructions.

Respond ONLY with a valid JSON object in this exact format (no markdown, no code blocks):
{
  "ingredients": ["ingredient 1", "ingredient 2"],
  "recipes": [
    {
      "name": "Recipe Name",
      "time": "25 mins",
      "difficulty": "Easy",
      "matchScore": 85,
      "missingIngredients": ["butter", "flour"],
      "steps": [
        "Step 1 instruction here.",
        "Step 2 instruction here."
      ]
    }
  ]
}

Rules:
- matchScore is a number 0–100 representing what percentage of ingredients are already in the fridge.
- missingIngredients lists only the extra items needed beyond what is visible.
- steps should be clear, numbered instructions (5–10 steps per recipe).
- Sort recipes from highest to lowest matchScore.
- Do not suggest recipes that violate the dietary restrictions.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mimeType || 'image/jpeg',
                  data: image
                }
              },
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', err);
      return res.status(502).json({ error: 'Failed to reach Claude API' });
    }

    const claude = await response.json();
    const raw = claude.content?.[0]?.text ?? '';

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Claude occasionally wraps in markdown fences — strip and retry
      const clean = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(clean);
    }

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

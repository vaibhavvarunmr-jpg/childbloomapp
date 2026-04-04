import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/env.js';
import { buildWeeklyInsightPrompt } from '../prompts/weeklyInsight.js';
import { buildAskAiPrompt } from '../prompts/askAi.js';

const anthropic = new Anthropic({
  apiKey: config.anthropic.apiKey,
});

export async function generateWeeklyInsight(data) {
  const prompt = buildWeeklyInsightPrompt(data);

  const message = await anthropic.messages.create({
    model: config.anthropic.model,
    max_tokens: 512,
    messages: [
      { role: 'user', content: prompt },
    ],
  });

  const text = message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  return text;
}

export async function generateAskAiResponse(data) {
  const prompt = buildAskAiPrompt(data);

  const message = await anthropic.messages.create({
    model: config.anthropic.model,
    max_tokens: 512,
    messages: [
      { role: 'user', content: prompt },
    ],
  });

  const text = message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  return text;
}

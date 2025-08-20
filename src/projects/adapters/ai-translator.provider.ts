import { Injectable } from '@nestjs/common';
import { TranslatorInterface } from '../dto/translator.interface';
import OpenAI from 'openai';

@Injectable()
export class AITranslatorAdapter implements TranslatorInterface {
  private readonly openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async translate(text: string): Promise<string> {
    const prompt = `Traduza o texto a seguir para inglês. Retorne apenas o texto traduzido, sem explicações, comentários, notas, formatação ou texto adicional. Texto: """${text}""" `;
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return completion.choices[0]?.message.content?.trim() || '';
  }
}

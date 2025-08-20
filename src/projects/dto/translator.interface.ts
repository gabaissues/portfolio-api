export interface TranslatorInterface {
  translate(text: string): Promise<string>;
}

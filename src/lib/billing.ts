import { getTemplateById } from '@/lib/templates';

export const PREMIUM_TEMPLATE_PRICE_CENTS = 2999;

export function getTemplateCheckoutPriceCents(templateId: string): number | null {
  const template = getTemplateById(templateId);
  if (!template || !template.isPremium) {
    return null;
  }

  return PREMIUM_TEMPLATE_PRICE_CENTS;
}

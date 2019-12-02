import { CriterionEnum } from './crtiterion.enum';

export const criterionNames: { [key in CriterionEnum]: string } = {
  [CriterionEnum.MM]: 'Мінімаксний критерій',
  [CriterionEnum.P]: 'Критерій добутків',
  [CriterionEnum.S]: 'Критерій Севіджа',
  [CriterionEnum.HW]: 'Критерій Гурвиця',
  [CriterionEnum.BL]: 'Критерій Байеса-Лапласа',
  [CriterionEnum.HL]: 'Критерій Ходжа-Лемана',
  [CriterionEnum.G]: 'Критерій Гермеєра',
};

/*
 * Validação dos inputs dos formulários da tela de configurações, metas e lembretes
 */

import { number, object, ref, string } from 'yup';

const SEQUENTIAL_PATTERN =
  /(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/;
const brPhoneSize = 11;

export const personalInfoSchema = object().shape({
  fullName: string()
    .transform((value) => (value ? value.trim() : ''))
    .test('not-empty', 'O nome é obrigatório.', (value) => value.length > 0)
    .required('O nome é obrigatório.'),

  email: string()
    .transform((value) => (value ? value.trim() : ''))
    .email('Informe um e-mail válido.')
    .required('O e-mail é obrigatório.'),
});

const passwordMin = 8;

export const passwordSchema = object().shape({
  password: string()
    .when('.', {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: (schema) =>
        schema.notOneOf(
          [ref('newPassword')],
          'A nova senha não pode ser igual à senha atual.'
        ),
      otherwise: (schema) => schema,
    })
    .required('A senha é obrigatória')
    .min(passwordMin, 'A senha deve ter pelo menos 8 caracteres.'),
  newPassword: string()
    .when('.', {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: (schema) =>
        schema.notOneOf(
          [ref('password')],
          'A nova senha não pode ser igual à senha atual.'
        ),
      otherwise: (schema) => schema,
    })
    .required('A senha é obrigatória.')
    .min(passwordMin, 'A senha deve ter pelo menos 8 caracteres.')
    .matches(/[A-Z]/, 'Inclua ao menos uma letra maiúscula (A–Z).')
    .matches(/[a-z]/, 'Inclua ao menos uma letra minúscula (a–z).')
    .matches(/[0-9]/, 'Inclua pelo menos um número (0–9).')
    .matches(/.*[@#$].*/, 'Adicione um dos símbolos permitidos: @, # ou $.')
    .test(
      'no-sequential-numbers',
      'Evite números em sequência, como "123" ou "321".',
      (value) => {
        if (!value) {
          return true;
        }
        return !SEQUENTIAL_PATTERN.test(value);
      }
    ),
  confirmNewPassword: string()
    .required('A senha é obrigatória')
    .oneOf([ref('newPassword')], 'As senhas não coincidem.'),
});

const inputSize = 3;

export const financialSchema = object().shape({
  emergencyFund: string()
    .required('Informe a reserva de emergência.')
    .test(
      'not-empty',
      'Informe a reserva de emergência.',
      (value) => value.length > inputSize
    ),
  totalIncome: string()
    .required('Informe sua renda total.')
    .test(
      'not-empty',
      'Informe sua renda total.',
      (value) => value.length > inputSize
    ),
  country: string()
    .required('Informe um país para a moeda.')
    .min(1, 'Informe um país válido!'),
});

export const goalSchema = object()
  .shape({
    description: string().trim().required('Descrição é obrigatória'),
    targetValue: number({
      transform: (v) => (v === '' ? Number.NaN : Number(v)),
    })
      .typeError('Valor alvo deve ser um número')
      .positive('Valor alvo deve ser maior que 0')
      .required('Valor alvo é obrigatória'),
    accumulated: number({
      transform: (v) => (v === '' ? Number.NaN : Number(v)),
    })
      .typeError('Acumulado deve ser um número')
      .min(0, 'Acumulado deve ser maior que 0')
      .required('Acumulado é obrigatório, use 0 se não tiver poupado'),
    monthlyContribution: number({
      transform: (v) => (v === '' ? Number.NaN : Number(v)),
    })
      .typeError('Aporte mensal deve ser um número')
      .min(0, 'Aporte mensal deve ser maior que 0')
      .required('Aporte mensal é obrigatória'),
    deadline: string().required('O prazo final é obrigatória'),
  })
  .required();

const descriptionSize = 3;

export const reminderSchema = object().shape({
  descriptionReminder: string()
    .required('A descrição é obrigatória')
    .min(descriptionSize, 'A descrição deve ter pelo menos 3 caracteres'),
  date: string().required('Selecione uma data válida'),
  time: string().required('Selecione um horário válido'),
});

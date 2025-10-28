/*
* Validação dos inputs da tela de configuração
*/
import { object, ref, string } from 'yup';

const SEQUENTIAL_PATTERN =
  /(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)/;
const brPhoneSize = 11;
const bioSize = 300;

export const personalInfoSchema = object().shape({
  fullName: string()
    .transform((value) => (value ? value.trim() : ''))
    .test('not-empty', 'O nome é obrigatório.', (value) => value.length > 0)
    .required('O nome é obrigatório.'),

  username: string()
    .transform((value) => (value ? value.trim() : ''))
    .test(
      'not-empty',
      'O nome de usuário é obrigatório.',
      (value) => value.length > 0
    )
    .required('O nome de usuário é obrigatório.'),

  email: string()
    .transform((value) => (value ? value.trim() : ''))
    .email('Informe um e-mail válido.')
    .required('O e-mail é obrigatório.'),

  phone: string()
    .transform((value) => (value ? value.replace(/\D/g, '') : ''))
    .test(
      'required',
      'O número de celular é obrigatório.',
      (value) => value && value.length > 0
    )
    .test(
      'length',
      'O celular deve ter DDD + 9 dígitos.',
      (value) => !value || value.length === brPhoneSize
    )
    .required('O número de celular é obrigatório.'),

  bio: string().max(bioSize, 'Máximo de 300 caracteres.').nullable(),
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
    .min(passwordMin),
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
});

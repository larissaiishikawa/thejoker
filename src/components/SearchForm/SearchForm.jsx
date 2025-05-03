import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './SearchForm.module.css';

const schema = yup.object({
  categories: yup.array().min(0),
  amount: yup.number().required('Quantidade é obrigatória').min(1, 'Mínimo é 1').max(10, 'Máximo é 10'),
  blacklistFlags: yup.array().min(0),
  language: yup.string().required('Idioma é obrigatório'),
}).required();

const CATEGORIES = [
  { value: 'Programming', label: 'Programação' },
  { value: 'Misc', label: 'Diversos' },
  { value: 'Dark', label: 'Humor Negro' },
  { value: 'Pun', label: 'Trocadilhos' },
  { value: 'Spooky', label: 'Assustador' },
  { value: 'Christmas', label: 'Natal' }
];

const BLACKLIST_FLAGS = [
  { value: 'nsfw', label: 'Conteúdo adulto (NSFW)' },
  { value: 'religious', label: 'Religioso' },
  { value: 'political', label: 'Político' },
  { value: 'racist', label: 'Racista' },
  { value: 'sexist', label: 'Sexista' },
  { value: 'explicit', label: 'Conteúdo explícito' }
];

const LANGUAGES = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'fr', label: 'Francês' },
  { value: 'de', label: 'Alemão' }
];

export function SearchForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categories: ['Programming'],
      amount: 5,
      blacklistFlags: ['racist', 'sexist'],
      language: 'pt'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Categorias</label>
        <div className={styles.checkboxGroup}>
          {CATEGORIES.map(category => (
            <div key={category.value} className={styles.checkbox}>
              <input
                type="checkbox"
                value={category.value}
                id={`category-${category.value}`}
                {...register('categories')}
              />
              <label htmlFor={`category-${category.value}`}>{category.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="amount" className={styles.label}>Quantidade</label>
        <input
          id="amount"
          type="number"
          min="1"
          max="10"
          className={styles.input}
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Filtros (Blacklist)</label>
        <div className={styles.checkboxGroup}>
          {BLACKLIST_FLAGS.map(flag => (
            <div key={flag.value} className={styles.checkbox}>
              <input
                type="checkbox"
                value={flag.value}
                id={`flag-${flag.value}`}
                {...register('blacklistFlags')}
              />
              <label htmlFor={`flag-${flag.value}`}>{flag.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="language" className={styles.label}>Idioma</label>
        <select id="language" className={styles.select} {...register('language')}>
          {LANGUAGES.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
        {errors.language && <p className={styles.error}>{errors.language.message}</p>}
      </div>

      <button type="submit" className={styles.button}>Buscar Piadas</button>
    </form>
  );
}
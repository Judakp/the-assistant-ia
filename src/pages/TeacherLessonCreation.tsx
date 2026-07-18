import { FormEvent, useState } from 'react';
import { supabase } from '../lib/supabase';

type LessonFormData = {
  title: string;
  subject: string;
  gradeLevel: string;
  programmingLanguage: string;
  learningObjectives: string;
  lessonContent: string;
};

const initialFormData: LessonFormData = {
  title: '',
  subject: '',
  gradeLevel: '',
  programmingLanguage: '',
  learningObjectives: '',
  lessonContent: '',
};

const fieldLabels: Record<keyof LessonFormData, string> = {
  title: 'Lesson title',
  subject: 'Subject',
  gradeLevel: 'Grade level',
  programmingLanguage: 'Programming language',
  learningObjectives: 'Learning objectives',
  lessonContent: 'Lesson content',
};

export default function TeacherLessonCreation() {
  const [formData, setFormData] = useState<LessonFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const updateField = (field: keyof LessonFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const validateForm = () => {
    const missingFields = (Object.keys(formData) as Array<keyof LessonFormData>).filter(
      (field) => formData[field].trim().length === 0,
    );

    if (missingFields.length > 0) {
      return `Please complete: ${missingFields.map((field) => fieldLabels[field]).join(', ')}.`;
    }

    return '';
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('lessons').insert({
      title: formData.title.trim(),
      subject: formData.subject.trim(),
      grade_level: formData.gradeLevel.trim(),
      programming_language: formData.programmingLanguage.trim(),
      learning_objectives: formData.learningObjectives.trim(),
      lesson_content: formData.lessonContent.trim(),
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message || 'Unable to save the lesson. Please try again.');
      return;
    }

    setSuccessMessage('Lesson saved successfully.');
    setFormData(initialFormData);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">AI Co-Teacher MVP</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Create a lesson</h1>
          <p className="mt-3 text-slate-600">
            Add the core lesson details your co-teacher will use in future MVP features.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Lesson title</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={formData.title}
                onChange={(event) => updateField('title', event.target.value)}
                placeholder="Intro to variables"
                type="text"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Subject</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={formData.subject}
                onChange={(event) => updateField('subject', event.target.value)}
                placeholder="Computer Science"
                type="text"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Grade level</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={formData.gradeLevel}
                onChange={(event) => updateField('gradeLevel', event.target.value)}
                placeholder="8th grade"
                type="text"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Programming language</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                value={formData.programmingLanguage}
                onChange={(event) => updateField('programmingLanguage', event.target.value)}
                placeholder="Python"
                type="text"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Learning objectives</span>
            <textarea
              className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              value={formData.learningObjectives}
              onChange={(event) => updateField('learningObjectives', event.target.value)}
              placeholder="Students will define variables and use them in simple expressions."
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Lesson content</span>
            <textarea
              className="mt-2 min-h-48 w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              value={formData.lessonContent}
              onChange={(event) => updateField('lessonContent', event.target.value)}
              placeholder="Warm-up, direct instruction, guided practice, and exit ticket notes..."
            />
          </label>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
              {successMessage}
            </div>
          )}

          <button
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300 sm:w-auto"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Saving lesson...' : 'Save lesson'}
          </button>
        </form>
      </section>
    </main>
  );
}

import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { randomBytes } from 'crypto';

interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
  feedback: string;
  intention: string;
}

@Injectable()
export class QuizService {
  private readonly questions: QuizQuestion[] = [
    {
      id: 1,
      category: 'Hogar',
      question: '¿A quién suele considerarse "más apto" para tomar decisiones importantes en el hogar?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Ambos',
      feedback: 'Las decisiones pueden construirse en equipo. La capacidad para decidir no depende del género, sino del diálogo, la experiencia y el respeto mutuo.',
      intention: 'Cuestionar la creencia de que el "liderazgo del hogar" pertenece a un género.'
    },
    {
      id: 2,
      category: 'Sociedad',
      question: '¿Quién enfrenta mayor presión social para ocultar emociones como la tristeza o el miedo?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Hombre',
      feedback: 'A muchos hombres se les enseña desde niños a "ser fuertes" evitando mostrar emociones, lo cual limita su bienestar emocional.',
      intention: 'Mostrar que los estereotipos también afectan y limitan a los hombres.'
    },
    {
      id: 3,
      category: 'Sociedad',
      question: '¿A quién se le exige con mayor frecuencia cuidar su apariencia física para "encajar"?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Mujer',
      feedback: 'Muchas culturas esperan que las mujeres "luzcan perfectas", generando presión estética. Es necesario fomentar la aceptación y la diversidad corporal.',
      intention: 'Evidenciar la presión estética diferencial.'
    },
    {
      id: 4,
      category: 'Sociedad',
      question: '¿Quién es más juzgado socialmente si decide no tener hijos?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Mujer',
      feedback: 'A muchas mujeres se les vincula con la maternidad como destino obligatorio. La decisión de no tener hijos es válida para cualquier persona.',
      intention: 'Cuestionar la maternidad como mandato.'
    },
    {
      id: 5,
      category: 'Profesional',
      question: '¿Quién suele ser interrumpido con más frecuencia al hablar en reuniones sociales o laborales?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Mujer',
      feedback: 'Diversos estudios muestran que las mujeres son interrumpidas con mayor frecuencia, lo que reduce su participación y su visibilidad en espacios de liderazgo.',
      intention: 'Visibilizar desigualdades en la comunicación y el poder simbólico.'
    },
    {
      id: 6,
      category: 'Profesional',
      question: '¿Quién recibe más cuestionamientos cuando llega tarde del trabajo alegando "cansancio"?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Mujer',
      feedback: 'Persiste la idea de que "debe encargarse del hogar", por eso se le exige doble. La corresponsabilidad es clave en cualquier familia.',
      intention: 'Señalar el peso de la doble jornada laboral doméstica.'
    },
    {
      id: 7,
      category: 'Hogar',
      question: '¿Quién puede asumir el rol de proveedor económico en una familia?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Ambos',
      feedback: 'Cualquier persona puede sostener un hogar. La independencia económica no es un atributo masculino, sino una posibilidad humana.',
      intention: 'Romper el vínculo "hombre = proveedor".'
    },
    {
      id: 8,
      category: 'Profesional',
      question: '¿Quién suele recibir más dudas o desconfianza al asumir cargos de liderazgo?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Mujer',
      feedback: 'Aún existen prejuicios que subestiman el liderazgo femenino. Reconocerlo es el primer paso para transformarlo.',
      intention: 'Evidenciar barreras en espacios de poder.'
    },
    {
      id: 9,
      category: 'Sociedad',
      question: '¿Quién tiene permiso socialmente para expresar vulnerabilidad sin ser juzgado?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Mujer',
      feedback: 'Expresar emociones debería ser libre para todos. Cada persona puede sentir, llorar y pedir ayuda sin etiquetarse.',
      intention: 'Mostrar cómo la emocionalidad también está estereotipada.'
    },
    {
      id: 10,
      category: 'Hogar',
      question: '¿Quién debería responsabilizarse del cuidado, la educación y las labores del hogar?',
      options: ['Hombre', 'Mujer', 'Ambos'],
      correctAnswer: 'Ambos',
      feedback: 'El cuidado compartido fortalece a la familia y educa en igualdad. No existe un rol "natural" asignado a un género.',
      intention: 'Proponer corresponsabilidad como ideal.'
    }
  ];

  constructor(@Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient) {}

  async getQuestions() {
    // Retornar preguntas sin la respuesta correcta para evitar trampas
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.questions.map(({ correctAnswer, ...question }) => question);
  }

  async generateGameCode(userId: string, score: number, totalQuestions: number): Promise<string> {
    // Generar código único de 8 caracteres
    const code = randomBytes(4).toString('hex').toUpperCase();
    
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Guardar el código en la base de datos con expiración de 1 hora
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const { error } = await this.supabase
      .from('game_codes')
      .insert({
        code,
        user_id: userId,
        score,
        percentage,
        expires_at: expiresAt.toISOString(),
        used: false,
      });

    if (error) {
      throw new Error('Error al generar código del juego');
    }

    return code;
  }

  async validateCode(code: string): Promise<{ valid: boolean; score?: number; percentage?: number; userId?: string }> {
    const { data, error } = await this.supabase
      .from('game_codes')
      .select('*')
      .eq('code', code)
      .eq('used', false)
      .single();

    if (error || !data) {
      return { valid: false };
    }

    // Verificar expiración
    const expiresAt = new Date(data.expires_at);
    if (expiresAt < new Date()) {
      return { valid: false };
    }

    return {
      valid: true,
      score: data.score,
      percentage: data.percentage,
      userId: data.user_id,
    };
  }

  async markCodeAsUsed(code: string): Promise<void> {
    await this.supabase
      .from('game_codes')
      .update({ used: true })
      .eq('code', code);
  }

  async saveScoreToLeaderboard(userId: string, score: number, submissionCode: string): Promise<void> {
    const totalQuestions = 10;
    const correctAnswers = score;

    const { error } = await this.supabase
      .from('scores')
      .insert({
        user_id: userId,
        score,
        correct_answers: correctAnswers,
        total_questions: totalQuestions,
        submission_code: submissionCode,
        verified: true,
        submitted_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error al guardar puntaje en leaderboard:', error);
      throw new Error('Error al guardar el puntaje en el ranking');
    }
  }

  async getUserAttempts(userId: string): Promise<{ count: number; remaining: number }> {
    const MAX_ATTEMPTS = 3;

    const { data, error } = await this.supabase
      .from('scores')
      .select('id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error al obtener intentos del usuario:', error);
      throw new Error('Error al verificar intentos');
    }

    const count = data?.length || 0;
    const remaining = Math.max(0, MAX_ATTEMPTS - count);

    return { count, remaining };
  }

  async canUserPlayQuiz(userId: string): Promise<boolean> {
    const { remaining } = await this.getUserAttempts(userId);
    return remaining > 0;
  }

  calculateScore(answers: { questionId: number; answer: string }[]): { score: number; details: any[] } {
    const details = answers.map(({ questionId, answer }) => {
      const question = this.questions.find(q => q.id === questionId);
      if (!question) {
        return { questionId, correct: false, feedback: 'Pregunta no encontrada' };
      }

      const isCorrect = answer === question.correctAnswer;
      return {
        questionId,
        correct: isCorrect,
        feedback: question.feedback,
        correctAnswer: question.correctAnswer,
        userAnswer: answer,
      };
    });

    const score = details.filter(d => d.correct).length;
    return { score, details };
  }
}

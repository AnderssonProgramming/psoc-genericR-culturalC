import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

@Injectable()
export class ChatService {
  private readonly huggingFaceApiKey: string;
  private readonly groqApiKey: string;
  private readonly useLocalModel: boolean;
  private readonly pythonAiServiceUrl: string;
  private readonly ollamaBaseUrl: string;
  private readonly ollamaModel: string;
  private readonly systemContext = `Eres un asistente educativo del juego "Gender Quest" sobre roles de género y equidad.

CONTEXTO DE LA APLICACIÓN:
- Gender Quest es un quiz interactivo de 10 preguntas sobre roles de género
- Categorías: Hogar, Sociedad, y Profesional
- Objetivo: Cuestionar estereotipos y promover reflexión sobre equidad de género
- Los usuarios responden preguntas y reciben feedback educativo
- Al finalizar obtienen un puntaje y aparecen en un ranking global

TEMAS PRINCIPALES:
1. Roles de género en el hogar (tareas domésticas, crianza, decisiones)
2. Estereotipos sociales (emociones, apariencia, maternidad/paternidad)
3. Desigualdad en el ámbito profesional (liderazgo, brecha salarial, oportunidades)

Tu rol es:
✅ Responder preguntas sobre roles de género, estereotipos y equidad
✅ Explicar conceptos del juego y sus categorías
✅ Proporcionar información educativa y basada en evidencia
✅ Mantener un tono respetuoso, inclusivo y educativo
✅ Responder en español de forma concisa (máximo 3-4 párrafos)

❌ NO debes:
- Juzgar o criticar las respuestas del usuario
- Dar opiniones políticas extremas
- Usar lenguaje ofensivo o discriminatorio`;

  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    private readonly configService: ConfigService,
  ) {
    this.huggingFaceApiKey = this.configService.get<string>('HUGGINGFACE_API_KEY');
    this.groqApiKey = this.configService.get<string>('GROQ_API_KEY');
    this.useLocalModel = this.configService.get<string>('USE_LOCAL_MODEL') === 'true';
    this.pythonAiServiceUrl = this.configService.get<string>('PYTHON_AI_SERVICE_URL') || 'http://localhost:5000';
    this.ollamaBaseUrl = this.configService.get<string>('OLLAMA_BASE_URL') || 'http://localhost:11434';
    this.ollamaModel = this.configService.get<string>('OLLAMA_MODEL') || 'phi3';
    
    // Logs de diagnóstico
    console.log('🔍 Configuración del Chatbot:');
    console.log(`   USE_LOCAL_MODEL: ${this.useLocalModel}`);
    console.log(`   GROQ_API_KEY configurado: ${!!this.groqApiKey}`);
    console.log(`   GROQ_API_KEY primeros caracteres: ${this.groqApiKey?.substring(0, 10)}...`);
    console.log(`   HUGGINGFACE_API_KEY configurado: ${!!this.huggingFaceApiKey}`);
    
    if (this.useLocalModel) {
      console.log(`🤖 Usando modelo GPT-OSS vía Python AI Service: ${this.pythonAiServiceUrl}`);
      this.checkPythonAiService();
    } else if (this.groqApiKey) {
      console.log('✅ Usando Groq API (Llama 3.3 70B)');
    } else if (!this.huggingFaceApiKey || this.huggingFaceApiKey === 'tu_token_aqui') {
      console.warn('⚠️  Ni GROQ_API_KEY ni HUGGINGFACE_API_KEY configurados. El chat usará respuestas de demostración.');
    } else {
      console.log('✅ Usando HuggingFace Inference API (fallback)');
    }
  }

  private async checkPythonAiService(): Promise<void> {
    try {
      const response = await fetch(`${this.pythonAiServiceUrl}/health`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Python AI Service conectado (${data.device})`);
      } else {
        console.warn('⚠️  Python AI Service no disponible. Verifica que esté corriendo.');
      }
    } catch (error) {
      console.warn('⚠️  No se pudo conectar con Python AI Service. Asegúrate de iniciar el servicio:');
      console.warn('   cd back/python-ai-service');
      console.warn('   python app.py');
    }
  }

  private async callHuggingFace(messages: any[]): Promise<string> {
    console.log('🔍 callAI - Inicio');
    console.log(`   useLocalModel: ${this.useLocalModel}`);
    console.log(`   groqApiKey existe: ${!!this.groqApiKey}`);
    
    // Prioridad 1: Usar Python AI Service con GPT-OSS
    if (this.useLocalModel) {
      console.log('📍 Ruta 1: Usando Python AI Service');
      return this.callPythonAiService(messages);
    }
    
    // Prioridad 2: Usar Groq API (MEJOR OPCIÓN)
    if (this.groqApiKey) {
      console.log('📍 Ruta 2: Usando Groq API');
      return this.callGroq(messages);
    }
    
    // Prioridad 3: Usar respuestas demo inteligentes
    console.log('📍 Ruta 3: Usando respuestas demo educativas');
    return this.getDemoResponse(messages.at(-1).content);
  }

  private async callGroq(messages: any[]): Promise<string> {
    try {
      console.log('🚀 Llamando a Groq API...');
      
      // Groq usa el formato estándar de OpenAI
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Modelo GRATIS y muy potente (reemplazo de 3.1)
          messages: [
            {
              role: 'system',
              content: this.systemContext,
            },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Groq API error:', response.status, errorText);
        throw new Error(`Groq API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Respuesta de Groq recibida');
      
      if (data?.choices?.[0]?.message?.content) {
        const reply = data.choices[0].message.content.trim();
        console.log(`✅ Respuesta parseada: ${reply.substring(0, 100)}...`);
        return reply;
      }
      
      console.error('❌ Respuesta inesperada de Groq:', JSON.stringify(data));
      throw new Error('Formato de respuesta inesperado de Groq API');
    } catch (error) {
      console.error('❌ Error calling Groq:', error);
      throw error;
    }
  }

  private async callPythonAiService(messages: any[]): Promise<string> {
    try {
      console.log(`🤖 Llamando a Python AI Service (GPT-OSS)...`);
      
      const response = await fetch(`${this.pythonAiServiceUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Python AI Service error:', response.status, errorText);
        
        // Si el servicio no está disponible, usar demo
        if (response.status === 404 || response.status === 500 || response.status === 503) {
          console.log('⚠️  Python AI Service no disponible. Verifica que esté instalado y corriendo.');
          console.log('   Instrucciones:');
          console.log('   1. cd back/python-ai-service');
          console.log('   2. python -m venv venv');
          console.log('   3. venv\\Scripts\\activate (Windows) o source venv/bin/activate (Linux/Mac)');
          console.log('   4. pip install -r requirements.txt');
          console.log('   5. python app.py');
          return this.getDemoResponse(messages.at(-1).content);
        }
        
        throw new Error('Error al conectar con Python AI Service');
      }

      const data = await response.json();
      
      if (data?.message) {
        console.log('✅ Respuesta de Python AI Service recibida');
        return data.message.trim();
      }
      
      console.error('Respuesta inesperada de Python AI Service:', data);
      return this.getDemoResponse(messages.at(-1).content);
    } catch (error) {
      console.error('Error calling Python AI Service:', error);
      console.log('💡 Tip: Asegúrate de que el servicio Python esté corriendo en', this.pythonAiServiceUrl);
      return this.getDemoResponse(messages.at(-1).content);
    }
  }

  private formatPrompt(messages: any[]): string {
    // Formato simple para GPT-2
    // GPT-2 simplemente continúa el texto que le des
    let prompt = `Este es un asistente educativo sobre Gender Quest, un juego sobre roles de género y equidad.\n\n`;
    
    // Incluir solo los últimos 3 mensajes para mantenerlo corto
    const recentMessages = messages.slice(-3);
    
    for (const msg of recentMessages) {
      if (msg.role === 'user') {
        prompt += `Usuario: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        prompt += `Asistente: ${msg.content}\n`;
      }
    }
    
    prompt += `Asistente:`;
    return prompt;
  }

  private formatPromptForPhi(messages: any[]): string {
    // Formato para Microsoft Phi-3
    let prompt = `<|system|>\n${this.systemContext}<|end|>\n`;
    
    for (const msg of messages) {
      if (msg.role === 'user') {
        prompt += `<|user|>\n${msg.content}<|end|>\n`;
      } else if (msg.role === 'assistant') {
        prompt += `<|assistant|>\n${msg.content}<|end|>\n`;
      }
    }
    
    prompt += '<|assistant|>\n';
    return prompt;
  }

  private getDemoResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Respuestas contextualizadas sobre la aplicación
    if (lowerMessage.includes('gender quest') || lowerMessage.includes('juego') || lowerMessage.includes('aplicación')) {
      return `Gender Quest es un juego educativo interactivo diseñado para cuestionar estereotipos de género. Consta de 10 preguntas divididas en tres categorías: Hogar, Sociedad y Profesional.

Al responder, recibirás feedback inmediato que te ayudará a reflexionar sobre cómo los roles de género afectan diferentes aspectos de la vida. Al finalizar, tu puntaje se guarda automáticamente en el ranking global, donde puedes comparar tus resultados con otros jugadores.

¿Te gustaría saber más sobre alguna categoría específica del juego?`;
    }
    
    if (lowerMessage.includes('categoría') || lowerMessage.includes('categorias')) {
      return `El quiz tiene 3 categorías principales:

🏠 **Hogar**: Explora roles en tareas domésticas, crianza de hijos y toma de decisiones familiares. Cuestiona la idea de que ciertas tareas "pertenecen" a un género específico.

🌍 **Sociedad**: Analiza estereotipos sobre emociones, apariencia física y presión social. Reflexiona sobre cómo la sociedad espera que hombres y mujeres se comporten de manera diferente.

💼 **Profesional**: Examina desigualdades en liderazgo, brecha salarial y oportunidades laborales. Identifica barreras que enfrentan diferentes géneros en el mundo laboral.

¿Sobre cuál categoría te gustaría profundizar?`;
    }

    if (lowerMessage.includes('rol') && lowerMessage.includes('género')) {
      return `Los roles de género son expectativas sociales sobre cómo deben comportarse hombres y mujeres. Estos roles no son biológicos, sino construcciones culturales que varían según la sociedad y época.

**Ejemplos comunes:**
- "Las mujeres deben cuidar del hogar" → Limita oportunidades profesionales
- "Los hombres no deben mostrar emociones" → Afecta salud mental
- "Ciertas profesiones son 'para hombres' o 'para mujeres'" → Perpetúa desigualdad laboral

El objetivo de Gender Quest es ayudarte a identificar estos estereotipos y reflexionar sobre su impacto. La equidad de género beneficia a todas las personas al eliminar estas limitaciones arbitrarias.`;
    }

    if (lowerMessage.includes('intentos') || lowerMessage.includes('veces')) {
      return `Cada usuario registrado tiene un límite de **3 intentos** para completar el quiz. Esto asegura que el ranking sea justo y que cada participación sea significativa.

Tu puntaje se guarda automáticamente al finalizar cada intento, y apareces inmediatamente en el ranking global. Puedes ver cuántos intentos te quedan en la pantalla de bienvenida del juego.

Si ya usaste tus 3 intentos, puedes ver el ranking para comparar tus resultados con otros jugadores. ¿Tienes alguna duda sobre cómo funciona el sistema de puntajes?`;
    }

    // Respuesta genérica educativa
    return `¡Hola! Soy el asistente de Gender Quest 👋

Estoy aquí para ayudarte con preguntas sobre roles de género, estereotipos y equidad. También puedo explicarte cómo funciona el juego y sus categorías.

**Puedes preguntarme sobre:**
- Los roles de género en diferentes ámbitos (hogar, sociedad, trabajo)
- Cómo funcionan las categorías del quiz
- Información sobre estereotipos y su impacto
- Conceptos de equidad e igualdad de género

¿En qué puedo ayudarte?`;
  }

  async sendMessage(userId: string, message: string, sessionId?: string) {
    console.log('🔵 sendMessage llamado');
    console.log(`   userId: ${userId}`);
    console.log(`   message: ${message.substring(0, 50)}...`);
    console.log(`   sessionId: ${sessionId || 'nuevo'}`);
    
    try {
      // Get or create session
      let session;
      if (sessionId) {
        const { data } = await this.supabase
          .from('chat_sessions')
          .select('*')
          .eq('id', sessionId)
          .eq('user_id', userId)
          .single();
        session = data;
      }

      if (!session) {
        // Create new session
        const { data: newSession } = await this.supabase
          .from('chat_sessions')
          .insert({
            user_id: userId,
            messages: [],
          })
          .select()
          .single();
        session = newSession;
      }

      // Get conversation history
      const messages = session.messages || [];
      messages.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      });

      // Call Hugging Face API
      const conversationMessages = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      
      console.log('📞 Llamando a callHuggingFace...');
      const assistantMessage = await this.callHuggingFace(conversationMessages);
      console.log(`✅ Respuesta recibida: ${assistantMessage.substring(0, 100)}...`);

      // Save assistant response
      messages.push({
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date().toISOString(),
      });

      // Update session
      await this.supabase
        .from('chat_sessions')
        .update({ messages })
        .eq('id', session.id);

      return {
        sessionId: session.id,
        message: assistantMessage,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error en sendMessage:', error);
      console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack');
      
      // Si hay error, usar respuesta demo y avisar al usuario
      return {
        sessionId: sessionId || 'demo',
        message: `⚠️ Error al conectar con el servicio de IA: ${error instanceof Error ? error.message : 'Error desconocido'}. Por favor, intenta de nuevo en unos momentos.`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getChatHistory(userId: string, sessionId: string) {
    const { data: session } = await this.supabase
      .from('chat_sessions')
      .select('messages')
      .eq('id', sessionId)
      .eq('user_id', userId)
      .single();

    if (!session) {
      return [];
    }

    return session.messages || [];
  }

  async getUserSessions(userId: string) {
    const { data: sessions } = await this.supabase
      .from('chat_sessions')
      .select('id, started_at, messages')
      .eq('user_id', userId)
      .order('started_at', { ascending: false });

    return sessions.map((s) => ({
      id: s.id,
      startedAt: s.started_at,
      messageCount: s.messages?.length || 0,
      lastMessage: s.messages?.at(-1)?.content?.substring(0, 100) || '',
    }));
  }

  // Método de diagnóstico para verificar configuración
  getConfig() {
    let mode = 'Demo Mode (No API Key)';
    if (this.useLocalModel) {
      mode = 'Python AI Service (Local)';
    } else if (this.groqApiKey) {
      mode = 'Groq API (Llama 3.3 70B)';
    } else if (this.huggingFaceApiKey && this.huggingFaceApiKey !== 'tu_token_aqui') {
      mode = 'HuggingFace Inference API';
    }
    
    return {
      useLocalModel: this.useLocalModel,
      hasGroqKey: !!this.groqApiKey,
      groqKeyPrefix: this.groqApiKey?.substring(0, 10),
      hasHuggingFaceKey: !!this.huggingFaceApiKey,
      pythonAiServiceUrl: this.pythonAiServiceUrl,
      mode,
    };
  }
}

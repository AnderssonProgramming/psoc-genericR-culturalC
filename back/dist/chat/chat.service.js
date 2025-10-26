"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let ChatService = class ChatService {
    constructor(supabase, configService) {
        this.supabase = supabase;
        this.configService = configService;
        this.systemContext = `Eres un asistente educativo del juego "Gender Quest" sobre roles de género y equidad.

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
        this.huggingFaceApiKey = this.configService.get('HUGGINGFACE_API_KEY');
        this.useLocalModel = this.configService.get('USE_LOCAL_MODEL') === 'true';
        this.ollamaBaseUrl = this.configService.get('OLLAMA_BASE_URL') || 'http://localhost:11434';
        this.ollamaModel = this.configService.get('OLLAMA_MODEL') || 'phi3';
        if (this.useLocalModel) {
            console.log(`🤖 Usando modelo local Ollama: ${this.ollamaModel}`);
        }
        else if (!this.huggingFaceApiKey || this.huggingFaceApiKey === 'tu_token_aqui') {
            console.warn('⚠️  HUGGINGFACE_API_KEY no configurado. El chat usará respuestas de demostración.');
        }
    }
    async callHuggingFace(messages) {
        if (this.useLocalModel) {
            return this.callOllama(messages);
        }
        if (!this.huggingFaceApiKey || this.huggingFaceApiKey === 'tu_token_aqui') {
            return this.getDemoResponse(messages.at(-1).content);
        }
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.huggingFaceApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: this.formatPromptForPhi(messages),
                    parameters: {
                        max_new_tokens: 400,
                        temperature: 0.7,
                        top_p: 0.9,
                        do_sample: true,
                        return_full_text: false,
                    },
                    options: {
                        wait_for_model: true,
                        use_cache: true,
                    },
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Hugging Face API error:', response.status, errorText);
                if (response.status === 503 || response.status === 404) {
                    console.log('Modelo no disponible, usando respuestas demo');
                    return this.getDemoResponse(messages.at(-1).content);
                }
                throw new Error('Error al conectar con Hugging Face');
            }
            const data = await response.json();
            if (Array.isArray(data) && data[0]?.generated_text) {
                return data[0].generated_text.trim();
            }
            else if (data?.generated_text) {
                return data.generated_text.trim();
            }
            else if (typeof data === 'string') {
                return data.trim();
            }
            console.error('Respuesta inesperada de Hugging Face:', data);
            return this.getDemoResponse(messages.at(-1).content);
        }
        catch (error) {
            console.error('Error calling Hugging Face:', error);
            return this.getDemoResponse(messages.at(-1).content);
        }
    }
    async callOllama(messages) {
        try {
            console.log(`🤖 Llamando a Ollama (${this.ollamaModel})...`);
            const response = await fetch(`${this.ollamaBaseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: this.ollamaModel,
                    messages: [
                        {
                            role: 'system',
                            content: this.systemContext,
                        },
                        ...messages.map((m) => ({
                            role: m.role,
                            content: m.content,
                        })),
                    ],
                    stream: false,
                    options: {
                        temperature: 0.7,
                        num_predict: 400,
                    },
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Ollama error:', response.status, errorText);
                if (response.status === 404 || response.status === 500) {
                    console.log('⚠️  Ollama no disponible. Verifica que esté instalado y corriendo.');
                    console.log('   Instala: https://ollama.ai/download');
                    console.log(`   Ejecuta: ollama pull ${this.ollamaModel}`);
                    return this.getDemoResponse(messages.at(-1).content);
                }
                throw new Error('Error al conectar con Ollama');
            }
            const data = await response.json();
            if (data?.message?.content) {
                console.log('✅ Respuesta de Ollama recibida');
                return data.message.content.trim();
            }
            console.error('Respuesta inesperada de Ollama:', data);
            return this.getDemoResponse(messages.at(-1).content);
        }
        catch (error) {
            console.error('Error calling Ollama:', error);
            console.log('💡 Tip: Asegúrate de que Ollama esté corriendo (ollama serve)');
            return this.getDemoResponse(messages.at(-1).content);
        }
    }
    formatPrompt(messages) {
        let prompt = `<s>[INST] ${this.systemContext}\n\n`;
        for (let index = 0; index < messages.length; index++) {
            const msg = messages[index];
            if (msg.role === 'user') {
                if (index === messages.length - 1) {
                    prompt += `${msg.content} [/INST]`;
                }
                else {
                    prompt += `${msg.content} [/INST] `;
                }
            }
            else if (msg.role === 'assistant') {
                prompt += `${msg.content}</s><s>[INST] `;
            }
        }
        return prompt;
    }
    formatPromptForPhi(messages) {
        let prompt = `<|system|>\n${this.systemContext}<|end|>\n`;
        for (const msg of messages) {
            if (msg.role === 'user') {
                prompt += `<|user|>\n${msg.content}<|end|>\n`;
            }
            else if (msg.role === 'assistant') {
                prompt += `<|assistant|>\n${msg.content}<|end|>\n`;
            }
        }
        prompt += '<|assistant|>\n';
        return prompt;
    }
    getDemoResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
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
        return `¡Hola! Soy el asistente de Gender Quest 👋

Estoy aquí para ayudarte con preguntas sobre roles de género, estereotipos y equidad. También puedo explicarte cómo funciona el juego y sus categorías.

**Puedes preguntarme sobre:**
- Los roles de género en diferentes ámbitos (hogar, sociedad, trabajo)
- Cómo funcionan las categorías del quiz
- Información sobre estereotipos y su impacto
- Conceptos de equidad e igualdad de género

¿En qué puedo ayudarte?`;
    }
    async sendMessage(userId, message, sessionId) {
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
        const messages = session.messages || [];
        messages.push({
            role: 'user',
            content: message,
            timestamp: new Date().toISOString(),
        });
        const conversationMessages = messages.map((m) => ({
            role: m.role,
            content: m.content,
        }));
        const assistantMessage = await this.callHuggingFace(conversationMessages);
        messages.push({
            role: 'assistant',
            content: assistantMessage,
            timestamp: new Date().toISOString(),
        });
        await this.supabase
            .from('chat_sessions')
            .update({ messages })
            .eq('id', session.id);
        return {
            sessionId: session.id,
            message: assistantMessage,
            timestamp: new Date().toISOString(),
        };
    }
    async getChatHistory(userId, sessionId) {
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
    async getUserSessions(userId) {
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
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient,
        config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
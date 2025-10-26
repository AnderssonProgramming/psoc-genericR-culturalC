"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseModule = exports.SUPABASE_CLIENT = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("@nestjs/config");
exports.SUPABASE_CLIENT = 'SUPABASE_CLIENT';
let SupabaseModule = class SupabaseModule {
};
exports.SupabaseModule = SupabaseModule;
exports.SupabaseModule = SupabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.SUPABASE_CLIENT,
                useFactory: (configService) => {
                    const supabaseUrl = configService.get('SUPABASE_URL');
                    const supabaseKey = configService.get('SUPABASE_SERVICE_ROLE_KEY');
                    if (!supabaseUrl || !supabaseKey) {
                        throw new Error('Supabase credentials not found in environment variables');
                    }
                    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: [exports.SUPABASE_CLIENT],
    })
], SupabaseModule);
//# sourceMappingURL=supabase.module.js.map
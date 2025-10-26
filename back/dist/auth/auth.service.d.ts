import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private supabase;
    private jwtService;
    constructor(supabase: SupabaseClient, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: any;
            username: any;
            email: any;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: any;
            username: any;
            email: any;
            avatar_url: any;
        };
        token: string;
    }>;
    validateUser(userId: string): Promise<{
        id: any;
        username: any;
        email: any;
        avatar_url: any;
    }>;
}

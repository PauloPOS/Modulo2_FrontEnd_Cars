export interface Usuario {
    id?: number; // Opcional porque será gerado automaticamente pelo backend
    email: string; // E-mail único
    nome: string; // Nome do usuário
    cargo: string; // Cargo do usuário
    avatar?: string; // URL ou caminho para o avatar (opcional)
    password: string; // Senha do usuário
  }
  
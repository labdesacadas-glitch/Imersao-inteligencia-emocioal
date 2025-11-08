# Regras do Editor de IA e Diretrizes do Projeto (Dyad)

Este documento descreve a pilha técnica e as regras específicas de uso de bibliotecas para manter a consistência e a qualidade do projeto.

## 1. Visão Geral da Pilha Técnica

*   **Framework:** React (utilizando Vite e TypeScript).
*   **Linguagem:** TypeScript para toda a lógica e componentes da aplicação.
*   **Estilização:** Tailwind CSS, utilizando a paleta de cores personalizada definida em `tailwind.config.ts` (ex: cores `zen`, `primary`, `secondary`).
*   **Biblioteca de UI:** shadcn/ui (construída sobre Radix UI) para todos os componentes padrão (Button, Card, Input, etc.).
*   **Roteamento:** React Router DOM para navegação. Todas as rotas principais estão definidas em `src/App.tsx`.
*   **Ícones:** Lucide React.
*   **Formulários e Validação:** React Hook Form combinado com Zod para validação de esquema.
*   **Notificações:** Use `sonner` para toasts globais/persistentes e o `toast` padrão do shadcn (via hook `useToast`) para feedback transitório ao usuário.
*   **Persistência de Dados:** Local Storage, gerenciado exclusivamente através das funções utilitárias em `src/utils/storage.ts`.
*   **Geração de PDF:** `jspdf` para criar documentos para download.

## 2. Regras de Uso de Bibliotecas

| Funcionalidade | Biblioteca/Localização Obrigatória | Notas |
| :--- | :--- | :--- |
| **Componentes** | `src/components/ui/` (shadcn) ou novos arquivos em `src/components/` | Não modifique arquivos shadcn. Crie novos componentes para personalização. |
| **Estilização** | Tailwind CSS | Use classes utilitárias e princípios de design responsivo. Consulte `src/index.css` para classes personalizadas como `.glass-card`. |
| **Roteamento** | `react-router-dom` | Use `useNavigate`, `useParams` e `NavLink` desta biblioteca. |
| **Formulários** | `react-hook-form` & `zod` | Use Zod para definir esquemas e `@hookform/resolvers` para integração. |
| **Ícones** | `lucide-react` | Use ícones apenas deste pacote. |
| **Dados Locais** | `src/utils/storage.ts` | Todas as interações com `localStorage` devem ser encapsuladas aqui. |
| **Geração de PDF** | `jspdf` | As utilidades estão localizadas em `src/utils/pdfGenerator.ts`. |
| **Hooks** | `src/hooks/` | Hooks personalizados como `useDebounce` devem residir aqui. |

## 3. Diretrizes Arquitetônicas

1.  **Estrutura de Arquivos:** Mantenha a estrutura existente (`src/pages/`, `src/components/`, `src/utils/`, `src/hooks/`).
2.  **Tamanho do Componente:** Procure criar componentes pequenos e focados (idealmente com menos de 100 linhas).
3.  **Integridade:** Todas as alterações de código devem ser totalmente funcionais e completas; evite placeholders ou implementações parciais.
4.  **Simplicidade:** Priorize soluções simples e elegantes em detrimento de padrões complexos e super-engenharia.
import { MemoryRouter } from "react-router-dom";
import Navbar from "./index";
import { AuthContext } from "../../hooks/useAuth";

const defaultAvatar = "https://i.pravatar.cc/150?img=12";

const mockAuthContextValue = {
  handleLogout: () => console.log("Logout acionado via Navbar"),
  isAuthenticated: true,
  user: { name: "Usuário da Navbar", email: "teste@usarp.com" },
};

const meta = {
  title: "Layouts/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "O componente de navegação principal. Inclui a logo da aplicação e o `ProfileDropdown` para gerenciamento do usuário logado.",
      },
    },
  },
  argTypes: {
    avatarUrl: {
      control: "text",
      description: "URL da foto de perfil do usuário passada para o dropdown.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "null" },
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <div style={{ minHeight: "300px", backgroundColor: "#f5f5f5" }}>
            <Story />
          </div>
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    avatarUrl: defaultAvatar,
  },
};

export const WithoutAvatar = {
  args: {
    avatarUrl: null,
  },
};

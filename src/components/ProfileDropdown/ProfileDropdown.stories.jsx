import { MemoryRouter } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { AuthContext } from "../../hooks/useAuth";

const defaultAvatar = "https://i.pravatar.cc/150?img=3";

const mockAuthContextValue = {
  handleLogout: () => console.log("Logout acionado no Storybook"),
  isAuthenticated: true,
  user: { name: "Usuário Teste" },
};

const meta = {
  title: "Components/ProfileDropdown",
  component: ProfileDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    avatarUrl: {
      control: "text",
      description: "URL da imagem do avatar",
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Story />
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

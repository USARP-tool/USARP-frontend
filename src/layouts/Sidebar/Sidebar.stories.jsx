import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";

const meta = {
  title: "Layouts/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex", backgroundColor: "#f5f5f5" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const HomeActive = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/home"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const ProjectsActive = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/project"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const BrainstormingActive = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/brainstorming"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

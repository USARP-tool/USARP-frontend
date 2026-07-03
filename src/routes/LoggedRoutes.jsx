import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../layouts/Layout/Layout";
import ProfileLayout from "../layouts/Profile/ProfileLayout";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Privacity from "../pages/Privacity";

import { ViewBrainstorming } from "../pages/ViewBrainstorming";
import Project from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";

import CreateProject from "../pages/CreateProject";
import CreateUserStory from "../pages/CreateUserStory";
import CreateBrainstorming from "../pages/CreateBrainstoming";

// deletar esses dois depois
import { RegisterBrainstorming } from "../pages/RegisterBrainstorming";

import { BrainstormingChecklist } from "../pages/BrainstormingChecklist";
import { OrdemUserstory } from "../pages/OrdemUserstory";
import ViewUserStories from "../pages/ViewUserStories";

export function LoggedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />

        <Route path="project" element={<Project />} />
        <Route path="project/:id" element={<ProjectDetails />} />
        <Route path="registerProject" element={<CreateProject />} />
        <Route path="editProject/:id" element={<CreateProject />} />

        <Route path="brainstorming" element={<ViewBrainstorming />} />
        <Route path="brainstormingChecklist" element={<BrainstormingChecklist />} />

        <Route path="registerUserstory" element={<CreateUserStory />} />
        <Route path="registerUserstory/:projectId" element={<CreateUserStory />} />
        <Route path="userstories/:projectId" element={<ViewUserStories />} />
        {/* mudar depois o brainstorming */}
        <Route path="registerBrainstorming" element={<RegisterBrainstorming />} />
        <Route path="registerBrainstormingold" element={<RegisterBrainstorming />} />

        <Route path="registerUserstory/:projectId" element={<CreateUserStory />} />
      </Route>

      <Route path="/ordemUserstory" element={<OrdemUserstory />} />

      <Route path="/configurations" element={<ProfileLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="privacity" element={<Privacity />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

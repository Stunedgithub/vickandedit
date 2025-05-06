// ... existing code ... <none - this is a new file>
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
}

function getProjects(): Project[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('vick-projects') || '[]');
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('vick-projects', JSON.stringify(projects));
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  function createProject() {
    if (!title.trim()) return;
    const newProject = { id: `${Date.now()}-${Math.random()}`, title: title.trim() };
    const newProjects = [newProject, ...projects];
    setProjects(newProjects);
    saveProjects(newProjects);
    setTitle('');
  }

  function deleteProject(id: string) {
    const after = projects.filter(p => p.id !== id);
    setProjects(after);
    saveProjects(after);
  }

  return (
    <div className="max-w-2xl mx-auto py-14 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#464fc3]">Your Projects</h1>
      <div className="flex gap-2 mb-8">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project name" className="border rounded px-4 py-2 w-full" />
        <button className="bg-[#464fc3] text-white px-4 py-2 rounded" onClick={createProject}>Create</button>
      </div>
      <ul className="space-y-3">
        {projects.length === 0 && <li className="text-[#888]">No projects yet. Create your first!</li>}
        {projects.map(project => (
          <li key={project.id} className="flex justify-between items-center bg-white rounded shadow p-3 border hover:border-[#464fc3]">
            <div className="flex items-center gap-2">
              <Link href={`/projects/${project.id}`} className="font-medium text-lg hover:underline text-[#464fc3]">{project.title}</Link>
            </div>
            <button className="text-red-500 hover:underline ml-4" onClick={() => deleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

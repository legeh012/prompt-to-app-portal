import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Folder, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  type: string;
}

interface ProjectsListProps {
  onSelectProject: (id: string) => void;
  selectedProject: string | null;
}

export const ProjectsList = ({ onSelectProject, selectedProject }: ProjectsListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ name: "", type: "app" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, name, type")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ variant: "destructive", title: "Error loading projects" });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const createProject = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ variant: "destructive", title: "Please sign in" });
      return;
    }

    const { error } = await supabase
      .from("projects")
      .insert([{ 
        name: newProject.name, 
        type: newProject.type as any,
        user_id: user.id 
      }]);

    if (error) {
      toast({ variant: "destructive", title: "Error creating project" });
    } else {
      toast({ title: "Project created!" });
      setDialogOpen(false);
      setNewProject({ name: "", type: "app" });
      fetchProjects();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="My Awesome Project"
              />
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select value={newProject.type} onValueChange={(value) => setNewProject({ ...newProject, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="app">App</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="bot">Bot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={createProject} className="w-full">Create</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-1">
        {projects.map((project) => (
          <Button
            key={project.id}
            variant={selectedProject === project.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelectProject(project.id)}
          >
            <Folder className="h-4 w-4 mr-2" />
            {project.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

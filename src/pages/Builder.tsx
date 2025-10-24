import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsList } from "@/components/builder/ProjectsList";
import { PromptGenerator } from "@/components/builder/PromptGenerator";
import { CodeEditor } from "@/components/builder/CodeEditor";
import { LivePreview } from "@/components/builder/LivePreview";
import { Sparkles, Code, Globe, Zap } from "lucide-react";

const Builder = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                No-Code Builder
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                API Docs
              </Button>
              <Button size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Deploy
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Projects */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectsList 
                  onSelectProject={setSelectedProject}
                  selectedProject={selectedProject}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* AI Prompt Generator */}
            <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI-Powered Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PromptGenerator 
                  projectId={selectedProject}
                  onCodeGenerated={setGeneratedCode}
                />
              </CardContent>
            </Card>

            {/* Builder Tabs */}
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="code">Code Editor</TabsTrigger>
                <TabsTrigger value="preview">Live Preview</TabsTrigger>
                <TabsTrigger value="api">API Builder</TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-6">
                <CodeEditor 
                  code={generatedCode}
                  projectId={selectedProject}
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <LivePreview 
                  code={generatedCode}
                  projectId={selectedProject}
                />
              </TabsContent>

              <TabsContent value="api" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-center py-12">
                      API Builder coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Builder;

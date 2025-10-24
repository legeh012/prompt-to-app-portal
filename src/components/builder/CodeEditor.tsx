import { Card, CardContent } from "@/components/ui/card";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  projectId: string | null;
}

export const CodeEditor = ({ code, projectId }: CodeEditorProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Editor
          height="600px"
          defaultLanguage="typescript"
          value={code || "// Your generated code will appear here..."}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            readOnly: false,
            scrollBeyondLastLine: false,
          }}
        />
      </CardContent>
    </Card>
  );
};

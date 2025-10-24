import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface LivePreviewProps {
  code: string;
  projectId: string | null;
}

export const LivePreview = ({ code, projectId }: LivePreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg bg-background min-h-[500px] p-6">
          {code ? (
            <iframe
              srcDoc={code}
              className="w-full h-full min-h-[500px] border-0"
              title="Preview"
              sandbox="allow-scripts"
            />
          ) : (
            <p className="text-muted-foreground text-center py-24">
              Generate code to see live preview
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

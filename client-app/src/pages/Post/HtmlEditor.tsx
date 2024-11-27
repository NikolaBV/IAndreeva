import JoditEditor from "jodit-react";
import React from "react";

interface HtmlEditorProps {
  editor: React.RefObject<any>;
  config: any;
  content: string;
  setContent: (content: string) => void;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({
  editor,
  config,
  content,
  setContent,
}) => {
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default HtmlEditor;

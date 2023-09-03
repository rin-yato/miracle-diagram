import { projectAtom } from "@/jotai/project-atom";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { getRectOfNodes, getTransformForBounds } from "reactflow";
import { toPng } from "html-to-image";

export function useImportExport() {
  const [project, setProjectRaw] = useAtom(projectAtom);

  const exportToJson = useCallback(() => {
    const data = JSON.stringify(project);

    const anchor = document.createElement("a");

    anchor.href = URL.createObjectURL(new Blob([data], { type: "text/plain" }));

    anchor.setAttribute("download", "miro-lang.json");

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  }, [project]);

  const importFromJson = useCallback(() => {
    const input = document.createElement("input");

    input.type = "file";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const data = reader.result as string;

        try {
          const project = JSON.parse(data);
          setProjectRaw(project);
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsText(file);
    };

    document.body.appendChild(input);

    input.click();

    document.body.removeChild(input);
  }, [setProjectRaw]);

  const exportToPng = useCallback(() => {
    const getDownloadTime = () => {
      const now = new Date(Date.now());
      const date_now = now
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
        .replaceAll(":", "-")
        .replaceAll(" ", "");

      return date_now;
    };

    const downloadImage = (dataUrl: string) => {
      const anchor = document.createElement("a");
      anchor.setAttribute(
        "download",
        `miracle-diagram-${getDownloadTime()}.png`
      );
      anchor.setAttribute("href", dataUrl);
      anchor.click();
    };

    const imgWidth = 1024;
    const imgHeight = 768;

    // calculate transform so that all nodes will be visible when using `getPng()`
    if (project) {
      const nodes = project.nodes;
      const nodesBounds = getRectOfNodes(nodes);
      const transform = getTransformForBounds(
        nodesBounds,
        imgWidth,
        imgHeight,
        0.5,
        2
      );

      toPng(document.querySelector(".react-flow__viewport") as HTMLElement, {
        backgroundColor: "#222222",
        width: imgWidth,
        height: imgHeight,
        style: {
          width: `${imgWidth}`,
          height: `${imgHeight}`,
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }).then((dataUrl) => downloadImage(dataUrl));
    }
  }, [project]);

  return { exportToJson, importFromJson, exportToPng };
}

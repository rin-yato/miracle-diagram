import { edgesAtom } from '@/jotai/edges-atom';
import { mirolangAtom } from '@/jotai/miro-lang-atom';
import { nodesAtom } from '@/jotai/nodes-atom';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export function useImportExport() {
  const [code, setCode] = useAtom(mirolangAtom);
  const [nodes, setNode] = useAtom(nodesAtom);
  const [edges, setEdge] = useAtom(edgesAtom);

  const exportToJson = useCallback(() => {
    const data = JSON.stringify({ code, nodes, edges });

    const a = document.createElement('a');

    a.href = URL.createObjectURL(new Blob([data], { type: 'text/plain' }));

    a.setAttribute('download', 'miro-lang.json');

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  }, [code, nodes, edges]);

  const importFromJson = useCallback(() => {
    const input = document.createElement('input');

    input.type = 'file';

    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const data = reader.result as string;

        try {
          const { code, nodes, edges } = JSON.parse(data);
          setCode(code);
          setNode(nodes);
          setEdge(edges);
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsText(file);
    };

    document.body.appendChild(input);

    input.click();

    document.body.removeChild(input);
  }, [setCode, setNode, setEdge]);

  return { exportToJson, importFromJson };
}

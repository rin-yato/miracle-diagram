import { Relationship, Table } from '@/types/table';
import { SyntaxNode } from '@lezer/common';
import { parser } from './grammar/miro';

export class MiroLang {
  private miroLang: string;

  constructor(miroLang: string) {
    this.miroLang = miroLang;
  }

  private nodeToString(node: SyntaxNode | undefined): string {
    if (!node) return '';
    return this.miroLang.slice(node.from, node.to);
  }

  parse(): Array<Table> {
    const tree = parser.parse(this.miroLang);
    const tables: Array<Table> = [];

    tree
      .resolveInner(0)
      .getChildren('Table')
      .forEach(tableNode => {
        const tableName = this.nodeToString(tableNode.firstChild!);

        const columns = tableNode.getChildren('Column').map(columnNode => {
          const columnName = this.nodeToString(columnNode.firstChild!);
          const columnType = this.nodeToString(
            columnNode.getChild('ColumnType')!,
          );

          const columnConstraints = columnNode
            .getChildren('Constraint')
            .map(constraintNode => {
              return this.nodeToString(constraintNode);
            });

          const relationshipNode = columnNode.getChild('Relationship');

          const relationship: Relationship | null = relationshipNode && {
            tableName: this.nodeToString(relationshipNode.firstChild!),
            columnName: this.nodeToString(relationshipNode.lastChild!),
          };

          return {
            name: columnName,
            type: columnType,
            constraints: columnConstraints,
            relationships: relationship || undefined,
          };
        });

        tables.push({
          name: tableName,
          columns,
        });
      });

    return tables;
  }
}

import { Relationship, Table, relationshipSchema } from '@/lib/table';
import { SyntaxNode, Tree } from '@lezer/common';
import { parser } from './grammar/miro';

export class MiroLang {
  private miroLang: string;
  private tree: Tree;

  constructor(miroLang: string) {
    this.miroLang = miroLang;
    this.tree = parser.parse(this.miroLang);
  }

  private nodeToString(node: SyntaxNode | undefined | null): string {
    if (!node) return '';
    return this.miroLang.slice(node.from, node.to);
  }

  parse(): Array<Table> {
    const tables: Array<Table> = [];

    this.tree
      .resolveInner(0)
      .getChildren('Table')
      .forEach(tableNode => {
        const tableName = this.nodeToString(tableNode.firstChild!);

        const icon = this.nodeToString(
          tableNode.firstChild?.nextSibling,
        ).substring(2);

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
            source: { tableName, columnName },
            target: {
              tableName: this.nodeToString(relationshipNode.firstChild!),
              columnName: this.nodeToString(relationshipNode.lastChild!),
            },
          };

          const validRelationship = relationshipSchema.safeParse(relationship);

          return {
            name: columnName,
            type: columnType,
            constraints: columnConstraints,
            relationships: validRelationship.success
              ? validRelationship.data
              : undefined,
          };
        });

        tables.push({
          name: tableName,
          icon,
          columns,
        });
      });

    return tables;
  }

  addRelationship(relationship: Relationship) {
    const tableNode = this.tree
      .resolveInner(0)
      .getChildren('Table')
      .find(tableNode => {
        return (
          this.nodeToString(tableNode.firstChild!) ===
          relationship.source.tableName
        );
      });

    if (!tableNode) return;

    const columnNode = tableNode.getChildren('Column').find(columnNode => {
      return (
        this.nodeToString(columnNode.firstChild!) ===
        relationship.source.columnName
      );
    });

    if (!columnNode) return;

    const relationshipNode = columnNode.getChild('Relationship');

    if (!relationshipNode) {
      const relationshipCode = ` -> ${relationship.target.tableName}.${relationship.target.columnName}`;
      const updatedColumnCode =
        this.miroLang.slice(0, columnNode.to) +
        relationshipCode +
        this.miroLang.slice(columnNode.to);

      return updatedColumnCode;
    } else {
      const updatedRelationshipCode = `-> ${relationship.target.tableName}.${relationship.target.columnName}`;
      const updatedColumnCode =
        this.miroLang.slice(0, relationshipNode.from) +
        updatedRelationshipCode +
        this.miroLang.slice(relationshipNode.to);

      return updatedColumnCode;
    }
  }
}

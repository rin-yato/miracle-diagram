import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from './icons';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';

const simpleSyntax = `users {
  id uuid,
  name string,
  email string,
}`;

const simpleContraints = `users {
  id uuid pk,
  name string unique,
  email string unique nullable,
  gender string nullable,
}`;

const simpleRelationship = `users {
  id uuid pk,
  name string,
  email string,
}

posts {
  id uuid pk,
  title string,
  user_id uuid -> users.id,
}`;

const simpleIcon = `users i-user {
  id uuid pk,
  name string,
  email string,
}`;

export function DocsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.Info size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[600px] overflow-y-auto">
        <div className="prose prose-blue dark:prose-invert dark:prose-pre:bg-gray-900 pro py-5">
          <h3 className="flex items-center">
            <Icons.BookMarked size={18} className="inline-block mr-2" />
            <span>Getting Started</span>
          </h3>
          <Alert className="!my-5">
            <Icons.Info className="h-4 w-4" />
            <AlertTitle>Had a bug?</AlertTitle>
            <AlertDescription>
              You can report bugs and issues on the github repository.
              <span className="inline-block">
                <Link
                  target="_blank"
                  href="https://github.com/rin-yato/miracle-diagram/issues/new"
                  className="flex items-center ml-1 space-x-1 text-blue-500 hover:underline"
                >
                  Github <Icons.ArrowUpRight size={14} />
                </Link>
              </span>
            </AlertDescription>
          </Alert>
          <p>
            Miracle Diagram comes with its own simple scripting language called
            MiroLang, which is used to define the structure of the diagram.
          </p>
          <pre>
            <code>{simpleSyntax}</code>
          </pre>
          <h4>Constraints</h4>
          <p>
            You can define constraints by just adding it after the type.
            Contraits are user defined, which means you can define your own
            contraints.
          </p>
          <p>Note: You can have multiple constraints on a single column.</p>
          <pre>
            <code>{simpleContraints}</code>
          </pre>
          <h4>Relationships</h4>
          <p>
            You can define relationship by either dragging one column to another
            or by using the following syntax.
          </p>
          <p>
            Syntax: <code>-&gt; tableName.columnName</code>
          </p>
          <pre>
            <code>{simpleRelationship}</code>
          </pre>
          <h4>Icons</h4>
          <p>
            Miracle Diagram uses icons from
            <Link
              href="https://lucide.dev/icons/"
              target="_blank"
              className="mx-1"
            >
              Lucide Icon
            </Link>
            and you can use them by just adding the icon name after the table
            name. Note that the icon name should be in kebab case and always
            prefixed with <code>i-</code>.
          </p>
          <p>
            Example: <code>i-user</code>, <code>i-clock</code>
          </p>
          <pre>
            <code>{simpleIcon}</code>
          </pre>
          <h4>Support the project</h4>
          <p>
            Miracle Diagram is an open source project and is free to use. If you
            like the project, please consider supporting the project by giving a
            star on github.
          </p>
          <div className="flex gap-5">
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/rin-yato/miracle-diagram"
                target="_blank"
                className="no-underline text-black"
              >
                <Icons.GitHub size={18} className="inline-block mr-2" />
                Github
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://rinyato.com"
                target="_blank"
                className="no-underline text-black"
              >
                <Globe2 size={18} className="inline-block mr-2" />
                rinyato.com
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

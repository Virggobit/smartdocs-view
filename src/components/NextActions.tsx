import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface NextAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  variant?: "default" | "secondary" | "outline";
}

interface NextActionsProps {
  title?: string;
  description?: string;
  actions: NextAction[];
}

export const NextActions = ({
  title = "Próximas Ações",
  description = "Atalhos para continuar de onde você parou",
  actions,
}: NextActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href + action.title}
                to={action.href}
                className="group flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/40 hover:border-primary/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium leading-tight">{action.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

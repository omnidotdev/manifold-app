import { createFileRoute, redirect } from "@tanstack/react-router";
import { Box, Container, FileJson, Layers, Network, Plus } from "lucide-react";

import { InternalLink } from "@/components/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DEMO_SCHEMAS,
  SCHEMA_TYPE_LABELS,
  formatRelativeDate,
  getSchemaIcon,
} from "@/lib/manifold/schemas";
import createMetaTags from "@/lib/util/createMetaTags";

import type { SchemaType } from "@/lib/manifold/types";

const STAT_CONFIGS: {
  type: SchemaType | "total";
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    type: "total",
    label: "Total Schemas",
    icon: <FileJson className="h-5 w-5" />,
    color: "bg-primary/10 text-primary",
  },
  {
    type: "openapi",
    label: "OpenAPI",
    icon: <FileJson className="h-5 w-5" />,
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    type: "graphql",
    label: "GraphQL",
    icon: <Network className="h-5 w-5" />,
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    type: "json",
    label: "JSON",
    icon: <Box className="h-5 w-5" />,
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    type: "wasm",
    label: "WASM",
    icon: <Layers className="h-5 w-5" />,
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    type: "container",
    label: "Container",
    icon: <Container className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
];

const DISTRIBUTION_COLORS: Record<SchemaType, string> = {
  openapi: "bg-green-500",
  graphql: "bg-pink-500",
  json: "bg-yellow-500",
  wasm: "bg-purple-500",
  container: "bg-blue-500",
};

export const Route = createFileRoute("/_app/dashboard")({
  // Demo-data overview, not in the nav; send users to the real /registry
  beforeLoad: () => {
    throw redirect({ to: "/registry" });
  },
  head: () => ({
    meta: createMetaTags({
      title: "Dashboard | Manifold",
      description: "Overview of your schemas and artifacts.",
    }),
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const schemas = DEMO_SCHEMAS;
  const total = schemas.length;

  const typeCounts = schemas.reduce(
    (acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const recentSchemas = [...schemas]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const quickActions: { type: SchemaType; icon: React.ReactNode }[] = [
    { type: "openapi", icon: <FileJson className="h-6 w-6" /> },
    { type: "graphql", icon: <Network className="h-6 w-6" /> },
    { type: "json", icon: <Box className="h-6 w-6" /> },
    { type: "wasm", icon: <Layers className="h-6 w-6" /> },
    { type: "container", icon: <Container className="h-6 w-6" /> },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        <h1 className="mb-6 font-semibold text-2xl">Dashboard</h1>

        {/* Stat Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STAT_CONFIGS.map((stat) => (
            <Card key={stat.type}>
              <CardContent className="flex items-center gap-3 p-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="font-bold text-2xl">
                    {stat.type === "total" ? total : typeCounts[stat.type] || 0}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Artifact Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Stacked bar */}
              <div className="mb-4 flex h-6 overflow-hidden rounded-full">
                {(
                  Object.entries(DISTRIBUTION_COLORS) as [SchemaType, string][]
                ).map(([type, color]) => {
                  const count = typeCounts[type] || 0;
                  if (count === 0) return null;
                  const pct = (count / total) * 100;
                  return (
                    <div
                      key={type}
                      className={`${color} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  );
                })}
              </div>
              {/* Legend */}
              <div className="grid grid-cols-3 gap-3">
                {(
                  Object.entries(DISTRIBUTION_COLORS) as [SchemaType, string][]
                ).map(([type, color]) => {
                  const count = typeCounts[type] || 0;
                  const pct = total ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={type} className="flex items-center gap-2 text-sm">
                      <div className={`h-3 w-3 rounded-full ${color}`} />
                      <span className="text-muted-foreground">
                        {SCHEMA_TYPE_LABELS[type]}
                      </span>
                      <span className="ml-auto font-medium">
                        {count} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSchemas.map((schema) => (
                <InternalLink
                  key={schema.id}
                  to="/schemas/$schemaId"
                  params={{ schemaId: schema.id }}
                  variant="unstyled"
                  className="block"
                >
                  <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
                    <div className="text-primary">
                      {getSchemaIcon(schema.type, "h-4 w-4")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-sm">
                        {schema.name}
                      </div>
                      <div className="truncate text-muted-foreground text-xs">
                        {schema.description}
                      </div>
                    </div>
                    <span className="shrink-0 text-muted-foreground text-xs">
                      {formatRelativeDate(schema.updatedAt)}
                    </span>
                  </div>
                </InternalLink>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-5">
            {quickActions.map((action) => (
              <InternalLink
                key={action.type}
                to="/schemas/create"
                variant="unstyled"
              >
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {action.icon}
                    </div>
                    <span className="font-medium text-sm">
                      New {SCHEMA_TYPE_LABELS[action.type]}
                    </span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </InternalLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

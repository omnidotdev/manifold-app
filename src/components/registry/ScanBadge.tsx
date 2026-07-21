import { Badge } from "@omnidotdev/thornberry/badge";
import {
  Loader2,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";

interface ScanSummary {
  status: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  unknown: number;
}

interface ScanBadgeProps {
  scan: ScanSummary | null | undefined;
}

/**
 * Vulnerability-scan summary badge for an artifact. Renders the highest severity
 * present (with a full breakdown on hover), a clean checkmark when a completed
 * scan found nothing, an in-progress state while pending/scanning, and nothing
 * at all when the artifact was never scanned (scanning disabled or skipped).
 */
const ScanBadge = ({ scan }: ScanBadgeProps) => {
  if (!scan || scan.status === "skipped") return null;

  if (scan.status === "pending" || scan.status === "scanning") {
    return (
      <Badge className="gap-1 bg-muted text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" />
        Scanning
      </Badge>
    );
  }

  if (scan.status === "failed") {
    return (
      <Badge
        className="gap-1 bg-muted text-muted-foreground"
        title="Vulnerability scan failed"
      >
        <ShieldQuestion className="h-3 w-3" />
        Scan failed
      </Badge>
    );
  }

  const title = `Critical ${scan.critical}, High ${scan.high}, Medium ${scan.medium}, Low ${scan.low}, Unknown ${scan.unknown}`;

  if (scan.critical + scan.high + scan.medium + scan.low + scan.unknown === 0) {
    return (
      <Badge
        className="gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        title={title}
      >
        <ShieldCheck className="h-3 w-3" />
        No vulnerabilities
      </Badge>
    );
  }

  const { color, label } =
    scan.critical > 0
      ? {
          color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          label: `${scan.critical} critical`,
        }
      : scan.high > 0
        ? {
            color:
              "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            label: `${scan.high} high`,
          }
        : scan.medium > 0
          ? {
              color:
                "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
              label: `${scan.medium} medium`,
            }
          : {
              color:
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
              label: `${scan.low + scan.unknown} low`,
            };

  return (
    <Badge className={`gap-1 ${color}`} title={title}>
      <ShieldAlert className="h-3 w-3" />
      {label}
    </Badge>
  );
};

export default ScanBadge;

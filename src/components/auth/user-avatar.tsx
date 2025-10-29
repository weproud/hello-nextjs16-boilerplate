import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type UserAvatarProps = {
  src?: string | null;
  alt?: string;
  name?: string | null;
  displayName?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses: Record<NonNullable<UserAvatarProps["size"]>, string> = {
  sm: "size-8 text-sm",
  md: "size-10 text-base",
  lg: "size-12 text-lg",
};

function getInitial(name?: string | null) {
  if (!name) return "?";
  const trimmed = name.trim();
  return trimmed ? (trimmed[0]?.toUpperCase() ?? "?") : "?";
}

export function UserAvatar({
  src,
  alt,
  name,
  displayName,
  size = "md",
  className,
}: UserAvatarProps) {
  const initial = getInitial(name ?? displayName);
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Avatar className={cn(sizeClasses[size], "rounded-lg")}>
        <AvatarImage
          src={src ?? undefined}
          alt={alt ?? name ?? displayName ?? "User avatar"}
          referrerPolicy="no-referrer"
        />
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-start">
        <span className="font-black text-3xl leading-none">{name ?? "Unknown"}</span>
        <span className="font-medium text-sm leading-none text-muted-foreground">
          {displayName ?? "Unknown"}
        </span>
      </div>
    </div>
  );
}

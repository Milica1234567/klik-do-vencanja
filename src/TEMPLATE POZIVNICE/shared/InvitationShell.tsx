import type { ReactNode } from "react";
import "./InvitationShell.css";

type InvitationShellProps = {
  templateId: string;
  children: ReactNode;
  className?: string;
};

/** Outer chrome for any invitation template page. */
function InvitationShell({
  templateId,
  children,
  className = "",
}: InvitationShellProps) {
  return (
    <div
      className={`invitation-shell ${className}`.trim()}
      data-invitation-template={templateId}
    >
      <div className="invitation-shell__canvas">{children}</div>
    </div>
  );
}

export default InvitationShell;

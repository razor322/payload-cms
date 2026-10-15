export function ErrorState({
  message = "Something went wrong.",
  action,
}: { message?: string; action?: React.ReactNode }) {
  return (
    <div
      className="p-6 flex flex-col gap-3 bg-background"
      style={{ border: "3px solid #ff2d2d", boxShadow: "6px 6px 0 #ff2d2d" }}
      role="alert"
    >
      <p className="font-black uppercase" style={{ color: "#ff2d2d" }}>
        {message}
      </p>
      {action}
    </div>
  );
}

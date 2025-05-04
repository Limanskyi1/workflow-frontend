interface AuthErrorProps {
  errorText?: string;
  className?: string;
}

export const AuthError = ({ errorText, className }: AuthErrorProps) => {
  if (!errorText) return null;

  return (
    <p className={`mt-1 text-sm text-red-600 text-center ${className}`}>
      {errorText}
    </p>
  );
};

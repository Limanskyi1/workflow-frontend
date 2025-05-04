import { Trello } from "lucide-react";

export const AuthHeader = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center">
      <Trello className="h-12 w-12" />
      <h2 className="mt-6 text-center text-3xl font-bold">{text}</h2>
    </div>
  );
};

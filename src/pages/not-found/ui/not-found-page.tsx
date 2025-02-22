import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col items-center justify-center h-full gap-3">
      <h1 className="text-4xl font-extrabold">Opps!</h1>
      <p>404 - Page not found</p>
      <p>The page you are looking for does not exist</p>
      <Button onClick={handleClick}>
        <span className="uppercase">Go to Board</span>
      </Button>
    </section>
  );
};

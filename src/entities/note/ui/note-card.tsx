import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/ui/card";

export interface NoteProps {
  title: string;
  subtitle: string;
  time: string;
}

export const NoteCard = (props: NoteProps) => {
  const { title, subtitle, time } = props;
  return (
    <Card>
      <CardHeader className="p-3">
        <p>{title}</p>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <CardDescription className="flex items-center gap-2">
          <span>{time}</span>
          <p>{subtitle}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

import { TaskActivity } from "@/entities/task/model/types";

interface AnimatedListProps {
  activities: TaskActivity[];
  renderActivity: (activity: TaskActivity) => ReactNode;
}

export const TaskActivityListAnimated = ({
  activities,
  renderActivity,
}: AnimatedListProps) => {
  return (
    <AnimatePresence>
      {activities.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ x: 0, opacity: [0, 0.7, 1] }}
          exit={{
            scale: [1, 0.85, 1.05, 0],
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderActivity(item)}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

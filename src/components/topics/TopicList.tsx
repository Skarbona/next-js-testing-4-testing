import React, { FC } from "react";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";

export const TopicList: FC = async () => {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {topics.map((topic) => (
        <div key={topic.id} className="mb-2">
          <Link href={paths.topicShow(topic.slug)}>
            <Chip color="warning" variant="shadow">
              {topic.slug}
            </Chip>
          </Link>
        </div>
      ))}
    </div>
  );
};

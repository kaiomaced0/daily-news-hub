import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  source: string;
  publishedAt: string;
}

const NewsCard = ({ title, description, imageUrl, url, source, publishedAt }: NewsCardProps) => {
  const date = new Date(publishedAt).toLocaleDateString();

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="news-card h-full">
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-bold line-clamp-2">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
            {description}
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{source}</span>
            <span>{date}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default NewsCard;
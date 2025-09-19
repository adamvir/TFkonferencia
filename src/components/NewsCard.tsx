import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  content: string;
  readTime: string;
}

interface NewsCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  featured?: boolean;
}

export function NewsCard({ article, onSelect, featured = false }: NewsCardProps) {
  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onClick={() => onSelect(article)}
    >
      <div className="relative">
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.title}
          className={`w-full object-cover ${
            featured ? "h-64 md:h-96" : "h-48"
          }`}
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {article.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className={`line-clamp-2 hover:text-primary transition-colors ${
            featured ? "text-xl md:text-2xl" : ""
          }`}>
            {article.title}
          </h3>
          <p className={`text-muted-foreground line-clamp-3 ${
            featured ? "" : "text-sm"
          }`}>
            {article.summary}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <span>{article.author}</span>
            <div className="flex items-center space-x-2">
              <span>{article.readTime}</span>
              <span>•</span>
              <span>{article.publishedAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Article } from "./NewsCard";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsArticleProps {
  article: Article;
  onBack: () => void;
}

export function NewsArticle({ article, onBack }: NewsArticleProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 -ml-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Vissza a hírekhez
      </Button>
      
      <article className="space-y-6">
        <div className="space-y-4">
          <Badge className="bg-primary text-primary-foreground">
            {article.category}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.summary}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} read</span>
            </div>
          </div>
        </div>
        
        <div className="my-8">
          <ImageWithFallback
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
        
        <div className="prose max-w-none">
          <div className="space-y-4 text-foreground leading-relaxed">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
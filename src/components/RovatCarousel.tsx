import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Article } from "./NewsCard";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { Button } from "./ui/button";

interface RovatCarouselProps {
  articles: Article[];
  rovatTitle: string;
  onArticleSelect: (article: Article) => void;
}

export function RovatCarousel({ articles, rovatTitle, onArticleSelect }: RovatCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (articles.length === 0) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl">{rovatTitle}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={articles.length <= 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {articles.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={articles.length <= 1}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card 
        className="h-80 cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden group"
        onClick={() => onArticleSelect(currentArticle)}
      >
        <div className="relative h-full">
          <ImageWithFallback
            src={currentArticle.imageUrl}
            alt={currentArticle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <Badge className="mb-2 bg-primary text-primary-foreground text-xs">
              {currentArticle.category}
            </Badge>
            <h4 className="text-lg mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors">
              {currentArticle.title}
            </h4>
            <p className="text-white/80 text-sm mb-3 line-clamp-2">
              {currentArticle.summary}
            </p>
            <div className="flex items-center space-x-4 text-xs text-white/70">
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{currentArticle.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{currentArticle.readTime}</span>
              </div>
              <span>{currentArticle.publishedAt}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}